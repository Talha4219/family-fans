import {
  FileText,
  Layout,
  Newspaper,
  Image as ImageIcon,
  Plus,
} from "lucide-react";
import Link from "next/link";
export default function ContentPage() {
  return (
    <div className="space-y-12">
      {" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-lime-600 mb-4">
            Structural Repository
          </p>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Asset <span className="text-lime-600">Command</span>{" "}
          </h1>{" "}
        </div>{" "}
        <div className="flex items-center gap-3">
          {" "}
          <button className="btn-secondary">Media Library</button>{" "}
          <button className="btn-primary">New Page</button>{" "}
        </div>{" "}
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {" "}
        {[
          {
            label: "Blog Posts",
            count: "12",
            icon: Newspaper,
            href: "/admin/blog",
          },
          { label: "System Pages", count: "8", icon: Layout, href: "#" },
          { label: "Banners", count: "4", icon: ImageIcon, href: "#" },
          { label: "FAQs", count: "24", icon: FileText, href: "#" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm hover:border-lime-600 hover:shadow-xl hover:shadow-lime-600/5 transition-all group"
          >
            {" "}
            <div className="flex items-center justify-between mb-6">
              {" "}
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-lime-50 group-hover:text-lime-600 transition-colors">
                {" "}
                <item.icon className="w-7 h-7" />{" "}
              </div>{" "}
              <span className="text-sm font-black text-[zinc-950] opacity-20 group-hover:opacity-100 transition-opacity">
                [{item.count}]
              </span>{" "}
            </div>{" "}
            <h3 className="text-lg font-black text-[zinc-950] uppercase mb-2">
              {item.label}
            </h3>{" "}
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-lime-600/60 transition-colors">
              Manage Node
            </p>{" "}
          </Link>
        ))}{" "}
      </div>{" "}
    </div>
  );
}
