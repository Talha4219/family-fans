import { getBlogPosts, deleteBlogPost } from "@/lib/actions";
import {
  Plus,
  BookOpen,
  Trash2,
  Edit3,
  Search,
  Zap,
  Calendar,
  User,
  Tag,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default async function MediaCommandPage() {
  const posts = await getBlogPosts();
  const stats = [
    {
      label: "Published",
      value: posts.filter((p) => p.isPublished).length,
      icon: BookOpen,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      label: "Drafts",
      value: posts.filter((p) => !p.isPublished).length,
      icon: Zap,
      color: "text-lime-600",
      bg: "bg-lime-50",
    },
    {
      label: "Total Posts",
      value: posts.length,
      icon: Tag,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];
  async function handleDelete(id: string) {
    "use server";
    await deleteBlogPost(id);
  }
  return (
    <div className="space-y-10">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {" "}
        <div>
          {" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Blog <span className="text-lime-600">Management</span>{" "}
          </h1>{" "}
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
            Manage your store's articles and news
          </p>{" "}
        </div>{" "}
        <Link
          href="/admin/blog/add"
          className="btn-primary flex items-center gap-2 !px-8 !py-4 shadow-xl shadow-lime-600/20"
        >
          {" "}
          <Plus className="w-4 h-4" />{" "}
          <span className="text-xs font-black uppercase tracking-widest">
            Add New Post
          </span>{" "}
        </Link>{" "}
      </div>{" "}
      {/* Stats Grid */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {" "}
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-8 rounded-[2rem] border border-slate-50 shadow-sm flex items-center justify-between group hover:border-lime-600/10 transition-all"
          >
            {" "}
            <div>
              {" "}
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                {stat.label}
              </p>{" "}
              <p className="text-3xl font-black text-[zinc-950] tracking-tighter">
                {stat.value}
              </p>{" "}
            </div>{" "}
            <div
              className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}
            >
              {" "}
              <stat.icon className={`w-6 h-6 ${stat.color}`} />{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {/* Blog Posts Table */}{" "}
      <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden text-slate-900">
        {" "}
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          {" "}
          <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
            All Articles
          </h2>{" "}
          <div className="relative hidden sm:block">
            {" "}
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />{" "}
            <input
              type="text"
              placeholder="SEARCH ARTICLES..."
              className="bg-slate-50 border-none rounded-xl pl-12 pr-6 py-3 text-[10px] font-black tracking-widest text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all w-64"
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="overflow-x-auto">
          {" "}
          <table className="w-full text-left border-collapse">
            {" "}
            <thead>
              {" "}
              <tr className="bg-slate-50/50">
                {" "}
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Post
                </th>{" "}
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Category
                </th>{" "}
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Date
                </th>{" "}
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Status
                </th>{" "}
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">
                  Actions
                </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody className="divide-y divide-slate-50">
              {" "}
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                ><td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 group-hover:border-lime-600/20 transition-colors">
                        {post.imageUrl ? (
                          <Image
                            src={post.imageUrl}
                            alt=""
                            width={64}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                            <BookOpen className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div className="max-w-xs truncate">
                        <p className="text-sm font-black text-[zinc-950] uppercase tracking-tight">
                          {post.title}
                        </p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                          <User className="w-3 h-3" /> {post.author}
                        </p>
                      </div>
                    </div>
                  </td><td className="px-8 py-6">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                      {post.category}
                    </span>
                  </td><td className="px-8 py-6">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString()
                        : "DRAFT"}
                    </div>
                  </td><td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${post.isPublished ? "text-emerald-700 bg-emerald-50 border-emerald-100" : "text-orange-700 bg-lime-50 border-lime-100"}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${post.isPublished ? "bg-emerald-500" : "bg-lime-600 animate-pulse"}`}
                        />
                        {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </td><td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-[zinc-950] hover:text-white transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-[zinc-950] hover:text-white transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <form
                        action={handleDelete.bind(null, post.id)}
                      >
                        <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td></tr>
              ))}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
