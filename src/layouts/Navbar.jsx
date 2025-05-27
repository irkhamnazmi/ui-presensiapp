import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bell } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 justify-between items-center bg-gray-100 px-4 py-3 shadow-sm overflow-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h2 className="font-bold">SkoCi</h2>

        {/* Right: Notification & Avatar */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button
            className="text-gray-600 hover:text-black focus:outline-none"
            aria-label="Notifications"
          >
            <Bell />
          </button>

          {/* Avatar */}
          <Avatar>
            <AvatarImage
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
              src="https://github.com/shadcn.png"
              alt="@shadcn"
            />
          </Avatar>
        </div>
      </div>
    </nav>
  );
}
