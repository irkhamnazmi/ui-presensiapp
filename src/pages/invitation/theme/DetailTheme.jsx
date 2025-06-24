import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useThemeController } from "@/controllers/useThemeController";
import { Heart, X } from "lucide-react";
import { useParams } from "wouter";

export default function DetailTheme() {
  const { id } = useParams();
  const { themes, loading, error } = useThemeController();

  if (loading) return <p className="p-6 text-center">Memuat tema...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  const theme = themes.find((item) => item.id.toString() === id);

  return (
    <Dialog open="true">
      <DialogContent className="w-full lg:max-w-[500px] h-full p-0 rounded-none flex flex-col [&>button]:hidden">
        <Card className="rounded-xl overflow-hidden border-none shadow-none md:p-4">
          <div className="max-h-[90vh] overflow-y-auto p-4">
            {/* Top Controls */}
            <div className="flex justify-between mb-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  window.history.back();
                }}>
                <X />
              </Button>
              <Button variant="outline" size="icon">
                <Heart />
              </Button>
            </div>

            {/* Image */}
            <div className="rounded-lg overflow-hidden mb-4">
              <img
                src={theme.image} // Ganti path sesuai gambar kamu
                alt={theme.name}
                className="w-full rounded-lg object-cover"
              />
            </div>

            {/* Title */}
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">
                {theme.name} {id}
              </DialogTitle>
            </DialogHeader>

            {/* Description */}
            <DialogDescription className="text-sm text-muted-foreground mt-2 leading-relaxed whitespace-pre-wrap break-words text-justify w-full border p-2 overflow-auto">
              {theme.description}
            </DialogDescription>

            {/* Footer Buttons */}
            <DialogFooter className="w-full mt-6 flex justify-between gap-4">
              <Button className="w-full" variant="outline">
                Pratinjau
              </Button>
              <Button className="w-full">Simpan Tema</Button>
            </DialogFooter>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
