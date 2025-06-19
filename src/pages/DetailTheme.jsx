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
import { Heart, X } from "lucide-react";
import { useParams } from "wouter";

export default function DetailTheme() {
  const { id } = useParams();
  return (
    <Dialog open="true">
      <DialogContent className="w-full lg:max-w-[500px]  h-full p-0 rounded-none flex flex-col [&>button]:hidden">
        <Card className="rounded-xl overflow-hidden border-none shadow-none p-4">
          <div className="max-h-[90vh] overflow-y-auto p-4">
            {/* Top Controls */}
            <div className="flex justify-between mb-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  window.history.back();
                }}
              >
                <X />
              </Button>
              <Button variant="outline" size="icon">
                <Heart />
              </Button>
            </div>

            {/* Image */}
            <div className="rounded-lg overflow-hidden mb-4">
              <img
                src="/images/theme1.png" // Ganti path sesuai gambar kamu
                alt="Elegant Theme"
                className="w-full rounded-lg object-cover"
              />
            </div>

            {/* Title */}
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">
                Elegant {id}
              </DialogTitle>
            </DialogHeader>

            {/* Description */}
            <DialogDescription className="text-sm text-muted-foreground mt-2 leading-relaxed whitespace-pre-wrap break-words text-justify w-full border p-2 overflow-auto">
              {`Sambut hari bahagia kami dalam balutan keanggunan dan keindahan yang tak lekang oleh waktu. \n\nTema “Elegant” mencerminkan kesederhanaan yang berkelas, di mana setiap detail menciptakan suasana romantis, tenang, dan tak terlupakan. \n\nKami percaya bahwa cinta tidak perlu banyak berkata, cukup terasa — seperti tema ini: sederhana, tapi meninggalkan kesan mendalam. Kami berharap kehadiran Anda dapat menambah kebahagiaan dalam momen berharga
kami.`}
            </DialogDescription>

            {/* Footer Buttons */}
            <DialogFooter className="w-full mt-6 flex justify-between border gap-4">
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
