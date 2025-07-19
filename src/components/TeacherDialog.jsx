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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function TeacherDialog({
  open,
  onOpenChange,
  mode = "add", // "add" | "edit"
  teacher = {}, // data guru saat edit
  onSuccess, // callback refresh tabel
}) {
  const [form, setForm] = useState({ name: "", role: "" });
  const isEdit = mode === "edit";

  // Prefill saat edit
  useEffect(() => {
    if (open && isEdit && teacher) {
      setForm({ name: teacher.name || "", role: teacher.role || "" });
    } else if (open && !isEdit) {
      setForm({ name: "", role: "" });
    }
  }, [open, isEdit, teacher]);

  /* -------- aksi ------------- */
  const handleSave = async () => {
    try {
      if (isEdit) {
        await axios.put(`/api/teachers/${teacher.id}`, form);
      } else {
        await axios.post("/api/teachers", form);
      }
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error("❌ Gagal simpan guru:", err);
    }
  };

  const handleDelete = async () => {
    if (!isEdit) return;
    if (!confirm(`Hapus guru ${teacher.name}?`)) return;
    try {
      await axios.delete(`/api/teachers/${teacher.id}`);
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error("❌ Gagal hapus guru:", err);
    }
  };

  /* -------- UI ------------- */
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Guru" : "Tambah Guru"}</DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nama</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="isi nama guru..."
            />
          </div>
          <div className="grid gap-2">
            <Label>Role</Label>
            <Select
              value={form.role} // atau ganti jadi form.role kalau prop-nya memang "role"
              onValueChange={(value) => setForm({ ...form, role: value })} // ganti class → role jika perlu
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih role..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Member">Member</SelectItem>
              </SelectContent>
            </Select>
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
