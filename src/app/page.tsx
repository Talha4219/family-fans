import { getProducts, getCategoryTree, getTestimonials, getBlogPosts, getLatestDeal } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { BenefitsSection, FlashDealsBanner, PopularProductsSection, TestimonialsSection, BlogSection, NewsletterSection } from "@/components/HomeSections";
import WhyChooseUs from "@/components/WhyChooseUs";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Truck,
  Cpu,
} from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import type { Metadata } from "next";
import { Product, Category } from "@/lib/types";

export const metadata: Metadata = {
  title: "FamilyFans | Premium Home Appliances",
  description:
    "Shop premium fans, heaters and home appliances at FamilyFans. Energy efficient, quiet, and beautifully designed.",
};

export default async function Home() {
  const [products, categories, testimonials, blogPosts, latestDeal] = await Promise.all([
    getProducts(),
    getCategoryTree(),
    getTestimonials(true),
    getBlogPosts(),
    getLatestDeal(),
  ]);

  const featuredProducts = products
    .filter((p: Product) => p.isFeatured || p.isOnSale)
    .slice(0, 8);
  const displayProducts =
    featuredProducts.length > 0 ? featuredProducts : products.slice(0, 8);

  const popularProducts = [...products]
    .sort((a, b) => (b.numReviews || 0) - (a.numReviews || 0))
    .slice(0, 4);

  const featuredCategories = categories.slice(0, 3);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* ── Hero Carousel ────────────────────────────────── */}
      <HeroCarousel />


      {/* ── Benefits ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <BenefitsSection />
      </section>

      {/* ── Popular Products ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <PopularProductsSection products={popularProducts} />
      </section>

      {/* ── Categories ──────────────────────────────────── */}
      {featuredCategories.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[10px] font-black text-[lab(61.1055%_-41.0235_73.1483)] uppercase tracking-[0.3em] mb-2">Browse By</p>
              <h2 className="text-3xl font-heading font-black text-zinc-950 tracking-tighter uppercase">
                Shop Categories
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm font-black text-[lab(61.1055%_-41.0235_73.1483)] hover:opacity-80 transition-colors flex items-center gap-2"
            >
              All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((cat: Category, idx: number) => {
              const bgStyles = [
                { bg: 'bg-[#99b5ad]', series: 'SMART SERIES' },
                { bg: 'bg-[#92afc2]', series: 'DELUXE SERIES' },
                { bg: 'bg-[#b09e93]', series: 'DELUXE SERIES' },
              ];
              const style = bgStyles[idx % bgStyles.length];

              return (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className={`group relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden ${style.bg} transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 block border border-white/10`}
                >
                  {/* Text Overlay at Top */}
                  <div className="relative z-20 flex flex-col items-center text-center pt-12 px-8">
                    <p className="text-[10px] font-black text-white/80 uppercase tracking-[0.25em] mb-3">
                      {style.series}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-6 px-4">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-6 text-[11px] font-bold text-white tracking-widest uppercase">
                      <span className="flex items-center gap-1 hover:opacity-70 transition-opacity">Learn More <span className="text-[8px] opacity-60">▶</span></span>
                      <span className="flex items-center gap-1 hover:opacity-70 transition-opacity">Buy Now <span className="text-[8px] opacity-60">▶</span></span>
                    </div>
                  </div>

                  {/* Product Image at Bottom */}
                  {cat.imageUrl && (
                    <div className="absolute bottom-0 left-0 right-0 h-[65%] w-full">
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        fill
                        className="object-contain object-bottom p-4 group-hover:scale-110 transition-transform duration-1000 ease-out drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]"
                      />
                    </div>
                  )}
                  
                  {/* Subtle Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Flash Deals Banner ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <FlashDealsBanner initialDeal={latestDeal} />
      </section>

      {/* ── Featured Products ────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-[10px] font-black text-[lab(61.1055%_-41.0235_73.1483)] uppercase tracking-[0.3em] mb-2">
              {displayProducts.some((p: Product) => p.isOnSale) ? "Limited Offers" : "Premium Picks"}
            </p>
            <h2 className="text-3xl font-heading font-black text-zinc-950 tracking-tighter uppercase">
              Featured Products
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-black text-[lab(61.1055%_-41.0235_73.1483)] hover:opacity-80 transition-colors flex items-center gap-2"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] border border-slate-100 p-24 text-center">
            <Zap className="w-12 h-12 text-slate-200 mx-auto mb-6" />
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs mb-4">
              No products yet
            </p>
            <p className="text-slate-300 text-sm font-medium mb-8 uppercase tracking-widest">
              Add products via the admin dashboard to get started.
            </p>
            <Link href="/admin" className="btn-primary">
              Go to Admin
            </Link>
          </div>
        )}
      </section>

      {/* ── Testimonials ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24 leading-none">
        <TestimonialsSection testimonials={testimonials} />
      </section>

      {/* ── Why Choose Us ───────────────────────────────── */}
      <WhyChooseUs />

      {/* ── FAQ ─────────────────────────────────────────── */}
      <FaqSection />

      {/* ── Blog ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <BlogSection posts={blogPosts} />
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <CtaSection />
      </section>

      {/* ── Newsletter ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <NewsletterSection />
      </section>
    </div>
  );
}
