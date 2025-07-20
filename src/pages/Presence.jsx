"use client";
import ScanQrDialog from "@/components/ScanQRDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  ScanBarcode,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

export default function Presence() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQueryPresence, setSearchQueryPresence] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchPresence();
  }, []);

  const fetchPresence = async () => {
    try {
      const res = await axios.get("/api/presences");
      setData(res.data);
    } catch (err) {
      console.error("Gagal mengambil data presensi", err);
    }
  };

  const searchPresenceOnClick = () => {
    setSearchQueryPresence(searchTerm.toLowerCase());
    setCurrentPage(1);
  };

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

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Filtering (semua field dicari)
  const filteredData = data.filter((item) => {
    if (!searchQueryPresence) return true;
    const name = item.student.name?.toLowerCase() || "";
    const day = dayjs(item.created_at).format("dddd").toLowerCase();
    const date = dayjs(item.created_at).format("DD MMMM YYYY").toLowerCase();
    const time = item.time?.toLowerCase() || "";
    const status = item.status?.toLowerCase() || "";

    return (
      name.includes(searchQueryPresence) ||
      day.includes(searchQueryPresence) ||
      date.includes(searchQueryPresence) ||
      time.includes(searchQueryPresence) ||
      status.includes(searchQueryPresence)
    );
  });

  // Sorting
  filteredData.sort((a, b) => {
    let valA, valB;

    switch (sortField) {
      case "name":
        valA = a.student.name.toLowerCase();
        valB = b.student.name.toLowerCase();
        break;
      case "time":
        valA = a.time;
        valB = b.time;
        break;
      case "day":
        valA = dayjs(a.created_at).format("dddd");
        valB = dayjs(b.created_at).format("dddd");
        break;
      case "date":
        valA = dayjs(a.created_at).format("YYYY-MM-DD");
        valB = dayjs(b.created_at).format("YYYY-MM-DD");
        break;
      default:
        return 0;
    }

    return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className="pt-16 pb-32">
      <div className="text-2xl font-bold text-slate-900 mb-4 mt-8">
        <h1>Presensi Siswa</h1>
      </div>

      {/* Search & QR */}
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari siswa, hari, tanggal, jam, atau status..."
          className="flex-1 rounded-lg bg-white text-sky-950 placeholder:text-neutral-400 focus:border-sky-950"
        />
        <Button
          className="bg-sky-950 hover:bg-sky-950/90 text-white rounded-lg p-2"
          onClick={searchPresenceOnClick}
        >
          <Search className="h-5 w-5" />
        </Button>
        <ScanQrDialog
          trigger={
            <Button className="bg-sky-950 hover:bg-sky-950/90 text-white rounded-lg p-2">
              <ScanBarcode className="h-5 w-5" />
            </Button>
          }
          onScanned={(result) => {
            console.log("✅ Hasil scan:", result);
            handleSave(result.split(":")[1]);
          }}
        />
      </div>

      {/* Table */}
      <div className="w-full">
        <div className="rounded-md border overflow-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b border-gray-300">
                <TableHead
                  className="sticky left-0 bg-white z-10 border-r border-gray-300 cursor-pointer"
                  onClick={() => toggleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    Nama
                    <ArrowUpDown
                      className={`h-4 w-4 ${
                        sortField === "name" ? "text-black" : "text-gray-500"
                      }`}
                    />
                  </div>
                </TableHead>
                <TableHead
                  className="border-r border-gray-300 cursor-pointer"
                  onClick={() => toggleSort("day")}
                >
                  <div className="flex items-center gap-2">
                    Hari
                    <ArrowUpDown
                      className={`h-4 w-4 ${
                        sortField === "day" ? "text-black" : "text-gray-500"
                      }`}
                    />
                  </div>
                </TableHead>
                <TableHead
                  className="border-r border-gray-300 cursor-pointer"
                  onClick={() => toggleSort("date")}
                >
                  <div className="flex items-center gap-2">
                    Tanggal
                    <ArrowUpDown
                      className={`h-4 w-4 ${
                        sortField === "date" ? "text-black" : "text-gray-500"
                      }`}
                    />
                  </div>
                </TableHead>
                <TableHead
                  className="border-r border-gray-300 cursor-pointer"
                  onClick={() => toggleSort("time")}
                >
                  <div className="flex items-center gap-2">
                    Jam
                    <ArrowUpDown
                      className={`h-4 w-4 ${
                        sortField === "time" ? "text-black" : "text-gray-500"
                      }`}
                    />
                  </div>
                </TableHead>
                <TableHead className="border-r border-gray-300">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="sticky left-0 bg-white z-0 border-r border-gray-300">
                      {item.student.name}
                    </TableCell>
                    <TableCell className="border-r border-gray-300">
                      {dayjs(item.created_at).format("dddd")}
                    </TableCell>
                    <TableCell className="border-r border-gray-300">
                      {dayjs(item.created_at).format("DD MMMM YYYY")}
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
                  <TableCell colSpan={5} className="text-center">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center py-4">
          <div className="text-sm">
            Menampilkan {paginatedData.length} dari {filteredData.length} siswa
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
