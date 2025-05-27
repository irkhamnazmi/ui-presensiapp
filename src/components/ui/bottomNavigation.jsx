import {
  LayoutGrid,
  ImageIcon,
  BookOpen,
  SlidersHorizontal,
} from "lucide-react";

export default function BottomNav() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md border border-zinc-200 rounded-2xl shadow-md px-4 py-3 flex justify-between items-center bg-white">
      <NavItem icon={<LayoutGrid size={24} />} active />
      <NavItem icon={<ImageIcon size={24} />} />
      <NavItem icon={<BookOpen size={24} />} />
      <NavItem icon={<SlidersHorizontal size={24} />} />
    </div>
  );
}

function NavItem({ icon, active }) {
  return (
    <button
      className={`p-2 rounded-lg transition-colors ${
        active ? "text-black" : "text-muted-foreground"
      }`}
    >
      {icon}
    </button>
  );
}
