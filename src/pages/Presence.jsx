import ScanQrDialog from "@/components/ScanQRDialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  ListFilter,
  ScanBarcode,
  Search,
  Trash,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Presence() {
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQueryPresence, setSearchQueryPresence] = useState("");

  // Fetch data on load
  useEffect(() => {
    fetchPresence();
  }, []);

  const fetchPresence = async () => {
    try {
      const res = await axios.get("/api/presences");
      setData(res.data); // asumsikan res.data adalah array
    } catch (err) {
      console.error("Gagal mengambil data presensi", err);
    }
  };

  const searchPresenceOnClick = () => {
    setSearchQueryPresence(searchTerm);
  };

  const filteredData =
    searchQueryPresence !== ""
      ? data.filter((item) =>
          item.name.toLowerCase().includes(searchQueryPresence.toLowerCase())
        )
      : data;

  const handleSave = async (id) => {
    try {
      await axios.post("/api/presences", {
        student_id: id,
      });
      fetchPresence();
    } catch (err) {
      console.error("❌ Gagal simpan siswa:", err);
    }
  };
  return (
    <section className="pt-16 pb-32">
      <div className="text-2xl font-bold text-slate-900 mb-4 mt-8">
        <h1>Presensi Siswa</h1>
      </div>

      {/* Presences List*/}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="cari siswa..."
          className="flex-1 rounded-lg bg-white text-sky-950 placeholder:text-neutral-400 focus:border-sky-950"
        />
        <Button
          className=" bg-sky-950 hover:bg-sky-950/90 text-white rounded-lg p-2"
          onClick={searchPresenceOnClick}
        >
          <Search className="h-5 w-5" />
        </Button>
        <ScanQrDialog
          trigger={
            <Button className="bg-sky-950 hover:bg-sky-950/90 text-[#ffffff] rounded-lg p-2">
              <ScanBarcode className="h-5 w-5" />
            </Button>
          }
          onScanned={(result) => {
            console.log("✅ Hasil scan:", result);
            handleSave(result.split(":")[1]);

            // Kirim ke API jika perlu
          }}
        />
      </div>

      <div className="w-full">
        <div className="rounded-md border">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b border-gray-300">
                <TableHead className="sticky left-0 border-r border-gray-300">
                  <div className="flex items-center gap-2">
                    Nama
                    <ArrowUpDown className="h-3 w-3 text-gray-500" />
                  </div>
                </TableHead>
                <TableHead className="border-r border-gray-300">
                  <div className="flex items-center gap-2">
                    Jam
                    <ArrowUpDown className="h-3 w-3 text-gray-500" />
                  </div>
                </TableHead>
                <TableHead className="border-r border-gray-300">
                  <div className="flex items-center gap-2">
                    Status
                    <ArrowUpDown className="h-3 w-3 text-gray-500" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, id) => (
                  <TableRow key={id}>
                    <TableCell className="sticky left-0 border-r border-gray-300">
                      {item.student.name}
                    </TableCell>
                    <TableCell className="border-r border-gray-300">
                      {item.time}
                    </TableCell>
                    <TableCell className="border-r border-gray-300">
                      <Badge
                        className={`${
                          item.status === "Tepat"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end space-x-2 py-4">
          <div className="foreground flex-1 text-sm">
            Menampilkan {filteredData.length} dari {data.length} siswa
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-3 w-3 text-gray-500" />
            </Button>
            <Button variant="outline" size="sm">
              <ArrowRight className="h-3 w-3 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
