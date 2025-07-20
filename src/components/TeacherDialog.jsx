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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";

export default function TeacherDialog({
  open,
  onOpenChange,
  mode = "add",
  teacher = {},
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const isEdit = mode === "edit";
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(
        isEdit
          ? {
              name: teacher.name || "",
              email: teacher.email || "",
              password: teacher.password || "",
              role: teacher.role || "",
            }
          : { name: "", email: "", password: "", role: "" }
      );
      setShowPassword(false); // reset saat dialog dibuka
    }
  }, [open, isEdit, teacher]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const req = isEdit
        ? axios.put(`/api/teachers/${teacher.id}`, form)
        : axios.post("/api/teachers", form);
      await req;
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error("❌ Gagal simpan guru:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isEdit || !confirm(`Hapus guru ${teacher.name}?`)) return;
    setLoading(true);
    try {
      await axios.delete(`/api/teachers/${teacher.id}`);
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error("❌ Gagal hapus guru:", err);
    } finally {
      setLoading(false);
    }
  };

  const safeOpenChange = (v) => !loading && onOpenChange(v);

  return (
    <Dialog open={open} onOpenChange={safeOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Guru" : "Tambah Guru"}</DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <div className="grid gap-4 py-4">
          {/* Nama */}
          <div className="grid gap-2">
            <Label>Nama</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="isi nama guru..."
              disabled={loading}
            />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="isi email guru..."
              disabled={loading}
              type="email"
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="isi password guru..."
                disabled={loading}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="grid gap-2">
            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(v) => setForm({ ...form, role: v })}
              disabled={loading}
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

        {/* Tombol Aksi */}
        <DialogFooter className="flex gap-2">
          {isEdit && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Hapus...
                </>
              ) : (
                "Hapus"
              )}
            </Button>
          )}
          <Button onClick={handleSave} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                {isEdit ? "Memperbarui..." : "Menyimpan..."}
              </>
            ) : isEdit ? (
              "Perbarui"
            ) : (
              "Simpan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
