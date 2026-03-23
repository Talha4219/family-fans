'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface ProductGalleryProps {
  mainImage: string;
  additionalImages?: string[];
  productName: string;
}

export default function ProductGallery({ 
  mainImage, 
  additionalImages = [], 
  productName
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const allImages = [mainImage, ...additionalImages].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Main Image Display */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm group cursor-zoom-in">
        <Image
          src={selectedImage}
          alt={productName}
          fill
          className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
          priority
        />
        
        {/* Search Icon Overlay */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full border border-slate-100 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <Search className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-white border-2 transition-all cursor-pointer ${
                selectedImage === img 
                  ? "border-blue-500" 
                  : "border-slate-100 hover:border-slate-200"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
