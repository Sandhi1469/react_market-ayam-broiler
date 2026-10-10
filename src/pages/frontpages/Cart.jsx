import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export default function Cart() {
  const navigate = useNavigate();
  // Mengambil state cart dan fungsi manipulasi via React Context
  const { cart, updateCartQty, removeFromCart } = useContext(AppContext);

  // Menghitung grand total bobot dan grand total biaya
  const grandTotalBobotKg = cart.reduce((acc, item) => acc + item.totalBobotKg, 0);
  const grandTotalBiaya = cart.reduce((acc, item) => acc + item.totalBiaya, 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">Keranjang Pembelian Broiler</h1>
        <Link to="/" className="text-xs font-semibold text-amber-600 hover:underline">
          ← Tambah Pesanan Kandang Lain
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center space-y-4 shadow-xs">
          <div className="text-4xl">🛒</div>
          <h2 className="text-lg font-bold text-gray-700">Keranjang Anda Masih Kosong</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Belum ada kandang ayam yang dipilih. Silakan kembali ke katalog Dashboard untuk memilih ayam siap panen.
          </p>
          <Link
            to="/"
            className="inline-block px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition active:scale-95 shadow-xs"
          >
            Lihat Daftar Kandang Broiler
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Tabel / Daftar Item Keranjang */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold border-b">
                  <tr>
                    <th className="p-4">Kandang & Lokasi</th>
                    <th className="p-4">Bobot Rata</th>
                    <th className="p-4">Jumlah Ekor</th>
                    <th className="p-4">Estimasi Bobot</th>
                    <th className="p-4">Harga / kg</th>
                    <th className="p-4">Subtotal</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <tr key={item.kandangId} className="hover:bg-gray-50">
                      <td className="p-4">
                        <span className="font-bold text-gray-900 block">{item.namaKandang}</span>
                        <span className="text-[11px] text-gray-400">{item.alamatKandang}</span>
                      </td>
                      <td className="p-4 font-semibold text-gray-700">
                        {item.beratRataRata} kg
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="10"
                            step="10"
                            value={item.jumlahEkor}
                            onChange={(e) => updateCartQty(item.kandangId, Number(e.target.value))}
                            className="w-20 px-2 py-1 border rounded text-xs font-bold text-center"
                          />
                          <span className="text-[11px] text-gray-400">ekor</span>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-gray-800">
                        {item.totalBobotKg.toLocaleString("id-ID")} kg
                      </td>
                      <td className="p-4 text-gray-600">
                        Rp {item.hargaPerKg.toLocaleString("id-ID")}
                      </td>
                      <td className="p-4 font-black text-emerald-600 text-sm">
                        Rp {item.totalBiaya.toLocaleString("id-ID")}
                      </td>
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.kandangId)}
                          className="text-rose-500 hover:text-rose-700 font-semibold p-1 hover:bg-rose-50 rounded"
                          title="Hapus item dari keranjang"
                        >
                          ✕ Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ringkasan Biaya & Tombol Lanjut ke Checkout */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-gray-500">Total Akumulasi Pembelian:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-600">
                  Rp {grandTotalBiaya.toLocaleString("id-ID")}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  (~{grandTotalBobotKg.toLocaleString("id-ID")} kg / {(grandTotalBobotKg / 1000).toFixed(2)} Ton)
                </span>
              </div>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <Link
                to="/"
                className="flex-1 sm:flex-none text-center px-4 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100 transition active:scale-95"
              >
                Tambah Lainnya
              </Link>
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition active:scale-95 shadow-md shadow-amber-600/20 cursor-pointer"
              >
                Lanjut ke Checkout →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

