import {
  LayoutGrid,
  ImageIcon,
  BookOpen,
  SlidersHorizontal,
} from "lucide-react";
import { useLocation } from "wouter";

export default function BottomNav() {
  const [location, navigate] = useLocation();
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md border border-zinc-200 rounded-2xl shadow-md px-4 py-3 flex justify-between items-center bg-white">
      <NavItem
        icon={<LayoutGrid size={24} />}
        active={location === "/" || location.startsWith("/dashboard")}
        onClick={() => {
          navigate("/");
        }}
      />
      <NavItem
        icon={<ImageIcon size={24} />}
        active={location.startsWith("/undangan")}
        onClick={() => {
          navigate("/undangan");
        }}
      />
      <NavItem
        icon={<BookOpen size={24} />}
        active={location.startsWith("/bukutamu")}
        onClick={() => {
          navigate("/bukutamu");
        }}
      />
      <NavItem
        icon={<SlidersHorizontal size={24} />}
        active={location.startsWith("/seting")}
        onClick={() => {
          navigate("/seting");
        }}
      />
    </div>
  );
}
function NavItem({ icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors ${
        active ? "text-black" : "text-muted-foreground"
      }`}
    >
      {icon}
    </button>
  );
}
