import React, { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function ProductDetail() {
  // Mengambil parameter ID kandang dari URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { kandangList, addToCart } = useContext(AppContext);

  // Mencari data kandang berdasarkan ID di URL
  const kandang = kandangList.find((k) => k.id === id);

  // State kuantitas ekor untuk simulasi kalkulator bobot
  const [jumlahEkor, setJumlahEkor] = useState(200);
  const [pesanSukses, setPesanSukses] = useState(false);

  if (!kandang) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-xs border text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Kandang Tidak Ditemukan</h2>
        <p className="text-sm text-gray-500">ID kandang "{id}" tidak terdaftar dalam sistem.</p>
        <Link to="/" className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold">
          ← Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  // Kalkulasi Real-Time
  const ekor = Number(jumlahEkor) || 0;
  const totalBobotKg = Number((ekor * kandang.beratRataRata).toFixed(2));
  const totalBiaya = Math.round(totalBobotKg * kandang.hargaPerKg);
  const isOverStock = ekor > kandang.kapasitasSisa;

  const handleAddToCart = () => {
    if (ekor <= 0 || isOverStock) return;
    addToCart({
      kandangId: kandang.id,
      namaKandang: kandang.namaKandang,
      alamatKandang: `${kandang.alamatKandang}, ${kandang.kotaKabupaten}`,
      namaPeternak: kandang.namaPeternak,
      kontakPeternak: kandang.kontak,
      beratRataRata: kandang.beratRataRata,
      hargaPerKg: kandang.hargaPerKg,
      jumlahEkor: ekor,
      totalBobotKg,
      totalBiaya
    });
    setPesanSukses(true);
    setTimeout(() => setPesanSukses(false), 2500);
  };

  const handleBuyNow = () => {
    if (ekor <= 0 || isOverStock) return;
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb / Navigasi Balik */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-amber-600 font-medium">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-800 font-bold">Detail Kandang ({kandang.id})</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
        {/* Header Kandang */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-200">
              Spesifikasi Lengkap Panen Broiler
            </span>
            <h1 className="text-2xl font-black mt-1">{kandang.namaKandang}</h1>
            <p className="text-xs text-amber-100 mt-0.5">
              Lokasi: {kandang.kotaKabupaten} — {kandang.alamatKandang}
            </p>
          </div>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-xs ${
              kandang.statusPanen === "Siap Panen" ? "bg-emerald-500" : "bg-amber-800"
            }`}
          >
            ● {kandang.statusPanen}
          </span>
        </div>

        {/* Konten Grid Spesifikasi & Kalkulator */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kiri: Info Peternakan */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-sm border-b pb-2">Informasi Teknis Kandang</h3>
            
            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Kode Kandang:</span>
                <span className="font-mono font-bold text-gray-800">{kandang.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Nama Peternak:</span>
                <span className="font-semibold text-gray-800">{kandang.namaPeternak}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Kontak WhatsApp:</span>
                <span className="font-semibold text-gray-800">{kandang.kontak}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Umur Ayam:</span>
                <span className="font-bold text-gray-800">{kandang.umurHari} Hari</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Bobot Rata-rata per Ekor:</span>
                <span className="font-bold text-amber-700">{kandang.beratRataRata} kg</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-400">Harga per Kilogram:</span>
                <span className="font-black text-emerald-600 text-sm">
                  Rp {kandang.hargaPerKg.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400">Sisa Stok Siap Angkut:</span>
                <span className="font-extrabold text-gray-900">
                  {kandang.kapasitasSisa.toLocaleString("id-ID")} ekor
                </span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 space-y-1">
              <p className="font-bold">ℹ️ Catatan Pengambilan:</p>
              <p>
                Penimbangan dilakukan langsung di lokasi kandang menggunakan timbangan digital terverifikasi. Armada penjemputan disiapkan pembeli atau mitra ekspedisi ayam hidup.
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Kalkulator Pesanan Real-time */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-sm">Kalkulator Pembelian</h3>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <label className="font-bold text-gray-700">Jumlah Pesanan (Ekor):</label>
                  {isOverStock && <span className="text-rose-500 font-bold">Melebihi sisa stok!</span>}
                </div>
                <input
                  type="number"
                  min="1"
                  max={kandang.kapasitasSisa}
                  value={jumlahEkor}
                  onChange={(e) => setJumlahEkor(Number(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg text-sm font-bold bg-white ${
                    isOverStock ? "border-rose-500 bg-rose-50" : "border-gray-300"
                  }`}
                />
              </div>

              {/* Rincian Kalkulasi Otomatis */}
              <div className="bg-white p-3.5 rounded-lg border border-gray-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimasi Total Bobot:</span>
                  <span className="font-bold text-gray-800">{totalBobotKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimasi Total Tonase:</span>
                  <span className="font-bold text-gray-800">{(totalBobotKg / 1000).toFixed(2)} Ton</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-bold text-gray-700">Estimasi Total Biaya:</span>
                  <span className="font-black text-base text-emerald-600">
                    Rp {totalBiaya.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {pesanSukses && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-lg text-center">
                  ✓ Berhasil ditambahkan ke keranjang!
                </div>
              )}
            </div>

            {/* Tombol Aksi */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOverStock || ekor <= 0}
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition active:scale-95 disabled:bg-gray-300 cursor-pointer"
              >
                + Masukkan ke Keranjang
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={isOverStock || ekor <= 0}
                className="w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl text-xs transition active:scale-95 disabled:bg-gray-300 cursor-pointer"
              >
                Beli Sekarang (Lanjut ke Keranjang) →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

