// Initialize sample data for demonstration
export function initializeSampleData() {
  // Check if we already have data
  const existingData = localStorage.getItem("reports");
  if (existingData && JSON.parse(existingData).length > 0) {
    return; // Don't overwrite existing data
  }

  const sampleReports = [
    {
      id: "RPT1708956234567",
      nama: "Ahmad Fauzi",
      email: "ahmad.fauzi@email.com",
      telepon: "081234567890",
      alamat: "Jl. Gatot Subroto No. 45, Setiabudi, Jakarta Selatan",
      deskripsi: "Lubang besar di tengah jalan dengan diameter sekitar 1 meter dan kedalaman 20cm. Sangat berbahaya terutama saat malam hari.",
      location: { lat: -6.2215, lng: 106.8145, address: "Jl. Gatot Subroto" },
      images: [],
      status: "in_progress",
      tanggal: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "RPT1708956345678",
      nama: "Siti Nurhaliza",
      email: "siti.nur@email.com",
      telepon: "082345678901",
      alamat: "Jl. Sudirman Kav. 52-53, Senayan, Jakarta Pusat",
      deskripsi: "Aspal retak-retak sepanjang 50 meter. Ketika hujan sering tergenang air.",
      location: { lat: -6.2234, lng: 106.8089, address: "Jl. Sudirman" },
      images: [],
      status: "verified",
      tanggal: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "RPT1708956456789",
      nama: "Budi Santoso",
      email: "budi.santoso@email.com",
      telepon: "083456789012",
      alamat: "Jl. M.H. Thamrin No. 1, Menteng, Jakarta Pusat",
      deskripsi: "Jalan berlubang kecil namun banyak, menyebabkan kendaraan harus melambat.",
      location: { lat: -6.1956, lng: 106.8234, address: "Jl. M.H. Thamrin" },
      images: [],
      status: "completed",
      tanggal: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "RPT1708956567890",
      nama: "Rina Wati",
      email: "rina.wati@email.com",
      telepon: "084567890123",
      alamat: "Jl. Rasuna Said Blok X-5, Kuningan, Jakarta Selatan",
      deskripsi: "Permukaan jalan tidak rata dan bergelombang, membahayakan pengendara motor.",
      location: { lat: -6.2234, lng: 106.8412, address: "Jl. Rasuna Said" },
      images: [],
      status: "pending",
      tanggal: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "RPT1708956678901",
      nama: "Dedi Kurniawan",
      email: "dedi.k@email.com",
      telepon: "085678901234",
      alamat: "Jl. Asia Afrika No. 8, Tanah Abang, Jakarta Pusat",
      deskripsi: "Lubang di pinggir jalan dekat trotoar, sering membuat ban kendaraan bocor.",
      location: { lat: -6.1889, lng: 106.8178, address: "Jl. Asia Afrika" },
      images: [],
      status: "pending",
      tanggal: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
  ];

  localStorage.setItem("reports", JSON.stringify(sampleReports));
}
