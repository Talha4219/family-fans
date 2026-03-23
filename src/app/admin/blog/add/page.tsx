import { addBlogPost } from "@/lib/actions";

import {
  ChevronLeft,
  PenTool,
  Layout,
  Image as ImageIcon,
  Zap,
  Sparkles,
  Save,
  Tag,
  Hash,
  FileText,
  Plus,
} from "lucide-react";

import Link from "next/link";

import { redirect } from "next/navigation";

export default function AddBlogPostPage() {
  async function submitForm(formData: FormData) {
    "use server";
    await addBlogPost(formData);
    redirect("/admin/blog");
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {" "}
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <Link
            href="/admin/blog"
            className="group flex items-center gap-2 text-slate-400 hover:text-lime-600 transition-colors mb-4"
          >
            {" "}
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Back to Blog
            </span>{" "}
          </Link>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            New <span className="text-lime-600">Blog Post</span>{" "}
          </h1>{" "}
        </div>{" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="hidden md:flex flex-col text-right">
            {" "}
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Protocol Type
            </p>{" "}
            <p className="text-xs font-black text-lime-600 uppercase tracking-widest">
              Operational Digest
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <form
        action={submitForm}
        className="space-y-8 pb-32 font-roboto text-slate-900"
      >
        {" "}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {" "}
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {" "}
            {/* Section: Core Content */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm space-y-8">
              {" "}
              <div className="flex items-center gap-3 text-lime-600">
                {" "}
                <FileText className="w-5 h-5" />{" "}
                <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
                  Post Content
                </h3>{" "}
              </div>{" "}
              <div className="space-y-6">
                {" "}
                <div className="space-y-3">
                  {" "}
                  <label
                    htmlFor="title"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                  >
                    Post Title
                  </label>{" "}
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all font-inter"
                    placeholder="e.g. THE FUTURE OF THERMAL REGULATION"
                  />{" "}
                </div>{" "}
                <div className="space-y-3">
                  {" "}
                  <label
                    htmlFor="excerpt"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                  >
                    Excerpt
                  </label>{" "}
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    rows={2}
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all resize-none font-inter"
                    placeholder="A concise structural overview of the article content..."
                  ></textarea>{" "}
                </div>{" "}
                <div className="space-y-3">
                  {" "}
                  <label
                    htmlFor="content"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                  >
                    Content (Markdown Supported)
                  </label>{" "}
                  <textarea
                    id="content"
                    name="content"
                    rows={15}
                    required
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all resize-y font-inter"
                    placeholder="# Start drafting your blog post..."
                  ></textarea>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Right: Metadata & Assets */}
          <div className="space-y-8">
            {" "}
            {/* Section: Post Settings */}
            <div className="bg-white rounded-[2.5rem] p-10 border-2 border-lime-100 shadow-sm space-y-8">
              {" "}
              <div className="flex items-center gap-3 text-lime-600">
                {" "}
                <Tag className="w-5 h-5" />{" "}
                <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
                  Post Settings
                </h3>{" "}
              </div>{" "}
              <div className="space-y-6">
                {" "}
                <div className="space-y-3">
                  {" "}
                  <label
                    htmlFor="category"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                  >
                    Category
                  </label>{" "}
                  <select
                    id="category"
                    name="category"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-semibold text-[zinc-950] focus:ring-2 focus:ring-lime-600/30 focus:border-orange-300 transition-all"
                  >
                    {" "}
                    <option value="Company News">Company News</option>{" "}
                    <option value="Tech Insights">Tech Insights</option>{" "}
                    <option value="Case Studies">Case Studies</option>{" "}
                    <option value="Industry Trends">
                      Industry Trends
                    </option>{" "}
                  </select>{" "}
                </div>{" "}
                <div className="space-y-3">
                  {" "}
                  <label
                    htmlFor="tags"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                  >
                    Tags{" "}
                    <span className="text-slate-300 normal-case tracking-normal font-medium">
                      (comma separated)
                    </span>
                  </label>{" "}
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-semibold text-[zinc-950] placeholder:text-slate-300 focus:ring-2 focus:ring-lime-600/30 focus:border-orange-300 transition-all"
                    placeholder="e.g. fan, tech, summer"
                  />{" "}
                </div>{" "}
                <div className="space-y-3">
                  {" "}
                  <label
                    htmlFor="author"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                  >
                    Author
                  </label>{" "}
                  <input
                    type="text"
                    id="author"
                    name="author"
                    defaultValue="Admin"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-semibold text-[zinc-950] focus:ring-2 focus:ring-lime-600/30 focus:border-orange-300 transition-all"
                  />{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Section: Image Asset */}
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm space-y-8">
              {" "}
              <div className="flex items-center gap-3 text-lime-600">
                {" "}
                <ImageIcon className="w-5 h-5" />{" "}
                <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
                  Header Image
                </h3>{" "}
              </div>{" "}
              <div className="space-y-6">
                {" "}
                <div className="relative group/file">
                  {" "}
                  <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    className="w-full h-32 opacity-0 absolute inset-0 cursor-pointer z-10"
                  />{" "}
                  <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-slate-300 group-hover:border-lime-600 group-hover:bg-lime-50/50 transition-all">
                    {" "}
                    <Plus className="w-8 h-8 mb-1" />{" "}
                    <p className="text-[10px] font-black uppercase tracking-widest text-center px-4">
                      Upload Header Asset
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="space-y-3">
                  {" "}
                  <label
                    htmlFor="imageUrl"
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                  >
                    Featured Image
                  </label>{" "}
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 text-[10px] font-black text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all font-inter"
                    placeholder="https://assets.cloud/header.png"
                  />{" "}
                </div>{" "}
                <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 group/check cursor-pointer">
                  {" "}
                  <div className="relative">
                    {" "}
                    <input
                      type="checkbox"
                      id="isPublished"
                      name="isPublished"
                      className="w-6 h-6 rounded-lg border-2 border-slate-200 text-lime-600 focus:ring-lime-600/20 transition-all cursor-pointer appearance-none checked:bg-lime-600 checked:border-lime-600"
                    />{" "}
                    <Zap className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-has-[:checked]:opacity-100 transition-opacity pointer-events-none fill-current" />{" "}
                  </div>{" "}
                  <div className="flex flex-col">
                    {" "}
                    <label
                      htmlFor="isPublished"
                      className="text-[10px] font-black uppercase tracking-widest text-[zinc-950] cursor-pointer"
                    >
                      Publish Live
                    </label>{" "}
                    <p className="text-[8px] font-medium text-slate-500 mt-1 uppercase tracking-tighter">
                      Push entry to live feed upon save.
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Submit Actions */}
        <div className="fixed bottom-0 left-0 lg:left-80 right-0 p-8 bg-white/80 backdrop-blur-md border-t border-slate-100 flex items-center justify-end gap-6 z-[60]">
          {" "}
          <Link
            href="/admin/blog"
            className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[zinc-950] transition-colors"
          >
            {" "}
            Cancel{" "}
          </Link>{" "}
          <button
            type="submit"
            className="btn-primary !px-12 !py-5 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-lime-600/40 flex items-center gap-4 hover:scale-105 transition-transform"
          >
            {" "}
            <Save className="w-5 h-5" /> Educational Content{" "}
          </button>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
}
