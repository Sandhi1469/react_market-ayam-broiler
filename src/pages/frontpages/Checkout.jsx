import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  // Mengambil state cart, kandangList, dan fungsi pembuat order
  const { cart, checkoutCart } = useOutletContext();

  const [namaPembeli, setNamaPembeli] = useState("");
  const [kontakPembeli, setKontakPembeli] = useState("");
  const [jadwalPengambilan, setJadwalPengambilan] = useState("Besok Pagi (Subuh 05:00 - 08:00 WIB)");
  const [catatan, setCatatan] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [completedOrders, setCompletedOrders] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const grandTotalBobotKg = cart.reduce((acc, item) => acc + item.totalBobotKg, 0);
  const grandTotalBiaya = cart.reduce((acc, item) => acc + item.totalBiaya, 0);

  const handleProcessCheckout = (e) => {
    e.preventDefault();
    if (!namaPembeli.trim()) {
      setErrorMsg("Nama pembeli atau usaha wajib diisi!");
      return;
    }
    if (!kontakPembeli.trim()) {
      setErrorMsg("Kontak WhatsApp wajib diisi untuk koordinasi timbang!");
      return;
    }
    if (cart.length === 0) {
      setErrorMsg("Keranjang belanja kosong!");
      return;
    }

    const createdOrders = checkoutCart({
      namaPembeli: namaPembeli.trim(),
      kontakPembeli: kontakPembeli.trim(),
      jadwalPengambilan,
      catatan: catatan.trim() || "Armada penjemputan disiapkan pembeli"
    });

    setCompletedOrders(createdOrders);
    setErrorMsg("");
  };

  const handleCopy = (text, index) => {
    navigator.clipboard?.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Tampilan Jika Sudah Berhasil Checkout (Nota Akhir)
  if (completedOrders) {
    const notaTotalBiaya = completedOrders.reduce((acc, o) => acc + o.totalBiaya, 0);

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md space-y-5 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
            ✓
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Transaksi Berhasil Dibuat!</h2>
            <p className="text-xs text-gray-500 mt-1">
              Purchase Order telah diteruskan ke pihak kandang dan stok berhasil dikurangi.
            </p>
          </div>

          {/* Rincian Nota */}
          <div className="bg-gray-50 p-4 rounded-xl text-left text-xs space-y-2 border">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Nama Pembeli:</span>
              <span className="font-bold text-gray-800">{namaPembeli} ({kontakPembeli})</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Jadwal Tangkap:</span>
              <span className="font-bold text-amber-700">{jadwalPengambilan}</span>
            </div>
            
            <div className="pt-1 space-y-3">
              <span className="text-gray-500 font-bold block">Daftar Kandang Tujuan & Alamat Penjemputan:</span>
              {completedOrders.map((ord, idx) => (
                <div key={ord.id} className="bg-white p-3 rounded-lg border border-amber-200 space-y-1.5">
                  <div className="flex justify-between font-bold text-gray-800">
                    <span>{ord.namaKandang} ({ord.id})</span>
                    <span className="text-emerald-600">Rp {ord.totalBiaya.toLocaleString("id-ID")}</span>
                  </div>
                  <p className="text-gray-600 text-[11px]">
                    Kuantitas: {ord.jumlahEkor.toLocaleString("id-ID")} ekor (~{ord.totalBobotKg} kg)
                  </p>
                  <p className="text-gray-500 text-[11px]">
                    📍 Alamat: {ord.alamatKandang}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(ord.alamatKandang, idx)}
                    className="w-full mt-1 py-1.5 px-3 bg-amber-50 border border-amber-300 rounded font-semibold text-amber-800 text-[11px] hover:bg-amber-100 active:scale-95 transition"
                  >
                    {copiedIndex === idx ? "✓ Alamat Tersalin!" : "📋 Salin Alamat Kandang"}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-3 border-t text-sm font-black">
              <span>Total Tagihan:</span>
              <span className="text-emerald-700">Rp {notaTotalBiaya.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Link
              to="/"
              className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100"
            >
              Belanja Kembali
            </Link>
            <Link
              to="/admin/dashboard"
              className="flex-1 py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold"
            >
              Cek Status di Dashboard Admin →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Form Checkout
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Konfirmasi Pemesanan & Checkout</h1>
        <Link to="/cart" className="text-xs font-semibold text-amber-600 hover:underline">
          ← Kembali ke Keranjang
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border text-center space-y-3">
          <p className="text-sm text-gray-600">Tidak ada item yang dapat di-checkout.</p>
          <Link to="/" className="inline-block px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold">
            Mulai Belanja Ayam
          </Link>
        </div>
      ) : (
        <form onSubmit={handleProcessCheckout} className="space-y-6">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-700 text-xs font-semibold rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Form Identitas Pembeli */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-800 border-b pb-2">1. Data Pembeli / Usaha</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Nama Pembeli / Perusahaan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: CV Resto Sambal / Pak Hendra"
                  value={namaPembeli}
                  onChange={(e) => setNamaPembeli(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Nomor WhatsApp / Telepon <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 0812-3456-7890"
                  value={kontakPembeli}
                  onChange={(e) => setKontakPembeli(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Jadwal Penjemputan / Tangkap Ayam
                </label>
                <select
                  value={jadwalPengambilan}
                  onChange={(e) => setJadwalPengambilan(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-amber-500 outline-hidden"
                >
                  <option value="Hari Ini (Malam 19:00 - 22:00 WIB)">Hari Ini (Malam 19:00 - 22:00 WIB)</option>
                  <option value="Besok Pagi (Subuh 05:00 - 08:00 WIB)">Besok Pagi (Subuh 05:00 - 08:00 WIB)</option>
                  <option value="Besok Malam (19:00 - 23:00 WIB)">Besok Malam (19:00 - 23:00 WIB)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Catatan Armada Penjemputan
                </label>
                <input
                  type="text"
                  placeholder="Misal: Truk Colt Diesel bawa keranjang"
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Ringkasan Nota Item & Alamat Kandang */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-gray-800 border-b pb-2">2. Ringkasan Pesanan & Lokasi Penjemputan</h2>
            
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div key={item.kandangId} className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs space-y-2">
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-gray-900 text-sm">{item.namaKandang}</span>
                    <span className="text-emerald-700 text-sm">Rp {item.totalBiaya.toLocaleString("id-ID")}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-gray-600 text-[11px]">
                    <div>Ekor: <strong>{item.jumlahEkor.toLocaleString("id-ID")}</strong></div>
                    <div>Bobot Rata: <strong>{item.beratRataRata} kg</strong></div>
                    <div>Total Bobot: <strong>{item.totalBobotKg.toLocaleString("id-ID")} kg</strong></div>
                    <div>Harga/kg: <strong>Rp {item.hargaPerKg.toLocaleString("id-ID")}</strong></div>
                  </div>

                  {/* Kartu Alamat Penjemputan */}
                  <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-900 block">Alamat Penjemputan Ayam:</span>
                      <span className="text-gray-700 font-medium">{item.alamatKandang}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.alamatKandang, idx)}
                      className="px-3 py-1 bg-white border border-amber-300 rounded font-semibold text-amber-800 text-[11px] hover:bg-amber-100 active:scale-95 transition shrink-0"
                    >
                      {copiedIndex === idx ? "✓ Tersalin" : "📋 Salin Alamat"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t flex justify-between items-center">
              <div>
                <span className="text-xs text-gray-500 block">Total Bobot Akumulasi:</span>
                <span className="font-bold text-gray-800">{grandTotalBobotKg.toLocaleString("id-ID")} kg ({(grandTotalBobotKg / 1000).toFixed(2)} Ton)</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block">Total Tagihan:</span>
                <span className="text-xl font-black text-emerald-600">
                  Rp {grandTotalBiaya.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Tombol Konfirmasi Akhir */}
          <div className="flex justify-end gap-3">
            <Link
              to="/cart"
              className="px-5 py-2.5 border rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100"
            >
              Ubah Keranjang
            </Link>
            <button
              type="submit"
              className="px-8 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition active:scale-95 shadow-md shadow-amber-600/30 cursor-pointer"
            >
              Konfirmasi & Buat Purchase Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

