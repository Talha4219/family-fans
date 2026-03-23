import { updateCategory, getCategories } from "@/lib/actions";
import CategoryModel from "@/models/Category";
import dbConnect from "@/lib/db";
import {
  ArrowLeft,
  Package,
  Boxes,
  Image as ImageIcon,
  Layout,
  Zap,
  ChevronLeft,
  Save,
  Sparkles,
  Database,
  Plus,
  Star,
  FolderTree,
} from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch existing category data
  await dbConnect();
  const categoryDoc = await CategoryModel.findById(id);
  if (!categoryDoc) {
    notFound();
  }

  const categories = await getCategories();

  const category = {
    name: categoryDoc.name,
    description: categoryDoc.description,
    imageUrl: categoryDoc.imageUrl,
    isFeatured: categoryDoc.isFeatured,
    status: categoryDoc.status || "Active",
    displayOrder: categoryDoc.displayOrder || 0,
    parentCategoryId: categoryDoc.parentCategoryId
      ? categoryDoc.parentCategoryId.toString()
      : "null",
  };

  async function submitForm(formData: FormData) {
    "use server";
    await updateCategory(id, formData);
    redirect("/admin/categories");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link
            href="/admin/categories"
            className="group flex items-center gap-2 text-slate-400 hover:text-lime-600 transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              Return to Structural Architecture
            </span>
          </Link>
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter">
            Taxonomy Revision
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Node ID
            </p>
            <p className="text-xs font-black text-lime-600 uppercase tracking-widest">
              {id}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
            <FolderTree className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>

      <form action={submitForm} className="space-y-8 pb-32">
        {/* Section: Identity */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <Sparkles className="w-32 h-32 text-[zinc-950]" />
          </div>

          <div className="flex items-center gap-3 mb-10 text-lime-600">
            <Layout className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
              Structural Identity
            </h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label
                  htmlFor="name"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                >
                  Group Nomenclature
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={category.name}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all"
                  placeholder="e.g. Smart Integration Systems"
                />
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="displayOrder"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                >
                  Process Sequence (Order)
                </label>
                <input
                  type="number"
                  id="displayOrder"
                  name="displayOrder"
                  defaultValue={category.displayOrder}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="description"
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
              >
                Structural Metadata
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={category.description}
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all resize-none"
                placeholder="Edit the scope and classification parameters of this node..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Section: Hierarchy & Visibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[zinc-950] rounded-[2.5rem] p-10 text-white shadow-xl shadow-slate-900/20">
            <div className="flex items-center gap-3 mb-10 text-lime-600">
              <Boxes className="w-5 h-5" />
              <h3 className="text-sm font-black uppercase tracking-widest text-white">
                Taxonomic Hierarchy
              </h3>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="parentCategoryId"
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
              >
                Parent Component
              </label>
              <select
                id="parentCategoryId"
                name="parentCategoryId"
                defaultValue={category.parentCategoryId}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600 transition-all"
              >
                <option value="null">None (Root Node)</option>
                {categories
                  .filter((cat) => cat.id !== id) // Prevent self-parenting
                  .map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-10 text-lime-600">
                <Zap className="w-5 h-5" />
                <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
                  Visibility Controls
                </h3>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 group/check cursor-pointer mb-6">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    defaultChecked={category.isFeatured}
                    className="w-6 h-6 rounded-lg border-2 border-slate-200 text-lime-600 focus:ring-lime-600/20 transition-all cursor-pointer appearance-none checked:bg-lime-600 checked:border-lime-600"
                  />
                  <Star className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-has-[:checked]:opacity-100 transition-opacity pointer-events-none fill-current" />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="isFeatured"
                    className="text-[10px] font-black uppercase tracking-widest text-[zinc-950] cursor-pointer"
                  >
                    Featured Prominence
                  </label>
                  <p className="text-[10px] font-medium text-slate-500 mt-1 uppercase tracking-tighter">
                    Feature on storefront analytics matrix.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="status"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                >
                  Status Protocol
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={category.status}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/30 transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Media Assets */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm">
          <div className="flex items-center gap-3 mb-10 text-lime-600">
            <ImageIcon className="w-5 h-5" />
            <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
              Iconographic Representation
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  Current Active Asset
                </label>
                <div className="relative w-full h-32 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
                  {category.imageUrl && (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <label
                  htmlFor="imageFile"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                >
                  Asset Revision (File)
                </label>
                <div className="relative group/file">
                  <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    className="w-full h-24 opacity-0 absolute inset-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-24 bg-slate-50 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-slate-300 group-hover/file:border-lime-600 group-hover/file:bg-lime-50/50 transition-all">
                    <Plus className="w-6 h-6 mb-1" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      Update Visual Node
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-end">
              <div className="space-y-3">
                <label
                  htmlFor="imageUrl"
                  className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1"
                >
                  Asset Revision (Pointer URL)
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  defaultValue={category.imageUrl}
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] placeholder:text-slate-200 focus:ring-2 focus:ring-lime-600/20 transition-all"
                  placeholder="https://cloud.assets.com/group-node.png"
                />
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">
                  System Note: Any structural revisions to the taxonomy
                  hierarchy will propagate across the entire data matrix.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="fixed bottom-0 left-0 lg:left-80 right-0 p-8 bg-white/80 backdrop-blur-md border-t border-slate-100 flex items-center justify-end gap-6 z-[60]">
          <Link
            href="/admin/categories"
            className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[zinc-950] transition-colors"
          >
            Discard Revision
          </Link>
          <button
            type="submit"
            className="btn-primary !px-12 !py-5 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-lime-600/40 flex items-center gap-4 hover:scale-105 transition-transform"
          >
            <Save className="w-5 h-5" />
            Apply Structural Change
          </button>
        </div>
      </form>
    </div>
  );
}
