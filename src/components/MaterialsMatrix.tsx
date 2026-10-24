import React, { useState } from 'react';
import { MATERIALS_DATABASE, MaterialItem } from '../data/portalData';

export const MaterialsMatrix: React.FC = () => {
  const [selectedFamily, setSelectedFamily] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedMaterialId, setExpandedMaterialId] = useState<string>('mat-al-6061');

  const families = [
    'Semua',
    'Logam Ringan',
    'Logam Die-Cast',
    'Polimer Rekayasa',
    'Polimer Komoditas',
    'Elastomer',
  ];

  const filteredMaterials = MATERIALS_DATABASE.filter((mat) => {
    const matchesFamily = selectedFamily === 'Semua' || mat.family === selectedFamily;
    const matchesSearch =
      mat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.applications.some((app) => app.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mat.processes.some((pr) => pr.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFamily && matchesSearch;
  });

  const activeMaterial = MATERIALS_DATABASE.find((m) => m.id === expandedMaterialId) || MATERIALS_DATABASE[0];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="border-b border-[#111111] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-technical text-[#FF4400] font-bold mb-1">
            BUKU PEGANGAN REKAYASA MATERIAL
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111]">
            Matriks Sifat Material & Batasan Manufaktur (DFM)
          </h2>
          <p className="text-sm sm:text-base text-[#555555] mt-2 max-w-2xl leading-relaxed">
            Data acuan terverifikasi untuk penentuan ketebalan dinding minimum, susut cetakan, kekuatan tarik, dan keekonomian perkakas cetak.
          </p>
        </div>

        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Filter nama, paduan, proses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-xs font-technical bg-white border border-[#111111] text-[#111111] placeholder-[#888888] focus:outline-none focus:ring-1 focus:ring-[#FF4400]"
          />
        </div>
      </div>

      {/* Filter Selector */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-[#D8D8D4] text-xs font-technical no-scrollbar">
        {families.map((fam) => (
          <button
            key={fam}
            onClick={() => setSelectedFamily(fam)}
            className={`px-3 py-1.5 uppercase transition-colors whitespace-nowrap shrink-0 border ${
              selectedFamily === fam
                ? 'bg-[#111111] text-white border-[#111111] font-bold'
                : 'bg-white text-[#444444] border-[#D8D8D4] hover:border-[#111111]'
            }`}
          >
            {fam}
          </button>
        ))}
      </div>

      {/* Main Spec Table according to Engineering Handbook format */}
      <div className="border border-[#111111] bg-white overflow-x-auto">
        <table className="w-full text-left text-xs font-technical border-collapse">
          <thead className="bg-[#111111] text-white border-b border-[#111111]">
            <tr>
              <th className="p-3 font-bold uppercase tracking-wider">Material / Klasifikasi</th>
              <th className="p-3 font-bold uppercase tracking-wider">Keluarga</th>
              <th className="p-3 font-bold uppercase tracking-wider">Proses Manufaktur</th>
              <th className="p-3 font-bold uppercase tracking-wider">Densitas (g/cm³)</th>
              <th className="p-3 font-bold uppercase tracking-wider">Kekuatan Tarik (MPa)</th>
              <th className="p-3 font-bold uppercase tracking-wider">Tebal Min (mm)</th>
              <th className="p-3 font-bold uppercase tracking-wider">Susut Cetak (%)</th>
              <th className="p-3 font-bold uppercase tracking-wider text-right">Inspeksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D8D8D4] text-[#222222]">
            {filteredMaterials.map((mat) => {
              const isSelected = mat.id === expandedMaterialId;
              return (
                <tr
                  key={mat.id}
                  onClick={() => setExpandedMaterialId(mat.id)}
                  className={`hover:bg-[#F6F6F4] transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#FAFAF8] border-l-4 border-l-[#FF4400]' : ''
                  }`}
                >
                  <td className="p-3">
                    <div className="font-bold text-[#111111]">
                      {mat.name}
                    </div>
                    <div className="text-[10px] text-[#777777] mt-0.5">
                      {mat.code}
                    </div>
                  </td>
                  <td className="p-3 font-sans text-xs">
                    {mat.family}
                  </td>
                  <td className="p-3 font-sans text-xs">
                    {mat.processes.join(', ')}
                  </td>
                  <td className="p-3 font-numeric">
                    {mat.density}
                  </td>
                  <td className="p-3 font-numeric font-bold text-[#111111]">
                    {mat.tensileStrength}
                  </td>
                  <td className="p-3 font-numeric">
                    {mat.minWallThickness}
                  </td>
                  <td className="p-3 font-numeric">
                    {mat.shrinkageRate}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedMaterialId(mat.id);
                      }}
                      className="text-xs font-bold text-[#111111] hover:text-[#FF4400] underline"
                    >
                      Buka Rincian
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* In-page Engineering Spec Sheet for the selected material */}
      <div className="border border-[#111111] bg-white p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#111111] pb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-technical text-[#FF4400] font-bold">
              LEMBAR DATA TEKNIS: {activeMaterial.code}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111111] mt-1">
              {activeMaterial.name}
            </h3>
            <div className="text-xs font-technical text-[#666666] mt-0.5">
              KELOMPOK: {activeMaterial.family.toUpperCase()} · VOLUME EKONOMIS: {activeMaterial.economicVolume} UNIT
            </div>
          </div>

          <div className="text-xs font-technical bg-[#F6F6F4] p-3 border border-[#D8D8D4]">
            <span className="text-[#777777] block text-[10px] uppercase">INVESTASI PERKAKAS (TOOLING CAPEX)</span>
            <span className="font-bold text-[#111111] text-sm">{activeMaterial.toolingCost.toUpperCase()}</span>
          </div>
        </div>

        {/* Technical Data Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#FAFAF8] border border-[#E5E5E2] text-xs font-technical">
          <div>
            <span className="text-[#888888] block text-[10px] uppercase">Kekuatan Tarik</span>
            <span className="font-bold text-[#111111] text-sm mt-0.5 block">{activeMaterial.tensileStrength} MPa</span>
          </div>
          <div>
            <span className="text-[#888888] block text-[10px] uppercase">Densitas Massa</span>
            <span className="font-bold text-[#111111] text-sm mt-0.5 block">{activeMaterial.density} g/cm³</span>
          </div>
          <div>
            <span className="text-[#888888] block text-[10px] uppercase">Suhu Layanan Maks</span>
            <span className="font-bold text-[#111111] text-sm mt-0.5 block">{activeMaterial.maxTemp} °C</span>
          </div>
          <div>
            <span className="text-[#888888] block text-[10px] uppercase">Tebal Dinding Minimal</span>
            <span className="font-bold text-[#111111] text-sm mt-0.5 block">{activeMaterial.minWallThickness} mm</span>
          </div>
        </div>

        {/* Applications */}
        <div>
          <div className="text-xs font-technical uppercase tracking-wider text-[#111111] font-bold mb-2">
            Aplikasi Industri Tipikal:
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-technical">
            {activeMaterial.applications.map((app, idx) => (
              <span key={idx} className="bg-[#F6F6F4] border border-[#D8D8D4] px-3 py-1 text-[#222222]">
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* DFM Engineering Notes */}
        <div className="p-4 bg-[#F6F6F4] border-l-4 border-[#111111] space-y-1">
          <div className="text-xs font-technical uppercase tracking-wider text-[#111111] font-bold">
            Catatan Perancangan & Pemilihan Perkakas (Tooling Notes):
          </div>
          <p className="text-xs sm:text-sm text-[#333333] leading-relaxed">
            {activeMaterial.engineeringNotes}
          </p>
        </div>
      </div>
    </div>
  );
};
