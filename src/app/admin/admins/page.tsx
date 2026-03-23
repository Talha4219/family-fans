import { Shield, User, Key, ShieldCheck } from "lucide-react";
export default function AdminsPage() {
  return (
    <div className="space-y-12">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Access Control Matrix
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Command <span className="text-lime-600">Authorization</span>{" "}
          </h1>{" "}
        </div>{" "}
        <button className="btn-primary">Provision Agent</button>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {" "}
        {[
          {
            name: "Admin Master",
            role: "Super Admin",
            level: "Full Access",
            color: "orange",
          },
          {
            name: "Ops Controller",
            role: "Support Agent",
            level: "Restricted",
            color: "slate",
          },
        ].map((admin) => (
          <div
            key={admin.name}
            className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm relative overflow-hidden group"
          >
            {" "}
            <div className="flex items-center gap-6 mb-8">
              {" "}
              <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-lime-50 group-hover:text-lime-600 transition-all">
                {" "}
                <User className="w-8 h-8" />{" "}
              </div>{" "}
              <div>
                {" "}
                <h3 className="text-lg font-black text-[zinc-950] uppercase leading-none">
                  {admin.name}
                </h3>{" "}
                <p className="text-[10px] font-black text-lime-600 uppercase tracking-widest mt-1">
                  {admin.role}
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              {" "}
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Auth Level
              </span>{" "}
              <span className="text-[10px] font-black uppercase tracking-widest text-[zinc-950]">
                {admin.level}
              </span>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}
