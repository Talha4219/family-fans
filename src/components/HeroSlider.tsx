"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Zap } from "lucide-react";

const images = [
  {
    src: "/hero/familyfan.jpg",
    title: "AeroStream Pro",
    subtitle: "Premium Tower Cooling",
  },
  {
    src: "/hero/only-cooler.jpg",
    title: "ThermalCore Elite",
    subtitle: "Advanced Convection Heating",
  },
  {
    src: "/hero/cooler-5.webp",
    title: "PureFlow Matrix",
    subtitle: "HEPA-13 Air Filtration",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-80 h-80 lg:w-[32rem] lg:h-[32rem] group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-600/30 to-transparent rounded-[4rem] rotate-6 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* Container */}
      <div className="relative w-full h-full bg-white/5 rounded-[4rem] border border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl shadow-[lab(8_1.93_-14.95)]/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[index].src}
              alt={images[index].title}
              fill
              className="object-cover transition-transform duration-[10s] ease-linear scale-110 group-hover:scale-125"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[lab(8_1.93_-14.95)]/80 via-[lab(8_1.93_-14.95)]/20 to-transparent" />

            {/* Text Overlay */}
            <div className="absolute bottom-10 left-10 right-10 space-y-2 text-left">
              <div className="flex items-center gap-2 text-lime-500 mb-1">
                <Zap className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Next-Gen Hardware</span>
              </div>
              <p className="text-2xl lg:text-3xl font-heading font-black text-white tracking-tighter uppercase leading-none">
                {images[index].title.split(" ").map((word, i) => (
                  <span key={i} className={i === 1 ? "text-lime-500 font-heading" : ""}>{word} </span>
                ))}
              </p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                {images[index].subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Indicators */}
        <div className="absolute top-10 right-10 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-8 h-1 rounded-full transition-all duration-500 ${i === index ? "bg-lime-500 w-12" : "bg-white/20"
                }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
