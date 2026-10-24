import React, { useState } from 'react';
import { RAMS_PRINCIPLES } from '../data/portalData';

interface HistoricalCase {
  product: string;
  year: string;
  designer: string;
  engineeringBreakthrough: string;
  materialUsed: string;
}

export const RamsPrinciplesAnalysis: React.FC = () => {
  const [activePrincipleNum, setActivePrincipleNum] = useState<string>('01');

  const historicalCases: Record<string, HistoricalCase> = {
    '01': {
      product: 'Braun T3 Pocket Radio',
      year: '1958',
      designer: 'Dieter Rams & Ulm HfG',
      engineeringBreakthrough: 'Penggunaan transistor miniatur pertama yang diintegrasikan langsung dengan skala penalaan melingkar pada kenop putar akrilik.',
      materialUsed: 'Sasis Polistirena Injeksi Presisi & Kenop Aluminium Milled'
    },
    '02': {
      product: 'Braun MPZ 21 Citromatic (Pemeras Jeruk)',
      year: '1972',
      designer: 'Dieter Rams & Gabriel Losa',
      engineeringBreakthrough: 'Mekanisme aktivasi motor otomatis langsung melalui tekanan tangan ke bawah pada kerucut peras tanpa sakelar terpisah.',
      materialUsed: 'Polipropilena Food-Grade Tahan Asam Sitrat'
    },
    '03': {
      product: 'Braun SK4 Audio Set ("Schneewittchenkarg")',
      year: '1956',
      designer: 'Hans Gugelot & Dieter Rams',
      engineeringBreakthrough: 'Penutup debu akrilik transparan (Perspex) pertama di dunia industri audio, menggantikan lemari kayu masif furnitur.',
      materialUsed: 'Pelat Baja Dilipat Cat Putih & Tutup Akrilik PMMA'
    },
    '04': {
      product: 'Braun ET66 Calculator',
      year: '1987',
      designer: 'Dietrich Lubs & Dieter Rams',
      engineeringBreakthrough: 'Tombol cembung melingkar dengan umpan balik taktil pegas kubah membran; tombol sama-dengan berwarna oranye tegas.',
      materialUsed: 'ABS Injeksi Hitam Arang & Layar Kristal Cair LCD'
    },
    '05': {
      product: 'Braun RT20 Table Radio',
      year: '1961',
      designer: 'Dieter Rams',
      engineeringBreakthrough: 'Bentuk persegi panjang datar tanpa ornamen speaker kain klasik, menyatu dengan rak buku arsitektural tanpa mendominasi ruangan.',
      materialUsed: 'Kayu Lapis Finir Abu-Abu & Pelat Muka Aluminium Anodized'
    },
    '06': {
      product: 'Braun Cylindric T1 Lighter',
      year: '1968',
      designer: 'Dieter Rams',
      engineeringBreakthrough: 'Geometri silinder murni dengan pengapian magnetis tanpa roda gerigi batu api yang cepat aus; tidak meniru ornamen antik.',
      materialUsed: 'Pipa Aluminium Ekstrusi & Mekanisme Katup Kuningan'
    },
    '07': {
      product: 'Vitsœ 606 Universal Shelving System',
      year: '1960',
      designer: 'Dieter Rams',
      engineeringBreakthrough: 'Sistem rak modular profil aluminium E-track yang dapat dibongkar, diperluas, dan dipindahkan melintasi generasi tanpa aus.',
      materialUsed: 'Aluminium Ekstrusi Anodized & Pelat Baja SPCC Powder-Coated'
    },
    '08': {
      product: 'Braun TP1 Transistor Radio-Phono',
      year: '1959',
      designer: 'Dieter Rams',
      engineeringBreakthrough: 'Integrasi pemutar piringan hitam 45 rpm portabel di mana jarum pemutar membaca piringan dari arah bawah sasis terlindung.',
      materialUsed: 'Casing ABS Putih Bersih & Rangka Internal Die-Cast Seng'
    },
    '09': {
      product: 'Braun Oral-B D1 Plak Control',
      year: '1989',
      designer: 'Dieter Rams & Tim Braun',
      engineeringBreakthrough: 'Kepala sikat gigi berosilasi yang dapat diganti mandiri, memisahkan bagian aus dari modul baterai dan motor jangka panjang.',
      materialUsed: 'Bodi Polimer Tahan Air Segel Ultrasonik & Bulu Nilon PA612'
    },
    '10': {
      product: 'Braun Control ET55 / HL70 Fan',
      year: '1971',
      designer: 'Jürgen Greubel & Dieter Rams',
      engineeringBreakthrough: 'Kipas angin meja aliran silang (cross-flow tangential fan) dengan efisiensi aerodinamika tinggi dalam volume sasis terkecil.',
      materialUsed: 'Sasis Monolitik Polikarbonat dengan Kisi Aliran Udara Terintegrasi'
    }
  };

  const currentPrinciple = RAMS_PRINCIPLES.find(p => p.number === activePrincipleNum) || RAMS_PRINCIPLES[0];
  const currentCase = historicalCases[activePrincipleNum] || historicalCases['01'];

  return (
    <div className="space-y-8">
      {/* Editorial Chapter Header */}
      <div className="border-b border-[#111111] pb-6">
        <div className="text-xs font-technical text-[#FF4400] font-bold mb-1">
          KAJIAN FILOSOFI & REKAYASA FUNGSIONALISME
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
          Dekonstruksi 10 Prinsip Dieter Rams dalam Rekayasa Manufaktur
        </h2>
        <p className="text-base text-[#444444] mt-3 max-w-3xl leading-relaxed">
          Tesis &quot;Weniger, aber besser&quot; (Sedikit tapi lebih baik) kerap disalahartikan sebagai sekadar tren visual minimalis serba putih. Secara rekayasa, prinsip-prinsip ini adalah protokol ketat perancangan produk untuk mencapai efisiensi perakitan (DFA), kejujuran sifat bahan, dan keandalan mekanis tanpa manipulasi kosmetik.
        </p>
      </div>

      {/* Grid: Master Index Selector on Left, In-depth Technical Monograph on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#D8D8D4] border border-[#111111] bg-white">
        {/* Left Column: 10 Principles Index List */}
        <div className="lg:col-span-5 divide-y divide-[#E5E5E2] bg-[#FAFAF8]">
          <div className="p-3 bg-[#111111] text-white text-xs font-technical uppercase tracking-wider flex items-center justify-between">
            <span>DAFTAR 10 POSTULAT FUNGSIONALISME</span>
            <span>ULM / BRAUN</span>
          </div>

          {RAMS_PRINCIPLES.map((pr) => {
            const isSelected = pr.number === activePrincipleNum;
            return (
              <button
                key={pr.number}
                onClick={() => setActivePrincipleNum(pr.number)}
                className={`w-full text-left p-4 transition-colors flex items-start gap-3 group focus:outline-none ${
                  isSelected
                    ? 'bg-white border-l-4 border-[#FF4400]'
                    : 'hover:bg-[#F0F0EE]'
                }`}
              >
                <span className={`text-xs font-technical font-bold ${
                  isSelected ? 'text-[#FF4400]' : 'text-[#888888] group-hover:text-[#111111]'
                }`}>
                  #{pr.number}
                </span>

                <div className="space-y-0.5">
                  <div className={`text-sm font-bold leading-snug ${
                    isSelected ? 'text-[#111111]' : 'text-[#444444] group-hover:text-[#111111]'
                  }`}>
                    {pr.nameId}
                  </div>
                  <div className="text-[11px] font-technical text-[#777777] italic">
                    {pr.nameDe}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Exhaustive Engineering Dissection */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-8 bg-white">
          {/* Header of Active Principle */}
          <div className="border-b border-[#E5E5E2] pb-5">
            <div className="flex items-center gap-2 text-xs font-technical text-[#777777] mb-1">
              <span>POSTULAT REKAYASA PRODUK</span>
              <span>·</span>
              <span className="text-[#FF4400] font-bold">PRINSIP #{currentPrinciple.number}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
              {currentPrinciple.nameId}
            </h3>
            <div className="text-xs font-technical text-[#666666] italic mt-1">
              &quot;{currentPrinciple.nameDe}&quot;
            </div>
          </div>

          {/* Core Philosophy Paragraph */}
          <div className="space-y-3">
            <h4 className="text-xs font-technical uppercase tracking-wider text-[#111111] font-bold">
              01. Tesis Filosofis Dasar
            </h4>
            <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
              {currentPrinciple.description}
            </p>
          </div>

          {/* Engineering Consequence (The Real Practical IDE perspective) */}
          <div className="p-5 bg-[#F6F6F4] border border-[#D8D8D4] space-y-3">
            <div className="flex items-center gap-2 text-xs font-technical text-[#111111] font-bold">
              <span className="w-2 h-2 bg-[#FF4400]" />
              02. Konsekuensi Rekayasa Manufaktur & Material (IDE Perspective)
            </div>
            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
              {currentPrinciple.technicalMetric}
            </p>
            <div className="text-xs font-technical text-[#222222] bg-white p-3 border border-[#E5E5E2]">
              <strong className="text-[#FF4400]">Uji Lapangan Desainer:</strong> {currentPrinciple.guidance}
            </div>
          </div>

          {/* Historical Case Study Artefact */}
          <div className="border-t border-[#E5E5E2] pt-6 space-y-4">
            <h4 className="text-xs font-technical uppercase tracking-wider text-[#111111] font-bold">
              03. Studi Artefak Sejarah: {currentCase.product} ({currentCase.year})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-technical">
              <div className="p-3 bg-[#FAFAF8] border border-[#E5E5E2]">
                <span className="text-[#888888] block text-[10px] uppercase">Perancang & Institusi</span>
                <span className="font-bold text-[#111111] mt-0.5 block">{currentCase.designer}</span>
              </div>
              <div className="p-3 bg-[#FAFAF8] border border-[#E5E5E2]">
                <span className="text-[#888888] block text-[10px] uppercase">Material & Fabrikasi</span>
                <span className="font-bold text-[#111111] mt-0.5 block">{currentCase.materialUsed}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
              <strong className="text-[#111111]">Terobosan Rekayasa:</strong> {currentCase.engineeringBreakthrough}
            </p>
          </div>

          {/* Colophon Note */}
          <div className="pt-4 border-t border-[#E5E5E2] flex items-center justify-between text-[11px] font-technical text-[#777777]">
            <span>SUMBER: DIETER RAMS: TEN PRINCIPLES FOR GOOD DESIGN (PRESTEL)</span>
            <span>KLASIFIKASI: LITERASI SEJARAH TEKNIK</span>
          </div>
        </div>
      </div>
    </div>
  );
};
