import React from "react";

// Halaman informasi profil sistem
export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900">Tentang Sistem BroilerHub</h1>

      <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-200 space-y-4">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 text-2xl flex items-center justify-center font-bold">
            🐔
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900">BroilerHub Digital Marketplace</h2>
            <p className="text-xs text-gray-500">Platform Manajemen Rantai Pasok Ayam Broiler Langsung dari Kandang</p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
          <p>
            <strong>BroilerHub</strong> dirancang untuk menyelesaikan ketimpangan informasi harga dan kuantitas panen antara peternak broiler dan pedagang/RPA (Rumah Potong Ayam). Melalui sistem ini:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Peternak dapat mempublikasikan estimasi tanggal panen, rata-rata bobot ayam, dan sisa kapasitas kandang.</li>
            <li>Pembeli dapat melakukan simulasi kalkulasi bobot total serta estimasi biaya transaksi sebelum armada penjemputan dikirim ke lokasi kandang.</li>
            <li>Transaksi purchase order terdata secara transparan dengan alamat penjemputan terverifikasi.</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
          <span className="font-bold text-gray-800 block">Informasi Arsitektur Perangkat Lunak:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600">
            <div>• Framework Frontend: <strong>React 19 (SPA)</strong></div>
            <div>• Routing Library: <strong>React Router v7</strong></div>
            <div>• CSS Framework: <strong>Tailwind CSS v4 (@tailwindcss/vite)</strong></div>
            <div>• Build Tool: <strong>Vite 7</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

