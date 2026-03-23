import { Users, Search, UserPlus, Mail } from "lucide-react";
export default function CustomersPage() {
  return (
    <div className="space-y-12">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Engagement Matrix
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Customer <span className="text-lime-600">Registry</span>{" "}
          </h1>{" "}
        </div>{" "}
        <button className="btn-primary flex items-center gap-3">
          {" "}
          <UserPlus className="w-4 h-4" /> Add Agent{" "}
        </button>{" "}
      </div>{" "}
      <div className="bg-white rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-900/5 overflow-hidden">
        {" "}
        <div className="p-8 border-b border-slate-50">
          {" "}
          <div className="flex items-center gap-4 bg-slate-50 px-6 py-3 rounded-2xl w-full max-w-md">
            {" "}
            <Search className="w-4 h-4 text-slate-400" />{" "}
            <input
              type="text"
              placeholder="Search agent profiles..."
              className="bg-transparent border-none text-sm font-black text-[zinc-950] focus:ring-0 w-full"
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="p-12 text-center">
          {" "}
          <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
            {" "}
            <Users className="w-8 h-8 text-slate-200" />{" "}
          </div>{" "}
          <h3 className="text-xl font-black text-[zinc-950] mb-2 uppercase">
            No profiles discovered
          </h3>{" "}
          <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm">
            The agent registry is empty. Deploy marketing initiatives to attract
            new users.
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
