import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Pelaporan } from "./pages/Pelaporan";
import { LacakLaporan } from "./pages/LacakLaporan";
import { LaporanMasuk } from "./pages/LaporanMasuk";
import { KonfirmasiLaporan } from "./pages/KonfirmasiLaporan";
import { Rating } from "./pages/Rating";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/pelaporan",
    Component: Pelaporan,
  },
  {
    path: "/lacak-laporan",
    Component: LacakLaporan,
  },
  {
    path: "/laporan-masuk",
    Component: LaporanMasuk,
  },
  {
    path: "/konfirmasi/:id",
    Component: KonfirmasiLaporan,
  },
  {
    path: "/rating",
    Component: Rating,
  },
]);