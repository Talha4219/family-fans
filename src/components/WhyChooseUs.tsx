'use client';

import { ShieldCheck, Truck, Wrench, Leaf } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Premium Quality',
    description: 'Manufactured with the highest grade materials for durability and lasting performance.'
  },
  {
    icon: Leaf,
    title: 'Energy Efficient',
    description: 'Our inverter technology ensures up to 90% energy savings without compromising on power.'
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'Fast, reliable shipping directly to your doorstep, anywhere in Pakistan.'
  },
  {
    icon: Wrench,
    title: 'Dedicated Support',
    description: 'Our customer service team is always ready to assist you with installation and warranty claims.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[10px] font-black text-[lab(61.1055%_-41.0235_73.1483)] uppercase tracking-[0.3em] mb-3">
            The FamilyFans Difference
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter uppercase mb-6">
            Why  Choose  Us
          </h2>
          <p className="text-slate-500 font-medium">
            We don't just sell appliances; we deliver comfort, reliability, and innovation to your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-[lab(61.1055%_-41.0235_73.1483)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[lab(61.1055%_-41.0235_73.1483)]/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-[lab(61.1055%_-41.0235_73.1483)]" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950 mb-3">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed min-h-[60px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
