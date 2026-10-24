import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'articles' | 'materials' | 'rams' | 'cmf' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#111111] text-white mt-20 border-t-2 border-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#333333]">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>REKAFORM</span>
              <span className="w-2 h-2 bg-[#FF4400] inline-block" />
            </div>
            <p className="text-xs text-[#999999] leading-relaxed max-w-sm">
              Jurnal dan platform literasi independen seputar Rekayasa Desain Industri (Industrial Design Engineering), metodologi DFM/DFA, ergonomi fisik, dan sains material fungsional.
            </p>
            <div className="text-[11px] font-technical text-[#777777] pt-2">
              &quot;Weniger, aber besser&quot; — Dieter Rams
            </div>
          </div>

          {/* Navigation Directory */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-technical uppercase tracking-wider text-white font-bold">
              Kanal Literasi
            </div>
            <ul className="space-y-2 text-xs font-technical text-[#AAAAAA]">
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-[#FF4400] transition-colors text-left"
                >
                  01. Kajian Teknis & DFM
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('materials')}
                  className="hover:text-[#FF4400] transition-colors text-left"
                >
                  02. Matriks Material & Cetakan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rams')}
                  className="hover:text-[#FF4400] transition-colors text-left"
                >
                  03. Prinsip Dieter Rams
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cmf')}
                  className="hover:text-[#FF4400] transition-colors text-left"
                >
                  04. CMF & Glosarium Teknik
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FF4400] transition-colors text-left"
                >
                  05. Kolofon & Manifesto
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Standards */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-technical uppercase tracking-wider text-white font-bold">
              Standar Acuan Rekayasa
            </div>
            <p className="text-xs text-[#888888] leading-relaxed font-technical">
              Seluruh komputasi dan panduan mengacu pada baku mutu internasional: DIN 16901 (Toleransi Plastik Cetak), ISO 286 (Sistem Toleransi & Fitment Poros/Lubang), DIN 33402 (Antropometri), ASME Y14.5 (GD&T), dan VDI 3400 (Tekstur Permukaan EDM).
            </p>
          </div>
        </div>

        {/* Mandatory Disclaimer Section */}
        <div className="pt-8 space-y-4">
          <div className="p-4 bg-[#1A1A1A] border border-[#333333] text-xs text-[#BBBBBB] leading-relaxed">
            <strong className="text-white block font-technical text-[11px] uppercase mb-1">
              Pernyataan Penafian (Disclaimer):
            </strong>
            Situs ini adalah platform edukasi dan literasi independen seputar rekayasa dan desain produk. Seluruh konten merupakan pandangan pribadi penulis dari sudut pandang keilmuan praktis/akademis dan tidak mewakili instansi, lembaga, atau organisasi mana pun.
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-[#666666] font-technical">
            <div>
              &copy; {new Date().getFullYear()} REKAFORM · Platform Literasi Rekayasa Desain Industri
            </div>
            <div>
              DISIPLIN · PRESISI METROLOGI · KEJUJURAN MATERIAL
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
