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
    <div className="min-h-screen bg-white px-16">
      {/* Navbar */}
      {shouldShowNav && <Navbar />}

      {/* Main */}
      <main className="border-slate-500">{children}</main>

      {/* Bottom Navigation */}
      {shouldShowBottomNav && <BottomNav />}
    </div>
  );
}
