'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Do your fans and room coolers come with a warranty?",
    answer: "Yes, all FamilyFans products come with a comprehensive 2-year manufacturer warranty covering the motor and vital electronic components. Please retain your receipt for warranty claims."
  },
  {
    question: "What are the benefits of an Inverter (AC/DC) Fan?",
    answer: "Our Inverter fans consume up to 60-90% less electricity compared to conventional fans. They can run smoothly on low voltage, solar panels, and UPS systems, providing uninterrupted comfort and significantly lower electricity bills."
  },
  {
    question: "How long does shipping take across Pakistan?",
    answer: "We offer fast nationwide delivery. Standard shipping takes 3-5 business days depending on your location. We also offer expedited shipping options at checkout."
  },
  {
    question: "Do you offer installation services?",
    answer: "Currently, we do not offer direct installation services. However, our products are designed for straightforward installation by any certified local electrician, and a comprehensive instruction manual is included in every box."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day hassle-free return policy for unused items in their original packaging. If you receive a damaged or defective item, please contact our support team within 48 hours for an immediate replacement."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="w-16 h-16 rounded-3xl bg-[lab(61.1055%_-41.0235_73.1483)]/10 flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-[lab(61.1055%_-41.0235_73.1483)]" />
          </div>
          <p className="text-[10px] font-black text-[lab(61.1055%_-41.0235_73.1483)] uppercase tracking-[0.3em] mb-3">
            Got Questions?
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter uppercase mb-6">
            Frequently Asked
          </h2>
          <p className="text-slate-500 font-medium">
            Everything you need to know about our products, shipping, and guarantees.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white border rounded-[2rem] transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[lab(61.1055%_-41.0235_73.1483)] shadow-lg shadow-[lab(61.1055%_-41.0235_73.1483)]/5' : 'border-slate-100 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-6 sm:px-8 sm:py-7 flex items-center justify-between gap-6"
                >
                  <span className={`text-[15px] sm:text-[17px] font-bold tracking-tight transition-colors ${
                    isOpen ? 'text-[lab(61.1055%_-41.0235_73.1483)]' : 'text-zinc-950'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? 'bg-[lab(61.1055%_-41.0235_73.1483)] text-white' : 'bg-slate-50 text-slate-400'
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 text-slate-500 leading-relaxed text-[15px] font-medium border-t border-slate-50 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
