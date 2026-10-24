export interface Article {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  technicalKeypoints: {
    label: string;
    value: string;
  }[];
  contentSections: {
    heading: string;
    paragraphs: string[];
    technicalTable?: {
      headers: string[];
      rows: string[][];
    };
    callout?: {
      title: string;
      body: string;
    };
  }[];
}

export interface MaterialItem {
  id: string;
  name: string;
  code: string;
  family: 'Logam Ringan' | 'Logam Die-Cast' | 'Polimer Rekayasa' | 'Polimer Komoditas' | 'Elastomer';
  processes: string[];
  density: string; // g/cm³
  tensileStrength: string; // MPa
  maxTemp: string; // °C
  minWallThickness: string; // mm
  toolingCost: 'Rendah' | 'Sedang' | 'Sedang - Tinggi' | 'Tinggi' | 'Sangat Tinggi';
  economicVolume: string; // unit
  shrinkageRate: string; // %
  applications: string[];
  engineeringNotes: string;
}

export interface CmfSpec {
  code: string;
  name: string;
  category: 'Finishing Logam' | 'Tekstur Cetakan (EDM)' | 'Pelapisan Permukaan' | 'Pewarnaan Polimer';
  roughnessRa: string;
  processMethod: string;
  visualTactile: string;
  recommendedSubstrate: string;
  industrialStandard: string;
  designRule: string;
}

export interface LexiconItem {
  term: string;
  origin: string;
  definition: string;
  engineeringImpact: string;
  practicalFormulaOrStandard?: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'dfm-injection-molding',
    number: '01',
    title: 'Metodologi DFM pada Pencetakan Injeksi Termoplastik',
    subtitle: 'Analisis ketebalan dinding nominal, sudut kemiringan (draft angle), dan mitigasi cacat volumetrik',
    category: 'Manufaktur & Perkakas',
    readTime: '9 menit baca',
    date: '14 Oktober 2026',
    summary: 'Pencetakan injeksi polimer menuntut kepatuhan geometris yang kaku terhadap perilaku aliran lelehan (melt flow) dan laju penyusutan volumetrik saat pendinginan. Kesalahan penentuan ketebalan dinding nominal menjadi penyebab utama timbulnya sink marks, warpage, dan siklus injeksi yang tidak ekonomis.',
    technicalKeypoints: [
      { label: 'Ketebalan Rusuk Penguat', value: '50% - 60% dari dinding nominal' },
      { label: 'Draft Angle Minimum', value: '1.0° (halus) / +1.0° per 0.025mm tekstur' },
      { label: 'Pencegahan Sink Mark', value: 'Hindari akumulasi massa pada persimpangan' },
      { label: 'Radius Sudut (Fillet)', value: 'R internal ≥ 0.5t (t = tebal dinding)' }
    ],
    contentSections: [
      {
        heading: 'Prinsip Ketebalan Dinding Nominal (Nominal Wall Thickness)',
        paragraphs: [
          'Dalam rekayasa produk polimer, aturan nomor satu adalah mempertahankan keseragaman ketebalan dinding (uniform wall thickness) di seluruh geometri part. Polimer termoplastik menyusut secara volumetrik ketika bertransisi dari fase leleh cair menjadi padat. Jika sebuah komponen memiliki variasi ketebalan dinding yang drastis, area berdinding tebal akan mendingin jauh lebih lambat dibandingkan area berdinding tipis.',
          'Diferensial laju pendinginan ini membangkitkan tegangan sisa internal (residual stress). Pada bagian luar, pendinginan lambat di inti penampang yang tebal akan menarik lapisan kulit luar yang sudah memadat ke arah dalam, menghasilkan cekungan visual yang disebut sink mark. Bila struktur bagian luar kaku, kontraksi ini akan memicu void (rongga udara vakum di dalam inti material).',
          'Apabila perubahan ketebalan dinding tidak dapat dihindari karena kebutuhan fungsional atau arsitektur internal, transisi harus dibuat landai menggunakan kemiringan (taper) dengan rasio panjang transisi minimum 3:1 terhadap perbedaan ketebalan.'
        ],
        technicalTable: {
          headers: ['Material Polimer', 'Rentang Tebal Dinding Rekomendasi (mm)', 'Penyusutan Cetakan / Shrinkage (%)'],
          rows: [
            ['ABS (Acrylonitrile Butadiene Styrene)', '1.20 - 3.50', '0.40 - 0.70'],
            ['PC (Polycarbonate)', '1.50 - 4.00', '0.50 - 0.80'],
            ['PC/ABS Blend', '1.40 - 3.80', '0.50 - 0.75'],
            ['PP (Polypropylene Unfilled)', '0.80 - 3.00', '1.20 - 2.20'],
            ['PA66 (Nylon 6,6 Unfilled)', '0.80 - 3.20', '1.00 - 1.80'],
            ['POM (Acetal / Delrin)', '0.80 - 3.00', '1.50 - 2.50']
          ]
        }
      },
      {
        heading: 'Perancangan Rusuk Penguat (Ribs) dan Dudukan Baut (Bosses)',
        paragraphs: [
          'Perancang produk pemula kerap menebalkan dinding utama untuk meningkatkan kekakuan struktural. Pendekatan ini salah secara rekayasa karena menambah bobot, memperpanjang cycle time pendinginan di mesin secara signifikan, dan memperbesar risiko cacat deformasi. Metode yang benar adalah menambahkan rusuk penguat (reinforcing ribs).',
          'Ketebalan basis rusuk penguat tidak boleh melebihi 50% hingga 60% dari ketebalan dinding nominal yang menopangnya. Jika dinding utama berukuran 2.5 mm, maka tebal rusuk di titik temu maksimum adalah 1.25 - 1.50 mm. Sudut draft pada rusuk penguat dirancang antara 0.5° hingga 1.5° per sisi, dengan ketinggian rusuk tidak melebihi 3 kali tebal dinding nominal guna mencegah tekuk saat ejeksi.'
        ],
        callout: {
          title: 'Formula Desain Dudukan Baut (Screw Boss)',
          body: 'Diameter luar boss (OD) idealnya bernilai 2.0 × diameter ulir baut (d). Ketebalan dinding silinder boss diatur sekitar 60% dari ketebalan dinding produk, dan basis boss harus dihubungkan dengan rusuk penopang (gusset) untuk menyalurkan momen torsi saat proses pengencangan (tightening torque).'
        }
      },
      {
        heading: 'Sudut Kemiringan (Draft Angle) dan Garis Pemisah (Parting Line)',
        paragraphs: [
          'Setiap permukaan yang tegak lurus terhadap arah pembukaan cetakan (draw direction) wajib memiliki draft angle. Tanpa sudut kemiringan, part yang menyusut ke inti cetakan (core) akan menggesek dinding cetakan logam dengan gaya friksi tinggi saat diejeksi, memicu goresan (drag marks) atau merusak pin ejektor.',
          'Untuk permukaan poles cermin (SPI A-2 atau lebih halus), draft angle 1.0° umumnya memadai. Namun, jika perancang menerapkan tekstur spark-erosion atau chemical etching (seperti standar VDI 3400 atau Mold-Tech), sudut draft wajib ditambah minimum 1.0° untuk setiap kedalaman tekstur 0.020 - 0.025 mm. Mengabaikan penambahan draft ini akan merusak integritas tekstur produk sejak siklus cetak pertama.'
        ]
      }
    ]
  },
  {
    id: 'dieter-rams-functionalism',
    number: '02',
    title: 'Fungsionalisme Dieter Rams: Mengapa "Less, but Better" Bukan Sekadar Estetika Minimalis',
    subtitle: 'Analisis dekonstruksi teknik dari integrasi komponen, reduksi part-count, dan kejujuran material',
    category: 'Filosofi & Teori Rekayasa',
    readTime: '8 menit baca',
    date: '02 Oktober 2026',
    summary: 'Seringkali filosofi Dieter Rams disalahartikan sebagai gaya visual serba putih dan kosong. Secara substansi rekayasa desain, prinsip Weniger, aber besser menuntut integrasi arsitektur mekanik yang jauh lebih presisi agar produk dapat meniadakan ornamen tanpa kehilangan fungsi utilitas.',
    technicalKeypoints: [
      { label: 'Fokus Utama', value: 'Kejujuran material & keterbacaan antarmuka' },
      { label: 'Pendekatan Manufaktur', value: 'Design for Assembly (DFA) terarah' },
      { label: 'Prinsip Kunci', value: 'Produk sebagai perkakas netral, bukan monumen ego' },
      { label: 'Metrik Evaluasi', value: '10 Kriteria Objektif Desain Fungsional' }
    ],
    contentSections: [
      {
        heading: 'Reduksi Ornamen sebagai Konsekuensi Optimasi Rekayasa',
        paragraphs: [
          'Pada era keemasan Braun di bawah kepemimpinan desain Dieter Rams dan Dietrich Lubs, penghilangan dekorasi lahir dari tuntutan rasionalitas produksi dan psikologi pengguna. Ornamen dekoratif pada barang konsumen sering kali difungsikan sebagai kamuflase untuk menutupi sambungan molding yang kasar, celah toleransi perakitan yang longgar, atau ketidakseragaman permukaan material.',
          'Ketika desainer memutuskan untuk membuat permukaan yang sepenuhnya rata, tegas, dan monokromatik, setiap penyimpangan celah (gap & flushness) sebesar 0.2 mm akan langsung tertangkap oleh mata manusia. Desain minimalis fungsional justru menuntut kontrol toleransi manufaktur (GD&T) yang jauh lebih ketat dibanding produk berornamen rumit.'
        ]
      },
      {
        heading: 'Kejujuran Material (Honest Materiality)',
        paragraphs: [
          'Prinsip keenam Rams berbunyi: Desain yang baik adalah jujur (Good design is honest). Dalam domain rekayasa material, ini berarti menolak perlakuan kosmetik yang memalsukan karakteristik bahan: polimer cetak injeksi tidak boleh dicat menyerupai serat kayu; pelat lembaran logam tidak boleh dicetak dengan tekstur kulit buatan.',
          'Plastik diakui sebagai material sintesis modern dengan keunggulan fluiditas bentuk kompleks, isolasi kelistrikan, dan ketahanan korosi. Logam aluminium diekspos melalui proses anodisasi atau bead-blasting untuk menonjolkan sifat dingin, kaku, dan kemurnian metalurginya. Kejujuran ini mempermudah identifikasi material pada akhir masa pakai produk (end-of-life recycling).'
        ]
      },
      {
        heading: 'Hierarki Antarmuka Fisik yang Dapat Dipahami Secara Intuitif',
        paragraphs: [
          'Pada perangkat audio ikonik seperti Braun T3 Pocket Radio (1958) atau pemutar piringan hitam SK4 (1956), setiap kenop putar dan sakelar toggle memiliki ukuran proporsional terhadap frekuensi penggunaannya. Kenop penala frekuensi dibuat paling dominan dengan skala penomoran linier yang jelas.',
          'Aksen warna tidak digunakan secara sembarangan sebagai pemanis visual. Rams menggunakan satu titik aksen kontras (seperti warna oranye sinyal atau hijau zaitun) secara eksklusif untuk menandai elemen interaksi primer: tombol daya (power button) atau indikator frekuensi aktif. Inilah definisi sejati dari antarmuka yang menjelaskan dirinya sendiri (self-explanatory).'
        ]
      }
    ]
  },
  {
    id: 'ergonomics-anthropometry',
    number: '03',
    title: 'Ergonomi Fisik & Penerapan Data Antropometri pada Perangkat Genggam',
    subtitle: 'Penerapan rentang persentil ke-5 hingga ke-95, diameter pegangan optimal, dan reduksi Cumulative Trauma Disorders',
    category: 'Ergonomi & Rekayasa Manusia',
    readTime: '11 menit baca',
    date: '19 September 2026',
    summary: 'Merancang perkakas genggam atau peranti konsumen portabel tanpa validasi data antropometri biomekanik berisiko menimbulkan kelelahan neuromuskular dini serta cedera regangan berulang (RSI/CTD). Kajian ini membedah dimensi silinder pegangan, clearance jari, dan distribusi gaya palmar.',
    technicalKeypoints: [
      { label: 'Diameter Power Grip', value: '30 mm - 40 mm (optimal 35 mm)' },
      { label: 'Diameter Precision Grip', value: '8 mm - 16 mm (optimal 12 mm)' },
      { label: 'Rentang Desain Standar', value: 'Persentil ke-5 wanita hingga ke-95 pria' },
      { label: 'Batas Tekanan Kontak', value: '< 100 kPa pada jaringan lunak telapak tangan' }
    ],
    contentSections: [
      {
        heading: 'Klasifikasi Grip Biomekanik: Power Grip vs Precision Grip',
        paragraphs: [
          'Dalam rekayasa faktor manusia (human factors engineering), antarmuka pegangan tangan dikelompokkan ke dalam dua postur fungsional utama berdasarkan taksonomi Napier: Power Grip (genggaman tenaga) dan Precision Grip (genggaman presisi).',
          'Pada Power Grip (misal: bor listrik, gergaji, pegangan setang), objek dijepit di antara jari-jari yang melingkar dan telapak tangan, dengan ibu jari memberikan gaya pengunci lawan. Gaya dorong maksimum ditransmisikan melalui lengan bawah. Berdasarkan pengukuran antropometri tangan populasi dewasa, diameter silinder pegangan yang menghasilkan efisiensi transmisi gaya tertinggi berada di rentang 30 mm hingga 40 mm. Diameter di bawah 25 mm memusatkan tegangan kontak pada bantalan lemak tangan, sedangkan diameter di atas 50 mm menurunkan gaya genggam hingga 40% akibat ekstensi tendon fleksor yang berlebih.'
        ],
        technicalTable: {
          headers: ['Parameter Antropometri Tangan', 'Persentil ke-5 Wanita (mm)', 'Persentil ke-50 Gabungan (mm)', 'Persentil ke-95 Pria (mm)'],
          rows: [
            ['Panjang Tangan Total (Hand Length)', '162', '183', '205'],
            ['Lebar Telapak Tangan (Palm Breadth)', '70', '82', '95'],
            ['Diameter Lingkar Genggam (Grip Circumference)', '42', '48', '56'],
            ['Panjang Jari Telunjuk (Index Finger Length)', '64', '73', '82']
          ]
        }
      },
      {
        heading: 'Pencegahan Titik Tekan (Pressure Concentration) dan Pemilihan Elastomer',
        paragraphs: [
          'Jaringan lunak di dasar telapak tangan (thenar dan hypothenar eminence) melindungi saraf median dan ulnar serta arteri palmaris superfisialis. Beban kompresi mekanik yang melampaui 100 kPa pada area ini dalam durasi lama akan menyebabkan mati rasa (paresthesia) dan risiko Carpal Tunnel Syndrome.',
          'Untuk memitigasi hal ini, pegangan wajib dirancang dengan kurvatur anatomis yang mendistribusikan beban secara merata di seluruh permukaan kontak. Penggunaan lapisan overmolding Termoplastik Elastomer (TPE) atau Poliuretan (TPU) dengan tingkat kekerasan Shore 60A hingga 75A memberikan redaman getaran mikro (damping) dan koefisien gesek basah yang memadai tanpa menimbulkan sensasi lengket atau deformasi plastis permanen.'
        ]
      }
    ]
  },
  {
    id: 'material-selection-al-vs-pcabs',
    number: '04',
    title: 'Seleksi Material Komparatif: Paduan Aluminium 6061-T6 vs PC/ABS Blend',
    subtitle: 'Evaluasi kekuatan spesifik, konduktivitas termal untuk disipasi pasif, efektivitas perisai EMI, dan kelayakan biaya perkakas',
    category: 'Material Rekayasa',
    readTime: '10 menit baca',
    date: '08 September 2026',
    summary: 'Pemilihan material untuk selungkup (enclosure) elektronik portabel merupakan kompromi multi-kriteria antara integritas struktural, proteksi interferensi elektromagnetik (EMI), pengelolaan termal prosesor, dan batas keekonomian modal investasi cetakan (tooling capex).',
    technicalKeypoints: [
      { label: 'Densitas Al 6061 vs PC/ABS', value: '2.70 g/cm³ vs 1.15 g/cm³ (rasio 2.35x)' },
      { label: 'Konduktivitas Termal', value: '167 W/m·K (Al) vs 0.22 W/m·K (PC/ABS)' },
      { label: 'Perisai EMI Alami', value: '> 80 dB (Aluminium utuh tanpa pelapisan)' },
      { label: 'Titik Impas Volume Manufaktur', value: '~2,500 unit (CNC Al vs Injeksi PC/ABS)' }
    ],
    contentSections: [
      {
        heading: 'Analisis Sifat Fisik dan Mekanik Komparatif',
        paragraphs: [
          'Paduan aluminium tempa seri 6000 dengan perlakuan panas presipitasi T6 (6061-T6) menawarkan kekuatan luluh (yield strength) sebesar 276 MPa dan modulus elastisitas 68.9 GPa. Sebaliknya, blend polimer PC/ABS (campuran Polikarbonat dan Akrilonitril Butadiena Stiren) memiliki kekuatan tarik sekitar 55 MPa dan modulus elastisitas 2.4 GPa.',
          'Perbedaan modulus elastisitas sebesar hampir 28 kali lipat ini membuktikan bahwa selungkup aluminium mampu menahan defleksi lentur dengan ketebalan dinding yang jauh lebih tipis (0.8 mm - 1.2 mm) dibandingkan casing plastik yang memerlukan ketebalan 1.8 mm - 2.5 mm plus sistem rusuk penguat internal. Walaupun densitas aluminium lebih tinggi (2.70 g/cm³ banding 1.15 g/cm³), pengurangan ketebalan dinding mampu memangkas selisih bobot akhir produk hingga menyisakan margin kurang dari 20%.'
        ],
        technicalTable: {
          headers: ['Properti Material', 'Aluminium 6061-T6 (Milled/Extruded)', 'PC/ABS Grade Injeksi (Unfilled)'],
          rows: [
            ['Kekuatan Tarik / Tensile Strength (MPa)', '310', '52 - 60'],
            ['Kekuatan Luluh / Yield Strength (MPa)', '276', '45 - 55'],
            ['Modulus Elastisitas / Youngs Modulus (GPa)', '68.9', '2.3 - 2.6'],
            ['Konduktivitas Termal (W/m·K)', '167', '0.20 - 0.24'],
            ['Koefisien Muai Termal / CTE (µm/m·°C)', '23.4', '65 - 85'],
            ['Kekerasan Permukaan', '95 Brinell (HB)', 'R-115 Rockwell'],
            ['Ketahanan Api (Flammability Rating)', 'Non-combustible (Logam)', 'UL94 V-0 (grade flame-retardant)']
          ]
        }
      },
      {
        heading: 'Aspek Disipasi Termal dan Kompatibilitas Elektromagnetik (EMC/EMI)',
        paragraphs: [
          'Dalam perangkat elektronik berdaya tinggi (seperti edge computing atau pengisi daya cepat), disipasi panas menjadi parameter pembatas desain. Aluminium dengan konduktivitas termal 167 W/m·K dapat difungsikan langsung sebagai heatsink struktural konduktif yang menyerap panas dari IC utama melalui thermal pad konduktif.',
          'PC/ABS dengan konduktivitas termal rendah (0.22 W/m·K) bertindak sebagai isolator termal. Akibatnya, panas terjebak di dalam sasis, menuntut penambahan heatsink tembaga/aluminium terpisah, kipas pendingin aktif, atau lubang ventilasi udara yang mengorbankan rating perlindungan masuknya cairan/debu (IP Rating).',
          'Selain itu, sasis aluminium memberikan peredaman interferensi elektromagnetik (EMI shielding) alami melebihi 80 dB pada rentang frekuensi 30 MHz - 1 GHz. Untuk menyamai performa ini, sasis polimer PC/ABS wajib melalui proses sekunder berupa pelapisan cat konduktif berbasis tembaga/nikel (conductive paint spraying) atau pelapisan vakum (vacuum metallization), yang menambah biaya rantai pasok dan risiko pelepasan lapisan akibat abrasi.'
        ]
      }
    ]
  },
  {
    id: 'gdt-iso286-fitment',
    number: '05',
    title: 'Toleransi Geometris (GD&T) dan Sistem Pasangan ISO 286 pada Perakitan Mekanik',
    subtitle: 'Standar toleransi lubang dan poros (H7/h6, H7/p6), penentuan datum referensi, dan verifikasi stack-up perakitan',
    category: 'Rekayasa Detail & Perakitan',
    readTime: '9 menit baca',
    date: '28 Agustus 2026',
    summary: 'Gambar teknik tanpa penetapan batas toleransi geometris yang rasional akan menyebabkan penolakan komponen di lini inspeksi atau kegagalan perakitan massal. Pemahaman sistem basis lubang (hole basis system) ISO 286 menjadi fondasi utama rekayasa detail presisi.',
    technicalKeypoints: [
      { label: 'Sistem Acuan Utama', value: 'Sistem Basis Lubang Standar (H)' },
      { label: 'Pasangan Bergerak Presisi', value: 'H7/h6 (Clearance Fit / Sliding)' },
      { label: 'Pasangan Transisi Lokasi', value: 'H7/k6 atau H7/m6 (Push Fit Ringan)' },
      { label: 'Pasangan Paksa (Interference)', value: 'H7/p6 atau H7/s6 (Press-fit permanen)' }
    ],
    contentSections: [
      {
        heading: 'Sistem Basis Lubang (Hole Basis System) ISO 286',
        paragraphs: [
          'Dalam praktik pemesinan modern, membuat lubang dengan diameter bervariasi membutuhkan perkakas potong (reamer, mata bor, broach) khusus yang mahal. Sebaliknya, diameter poros luar (shaft) dapat dengan mudah disesuaikan variasinya pada mesin bubut CNC atau silinder grinding.',
          'Oleh karena itu, standar internasional ISO 286 menetapkan Sistem Basis Lubang sebagai metode standar. Huruf kapital "H" menunjukkan bahwa deviasi batas bawah lubang tepat berada pada garis nol (zero line). Sebagai contoh, untuk lubang nominal Ø10 mm dengan kelas toleransi H7, deviasi batas bawah adalah 0 µm dan deviasi batas atas adalah +15 µm (rentang lubang diterima: 10.000 mm hingga 10.015 mm).'
        ]
      },
      {
        heading: 'Analisis Tiga Kategori Pasangan (Fits)',
        paragraphs: [
          '1. Pasangan Longgar (Clearance Fit, contoh H7/h6): Selalu menyisakan celah positif antara lubang dan poros. Digunakan untuk pin engsel pintu baterai, kenop putar bebas, atau as roda yang memerlukan rotasi bergeser tanpa hambatan mekanis.',
          '2. Pasangan Pas/Transisi (Transition Fit, contoh H7/k6): Menghasilkan sedikit celah atau sedikit interferensi tergantung distribusi statistik toleransi. Digunakan untuk posisi pin pasak (dowel pins) yang harus akurat tetapi masih dapat dibongkar pasang dengan palu lunak.',
          '3. Pasangan Paksa (Interference Fit, contoh H7/p6): Diameter poros selalu lebih besar daripada diameter lubang. Komponen harus dipres menggunakan hidrolik atau dirakit dengan pemanasan termal lubang (shrink fit). Digunakan untuk menancapkan poros baja ke bushing bantalan perunggu secara permanen tanpa bantuan lem atau sekrup.'
        ]
      }
    ]
  }
];

export const RAMS_PRINCIPLES = [
  {
    number: '01',
    nameDe: 'Gutes Design ist innovativ',
    nameId: 'Desain yang baik itu inovatif',
    description: 'Peluang inovasi tidak pernah habis. Perkembangan teknologi selalu menawarkan peluang baru untuk penyempurnaan desain. Namun, desain inovatif selalu berkembang sejalan dengan teknologi rekayasa, tidak pernah menjadi tujuan hiasan yang berdiri sendiri.',
    technicalMetric: 'Tingkat integrasi solusi teknis baru terhadap peningkatan utilitas fungsi primer.',
    guidance: 'Apakah produk mengadopsi teknologi baru untuk memecahkan friksi fungsional nyata pengguna, atau hanya sekadar gimik bentuk?'
  },
  {
    number: '02',
    nameDe: 'Gutes Design macht ein Produkt brauchbar',
    nameId: 'Desain yang baik membuat produk berfaedah',
    description: 'Sebuah produk dibeli untuk digunakan. Produk harus memenuhi kriteria tertentu, tidak hanya fungsional, tetapi juga psikologis dan estetis. Desain menekankan kegunaan produk sambil mengabaikan segala hal yang berpotensi mengurangi nilai gunanya.',
    technicalMetric: 'Efisiensi tugas biomekanik, waktu adaptasi pengguna, dan pencegahan kesalahan pengoperasian.',
    guidance: 'Sejauh mana setiap tombol, handel, dan antarmuka fisik melayani alur kerja primer secara ergonomis?'
  },
  {
    number: '03',
    nameDe: 'Gutes Design ist ästhetisch',
    nameId: 'Desain yang baik itu estetis',
    description: 'Kualitas estetis suatu produk merupakan bagian tak terpisahkan dari kegunaannya, karena produk yang kita gunakan setiap hari memengaruhi kondisi fisik dan kenyamanan mental kita. Hanya objek yang dieksekusi dengan baik yang dapat menjadi indah.',
    technicalMetric: 'Keseimbangan proporsi geometris, keselarasan visual garis celah (gap/flushness), dan harmoni tekstur.',
    guidance: 'Apakah proporsi bentuk produk mengikuti logika geometris struktural internal secara koheren?'
  },
  {
    number: '04',
    nameDe: 'Gutes Design macht ein Produkt verständlich',
    nameId: 'Desain yang baik membuat produk mudah dipahami',
    description: 'Desain memperjelas struktur produk. Lebih dari itu, desain dapat membuat produk berbicara dengan sendirinya. Pada kondisi ideal, desain menjelaskan fungsinya sendiri tanpa membutuhkan buku petunjuk berlembar-lembar.',
    technicalMetric: 'Keterbacaan affordance fisik (mana yang diputar, ditekan, ditarik, atau digeser).',
    guidance: 'Dapatkah pengguna pertama kali mengidentifikasi kontrol primer tanpa membaca manual pengguna?'
  },
  {
    number: '05',
    nameDe: 'Gutes Design ist unaufdringlich',
    nameId: 'Desain yang baik itu tidak menonjolkan diri (unobtrusive)',
    description: 'Produk yang memenuhi suatu tujuan menyerupai perkakas. Produk bukanlah objek dekoratif atau karya seni pajangan. Desain harus netral dan terkendali, memberi ruang bagi ekspresi pribadi pengguna di lingkungannya.',
    technicalMetric: 'Netralitas kromatik dan proporsi visual saat diletakkan dalam ruang hidup pengguna.',
    guidance: 'Apakah perangkat mendominasi ruang secara berlebihan dengan lampu LED mencolok atau ornamen agresif?'
  },
  {
    number: '06',
    nameDe: 'Gutes Design ist ehrlich',
    nameId: 'Desain yang baik itu jujur',
    description: 'Desain tidak memanipulasi produk agar terlihat lebih inovatif, bertenaga, atau berharga daripada kondisi sebenarnya. Desain tidak berusaha memikat konsumen dengan janji-janji performa yang tidak dapat dipenuhi.',
    technicalMetric: 'Kejujuran material (honest materiality), tanpa cat peniru tekstur logam atau ventilasi palsu.',
    guidance: 'Apakah ada sirip pendingin palsu, jahitan palsu pada plastik, atau klaim visual yang memanipulasi persepsi?'
  },
  {
    number: '07',
    nameDe: 'Gutes Design ist langlebig',
    nameId: 'Desain yang baik itu awet (long-lasting)',
    description: 'Desain menghindari keusangan akibat tren mode yang cepat berganti. Bahkan dalam masyarakat konsumtif saat ini, desain yang dieksekusi dengan baik tidak pernah tampak usang setelah beberapa tahun pemakaian.',
    technicalMetric: 'Ketahanan siklus fatik mekanik, ketersediaan suku cadang, dan kemudahan penggantian baterai/komponen aus.',
    guidance: 'Apakah produk dirancang dapat dibongkar dengan perkakas standar tanpa merusak sasis plastik?'
  },
  {
    number: '08',
    nameDe: 'Gutes Design ist konsequent bis ins letzte Detail',
    nameId: 'Desain yang baik itu konsisten hingga detail terkecil',
    description: 'Tidak ada yang boleh ditinggalkan secara kebetulan atau acak. Ketelitian dan akurasi dalam proses desain menunjukkan rasa hormat terdalam perancang terhadap konsumen.',
    technicalMetric: 'Konsistensi toleransi belahan cetakan (parting line), radius sudut, dan kekencangan sambungan.',
    guidance: 'Apakah kepala sekrup, kisi ventilasi, dan tombol samping diposisikan pada grid acuan yang konsisten?'
  },
  {
    number: '09',
    nameDe: 'Gutes Design ist umweltfreundlich',
    nameId: 'Desain yang baik itu ramah lingkungan',
    description: 'Desain memberikan kontribusi penting bagi pelestarian lingkungan hidup. Desain meminimalkan pencemaran visual dan fisik di sepanjang siklus hidup produk, mulai dari ekstraksi bahan baku hingga pembuangan akhir.',
    technicalMetric: 'Pemberian kode identifikasi daur ulang resin (SPI mark), reduksi part-count, dan eliminasi senyawa toksik.',
    guidance: 'Dapatkah part polimer dipisahkan dari rangka logam dalam waktu kurang dari 2 menit untuk proses daur ulang?'
  },
  {
    number: '10',
    nameDe: 'Gutes Design ist so wenig Design wie möglich',
    nameId: 'Desain yang baik adalah sesedikit mungkin desain',
    description: 'Kembali ke kemurnian, kembali ke kesederhanaan. Sedikit tapi lebih baik — karena ia berkonsentrasi pada aspek-aspek esensial, dan produk tidak dibebani oleh hal-hal yang tidak penting.',
    technicalMetric: 'Indeks efisiensi DFA (Design for Assembly): rasio komponen esensial teoritis terhadap total komponen fisik.',
    guidance: 'Jika satu bagian atau fitur ini dihilangkan, apakah fungsi dasar produk tetap dapat beroperasi sempurna?'
  }
];

export const MATERIALS_DATABASE: MaterialItem[] = [
  {
    id: 'mat-al-6061',
    name: 'Aluminium 6061-T6',
    code: 'Al-Mg-Si Alloy',
    family: 'Logam Ringan',
    processes: ['CNC Milling', 'Ekstrusi Profil', 'Lembaran Sheet Metal'],
    density: '2.70',
    tensileStrength: '310',
    maxTemp: '150',
    minWallThickness: '0.80',
    toolingCost: 'Sedang',
    economicVolume: '10 - 5,000',
    shrinkageRate: 'N/A (Subtraktif)',
    applications: ['Sasis unibody laptop', 'Rangka drone industri', 'Heatsink pendingin', 'Bodi kamera presisi'],
    engineeringNotes: 'Sangat ideal untuk pemesinan CNC presisi tinggi. Dapat dianodisasi (Type II/III) untuk proteksi korosi dan pewarnaan tahan gores.'
  },
  {
    id: 'mat-al-adc12',
    name: 'Paduan ADC12 (A383)',
    code: 'Al-Si-Cu Die Cast',
    family: 'Logam Die-Cast',
    processes: ['High Pressure Die Casting (HPDC)'],
    density: '2.75',
    tensileStrength: '310',
    maxTemp: '180',
    minWallThickness: '1.50',
    toolingCost: 'Sangat Tinggi',
    economicVolume: '5,000+',
    shrinkageRate: '0.50 - 0.70',
    applications: ['Rumah gearbox perkakas listrik', 'Casing inverter otomotif', 'Rangka struktural monitor'],
    engineeringNotes: 'Fluiditas lelehan sangat tinggi saat disuntikkan ke cetakan baja keras. Wajib memperhatikan porositas gas internal pada area dinding tebal.'
  },
  {
    id: 'mat-pc-abs',
    name: 'PC/ABS Blend',
    code: 'Polycarbonate / ABS',
    family: 'Polimer Rekayasa',
    processes: ['Injection Molding', 'Thermoforming'],
    density: '1.15',
    tensileStrength: '55',
    maxTemp: '105',
    minWallThickness: '1.50',
    toolingCost: 'Tinggi',
    economicVolume: '2,000+',
    shrinkageRate: '0.50 - 0.70',
    applications: ['Selungkup router nirkabel', 'Panel instrumen otomotif', 'Casing proyektor', 'Terminal POS'],
    engineeringNotes: 'Menggabungkan kekuatan benturan tinggi dari PC dengan kemudahan proses alir cetak dan ketahanan suhu dari ABS. Standar emas casing elektronik.'
  },
  {
    id: 'mat-abs-inj',
    name: 'ABS Terpolimer',
    code: 'Acrylonitrile Butadiene Styrene',
    family: 'Polimer Komoditas',
    processes: ['Injection Molding', 'Ekstrusi'],
    density: '1.05',
    tensileStrength: '45',
    maxTemp: '85',
    minWallThickness: '1.20',
    toolingCost: 'Tinggi',
    economicVolume: '1,000+',
    shrinkageRate: '0.40 - 0.70',
    applications: ['Perangkat audio rumah tangga', 'Keyboard mekanik', 'Remote control', 'Casing mainan teknis'],
    engineeringNotes: 'Stabilitas dimensional baik, mudah direkatkan dengan pelarut, dan menerima perlakuan elektroplating krom nikel dengan sangat baik.'
  },
  {
    id: 'mat-pom-acetal',
    name: 'POM (Polioksimetilena / Acetal)',
    code: 'Polyoxymethylene (Delrin)',
    family: 'Polimer Rekayasa',
    processes: ['Injection Molding', 'CNC Machining'],
    density: '1.41',
    tensileStrength: '68',
    maxTemp: '100',
    minWallThickness: '0.80',
    toolingCost: 'Tinggi',
    economicVolume: '1,000+',
    shrinkageRate: '1.80 - 2.50',
    applications: ['Roda gigi presisi printer', 'Mekanisme klik sakelar', 'Rel geser laci', 'Katup fluida'],
    engineeringNotes: 'Koefisien gesek sangat rendah dan ketahanan aus yang superior tanpa pelumas tambahan. Penyusutan cetakan tinggi menuntut kompensasi core cetakan presisi.'
  },
  {
    id: 'mat-pa66-gf30',
    name: 'Nylon PA66 + 30% Glass Fiber',
    code: 'PA66-GF30',
    family: 'Polimer Rekayasa',
    processes: ['Injection Molding'],
    density: '1.36',
    tensileStrength: '175',
    maxTemp: '140',
    minWallThickness: '1.20',
    toolingCost: 'Tinggi',
    economicVolume: '2,000+',
    shrinkageRate: '0.30 - 0.80',
    applications: ['Bodi gerinda tangan', 'Kipas radiator industri', 'Pedal kopling', 'Konektor harness listrik'],
    engineeringNotes: 'Kekuatan tarik dan modulus lentur luar biasa tinggi menyerupai logam. Sifat abrasif serat kaca mempercepat keausan gerbang injeksi cetakan baja.'
  },
  {
    id: 'mat-tpe-overmold',
    name: 'Termoplastik Elastomer (TPE)',
    code: 'TPE / TPV Shore 65A',
    family: 'Elastomer',
    processes: ['2K Multi-Shot Injection', 'Overmolding'],
    density: '0.98',
    tensileStrength: '12',
    maxTemp: '80',
    minWallThickness: '1.00',
    toolingCost: 'Sangat Tinggi',
    economicVolume: '5,000+',
    shrinkageRate: '1.50 - 2.50',
    applications: ['Grip ergonomis bor', 'Segel kedap air IP67', 'Kaki peredam getaran', 'Tombol empuk kedap air'],
    engineeringNotes: 'Diikatkan secara kimiawi (chemical bonding) di atas substrat kaku PP atau PC/ABS dalam cetakan injeksi dua barel (two-shot mold).'
  },
  {
    id: 'mat-sus304',
    name: 'Baja Tahan Karat SUS304',
    code: 'Austenitic 18/8 Stainless Steel',
    family: 'Logam Ringan',
    processes: ['Stamping Press', 'Deep Drawing', 'Laser Cutting'],
    density: '7.93',
    tensileStrength: '520',
    maxTemp: '400',
    minWallThickness: '0.40',
    toolingCost: 'Sedang - Tinggi',
    economicVolume: '500+',
    shrinkageRate: 'N/A (Plastis)',
    applications: ['Kisi speaker mikro', 'Pelindung internal EMI', 'Engsel pegas torsi', 'Bodi termos vakum'],
    engineeringNotes: 'Ketahanan korosi kimia luar biasa. Bersifat non-magnetik pada kondisi anil, namun dapat mengalami magnetisasi parsial akibat pengerasan regangan (work hardening).'
  }
];

export const CMF_SPECIFICATIONS: CmfSpec[] = [
  {
    code: 'CMF-01',
    name: 'Anodizing Tipe II (Sulfuric Acid Anodize)',
    category: 'Finishing Logam',
    roughnessRa: '0.4 - 0.8 µm',
    processMethod: 'Oksidasi anodik elektrokimia membentuk lapisan aluminium oksida Al₂O₃ berpori (ketebalan 10 - 25 µm), dilanjutkan dengan perendaman zat pewarna organik dan penyegelan (sealing hydro-thermal).',
    visualTactile: 'Matte satin halus, dingin di sentuhan jari, tidak meninggalkan sidik jari jika dilapisi seal Teflon.',
    recommendedSubstrate: 'Aluminium seri 6000 (6061, 6063) dan seri 5000.',
    industrialStandard: 'MIL-A-8625 Type II Class 1 (Clear) / Class 2 (Dyed)',
    designRule: 'Pertimbangkan pertumbuhan dimensi sekitar 50% dari tebal lapisan ke luar permukaan dan 50% penetrasi ke dalam logam dasar.'
  },
  {
    code: 'CMF-02',
    name: 'Tekstur Erosi Percikan Listrik VDI 3400 (VDI 24 - 30)',
    category: 'Tekstur Cetakan (EDM)',
    roughnessRa: '1.6 - 3.2 µm',
    processMethod: 'Pembentukan tekstur mikro langsung pada permukaan rongga cetakan baja (mold steel) menggunakan elektroda tembaga/grafit mesin Electrical Discharge Machining (EDM).',
    visualTactile: 'Tekstur kabut mikro (micro-matte stippled) yang menyebarkan refleksi cahaya secara merata, menyamarkan bekas garis aliran plastik (knit lines).',
    recommendedSubstrate: 'ABS, PC/ABS, Polipropilena (PP), Nylon.',
    industrialStandard: 'Verein Deutscher Ingenieure VDI 3400 Scale (VDI 12 hingga VDI 45)',
    designRule: 'Tambahkan draft angle minimal 1.5° untuk VDI 24, dan minimal 2.5° untuk VDI 30 guna menghindari goresan seret saat ejeksi.'
  },
  {
    code: 'CMF-03',
    name: 'Penembakan Butiran Kaca (Bead Blasting) Grit #120',
    category: 'Finishing Logam',
    roughnessRa: '0.8 - 1.2 µm',
    processMethod: 'Penyemprotan partikel bola kaca mikroskopis (glass beads) dengan tekanan udara terkompresi 4-6 bar untuk membersihkan bekas jalur pahat frais (toolpaths) CNC.',
    visualTactile: 'Permukaan buram seragam (velvet matte), bebas silau, memberikan friksi taktil yang mantap tanpa terasa kasar seperti amplas.',
    recommendedSubstrate: 'Paduan Aluminium, Paduan Magnesium, Titanium, Baja Stainless.',
    industrialStandard: 'ASTM D4940 / Standar Industri Permukaan Dirgantara',
    designRule: 'Lindungi ulir sekrup internal dan permukaan referensi bearing menggunakan masking cap karet sebelum proses penembakan.'
  },
  {
    code: 'CMF-04',
    name: 'Pelapisan Deposisi Uap Fisik (PVD Titanium Nitride)',
    category: 'Pelapisan Permukaan',
    roughnessRa: 'Sesuai substrat (< 0.2 µm)',
    processMethod: 'Penguapan target logam murni dalam ruang hampa udara (vacuum chamber) suhu tinggi, bereaksi dengan gas reaktif untuk mengendapkan film keramik ultra-keras (1.5 - 4.0 µm).',
    visualTactile: 'Kilap metalik mendalam (emas TiN, abu-abu gunmetal TiCN, atau hitam pekat DLC) dengan ketahanan abrasi luar biasa tinggi.',
    recommendedSubstrate: 'Baja Stainless SUS316L/SUS304, Paduan Titanium, Kuningan.',
    industrialStandard: 'ISO 27874 / ASTM B733',
    designRule: 'Substrat wajib dipoles hingga tingkat cermin (mirror polish Ra < 0.05 µm) sebelum PVD jika menginginkan tampilan reflektif mewah.'
  }
];

export const LEXICON: LexiconItem[] = [
  {
    term: 'Draft Angle',
    origin: 'Bahasa Inggris Teknik Cetakan',
    definition: 'Kemiringan sudut konis yang diberikan pada dinding vertikal komponen cetakan (injeksi polimer atau die casting logam) searah dengan garis pembukaan cetakan.',
    engineeringImpact: 'Memungkinkan pelepasan produk secara instan begitu cetakan membuka tanpa gaya gesek kontinu yang merusak permukaan part.',
    practicalFormulaOrStandard: 'Standar umum: 1.0° - 2.0° per sisi pada permukaan halus; bertambah 1.0° per 0.025 mm kedalaman tekstur erosi.'
  },
  {
    term: 'Parting Line (Garis Pemisah Cetakan)',
    origin: 'Teknologi Manufaktur Tooling',
    definition: 'Garis pertemuan fisik antara pelat rongga cetakan (cavity plate) dan pelat inti (core plate) pada cetakan injeksi tertutup.',
    engineeringImpact: 'Meninggalkan jejak garis sambungan mikro (flash line). Wajib ditempatkan pada sudut natural produk atau area tersembunyi agar tidak mengganggu ergonomi sentuhan dan visual.',
    practicalFormulaOrStandard: 'ISO 1101 untuk deviasi kelurusan dan kerataan permukaan pasangan pelat cetakan.'
  },
  {
    term: 'Design for Assembly (DFA)',
    origin: 'Metodologi Rekayasa Boothroyd & Dewhurst',
    definition: 'Pendekatan rekayasa sistematis untuk merancang produk sedemikian rupa sehingga waktu, kompleksitas, dan biaya perakitan dapat diminimalkan melalui reduksi part count dan standardisasi sambungan.',
    engineeringImpact: 'Mengganti sambungan sekrup logam dengan cantilever snap-fit terintegrasi mampu memangkas waktu perakitan hingga 65% dan mengeliminasi perkakas torsi di lantai pabrik.',
    practicalFormulaOrStandard: 'Efisiensi DFA = (3 × Jumlah Part Esensial Teoritis) / Estimasi Waktu Total Perakitan.'
  },
  {
    term: 'Sink Mark',
    origin: 'Cacat Manufaktur Polimer',
    definition: 'Cekungan atau depresi lokal pada permukaan luar benda cetak plastik akibat kontraksi termal volumetrik berlebih pada area massa tebal di belakang permukaan tersebut.',
    engineeringImpact: 'Merusak estetika visual secara fatal, terutama pada permukaan glossy atau semi-glossy di bawah pantulan cahaya langsung.',
    practicalFormulaOrStandard: 'Batasi ketebalan rusuk/boss penopang di balik dinding utama tidak lebih dari 0.6 × tebal dinding nominal.'
  },
  {
    term: 'Geometric Dimensioning and Tolerancing (GD&T)',
    origin: 'Standar ASME Y14.5 / ISO 1101',
    definition: 'Bahasa simbolik pada gambar teknik yang mendefinisikan deviasi geometri bentuk, orientasi, profil, dan lokasi fitur part secara fungsional terhadap sistem datum acuan.',
    engineeringImpact: 'Memastikan komponen yang diproduksi oleh vendor berbeda di belahan dunia lain tetap dapat dirakit dengan pas (interchangeability) tanpa perlu fitting manual.',
    practicalFormulaOrStandard: 'Penerapan Maximum Material Condition (MMC) dan Least Material Condition (LMC) untuk mengoptimalkan bonus toleransi produksi.'
  },
  {
    term: 'Cantilever Snap-Fit',
    origin: 'Mekanika Rekayasa Sambungan Polimer',
    definition: 'Fitur pengunci mekanis berupa balok kantilever dengan kait runcing di ujungnya, yang melentur sesaat saat dirakit lalu kembali ke posisi rileks di dalam undercut pasangan.',
    engineeringImpact: 'Menghilangkan kebutuhan sekrup, mur, dan lem. Dapat dirancang sebagai sambungan permanen atau dapat dilepas (detachable) dengan bantuan dorongan pin.',
    practicalFormulaOrStandard: 'Regangan lentur maksimum: ε = 1.5 × (t × y) / L² ≤ regangan izin material (misal: 1.5% untuk ABS, 2.5% untuk PC).'
  }
];
