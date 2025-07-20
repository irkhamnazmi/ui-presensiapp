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
import { Loader2 } from "lucide-react";
import axios from "axios";

export default function StudentDialog({
  open,
  onOpenChange,
  mode = "add",
  student = {},
  onSuccess,
}) {
  const [form, setForm] = useState({ name: "", class: "" });
  const [loading, setLoading] = useState(false);
  const isEdit = mode === "edit";

  useEffect(() => {
    setForm(
      isEdit
        ? { name: student.name || "", class: student.class || "" }
        : { name: "", class: "" }
    );
  }, [open, isEdit, student]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const url = isEdit ? `/api/students/${student.id}` : "/api/students";
      const method = isEdit ? axios.put : axios.post;
      await method(url, form);
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error("❌ Gagal simpan:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!isEdit || !confirm(`Hapus siswa ${student.name}?`)) return;
    setLoading(true);
    try {
      await axios.delete(`/api/students/${student.id}`);
      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      console.error("❌ Gagal hapus:", err);
    } finally {
      setLoading(false);
    }
  };

  const safeOpenChange = (val) => !loading && onOpenChange(val);

  return (
    <Dialog open={open} onOpenChange={safeOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Siswa" : "Tambah Siswa"}</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <div className="grid gap-4 py-4">
          {["name", "class"].map((field) => (
            <div key={field} className="grid gap-2">
              <Label>{field === "name" ? "Nama" : "Kelas"}</Label>
              <Input
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                placeholder={`isi ${
                  field === "name" ? "nama siswa" : "kelas"
                }...`}
                disabled={loading}
              />
            </div>
          ))}
        </div>
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
