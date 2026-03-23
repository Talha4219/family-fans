"use client";

import Link from "next/link";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import { registerUser } from "@/lib/actions";

import {
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", `${firstName} ${lastName}`);
    formData.append("email", email);
    formData.append("password", password);

    try {
      await registerUser(formData);

      // Auto login after registration
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        router.push("/login?registered=true");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#F8FAFC] min-h-screen py-24 px-6 flex items-center justify-center">
      {" "}
      <Link
        href="/"
        className="absolute top-10 left-10 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-lime-600 transition-colors flex items-center gap-2"
      >
        {" "}
        <ArrowLeft className="w-4 h-4" /> Back to Store{" "}
      </Link>{" "}
      <div className="w-full max-w-xl">
        {" "}
        <div className="bg-white rounded-[4rem] p-12 md:p-20 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
          {" "}
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-600/5 rounded-full -mr-32 -mt-32 blur-3xl" />{" "}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-600/5 rounded-full -ml-32 -mb-32 blur-3xl" />{" "}
          <div className="relative z-10">
            {" "}
            <div className="text-center mb-12">
              {" "}
              <div className="w-16 h-16 bg-lime-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {" "}
                <Zap className="w-8 h-8 text-lime-600" />{" "}
              </div>{" "}
              <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter mb-4">
                {" "}
                Join ElectroShop{" "}
              </h1>{" "}
              <p className="text-slate-500 font-medium text-sm">
                {" "}
                Create your account to unlock premium perks and faster
                checkout.{" "}
              </p>{" "}
            </div>{" "}
            {error && (
              <div className="bg-red-50 text-red-600 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center border border-red-100 mb-8 animate-in fade-in slide-in-from-top-2">
                {" "}
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {" "}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {" "}
                <div className="space-y-2">
                  {" "}
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 block">
                    {" "}
                    First Name{" "}
                  </label>{" "}
                  <div className="relative">
                    {" "}
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />{" "}
                    <input
                      type="text"
                      placeholder="name"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-slate-50 border-0 rounded-2xl pl-14 pr-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all placeholder:text-slate-400"
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className="space-y-2">
                  {" "}
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 block">
                    {" "}
                    Last Name{" "}
                  </label>{" "}
                  <input
                    type="text"
                    placeholder="Doe"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all placeholder:text-slate-400"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="space-y-2">
                {" "}
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 block">
                  {" "}
                  Email Address{" "}
                </label>{" "}
                <div className="relative">
                  {" "}
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />{" "}
                  <input
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border-0 rounded-2xl pl-14 pr-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all placeholder:text-slate-400"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="space-y-2">
                {" "}
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4 mb-2 block">
                  {" "}
                  Create Password{" "}
                </label>{" "}
                <div className="relative">
                  {" "}
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />{" "}
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border-0 rounded-2xl pl-14 pr-14 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all placeholder:text-slate-400"
                  />{" "}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-lime-600 transition-colors"
                  >
                    {" "}
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              <p className="text-[10px] text-slate-500 font-medium px-4">
                {" "}
                By joining, you agree to our{" "}
                <Link href="/terms" className="text-lime-600 mx-1 font-black">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-lime-600 mx-1 font-black"
                >
                  Privacy Policy
                </Link>
                .{" "}
              </p>{" "}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full !py-5 flex items-center justify-center gap-3 shadow-xl shadow-lime-600/20 text-sm"
              >
                {" "}
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {" "}
                    Start Premium Journey{" "}
                    <ShieldCheck className="w-5 h-5 opacity-50" />{" "}
                  </>
                )}
              </button>{" "}
            </form>{" "}
            <div className="mt-12 text-center space-y-4">
              {" "}
              <p className="text-xs text-slate-500 font-medium">
                {" "}
                Already a member?{""}
                <Link
                  href="/login"
                  className="text-[zinc-950] font-black hover:text-lime-600 transition-colors underline decoration-2 underline-offset-4 decoration-lime-600/30"
                >
                  {" "}
                  Sign In Instead{" "}
                </Link>{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="mt-10 flex items-center justify-center gap-6 opacity-30">
          {" "}
          <div className="w-8 h-8 rounded-full bg-slate-200" />{" "}
          <div className="w-8 h-8 rounded-full bg-slate-200" />{" "}
          <div className="w-8 h-8 rounded-full bg-slate-200" />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
