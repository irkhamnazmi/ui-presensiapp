import { Html5Qrcode } from "html5-qrcode";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

export default function ScanQrDialog({ trigger, onScanned }) {
  const [open, setOpen] = useState(false);
  const scannerRef = useRef(null);

  const startScanner = () => {
    const tryStart = () => {
      const target = document.getElementById("qr-reader");
      if (target) {
        const scanner = new Html5Qrcode("qr-reader");

        scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            onScanned?.(decodedText);

            scanner.stop();
            setOpen(false);
          },
          (err) => {
            console.log(err);
          }
        );

        scannerRef.current = scanner;
      } else {
        // Retry sampai elemen tersedia
        setTimeout(tryStart, 100);
      }
    };

    tryStart();
  };
  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        scannerRef.current.clear();
        scannerRef.current = null;
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (val) startScanner();
        else stopScanner();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <div id="qr-reader" className="w-full rounded-md border mt-2" />
        <DialogClose asChild>
          <Button variant="secondary" className="mt-4 w-full">
            Batal
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
