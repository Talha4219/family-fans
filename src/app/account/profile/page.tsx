"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions";
import { ArrowLeft, User, Mail, Save, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("id", (session.user as any).id);
    formData.append("name", name);
    formData.append("email", email);

    try {
      await updateProfile(formData);
      await update({ name, email }); // Update client-side session
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-8 h-8 animate-spin text-lime-600" />
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-lime-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Account
        </Link>

        <div className="bg-white rounded-[3rem] border border-slate-100 p-10 md:p-16 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-600/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          
          <div className="relative z-10">
            <div className="mb-12">
              <h1 className="text-3xl font-black text-zinc-950 tracking-tighter uppercase mb-2">
                Profile <span className="text-lime-600">Settings</span>
              </h1>
              <p className="text-xs font-medium text-slate-400">
                Update your personal information and contact details.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center border border-red-100 mb-8 animate-in fade-in slide-in-from-top-2">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center border border-green-100 mb-8 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border-0 rounded-2xl pl-14 pr-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border-0 rounded-2xl pl-14 pr-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all"
                  />
                </div>
                <p className="text-[9px] font-bold text-slate-400 px-4">
                  Note: Changing your email will update your login credentials.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !py-5 flex items-center justify-center gap-3 shadow-xl shadow-lime-600/20 text-sm"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5 opacity-50" /> Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
