export const initialKandangData = [
  {
    id: "KND-001",
    namaKandang: "Kandang Berkah Jaya Farm",
    namaPeternak: "Sandhi Ardhitya",
    kontak: "0812-3456-7890",
    alamatKandang: "Bj. Dauh Munduk, Desa Bungkulan",
    kotaKabupaten: "Singaraja",
    kapasitasSisa: 4500,
    beratRataRata: 1.4,
    umurHari: 28,
    hargaPerKg: 21500,
    statusPanen: "Siap Panen"
  },
  {
    id: "KND-002",
    namaKandang: "Kandang Makmur Subur",
    namaPeternak: "Saipul Rahman",
    kontak: "0813-9876-5432",
    alamatKandang: "Kp. Pasir Muncang RT 03",
    kotaKabupaten: "Sukabumi",
    kapasitasSisa: 6200,
    beratRataRata: 1.8,
    umurHari: 32,
    hargaPerKg: 20800,
    statusPanen: "Siap Panen"
  },
  {
    id: "KND-003",
    namaKandang: "Kandang Subang Mega Unggas",
    namaPeternak: "Rahmat Mulyana",
    kontak: "0821-2233-4455",
    alamatKandang: "Jl. Lapang Kalijati KM 12",
    kotaKabupaten: "Subang",
    kapasitasSisa: 8500,
    beratRataRata: 2.2,
    umurHari: 36,
    hargaPerKg: 19800,
    statusPanen: "3 Hari Lagi"
  },
  {
    id: "KND-004",
    namaKandang: "Kandang Putra Mandiri",
    namaPeternak: "Eko Prasetyo",
    kontak: "0856-7788-9900",
    alamatKandang: "Jl. Trisula No. 102",
    kotaKabupaten: "Blitar",
    kapasitasSisa: 3800,
    beratRataRata: 1.3,
    umurHari: 26,
    hargaPerKg: 22000,
    statusPanen: "Siap Panen"
  },
  {
    id: "KND-005",
    namaKandang: "Kandang Boyolali Sejahtera",
    namaPeternak: "Sutrisno Wibowo",
    kontak: "0878-1122-3344",
    alamatKandang: "Desa Pengging RT 02",
    kotaKabupaten: "Boyolali",
    kapasitasSisa: 5400,
    beratRataRata: 1.9,
    umurHari: 33,
    hargaPerKg: 20500,
    statusPanen: "Siap Panen"
  },
  {
    id: "KND-006",
    namaKandang: "Kandang Priangan Unggas",
    namaPeternak: "Asep Sunandar",
    kontak: "0822-6655-4433",
    alamatKandang: "Jl. Sindangkasih KM 4",
    kotaKabupaten: "Ciamis",
    kapasitasSisa: 7100,
    beratRataRata: 2.4,
    umurHari: 38,
    hargaPerKg: 19500,
    statusPanen: "3 Hari Lagi"
  }
];

export const initialOrdersData = [
  {
    id: "PO-101",
    namaPembeli: "CV Resto Sambal",
    namaKandang: "Kandang Berkah Jaya Farm",
    kandangId: "KND-001",
    jumlahEkor: 500,
    beratRataRata: 1.4,
    totalBobotKg: 700,
    totalBiaya: 15050000,
    alamatKandang: "Jl. Raya Ciawi No. 45, Bogor",
    status: "Disetujui"
  },
  {
    id: "PO-102",
    namaPembeli: "PT Boga Rasa",
    namaKandang: "Kandang Makmur Subur",
    kandangId: "KND-002",
    jumlahEkor: 1200,
    beratRataRata: 1.8,
    totalBobotKg: 2160,
    totalBiaya: 44928000,
    alamatKandang: "Kp. Pasir Muncang RT 03, Sukabumi",
    status: "Pending"
  }
];
