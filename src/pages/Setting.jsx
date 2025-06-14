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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowRight } from "lucide-react";
import React from "react";

export default function Setting() {
  return (
    <div className="px-4 pt-16 pb-32">
      <div className="flex text-2xl font-bold text-slate-900 mb-4">
        <h1>Setting</h1>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between items-center ">
          <Select defaultValue="undangan">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="undangan">Undangan</SelectItem>
                <SelectItem value="akun">Akun</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="domain" className="text-sm font-medium">
            Domain<span className="text-red-500 ml-0.5">*</span>
          </Label>
          <Input
            type="text"
            id="domain"
            className="text-sm"
            value="skoci.com"
            placeholder="skoci.com"
            required
          />
        </div>
      </div>
    </div>
  );
}
