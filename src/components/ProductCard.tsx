"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { ShoppingCart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { CartItem } from "@/store/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const finalPrice =
    product.isOnSale && product.salePrice ? product.salePrice : product.price;
  const hasDiscount = product.isOnSale && finalPrice < product.price;
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: finalPrice,
      imageUrl: product.imageUrl,
      quantity: 1,
    };
    dispatch(addItem(item));
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      className="group block h-full"
    >
      {" "}
      <Link href={`/product/${product.id}`} className="h-full block">
        {" "}
        <div className="card h-full flex flex-col hover:shadow-premium transition-shadow duration-300">
          {" "}
          {/* Image */}{" "}
          <div className="relative w-full aspect-square bg-[#F1F5F9] overflow-hidden">
            {" "}
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />{" "}
            {/* Sale/Flash Badge — Disabled per blog focus transition */}{" "}
            {/* {(product.deal || product.isOnSale) && ( <div className="absolute top-4 left-4 z-10 flex flex-col gap-1"> {product.deal ? ( <span className="px-4 py-1.5 bg-[zinc-950] text-lime-600 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-2xl border border-lime-600/20 flex items-center gap-2"> <div className="w-1.5 h-1.5 rounded-full bg-lime-600 animate-pulse" /> Flash Node </span> ) : ( <span className="px-4 py-1.5 bg-lime-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-2xl"> Optimization </span> )} </div> )} */}{" "}
            {/* Quick Add — Animated Slide-up */}{" "}
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1] opacity-0 group-hover:opacity-100">
              {" "}
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary !py-4 shadow-2xl shadow-lime-600/40"
              >
                {" "}
                <ShoppingCart className="w-4 h-4" />{" "}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Add to Cart
                </span>{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          {/* Info */}{" "}
          <div className="p-6 flex flex-col flex-grow gap-4">
            {" "}
            <div>
              {" "}
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-600
 mb-1">
                {" "}
                {product.category}{" "}
              </p>{" "}
              <h3 className="text-sm font-black text-zinc-950 line-clamp-2 leading-relaxed uppercase">
                {" "}
                {product.name}{" "}
              </h3>{" "}
            </div>{" "}
            {/* Rating */}{" "}
            {!!product.rating && (
              <div className="flex items-center gap-2">
                {" "}
                <div className="flex items-center gap-0.5">
                  {" "}
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(product.rating!) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                    />
                  ))}{" "}
                </div>{" "}
                {product.numReviews != null && (
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    {product.numReviews} Reviews
                  </span>
                )}{" "}
              </div>
            )}{" "}
            {/* Price + Add to Cart */}{" "}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
              {" "}
              <div className="flex flex-col">
                {" "}
                {hasDiscount && (
                  <span className="text-[10px] font-bold text-slate-300 line-through">
                    {" "}
                  Rs. {product.price.toLocaleString()}{" "}
                </span>
              )}{" "}
              <span className="text-xl font-black text-zinc-950 tracking-tighter">
                {" "}
                Rs. {finalPrice.toLocaleString()}{" "}
              </span>{" "}
              </div>{" "}
              <button
                onClick={handleAddToCart}
                className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all duration-300 border border-zinc-100"
                aria-label="Add to cart"
              >
                {" "}
                <ShoppingCart className="w-4 h-4" />{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </Link>{" "}
    </motion.div>
  );
}
