"use client";
import { addDeal, getProducts } from "@/lib/actions";
import { ChevronLeft, Save, Zap, Clock, Package, Box } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
export default function AddDealPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);
  const action = async (formData: FormData) => {
    await addDeal(formData);
    router.push("/admin/offers/deals");
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
            href="/admin/offers/deals"
            className="p-3 hover:bg-slate-50 rounded-2xl transition-colors"
          >
            {" "}
            <ChevronLeft className="w-5 h-5 text-slate-400" />{" "}
          </Link>{" "}
          <div>
            {" "}
            <h1 className="text-3xl font-black text-[zinc-950] tracking-tighter uppercase">
              {" "}
              Create <span className="text-lime-600">New Deal</span>{" "}
            </h1>{" "}
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Time-limited discount offer
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
              <Zap className="w-5 h-5" />{" "}
            </div>{" "}
            <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
              Deal Info
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            <div className="space-y-2">
              {" "}
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                Deal Title
              </label>{" "}
              <input
                name="title"
                required
                placeholder="E.G. MIDNIGHT FLASH"
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 placeholder:text-slate-300"
              />{" "}
            </div>{" "}
            <div className="grid grid-cols-2 gap-4">
              {" "}
              <div className="space-y-2">
                {" "}
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                  Discount Type
                </label>{" "}
                <select
                  name="discountType"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[zinc-950] focus:ring-2 focus:ring-lime-600/20"
                >
                  {" "}
                  <option value="percentage">PERCENTAGE (%)</option>{" "}
                  <option value="fixed">FIXED ($)</option>{" "}
                </select>{" "}
              </div>{" "}
              <div className="space-y-2">
                {" "}
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                  Discount Value
                </label>{" "}
                <input
                  name="discountValue"
                  type="number"
                  required
                  step="0.01"
                  placeholder="50"
                  className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[zinc-950] focus:ring-2 focus:ring-lime-600/20"
                />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Target Products */}{" "}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-8">
          {" "}
          <div className="flex items-center gap-4 mb-4">
            {" "}
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
              {" "}
              <Package className="w-5 h-5" />{" "}
            </div>{" "}
            <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
              Select Products
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
            {" "}
            {products.map((prod) => (
              <label
                key={prod.id}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors border-2 border-transparent has-[:checked]:border-lime-600/20 has-[:checked]:bg-white"
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
                    ${prod.price}
                  </span>{" "}
                </div>{" "}
              </label>
            ))}{" "}
          </div>{" "}
        </div>{" "}
        {/* Constraints & Timing */}{" "}
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-50 shadow-sm space-y-8">
          {" "}
          <div className="flex items-center gap-4 mb-4">
            {" "}
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
              {" "}
              <Clock className="w-5 h-5" />{" "}
            </div>{" "}
            <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
              Timing & Limits
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {" "}
            <div className="space-y-2">
              {" "}
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                Start Date & Time
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
                End Date & Time
              </label>{" "}
              <input
                name="endDate"
                type="datetime-local"
                required
                className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-[zinc-950] focus:ring-2 focus:ring-lime-600/20"
              />{" "}
            </div>{" "}
            <div className="space-y-2">
              {" "}
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">
                Stock Limit
              </label>{" "}
              <input
                name="maxQuantity"
                type="number"
                placeholder="E.G. 200"
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
              className="w-5 h-5 rounded-lg border-slate-200 text-lime-600 focus:ring-lime-600/20"
              id="isActive"
            />{" "}
            <label
              htmlFor="isActive"
              className="text-[10px] font-black text-slate-500 uppercase tracking-widest cursor-pointer"
            >
              Activate after saving
            </label>{" "}
          </div>{" "}
        </div>{" "}
        {/* Footer Actions */}{" "}
        <div className="flex items-center justify-end gap-4 pt-10 border-t border-slate-50">
          {" "}
          <Link
            href="/admin/offers/deals"
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
              Save Deal
            </span>{" "}
          </button>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
}
