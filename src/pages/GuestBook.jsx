import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowRight } from "lucide-react";
import React from "react";

const guests = [
  {
    name: "Olivia Martin",
    couple: "Fulan & Fulana",
    amount: 1999.0,
  },
  {
    name: "Jackson Lee",
    couple: "Fulan & Fulana",
    amount: 39.0,
  },
  {
    name: "Isabella Nguyen",
    couple: "Fulan & Fulana",
    amount: 299.0,
  },
  {
    name: "William Kim",
    couple: "Fulan & Fulana",
    amount: 99.0,
  },
  {
    name: "Sofia Davis",
    couple: "Fulan & Fulana",
    amount: 39.0,
  },
];

export default function GuestBook() {
  return (
    <div className="px-4 pt-16 pb-32">
      <div className="flex text-2xl font-bold text-slate-900 mb-4">
        <h1>Buku Tamu</h1>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-center ">
          <h1 className="text-lg font-bold text-slate-900">Daftar Undangan</h1>
        </div>

        <Card className="w-full">
          <CardHeader className="px-4 py-2 gap-0">
            <CardTitle className="text-md">Fulan dan Fulana</CardTitle>
            <CardDescription className="text-sm font-medium">
              7/06/2025
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="rounded-xl max-sm">
          <CardHeader>
            <CardTitle className="text-base">RSV</CardTitle>
            <CardDescription>Tanggapan dari netizen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {guests.map((guest, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      className="rounded-full"
                      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${guest.name}`}
                    />
                    <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{guest.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {guest.couple}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  +$
                  {guest.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
