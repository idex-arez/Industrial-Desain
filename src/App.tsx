import { useState } from 'react';
import { Header } from './components/Header';
import { TechnicalBlueprintHero } from './components/TechnicalBlueprintHero';
import { ArticleReader } from './components/ArticleReader';
import { MaterialsMatrix } from './components/MaterialsMatrix';
import { RamsPrinciplesAnalysis } from './components/RamsPrinciplesAnalysis';
import { CmfAndLexicon } from './components/CmfAndLexicon';
import { AboutPortal } from './components/AboutPortal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<'articles' | 'materials' | 'rams' | 'cmf' | 'about'>('articles');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');

  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
    setActiveTab('articles');
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  const handleTabChange = (tab: 'articles' | 'materials' | 'rams' | 'cmf' | 'about') => {
    setActiveTab(tab);
    if (tab !== 'articles') {
      setSelectedArticleId('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F6F4] text-[#111111]">
      {/* Top Bar adhering to strict 3-zone contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Editorial Masthead & Engineering Blueprint Sheet (when on articles tab without single article selected) */}
        {!selectedArticleId && activeTab === 'articles' && (
          <section className="mb-14">
            <div className="max-w-4xl space-y-3 mb-8">
              <div className="flex items-center gap-2 text-xs font-technical text-[#666666]">
                <span className="text-[#FF4400] font-bold">MONOGRAF REKAYASA</span>
                <span>/</span>
                <span>DESAIN PRODUK & DFM</span>
                <span>/</span>
                <span>STANDAR DIN & ISO</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
                Disiplin Rekayasa di Balik Kejujuran Bentuk Produk
              </h1>

              <p className="text-base sm:text-lg text-[#444444] leading-relaxed max-w-3xl">
                Kajian independen seputar batas-batas fisik manufaktur injeksi polimer, pemilihan paduan aluminium rekayasa, toleransi pas ISO 286, serta rekonstruksi praktis fungsionalisme Dieter Rams.
              </p>
            </div>

            {/* Engineering Drawing Plate ISO 128 / DIN 6 */}
            <TechnicalBlueprintHero />
          </section>
        )}

        {/* Section Router */}
        {activeTab === 'articles' && (
          <ArticleReader
            selectedArticleId={selectedArticleId}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {activeTab === 'materials' && <MaterialsMatrix />}

        {activeTab === 'rams' && <RamsPrinciplesAnalysis />}

        {activeTab === 'cmf' && <CmfAndLexicon />}

        {activeTab === 'about' && <AboutPortal />}
      </main>

      {/* Footer with Mandatory Disclaimer */}
      <Footer onNavigate={handleTabChange} />
    </div>
  );
}
