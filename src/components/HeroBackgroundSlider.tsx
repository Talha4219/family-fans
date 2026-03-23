"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/hero/hero-1.jpg",
  "/hero/hero-2.webp",
  "/hero/hero-3.webp",
  "/hero/hero-1.jpg",
  "/hero/hero-1.jpg"
];

export default function HeroBackgroundSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#fcfcfc]">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center lg:bg-left bg-no-repeat transition-transform duration-[10000ms] ease-linear hover:scale-105"
            style={{ backgroundImage: `url(${images[index]})` }}
          />
        </motion.div>
      </AnimatePresence>
      {/* Gradient overlay to ensure text is readable on the right side */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white z-10 pointer-events-none" />
    </div>
  );
}
