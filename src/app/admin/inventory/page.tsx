import { Database, AlertTriangle, RefreshCcw, Box } from "lucide-react";
export default function InventoryPage() {
  return (
    <div className="space-y-12">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Logistics Core
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Stock <span className="text-lime-600">Intelligence</span>{" "}
          </h1>{" "}
        </div>{" "}
        <button className="btn-secondary flex items-center gap-3">
          {" "}
          <RefreshCcw className="w-4 h-4" /> Sync Levels{" "}
        </button>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {" "}
        {[
          {
            label: "Critical Alert",
            value: "3",
            color: "red",
            icon: AlertTriangle,
          },
          { label: "Out of Stock", value: "1", color: "black", icon: Box },
          {
            label: "Active SKU",
            value: "124",
            color: "orange",
            icon: Database,
          },
          { label: "Suppliers", value: "12", color: "blue", icon: RefreshCcw },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex items-center gap-6"
          >
            {" "}
            <div
              className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400`}
            >
              {" "}
              <stat.icon className="w-6 h-6" />{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {stat.label}
              </p>{" "}
              <p className="text-2xl font-black text-[zinc-950]">
                {stat.value}
              </p>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <div className="bg-[zinc-950] rounded-[3rem] p-12 text-white overflow-hidden relative group">
        {" "}
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
          {" "}
          <Database className="w-48 h-48" />{" "}
        </div>{" "}
        <div className="relative z-10 max-w-lg">
          {" "}
          <h2 className="text-3xl font-black tracking-tighter mb-4 uppercase">
            Automated <span className="text-lime-600">Forecasting</span>
          </h2>{" "}
          <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
            AI-driven inventory optimization is calculating next week's demand.
            Stability reports will be generated upon completion.
          </p>{" "}
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            {" "}
            <div className="bg-lime-600 h-full w-[65%] animate-pulse" />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
