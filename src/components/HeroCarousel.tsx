"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, TrendingUp, VolumeX, Shield, Zap, Battery, Sparkles } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    bgImage: "/hero/hero-4.png",
    bgClass: "bg-cover bg-center lg:bg-left",
    gradient: "bg-gradient-to-r from-white via-white/80 to-transparent",
    align: "left",
    content: (
      <div className="w-full lg:w-[65%] xl:w-[55%] space-y-10 pl-0 lg:pl-10 text-left flex flex-col items-start">
        <h1 className="text-2xl sm:text-4xl lg:text-[62px] font-bold text-[#333] leading-[1.15] tracking-tight">
          Stay Cool All <span className="text-[lab(61.1055%_-41.0235_73.1483)]">Summer!</span> <br />
          BLDC Air Cooler for <br />
          Ultimate Indoor Comfort.
        </h1>

        <div className="flex flex-wrap items-center justify-start gap-6 lg:gap-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[lab(61.1055%_-41.0235_73.1483)] flex items-center justify-center bg-white shadow-sm">
              <TrendingUp className="w-6 h-6 text-[lab(61.1055%_-41.0235_73.1483)]" />
            </div>
            <p className="text-[13px] sm:text-[15px] font-semibold text-[#333] leading-tight">
              Energy Saving <br /> 90%
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[lab(61.1055%_-41.0235_73.1483)] flex items-center justify-center bg-white shadow-sm">
              <Cpu className="w-6 h-6 text-[lab(61.1055%_-41.0235_73.1483)]" />
            </div>
            <p className="text-[13px] sm:text-[15px] font-semibold text-[#333] leading-tight">
              Smart <br /> Inverter Motor
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-[lab(61.1055%_-41.0235_73.1483)] flex items-center justify-center bg-white shadow-sm">
              <VolumeX className="w-6 h-6 text-[lab(61.1055%_-41.0235_73.1483)]" />
            </div>
            <p className="text-[13px] sm:text-[15px] font-semibold text-[#333] leading-tight">
              Silent <br /> Operation
            </p>
          </div>
        </div>

        <Link
          href="/shop"
          className="inline-block bg-[lab(61.1055%_-41.0235_73.1483)] text-white font-bold text-[15px] sm:text-lg px-10 py-4 sm:px-12 sm:py-5 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-lg tracking-wide uppercase"
        >
          Shop Now
        </Link>
      </div>
    ),
  },
  {
    id: 2,
    bgImage: "/hero/hero-5.png", // Default image, you can replace with the 5-blade fan image
    bgClass: "bg-cover bg-center lg:bg-right",
    gradient: "bg-gradient-to-r from-white via-white/80 to-transparent",
    align: "left",
    content: (
      <div className="w-full lg:w-[55%] space-y-10 pl-0 lg:pl-10 text-left flex flex-col items-start">
        <h1 className="text-2xl sm:text-4xl lg:text-[48px] xl:text-[56px] font-normal text-[#333] leading-[1.2] tracking-tight">
          Smart <span className="text-[lab(61.1055%_-41.0235_73.1483)] font-bold">Heating</span> Solutions <br />
          offering consistent warmth <br />
          & low energy <span className="font-bold text-[lab(61.1055%_-41.0235_73.1483)]">consumption.</span>
        </h1>

        <Link
          href="/shop"
          className="inline-block bg-[lab(61.1055%_-41.0235_73.1483)] text-white font-bold text-[15px] sm:text-lg px-10 py-4 sm:px-12 sm:py-5 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-lg tracking-wide uppercase"
        >
          SHOP NOW
        </Link>
      </div>
    ),
  },
  {
    id: 3,
    bgImage: "/hero/hero-6.png",
    bgClass: "bg-cover bg-center lg:bg-right",
    gradient: "bg-gradient-to-r from-white via-white/80 to-transparent",
    align: "left",
    content: (
      <div className="w-full lg:w-[65%] pt-10 sm:pt-0 flex flex-col items-start justify-center text-left space-y-8">
        {/* Features Row */}
        <div className="flex flex-wrap justify-start gap-4 sm:gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[lab(61.1055%_-41.0235_73.1483)] flex items-center justify-center bg-white shadow-sm">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-[lab(61.1055%_-41.0235_73.1483)]" />
            </div>
            <p className="text-[11px] sm:text-[13px] font-bold text-[#333] leading-tight">
              Rust Free <br /> Body
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[lab(61.1055%_-41.0235_73.1483)] flex items-center justify-center bg-white shadow-sm">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[lab(61.1055%_-41.0235_73.1483)]" />
            </div>
            <p className="text-[11px] sm:text-[13px] font-bold text-[#333] leading-tight">
              Energy <br /> Efficient
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[lab(61.1055%_-41.0235_73.1483)] flex items-center justify-center bg-white shadow-sm">
              <Battery className="w-6 h-6 sm:w-8 sm:h-8 text-[lab(61.1055%_-41.0235_73.1483)]" />
            </div>
            <p className="text-[11px] sm:text-[13px] font-bold text-[#333] leading-tight">
              Run On <br /> Inverter
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 border-[lab(61.1055%_-41.0235_73.1483)] flex items-center justify-center bg-white shadow-sm">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[lab(61.1055%_-41.0235_73.1483)]" />
            </div>
            <p className="text-[11px] sm:text-[13px] font-bold text-[#333] leading-tight">
              Easy To <br /> Clean
            </p>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-4">
          <p className="text-xl sm:text-3xl lg:text-5xl italic font-serif text-[#333] leading-tight tracking-wide">
            Next Gen BLDC Fans
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-black text-[lab(61.1055%_-41.0235_73.1483)] leading-[1.1] tracking-tighter">
            For Home & Office
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl">
            Superior air flow, minimal noise, low power consumption <br className="hidden lg:block" />
            and high power factor fan kits.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-block bg-[lab(61.1055%_-41.0235_73.1483)] text-white font-bold text-sm sm:text-lg px-8 py-3.5 sm:px-12 sm:py-5 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-lg tracking-wide uppercase mt-4"
        >
          SHOP NOW
        </Link>
      </div>
    ),
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#fcfcfc] overflow-hidden min-h-[500px] lg:min-h-[650px] flex items-center pt-[120px] sm:pt-[170px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center"
        >
          {/* Background Image Setup */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#fcfcfc]">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 10, ease: "linear" }}
              className={`absolute inset-0 bg-no-repeat ${slides[index].bgClass}`}
              style={{ backgroundImage: `url(${slides[index].bgImage})` }}
            />
            {/* Gradient overlay to ensure text is readable based on alignment */}
            <div className={`absolute inset-0 ${slides[index].gradient} z-10 pointer-events-none`} />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 sm:py-20">
            <motion.div
              initial={{ opacity: 0, x: slides[index].align === 'right' ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className={`w-full flex ${slides[index].align === 'right' ? 'justify-end' : slides[index].align === 'center' ? 'justify-center' : 'justify-start'}`}
            >
              {slides[index].content}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === index ? 'bg-[#333] scale-125' : 'bg-[#333]/30 hover:bg-[#333]/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
