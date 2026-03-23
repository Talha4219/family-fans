"use client";
import { Zap, ShieldCheck, Wind, Leaf, Star, ArrowRight, Mail, Quote, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { subscribeToNewsletter, getLatestDeal } from "@/lib/actions";
import { Product, Testimonial, BlogPost, Deal } from "@/lib/types";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

export function BenefitsSection() {
  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-[lab(61.1055%_-41.0235_73.1483)]" />,
      title: "Energy Efficient",
      desc: "Save up to 60% on bills",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[lab(61.1055%_-41.0235_73.1483)]" />,
      title: "5 Year Warranty",
      desc: "Guaranteed durability",
    },
    {
      icon: <Wind className="w-8 h-8 text-[lab(61.1055%_-41.0235_73.1483)]" />,
      title: "Quiet Operation",
      desc: "Under 35dB noise level",
    },
    {
      icon: <Leaf className="w-8 h-8 text-[lab(61.1055%_-41.0235_73.1483)]" />,
      title: "Eco-Friendly",
      desc: "Sustainable materials",
    },
  ];
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-12">
      {benefits.map((b, i) => (
        <div
          key={i}
          className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 text-center space-y-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group"
        >
          <div className="flex justify-center transition-transform duration-500 group-hover:scale-110">{b.icon}</div>
          <h3 className="font-heading font-black text-sm uppercase tracking-widest text-zinc-950">{b.title}</h3>
          <p className="text-xs font-medium text-slate-400 tracking-widest leading-relaxed">
            {b.desc}
          </p>
        </div>
      ))}
    </section>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <p className="text-[10px] font-black text-lime-600 uppercase tracking-[0.3em]">Voices of trust</p>
        <h2 className="text-4xl font-heading font-black text-zinc-950 tracking-tighter uppercase">
          Product <span className="text-lime-600 font-heading">Proof</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {testimonials.slice(0, 3).map((t) => (
          <motion.div
            key={t._id || t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] p-10 space-y-8 relative border border-slate-50 shadow-xl shadow-slate-900/5 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-100'}`} />
                ))}
              </div>
              <div className="flex items-center gap-1.5 bg-lime-50 text-lime-600 px-3 py-1 rounded-full border border-lime-100/50">
                <CheckCircle className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-widest">Verified Buyer</span>
              </div>
            </div>

            <p className="text-zinc-950 font-heading font-black text-lg leading-[1.3] uppercase tracking-tighter">
              "{t.content}"
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-black text-slate-400 uppercase text-xs">
                {t.name.charAt(0)}
              </div>
              <div className="flex flex-col">
                <p className="font-black text-xs text-zinc-950 uppercase tracking-widest">
                  {t.name}
                </p>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">
                  {t.designation}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="space-y-12">
      <div className="flex items-center justify-between px-4">
        <div>
          <p className="text-[10px] font-black text-lime-600 uppercase tracking-[0.3em] mb-2">Knowledge Base</p>
          <h2 className="text-4xl font-black text-zinc-950 tracking-tighter uppercase">
            Tips & <span className="text-lime-600">Insights</span>
          </h2>
        </div>
        <Link href="/blog" className="text-xs font-black text-lime-600 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {posts.slice(0, 3).map((post) => (
          <Link key={post.id || post._id || post.slug} href={`/blog/${post.slug}`} className="group space-y-6">
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
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 border border-whiteShadow">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-950">{post.category}</span>
              </div>
            </div>
            <div className="space-y-3 px-2">
              <h3 className="text-xl font-black text-zinc-950 tracking-tighter uppercase leading-tight line-clamp-2 transition-colors group-hover:text-lime-600">
                {post.title}
              </h3>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const res = await subscribeToNewsletter(email);
    setLoading(false);
    if (res.success) {
      setStatus({ type: 'success', message: res.message });
      setEmail("");
    } else {
      setStatus({ type: 'error', message: res.message });
    }
  }

  return (
    <section className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden border border-white/5 shadow-2xl shadow-slate-950/50">
      <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none">
        <Mail className="w-48 h-48 text-white" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
            Stay <span className="text-[lab(61.1055%_-41.0235_73.1483)]">Updated</span>
          </h2>
          <p className="text-slate-400 font-medium text-base uppercase tracking-widest">
            Engineering Insights directly to your inbox.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-black uppercase tracking-widest text-white focus:ring-2 focus:ring-[lab(61.1055%_-41.0235_73.1483)]/20 focus:border-[lab(61.1055%_-41.0235_73.1483)]/30 outline-none transition-all placeholder:text-slate-600"
              required
            />
            <button
              disabled={loading}
              className="btn-primary !px-10 !py-4 !rounded-xl text-xs uppercase tracking-widest font-black shadow-xl shadow-[lab(61.1055%_-41.0235_73.1483)]/20 disabled:opacity-50"
            >
              {loading ? 'Synchronizing...' : 'Subscribe'}
            </button>
          </form>

          {status && (
            <div className={`p-3 rounded-xl border ${status.type === 'success' ? 'bg-lime-500/10 border-lime-500/20 text-lime-500' : 'bg-red-500/10 border-red-500/20 text-red-500'} text-[10px] font-black uppercase tracking-widest`}>
              {status.message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function FlashDealsBanner({ initialDeal }: { initialDeal?: Deal | null }) {
  const [deal, setDeal] = useState<Deal | null>(initialDeal || null);
  const [timeLeft, setTimeLeft] = useState({ hrs: '00', min: '00', sec: '00' });

  useEffect(() => {
    if (!initialDeal) {
      getLatestDeal().then(setDeal);
    }
  }, [initialDeal]);

  useEffect(() => {
    if (!deal || !deal.endDate) return;

    const timer = setInterval(() => {
      const target = new Date(deal.endDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ hrs: '00', min: '00', sec: '00' });
        return;
      }

      const hrs = Math.floor(difference / (1000 * 60 * 60));
      const min = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        hrs: hrs.toString().padStart(2, '0'),
        min: min.toString().padStart(2, '0'),
        sec: sec.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [deal]);

  if (!deal) return null;

  return (
    <section className="bg-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden border border-slate-50 shadow-2xl shadow-slate-200/50 mx-2 md:mx-0 group">
      <div className="absolute inset-0 bg-gradient-to-r from-lime-600/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-4 text-center md:text-left flex-1">
          <div className="inline-flex items-center gap-2 bg-zinc-950 text-[lab(61.1055%_-41.0235_73.1483)] px-4 py-2 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em] border border-white/5 shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-[lab(61.1055%_-41.0235_73.1483)] animate-pulse" />
            Flash Transmission
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase leading-[0.9]">
            {deal.title.split(' ').slice(0, 2).join(' ')} <br /><span className="text-[lab(61.1055%_-41.0235_73.1483)] font-heading">{deal.title.split(' ').slice(2).join(' ')}</span>
          </h2>
          <p className="text-slate-400 font-medium uppercase tracking-[0.2em] text-xs">
            Get {deal.discountValue}{deal.discountType === 'percentage' ? '%' : ' ' + (deal as any).currency || 'Rs.'} off. Limited availability.
          </p>
        </div>
        <div className="flex gap-4">
          {[timeLeft.hrs, timeLeft.min, timeLeft.sec].map((val, i) => (
            <div key={i} className="bg-zinc-950 border border-white/5 rounded-[2rem] w-24 h-24 flex flex-col items-center justify-center text-white shadow-2xl">
              <p className="text-3xl font-black tracking-tighter text-[lab(61.1055%_-41.0235_73.1483)]">{val}</p>
              <p className="text-[8px] uppercase tracking-widest font-black text-slate-700">{['Hrs', 'Min', 'Sec'][i]}</p>
            </div>
          ))}
        </div>
        <Link href="/shop" className="btn-primary !px-12 !py-6 !rounded-[2.5rem] shadow-2xl shadow-lime-600/30 hover:scale-105 transition-transform">
          Snap the Deal
        </Link>
      </div>
    </section>
  );
}

export function PopularProductsSection({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="space-y-12">
      <div className="flex items-center justify-between px-4">
        <div>
          <p className="text-[10px] font-black text-lime-600 uppercase tracking-[0.3em] mb-2">Trend Alert</p>
          <h2 className="text-4xl font-black text-zinc-950 tracking-tighter uppercase">
            Best <span className="text-lime-600">Sellers</span>
          </h2>
        </div>
        <Link href="/shop" className="text-xs font-black text-lime-600 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2">
          Browse All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
