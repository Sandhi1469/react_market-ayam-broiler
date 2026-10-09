# BroilerHub - Single Page Application Market Ayam Broiler

Aplikasi Single Page Application (SPA) web market ayam broiler siap panen yang menghubungkan peternak unggas dengan pembeli (pedagang pasar, restoran, rumah makan, RPA, dan industri olahan karkas) secara langsung (*B2B Direct Farm-to-Buyer*).

Dibangun menggunakan **React 19**, **Tailwind CSS v4**, dan **React Router v7**.

---

## 🚀 Fitur Utama

### 1. Portal Pembeli (Rute: `/`)
- **Filter Bar Interaktif**:
  - Filter kategori bobot ayam: *Semua*, *Ukuran Kecil (1.2 - 1.5 kg)*, *Standar (1.6 - 2.0 kg)*, dan *Jumbo (>2.1 kg)*.
  - Pencarian lokasi kandang (kota/kabupaten, alamat, nama kandang, atau nama peternak).
  - Filter status panen (*Siap Panen* & *3 Hari Lagi*) dan sorting harga/bobot/stok.
- **Grid Kandang Responsif & Mikro-interaksi**:
  - Efek kartu visual: `hover:-translate-y-1 hover:shadow-xl transition-all duration-200`.
  - Tombol aksi responsif: `active:scale-95 transition-transform`.
  - Informasi bobot rata-rata, harga/kg, umur ayam, dan sisa stok ekor.
- **Kalkulator Bobot & Biaya Real-time (Modal Pemesanan)**:
  - Input jumlah ekor dengan tombol cepat (+200, +500, +1000, Semua).
  - Kalkulasi instan: `Estimasi Total Bobot = Ekor × Berat Rata-rata` dan `Estimasi Total Biaya = Total Bobot × Harga per Kg`.
  - Validasi error jika input melebihi sisa stok kandang.
- **Konfirmasi Nota & Kartu Alamat Penjemputan**:
  - Rincian nota transaksi digital.
  - Kartu alamat lengkap kandang tujuan penjemputan ayam.
  - Tombol fungsional **"Salin Alamat"** (dengan feedback clipboard interaktif) dan tautan Google Maps.

### 2. Dashboard Peternak (Rute: `/peternak`)
- **Metrik Ringkas Peternakan**:
  - Total Ayam Aktif (ekor).
  - Rata-rata Bobot Saat Ini (kg/ekor).
  - Estimasi Tonase Siap Panen (Ton).
  - Total Antrean Purchase Order & Estimasi Omset.
- **Tabel Antrean Purchase Order (PO)**:
  - Menampilkan pesanan pembeli yang masuk secara real-time.
  - Fitur pengubahan status pesanan (*Pending* / *Disetujui* / *Selesai*).
- **Tabel Manajemen Status Kandang**:
  - Pemantauan kapasitas sisa, bobot, umur ayam, dan harga per kg.
  - Tombol toggle status panen (*Siap Panen* <-> *3 Hari Lagi*).

---

## 🛠️ Panduan Menjalankan Aplikasi

Pastikan Node.js sudah terpasang di sistem.

```bash
# Instal dependensi (jika belum)
npm install

# Jalankan server pengembangan Vite
npm run dev

# Bangun aplikasi untuk produksi
npm run build
```

Buka URL yang muncul di terminal (biasanya `http://localhost:5173/` atau port aktif berikutnya) pada peramban Anda.
