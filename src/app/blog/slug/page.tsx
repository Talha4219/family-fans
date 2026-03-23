import { Metadata } from "next";
import { getBlogPostBySlug } from "@/lib/actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  User,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Zap,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Breadcrumbs from "@/components/Breadcrumbs";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Log Entry Not Found" };
  return {
    title: `${post.title} | Blogs| FamilyFans`,
    description: post.excerpt,
    openGraph: { images: post.imageUrl ? [post.imageUrl] : [] },
  };
}
export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) {
    notFound();
  }
  return (
    <article className="pb-32 text-slate-900">
      {" "}
      {/* Hero Header */}{" "}
      <div className="w-full relative h-[60vh] md:h-[70vh] flex flex-col justify-end p-10 md:p-20 overflow-hidden">
        {" "}
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        )}{" "}
        <div className="absolute inset-0 bg-gradient-to-t from-[zinc-950] via-[zinc-950]/20 to-transparent" />{" "}
        <div className="max-w-4xl mx-auto w-full relative z-10">
          {" "}
          <div className="mb-10">
            {" "}
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8"
            >
              {" "}
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Exit to Operational Archives
              </span>{" "}
            </Link>{" "}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-white/40">
              {" "}
              <span className="bg-lime-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                {" "}
                {post.category}{" "}
              </span>{" "}
              <div className="flex items-center gap-2">
                {" "}
                <Calendar className="w-3.5 h-3.5" />{" "}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {" "}
                  {new Date(
                    post.publishedAt || post.createdAt,
                  ).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </span>{" "}
              </div>{" "}
              <div className="flex items-center gap-2">
                {" "}
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                  {" "}
                  <User className="w-3.5 h-3.5 text-lime-600" />{" "}
                </div>{" "}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {" "}
                  Agent: {post.author}{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
              {" "}
              {post.title}{" "}
            </h1>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Content Body */}{" "}
      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        {" "}
        <div className="bg-white rounded-[3rem] p-10 md:p-20 border border-slate-50 shadow-2xl shadow-[zinc-950]/5 prose prose-slate prose-invert prose-lg max-w-none prose-headings:text-[zinc-950] prose-headings:font-black prose-headings:tracking-tighter prose-headings: prose-p:text-slate-500 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-[zinc-950] prose-strong:font-black prose-img:rounded-[2rem] prose-img:border prose-img:border-slate-100">
          {" "}
          <ReactMarkdown>{post.content}</ReactMarkdown>{" "}
        </div>{" "}
        {/* Footer Meta */}{" "}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 py-10 border-t border-slate-100">
          {" "}
          <div className="flex flex-wrap items-center gap-3">
            {" "}
            <Tag className="w-4 h-4 text-lime-600" />{" "}
            <span className="text-[10px] font-black uppercase tracking-widest text-[zinc-950]/20 mr-2">
              Nodes Index:
            </span>{" "}
            {post.tags?.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 px-3 py-1.5 rounded-xl hover:border-lime-600/20 hover:text-lime-600 transition-all cursor-crosshair"
              >
                {" "}
                #{tag}{" "}
              </span>
            ))}{" "}
          </div>{" "}
          <div className="flex items-center gap-6">
            {" "}
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
              Sync Content:
            </span>{" "}
            <div className="flex items-center gap-4">
              {" "}
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[zinc-950] hover:bg-lime-600 hover:text-white transition-all">
                {" "}
                <Twitter className="w-4 h-4" />{" "}
              </button>{" "}
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[zinc-950] hover:bg-lime-600 hover:text-white transition-all">
                {" "}
                <Facebook className="w-4 h-4" />{" "}
              </button>{" "}
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[zinc-950] hover:bg-lime-600 hover:text-white transition-all">
                {" "}
                <Linkedin className="w-4 h-4" />{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Next Entry Prompt */}{" "}
        <div className="mt-20 p-12 bg-[zinc-950] rounded-[3rem] relative overflow-hidden group">
          {" "}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(242,100,25,0.05),transparent)] pointer-events-none" />{" "}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            {" "}
            <div className="text-center md:text-left">
              {" "}
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
                Operational Digest Overload?
              </h3>{" "}
              <p className="text-white/70 text-sm font-medium">
                Return to the complete archives for more ecosystem tech
                insights.
              </p>{" "}
            </div>{" "}
            <Link
              href="/blog"
              className="btn-primary flex items-center gap-4 !px-12 !py-5 shadow-2xl shadow-lime-600/40 hover:scale-105 transition-transform group-hover:bg-lime-700"
            >
              {" "}
              <ChevronLeft className="w-5 h-5" />{" "}
              <span className="text-xs font-black uppercase tracking-widest">
                Exit to Archives
              </span>{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </article>
  );
}
