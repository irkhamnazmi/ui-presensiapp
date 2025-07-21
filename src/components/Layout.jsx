// src/components/Layout.jsx
import { useLocation } from "wouter";
import Navbar from "./Navbar";
import BottomNav from "./BottomNavbar";
import { Helmet } from "react-helmet";

export default function Layout({ children }) {
  const [location] = useLocation();

  const shouldShowNav =
    !location.startsWith("/login") && !location.startsWith("/404");
  const shouldShowBottomNav =
    !location.startsWith("/login") && !location.startsWith("/404");

  return (
    <>
      <Helmet>
        <title>PresensiApp | Aplikasi Kehadiran</title>
        <meta
          name="description"
          content="PresensiApp adalah aplikasi pengelola presensi sederhana."
        />
        <meta property="og:title" content="PresensiApp | Aplikasi Kehadiran" />
        <meta
          property="og:description"
          content="PresensiApp adalah aplikasi pengelola presensi sederhana."
        />
        <meta
          property="og:image"
          content="https://presensiapp.netlify.app/images/presensiapp.png"
        />
        <meta property="og:url" content="https://presensiapp.netlify.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PresensiApp | Aplikasi Kehadiran" />
        <meta
          name="twitter:description"
          content="PresensiApp adalah aplikasi pengelola presensi sederhana."
        />
        <meta
          name="twitter:image"
          content="https://presensiapp.netlify.app/images/presensiapp.png"
        />
      </Helmet>

      <div className="min-h-screen bg-white px-16">
        {/* Navbar */}
        {shouldShowNav && <Navbar />}

        {/* Main */}
        <main className="border-slate-500">{children}</main>

        {/* Bottom Navigation */}
        {shouldShowBottomNav && <BottomNav />}
      </div>
    </>
  );
}
