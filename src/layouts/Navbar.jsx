import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bell } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-zinc-100/50 px-4 py-3 shadow-sm overflow-auto backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h2 className="font-bold">Tatawaktu ID</h2>

        {/* Right: Notification & Avatar */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button
            className="text-gray-600 hover:text-black focus:outline-none"
            aria-label="Notifications">
            <Bell />
          </button>

          {/* Avatar */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Anomale</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
