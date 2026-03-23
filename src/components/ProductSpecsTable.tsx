import React from 'react';

interface SpecRow {
  size: string;
  sweepSize: string;
  ratedPower: string;
  speed: string;
  airDelivery: string;
  serviceValue: string;
}

interface ProductSpecsTableProps {
  specs: SpecRow[];
}

export default function ProductSpecsTable({ specs }: ProductSpecsTableProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-black text-zinc-950 uppercase tracking-tighter">Specifications</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-950">Size</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-950">Sweep Size</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-950">Rated Power</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-950">Speed</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-950">Air Delivery</th>
              <th className="py-4 text-[10px] font-black uppercase tracking-widest text-zinc-950">Service Value (m3/min/W)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {specs.map((spec, i) => (
              <tr key={i}>
                <td className="py-4 text-xs font-medium text-zinc-600">{spec.size}</td>
                <td className="py-4 text-xs font-medium text-zinc-600">{spec.sweepSize}</td>
                <td className="py-4 text-xs font-medium text-zinc-600">{spec.ratedPower}</td>
                <td className="py-4 text-xs font-medium text-zinc-600">{spec.speed}</td>
                <td className="py-4 text-xs font-medium text-zinc-600">{spec.airDelivery}</td>
                <td className="py-4 text-xs font-medium text-zinc-600">{spec.serviceValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-[10px] font-black text-center text-zinc-400 uppercase tracking-widest">
          Rated Voltage: 230±10V | Rated Frequency: 50 Hz | Insulation Class: 155
        </p>
      </div>
    </div>
  );
}
