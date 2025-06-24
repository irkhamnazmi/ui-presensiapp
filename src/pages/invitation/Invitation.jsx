import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Link } from "wouter";

export default function Invitation() {
  const [active, setActive] = useState("Semua");
  const tabs = ["Semua", "Baru", "Paling Sering"];
  const images = [
    "public/images/theme1.png",
    "public/images/theme2.png",
    "public/images/theme3.png",
    "public/images/theme4.png",
  ];

  return (
    <section className="px-4 pt-16 pb-32 xl:max-w-7xl xl:px-0 mx-auto">
      <div className="flex mb-4 text-2xl font-bold text-slate-900">
        <h1>Undangan</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <h1 className="text-lg font-bold text-slate-900">Tema</h1>
        </div>

        <div className="flex gap-2">
          {tabs.map((tab) => (
            <Button
              className=""
              key={tab}
              variant={active === tab ? "default" : "outline"}
              onClick={() => setActive(tab)}>
              {tab}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <Card
              key={index}
              className="overflow-hidden rounded-xl md:max-w-sm">
              <CardContent className="p-0">
                <img
                  src={img}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-auto object-cover rounded-xl"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex justify-between items-center ">
            <h1 className="text-lg font-bold text-slate-900">
              Daftar Undangan
            </h1>
          </div>

          <Card className="w-full">
            <CardHeader className="px-4 py-2 gap-0">
              <CardTitle className="text-md">Fulan dan Fulana</CardTitle>
              <CardDescription className="text-sm font-medium">
                7/06/2025
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
