// src/components/BottomNav.jsx
import { LayoutDashboard, UserRoundCheck, BookUser } from "lucide-react";
import { useLocation } from "wouter";

export default function BottomNav() {
  const [location, navigate] = useLocation();

  return (
    <div className="fixed bottom-4 w-full px-16 left-0 right-0 z-50 flex justify-center">
      <div className="bg-zinc-50 rounded-2xl px-4 py-3 flex justify-between text-center items-center shadow-md w-fit">
        <NavItem
          icon={<LayoutDashboard size={24} />}
          active={location === "/" || location.startsWith("/dashboard")}
          onClick={() => navigate("/")}
        />
        <NavItem
          icon={<UserRoundCheck size={24} />}
          active={location.startsWith("/presensi")}
          onClick={() => navigate("/presensi")}
        />
        <NavItem
          icon={<BookUser size={24} />}
          active={location.startsWith("/pengguna")}
          onClick={() => navigate("/pengguna")}
        />
      </div>
    </div>
  );
}

function NavItem({ icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        active ? "text-sky-950" : "text-slate-500"
      }`}
    >
      {icon}
    </button>
  );
}
