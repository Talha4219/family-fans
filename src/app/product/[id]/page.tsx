import { getProduct, getProducts, getReviews, getBlogPosts } from "@/lib/actions";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import ProductDetailInfo from "@/components/ProductDetailInfo";
import {
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import PageAnimate from "@/components/PageAnimate";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const pId = (await params).id;
  const product = await getProduct(pId);
  const allProducts = await getProducts();
  const related = allProducts
    .filter((p) => p.category === product?.category && p.id !== pId)
    .slice(0, 4);
  const reviews = await getReviews(pId, "Product");
  const blogPosts = await getBlogPosts();

  if (!product) notFound();

  return (
    <PageAnimate>
      <div className="bg-white min-h-screen">
        {/* Navigation / Breadcrumb */}
        <div className="py-6 border-b border-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
               <div className="flex items-center gap-2">
                 <Link href="/" className="hover:text-blue-500 transition-colors">
                   <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                   </svg>
                 </Link>
                 <span>/</span>
                 <Link href="/shop" className="hover:text-blue-500 transition-colors uppercase tracking-widest text-[9px]">
                   {product.category || "Shop"}
                 </Link>
                 <span>/</span>
                 <span className="text-zinc-950 font-black uppercase tracking-widest text-[9px] truncate max-w-[200px]">
                   {product.name}
                 </span>
               </div>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
            {/* Left Column: Image Gallery */}
            <div>
              <ProductGallery
                mainImage={product.imageUrl}
                additionalImages={product.images}
                productName={product.name}
              />
            </div>

            {/* Right Column: Product Info */}
            <ProductDetailInfo product={product} />
          </div>

          {/* Related Products */}
          <section className="mt-32 pt-24 border-t border-slate-100">
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-2xl font-black text-zinc-950 tracking-tighter uppercase italic">
                You May Also Like
              </h2>
              <Link
                href="/shop"
                className="text-[10px] font-black text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-2 uppercase tracking-widest"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.length > 0 ? (
                related.map((p) => <ProductCard key={p.id} product={p} />)
              ) : (
                <div className="col-span-full py-24 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    Discovering similar brilliance...
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </PageAnimate>
  );
}
