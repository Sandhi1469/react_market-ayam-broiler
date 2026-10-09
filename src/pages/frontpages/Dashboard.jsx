import React, { useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";

// Halaman Dashboard Katalog Produk
export default function Dashboard() {
  // Mengambil state kandang dan filter via Outlet context
  const { kandangList, search, kategoriBerat } = useOutletContext();

  // Filter Data Kandang berdasarkan search lokasi & kategori berat
  const filteredKandang = useMemo(() => {
    return kandangList.filter((k) => {
      const q = (search || "").toLowerCase();
      const matchSearch =
        k.kotaKabupaten.toLowerCase().includes(q) ||
        k.alamatKandang.toLowerCase().includes(q) ||
        k.namaKandang.toLowerCase().includes(q);

      let matchBerat = true;
      if (kategoriBerat === "kecil") matchBerat = k.beratRataRata >= 1.2 && k.beratRataRata <= 1.5;
      if (kategoriBerat === "standar") matchBerat = k.beratRataRata >= 1.6 && k.beratRataRata <= 2.0;
      if (kategoriBerat === "jumbo") matchBerat = k.beratRataRata > 2.0;

      return matchSearch && matchBerat;
    });
  }, [kandangList, search, kategoriBerat]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Produk Broiler</h1>
          <p className="text-xs text-gray-500">
            Daftar kandang ayam broiler siap panen langsung dari peternak terverifikasi.
          </p>
        </div>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-fit">
          Menampilkan {filteredKandang.length} Kandang
        </span>
      </div>

      {filteredKandang.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border border-gray-200 shadow-xs">
          <p className="text-sm font-semibold text-gray-600">Tidak ada kandang yang sesuai dengan kriteria pencarian.</p>
          <p className="text-xs text-gray-400 mt-1">Coba sesuaikan kata kunci pencarian lokasi atau pilih "Semua Kategori Bobot".</p>
        </div>
      ) : (
        /* Grid Kandang Responsif */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredKandang.map((k) => (
            <div
              key={k.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header Kartu: Kode & Status Panen */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-bold text-sm flex items-center justify-center">
                      🐔
                    </span>
                    <div>
                      <span className="font-mono text-xs font-bold text-gray-500">{k.id}</span>
                      <span className="block text-[11px] text-gray-400">Umur: {k.umurHari} Hari</span>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white ${
                      k.statusPanen === "Siap Panen" ? "bg-emerald-600" : "bg-amber-500"
                    }`}
                  >
                    {k.statusPanen}
                  </span>
                </div>

                {/* Info Detail Kartu */}
                <div className="p-4 space-y-3">
                  <div>
                    <h2 className="font-bold text-gray-900 text-base">{k.namaKandang}</h2>
                    <p className="text-xs text-gray-500">{k.kotaKabupaten} — {k.alamatKandang}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Peternak: <strong>{k.namaPeternak}</strong> ({k.kontak})
                    </p>
                  </div>

                  {/* Spesifikasi Teknis: Bobot, Sisa Stok, Harga */}
                  <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 text-xs grid grid-cols-3 gap-1 text-center">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Bobot</span>
                      <span className="font-bold text-gray-800">{k.beratRataRata} kg</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Sisa Stok</span>
                      <span className="font-bold text-amber-700">{k.kapasitasSisa.toLocaleString("id-ID")} ekor</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-semibold">Harga / kg</span>
                      <span className="font-bold text-emerald-600">Rp {k.hargaPerKg.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tautan Menuju Halaman Detail Produk */}
              <div className="p-4 pt-0">
                <Link
                  to={`/product/${k.id}`}
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition active:scale-95 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer text-center block"
                >
                  <span>Lihat Detail & Beli</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

