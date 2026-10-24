import React from 'react';

export const AboutPortal: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-12">
      {/* Editorial Title */}
      <div className="border-b border-[#111111] pb-6">
        <div className="text-xs font-technical text-[#FF4400] font-bold mb-1">
          KOLOFON & MANIFESTO EDITORIAL
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] leading-tight">
          Menegakkan Disiplin Rekayasa di Balik Kejujuran Bentuk Produk
        </h1>
        <p className="text-base sm:text-lg text-[#555555] mt-3 leading-relaxed">
          REKAFORM adalah platform independen yang ditujukan bagi para praktisi, perancang, insinyur perkakas, dan akademisi desain produk yang memandang bahwa keindahan sejati sebuah artefak lahir dari optimasi fungsi, kesederhanaan perakitan, dan kepatuhan terhadap batas-batas fisika material.
        </p>
      </div>

      {/* Triad of Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-[#111111] space-y-3">
          <div className="text-xs font-technical font-bold text-[#FF4400]">
            01. FAKTOR BIOMEKANIK
          </div>
          <h3 className="text-lg font-bold text-[#111111]">
            Ergonomi Antropometri
          </h3>
          <p className="text-xs text-[#555555] leading-relaxed">
            Menolak perancangan yang mengabaikan dimensi fisik manusia. Memvalidasi antarmuka pegangan, clearance jari, dan distribusi gaya palmar menggunakan standar internasional DIN 33402 pada rentang persentil ke-5 hingga ke-95.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#111111] space-y-3">
          <div className="text-xs font-technical font-bold text-[#FF4400]">
            02. KELAYAKAN ALIR & CETAK
          </div>
          <h3 className="text-lg font-bold text-[#111111]">
            Metodologi DFM & DFA
          </h3>
          <p className="text-xs text-[#555555] leading-relaxed">
            Menolak sketsa konsep yang tidak dapat diejeksi dari rongga cetakan baja. Memahami dinamika lelehan polimer, rasio rusuk penguat 0.5t, sudut kemiringan draft, dan sistem pasangan ISO 286.
          </p>
        </div>

        <div className="p-6 bg-white border border-[#111111] space-y-3">
          <div className="text-xs font-technical font-bold text-[#FF4400]">
            03. KEJUJURAN MATERIAL
          </div>
          <h3 className="text-lg font-bold text-[#111111]">
            Honest Materiality
          </h3>
          <p className="text-xs text-[#555555] leading-relaxed">
            Melanjutkan tradisi fungsionalis Ulm dan Dieter Rams: membiarkan logam mengekspresikan kekakuan dan konduktivitasnya, serta polimer menjalankan fungsi isolasi dan fluiditas tanpa memalsukan tekstur bahan lain.
          </p>
        </div>
      </div>

      {/* Editorial Commitments */}
      <div className="border border-[#111111] bg-white p-6 sm:p-8 space-y-6">
        <h3 className="text-xl font-bold text-[#111111]">
          Prinsip Penulisan & Komitmen Akademis
        </h3>
        <div className="space-y-4 text-sm text-[#333333] leading-relaxed">
          <p>
            Banyak publikasi desain kontemporer terjebak dalam glorifikasi rendering 3D digital yang mengabaikan kendala manufaktur di lini pabrik. Akibatnya, lahir ilusi bahwa desain produk hanyalah persoalan pemodelan bentuk luar yang menarik di media sosial.
          </p>
          <p>
            Di REKAFORM, seluruh artikel, tabel toleransi, formula mekanis, dan studi komparasi disusun berbasis literatur teknik yang dapat diverifikasi: standar ASME Y14.5, ISO 1101, DIN 16901, buku panduan pemilihan bahan Ashby, dan metodologi Design for Manufacture and Assembly (DFMA) Boothroyd & Dewhurst.
          </p>
          <p>
            Platform ini menolak penulisan klise, asumsi fiktif, atau sitasi palsu. Tujuan kami adalah menyajikan literasi rekayasa desain produk yang berbobot, lugas, dan dapat dipertanggungjawabkan di meja insinyur cetakan maupun di ruang kuliah.
          </p>
        </div>
      </div>
    </div>
  );
};
