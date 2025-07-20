"use client";
import StudentDialog from "@/components/StudentDialog";
import StudentIdCardDialog from "@/components/StudentIdCardDialog";
import TeacherDialog from "@/components/TeacherDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Edit,
  Plus,
  QrCode,
  Search,
} from "lucide-react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Users() {
  const [data, setData] = useState([]); // siswa
  const [dataTeacher, setDataTeacher] = useState([]); // guru
  const [searchStudent, setSearchStudent] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");
  const [searchQueryStudent, setSearchQueryStudent] = useState("");
  const [searchQueryTeacher, setSearchQueryTeacher] = useState("");

  const [sortStudentField, setSortStudentField] = useState("name");
  const [sortStudentAsc, setSortStudentAsc] = useState(true);

  const [sortTeacherField, setSortTeacherField] = useState("name");
  const [sortTeacherAsc, setSortTeacherAsc] = useState(true);

  const itemsPerPage = 5;
  const [studentPage, setStudentPage] = useState(1);
  const [teacherPage, setTeacherPage] = useState(1);

  const [openStudentDialog, setStudentDialog] = useState({
    mode: "add",
    open: false,
    data: [],
  });
  const [openTeacherDialog, setTeacherDialog] = useState({
    mode: "add",
    open: false,
    data: [],
  });
  const [openIdDialog, setOpenIdDialog] = useState({
    open: false,
    data: [],
  });

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/students`
      );
      setData(res.data);
    } catch (err) {
      console.error("Gagal fetch siswa:", err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/teachers`
      );
      setDataTeacher(res.data);
    } catch (err) {
      console.error("Gagal fetch guru:", err);
    }
  };

  const handleSortStudent = (field) => {
    if (sortStudentField === field) {
      setSortStudentAsc(!sortStudentAsc);
    } else {
      setSortStudentField(field);
      setSortStudentAsc(true);
    }
  };

  const handleSortTeacher = (field) => {
    if (sortTeacherField === field) {
      setSortTeacherAsc(!sortTeacherAsc);
    } else {
      setSortTeacherField(field);
      setSortTeacherAsc(true);
    }
  };

  const sortData = (data, field, asc) => {
    return [...data].sort((a, b) => {
      if (a[field] < b[field]) return asc ? -1 : 1;
      if (a[field] > b[field]) return asc ? 1 : -1;
      return 0;
    });
  };

  const filterDataByQuery = (query, data) => {
    if (!query) return data;
    return data.filter((item) =>
      Object.values(item).some(
        (val) =>
          val &&
          (typeof val === "string" || typeof val === "number") &&
          val.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const searchStudentOnClick = () => {
    setSearchQueryStudent(searchStudent);
  };

  const searchTeacherOnClick = () => {
    setSearchQueryTeacher(searchTeacher);
  };

  useEffect(() => {
    setStudentPage(1);
  }, [searchQueryStudent, sortStudentField, sortStudentAsc]);

  useEffect(() => {
    setTeacherPage(1);
  }, [searchQueryTeacher, sortTeacherField, sortTeacherAsc]);

  const filteredStudent = filterDataByQuery(searchQueryStudent, data);
  const filteredTeacher = filterDataByQuery(searchQueryTeacher, dataTeacher);

  const sortedStudent = sortData(
    filteredStudent,
    sortStudentField,
    sortStudentAsc
  );
  const sortedTeacher = sortData(
    filteredTeacher,
    sortTeacherField,
    sortTeacherAsc
  );

  const totalStudentPages = Math.ceil(sortedStudent.length / itemsPerPage);
  const totalTeacherPages = Math.ceil(sortedTeacher.length / itemsPerPage);

  const paginatedStudent = sortedStudent.slice(
    (studentPage - 1) * itemsPerPage,
    studentPage * itemsPerPage
  );

  const paginatedTeacher = sortedTeacher.slice(
    (teacherPage - 1) * itemsPerPage,
    teacherPage * itemsPerPage
  );

  return (
    <section className="pt-16 pb-32">
      <div className="text-2xl font-bold text-slate-900 mb-4 mt-8">
        <h1>Pengguna</h1>
      </div>

      {/* ======= Daftar Siswa ======= */}
      <div className="mt-8 w-full">
        <div className="text-lg font-bold text-slate-900 mb-4">
          Daftar Siswa
        </div>
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            placeholder="cari siswa..."
            className="flex-1"
          />
          <Button onClick={searchStudentOnClick}>
            <Search className="h-5 w-5" />
          </Button>
          <Button
            onClick={() =>
              setStudentDialog({ mode: "add", open: true, data: [] })
            }
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="rounded-md border">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b">
                <TableHead
                  className="sticky left-0 border-r cursor-pointer"
                  onClick={() => handleSortStudent("name")}
                >
                  <div className="flex items-center gap-2">
                    Nama <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="border-r cursor-pointer"
                  onClick={() => handleSortStudent("class")}
                >
                  <div className="flex items-center gap-2">
                    Kelas <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="border-r">#</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudent.length > 0 ? (
                paginatedStudent.map((item, id) => (
                  <TableRow key={id}>
                    <TableCell className="sticky left-0 border-r">
                      {item.name}
                    </TableCell>
                    <TableCell className="border-r">{item.class}</TableCell>
                    <TableCell className="border-r flex gap-2">
                      <a
                        onClick={() =>
                          setStudentDialog({
                            mode: "edit",
                            open: true,
                            data: item,
                          })
                        }
                      >
                        <Edit className="text-sky-950" />
                      </a>
                      <a
                        onClick={() =>
                          setOpenIdDialog({ open: true, data: item })
                        }
                      >
                        <QrCode className="text-sky-950" />
                      </a>
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

        {/* PAGINATION Siswa */}
        <div className="flex justify-between items-center gap-2 py-4">
          <div className="flex-1 text-sm">
            Menampilkan {paginatedStudent.length} dari {sortedStudent.length}{" "}
            siswa
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStudentPage((prev) => Math.max(prev - 1, 1))}
            disabled={studentPage === 1}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {studentPage} / {totalStudentPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setStudentPage((prev) => Math.min(prev + 1, totalStudentPages))
            }
            disabled={studentPage === totalStudentPages}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ======= Daftar Guru ======= */}
      <div className="mt-12 w-full">
        <div className="text-lg font-bold text-slate-900 mb-4">Daftar Guru</div>
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={searchTeacher}
            onChange={(e) => setSearchTeacher(e.target.value)}
            placeholder="cari guru..."
            className="flex-1"
          />
          <Button onClick={searchTeacherOnClick}>
            <Search className="h-5 w-5" />
          </Button>
          <Button
            onClick={() =>
              setTeacherDialog({ mode: "add", open: true, data: [] })
            }
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="rounded-md border">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b">
                <TableHead
                  className="sticky left-0 border-r cursor-pointer"
                  onClick={() => handleSortTeacher("name")}
                >
                  <div className="flex items-center gap-2">
                    Nama <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="border-r cursor-pointer"
                  onClick={() => handleSortTeacher("role")}
                >
                  <div className="flex items-center gap-2">
                    Role <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="border-r">#</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTeacher.length > 0 ? (
                paginatedTeacher.map((item, id) => (
                  <TableRow key={id}>
                    <TableCell className="sticky left-0 border-r">
                      {item.name}
                    </TableCell>
                    <TableCell className="border-r">{item.role}</TableCell>
                    <TableCell className="border-r">
                      <a
                        onClick={() =>
                          setTeacherDialog({
                            mode: "edit",
                            open: true,
                            data: item,
                          })
                        }
                      >
                        <Edit className="text-sky-950" />
                      </a>
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

        {/* PAGINATION Guru */}
        <div className="flex justify-between items-center gap-2 py-4">
          <div className="flex-1 text-sm">
            Menampilkan {paginatedTeacher.length} dari {sortedTeacher.length}{" "}
            guru
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTeacherPage((prev) => Math.max(prev - 1, 1))}
            disabled={teacherPage === 1}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            {teacherPage} / {totalTeacherPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setTeacherPage((prev) => Math.min(prev + 1, totalTeacherPages))
            }
            disabled={teacherPage === totalTeacherPages}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* DIALOG */}
      <StudentDialog
        open={openStudentDialog.open}
        mode={openStudentDialog.mode}
        onOpenChange={(value) =>
          setStudentDialog((prev) => ({ ...prev, open: value }))
        }
        onSuccess={fetchStudents}
        student={openStudentDialog.data}
      />
      <TeacherDialog
        open={openTeacherDialog.open}
        mode={openTeacherDialog.mode}
        onOpenChange={(value) =>
          setTeacherDialog((prev) => ({ ...prev, open: value }))
        }
        onSuccess={fetchTeachers}
        teacher={openTeacherDialog.data}
      />
      <StudentIdCardDialog
        open={openIdDialog.open}
        onOpenChange={(value) =>
          setOpenIdDialog((prev) => ({ ...prev, open: value }))
        }
        student={openIdDialog.data}
      />
    </section>
  );
}
