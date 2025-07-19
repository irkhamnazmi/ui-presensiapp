import StudentDialog from "@/components/StudentDialog";
import AddStudentDialog from "@/components/StudentDialog";
import StudentIdCardDialog from "@/components/StudentIdCardDialog";
import TeacherDialog from "@/components/TeacherDialog";
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
  Edit,
  Plus,
  QrCode,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Users() {
  const [data, setData] = useState([]); // data siswa
  const [dataTeacher, setDataTeacher] = useState([]); // data guru
  const [searchStudent, setSearchStudent] = useState("");
  const [searchTeacher, setSearchTeacher] = useState("");

  const [searchQueryStudent, setSearchQueryStudent] = useState("");
  const [searchQueryTeacher, setSearchQueryTeacher] = useState("");

  useEffect(() => {
    fetchStudents();
    fetchTeachers();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("/api/students");
      setData(res.data);
    } catch (err) {
      console.error("Gagal fetch siswa:", err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("/api/teachers");
      setDataTeacher(res.data);
    } catch (err) {
      console.error("Gagal fetch guru:", err);
    }
  };

  const searchStudentOnClick = () => {
    setSearchQueryStudent(searchStudent);
  };

  const searchTeacherOnClick = () => {
    setSearchQueryTeacher(searchTeacher);
  };
  const filteredStudent =
    searchQueryStudent !== ""
      ? data.filter((item) =>
          item.name.toLowerCase().includes(searchQueryStudent.toLowerCase())
        )
      : data;

  const filteredTeacher =
    searchQueryTeacher !== ""
      ? dataTeacher.filter((item) =>
          item.name.toLowerCase().includes(searchQueryTeacher.toLowerCase())
        )
      : dataTeacher;

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

  return (
    <section className="pt-16 pb-32">
      <div className="text-2xl font-bold text-slate-900 mb-4 mt-8">
        <h1>Pengguna</h1>
      </div>
      {/* Students List*/}
      <div className="mt-8">
        <div className="text-lg font-bold text-slate-900 mb-4">
          <h1>Daftar Siswa</h1>
        </div>
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            placeholder="cari siswa..."
            className="flex-1 rounded-lg bg-white text-sky-950 placeholder:text-neutral-400 focus:border-sky-950"
          />
          <Button
            className=" bg-sky-950 hover:bg-sky-950/90 text-white rounded-lg p-2"
            onClick={searchStudentOnClick}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            className="bg-sky-950 hover:bg-sky-950/90 text-[#ffffff] rounded-lg p-2"
            onClick={() => {
              setStudentDialog({
                mode: "add",
                open: true,
                data: [],
              });
            }}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="w-full">
          <div className="rounded-md border">
            <Table className="min-w-full overflow-x-auto">
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
                      Kelas
                      <ArrowUpDown className="h-3 w-3 text-gray-500" />
                    </div>
                  </TableHead>
                  <TableHead className="border-r border-gray-300">
                    <div className="flex items-center gap-2">#</div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudent.length > 0 ? (
                  filteredStudent.map((item, id) => (
                    <TableRow key={id}>
                      <TableCell className="sticky left-0 border-r border-gray-300">
                        {item.name}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {item.class}
                      </TableCell>
                      <TableCell className="border-r border-gray-300 flex gap-2">
                        <a
                          onClick={() => {
                            setStudentDialog({
                              mode: "edit",
                              open: true,
                              data: item,
                            });
                          }}
                        >
                          <Edit className="text-sky-950" />
                        </a>
                        <a
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setOpenIdDialog({
                              open: true,
                              data: item,
                            });
                          }}
                          className="cursor-pointer"
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
          <div className="flex justify-end space-x-2 py-4">
            <div className="foreground flex-1 text-sm">
              Menampilkan {filteredStudent.length} dari {data.length} siswa
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
      </div>
      {/* Teachers List*/}
      <div className="mt-8">
        <div className="text-lg font-bold text-slate-900 mb-4">
          <h1>Daftar Guru</h1>
        </div>
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={searchTeacher}
            onChange={(e) => setSearchTeacher(e.target.value)}
            placeholder="cari guru..."
            className="flex-1 rounded-lg bg-white text-sky-950 placeholder:text-neutral-400 focus:border-sky-950"
          />
          <Button
            className=" bg-sky-950 hover:bg-sky-950/90 text-white rounded-lg p-2"
            onClick={searchTeacherOnClick}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            className="bg-sky-950 hover:bg-sky-950/90 text-white rounded-lg p-2"
            onClick={() => {
              setTeacherDialog({
                mode: "add",
                open: true,
                data: [],
              });
            }}
          >
            <Plus className="h-5 w-5" />
          </Button>
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
                      Role
                      <ArrowUpDown className="h-3 w-3 text-gray-500" />
                    </div>
                  </TableHead>
                  <TableHead className="border-r border-gray-300">#</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeacher.length > 0 ? (
                  filteredTeacher.map((item, id) => (
                    <TableRow key={id}>
                      <TableCell className="sticky left-0 border-r border-gray-300">
                        {item.name}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        {item.role}
                      </TableCell>
                      <TableCell className="border-r border-gray-300">
                        <a
                          onClick={() => {
                            setTeacherDialog({
                              mode: "edit",
                              open: true,
                              data: item,
                            });
                          }}
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
          <div className="flex justify-end space-x-2 py-4">
            <div className="foreground flex-1 text-sm">
              Menampilkan {filteredTeacher.length} dari {dataTeacher.length}{" "}
              guru
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
      </div>
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
