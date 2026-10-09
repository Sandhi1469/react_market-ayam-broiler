import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/frontpages/Dashboard";
import ProductDetail from "./pages/frontpages/ProductDetail";
import Cart from "./pages/frontpages/Cart";
import Checkout from "./pages/frontpages/Checkout";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import AboutPage from "./pages/adminpages/AboutPage";
import { initialKandangData, initialOrdersData } from "./data/kandangData";

export default function App() {
  // State Utama Aplikasi E-Commerce
  const [kandangList, setKandangList] = useState(initialKandangData);
  const [orders, setOrders] = useState(initialOrdersData);
  const [cart, setCart] = useState([]);
  
  // State Pencarian & Filter Kategori Bobot Global
  const [search, setSearch] = useState("");
  const [kategoriBerat, setKategoriBerat] = useState("Semua");

  // 1. Fungsi Menambah Produk ke Keranjang Belanja (Cart)
  const addToCart = (newItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.kandangId === newItem.kandangId);
      if (existing) {
        const kandang = kandangList.find((k) => k.id === newItem.kandangId);
        const maxQty = kandang ? kandang.kapasitasSisa : Infinity;
        const totalQty = Math.min(existing.jumlahEkor + newItem.jumlahEkor, maxQty);
        const totalBobotKg = Number((totalQty * existing.beratRataRata).toFixed(2));
        const totalBiaya = Math.round(totalBobotKg * existing.hargaPerKg);
        return prev.map((item) =>
          item.kandangId === newItem.kandangId
            ? {
                ...item,
                jumlahEkor: totalQty,
                totalBobotKg,
                totalBiaya
              }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  // 2. Fungsi Mengubah Kuantitas Item di Keranjang
  const updateCartQty = (kandangId, newQty) => {
    const kandang = kandangList.find((k) => k.id === kandangId);
    const maxQty = kandang ? kandang.kapasitasSisa : Infinity;
    const parsedQty = Math.max(1, Number(newQty) || 1);
    const qty = Math.min(parsedQty, maxQty);

    setCart((prev) =>
      prev.map((item) => {
        if (item.kandangId === kandangId) {
          const totalBobotKg = Number((qty * item.beratRataRata).toFixed(2));
          const totalBiaya = Math.round(totalBobotKg * item.hargaPerKg);
          return { ...item, jumlahEkor: qty, totalBobotKg, totalBiaya };
        }
        return item;
      })
    );
  };

  // 3. Fungsi Menghapus Item dari Keranjang
  const removeFromCart = (kandangId) => {
    setCart((prev) => prev.filter((item) => item.kandangId !== kandangId));
  };

  // 4. Fungsi Checkout Keranjang: Buat PO dan Kurangi Stok Kandang
  const checkoutCart = ({ namaPembeli, kontakPembeli, jadwalPengambilan, catatan }) => {
    const timestamp = new Date().toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "short"
    });

    const newOrders = cart.map((item, index) => ({
      id: `PO-${Date.now().toString().slice(-4)}-${index + 1}`,
      kandangId: item.kandangId,
      namaKandang: item.namaKandang,
      alamatKandang: item.alamatKandang,
      namaPembeli,
      kontakPembeli,
      jumlahEkor: item.jumlahEkor,
      beratRataRata: item.beratRataRata,
      totalBobotKg: item.totalBobotKg,
      totalBiaya: item.totalBiaya,
      jadwalPengambilan,
      catatan,
      tanggalPesan: timestamp,
      status: "Pending"
    }));

    // Kurangi stok masing-masing kandang yang dipesan
    setKandangList((prev) =>
      prev.map((k) => {
        const itemDipesan = cart.find((c) => c.kandangId === k.id);
        if (itemDipesan) {
          return {
            ...k,
            kapasitasSisa: Math.max(0, k.kapasitasSisa - itemDipesan.jumlahEkor)
          };
        }
        return k;
      })
    );

    // Masukkan ke antrean PO
    setOrders((prev) => [...newOrders, ...prev]);

    // Kosongkan keranjang belanja
    setCart([]);

    return newOrders;
  };

  // 5. Fungsi Mengubah Status Pesanan di Admin
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <Routes>
      {/* Rute Halaman Utama (MainLayout) */}
      <Route
        path="/"
        element={
          <MainLayout
            cartCount={cart.length}
            contextValue={{
              kandangList,
              setKandangList,
              orders,
              cart,
              addToCart,
              updateCartQty,
              removeFromCart,
              checkoutCart,
              search,
              setSearch,
              kategoriBerat,
              setKategoriBerat
            }}
          />
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>

      {/* Rute Halaman Admin (AdminLayout) */}
      <Route
        path="/admin"
        element={
          <AdminLayout
            contextValue={{
              kandangList,
              setKandangList,
              orders,
              setOrders,
              updateOrderStatus
            }}
          />
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="about" element={<AboutPage />} />
      </Route>

      {/* Redirect rute /peternak ke /admin/dashboard */}
      <Route path="/peternak" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

