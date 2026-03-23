"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full py-5 bg-red-50 border border-red-100 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-100 transition-all flex items-center justify-center gap-3 group"
    >
      <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      Sign out of Account
    </button>
  );
}
