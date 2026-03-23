import { Truck, MapPin, Package, Globe } from "lucide-react";
export default function ShippingPage() {
  return (
    <div className="space-y-12">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Fulfillment Grid
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Shipping <span className="text-lime-600">Dynamics</span>{" "}
          </h1>{" "}
        </div>{" "}
        <button className="btn-primary">Add Zone</button>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {" "}
        {[
          {
            label: "Domestic Grid",
            reach: "Local Operations",
            status: "Optimum",
            icon: MapPin,
          },
          {
            label: "Global Terminal",
            reach: "International Nodes",
            status: "Active",
            icon: Globe,
          },
          {
            label: "Express Protocol",
            reach: "Priority Delivery",
            status: "Staged",
            icon: Truck,
          },
        ].map((zone) => (
          <div
            key={zone.label}
            className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm hover:border-lime-600 transition-all group cursor-pointer"
          >
            {" "}
            <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-400 mb-8 group-hover:bg-lime-50 group-hover:text-lime-600 transition-colors">
              {" "}
              <zone.icon className="w-8 h-8" />{" "}
            </div>{" "}
            <h3 className="text-lg font-black text-[zinc-950] uppercase mb-1">
              {zone.label}
            </h3>{" "}
            <p className="text-xs font-medium text-slate-500 mb-6">
              {zone.reach}
            </p>{" "}
            <div className="flex items-center gap-2">
              {" "}
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{" "}
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {zone.status}
              </span>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}
