import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function StudentDialog({
  open,
  onOpenChange,
  mode = "add", // "add" | "edit"
  student = {}, // data siswa saat edit
  onSuccess, // callback refresh tabel
}) {
  const [form, setForm] = useState({ name: "", class: "" });
  const isEdit = mode === "edit";

  // Prefill saat edit
  useEffect(() => {
    if (isEdit && student) {
      setForm({ name: student.name || "", class: student.class || "" });
    } else {
      setForm({ name: "", class: "" });
    }
  }, [open, isEdit, student]);

  /* -------- aksi ------------- */
  const handleSave = async () => {
    try {
      if (isEdit) {
        await axios.put(`/api/students/${student.id}`, form);
      } else {
        await axios.post("/api/students", form);
      }
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error("❌ Gagal simpan siswa:", err);
    }
  };

  const handleDelete = async () => {
    if (!isEdit) return;
    if (!confirm(`Hapus siswa ${student.name}?`)) return;
    try {
      await axios.delete(`/api/students/${student.id}`);
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error("❌ Gagal hapus siswa:", err);
    }
  };

  /* -------- UI ------------- */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Siswa" : "Tambah Siswa"}</DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nama</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="isi nama siswa..."
            />
          </div>
          <div className="grid gap-2">
            <Label>Kelas</Label>
            <Input
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
              placeholder="isi kelas..."
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          {isEdit && (
            <Button variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          )}
          <Button onClick={handleSave}>{isEdit ? "Perbarui" : "Simpan"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
