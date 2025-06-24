import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Link } from "wouter";

const index = () => {
  return (
    <section className="px-4 pt-16 pb-32 xl:max-w-7xl mx-auto xl:px-0">
      <div className="mb-4 text-2xl font-bold text-slate-900">
        <h1>Pilih Plan</h1>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/undangan">Undangan</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Plan</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {dataPlan.map((item, index) => (
            <Card key={index} className="w-full">
              <CardContent className="pt-3 flex flex-col gap-3">
                <CardHeader className="p-2 gap-0">
                  <CardTitle className="text-2xl font-semibold">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium leading-6">
                    {item.desc} <br />
                    <span className="text-2xl text-black font-semibold">
                      {item.price}
                    </span>
                    <p className="text-black">Features :</p>
                    {item.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </CardDescription>
                </CardHeader>
                <Link href="/plan/checkout">
                  <Button className="w-full">Pilih Plan</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default index;

const dataPlan = [
  {
    name: "🎁 Paket Personal",
    desc: "Ini untukmu dari kami!",
    price: "Rp. 100.000",
    features: [
      "Galeri maks. 5 foto",
      "Desain ekslusif tema undangan",
      "Link undangan pribadi (Contoh: yourname.wedding.id)",
    ],
  },
  {
    name: "💎 Paket Plus",
    desc: "Ketika kamu ingin lebih banyak hal!",
    price: "Rp. 100.000",
    features: [
      "Galeri maks. 5 foto",
      "Desain ekslusif tema undangan",
      "Link undangan pribadi (Contoh: yourname.wedding.id)",
    ],
  },
];
