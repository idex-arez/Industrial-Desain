import React, { useState } from 'react';
import { CMF_SPECIFICATIONS, LEXICON } from '../data/portalData';

export const CmfAndLexicon: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'cmf' | 'lexicon'>('cmf');
  const [lexiconSearch, setLexiconSearch] = useState<string>('');
  const [selectedCmfCode, setSelectedCmfCode] = useState<string>('CMF-01');

  const filteredLexicon = LEXICON.filter(
    (item) =>
      item.term.toLowerCase().includes(lexiconSearch.toLowerCase()) ||
      item.definition.toLowerCase().includes(lexiconSearch.toLowerCase()) ||
      item.engineeringImpact.toLowerCase().includes(lexiconSearch.toLowerCase())
  );

  const currentCmf = CMF_SPECIFICATIONS.find((c) => c.code === selectedCmfCode) || CMF_SPECIFICATIONS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#111111] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-technical text-[#FF4400] font-bold mb-1">
            SPESIFIKASI PERMUKAAN & NOMENKLATUR
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Standar CMF & Glosarium Rekayasa Industri
          </h2>
          <p className="text-sm sm:text-base text-[#555555] mt-2 max-w-2xl leading-relaxed">
            Spesifikasi baku kekasaran permukaan ($R_a$), perlakuan cetakan EDM VDI 3400, anodisasi elektrokimia, dan definisi parameter toleransi geometris.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 border border-[#111111] p-1 bg-white">
          <button
            onClick={() => setActiveSubTab('cmf')}
            className={`px-3 py-1.5 text-xs font-technical uppercase font-bold transition-colors ${
              activeSubTab === 'cmf'
                ? 'bg-[#111111] text-white'
                : 'text-[#555555] hover:text-[#111111]'
            }`}
          >
            Standar CMF (Finishing)
          </button>
          <button
            onClick={() => setActiveSubTab('lexicon')}
            className={`px-3 py-1.5 text-xs font-technical uppercase font-bold transition-colors ${
              activeSubTab === 'lexicon'
                ? 'bg-[#111111] text-white'
                : 'text-[#555555] hover:text-[#111111]'
            }`}
          >
            Glosarium Nomenklatur
          </button>
        </div>
      </div>

      {activeSubTab === 'cmf' ? (
        /* CMF Showcase */
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#111111] border border-[#111111] bg-white">
          {/* Left Column: CMF List */}
          <div className="lg:col-span-5 divide-y divide-[#E5E5E2] bg-[#FAFAF8]">
            <div className="p-3 bg-[#111111] text-white text-xs font-technical uppercase tracking-wider">
              KATALOG PERLAKUAN PERMUKAAN PRODUK
            </div>

            {CMF_SPECIFICATIONS.map((cmf) => {
              const isSelected = selectedCmfCode === cmf.code;
              return (
                <div
                  key={cmf.code}
                  onClick={() => setSelectedCmfCode(cmf.code)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-white border-l-4 border-[#FF4400]'
                      : 'hover:bg-[#F0F0EE]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-technical text-[#777777] mb-1">
                    <span className="font-bold text-[#FF4400]">{cmf.code}</span>
                    <span>{cmf.category.toUpperCase()}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#111111]">
                    {cmf.name}
                  </h4>
                  <div className="text-xs font-technical text-[#555555] mt-1">
                    Kekasaran Permukaan Ra: <strong className="text-[#111111]">{cmf.roughnessRa}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Specification Sheet */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-white">
            <div className="border-b border-[#E5E5E2] pb-4">
              <div className="text-xs font-technical text-[#777777] mb-1">
                KLASIFIKASI: {currentCmf.category.toUpperCase()} · KODE: {currentCmf.code}
              </div>
              <h3 className="text-2xl font-extrabold text-[#111111]">
                {currentCmf.name}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-[#F6F6F4] border border-[#D8D8D4] text-xs font-technical">
              <div>
                <span className="text-[#777777] block text-[10px] uppercase">Tingkat Kekasaran (Ra)</span>
                <span className="font-bold text-[#111111] text-sm mt-0.5 block">{currentCmf.roughnessRa}</span>
              </div>
              <div>
                <span className="text-[#777777] block text-[10px] uppercase">Standar Mutu Industri</span>
                <span className="font-bold text-[#111111] text-xs mt-0.5 block">{currentCmf.industrialStandard}</span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-technical uppercase tracking-wider text-[#111111] font-bold">
                Mekanisme Proses & Deposisi:
              </h4>
              <p className="text-sm text-[#333333] leading-relaxed">
                {currentCmf.processMethod}
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-technical uppercase tracking-wider text-[#111111] font-bold">
                Karakteristik Taktil & Visual:
              </h4>
              <p className="text-sm text-[#333333] leading-relaxed">
                {currentCmf.visualTactile}
              </p>
            </div>

            <div className="p-4 bg-[#FAFAF8] border border-[#E5E5E2] space-y-2 text-xs">
              <div className="font-technical text-[#FF4400] font-bold uppercase tracking-wider">
                Aturan Rekayasa Cetakan & Substrat:
              </div>
              <div>
                <strong className="text-[#111111]">Substrat Rekomendasi:</strong> {currentCmf.recommendedSubstrate}
              </div>
              <p className="text-[#444444] leading-relaxed">
                <strong className="text-[#111111]">Aturan Draft & Tooling:</strong> {currentCmf.designRule}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Lexicon */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8D8D4] pb-4">
            <div className="text-xs font-technical text-[#777777] uppercase">
              {filteredLexicon.length} ISTILAH REKAYASA DESAIN TERVERIFIKASI
            </div>
            <div className="w-full sm:w-80">
              <input
                type="text"
                placeholder="Cari terminologi, formula, standar..."
                value={lexiconSearch}
                onChange={(e) => setLexiconSearch(e.target.value)}
                className="w-full px-3 py-2 text-xs font-technical bg-white border border-[#111111] text-[#111111] placeholder-[#888888] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLexicon.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-[#111111] space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#E5E5E2] pb-2">
                  <h4 className="text-base font-bold text-[#111111]">
                    {item.term}
                  </h4>
                  <span className="text-[10px] font-technical text-[#777777]">
                    {item.origin}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
                  {item.definition}
                </p>

                <div className="pt-2 border-t border-[#F0F0EE] text-xs space-y-1.5 font-technical">
                  <div className="text-[#444444]">
                    <strong className="text-[#111111]">Dampak Manufaktur:</strong> {item.engineeringImpact}
                  </div>
                  {item.practicalFormulaOrStandard && (
                    <div className="text-[#FF4400] bg-[#F6F6F4] p-2 border border-[#E5E5E2] text-[11px]">
                      {item.practicalFormulaOrStandard}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredLexicon.length === 0 && (
              <div className="col-span-2 p-8 text-center text-sm font-technical text-[#777777]">
                Tidak ada istilah yang cocok dengan kueri &quot;{lexiconSearch}&quot;.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
