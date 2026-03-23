import { getAdminCategories, deleteCategory } from "@/lib/actions";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  FolderTree,
  Star,
  Search,
  ListTree,
  Package,
} from "lucide-react";
import Image from "next/image";

export default async function AdminCategories() {
  const categories = (await getAdminCategories()).filter(
    (c) => !c.parentCategoryId,
  );

  return (
    <div className="space-y-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            Category <span className="text-lime-600">Management</span>
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
            Organize your store structure
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/admin/categories/sub/add"
            className="bg-white text-[zinc-950] border border-slate-200 flex items-center gap-2 px-6 py-4 rounded-2xl shadow-sm transition-all hover:border-lime-200"
          >
            <Plus className="w-4 h-4 text-lime-600" />
            <span className="text-xs font-black uppercase tracking-widest">
              New Subcategory
            </span>
          </Link>
          <Link
            href="/admin/categories/add"
            className="btn-primary flex items-center gap-2 !px-8 !py-4 shadow-xl shadow-lime-600/20"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">
              New Category
            </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
            Total Groups
          </p>
          <p className="text-xl font-black text-[zinc-950]">
            {categories.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
            Featured
          </p>
          <p className="text-xl font-black text-lime-700">
            {categories.filter((c) => c.isFeatured).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
            Subcategories
          </p>
          <p className="text-xl font-black text-blue-600">
            {categories.reduce((acc, c) => acc + (c.subCategoryCount || 0), 0)}
          </p>
        </div>
        <div className="bg-slate-900 p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            Total Products
          </p>
          <p className="text-xl font-black text-white">
            {categories.reduce((acc, c) => acc + (c.productCount || 0), 0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden text-slate-900">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
            Parent Categories
          </h2>
          <div className="relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              placeholder="FIND CATEGORY..."
              className="bg-slate-50 border-none rounded-xl pl-12 pr-6 py-3 text-[10px] font-black tracking-widest text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50 text-left"><th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Category Name</th><th className="px-6 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Analysis</th><th className="px-6 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th><th className="px-6 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right font-mono">Order</th><th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Operations</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-slate-100/30 transition-colors group"><td className="px-10 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-[1.25rem] overflow-hidden flex-shrink-0 bg-slate-50 relative border border-slate-100 group-hover:scale-105 transition-transform">
                        {category.imageUrl ? (
                          <Image
                            src={category.imageUrl}
                            alt={category.name}
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
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-black text-[zinc-950] truncate max-w-[200px] group-hover:text-lime-600 transition-colors">
                            {category.name}
                          </p>
                          {category.isFeatured && (
                            <Star className="w-3 h-3 fill-lime-600 text-lime-600" />
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                          /{category.slug}
                        </p>
                      </div>
                    </div>
                  </td><td className="px-6 py-6 font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <ListTree className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-black">
                          {category.subCategoryCount || 0} Subcategories
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Package className="w-3.5 h-3.5 text-lime-600" />
                        <span className="font-black">
                          {category.productCount || 0} Products
                        </span>
                      </div>
                    </div>
                  </td><td className="px-6 py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${category.status === "Active" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${category.status === "Active" ? "bg-green-500 animate-pulse" : "bg-slate-400"}`} />
                      <span className="text-[9px] font-black uppercase tracking-widest">
                        {category.status || "Active"}
                      </span>
                    </div>
                  </td><td className="px-6 py-6 text-right font-mono text-[10px] font-black text-slate-900">
                    #{category.displayOrder || 0}
                  </td><td className="px-10 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/categories/sub?parent=${category.id}`}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                        title="Manage Subcategories"
                      >
                        <FolderTree className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 text-slate-400 hover:text-[zinc-950] hover:bg-white border border-transparent hover:border-slate-100 transition-all"
                        title="Edit Category"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteCategory(category.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td></tr>
              ))}
              {categories.length === 0 && (
                <tr><td colSpan={4} className="px-10 py-24 text-center"><div className="max-w-xs mx-auto space-y-4 opacity-30"><FolderTree className="w-12 h-12 mx-auto text-slate-400" /><p className="text-xs font-black uppercase tracking-widest text-slate-400">No Categories Found</p></div></td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-10 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Managing {categories.length} categories
          </p>
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-[zinc-950] font-black text-[10px] disabled:opacity-30"
              disabled
            >
              1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
