import React from "react";

export default function Invitation() {
  return (
    <div className="px-4 pb-32">
      <div className="flex py-4 text-2xl font-bold text-slate-900">
        <h1>Dashboard</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <h1 className="text-lg font-bold text-slate-900">Tema Terbaru</h1>
          <a
            href="http://"
            className="flex text-sky-500 font-mediumhover:underline items-center"
          >
            Explore <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
