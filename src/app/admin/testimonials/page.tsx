import {
  getTestimonials,
  updateTestimonial,
  deleteTestimonial,
  createTestimonial,
} from "@/lib/actions";
import {
  MessageSquare,
  Star,
  User,
  Trash2,
  CheckCircle,
  Plus,
  Sparkles,
  UserCheck,
  ShieldOff,
} from "lucide-react";
import React from "react";
export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <div className="space-y-8 animate-fade-in">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {" "}
        <div>
          {" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tight mb-2">
            Social Proof
          </h1>{" "}
          <p className="text-slate-500 font-medium">
            Manage and display customer testimonials across your website.
          </p>{" "}
        </div>{" "}
        <div className="flex items-center gap-4">
          {" "}
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-xl border border-purple-100">
            {" "}
            <Sparkles className="w-4 h-4" />{" "}
            <span className="text-xs font-black uppercase tracking-widest">
              {testimonials.length} Active
            </span>{" "}
          </div>{" "}
          {/* Add Testimonial Action trigger could go here */}{" "}
        </div>{" "}
      </div>{" "}
      {/* Quick Add Form Section (Simple for now) */}{" "}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
        {" "}
        <h2 className="text-sm font-black uppercase tracking-widest mb-8 flex items-center gap-3">
          {" "}
          <Plus className="w-4 h-4 text-lime-600" /> Append New
          Testimonial{" "}
        </h2>{" "}
        <form
          action={async (formData: FormData) => {
            "use server";
            const data = {
              name: formData.get("name"),
              content: formData.get("content"),
              designation: formData.get("designation"),
              rating: Number(formData.get("rating")),
              isActive: true,
            };
            await createTestimonial(data);
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {" "}
          <div className="space-y-2">
            {" "}
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Name
            </label>{" "}
            <input
              name="name"
              required
              placeholder="Customer Name"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:border-lime-600 transition-all"
            />{" "}
          </div>{" "}
          <div className="space-y-2">
            {" "}
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Designation
            </label>{" "}
            <input
              name="designation"
              required
              placeholder="e.g. Homeowner in Lahore"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:border-lime-600 transition-all"
            />{" "}
          </div>{" "}
          <div className="space-y-2">
            {" "}
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Rating (1-5)
            </label>{" "}
            <select
              name="rating"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold focus:outline-none focus:border-lime-600 transition-all"
            >
              {" "}
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}{" "}
            </select>{" "}
          </div>{" "}
          <div className="md:col-span-4 space-y-2">
            {" "}
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Testimonial Content
            </label>{" "}
            <textarea
              name="content"
              required
              placeholder="What do they say about our products..."
              rows={3}
              className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-lime-600 transition-all resize-none"
            />{" "}
          </div>{" "}
          <div className="md:col-span-4 flex justify-end">
            {" "}
            <button
              type="submit"
              className="btn-primary !py-4 !px-10 flex items-center gap-3"
            >
              {" "}
              <Plus className="w-4 h-4" />{" "}
              <span className="text-[10px] font-black uppercase tracking-widest">
                Publish Testimonial
              </span>{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
      </div>{" "}
      {/* Testimonials List */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {" "}
        {testimonials.length > 0 ? (
          testimonials.map((test: any) => (
            <div
              key={test._id}
              className="group bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden"
            >
              {" "}
              <div
                className={`absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform ${test.isActive ? "text-emerald-500" : "text-slate-300"}`}
              >
                {" "}
                <MessageSquare className="w-24 h-24" />{" "}
              </div>{" "}
              <div className="flex items-center gap-4 mb-8">
                {" "}
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-slate-100 text-slate-300">
                  {" "}
                  <User className="w-8 h-8" />{" "}
                </div>{" "}
                <div className="flex-1 min-w-0">
                  {" "}
                  <h3 className="font-black text-[zinc-950] uppercase tracking-tighter text-xl truncate">
                    {test.name}
                  </h3>{" "}
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {test.designation}
                  </p>{" "}
                </div>{" "}
                <div className="flex gap-0.5">
                  {" "}
                  {[...Array(test.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-lime-600 fill-lime-600"
                    />
                  ))}{" "}
                </div>{" "}
              </div>{" "}
              <p className="text-slate-500 font-medium leading-relaxed mb-10 text-lg">
                "{test.content}"{" "}
              </p>{" "}
              <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                {" "}
                <form
                  action={async () => {
                    "use server";
                    await updateTestimonial(test._id, {
                      isActive: !test.isActive,
                    });
                  }}
                >
                  {" "}
                  <button
                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${test.isActive ? "text-emerald-500" : "text-slate-300"}`}
                  >
                    {" "}
                    {test.isActive ? (
                      <UserCheck className="w-4 h-4" />
                    ) : (
                      <ShieldOff className="w-4 h-4" />
                    )}{" "}
                    {test.isActive ? "Visible Live" : "Hidden"}{" "}
                  </button>{" "}
                </form>{" "}
                <form
                  action={async () => {
                    "use server";
                    await deleteTestimonial(test._id);
                  }}
                >
                  {" "}
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-red-500 transition-colors">
                    {" "}
                    <Trash2 className="w-4 h-4" /> Delete{" "}
                  </button>{" "}
                </form>{" "}
              </div>{" "}
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center bg-slate-50 rounded-[4rem] border border-slate-100 border-dashed">
            {" "}
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              {" "}
              <Sparkles className="w-10 h-10 text-slate-200" />{" "}
            </div>{" "}
            <h3 className="text-xl font-black text-[zinc-950] mb-2 uppercase tracking-tighter">
              No Social Proof
            </h3>{" "}
            <p className="text-slate-400 font-medium">
              Add some customer feedback to boost conversion rates.
            </p>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
