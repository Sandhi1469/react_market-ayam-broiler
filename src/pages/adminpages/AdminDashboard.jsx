import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function AdminDashboard() {
  // Mengambil state terpusat via React Context
  const { kandangList, setKandangList, orders, updateOrderStatus } = useContext(AppContext);

  // 1. Perhitungan Metrik Ringkas Peternakan
  // Total akumulasi seluruh sisa stok ayam aktif di kandang
  const totalAyamAktif = kandangList.reduce((acc, k) => acc + k.kapasitasSisa, 0);

  // Rata-rata bobot ayam aktif tertimbang
  const totalBobotKg = kandangList.reduce((acc, k) => acc + (k.kapasitasSisa * k.beratRataRata), 0);
  const rataRataBobot = totalAyamAktif > 0 ? (totalBobotKg / totalAyamAktif).toFixed(2) : 0;

  // Estimasi tonase khusus untuk kandang dengan status "Siap Panen"
  const tonaseSiapPanen = (
    kandangList
      .filter((k) => k.statusPanen === "Siap Panen")
      .reduce((acc, k) => acc + (k.kapasitasSisa * k.beratRataRata), 0) / 1000
  ).toFixed(2);

  // 2. Fungsi Toggle Status Panen Kandang (Siap Panen <-> 3 Hari Lagi)
  const toggleKandangStatus = (id) => {
    setKandangList((prev) =>
      prev.map((k) =>
        k.id === id
          ? { ...k, statusPanen: k.statusPanen === "Siap Panen" ? "3 Hari Lagi" : "Siap Panen" }
          : k
      )
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Peternak Broiler</h1>

      {/* Bagian 1: Tiga Kartu Metrik Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metrik Total Ayam Aktif */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs text-gray-500 font-semibold uppercase">Total Ayam Aktif</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {totalAyamAktif.toLocaleString("id-ID")}{" "}
            <span className="text-xs font-normal text-gray-500">ekor</span>
          </p>
        </div>

        {/* Metrik Rata-rata Bobot Saat Ini */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs text-gray-500 font-semibold uppercase">Rata-rata Bobot Saat Ini</p>
          <p className="text-2xl font-black text-blue-600 mt-1">
            {rataRataBobot}{" "}
            <span className="text-xs font-normal text-gray-500">kg / ekor</span>
          </p>
        </div>

        {/* Metrik Estimasi Tonase Siap Panen */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <p className="text-xs text-gray-500 font-semibold uppercase">Estimasi Tonase Siap Panen</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {tonaseSiapPanen}{" "}
            <span className="text-xs font-normal text-gray-500">Ton</span>
          </p>
        </div>
      </div>

      {/* Bagian 2: Tabel Antrean Purchase Order Pembeli */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="font-bold text-gray-800 text-sm">
            Antrean Purchase Order Pembeli ({orders.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-100/75 text-gray-600 uppercase text-[10px]">
              <tr>
                <th className="p-3">No. PO</th>
                <th className="p-3">Pembeli</th>
                <th className="p-3">Kandang</th>
                <th className="p-3">Kuantitas</th>
                <th className="p-3">Total Biaya</th>
                <th className="p-3">Status PO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-400">
                    Belum ada pesanan masuk.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold">{ord.id}</td>
                    <td className="p-3 font-medium">{ord.namaPembeli}</td>
                    <td className="p-3 text-gray-600">{ord.namaKandang}</td>
                    <td className="p-3">
                      {ord.jumlahEkor} ekor ({ord.totalBobotKg} kg)
                    </td>
                    <td className="p-3 font-bold text-emerald-600">
                      Rp {ord.totalBiaya.toLocaleString("id-ID")}
                    </td>
                    {/* Dropdown Pengubah Status: Pending / Disetujui / Selesai */}
                    <td className="p-3">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                        className={`px-2 py-1 rounded font-bold border text-xs cursor-pointer ${
                          ord.status === "Disetujui"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : ord.status === "Selesai"
                            ? "bg-blue-50 text-blue-700 border-blue-300"
                            : "bg-amber-50 text-amber-700 border-amber-300"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Disetujui">Disetujui</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bagian 3: Tabel Pemantauan Status Kandang */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="font-bold text-gray-800 text-sm">
            Tabel Pemantauan Status Kandang ({kandangList.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gray-100/75 text-gray-600 uppercase text-[10px]">
              <tr>
                <th className="p-3">Nama Kandang</th>
                <th className="p-3">Peternak & Kontak</th>
                <th className="p-3">Lokasi</th>
                <th className="p-3">Sisa Stok</th>
                <th className="p-3">Bobot</th>
                <th className="p-3">Harga / kg</th>
                <th className="p-3">Status Panen</th>
                <th className="p-3 text-center">Aksi Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {kandangList.map((k) => (
                <tr key={k.id} className="hover:bg-gray-50">
                  <td className="p-3 font-bold">{k.namaKandang}</td>
                  <td className="p-3">
                    {k.namaPeternak} ({k.kontak})
                  </td>
                  <td className="p-3 text-gray-600">{k.kotaKabupaten}</td>
                  <td className="p-3 font-semibold">
                    {k.kapasitasSisa.toLocaleString("id-ID")} ekor
                  </td>
                  <td className="p-3">{k.beratRataRata} kg</td>
                  <td className="p-3 text-emerald-600 font-bold">
                    Rp {k.hargaPerKg.toLocaleString("id-ID")}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        k.statusPanen === "Siap Panen"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {k.statusPanen}
                    </span>
                  </td>
                  {/* Tombol Pengubah Status Panen */}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => toggleKandangStatus(k.id)}
                      className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 active:scale-95 text-[11px] font-semibold"
                    >
                      Ubah Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
