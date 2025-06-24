import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeController } from "@/controllers/useThemeController";
import { CalendarDays, Heart, Search, UserCheck, Users } from "lucide-react";
import { Link } from "wouter";

// const data = [
//   {
//     title: "Sweet",
//     img: "/images/theme1.png",
//     users: 1,
//     date: "2/6/2025",
//   },
//   {
//     title: "Elegant",
//     img: "/images/theme2.png",
//     users: 2,
//     date: "2/6/2025",
//   },
//   {
//     title: "Elegant",
//     img: "/images/theme3.png",
//     users: 3,
//     date: "2/6/2025",
//   },
//   {
//     title: "Elegant",
//     img: "/images/theme4.png",
//     users: 4,
//     date: "2/6/2025",
//   },
// ];

function Theme() {
  const { themes, loading, error } = useThemeController();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-4 pt-16 pb-32 md:max-w-7xl mx-auto xl:px-0">
      <div className="flex mb-4 text-2xl font-bold text-slate-900">
        <h1>Tema</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Undangan</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Tema</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex gap-4">
          <div className="flex">
            <Select defaultValue="terbaru">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="terbaru">Terbaru</SelectItem>
                  <SelectItem value="Paling disukai">Disukai</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full gap-2">
            <Input
              type="text"
              id="domain"
              className="text-sm"
              placeholder="cari tema..."
            />

            <Button size="sm">
              <Search />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <Link href={`/undangan/tema/` + theme.id} key={theme.id}>
              <Card key={theme.id} className="overflow-hidden border-none">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="h-32 sm:h-64 w-full object-cover rounded"
                />
                <CardContent>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{theme.name}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Heart className="w-4 h-4" />
                      <h4>4</h4>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="grid sm:flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <UserCheck className="w-4 h-4" />
                    {theme.userChoices} pengguna
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {theme.createdAt}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Theme;
