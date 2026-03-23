import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/actions";
import {
  User,
  Calendar,
  ArrowRight,
  Newspaper,
  Zap,
  Sparkles,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageAnimate from "@/components/PageAnimate";
import { NewsletterSection } from "@/components/HomeSections";

export const metadata: Metadata = {
  title: "Our Blog — Latest Updates | FamilyFans",
  description:
    "Explore the FamilyFans blog. Tech insights, company news, and product updates.",
  keywords: ["blog", "tech insights", "updates", "thermal regulation"],
};

export default async function BlogLandingPage() {
  const allPosts = await getBlogPosts();
  const posts = allPosts.filter((p: any) => p.isPublished);
  
  const categories = [
    "Tech",
    "Smart Home",
    "Energy Saving",
    "Installation",
    "Reviews",
  ];

  return (
    <PageAnimate>
      <div className="min-h-screen bg-[#F8FAFC] pb-24 text-center">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-slate-100 pb-16">
            <div className="space-y-6 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 bg-lime-600/10 text-lime-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-lime-600/20">
                <Sparkles className="w-3 h-3" /> Knowledge Base v2.4
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-zinc-950 tracking-tighter uppercase leading-[0.85]">
                Tips & <br /> <span className="text-lime-600">Insights.</span>
              </h1>
            </div>
            <div className="flex flex-wrap gap-2 max-w-md md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="px-5 py-2.5 rounded-2xl bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-lime-600/30 hover:text-lime-600 transition-all shadow-sm"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post: any) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group space-y-6 text-left"
              >
                <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-slate-50 shadow-2xl shadow-slate-900/5">
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                      <Zap className="w-12 h-12 text-slate-200" />
                    </div>
                  )}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 border border-slate-100">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-950">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-3 mb-4 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-zinc-950 tracking-tighter uppercase leading-tight line-clamp-2 transition-colors group-hover:text-lime-600">
                    {post.title}
                  </h2>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[zinc-950]">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                        {post.author}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-lime-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-slate-100">
              <Zap className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                Our blog is currently empty.
              </p>
            </div>
          )}

          <div className="mt-32">
            <NewsletterSection />
          </div>
        </div>
      </div>
    </PageAnimate>
  );
}
