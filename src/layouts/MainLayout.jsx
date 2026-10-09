import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

// Layout utama untuk halaman katalog dan pembeli
export default function MainLayout({ cartCount, contextValue }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const { search, setSearch, kategoriBerat, setKategoriBerat } = contextValue || {};

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Header / Navbar */}
      <Navbar cartCount={cartCount} />

      {/* Header pencarian & filter (tampil di halaman utama) */}
      {isHomePage && setSearch && (
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 justify-between items-center">
            {/* Input Pencarian Produk / Lokasi */}
            <input
              type="text"
              placeholder="Cari produk kandang atau lokasi (Bogor, Sukabumi, dll)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-hidden bg-gray-50 focus:bg-white transition"
            />

            {/* Dropdown Kategori Berat */}
            <select
              value={kategoriBerat}
              onChange={(e) => setKategoriBerat(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-hidden bg-gray-50 text-gray-700 cursor-pointer"
            >
              <option value="Semua">Semua Kategori Bobot</option>
              <option value="kecil">Ukuran Kecil (1.2 - 1.5 kg)</option>
              <option value="standar">Standar Pasar (1.6 - 2.0 kg)</option>
              <option value="jumbo">Jumbo Super (&gt;2.1 kg)</option>
            </select>
          </div>
        </header>
      )}

      {/* Konten dinamis halaman */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <Outlet context={contextValue} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 text-xs">
        <p>© 2026 BroilerHub - Pasar Ayam Broiler | Version 1.0</p>
      </footer>
    </div>
  );
}

