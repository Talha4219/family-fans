"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const PRODUCT_FAQS = [
  {
    q: "Are your fans energy efficient?",
    a: "Yes, all FamilyFans products are engineered with high-efficiency motors that consume up to 40% less energy than standard fans, helping you save on electricity bills while staying cool."
  },
  {
    q: "How quiet are the fans during operation?",
    a: "Our fans are designed for whisper-quiet performance, typically operating under 35db on low settings. They are perfect for bedrooms and home offices where silence is valued."
  },
  {
    q: "What does the 2-year warranty cover?",
    a: "Our comprehensive 2-year warranty covers all manufacturing defects, motor failures, and structural issues. If your product malfunctions under normal use, we provide a full repair or replacement."
  },
  {
    q: "Is it safe to leave the heater on overnight?",
    a: "Yes, our heaters are equipped with multiple safety layers, including automatic tip-over shutoff and overheat protection sensors. However, we always recommend placing them on a flat, stable surface away from flammable materials."
  },
  {
    q: "Do I need professional installation for ceiling fans?",
    a: "While our fans come with a clear DIY installation guide, we recommend hiring a certified electrician for ceiling fan installation to ensure proper wiring and secure mounting."
  }
];

export default function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-32 space-y-12">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
            <div className="w-12 h-12 bg-lime-50 rounded-2xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-lime-600" />
            </div>
        </div>
        <p className="text-[10px] font-black text-lime-600 uppercase tracking-[0.3em]">Knowledge Base</p>
        <h2 className="text-4xl font-black text-zinc-950 tracking-tighter uppercase">
          Frequently Asked <span className="text-lime-600">Questions</span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {PRODUCT_FAQS.map((faq, i) => (
          <div 
            key={i}
            className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden transition-all duration-300 hover:border-slate-200"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
            >
              <span className="font-black text-zinc-950 uppercase tracking-tight text-sm md:text-base pr-8">
                {faq.q}
              </span>
              <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300 ${openIndex === i ? 'rotate-180 bg-lime-600 text-white' : 'text-slate-400'}`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100 border-t border-slate-50' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-8 text-slate-500 font-medium leading-relaxed bg-slate-50/30">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
