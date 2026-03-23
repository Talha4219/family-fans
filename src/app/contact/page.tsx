"use client";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Zap,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { createMessage } from "@/lib/actions";
export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };
    const res = await createMessage(data);
    if (res.success) {
      setStatus("success");
      setMessage(res.message);
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
      setMessage(res.message);
    }
  }
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {" "}
      {/* Hero Section */}{" "}
      <section className="relative pt-32 pb-20 overflow-hidden bg-white border-b border-slate-100">
        {" "}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #f1f5f9 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />{" "}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-600/5 rounded-full blur-[120px] -mr-48 -mt-48" />{" "}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -ml-48 -mb-48" />{" "}
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          {" "}
          <p className="text-lime-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4">
            Connect with us
          </p>{" "}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] text-[zinc-950]">
            {" "}
            How can we <br />{" "}
            <span className="text-lime-600 underline decoration-slate-200 underline-offset-8 decoration-4">
              Help You?
            </span>{" "}
          </h1>{" "}
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg leading-relaxed">
            {" "}
            Whether you have a question about features, trials, pricing, or
            anything else, our team is ready to answer all your questions.{" "}
          </p>{" "}
        </div>{" "}
      </section>{" "}
      <section className="max-w-7xl mx-auto px-6 -mt-16 pb-24 relative z-20">
        {" "}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {" "}
          {/* Contact Info Cards */}{" "}
          <div className="lg:col-span-1 space-y-6">
            {" "}
            {[
              {
                icon: Mail,
                title: "Email Us",
                contact: "info@familyfans.net",
                desc: "Response within 24 hours",
              },
              {
                icon: Phone,
                title: "Call Center",
                contact: "+92 55 427 1684",
                desc: "SAT-THU, 9am - 6pm",
              },
              {
                icon: MapPin,
                title: "Main Office",
                contact: "45HW+XG5",
                desc: "Rana Colony Kangniwala, Gujranwala",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-[2.5rem] p-8 border border-white shadow-xl shadow-slate-200/50 flex flex-col items-center text-center transform transition-transform hover:-translate-y-1"
              >
                {" "}
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-lime-50 transition-colors">
                  {" "}
                  <item.icon className="w-8 h-8 text-lime-600" />{" "}
                </div>{" "}
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  {item.title}
                </h3>{" "}
                <p className="text-xl font-black text-[zinc-950] mb-1 tracking-tight">
                  {item.contact}
                </p>{" "}
                <p className="text-xs text-slate-500 font-medium">
                  {item.desc}
                </p>{" "}
              </div>
            ))}{" "}
            {/* Social Links placeholder or additional info */}{" "}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              {" "}
              <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12 group-hover:scale-110 transition-transform">
                {" "}
                <Zap className="w-32 h-32 text-lime-600" />{" "}
              </div>{" "}
              <h3 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2 text-white">
                {" "}
                <ShieldCheck className="w-4 h-4 text-lime-600" /> Quality
                Guarantee{" "}
              </h3>{" "}
              <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                {" "}
                All our products undergo rigorous testing before shipment. Need
                technical support? Contact our engineering team.{" "}
              </p>{" "}
              <button className="text-[10px] font-black uppercase tracking-widest text-lime-500 flex items-center gap-2 group/btn hover:text-lime-400 transition-colors">
                {" "}
                Technical Docs{" "}
                <Send className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          {/* Contact Form Area */}{" "}
          <div className="lg:col-span-2">
            {" "}
            <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-white shadow-2xl shadow-slate-200/60 relative overflow-hidden">
              {" "}
              {status === "success" ? (
                <div className="text-center py-20 animate-fade-in">
                  {" "}
                  <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                    {" "}
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />{" "}
                  </div>{" "}
                  <h2 className="text-3xl font-black text-[zinc-950] tracking-tighter mb-4">
                    Message Received!
                  </h2>{" "}
                  <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10">
                    {" "}
                    Thank you for reaching out. One of our experts will get back
                    to you shortly.{" "}
                  </p>{" "}
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-secondary !bg-slate-50 !px-10"
                  >
                    {" "}
                    Send Another Message{" "}
                  </button>{" "}
                </div>
              ) : (
                <>
                  {" "}
                  <div className="mb-12">
                    {" "}
                    <h2 className="text-3xl md:text-4xl font-black text-[zinc-950] tracking-tighter mb-4">
                      Send a Message
                    </h2>{" "}
                    <p className="text-slate-500 font-medium">
                      Have something specific in mind? Fill out the form below.
                    </p>{" "}
                  </div>{" "}
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {" "}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {" "}
                      <div className="space-y-3">
                        {" "}
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-4">
                          Full Name
                        </label>{" "}
                        <input
                          name="name"
                          required
                          type="text"
                          placeholder="name"
                          className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-zinc-950 placeholder:text-slate-300 focus:outline-none focus:border-lime-600 focus:bg-white transition-all"
                        />{" "}
                      </div>{" "}
                      <div className="space-y-3">
                        {" "}
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-4">
                          Email Address
                        </label>{" "}
                        <input
                          name="email"
                          required
                          type="email"
                          placeholder="name@example.com"
                          className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-zinc-950 placeholder:text-slate-300 focus:outline-none focus:border-lime-600 focus:bg-white transition-all"
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="space-y-3">
                      {" "}
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-4">
                        Subject
                      </label>{" "}
                      <input
                        name="subject"
                        required
                        type="text"
                        placeholder="Order Inquiry / Support"
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-sm font-black text-zinc-950 placeholder:text-slate-300 focus:outline-none focus:border-lime-600 focus:bg-white transition-all"
                      />{" "}
                    </div>{" "}
                    <div className="space-y-3">
                      {" "}
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-4">
                        Your Message
                      </label>{" "}
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="I would like to inquire about..."
                        className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-sm font-black text-zinc-950 placeholder:text-slate-300 focus:outline-none focus:border-lime-600 focus:bg-white transition-all resize-none"
                      />{" "}
                    </div>{" "}
                    {status === "error" && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100">
                        {" "}
                        {message}{" "}
                      </div>
                    )}{" "}
                    <button
                      disabled={status === "loading"}
                      type="submit"
                      className="btn-primary flex items-center justify-center gap-3 !py-5 !w-full shadow-2xl shadow-lime-600/20"
                    >
                      {" "}
                      {status === "loading" ? (
                        <div className="flex items-center gap-2">
                          {" "}
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                          <span>Sending...</span>{" "}
                        </div>
                      ) : (
                        <>
                          {" "}
                          <span className="text-sm font-black uppercase tracking-widest">
                            Transmit Message
                          </span>{" "}
                          <Send className="w-4 h-4" />{" "}
                        </>
                      )}{" "}
                    </button>{" "}
                  </form>{" "}
                </>
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Support Metrics */}{" "}
      <section className="bg-white border-y border-slate-100 py-20">
        {" "}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {" "}
          {[
            { icon: MessageSquare, value: "98%", label: "Customer Satisfaction" },
            { icon: Clock, value: "< 2hrs", label: "Avg Response" },
            { icon: Zap, value: "24/7", label: "Tech Support" },
            { icon: ShieldCheck, value: "100%", label: "Data Security" },
          ].map((m, i) => (
            <div key={i} className="space-y-2">
              {" "}
              <div className="w-10 h-10 bg-lime-50 rounded-xl flex items-center justify-center mx-auto mb-4 border border-lime-100">
                {" "}
                <m.icon className="w-5 h-5 text-lime-600" />{" "}
              </div>{" "}
              <p className="text-3xl font-black text-[zinc-950] tracking-tighter">
                {m.value}
              </p>{" "}
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {m.label}
              </p>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </section>{" "}
    </div>
  );
}
