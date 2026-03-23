import { Megaphone, Mail, Share2, Zap } from "lucide-react";
export default function MarketingPage() {
  return (
    <div className="space-y-12">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Marketing & Outreach
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Growth <span className="text-lime-600">Campaigns</span>{" "}
          </h1>{" "}
        </div>{" "}
        <button className="btn-primary flex items-center gap-3">
          {" "}
          <Zap className="w-4 h-4" /> Create Campaign{" "}
        </button>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {" "}
        {[
          { label: "Subscribers", val: "1,240", icon: Mail },
          { label: "Active Leads", val: "45", icon: Zap },
          { label: "Social Reach", val: "12.4k", icon: Share2 },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col items-center text-center"
          >
            {" "}
            <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-400 mb-6">
              {" "}
              <item.icon className="w-8 h-8" />{" "}
            </div>{" "}
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
              {item.label}
            </p>{" "}
            <p className="text-2xl font-black text-[zinc-950]">
              {item.val}
            </p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <div className="bg-white rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-900/5 p-20 text-center">
        {" "}
        <div className="w-24 h-24 bg-lime-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse text-lime-600">
          {" "}
          <Megaphone className="w-10 h-10" />{" "}
        </div>{" "}
        <h3 className="text-2xl font-black text-[zinc-950] mb-4 uppercase">
          No Active Campaigns
        </h3>{" "}
        <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
          Launch a new marketing campaign to grow your business.
        </p>{" "}
      </div>{" "}
    </div>
  );
}
