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
import { Link } from "wouter";

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

export default function Dashboard() {
  return (
    <div className="px-4 pt-16 pb-32">
      <div className="flex text-2xl font-bold text-slate-900 mb-4">
        <h1>Dashboard</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <h1 className="text-lg font-bold text-slate-900">Tema Terbaru</h1>
          <Link
            href="/undangan/tema"
            className="flex text-sky-500 font-mediumhover:underline items-center"
          >
            Explore <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-center ">
          <h1 className="text-lg font-bold text-slate-900">Overview</h1>
        </div>

        <Card className="w-full max-w-sm">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-800">
              Fulan dan Fulana
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">45,231.89</p>
            <p className="text-sm text-gray-500 mt-1">4 menit yang lalu</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl max-sm">
          <CardHeader>
            <CardTitle className="text-base">Kehadiran</CardTitle>
            <CardDescription>Daftar yang akan hadir</CardDescription>
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
