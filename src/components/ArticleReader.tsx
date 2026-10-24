import React, { useState } from 'react';
import { ARTICLES } from '../data/portalData';

interface ArticleReaderProps {
  selectedArticleId?: string;
  onSelectArticle: (id: string) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  selectedArticleId,
  onSelectArticle,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'Semua',
    'Manufaktur & Perkakas',
    'Filosofi & Teori Rekayasa',
    'Ergonomi & Rekayasa Manusia',
    'Material Rekayasa',
    'Rekayasa Detail & Perakitan',
  ];

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = activeCategory === 'Semua' || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentArticle = ARTICLES.find((a) => a.id === selectedArticleId);

  // Deep Long-Form Reading Experience
  if (currentArticle) {
    return (
      <article className="max-w-4xl mx-auto py-6 bg-white border border-[#111111] p-6 sm:p-12 mb-12">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-8 flex flex-wrap items-center justify-between border-b border-[#D8D8D4] pb-4 gap-4">
          <button
            onClick={() => onSelectArticle('')}
            className="text-xs font-technical font-bold uppercase tracking-wider text-[#111111] hover:text-[#FF4400] flex items-center gap-2 transition-colors focus:outline-none"
          >
            <span>&larr;</span> KEMBALI KE INDEKS KAJIAN
          </button>

          {/* Clean unboxed metadata with separators */}
          <div className="flex items-center gap-3 text-xs font-technical text-[#666666]">
            <span>{currentArticle.category.toUpperCase()}</span>
            <span>/</span>
            <span>{currentArticle.date}</span>
            <span>/</span>
            <span>{currentArticle.readTime}</span>
          </div>
        </div>

        {/* Article Masthead */}
        <header className="mb-10 space-y-4">
          <div className="text-xs font-technical font-bold text-[#FF4400]">
            KAJIAN TEKNIS #{currentArticle.number}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight">
            {currentArticle.title}
          </h1>

          <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
            {currentArticle.subtitle}
          </p>

          {/* Keypoints Engineering Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#F6F6F4] border border-[#D8D8D4] mt-6">
            {currentArticle.technicalKeypoints.map((kp, idx) => (
              <div key={idx} className="border-l-2 border-[#111111] pl-3 py-0.5">
                <div className="text-[10px] font-technical uppercase tracking-wider text-[#777777]">
                  {kp.label}
                </div>
                <div className="text-xs font-technical font-bold text-[#111111] mt-0.5">
                  {kp.value}
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Abstract / Summary */}
        <div className="p-5 border-y-2 border-[#111111] my-8 bg-[#FAFAF8] text-sm text-[#222222] leading-relaxed">
          <span className="font-technical text-xs uppercase font-bold text-[#FF4400] block mb-1">
            Abstraksi Rekayasa
          </span>
          <p className="italic font-serif">{currentArticle.summary}</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-[#222222] leading-relaxed">
          {currentArticle.contentSections.map((sec, sIdx) => (
            <section key={sIdx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight border-b border-[#E5E5E2] pb-2">
                {sec.heading}
              </h2>

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[15px] sm:text-base text-[#333333] leading-relaxed max-w-prose">
                  {p}
                </p>
              ))}

              {/* Technical Table if present */}
              {sec.technicalTable && (
                <div className="my-6 overflow-x-auto border border-[#111111] bg-white">
                  <table className="w-full text-left text-xs font-technical">
                    <thead className="bg-[#111111] text-white">
                      <tr>
                        {sec.technicalTable.headers.map((th, thIdx) => (
                          <th key={thIdx} className="p-3 font-semibold uppercase tracking-wider">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E5E2] text-[#222222]">
                      {sec.technicalTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#F6F6F4] transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`p-3 ${cIdx === 0 ? 'font-bold text-[#111111]' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Engineering Callout */}
              {sec.callout && (
                <div className="my-6 p-4 bg-[#F6F6F4] border-l-4 border-[#FF4400] border-y border-r border-[#D8D8D4]">
                  <div className="text-xs font-technical font-bold text-[#FF4400] uppercase tracking-wider mb-1">
                    {sec.callout.title}
                  </div>
                  <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                    {sec.callout.body}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Colophon footer of the article */}
        <div className="mt-14 pt-6 border-t border-[#111111] flex flex-wrap items-center justify-between gap-4 text-xs font-technical text-[#777777]">
          <div>
            Kajian mandiri REKAFORM · Standar Rujukan DIN / ISO / ASME
          </div>
          <button
            onClick={() => onSelectArticle('')}
            className="px-4 py-2 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors font-bold uppercase tracking-wider"
          >
            Kembali ke Indeks
          </button>
        </div>
      </article>
    );
  }

  // Broadsheet Index View
  return (
    <div className="space-y-8">
      {/* Chapter Title & Filter */}
      <div className="border-b border-[#111111] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-technical text-[#FF4400] font-bold mb-1">
            ARSIP KAJIAN & DEKONSTRUKSI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Kajian Teknis & Analisis Manufaktur Produk
          </h2>
          <p className="text-sm sm:text-base text-[#555555] mt-2 max-w-2xl leading-relaxed">
            Artikel ilmiah populer seputar metodologi DFM, penentuan toleransi geometris ISO 286, dan dekonstruksi rekayasa fungsionalis.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Cari kata kunci, DFM, formula..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-xs font-technical bg-white border border-[#111111] text-[#111111] placeholder-[#888888] focus:outline-none focus:ring-1 focus:ring-[#FF4400]"
          />
        </div>
      </div>

      {/* Category Filter Tabs (Sharp buttons, zero pills) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#D8D8D4] text-xs font-technical no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 uppercase transition-colors whitespace-nowrap shrink-0 border ${
              activeCategory === cat
                ? 'bg-[#111111] text-white border-[#111111] font-bold'
                : 'bg-white text-[#444444] border-[#D8D8D4] hover:border-[#111111]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Broadsheet Tabular Article Rows */}
      <div className="border border-[#111111] bg-white divide-y divide-[#111111]">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article.id)}
            className="p-6 sm:p-8 hover:bg-[#FAFAF8] transition-colors cursor-pointer group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Number and Classification */}
              <div className="lg:col-span-2 text-xs font-technical space-y-1">
                <span className="text-xl sm:text-2xl font-bold text-[#FF4400] block">
                  #{article.number}
                </span>
                <span className="text-[#777777] uppercase block">
                  {article.category}
                </span>
                <span className="text-[#999999] block font-numeric">
                  {article.date}
                </span>
              </div>

              {/* Center Column: Title, Subtitle, Summary */}
              <div className="lg:col-span-8 space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] group-hover:text-[#FF4400] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm font-medium text-[#444444]">
                  {article.subtitle}
                </p>

                <p className="text-xs text-[#666666] leading-relaxed line-clamp-2 pt-1">
                  {article.summary}
                </p>

                {/* Keypoints inline text */}
                <div className="pt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-technical text-[#555555]">
                  {article.technicalKeypoints.slice(0, 3).map((kp, idx) => (
                    <span key={idx}>
                      <strong className="text-[#111111]">{kp.label}:</strong> {kp.value}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: CTA */}
              <div className="lg:col-span-2 lg:text-right pt-2 lg:pt-0">
                <span className="inline-block text-xs font-technical font-bold uppercase tracking-wider text-[#111111] group-hover:text-[#FF4400] border-b border-[#111111] group-hover:border-[#FF4400] pb-0.5">
                  BACA KAJIAN &rarr;
                </span>
              </div>
            </div>
          </article>
        ))}

        {filteredArticles.length === 0 && (
          <div className="p-12 text-center text-sm font-technical text-[#777777]">
            Tidak ada kajian yang sesuai dengan kueri pencarian &quot;{searchQuery}&quot;.
          </div>
        )}
      </div>
    </div>
  );
};
