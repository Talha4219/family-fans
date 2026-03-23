import { getProducts, deleteProduct } from "@/lib/actions";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Package,
  Search,
  Filter,
} from "lucide-react";
import Image from "next/image";

export default async function AdminProducts() {
  const products = await getProducts();

  return (
    <div className="space-y-10 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            Product <span className="text-lime-600">Management</span>
          </h1>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
            Manage your store inventory and stock
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 flex items-center justify-center bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[zinc-950] transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <Link
            href="/admin/products/add"
            className="btn-primary flex items-center gap-2 !px-8 !py-4 shadow-xl shadow-lime-600/20"
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">
              Add New Product
            </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-50">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
            Total Units
          </p>
          <p className="text-xl font-black text-[zinc-950]">
            {products.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-50">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
            Out of Stock
          </p>
          <p className="text-xl font-black text-red-600">
            {products.filter((p: any) => (p.stock || 0) <= 0).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-50">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
            Low Inventory
          </p>
          <p className="text-xl font-black text-lime-700">
            {products.filter((p: any) => (p.stock || 0) > 0 && (p.stock || 0) < 10).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-50">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
            Avg. Price
          </p>
          <p className="text-xl font-black text-green-600">
            Rs. {(products.reduce((acc: any, p: any) => acc + p.price, 0) / (products.length || 1)).toFixed(0)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden text-slate-900">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
            Inventory List
          </h2>
          <div className="relative hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input
              type="text"
              placeholder="SEARCH PRODUCTS..."
              className="bg-slate-50 border-none rounded-xl pl-12 pr-6 py-3 text-[10px] font-black tracking-widest text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50 text-left"><th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Specifications</th><th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Classification</th><th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Revenue Value</th><th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th><th className="px-10 py-8 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Operations</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors group"><td className="px-10 py-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden flex-shrink-0 bg-slate-50 relative border border-slate-100 group-hover:scale-105 transition-transform">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-[zinc-950] truncate max-w-[280px] mb-1 group-hover:text-lime-600 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest truncate max-w-[280px]">
                          ID: {product.id.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td><td className="px-10 py-6">
                    <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-[zinc-950] text-white px-4 py-2 rounded-xl">
                      {product.category}
                    </span>
                  </td><td className="px-10 py-6">
                    <p className="text-sm font-black text-[zinc-950]">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </td><td className="px-10 py-6">
                    {product.stock != null ? (
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? "bg-green-600 animate-pulse" : product.stock > 0 ? "bg-lime-700" : "bg-red-600"}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-lime-700" : "text-red-600"}`}>
                          {product.stock > 0 ? `${product.stock} Units` : "Depleted"}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-black text-slate-300">—</span>
                    )}
                  </td><td className="px-10 py-6">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 text-slate-400 hover:text-[zinc-950] hover:bg-white border border-transparent hover:border-slate-100 transition-all"
                        title="Edit Object"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteProduct(product.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          title="Purge Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  </td></tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={5} className="px-10 py-24 text-center"><div className="max-w-xs mx-auto space-y-4 opacity-30"><Package className="w-12 h-12 mx-auto text-slate-400" /><p className="text-xs font-black uppercase tracking-widest text-slate-400">Inventory Empty</p></div></td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-10 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
            Showing {products.length} cataloged products
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
