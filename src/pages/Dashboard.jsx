import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

export default function Dashboard() {
  const [presences, setPresences] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const isToday = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const fetchData = async () => {
    try {
      const [resPresences, resStudents] = await Promise.all([
        axios.get("/api/presences"),
        axios.get("/api/students"),
      ]);
      const allPresences = resPresences.data || [];
      const todayPresences = allPresences.filter((p) => isToday(p.created_at));

      setPresences(todayPresences);
      setStudents(resStudents.data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const studentCount = students.length;
  const presentToday = presences.length;

  return (
    <section className="pt-16 pb-32">
      <div className="text-2xl font-bold text-slate-900 mb-4 mt-8">
        <h1>Dashboard</h1>
      </div>

      {/* Student Count Card */}
      <div className="w-full mb-6">
        <div className="rounded-2xl p-6 shadow-sm border border-zinc-200">
          <h2 className="text-lg font-medium text-[#0f172a] mb-2">
            Jumlah Siswa Presensi
          </h2>
          <div className="flex items-baseline gap-1 mb-1">
            <span className="text-4xl font-bold text-[#0f172a]">
              {presentToday}
            </span>
            <span className="text-2xl text-[#64748b]">/{studentCount}</span>
          </div>
          <p className="text-[#71717a] text-sm">Hari ini</p>
        </div>
      </div>

      {/* Today's Attendance Card */}
      <div className="w-full">
        <div className="bg-[#ffffff] rounded-2xl p-6 shadow-sm border border-[#e4e4e7]">
          <h2 className="text-lg font-medium text-[#0f172a] mb-2">
            Kehadiran hari ini
          </h2>
          <p className="text-[#71717a] text-sm mb-6">
            Daftar yang sudah hadir hari ini
          </p>

          {/* Student List */}
          <div className="space-y-4">
            {presences.length > 0 ? (
              presences.map((item, id) => (
                <div key={id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10">
                      <Avatar>
                        <AvatarImage
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            item.student.name
                          )}&background=random&color=ffffff`}
                          alt={item.student.name}
                        />
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-medium text-[#0f172a]">
                        {item.student.name}
                      </p>
                      <p className="text-sm text-[#71717a]">
                        Kelas {item.student.class}
                      </p>
                    </div>
                  </div>
                  <div className="grid justify-items-end">
                    <span className="text-base font-medium">{item.time}</span>
                    <span
                      className={`${
                        item.status === "Tepat" ? "bg-green-600" : "bg-red-500"
                      }  text-white px-3 py-1 rounded-full text-xs font-medium`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Belum ada presensi hari ini.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
