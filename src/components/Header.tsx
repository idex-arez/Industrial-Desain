import React from 'react';

interface HeaderProps {
  activeTab: 'articles' | 'materials' | 'rams' | 'cmf' | 'about';
  setActiveTab: (tab: 'articles' | 'materials' | 'rams' | 'cmf' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="border-b border-[#111111] bg-white sticky top-0 z-30">
      {/* Top Editorial Utility Strip */}
      <div className="border-b border-[#E5E5E2] px-4 sm:px-8 py-1.5 text-[11px] font-technical text-[#666666] flex flex-wrap items-center justify-between gap-2">
        <div>
          <span>REKAFORM // JURNAL REKAYASA DESAIN INDUSTRI</span>
        </div>
        <div className="flex items-center gap-4">
          <span>VOLUME 01</span>
          <span>·</span>
          <span>TERBITAN INDEPENDEN</span>
          <span>·</span>
          <span>ISSN 2985-714X (ARSIP)</span>
        </div>
      </div>

      {/* Main Masthead - Strict 3-zone Top Bar Contract */}
      <div className="px-4 sm:px-8 py-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          {/* Zone 1: Wordmark */}
          <div>
            <button
              onClick={() => setActiveTab('articles')}
              className="text-left group focus:outline-none"
            >
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] group-hover:text-[#FF4400] transition-colors">
                REKAFORM
              </div>
              <div className="text-xs tracking-widest uppercase font-technical text-[#555555] mt-1">
                Platform Edukasi & Literasi Rekayasa Desain Produk
              </div>
            </button>
          </div>

          {/* Zone 2: Concise Navigation Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider text-[#222222]">
            <button
              onClick={() => setActiveTab('articles')}
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'articles'
                  ? 'border-[#FF4400] text-[#111111]'
                  : 'border-transparent text-[#666666] hover:text-[#111111]'
              }`}
            >
              01. Kajian Teknis & DFM
            </button>

            <button
              onClick={() => setActiveTab('materials')}
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'materials'
                  ? 'border-[#FF4400] text-[#111111]'
                  : 'border-transparent text-[#666666] hover:text-[#111111]'
              }`}
            >
              02. Matriks Material
            </button>

            <button
              onClick={() => setActiveTab('rams')}
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'rams'
                  ? 'border-[#FF4400] text-[#111111]'
                  : 'border-transparent text-[#666666] hover:text-[#111111]'
              }`}
            >
              03. Prinsip Dieter Rams
            </button>

            <button
              onClick={() => setActiveTab('cmf')}
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'cmf'
                  ? 'border-[#FF4400] text-[#111111]'
                  : 'border-transparent text-[#666666] hover:text-[#111111]'
              }`}
            >
              04. CMF & Glosarium
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`pb-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'about'
                  ? 'border-[#FF4400] text-[#111111]'
                  : 'border-transparent text-[#666666] hover:text-[#111111]'
              }`}
            >
              05. Manifesto
            </button>
          </nav>

          {/* Zone 3: Primary Action / Quick Filter indicator */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-[11px] font-technical text-[#777777] uppercase">
              STANDAR: DIN / ISO / ASME
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
