import React, { createContext, useContext } from "react";

// 1. Inisialisasi React Context utama aplikasi
export const AppContext = createContext();

// 2. Custom Hook untuk mempermudah pemanggilan useContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext harus digunakan di dalam AppContext.Provider");
  }
  return context;
};

