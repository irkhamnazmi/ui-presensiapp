import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <img src="/images/404_Error.webp" alt="" />
      <Button variant="default" onClick={() => (window.location.href = "/")}>
        Kembali ke Beranda
      </Button>
    </div>
  );
}
