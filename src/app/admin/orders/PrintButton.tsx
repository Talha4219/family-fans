"use client";
import { Printer } from "lucide-react";
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn-secondary flex items-center gap-2 !px-6 print:hidden"
    >
      {" "}
      <Printer className="w-4 h-4" />{" "}
      <span className="text-xs font-black uppercase tracking-widest">
        Print Packing Slip
      </span>{" "}
    </button>
  );
}
