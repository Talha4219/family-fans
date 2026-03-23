import { addCoupon, getProducts } from "@/lib/actions";
import {
  ChevronLeft,
  Save,
  Ticket,
  Sparkles,
  Layout,
  Zap,
  Boxes,
  Calendar,
  Database,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { InputField, SelectField } from "@/components/admin/FormFields";
export default async function AddCouponPage() {
  const products = await getProducts();
  async function submitForm(formData: FormData) {
    "use server";
    await addCoupon(formData);
    redirect("/admin/offers/coupons");
  }
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {" "}
      {/* Navigation & Header */}{" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div>
          {" "}
          <Link
            href="/admin/offers/coupons"
            className="group flex items-center gap-2 text-slate-400 hover:text-lime-600 transition-colors mb-4"
          >
            {" "}
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Return to Vault
            </span>{" "}
          </Link>{" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Coupon <span className="text-lime-600">Configuration</span>{" "}
          </h1>{" "}
        </div>{" "}
        <div className="flex items-center gap-3">
          {" "}
          <div className="hidden md:flex flex-col text-right">
            {" "}
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Incentive Layer
            </p>{" "}
            <p className="text-xs font-black text-green-500 uppercase tracking-widest">
              Node Healthy
            </p>{" "}
          </div>{" "}
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400">
            {" "}
            <Database className="w-5 h-5" />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <form action={submitForm} className="space-y-8 pb-24">
        {" "}
        {/* Section: Core Parameters */}{" "}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm relative overflow-hidden group">
          {" "}
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity text-[zinc-950]">
            {" "}
            <Sparkles className="w-32 h-32" />{" "}
          </div>{" "}
          <div className="flex items-center gap-3 mb-10 text-lime-600 font-black uppercase tracking-widest text-[zinc-950]">
            {" "}
            <Layout className="w-5 h-5 text-lime-600" />{" "}
            <h3 className="text-sm">Core Parameters</h3>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {" "}
            <InputField
              label="Internal Title"
              name="title"
              placeholder="e.g. Welcome Discount 2026"
              required
            />{" "}
            <InputField
              label="Coupon Code"
              name="code"
              placeholder="WELCOME10"
              required
            />{" "}
            <SelectField
              label="Discount Engine"
              name="discountType"
              options={[
                { value: "percentage", label: "Percentage (%)" },
                { value: "fixed", label: "Fixed Amount ($)" },
              ]}
              required
            />{" "}
            <InputField
              label="Value"
              name="discountValue"
              type="number"
              step="0.01"
              placeholder="10"
              required
            />{" "}
          </div>{" "}
        </div>{" "}
        {/* Section: Rules & Thresholds */}{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {" "}
          <div className="bg-[zinc-950] rounded-[2.5rem] p-10 text-white shadow-xl shadow-slate-900/20">
            {" "}
            <div className="flex items-center gap-3 mb-10 text-lime-600">
              {" "}
              <Zap className="w-5 h-5" />{" "}
              <h3 className="text-sm font-black uppercase tracking-widest">
                Logic Thresholds
              </h3>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              <InputField
                label="Activation Threshold ($)"
                name="minOrderValue"
                type="number"
                step="0.01"
                placeholder="50.00"
                defaultValue="0"
              />{" "}
              <InputField
                label="Redemption Limit"
                name="usageLimit"
                type="number"
                placeholder="Leave empty for unlimited"
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm relative overflow-hidden group">
            {" "}
            <div className="flex items-center gap-3 mb-10 text-lime-600">
              {" "}
              <Calendar className="w-5 h-5" />{" "}
              <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
                Temporal Window
              </h3>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              <div className="space-y-2">
                {" "}
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Expiry Date (Termination Point)
                </label>{" "}
                <input
                  type="datetime-local"
                  name="expiryDate"
                  required
                  className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all"
                />{" "}
              </div>{" "}
              <div className="flex items-center gap-3 px-2 pt-4">
                {" "}
                <input
                  type="checkbox"
                  name="isActive"
                  id="isActive"
                  defaultChecked
                  className="w-5 h-5 rounded-lg border-slate-100 text-lime-600 focus:ring-lime-600/20"
                />{" "}
                <label
                  htmlFor="isActive"
                  className="text-xs font-black uppercase tracking-widest text-[zinc-950]"
                >
                  Initialize Broadcast (Active)
                </label>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Section: Target Vectors */}{" "}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-50 shadow-sm">
          {" "}
          <div className="flex items-center gap-3 mb-10 text-lime-600">
            {" "}
            <Boxes className="w-5 h-5" />{" "}
            <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
              Target Vectors
            </h3>{" "}
          </div>{" "}
          <div className="space-y-3">
            {" "}
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
              Product Specific Exclusion/Inclusion
            </label>{" "}
            <select
              name="applicableProducts"
              multiple
              className="w-full bg-slate-50 border-0 rounded-[2rem] px-8 py-6 text-sm font-black text-[zinc-950] focus:ring-2 focus:ring-lime-600/20 transition-all min-h-[200px] custom-scrollbar"
            >
              {" "}
              {products.length === 0 && (
                <option value="" disabled>
                  No active targets detected
                </option>
              )}{" "}
              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                  className="py-2 px-4 rounded-xl hover:bg-white transition-colors"
                >
                  {product.name}
                </option>
              ))}{" "}
            </select>{" "}
            <p className="text-[10px] font-medium text-slate-400 mt-4 leading-relaxed px-2 uppercase tracking-widest">
              {" "}
              Command: Hold CTRL (Windows) or CMD (Mac) to select multiple
              target sectors. Leave unselected for global application.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        {/* Fixed Footer Actions */}{" "}
        <div className="fixed bottom-0 left-0 lg:left-80 right-0 p-8 bg-white/80 backdrop-blur-md border-t border-slate-100 flex items-center justify-end gap-6 z-[60]">
          {" "}
          <Link
            href="/admin/offers/coupons"
            className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[zinc-950] transition-colors"
          >
            {" "}
            Abort Protocol{" "}
          </Link>{" "}
          <button
            type="submit"
            className="btn-primary !px-12 !py-5 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-lime-600/40 flex items-center gap-4 hover:scale-105 transition-transform"
          >
            {" "}
            <Save className="w-5 h-5" /> Commit Code{" "}
          </button>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
}
