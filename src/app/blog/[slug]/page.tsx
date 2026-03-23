import { Metadata } from "next";
import { getBlogPostBySlug, getBlogPosts, getReviews } from "@/lib/actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  User,
  Tag,
  Clock,
  ArrowRight,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import ReviewSection from "@/components/ReviewSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found | FamilyFans" };

  return {
    title: `${post.title} | FamilyFans Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : [],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const reviews = post ? await getReviews(post._id, "BlogPost") : [];

  if (!post) {
    notFound();
  }

  // Estimate read time
  const wordCount = post.content?.split(" ").length ?? 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="pb-24 text-slate-900 bg-[#F8FAFC]">
      {/* ── Hero Header ── */}
      <div className="w-full relative min-h-[55vh] flex flex-col justify-end overflow-hidden">
        {post.imageUrl ? (
          <>
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover brightness-[0.35]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[zinc-950] via-[zinc-950]/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[zinc-950] to-slate-800" />
        )}

        <div className="relative z-10 max-w-4xl mx-auto w-full px-6 pb-16 pt-32">
          {/* Back link */}
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Back to Blog
            </span>
          </Link>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-lime-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-xs">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt || post.createdAt).toLocaleDateString(
                undefined,
                { year: "numeric", month: "long", day: "numeric" },
              )}
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-xs">
              <Clock className="w-3.5 h-3.5" />
              {readTime} min read
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-xs">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-white/60 text-lg font-medium max-w-2xl leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </div>

      {/* ── Content Body ── */}
      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 border border-slate-100 shadow-xl shadow-slate-200/60">
          <div
            className="prose prose-slate prose-lg max-w-none
                        prose-headings:text-[zinc-950] prose-headings:font-black prose-headings:tracking-tight
                        prose-p:text-slate-600 prose-p:leading-relaxed
                        prose-strong:text-[zinc-950] prose-strong:font-bold
                        prose-a:text-lime-600 prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-2xl prose-img:border prose-img:border-slate-100
                        prose-code:bg-slate-50 prose-code:text-lime-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm
                        prose-blockquote:border-l-lime-600 prose-blockquote:bg-lime-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1
                    "
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <Tag className="w-4 h-4 text-lime-600 flex-shrink-0" />
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl hover:border-orange-300 hover:text-lime-700 transition-all cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share & Nav */}
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-lime-600 transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Articles
            </Link>
            <Link
              href="/shop"
              className="btn-primary flex items-center gap-2 !py-3 !px-8 !text-sm"
            >
              Shop Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {post?._id && (
          <div className="mt-16">
            <ReviewSection
              targetId={post._id}
              targetType="BlogPost"
              initialReviews={reviews}
            />
          </div>
        )}

        {/* CTA Bottom Banner */}
        <div className="mt-16 p-10 bg-[zinc-950] rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                Enjoyed this article?
              </h3>
              <p className="text-white/70 text-sm">
                Read more tips, guides, and product news on our blog.
              </p>
            </div>
            <Link
              href="/blog"
              className="btn-primary flex items-center gap-2 !px-10 !py-4 shadow-xl shadow-lime-600/30 flex-shrink-0"
            >
              More Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
