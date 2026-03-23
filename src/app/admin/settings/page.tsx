import { Settings, Store, Globe, Bell, ShieldCheck, Save } from "lucide-react";
export default function SettingsPage() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Core OS Configuration
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            System <span className="text-lime-600">Settings</span>{" "}
          </h1>{" "}
        </div>{" "}
        <button className="btn-primary flex items-center gap-3 !px-12">
          {" "}
          <Save className="w-4 h-4" /> Commit Changes{" "}
        </button>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {" "}
        <div className="md:col-span-1 space-y-4">
          {" "}
          {[
            { label: "Store Profile", icon: Store, active: true },
            { label: "Localization", icon: Globe, active: false },
            { label: "Notifications", icon: Bell, active: false },
            { label: "Security Vault", icon: ShieldCheck, active: false },
          ].map((tab) => (
            <button
              key={tab.label}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${tab.active ? "bg-lime-50 text-[zinc-950]" : "text-slate-400 hover:text-[zinc-950] hover:bg-slate-50"}`}
            >
              {" "}
              <tab.icon
                className={`w-4 h-4 ${tab.active ? "text-lime-600" : ""}`}
              />{" "}
              {tab.label}{" "}
            </button>
          ))}{" "}
        </div>{" "}
        <div className="md:col-span-3">
          {" "}
          <div className="bg-white p-12 rounded-[3.5rem] border border-slate-50 shadow-sm space-y-10">
            {" "}
            <div className="flex items-center gap-4 text-lime-600">
              {" "}
              <Store className="w-5 h-5" />{" "}
              <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
                Grid Identity
              </h3>{" "}
            </div>{" "}
            <div className="space-y-8">
              {" "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {" "}
                <div className="space-y-3">
                  {" "}
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Store Nomenclature
                  </label>{" "}
                  <input
                    type="text"
                    defaultValue="FamilyFans Premium"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20"
                  />{" "}
                </div>{" "}
                <div className="space-y-3">
                  {" "}
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Support Endpoint
                  </label>{" "}
                  <input
                    type="email"
                    defaultValue="ops@FamilyFans.io"
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="space-y-3">
                {" "}
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  Mission Statement (Meta)
                </label>{" "}
                <textarea
                  rows={4}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 resize-none font-inter"
                  defaultValue="Redefining the aesthetic of modern e-commerce through minimalist design and high-performance structural code."
                ></textarea>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
