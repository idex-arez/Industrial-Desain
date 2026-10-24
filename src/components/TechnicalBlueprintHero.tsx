import React, { useState } from 'react';

export const TechnicalBlueprintHero: React.FC = () => {
  const [selectedSpec, setSelectedSpec] = useState<'rib' | 'draft' | 'boss' | 'reveal' | 'dial'>('rib');
  const [activeProjection, setActiveProjection] = useState<'front' | 'section'>('front');

  const engineeringSpecs = {
    rib: {
      code: 'ISO 128 / DFM-01',
      title: 'Geometri Rusuk Penguat (Reinforcing Ribs)',
      rule: 'Tebal basis rusuk (t_rib) wajib dibatasi 0.50 hingga 0.60 dari tebal dinding nominal (t_nom).',
      formula: 't_rib = 0.55 × t_nominal = 1.20 mm',
      consequence: 'Bila tebal rusuk melebihi 0.60 × t_nom, kontraksi volumetrik lelehan saat fasa pendinginan akan menarik permukaan luar, menyebabkan cacat cekung (sink mark) yang terlihat jelas pada permukaan matte.',
      tolerance: 'Draft angle rusuk: 1.0° per sisi; radius akar: R0.4 mm.',
    },
    draft: {
      code: 'DIN 16901 / DFM-02',
      title: 'Sudut Kemiringan Ejeksi (Draft Angle)',
      rule: 'Seluruh permukaan tegak lurus garis pemisah (parting line) wajib memiliki kemiringan minimal 1.0°.',
      formula: 'Sudut Draft = 1.0° (permukaan halus SPI A-2) / +1.0° per 0.025 mm kedalaman tekstur erosi',
      consequence: 'Tanpa draft angle yang cukup, komponen akan mengalami gesekan statis tinggi terhadap dinding cetakan baja P20/NAK80 saat ditarik pin ejektor, menimbulkan goresan gores (drag marks) permanen.',
      tolerance: 'Toleransi sudut draft: +0.2° / -0.0° pada rongga luar.',
    },
    boss: {
      code: 'DFM-MECH / DFM-03',
      title: 'Dudukan Baut Ulir Plastik (Screw Bosses)',
      rule: 'Diameter luar silinder boss (OD) dirancang berbanding 2.0 × diameter baut fungsional.',
      formula: 'OD = 2.0 × d_screw = 6.0 mm; ID = 0.8 × d_screw = 2.4 mm (untuk baut ulir M3 Delta PT)',
      consequence: 'Rasio ketebalan dinding boss terhadap dinding sasis diatur 0.6 × t_nom untuk mencegah pembentukan massa plastik berlebih di dasar boss yang memicu retakan fatik akibat tegangan sisa.',
      tolerance: 'Toleransi konsentrisitas Ø0.05 mm terhadap datum perakitan A.',
    },
    reveal: {
      code: 'FIT-GD&T / DFM-04',
      title: 'Sambungan Celah Terencana (Intentional Reveal Joint)',
      rule: 'Pertemuan antar dua belahan sasis tidak boleh dirancang sejajar rata (flush-to-flush).',
      formula: 'Langkah Reveal = 0.60 mm kedalaman × 0.40 mm celah perakitan',
      consequence: 'Variasi penyusutan cetakan plastik multi-kavitas selalu memiliki toleransi deviasi ±0.15 mm. Merancang sambungan dengan teknik reveal menyamarkan ketidakrataan mikro tersebut secara visual dan taktil.',
      tolerance: 'Celah nominal 0.40 mm (±0.06 mm) di sekeliling perimeter.',
    },
    dial: {
      code: 'ISO 286 / DFM-05',
      title: 'Kenop Putar Pemesinan & Pasangan Poros (Knurled Dial Fit)',
      rule: 'Kenop aluminium 6061-T6 dipasang pada poros encoder dengan toleransi pasangan transisi.',
      formula: 'Pasangan Poros: H7 / h6 (Sistem Basis Lubang DIN ISO 286)',
      consequence: 'Memberikan rotasi presisi tinggi tanpa kelonggaran radial (radial play), dengan torsi penalaan konsisten 2.5 N·cm tanpa memerlukan pelumas gemuk yang mudah terdegradasi.',
      tolerance: 'Lubang Ø6.000 (+0.012/-0.000 mm); Poros Ø6.000 (+0.000/-0.008 mm).',
    },
  };

  const current = engineeringSpecs[selectedSpec];

  return (
    <section className="bg-white border border-[#111111] mb-12">
      {/* Drawing Sheet Header Bar */}
      <div className="bg-[#111111] text-white px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs font-technical">
        <div className="flex items-center gap-3">
          <span className="bg-[#FF4400] text-white px-1.5 py-0.2 font-bold">
            LEMBAR GAMBAR TEKNIK
          </span>
          <span>DOKUMEN REKAYASA: RF-2026-T3</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline text-[#AAAAAA]">KLASIFIKASI: STANDAR DFM ISO 128</span>
        </div>
        <div className="flex items-center gap-2">
          <span>PROYEKSI SUDUT PERTAMA</span>
          <span className="text-[#FF4400]">⌖</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111]">
        {/* Left: Engineering Orthogonal Drawing Canvas */}
        <div className="lg:col-span-8 p-4 sm:p-6 bg-[#FAFAF8] relative flex flex-col justify-between min-h-[460px]">
          {/* Top Controls on the drawing sheet */}
          <div className="flex items-center justify-between border-b border-[#D8D8D4] pb-3 mb-4 text-xs font-technical">
            <div className="flex items-center gap-2">
              <span className="text-[#666666]">TAMPILAN PROYEKSI:</span>
              <button
                onClick={() => setActiveProjection('front')}
                className={`px-2.5 py-1 border transition-colors ${
                  activeProjection === 'front'
                    ? 'bg-[#111111] text-white border-[#111111] font-bold'
                    : 'bg-white text-[#444444] border-[#D8D8D4] hover:border-[#111111]'
                }`}
              >
                TAMPAK DEPAN
              </button>
              <button
                onClick={() => setActiveProjection('section')}
                className={`px-2.5 py-1 border transition-colors ${
                  activeProjection === 'section'
                    ? 'bg-[#111111] text-white border-[#111111] font-bold'
                    : 'bg-white text-[#444444] border-[#D8D8D4] hover:border-[#111111]'
                }`}
              >
                IRISAN MELINTANG A-A
              </button>
            </div>

            <div className="text-[11px] text-[#666666] hidden sm:block">
              SKALA 1:1 · UNIT: MILIMETER (mm)
            </div>
          </div>

          {/* Blueprint SVG Canvas */}
          <div className="w-full max-w-xl mx-auto py-2">
            {activeProjection === 'front' ? (
              <svg viewBox="0 0 520 310" className="w-full h-auto select-none font-technical">
                {/* Outer Dimension Lines Top */}
                <g stroke="#888888" strokeWidth="0.8">
                  <line x1="60" y1="20" x2="460" y2="20" />
                  <line x1="60" y1="14" x2="60" y2="26" />
                  <line x1="460" y1="14" x2="460" y2="26" />
                  <text x="260" y="15" textAnchor="middle" fill="#222222" fontSize="10" fontWeight="600">
                    160.00 mm
                  </text>
                </g>

                {/* Outer Dimension Lines Left */}
                <g stroke="#888888" strokeWidth="0.8">
                  <line x1="30" y1="40" x2="30" y2="260" />
                  <line x1="24" y1="40" x2="36" y2="40" />
                  <line x1="24" y1="260" x2="36" y2="260" />
                  <text x="20" y="155" textAnchor="middle" transform="rotate(-90 20 155)" fill="#222222" fontSize="10" fontWeight="600">
                    95.00 mm
                  </text>
                </g>

                {/* Main Enclosure Body */}
                <rect x="60" y="40" width="400" height="220" fill="#FFFFFF" stroke="#111111" strokeWidth="2" />

                {/* Section Cut Indicator Line A-A */}
                <g stroke="#FF4400" strokeWidth="1.2" strokeDasharray="8 3 2 3">
                  <line x1="45" y1="150" x2="475" y2="150" />
                  <line x1="45" y1="135" x2="45" y2="150" strokeWidth="2.5" />
                  <line x1="475" y1="135" x2="475" y2="150" strokeWidth="2.5" />
                  <text x="45" y="130" fill="#FF4400" fontSize="11" fontWeight="700">A</text>
                  <text x="475" y="130" fill="#FF4400" fontSize="11" fontWeight="700">A</text>
                </g>

                {/* Speaker Grille Hole Matrix (11x7) */}
                <g fill="#222222">
                  {Array.from({ length: 7 }).map((_, r) =>
                    Array.from({ length: 11 }).map((_, c) => {
                      const cx = 95 + c * 18 + (r % 2 === 1 ? 9 : 0);
                      const cy = 75 + r * 18;
                      return <circle key={`hole-${r}-${c}`} cx={cx} cy={cy} r="3.2" />;
                    })
                  )}
                </g>
                <text x="185" y="215" textAnchor="middle" fill="#666666" fontSize="9">
                  77× LUBANG PERFORASI Ø1.6 mm (OPEN AREA 38.5%)
                </text>

                {/* Vertical Divider Line */}
                <line x1="320" y1="50" x2="320" y2="250" stroke="#CCCCCC" strokeWidth="1" strokeDasharray="3 3" />

                {/* Tuning Dial (Aluminum 6061-T6 knurled) */}
                <circle cx="400" cy="115" r="46" fill="#F0F0EE" stroke="#111111" strokeWidth="1.8" />
                <circle cx="400" cy="115" r="40" fill="#FFFFFF" stroke="#666666" strokeWidth="1" strokeDasharray="2 2" />
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 400 + Math.cos(rad) * 41;
                  const y1 = 115 + Math.sin(rad) * 41;
                  const x2 = 400 + Math.cos(rad) * 45.5;
                  const y2 = 115 + Math.sin(rad) * 45.5;
                  return <line key={`teeth-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#333333" strokeWidth="1.5" />;
                })}
                {/* Dial indicator dot */}
                <circle cx="400" cy="85" r="3.5" fill="#FF4400" />
                <circle cx="400" cy="115" r="7" fill="#111111" />

                {/* Rotary Frequency Scale */}
                <g stroke="#444444" strokeWidth="1">
                  <line x1="355" y1="180" x2="445" y2="180" stroke="#111111" strokeWidth="1.5" />
                  <line x1="355" y1="175" x2="355" y2="185" />
                  <line x1="385" y1="177" x2="385" y2="183" />
                  <line x1="400" y1="174" x2="400" y2="186" stroke="#FF4400" strokeWidth="2" />
                  <line x1="415" y1="177" x2="415" y2="183" />
                  <line x1="445" y1="175" x2="445" y2="185" />
                </g>
                <text x="400" y="196" textAnchor="middle" fill="#FF4400" fontSize="9" fontWeight="700">
                  88 - 108 MHz
                </text>

                {/* Primary Orange Power Switch (Flush Mounted) */}
                <rect x="375" y="215" width="50" height="24" fill="#FF4400" stroke="#111111" strokeWidth="1.5" />
                <text x="400" y="230" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">
                  POWER
                </text>

                {/* Reveal line indicator */}
                <line x1="60" y1="250" x2="460" y2="250" stroke="#666666" strokeWidth="1" strokeDasharray="4 2" />
                <text x="65" y="246" fill="#888888" fontSize="8">
                  REVEAL GAP 0.4 mm
                </text>
              </svg>
            ) : (
              /* Section A-A View */
              <svg viewBox="0 0 520 310" className="w-full h-auto select-none font-technical">
                <text x="260" y="25" textAnchor="middle" fill="#111111" fontSize="12" fontWeight="700">
                  POTONGAN A-A (SKALA 1:1) — DETAIL STRUKTUR INTERNAL
                </text>

                {/* Outer Molded Shell with cross-hatch representation */}
                <path
                  d="M 60 50 L 460 50 L 460 80 L 442 80 L 442 68 L 78 68 L 78 80 L 60 80 Z"
                  fill="#EEEEEC"
                  stroke="#111111"
                  strokeWidth="1.5"
                />

                {/* Nominal Wall Dimension Callout */}
                <g stroke="#FF4400" strokeWidth="1">
                  <line x1="78" y1="68" x2="78" y2="50" />
                  <line x1="95" y1="59" x2="115" y2="59" />
                  <text x="120" y="62" fill="#FF4400" fontSize="9" fontWeight="700">
                    t_nom = 2.20 mm
                  </text>
                </g>

                {/* Reinforcing Ribs (t_rib = 0.55t) */}
                <g fill="#D5D5D0" stroke="#111111" strokeWidth="1.2">
                  <path d="M 180 68 L 192 68 L 190 170 L 182 170 Z" />
                  <path d="M 320 68 L 332 68 L 330 170 L 322 170 Z" />
                </g>
                <text x="186" y="190" textAnchor="middle" fill="#222222" fontSize="9">
                  RUSUK t = 1.2 mm (DRAFT 1.0°)
                </text>

                {/* Screw Boss Detail */}
                <g stroke="#111111" strokeWidth="1.2">
                  <rect x="110" y="110" width="24" height="60" fill="#D5D5D0" />
                  <rect x="117" y="125" width="10" height="45" fill="#FFFFFF" />
                  <line x1="122" y1="110" x2="122" y2="185" stroke="#FF4400" strokeDasharray="3 2" />
                </g>
                <text x="122" y="200" textAnchor="middle" fill="#222222" fontSize="9">
                  BOSS OD Ø6.0 / ID Ø2.4 mm
                </text>

                {/* Snap Fit Cantilever Latch */}
                <g stroke="#111111" strokeWidth="1.2" fill="#FF4400">
                  <path d="M 442 68 L 442 165 L 452 170 L 442 175 L 442 195 L 436 195 L 436 68 Z" />
                </g>
                <text x="440" y="215" textAnchor="middle" fill="#FF4400" fontSize="9" fontWeight="700">
                  SNAP-FIT KANTILEVER
                </text>

                {/* Lower Rear Housing Base */}
                <path
                  d="M 60 220 L 460 220 L 460 250 L 442 250 L 442 238 L 78 238 L 78 250 L 60 250 Z"
                  fill="#EEEEEC"
                  stroke="#111111"
                  strokeWidth="1.5"
                />

                {/* Reveal Joint Step Callout */}
                <rect x="58" y="216" width="6" height="8" fill="#FF4400" />
                <text x="75" y="233" fill="#222222" fontSize="9">
                  LANGKAH REVEAL: 0.6 mm × 0.4 mm
                </text>
              </svg>
            )}
          </div>

          {/* Standard ISO 7200 Title Block (Schriftfeld) at the bottom */}
          <div className="border border-[#111111] bg-white text-[10px] font-technical divide-y divide-[#111111] mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#111111] p-1.5 bg-[#F6F6F4]">
              <div><span className="text-[#777777]">OBJEK:</span> SASIS AUDIO TRANSCEIVER</div>
              <div><span className="text-[#777777]">BAHAN:</span> ABS INJEKSI / AL 6061</div>
              <div><span className="text-[#777777]">STANDAR:</span> DIN 16901 / ISO 286</div>
              <div><span className="text-[#777777]">STATUS:</span> DOKUMEN EDUKASI DFM</div>
            </div>
            <div className="flex flex-wrap items-center justify-between p-1.5 gap-2 text-[#555555]">
              <span>REKAFORM METROLOGY & DFM ARCHIVE</span>
              <span>KONTROL TOLERANSI: KELAS 130 (DIN 16901)</span>
              <span>LEMBAR 01 DARI 01</span>
            </div>
          </div>
        </div>

        {/* Right: Technical Inspector Panel */}
        <div className="lg:col-span-4 p-4 sm:p-6 bg-white flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-technical text-[#888888] uppercase mb-1">
              INSPEKSI PARAMETER REKAYASA
            </div>
            <h3 className="text-xl font-extrabold text-[#111111] mb-4">
              Aturan & Batasan Desain Cetakan
            </h3>

            {/* Spec selector buttons - purely architectural */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {[
                { id: 'rib', label: '1. Rusuk (Ribs)' },
                { id: 'draft', label: '2. Draft Angle' },
                { id: 'boss', label: '3. Boss Baut' },
                { id: 'reveal', label: '4. Reveal Joint' },
                { id: 'dial', label: '5. Fitment H7/h6' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedSpec(item.id as any)}
                  className={`px-2.5 py-1 text-xs font-technical border transition-colors ${
                    selectedSpec === item.id
                      ? 'bg-[#111111] text-white border-[#111111] font-bold'
                      : 'bg-[#F6F6F4] text-[#444444] border-[#D8D8D4] hover:border-[#111111]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Current Spec Details */}
            <div className="space-y-4">
              <div className="border-b border-[#E5E5E2] pb-3">
                <div className="text-[11px] font-technical text-[#FF4400] font-bold">
                  {current.code}
                </div>
                <h4 className="text-base font-bold text-[#111111] mt-0.5">
                  {current.title}
                </h4>
              </div>

              <div className="text-xs text-[#333333] leading-relaxed">
                <strong className="text-[#111111] block mb-1">Aturan Desain:</strong>
                {current.rule}
              </div>

              <div className="p-3 bg-[#F6F6F4] border-l-2 border-[#111111] font-technical text-xs text-[#111111]">
                {current.formula}
              </div>

              <div className="text-xs text-[#555555] leading-relaxed">
                <strong className="text-[#111111] block mb-1">Konsekuensi Fisik Manufaktur:</strong>
                {current.consequence}
              </div>

              <div className="text-[11px] font-technical text-[#444444] bg-[#FAFAF8] p-2.5 border border-[#E5E5E2]">
                <strong className="text-[#111111]">Batas Toleransi:</strong> {current.tolerance}
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-[#E5E5E2] text-[11px] font-technical text-[#888888] flex items-center justify-between">
            <span>DOKUMEN DOKUMENTASI DFM</span>
            <span>VERSI CETAK TEKNIK</span>
          </div>
        </div>
      </div>
    </section>
  );
};
