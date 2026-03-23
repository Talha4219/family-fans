"use client";
import { Printer } from "lucide-react";
export default function DownloadReceiptButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn-secondary !bg-white border border-slate-200 !px-8 flex items-center gap-3 group"
    >
      {" "}
      <Printer className="w-4 h-4 text-lime-600 group-hover:scale-110 transition-transform" />{" "}
      <span className="text-[10px] font-black uppercase tracking-widest">
        Download Receipt
      </span>{" "}
    </button>
  );
}
