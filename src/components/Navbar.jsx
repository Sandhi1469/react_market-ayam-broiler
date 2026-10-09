import React from "react";
import { Link, useLocation } from "react-router-dom";

// Komponen navigasi utama aplikasi
export default function Navbar({ cartCount = 0 }) {
  const location = useLocation();

  const isLinkActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-amber-600 text-white px-4 sm:px-6 py-3.5 flex flex-wrap justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
        <span>🐔 BroilerHub</span>
        <span className="text-[10px] bg-amber-800 text-amber-100 px-2 py-0.5 rounded-full font-normal hidden sm:inline">
          Pasar Ayam Broiler
        </span>
      </Link>

      {/* Menu Navigasi */}
      <div className="flex items-center gap-2 sm:gap-6 text-sm font-medium mt-2 sm:mt-0">
        <Link
          to="/"
          className={`px-2.5 py-1 rounded-lg transition ${
            isLinkActive("/") ? "bg-white/20 font-bold" : "hover:text-amber-100"
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/cart"
          className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 ${
            isLinkActive("/cart") ? "bg-white/20 font-bold" : "hover:text-amber-100"
          }`}
        >
          <span>Keranjang</span>
          {cartCount > 0 && (
            <span className="bg-white text-amber-700 text-xs px-1.5 py-0.2 rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </Link>

        <Link
          to="/checkout"
          className={`px-2.5 py-1 rounded-lg transition ${
            isLinkActive("/checkout") ? "bg-white/20 font-bold" : "hover:text-amber-100"
          }`}
        >
          Checkout
        </Link>

        <Link
          to="/admin/dashboard"
          className="ml-2 px-3 py-1 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-bold transition active:scale-95 shadow-xs"
        >
          ⚙️ Admin
        </Link>
      </div>
    </nav>
  );
}

