'use client';

import { Phone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopBar() {
  return (
    <div className="bg-zinc-950 text-white py-2 px-6 sm:px-8 border-b border-zinc-800/50 fixed top-0 w-full z-[110] h-10 flex items-center">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Announcement */}
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[lab(61.1055%_-41.0235_73.1483)] animate-pulse" />
          <span className="text-[12px] font-semibold tracking-wider text-slate-200">
            Buy 5 <span className="text-white font-bold">Get Delivery Free</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:03466140730"
            className="flex items-center gap-2 group transition-all"
          >
            <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-[lab(61.1055%_-41.0235_73.1483)] group-hover:border-[lab(61.1055%_-41.0235_73.1483)] transition-colors">
              <Phone className="w-3 h-3 text-[lab(61.1055%_-41.0235_73.1483)] group-hover:text-white transition-colors" />
            </div>
            <span className="text-[12px] font-semibold tracking-wider text-slate-300 group-hover:text-white transition-colors">
              03466140730
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
