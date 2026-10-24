import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

interface ModelPart {
  mesh: THREE.Mesh | THREE.Group;
  basePos: THREE.Vector3;
  baseRot: THREE.Euler;
  explodeVec: THREE.Vector3;
  materialFinishType?: 'metallic' | 'shell' | 'accent' | 'accent2' | 'chrome';
}

interface StudioModelConfig {
  id: string;
  title: string;
  partCountLabel: string;
  scaleBadge: string;
  contextDesc: string;
  group: THREE.Group;
  parts: ModelPart[];
  materials: {
    metallic: THREE.MeshStandardMaterial;
    shell: THREE.MeshStandardMaterial;
    accent: THREE.MeshStandardMaterial;
    accent2?: THREE.MeshStandardMaterial;
    chrome?: THREE.MeshStandardMaterial;
  };
  animateKinematics?: (delta: number) => void;
}

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let container: HTMLElement | null = null;
let animFrameId: number | null = null;
let clock: THREE.Clock;

let currentModelKey = 'horn-gear';
let models: Record<string, StudioModelConfig> = {};
let isWireframe = false;
let isKinematics = true;
let currentFinish = 'titanium';
let explodedRatio = 0;
let isInitialized = false;

// Color and PBR definitions for Material Finishes
const FINISH_PRESETS: Record<string, {
  metallicColor: number;
  metallicRough: number;
  metallicMetal: number;
  shellColor: number;
  shellRough: number;
  shellMetal: number;
  accentColor: number;
  label: string;
}> = {
  titanium: {
    metallicColor: 0x94a3b8,
    metallicRough: 0.28,
    metallicMetal: 0.85,
    shellColor: 0x334155,
    shellRough: 0.45,
    shellMetal: 0.6,
    accentColor: 0x38bdf8,
    label: 'Finish: Titanium Industri'
  },
  blue: {
    metallicColor: 0x64748b,
    metallicRough: 0.22,
    metallicMetal: 0.9,
    shellColor: 0x1d4ed8,
    shellRough: 0.25,
    shellMetal: 0.7,
    accentColor: 0x60a5fa,
    label: 'Finish: Anodized Cobalt Blue'
  },
  ceramic: {
    metallicColor: 0xe2e8f0,
    metallicRough: 0.6,
    metallicMetal: 0.1,
    shellColor: 0xf8fafc,
    shellRough: 0.65,
    shellMetal: 0.05,
    accentColor: 0x0284c7,
    label: 'Finish: Ceramic Matte White'
  },
  brass: {
    metallicColor: 0xd97706,
    metallicRough: 0.24,
    metallicMetal: 0.92,
    shellColor: 0x1e293b,
    shellRough: 0.35,
    shellMetal: 0.75,
    accentColor: 0xf59e0b,
    label: 'Finish: Polished Brass & Carbon'
  }
};

export function initStudio3D() {
  try {
    container = document.getElementById('three-canvas-container');
    if (!container || isInitialized) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050814);
    scene.fog = new THREE.FogExp2(0x050814, 0.035);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(6.5, 4.8, 6.5);

    // 3. Renderer with ACES Filmic tone mapping
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 16;
    controls.target.set(0, 0, 0);

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(8, 12, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.2);
    fillLight.position.set(-8, 6, -6);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rimLight.position.set(0, -6, -8);
    scene.add(rimLight);

    // Floor Ground Contact Shadow Plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(16, 16);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.5;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // CAD Floor Grid
    const gridHelper = new THREE.GridHelper(16, 32, 0x2563eb, 0x1e293b);
    gridHelper.position.y = -1.5;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.45;
    scene.add(gridHelper);

    // 6. Build the 4 Interactive CAD Models
    models['horn-gear'] = buildHornGearModel();
    models['iron'] = buildIronModel();
    models['lamp'] = buildLampModel();
    models['iot'] = buildIotModel();

    // Add all model groups to scene, hide non-active
    Object.keys(models).forEach(key => {
      scene.add(models[key].group);
      models[key].group.visible = (key === currentModelKey);
    });

    clock = new THREE.Clock();
    isInitialized = true;

    // 7. Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // 8. Start Animation Loop
    animate();

    updateTelemetryUI();
  } catch (err) {
    console.warn('3D Studio WebGL initialization gracefully caught:', err);
  }
}

// -------------------------------------------------------------
// MODEL 1: HORN GEAR KINEMATICS (Mesin Kepang Serat Sutra)
// -------------------------------------------------------------
function buildHornGearModel(): StudioModelConfig {
  const group = new THREE.Group();
  const parts: ModelPart[] = [];

  const metallic = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.85,
    roughness: 0.28
  });
  const shell = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.6,
    roughness: 0.45
  });
  const accent = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.75,
    roughness: 0.22
  });

  // Base Carrier Plate
  const baseGeo = new THREE.CylinderGeometry(3.2, 3.4, 0.35, 32);
  const baseMesh = new THREE.Mesh(baseGeo, shell);
  baseMesh.position.set(0, -1.2, 0);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  group.add(baseMesh);
  parts.push({
    mesh: baseMesh,
    basePos: baseMesh.position.clone(),
    baseRot: baseMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, -1.2, 0),
    materialFinishType: 'shell'
  });

  // Central Sun Gear
  const sunGroup = new THREE.Group();
  const sunHubGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.45, 24);
  const sunHub = new THREE.Mesh(sunHubGeo, accent);
  sunHub.castShadow = true;
  sunGroup.add(sunHub);

  // Sun Gear Teeth
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const toothGeo = new THREE.BoxGeometry(0.2, 0.4, 0.3);
    const tooth = new THREE.Mesh(toothGeo, accent);
    tooth.position.set(Math.cos(angle) * 0.95, 0, Math.sin(angle) * 0.95);
    tooth.rotation.y = -angle;
    sunGroup.add(tooth);
  }
  sunGroup.position.set(0, -0.7, 0);
  group.add(sunGroup);
  parts.push({
    mesh: sunGroup as any,
    basePos: sunGroup.position.clone(),
    baseRot: sunGroup.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 0.6, 0),
    materialFinishType: 'accent'
  });

  // 4 Planetary Horn Gears
  const planetaryGears: THREE.Group[] = [];
  const radius = 1.9;
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const pGearGroup = new THREE.Group();

    // Gear body
    const pBodyGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.4, 20);
    const pBody = new THREE.Mesh(pBodyGeo, metallic);
    pBody.castShadow = true;
    pGearGroup.add(pBody);

    // Gear Teeth
    for (let t = 0; t < 10; t++) {
      const tAngle = (t / 10) * Math.PI * 2;
      const toothGeo = new THREE.BoxGeometry(0.18, 0.35, 0.22);
      const tooth = new THREE.Mesh(toothGeo, metallic);
      tooth.position.set(Math.cos(tAngle) * 0.8, 0, Math.sin(tAngle) * 0.8);
      tooth.rotation.y = -tAngle;
      pGearGroup.add(tooth);
    }

    // Horn Arms (Characteristic Horn Crescent pockets for braid carriers)
    const hornArmGeo = new THREE.TorusGeometry(0.55, 0.08, 12, 24, Math.PI * 0.8);
    const horn1 = new THREE.Mesh(hornArmGeo, accent);
    horn1.rotation.x = Math.PI / 2;
    horn1.position.set(0, 0.25, 0);
    pGearGroup.add(horn1);

    const horn2 = new THREE.Mesh(hornArmGeo, accent);
    horn2.rotation.x = Math.PI / 2;
    horn2.rotation.z = Math.PI;
    horn2.position.set(0, 0.25, 0);
    pGearGroup.add(horn2);

    // Spindle pin
    const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.7, 12);
    const pin = new THREE.Mesh(pinGeo, metallic);
    pin.position.set(0, 0.45, 0);
    pGearGroup.add(pin);

    pGearGroup.position.set(Math.cos(angle) * radius, -0.7, Math.sin(angle) * radius);
    group.add(pGearGroup);
    planetaryGears.push(pGearGroup);

    parts.push({
      mesh: pGearGroup as any,
      basePos: pGearGroup.position.clone(),
      baseRot: pGearGroup.rotation.clone(),
      explodeVec: new THREE.Vector3(Math.cos(angle) * 1.5, 0.2, Math.sin(angle) * 1.5),
      materialFinishType: 'metallic'
    });
  }

  // Central Vertical Drive Shaft
  const shaftGeo = new THREE.CylinderGeometry(0.2, 0.2, 3.2, 16);
  const shaftMesh = new THREE.Mesh(shaftGeo, metallic);
  shaftMesh.position.set(0, -0.5, 0);
  shaftMesh.castShadow = true;
  group.add(shaftMesh);
  parts.push({
    mesh: shaftMesh,
    basePos: shaftMesh.position.clone(),
    baseRot: shaftMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, -1.8, 0),
    materialFinishType: 'metallic'
  });

  // Top Guide Carrier Plate
  const topGuideGeo = new THREE.TorusGeometry(2.3, 0.15, 12, 32);
  const topGuide = new THREE.Mesh(topGuideGeo, shell);
  topGuide.rotation.x = Math.PI / 2;
  topGuide.position.set(0, 0.4, 0);
  group.add(topGuide);
  parts.push({
    mesh: topGuide,
    basePos: topGuide.position.clone(),
    baseRot: topGuide.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 1.6, 0),
    materialFinishType: 'shell'
  });

  return {
    id: 'horn-gear',
    title: 'Kinematika Horn Gears Mesin Kepang',
    partCountLabel: '8 Komponen CAD Parametrik',
    scaleBadge: 'SolidWorks 2024 (Skala 1:1)',
    contextDesc: 'Transmisi 4-rotor roda gigi tanduk untuk jalinan serat sutra alami. Desain dioptimasi metode Taguchi pada cetak FDM infill 80%.',
    group,
    parts,
    materials: { metallic, shell, accent },
    animateKinematics: (delta: number) => {
      const speed = delta * 1.8;
      sunGroup.rotation.y += speed;
      planetaryGears.forEach((pGear, idx) => {
        // Alternating gear spins
        const dir = idx % 2 === 0 ? -1 : 1;
        pGear.rotation.y += speed * 1.5 * dir;
      });
    }
  };
}

// -------------------------------------------------------------
// MODEL 2: ERGONOMIC STEAM IRON (Morfologi Kurva G2)
// -------------------------------------------------------------
function buildIronModel(): StudioModelConfig {
  const group = new THREE.Group();
  const parts: ModelPart[] = [];

  const metallic = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.95,
    roughness: 0.12
  });
  const shell = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    metalness: 0.25,
    roughness: 0.22
  });
  const accent = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.4,
    roughness: 0.5
  });

  // Soleplate (Curved aerodynamic wedge)
  const soleShape = new THREE.Shape();
  soleShape.moveTo(-1.2, -1.8);
  soleShape.lineTo(1.2, -1.8);
  soleShape.quadraticCurveTo(1.3, 0.2, 0, 2.4);
  soleShape.quadraticCurveTo(-1.3, 0.2, -1.2, -1.8);

  const extrudeSettings = { depth: 0.25, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.08, bevelThickness: 0.08 };
  const soleGeo = new THREE.ExtrudeGeometry(soleShape, extrudeSettings);
  soleGeo.center();
  const soleMesh = new THREE.Mesh(soleGeo, metallic);
  soleMesh.rotation.x = -Math.PI / 2;
  soleMesh.position.set(0, -0.9, 0);
  soleMesh.castShadow = true;
  soleMesh.receiveShadow = true;
  group.add(soleMesh);
  parts.push({
    mesh: soleMesh,
    basePos: soleMesh.position.clone(),
    baseRot: soleMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, -1.6, 0),
    materialFinishType: 'metallic'
  });

  // Thermal Chassis (Middle dark barrier)
  const chassisGeo = new THREE.CylinderGeometry(1.1, 1.3, 0.35, 24);
  chassisGeo.scale(1.2, 1, 1.8);
  const chassisMesh = new THREE.Mesh(chassisGeo, accent);
  chassisMesh.position.set(0, -0.6, -0.1);
  group.add(chassisMesh);
  parts.push({
    mesh: chassisMesh,
    basePos: chassisMesh.position.clone(),
    baseRot: chassisMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, -0.8, 0),
    materialFinishType: 'accent'
  });

  // Sculptural Body Shell (Class G2 curvature)
  const bodyGeo = new THREE.ConeGeometry(1.4, 2.6, 28);
  bodyGeo.scale(1.1, 0.8, 1.9);
  const bodyMesh = new THREE.Mesh(bodyGeo, shell);
  bodyMesh.rotation.x = Math.PI / 2 + 0.1;
  bodyMesh.position.set(0, -0.15, -0.1);
  bodyMesh.castShadow = true;
  group.add(bodyMesh);
  parts.push({
    mesh: bodyMesh,
    basePos: bodyMesh.position.clone(),
    baseRot: bodyMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 0.4, 0),
    materialFinishType: 'shell'
  });

  // Ergonomic Arched Handle
  const handleCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.3, -1.3),
    new THREE.Vector3(0, 1.4, -0.9),
    new THREE.Vector3(0, 1.5, 0.4),
    new THREE.Vector3(0, 0.5, 1.3)
  ]);
  const handleGeo = new THREE.TubeGeometry(handleCurve, 24, 0.22, 16, false);
  const handleMesh = new THREE.Mesh(handleGeo, shell);
  handleMesh.castShadow = true;
  group.add(handleMesh);
  parts.push({
    mesh: handleMesh,
    basePos: handleMesh.position.clone(),
    baseRot: handleMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 1.4, 0),
    materialFinishType: 'shell'
  });

  // Soft Rubber Grip along handle top
  const gripCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.35, -0.6),
    new THREE.Vector3(0, 1.55, 0.0),
    new THREE.Vector3(0, 1.4, 0.6)
  ]);
  const gripGeo = new THREE.TubeGeometry(gripCurve, 16, 0.25, 16, false);
  const gripMesh = new THREE.Mesh(gripGeo, accent);
  group.add(gripMesh);
  parts.push({
    mesh: gripMesh,
    basePos: gripMesh.position.clone(),
    baseRot: gripMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 1.9, 0),
    materialFinishType: 'accent'
  });

  // Temperature Dial Regulator
  const dialGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.18, 24);
  const dialMesh = new THREE.Mesh(dialGeo, metallic);
  dialMesh.position.set(0, 0.25, -0.2);
  group.add(dialMesh);
  parts.push({
    mesh: dialMesh,
    basePos: dialMesh.position.clone(),
    baseRot: dialMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 1.0, 0),
    materialFinishType: 'metallic'
  });

  // Steam Trigger Buttons
  const btnGeo = new THREE.CapsuleGeometry(0.12, 0.22, 8, 12);
  const btn1 = new THREE.Mesh(btnGeo, metallic);
  btn1.position.set(-0.2, 0.9, 1.1);
  btn1.rotation.x = 0.5;
  group.add(btn1);

  const btn2 = new THREE.Mesh(btnGeo, metallic);
  btn2.position.set(0.2, 0.9, 1.1);
  btn2.rotation.x = 0.5;
  group.add(btn2);

  parts.push({
    mesh: btn1,
    basePos: btn1.position.clone(),
    baseRot: btn1.rotation.clone(),
    explodeVec: new THREE.Vector3(-0.3, 1.2, 0.5),
    materialFinishType: 'metallic'
  });
  parts.push({
    mesh: btn2,
    basePos: btn2.position.clone(),
    baseRot: btn2.rotation.clone(),
    explodeVec: new THREE.Vector3(0.3, 1.2, 0.5),
    materialFinishType: 'metallic'
  });

  return {
    id: 'iron',
    title: 'Dekonstruksi Morfologi Setrika Ergonomis G2',
    partCountLabel: '7 Komponen Bodi Aerodinamis',
    scaleBadge: 'Autodesk Fusion 360 (Draft 1.5°)',
    contextDesc: 'Studi kurvatur permukaan kelas G2 pada bodi setrika listrik modern. Dekomposisi 3 busur garis utama dengan parting line tersembunyi.',
    group,
    parts,
    materials: { metallic, shell, accent },
    animateKinematics: (delta: number) => {
      group.rotation.y += delta * 0.4;
    }
  };
}

// -------------------------------------------------------------
// MODEL 3: MODULAR GEON DESK LAMP (Teori GEON Biederman)
// -------------------------------------------------------------
function buildLampModel(): StudioModelConfig {
  const group = new THREE.Group();
  const parts: ModelPart[] = [];

  const metallic = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.85,
    roughness: 0.25
  });
  const shell = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    metalness: 0.35,
    roughness: 0.3
  });
  const accent = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.6,
    roughness: 0.4
  });

  // Base Plate (Weighted Heavy Chamfered Disc)
  const baseGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.3, 32);
  const baseMesh = new THREE.Mesh(baseGeo, accent);
  baseMesh.position.set(0, -1.3, 0);
  baseMesh.castShadow = true;
  baseMesh.receiveShadow = true;
  group.add(baseMesh);
  parts.push({
    mesh: baseMesh,
    basePos: baseMesh.position.clone(),
    baseRot: baseMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, -1.2, 0),
    materialFinishType: 'accent'
  });

  // Base Articulation Joint Hinge
  const baseHingeGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.6, 16);
  const baseHinge = new THREE.Mesh(baseHingeGeo, metallic);
  baseHinge.rotation.z = Math.PI / 2;
  baseHinge.position.set(0, -1.0, 0);
  group.add(baseHinge);
  parts.push({
    mesh: baseHinge,
    basePos: baseHinge.position.clone(),
    baseRot: baseHinge.rotation.clone(),
    explodeVec: new THREE.Vector3(0, -0.6, 0),
    materialFinishType: 'metallic'
  });

  // Lower Boom Arm
  const lowerArmGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.2, 16);
  const lowerArm = new THREE.Mesh(lowerArmGeo, metallic);
  lowerArm.position.set(0, -0.1, -0.4);
  lowerArm.rotation.x = -0.45;
  lowerArm.castShadow = true;
  group.add(lowerArm);
  parts.push({
    mesh: lowerArm,
    basePos: lowerArm.position.clone(),
    baseRot: lowerArm.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 0.2, -0.8),
    materialFinishType: 'metallic'
  });

  // Elbow Articulation Knuckle
  const elbowGeo = new THREE.SphereGeometry(0.35, 16, 16);
  const elbowMesh = new THREE.Mesh(elbowGeo, accent);
  elbowMesh.position.set(0, 0.9, -0.85);
  group.add(elbowMesh);
  parts.push({
    mesh: elbowMesh,
    basePos: elbowMesh.position.clone(),
    baseRot: elbowMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 0.8, -1.4),
    materialFinishType: 'accent'
  });

  // Upper Swing Boom Arm
  const upperArmGeo = new THREE.CylinderGeometry(0.1, 0.1, 2.4, 16);
  const upperArm = new THREE.Mesh(upperArmGeo, metallic);
  upperArm.position.set(0, 1.4, 0.2);
  upperArm.rotation.x = 0.85;
  upperArm.castShadow = true;
  group.add(upperArm);
  parts.push({
    mesh: upperArm,
    basePos: upperArm.position.clone(),
    baseRot: upperArm.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 1.2, 0.4),
    materialFinishType: 'metallic'
  });

  // GEON Lampshade (Truncated Conical Primitive)
  const shadeGeo = new THREE.ConeGeometry(0.9, 1.2, 24, 1, true);
  const shadeMesh = new THREE.Mesh(shadeGeo, shell);
  shadeMesh.position.set(0, 1.9, 1.2);
  shadeMesh.rotation.x = -0.55;
  shadeMesh.castShadow = true;
  group.add(shadeMesh);
  parts.push({
    mesh: shadeMesh,
    basePos: shadeMesh.position.clone(),
    baseRot: shadeMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 1.8, 1.8),
    materialFinishType: 'shell'
  });

  // LED Diffuser Disc (Warm light emissive)
  const diffuserGeo = new THREE.CircleGeometry(0.75, 24);
  const diffuserMat = new THREE.MeshStandardMaterial({
    color: 0xfffae0,
    emissive: 0xffe899,
    emissiveIntensity: 0.6,
    roughness: 0.8
  });
  const diffuserMesh = new THREE.Mesh(diffuserGeo, diffuserMat);
  diffuserMesh.position.set(0, 1.45, 1.55);
  diffuserMesh.rotation.x = Math.PI / 2 + 0.45;
  group.add(diffuserMesh);
  parts.push({
    mesh: diffuserMesh,
    basePos: diffuserMesh.position.clone(),
    baseRot: diffuserMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 2.2, 2.4),
    materialFinishType: 'accent'
  });

  return {
    id: 'lamp',
    title: 'Sistem Modular Lampu Meja Multi-GEON',
    partCountLabel: '7 Komponen Spasial Geometris',
    scaleBadge: 'SolidWorks Parametric (Biederman)',
    contextDesc: 'Perancangan varian lampu meja belajar berbasis mutasi spasial bentuk primitif (GEON). Menggunakan engsel friction hinge cetak 3D.',
    group,
    parts,
    materials: { metallic, shell, accent },
    animateKinematics: (delta: number) => {
      group.rotation.y += delta * 0.35;
    }
  };
}

// -------------------------------------------------------------
// MODEL 4: IOT DUAL-TONE ENCLOSURE (Snap-Fit CMF)
// -------------------------------------------------------------
function buildIotModel(): StudioModelConfig {
  const group = new THREE.Group();
  const parts: ModelPart[] = [];

  const metallic = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    metalness: 0.7,
    roughness: 0.3
  });
  const shell = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.3,
    roughness: 0.45
  });
  const accent = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.8,
    roughness: 0.2
  });

  // Bottom Base Tray with PCB Bosses
  const trayGeo = new THREE.BoxGeometry(3.2, 0.6, 2.4);
  const trayMesh = new THREE.Mesh(trayGeo, shell);
  trayMesh.position.set(0, -0.6, 0);
  trayMesh.castShadow = true;
  trayMesh.receiveShadow = true;
  group.add(trayMesh);
  parts.push({
    mesh: trayMesh,
    basePos: trayMesh.position.clone(),
    baseRot: trayMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, -1.4, 0),
    materialFinishType: 'shell'
  });

  // Simulated Circuit Board (Green/dark mask PCB with gold pins)
  const pcbGeo = new THREE.BoxGeometry(2.9, 0.08, 2.1);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x064e3b,
    metalness: 0.5,
    roughness: 0.4
  });
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
  pcbMesh.position.set(0, -0.2, 0);
  group.add(pcbMesh);

  // Microcontroller IC Chip
  const icGeo = new THREE.BoxGeometry(0.8, 0.12, 0.8);
  const icMesh = new THREE.Mesh(icGeo, accent);
  icMesh.position.set(0, 0.05, 0);
  pcbMesh.add(icMesh);

  parts.push({
    mesh: pcbMesh,
    basePos: pcbMesh.position.clone(),
    baseRot: pcbMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, -0.7, 0),
    materialFinishType: 'accent'
  });

  // Mid Snap-fit Perimeter Gasket Ring
  const gasketGeo = new THREE.BoxGeometry(3.3, 0.12, 2.5);
  const gasketMesh = new THREE.Mesh(gasketGeo, accent);
  gasketMesh.position.set(0, -0.15, 0);
  group.add(gasketMesh);
  parts.push({
    mesh: gasketMesh,
    basePos: gasketMesh.position.clone(),
    baseRot: gasketMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 0.2, 0),
    materialFinishType: 'accent'
  });

  // Upper Ergonomic Housing Shell
  const topGeo = new THREE.CylinderGeometry(1.6, 1.7, 0.8, 32);
  topGeo.scale(1.0, 1.0, 0.75);
  const topMesh = new THREE.Mesh(topGeo, shell);
  topMesh.position.set(0, 0.4, 0);
  topMesh.castShadow = true;
  group.add(topMesh);
  parts.push({
    mesh: topMesh,
    basePos: topMesh.position.clone(),
    baseRot: topMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 1.2, 0),
    materialFinishType: 'shell'
  });

  // Front Optical Sensor Bezel
  const bezelGeo = new THREE.TorusGeometry(0.45, 0.08, 16, 32);
  const bezelMesh = new THREE.Mesh(bezelGeo, metallic);
  bezelMesh.position.set(0, 0.4, 0.95);
  group.add(bezelMesh);
  parts.push({
    mesh: bezelMesh,
    basePos: bezelMesh.position.clone(),
    baseRot: bezelMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 1.5, 1.5),
    materialFinishType: 'metallic'
  });

  // Glass Optical Lens
  const lensGeo = new THREE.SphereGeometry(0.4, 20, 20);
  lensGeo.scale(1, 1, 0.25);
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x0369a1,
    metalness: 0.1,
    roughness: 0.05,
    transparent: true,
    opacity: 0.85
  });
  const lensMesh = new THREE.Mesh(lensGeo, lensMat);
  lensMesh.position.set(0, 0.4, 0.95);
  group.add(lensMesh);
  parts.push({
    mesh: lensMesh,
    basePos: lensMesh.position.clone(),
    baseRot: lensMesh.rotation.clone(),
    explodeVec: new THREE.Vector3(0, 1.5, 1.8),
    materialFinishType: 'accent'
  });

  return {
    id: 'iot',
    title: 'Casing Enclosure IoT Dual-Tone CMF',
    partCountLabel: '6 Komponen Snap-Fit Presisi',
    scaleBadge: 'FreeCAD SLA 3D Printing (0.15mm)',
    contextDesc: 'Bodi smart device portabel dengan pembagian warna dual-tone matte & satin serta mekanisme cantilever snap-fit tanpa baut.',
    group,
    parts,
    materials: { metallic, shell, accent },
    animateKinematics: (delta: number) => {
      group.rotation.y += delta * 0.4;
    }
  };
}

// -------------------------------------------------------------
// CONTROLS & INTERACTION ENGINE
// -------------------------------------------------------------
export function selectStudioModel(key: string) {
  if (!models[key]) return;
  currentModelKey = key;

  // Toggle group visibility
  Object.keys(models).forEach(k => {
    models[k].group.visible = (k === key);
  });

  // Update UI selector buttons
  document.querySelectorAll('.model-select-btn').forEach(btn => {
    btn.className = 'model-select-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer whitespace-nowrap transition-all';
  });
  const activeBtn = document.getElementById(`btn-model-${key}`);
  if (activeBtn) {
    activeBtn.className = 'model-select-btn px-3 py-1.5 rounded-lg text-xs font-semibold bg-brandBlue text-white shadow-xs cursor-pointer whitespace-nowrap transition-all';
  }

  // Reset exploded slider for new model
  const slider = document.getElementById('slider-exploded') as HTMLInputElement;
  if (slider) slider.value = '0';
  setStudioExploded(0);

  updateTelemetryUI();
  applyFinishToCurrentModel();
  applyWireframeToCurrentModel();
}

export function loadModelInStudio(modelKey: string) {
  // Ensure portfolio tab is active
  if (typeof (window as any).switchTab === 'function') {
    (window as any).switchTab('portofolio');
  }

  // Switch model
  selectStudioModel(modelKey);

  // Smooth scroll to 3D studio container
  const studioElem = document.getElementById('portfolio-3d-studio');
  if (studioElem) {
    studioElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function setStudioExploded(value: number | string) {
  explodedRatio = Number(value) / 100;
  const label = document.getElementById('exploded-val');
  if (label) label.innerText = `${Math.round(explodedRatio * 100)}%`;

  const cur = models[currentModelKey];
  if (!cur) return;

  cur.parts.forEach(p => {
    p.mesh.position.copy(p.basePos).addScaledVector(p.explodeVec, explodedRatio);
  });
}

export function setStudioMaterialFinish(finishKey: string, btnElem?: HTMLElement) {
  if (!FINISH_PRESETS[finishKey]) return;
  currentFinish = finishKey;

  // Update finish buttons styling
  document.querySelectorAll('.finish-btn').forEach(btn => {
    btn.className = 'finish-btn px-2 py-1 rounded-md text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer';
  });
  if (btnElem) {
    btnElem.className = 'finish-btn px-2 py-1 rounded-md text-[11px] font-medium bg-brandBlue text-white cursor-pointer';
  }

  applyFinishToCurrentModel();
  updateTelemetryUI();
}

function applyFinishToCurrentModel() {
  const cur = models[currentModelKey];
  if (!cur) return;

  const preset = FINISH_PRESETS[currentFinish];
  if (!preset) return;

  cur.materials.metallic.color.setHex(preset.metallicColor);
  cur.materials.metallic.roughness = preset.metallicRough;
  cur.materials.metallic.metalness = preset.metallicMetal;

  cur.materials.shell.color.setHex(preset.shellColor);
  cur.materials.shell.roughness = preset.shellRough;
  cur.materials.shell.metalness = preset.shellMetal;

  cur.materials.accent.color.setHex(preset.accentColor);
}

export function setStudioCameraPreset(preset: 'iso' | 'front' | 'top' | 'side') {
  if (!camera || !controls) return;

  switch (preset) {
    case 'iso':
      camera.position.set(6.5, 4.8, 6.5);
      break;
    case 'front':
      camera.position.set(0, 0.4, 7.8);
      break;
    case 'top':
      camera.position.set(0, 8.2, 0.01);
      break;
    case 'side':
      camera.position.set(7.8, 0.4, 0);
      break;
  }
  controls.target.set(0, 0, 0);
  controls.update();
}

export function toggleStudioWireframe() {
  isWireframe = !isWireframe;
  applyWireframeToCurrentModel();

  const btn = document.getElementById('btn-wireframe');
  if (btn) {
    if (isWireframe) {
      btn.className = 'px-2.5 py-1 rounded-lg bg-brandBlue text-white cursor-pointer transition-colors flex items-center gap-1 font-mono text-[11px] shadow-sm';
    } else {
      btn.className = 'px-2.5 py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors flex items-center gap-1 font-mono text-[11px]';
    }
  }
}

function applyWireframeToCurrentModel() {
  const cur = models[currentModelKey];
  if (!cur) return;

  cur.materials.metallic.wireframe = isWireframe;
  cur.materials.shell.wireframe = isWireframe;
  cur.materials.accent.wireframe = isWireframe;
}

export function toggleStudioKinematics() {
  isKinematics = !isKinematics;

  const icon = document.getElementById('kinematics-icon');
  const text = document.getElementById('kinematics-text');
  const btn = document.getElementById('btn-kinematics');

  if (icon && text && btn) {
    if (isKinematics) {
      icon.innerText = '⏸️';
      text.innerText = 'Kinematika';
      btn.className = 'px-2.5 py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors flex items-center gap-1 font-mono text-[11px]';
    } else {
      icon.innerText = '▶️';
      text.innerText = 'Jeda';
      btn.className = 'px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-pointer transition-colors flex items-center gap-1 font-mono text-[11px]';
    }
  }
}

export function resetStudioCamera() {
  setStudioCameraPreset('iso');
}

export function onPortfolioTabOpened() {
  if (!isInitialized) {
    initStudio3D();
  } else if (container && renderer && camera) {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w > 0 && h > 0) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
  }
}

function updateTelemetryUI() {
  const cur = models[currentModelKey];
  if (!cur) return;

  const titleEl = document.getElementById('studio-active-title');
  if (titleEl) titleEl.innerText = cur.title;

  const partsEl = document.getElementById('studio-part-count');
  if (partsEl) partsEl.innerText = cur.partCountLabel;

  const scaleEl = document.getElementById('studio-scale-badge');
  if (scaleEl) scaleEl.innerText = cur.scaleBadge;

  const descEl = document.getElementById('studio-context-desc');
  if (descEl) descEl.innerText = cur.contextDesc;

  const matEl = document.getElementById('studio-material-badge');
  if (matEl) matEl.innerText = FINISH_PRESETS[currentFinish]?.label || 'Finish: Titanium';
}

function animate() {
  animFrameId = requestAnimationFrame(animate);

  const delta = clock ? clock.getDelta() : 0.016;

  if (controls) {
    controls.update();
  }

  // Run model-specific kinematics animation when active
  if (isKinematics && models[currentModelKey]?.animateKinematics) {
    models[currentModelKey].animateKinematics!(delta);
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// Bind to window for HTML inline onclick handlers
if (typeof window !== 'undefined') {
  (window as any).initStudio3D = initStudio3D;
  (window as any).selectStudioModel = selectStudioModel;
  (window as any).loadModelInStudio = loadModelInStudio;
  (window as any).setStudioExploded = setStudioExploded;
  (window as any).setStudioMaterialFinish = setStudioMaterialFinish;
  (window as any).setStudioCameraPreset = setStudioCameraPreset;
  (window as any).toggleStudioWireframe = toggleStudioWireframe;
  (window as any).toggleStudioKinematics = toggleStudioKinematics;
  (window as any).resetStudioCamera = resetStudioCamera;
  (window as any).onPortfolioTabOpened = onPortfolioTabOpened;
}
