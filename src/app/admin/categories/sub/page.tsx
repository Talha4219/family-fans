import { getAdminCategories, deleteCategory } from "@/lib/actions";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Layers,
  FolderTree,
  Search,
  ChevronRight,
  Package,
  LayoutGrid,
} from "lucide-react";
import Image from "next/image";

export default async function AdminSubcategories({
  searchParams,
}: {
  searchParams: Promise<{
    parent?: string;
  }>;
}) {
  const { parent } = await searchParams;
  const allCategories = await getAdminCategories();

  const parentCategory = parent
    ? allCategories.find((c) => c.id === parent)
    : null;

  const subCategories = allCategories.filter((c) => {
    if (parent) return c.parentCategoryId === parent;
    return c.parentCategoryId !== null && c.parentCategoryId !== undefined;
  });

  return (
    <div className="space-y-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/admin/categories"
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-lime-600 transition-colors"
            >
              Categories
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-lime-600">
              Subcategories
            </span>
          </div>
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {parentCategory ? (
              <>
                <span className="text-lime-600">{parentCategory.name}</span> / Sub-Groups
              </>
            ) : (
              <>
                Subcategory <span className="text-lime-600">Index</span>
              </>
            )}
          </h1>
        </div>
        <div className="flex gap-4">
          <Link
            href="/admin/categories"
            className="bg-white text-[zinc-950] border border-slate-200 flex items-center gap-2 px-6 py-4 rounded-2xl shadow-sm transition-all hover:bg-slate-50"
          >
            <LayoutGrid className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Parent Index
            </span>
          </Link>
          <Link
            href={`/admin/categories/add?parent=${parent || ""}`}
            className="btn-primary flex items-center gap-2 !px-8 !py-4 shadow-xl shadow-lime-600/20"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">
              New Subcategory
            </span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden text-slate-900">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
            {parent ? `${parentCategory?.name} Hierarchical Nodes` : "All Secondary Nodes"}
          </h2>
          <div className="relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              placeholder="FIND NODE..."
              className="bg-slate-50 border-none rounded-xl pl-12 pr-6 py-3 text-[10px] font-black tracking-widest text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50 text-left"><th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Node Designation</th><th className="px-6 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Parent Context</th><th className="px-6 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Stock Context</th><th className="px-6 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th><th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Ops</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {subCategories.map((cat) => {
                const parentName = allCategories.find((p) => p.id === cat.parentCategoryId)?.name || "Unknown";
                return (
                  <tr key={cat.id} className="hover:bg-slate-100/30 transition-colors group"><td className="px-10 py-6">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-[1.25rem] overflow-hidden flex-shrink-0 bg-slate-50 relative border border-slate-100 group-hover:scale-105 transition-transform">
                          {cat.imageUrl ? (
                            <Image
                              src={cat.imageUrl}
                              alt={cat.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                              <FolderTree className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black text-[zinc-950] truncate max-w-[200px] mb-1 group-hover:text-lime-600 transition-colors">
                            {cat.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                            /{cat.slug}
                          </p>
                        </div>
                      </div>
                    </td><td className="px-6 py-6 font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 w-fit">
                        <Layers className="w-3.5 h-3.5 text-lime-600" />
                        <span className="font-black">{parentName}</span>
                      </div>
                    </td><td className="px-6 py-6 font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Package className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-black">
                          {(cat as any).productCount || 0} Products
                        </span>
                      </div>
                    </td><td className="px-6 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${cat.status === "Active" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${cat.status === "Active" ? "bg-green-500 animate-pulse" : "bg-slate-400"}`} />
                        <span className="text-[9px] font-black uppercase tracking-widest">
                          {cat.status || "Active"}
                        </span>
                      </div>
                    </td><td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link
                          href={`/admin/categories/${cat.id}/edit`}
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 text-slate-400 hover:text-[zinc-950] hover:bg-white border border-transparent hover:border-slate-100 transition-all shadow-sm"
                          title="Edit Subcategory"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <form
                          action={async () => {
                            "use server";
                            await deleteCategory(cat.id);
                          }}
                        >
                          <button
                            type="submit"
                            className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Delete Node"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td></tr>
                );
              })}
              {subCategories.length === 0 && (
                <tr><td colSpan={5} className="px-10 py-24 text-center"><div className="max-w-xs mx-auto space-y-4 opacity-30"><FolderTree className="w-12 h-12 mx-auto text-slate-400" /><p className="text-xs font-black uppercase tracking-widest text-slate-400">No Subcategories Established</p></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
