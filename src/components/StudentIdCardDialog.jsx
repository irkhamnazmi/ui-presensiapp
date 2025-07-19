import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

export default function StudentIdCardDialog({ open, onOpenChange, student }) {
  const cardRef = useRef(null);

  const handleDownload = async () => {
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [85.6, 54], // ukuran kartu ATM
    });
    pdf.addImage(imgData, "PNG", 0, 0, 85.6, 54);
    pdf.save(`kartu-${student.name}.pdf`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Kartu Siswa</DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="w-[342px]  bg-white border border-sky-950 rounded-lg shadow p-4 flex flex-col justify-between"
          >
            <div className="flex items-start ">
              <img
                src="/images/presensiapp.png"
                alt="Logo"
                className="w-10 h-10 rounded"
              />
              <h2 className="font-semibold text-lg text-sky-900">
                Presensi App
              </h2>
            </div>
            <div className="flex justify-between ">
              <div className="mt-2">
                <p className="text-sm text-gray-600">Nama:</p>
                <p className="font-bold text-base">{student.name}</p>
                <p className="text-sm text-gray-600 mt-1">Kelas:</p>
                <p className="font-semibold text-base">{student.class}</p>
              </div>
              <div className="flex mt-3">
                <QRCodeSVG
                  value={`student:${student.id}`}
                  size={300}
                  className="w-24 h-24"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleDownload}>Download PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
