// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { navigate } from "wouter/use-browser-location";

export default function Navbar() {
  const [userName, setUserName] = useState("Pengguna");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || "Pengguna");
      } catch (error) {
        console.error("Gagal parsing data user:", error);
      }
    }
  }, []);

  return (
    <nav className="fixed w-full left-0 bg-zinc-50 z-50 shadow-sm px-16">
      <div className="py-3 flex items-center justify-between">
        {/* Logo */}
        <a
          onClick={() => {
            navigate("/");
          }}
          className="cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                src="/images/presensiapp.png"
                alt="Logo"
              />
            </Avatar>
            <span className="font-bold text-xl text-sky-950">Presensi App</span>
          </div>
        </a>

        {/* Avatar + Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userName
                )}&background=random&color=fffff`}
                alt="User"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
