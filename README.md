# Hy Arez — Portal Desain Industri, Additive Manufacturing & Studio 3D

> **Platform Web & Jurnal Riset:** Kajian Kebaruan Substantif Desain Industri, Strategi Manufaktur Aditif (3D Printing), Portofolio CAD & Studio Inspeksi 3D Interaktif Three.js.
> 
> **Penulis / Kreator:** **Arif Reza Basirun (Arez)** — Pemeriksa Desain Industri Ahli Pertama di Direktorat Jenderal Kekayaan Intelektual (DJKI) Kementerian Hukum RI, Alumnus Magister Teknik Industri Universitas Gadjah Mada (UGM).

---

## 🌟 Fitur Utama & Modul Sistem

### 1. Kajian Desain Industri & Pengujian Kebaruan Substantif
* Analisis komprehensif 4 elemen bentuk statutory UU No. 31 Tahun 2000: Bentuk, Konfigurasi, Komposisi Garis, dan Komposisi Warna.
* Doktrin fungsi teknis (*technical functionality doctrine*) vs estetika visual kasat mata (Paten vs Desain Industri).
* Metodologi penelusuran seni terdahulu (*prior art search*) di pangkalan data DJKI, WIPO Global Design Database, dan Designview.
* 5 Kesalahan fatal pemohon desain industri dan panduan spesifikasi gambar 7 sudut ortogonal standar DJKI.

### 2. Additive Manufacturing dan Desain Industri
* Transisi manufaktur aditif dari *rapid prototyping* ke produksi massal (*direct manufacturing*).
* Komparasi efisiensi waktu siklus pengembangan produk (penghematan 64% hingga 93%).
* Analisis kurva biaya dan penentuan titik impas (*break-even point*) terhadap cetak injeksi plastik (*injection molding*).
* Titik kunci desain (*design lock*) dan strategi penguncian hak sebelum publikasi (*first-to-file*).
* Matriks 5 pilar perlindungan HKI produk 3D: Paten, Desain Industri, Hak Cipta, Merek, dan Kontrak/Rahasia Dagang.
* Dilengkapi 4 diagram infografis SVG vektor responsif resolusi tinggi.

### 3. Studio Inspeksi 3D Interaktif (Three.js WebGL)
* **Viewport 3D Berbasis WebGL & Three.js**: Interaksi 360° dengan kontrol Orbit yang halus (*damping factor 0.05*).
* **4 Model Prototipe CAD Parametrik**:
  1. *Transmisi Roda Gigi Tanduk (Horn Gears Kinematics Assembly)* — 8 komponen roda gigi planetarium mesin kepang serat sutra alami.
  2. *Setrika Listrik Ergonomis (Morfologi Kurva G2)* — 7 komponen bodi aerodinamis kelas G2 dengan *parting line* tersembunyi.
  3. *Sistem Modular Lampu GEON (Biederman Spatial Theory)* — 7 komponen artikulasi ganda dengan *friction hinge*.
  4. *Casing Enclosure IoT Dual-Tone CMF* — 6 komponen presisi dengan mekanisme pengunci *cantilever snap-fit*.
* **Fitur Studio**:
  - *Exploded View Slider (0% - 100%)*: Dekonstruksi rakitan komponen secara *real-time*.
  - *Material Finish PBR*: Titanium Industri, Anodized Cobalt Blue, Ceramic Matte White, dan Polished Brass & Carbon.
  - *Simulasi Kinematika*: Putaran roda gigi tanduk sinkron dan mode putaran dinamis.
  - *Sudut Kamera Standar DJKI*: Preset Isometrik, Tampak Depan, Tampak Atas, dan Tampak Samping.
  - *Mode Wireframe CAD*: Inspeksi topologi permukaan geometris.

### 4. Galeri Portofolio & Jurnal Interaktif
* Dokumentasi karya 2D (Identitas Visual & Monogram IDE Indonesia), 3D CAD modeling, dan produk fisik manufaktur aditif (UGM & DJKI).
* Integrasi *deep-linking* "3D Live" dari kartu portofolio langsung ke Studio 3D.
* Sistem manajemen konten artikel dan komentar pembaca dengan persistensi Cloud Firestore.

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

* **Frontend Engine:** Vite 8, React 19, TypeScript
* **3D Graphics & Visualisation:** Three.js, OrbitControls, WebGL PBR Shading
* **Styling & Design System:** Tailwind CSS, Plus Jakarta Sans, Newsreader, IBM Plex Mono
* **Database & Persistence:** Firebase Firestore
* **Vector Graphics:** Standard SVG 100% Valid XML Standar W3C

---

## 🚀 Menjalankan Aplikasi Secara Lokal

### Prasyarat
* Node.js v18+ atau v20+
* npm, yarn, pnpm, atau bun

### Instalasi & Menjalankan Dev Server
```bash
# 1. Clone repositori
git clone <URL_REPOSITORI_ANDA>
cd <NAMA_FOLDER>

# 2. Pasang dependensi
npm install

# 3. Jalankan development server
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:3000`

### Build untuk Produksi
```bash
npm run build
```
Hasil build yang optimal dan ter-minifikasi akan tersedia di direktori `dist/`.

---

## 📤 Langkah Mempublikasikan ke GitHub (Publish to GitHub)

Repositori lokal telah diinisialisasi dengan commit bersih. Ikuti langkah mudah berikut untuk menghubungkan dan mengirim kode ke akun GitHub Anda:

### 1. Buat Repositori Baru di GitHub
1. Buka [github.com/new](https://github.com/new).
2. Beri nama repositori (misalnya `hy-arez-portal` atau `industrial-design-3d`).
3. Jangan centang "Initialize this repository with a README" (karena kita sudah memilikinya).
4. Klik **Create repository**.

### 2. Hubungkan & Push dari Terminal
Jalankan perintah berikut di folder proyek Anda:

```bash
# Tambahkan remote origin dengan URL repositori Anda
git remote add origin https://github.com/<USERNAME_GITHUB_ANDA>/<NAMA_REPOSITORI>.git

# Ubah nama branch utama menjadi main
git branch -M main

# Kirimkan kode ke GitHub
git push -u origin main
```

*(Jika menggunakan Personal Access Token (PAT) atau SSH, gunakan URL yang sesuai: `git@github.com:<USERNAME>/<REPO>.git`)*

---

## 📄 Lisensi & Hak Cipta

© 2026 Arif Reza Basirun (IDE Indonesia). Seluruh hak cipta materi kajian, diagram teknis, dan rancangan model 3D dilindungi undang-undang.
