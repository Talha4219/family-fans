import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-zinc-950 overflow-hidden relative border border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 opacity-50" />
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          {/* Abstract decoration */}
          <div className="w-[600px] h-[600px] rounded-full border border-white/20 -mt-64 -mr-64" />
          <div className="w-[400px] h-[400px] rounded-full border border-white/20 absolute top-24 right-24" />
        </div>
        
        <div className="relative z-10 p-10 md:p-14 flex flex-col items-center text-center">
          <p className="text-[9px] font-black text-[lab(61.1055%_-41.0235_73.1483)] uppercase tracking-[0.3em] mb-4">
            Upgrade Your Lifestyle
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mb-6 max-w-2xl leading-tight">
            Experience The Difference Of A <span className="text-[lab(61.1055%_-41.0235_73.1483)]">Premium</span> Appliance
          </h2>
          <p className="text-zinc-400 font-medium text-base mb-10 max-w-xl">
            Join thousands of satisfied customers who trust FamilyFans for superior cooling, heating, and energy efficiency.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link 
              href="/shop" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest bg-[lab(61.1055%_-41.0235_73.1483)] text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-[lab(61.1055%_-41.0235_73.1483)]/20"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest bg-zinc-900 text-white border border-zinc-800 px-8 py-4 rounded-xl hover:bg-zinc-800 transition-all hover:scale-105"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
