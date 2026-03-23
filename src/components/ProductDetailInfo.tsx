"use client";

import { useState } from "react";
import { 
  Minus, 
  Plus, 
  Share2, 
  Facebook, 
  Instagram, 
  Twitter, 
  Send,
  Truck,
  ShieldCheck,
  CreditCard,
  Search
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import ProductSpecsTable from "./ProductSpecsTable";

interface ProductDetailInfoProps {
  product: Product;
}

export default function ProductDetailInfo({ product }: ProductDetailInfoProps) {
  const dispatch = useDispatch();
  const dynamicSizes = product.variations?.find(v => v.type === 'size')?.options || [];
  const dynamicColors = product.variations?.find(v => v.type === 'color')?.options || [];

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState(dynamicSizes[0] || "Standard");
  const [selectedColor, setSelectedColor] = useState(dynamicColors[0] || "Standard");
  const [added, setAdded] = useState(false);

  const finalPrice = product.isOnSale && product.salePrice ? product.salePrice : product.price;

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: finalPrice,
      imageUrl: product.imageUrl,
      quantity,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));


  return (
    <div className="space-y-8">
      {/* Top Badges & Title */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-green-500 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">
          In stock
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tighter uppercase leading-tight">
          {product.name}
        </h1>
        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
          SKU: {product.sku || "ROYAL-PETITE-BRACKET-FAN-12/COPPER-(OFF-WHITE)-0000001"}
        </p>
        <p className="text-xl font-black text-blue-600">
          Rs.{finalPrice.toLocaleString()}.00
        </p>
      </div>

      {/* Options Pickers */}
      <div className="space-y-6">
        {dynamicSizes.length > 0 && (
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Size: {selectedSize}</p>
            <div className="flex flex-wrap gap-3">
              {dynamicSizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 rounded-full border text-xs font-black uppercase transition-all ${
                    selectedSize === size ? "border-zinc-950 bg-zinc-950 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {dynamicColors.length > 0 && (
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Color: {selectedColor}</p>
            <div className="flex flex-wrap gap-3">
              {dynamicColors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-6 py-2 rounded-full border text-xs font-black uppercase transition-all ${
                    selectedColor === color ? "border-zinc-950 bg-zinc-950 text-white" : "border-slate-200 text-slate-600 hover:border-slate-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Short Description */}
      <p className="text-zinc-600 text-sm leading-relaxed max-w-lg">
        {product.shortDescription || product.description?.substring(0, 160) + "..." || "Experience the perfect blend of performance and elegance with our premium fans, designed for ultimate comfort."}
      </p>

      {/* Quantity & Add to Cart */}
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity:</p>
          <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={decrement} className="p-3 hover:bg-slate-50 transition-colors border-r border-slate-100">
              <Minus className="w-4 h-4 text-slate-400" />
            </button>
            <span className="px-6 py-3 text-sm font-black text-zinc-950 w-12 text-center">{quantity}</span>
            <button onClick={increment} className="p-3 hover:bg-slate-50 transition-colors border-l border-slate-100">
              <Plus className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>


        {/* Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-zinc-950 text-white rounded-xl py-4 font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors shadow-xl shadow-zinc-950/20"
          >
            {added ? "Added ✓" : "Add To Cart"}
          </button>
        </div>
      </div>

      {/* Share Section */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Share</span>
          <div className="flex items-center gap-3">
            <Facebook className="w-4 h-4 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
            <Twitter className="w-4 h-4 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors" />
            <Instagram className="w-4 h-4 text-slate-400 hover:text-pink-600 cursor-pointer transition-colors" />
            <Send className="w-4 h-4 text-slate-400 hover:text-blue-500 cursor-pointer transition-colors" />
          </div>
        </div>
        <Link href="/contact" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline">
          Need help?
        </Link>
      </div>

      {/* Tabs Layout */}
      <div className="mt-12 space-y-12">
        <div className="flex justify-center border-b border-slate-100">
          <button 
            onClick={() => setActiveTab("description")}
            className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
              activeTab === "description" ? "text-blue-500" : "text-slate-400"
            }`}
          >
            Description
            {activeTab === "description" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
          </button>
          <button 
            onClick={() => setActiveTab("specifications")}
            className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
              activeTab === "specifications" ? "text-blue-500" : "text-slate-400"
            }`}
          >
            Specifications
            {activeTab === "specifications" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
          </button>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 pb-24">
          {activeTab === "description" ? (
            <div className="space-y-10">
              <div 
                className="text-zinc-600 text-sm leading-relaxed text-center max-w-3xl mx-auto whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: product.description || "" }}
              />
              
              {!product.description && product.category?.toLowerCase() === 'fans' && (
                <p className="text-zinc-600 text-sm leading-relaxed text-center">
                  Be it your corridor, terrace, lobby, or veranda, the <span className="font-black text-zinc-950">Royal {product.name}</span> is the best fit any place where space is limited. With its <span className="font-black text-zinc-950">small wing blades</span> and <span className="font-black text-zinc-950">alluring shades</span>, this fan is a <span className="font-black text-zinc-950">petite powerhouse</span>.
                </p>
              )}
              
              {product.category?.toLowerCase() === 'fans' && (
                <>
                  <div className="flex justify-center flex-col items-center">
                    <div className="w-full h-px bg-slate-100 my-4" />
                    <p className="text-zinc-500 text-center max-w-2xl text-xs leading-relaxed">
                      {product.brand || "Our"} Fans are carefully crafted to comfort you in the <span className="font-black text-zinc-950">hot summer days</span>. The <span className="font-black text-zinc-950">attractive design</span> and <span className="font-black text-zinc-950">energy-saving technology</span> is a relief worth enjoying. Whenever the fan is turned on it casts a spell of peace and convenience.
                    </p>
                  </div>

                  {/* Certification Logos */}
                  <div className="flex justify-center items-center gap-8 py-8 grayscale opacity-50 contrast-125">
                     <Image src="/logos/neeca.png" alt="NEECA" width={60} height={30} className="h-4 w-auto object-contain" />
                     <Image src="/logos/pcsir.png" alt="PCSIR" width={60} height={30} className="h-4 w-auto object-contain" />
                     <Image src="/logos/psqca.png" alt="PSQCA" width={60} height={30} className="h-4 w-auto object-contain" />
                     <div className="text-[10px] font-black uppercase text-zinc-400 border border-zinc-200 px-2 py-0.5 rounded text-center">
                       {product.warranty?.period || "Life Time"} <span className="text-[8px] font-medium block">{product.warranty?.type || "Guarantee"}</span>
                     </div>
                  </div>

                  <p className="text-zinc-500 text-center max-w-3xl mx-auto text-xs leading-relaxed">
                    All <span className="font-black text-zinc-950">{product.brand || "Royal"} Fans</span> are made with <span className="font-black text-zinc-950 text-blue-900 border-b border-blue-900">Electrical Steel Sheet</span> and winded with <span className="font-black text-zinc-950">99.99% pure copper wire</span> to ensure the best <span className="font-black text-zinc-900 text-blue-900 border-b border-blue-900 underline">electrical efficiency</span> and <span className="font-black text-zinc-950">service value</span>.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-10">
              {product.category?.toLowerCase() === 'fans' ? (
                <>
                  <div className="pt-4">
                    <ProductSpecsTable specs={[
                      { 
                        size: product.specifications?.["Size"] || product.specifications?.["size"] || "N/A", 
                        sweepSize: product.specifications?.["Sweep Size"] || product.specifications?.["sweep size"] || "N/A", 
                        ratedPower: product.specifications?.["Rated Power"] || product.specifications?.["power"] || "N/A", 
                        speed: product.specifications?.["Speed"] || product.specifications?.["speed"] || "N/A", 
                        airDelivery: product.specifications?.["Air Delivery"] || product.specifications?.["air delivery"] || "N/A", 
                        serviceValue: product.specifications?.["Service Value"] || product.specifications?.["service value"] || "N/A" 
                      }
                    ]} />
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mt-8">
                    <p className="text-[10px] font-black text-center text-zinc-400 uppercase tracking-widest leading-relaxed">
                      Rated Voltage: 230±10V | Rated Frequency: 50 Hz | Insulation Class: 155 | All specifications are subject to change for improvement.
                    </p>
                  </div>
                </>
              ) : (
                <div className="max-w-2xl mx-auto border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                  <div className="bg-slate-50 px-8 py-4 border-b border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Technical Parameters</p>
                  </div>
                  <div className="divide-y divide-slate-50">
                    {product.specifications && Object.entries(product.specifications).length > 0 ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-2 px-8 py-4 hover:bg-slate-50/50 transition-colors">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{key}</span>
                          <span className="text-xs font-black text-zinc-950">{String(value)}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-8 py-12 text-center text-slate-400 uppercase font-black tracking-widest text-[10px]">
                        No specific documentation available for this model yet.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Icon Links */}
          <div className="flex items-center justify-center gap-12 pt-16 border-t border-slate-100">
             <div className="flex items-center gap-2 text-slate-400 group cursor-pointer">
                <Truck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest underline group-hover:text-blue-500 transition-colors">Shipping & Returns</span>
             </div>
             <div className="flex items-center gap-2 text-slate-400 group cursor-pointer">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest underline group-hover:text-blue-500 transition-colors">Warranty</span>
             </div>
             <div className="flex items-center gap-2 text-slate-400 group cursor-pointer">
                <CreditCard className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest underline group-hover:text-blue-500 transition-colors">Secure Payment</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
