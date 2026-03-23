import { CreditCard, DollarSign, ShieldCheck, History } from "lucide-react";
export default function PaymentsPage() {
  return (
    <div className="space-y-12">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Fiscal Gateway
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Transaction <span className="text-lime-600">Flow</span>{" "}
          </h1>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {" "}
        <div className="bg-[zinc-950] p-12 rounded-[3.5rem] text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group">
          {" "}
          <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
            {" "}
            <DollarSign className="w-64 h-64" />{" "}
          </div>{" "}
          <div className="relative z-10">
            {" "}
            <div className="flex items-center gap-4 mb-8">
              {" "}
              <div className="w-12 h-12 rounded-2xl bg-lime-600 flex items-center justify-center">
                {" "}
                <ShieldCheck className="w-6 h-6 text-white" />{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-xl font-black uppercase">
                  Vault Status: Secure
                </h3>{" "}
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Encryption Active [SSL-256]
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              <div className="flex justify-between items-center py-4 border-b border-white/5">
                {" "}
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Available Balance
                </span>{" "}
                <span className="text-2xl font-black">Rs. 12,450</span>{" "}
              </div>{" "}
              <div className="flex justify-between items-center py-4 border-b border-white/5">
                {" "}
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Next Payout
                </span>{" "}
                <span className="text-sm font-black text-lime-600">
                  March 20, 2026
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-50 shadow-sm">
          {" "}
          <div className="flex items-center gap-4 mb-10">
            {" "}
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
              {" "}
              <CreditCard className="w-6 h-6" />{" "}
            </div>{" "}
            <h3 className="text-xl font-black text-[zinc-950] uppercase leading-none">
              Global{" "}
              <span className="text-lime-600 block text-[10px] font-black uppercase tracking-widest mt-1">
                Payment Hub
              </span>
            </h3>{" "}
          </div>{" "}
          <div className="space-y-6">
            {" "}
            {[
              { method: "Stripe Gateway", status: "Live", vol: "Rs. 8.4k" },
              { method: "PayPal Connect", status: "Live", vol: "Rs. 3.2k" },
              { method: "Crypto Bridge", status: "Staged", vol: "Rs. 0.0k" },
            ].map((hub) => (
              <div
                key={hub.method}
                className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] hover:bg-lime-50 transition-colors group cursor-pointer"
              >
                {" "}
                <div className="flex flex-col">
                  {" "}
                  <span className="text-sm font-black text-[zinc-950]">
                    {hub.method}
                  </span>{" "}
                  <span
                    className={`text-[8px] font-black uppercase tracking-widest ${hub.status === "Live" ? "text-green-500" : "text-slate-400"}`}
                  >
                    {hub.status}
                  </span>{" "}
                </div>{" "}
                <span className="text-sm font-black text-[zinc-950] group-hover:text-lime-600 transition-colors">
                  {hub.vol}
                </span>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
