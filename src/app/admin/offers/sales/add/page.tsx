"use client";
import { addSale, getCategories, getProducts } from "@/lib/actions";
import {
  ChevronLeft,
  Save,
  Tag,
  Calendar,
  LayoutGrid,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Category, Product } from "@/lib/types";
export default function AddSalePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [applyTo, setApplyTo] = useState<"all" | "category" | "products">(
    "all",
  );
  useEffect(() => {
    getCategories().then(setCategories);
    getProducts().then(setProducts);
  }, []);
  const action = async (formData: FormData) => {
    await addSale(formData);
    router.push("/admin/offers/sales");
  };
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10">
      {" "}
      {/* Header */}{" "}
      <div className="flex items-center justify-between">
        {" "}
        <div className="flex items-center gap-4">
          {" "}
          <Link
            href="/admin/offers/sales"
            className="p-3 hover:bg-slate-50 rounded-2xl transition-colors"
          >
            {" "}
            <ChevronLeft className="w-5 h-5 text-slate-400" />{" "}
          </Link>{" "}
          <div>
            {" "}
            <h1 className="text-3xl font-black text-[zinc-950] tracking-tighter uppercase">
              {" "}
              Create <span className="text-lime-600">Sale</span>{" "}
            </h1>{" "}
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Create New Sale Instance
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <form action={action} className="space-y-8 pb-20">
        {" "}
        {/* General Info */}{" "}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-8">
          {" "}
          <div className="flex items-center gap-4 mb-4">
            {" "}
            <div className="w-10 h-10 rounded-xl bg-lime-50 flex items-center justify-center text-lime-600">
              {" "}
              <Tag className="w-5 h-5" />{" "}
            </div>{" "}
            <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
              General Parameters
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            <div className="space-y-2">
              {" "}
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                Campaign Name
              </label>{" "}
              <input
                name="name"
                required
                placeholder="E.G. SUMMER CLEARANCE"
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 placeholder:text-slate-300"
              />{" "}
            </div>{" "}
            <div className="grid grid-cols-2 gap-4">
              {" "}
              <div className="space-y-2">
                {" "}
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                  Type
                </label>{" "}
                <select
                  name="discountType"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[zinc-950] focus:ring-2 focus:ring-lime-600/20"
                >
                  {" "}
                  <option value="percentage">PERCENTAGE (%)</option>{" "}
                  <option value="fixed">FIXED (Rs.)</option>{" "}
                </select>{" "}
              </div>{" "}
              <div className="space-y-2">
                {" "}
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                  Value
                </label>{" "}
                <input
                  name="discountValue"
                  type="number"
                  required
                  step="0.01"
                  placeholder="30"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[zinc-950] focus:ring-2 focus:ring-lime-600/20"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Scope Selection */}{" "}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-8">
          {" "}
          <div className="flex items-center gap-4 mb-4">
            {" "}
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              {" "}
              <LayoutGrid className="w-5 h-5" />{" "}
            </div>{" "}
            <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
              Promotion Scope
            </h2>{" "}
          </div>{" "}
          <div className="space-y-6">
            {" "}
            <div className="grid grid-cols-3 gap-4">
              {" "}
              {(["all", "category", "products"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setApplyTo(type)}
                  className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${applyTo === type ? "bg-[zinc-950] border-[zinc-950] text-white" : "bg-white border-slate-50 text-slate-400 hover:border-slate-100"}`}
                >
                  {" "}
                  {type}{" "}
                </button>
              ))}{" "}
            </div>{" "}
            <input type="hidden" name="applyTo" value={applyTo} />{" "}
            {applyTo === "category" && (
              <div className="space-y-4 pt-4 border-t border-slate-50">
                {" "}
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                  Select Target Categories
                </label>{" "}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {" "}
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      {" "}
                      <input
                        type="checkbox"
                        name="categoryIds"
                        value={cat.id}
                        className="w-4 h-4 rounded border-slate-200 text-lime-600 focus:ring-lime-600/20"
                      />{" "}
                      <span className="text-[10px] font-black text-[zinc-950] uppercase tracking-tight">
                        {cat.name}
                      </span>{" "}
                    </label>
                  ))}{" "}
                </div>{" "}
              </div>
            )}{" "}
            {applyTo === "products" && (
              <div className="space-y-4 pt-4 border-t border-slate-50">
                {" "}
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                  Select Target Products
                </label>{" "}
                <div className="grid grid-cols-1 gap-2">
                  {" "}
                  {products.map((prod) => (
                    <label
                      key={prod.id}
                      className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      {" "}
                      <input
                        type="checkbox"
                        name="productIds"
                        value={prod.id}
                        className="w-4 h-4 rounded border-slate-200 text-lime-600 focus:ring-lime-600/20"
                      />{" "}
                      <div className="flex flex-col">
                        {" "}
                        <span className="text-[10px] font-black text-[zinc-950] uppercase tracking-tight">
                          {prod.name}
                        </span>{" "}
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                          Rs. {prod.price.toLocaleString()}
                        </span>{" "}
                      </div>{" "}
                    </label>
                  ))}{" "}
                </div>{" "}
              </div>
            )}{" "}
          </div>{" "}
        </div>{" "}
        {/* Timeline */}{" "}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-8">
          {" "}
          <div className="flex items-center gap-4 mb-4">
            {" "}
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
              {" "}
              <Calendar className="w-5 h-5" />{" "}
            </div>{" "}
            <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
              Active Window
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            <div className="space-y-2">
              {" "}
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                Start Date
              </label>{" "}
              <input
                name="startDate"
                type="datetime-local"
                required
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[zinc-950] focus:ring-2 focus:ring-lime-600/20"
              />{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                End Date
              </label>{" "}
              <input
                name="endDate"
                type="datetime-local"
                required
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[zinc-950] focus:ring-2 focus:ring-lime-600/20"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex items-center gap-4 pt-4">
            {" "}
            <input
              name="isActive"
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded-lg border-slate-200 text-emerald-500 focus:ring-emerald-500/20"
              id="isActive"
            />{" "}
            <label
              htmlFor="isActive"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer"
            >
              Immediate Activation Post-Save
            </label>{" "}
          </div>{" "}
        </div>{" "}
        {/* Footer Actions */}{" "}
        <div className="flex items-center justify-end gap-4 pt-4">
          {" "}
          <Link
            href="/admin/offers/sales"
            className="px-10 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[zinc-950] transition-colors"
          >
            Cancel
          </Link>{" "}
          <button
            type="submit"
            className="btn-primary !px-12 !py-5 flex items-center gap-3 shadow-2xl shadow-lime-600/20"
          >
            {" "}
            <Save className="w-4 h-4" />{" "}
            <span className="text-xs font-black uppercase tracking-widest">
              Start Sale
            </span>{" "}
          </button>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
}
