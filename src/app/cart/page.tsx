"use client";
import Link from "next/link";
import {
  Trash2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Info,
  CreditCard,
  Lock,
  ArrowLeft,
  Zap,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addItem, removeItem, clearCart, CartItem } from "@/store/cartSlice";
import PageAnimate from "@/components/PageAnimate";
export default function CartPage() {
  const { items, totalAmount } = useSelector(
    (state: RootState) =>
      state.cart as { items: CartItem[]; totalAmount: number },
  );
  const dispatch = useDispatch();
  const shipping =
    items.length > 0 && totalAmount >= 50 ? 0 : items.length > 0 ? 9.99 : 0;
  const total = totalAmount + shipping;
  if (items.length === 0) {
    return (
      <PageAnimate>
        {" "}
        <div className="bg-[#F8FAFC] min-h-screen py-24 flex items-center justify-center">
          {" "}
          <div className="max-w-7xl mx-auto px-6 w-full">
            {" "}
            <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto">
              {" "}
              <div className="w-24 h-24 bg-lime-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                {" "}
                <ShoppingBag className="w-10 h-10 text-lime-600" />{" "}
              </div>{" "}
              <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter mb-4">
                {" "}
                Your cart is empty{" "}
              </h1>{" "}
              <p className="text-slate-500 font-medium text-lg mb-10">
                {" "}
                Looks like you haven't added anything to your cart yet. Let's
                find something perfect for you.{" "}
              </p>{" "}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {" "}
                <Link
                  href="/shop"
                  className="btn-primary flex-grow sm:flex-initial !px-10"
                >
                  {" "}
                  Explore Shop{" "}
                </Link>{" "}
                <Link
                  href="/"
                  className="btn-secondary !bg-white border-2 border-slate-100 font-black flex items-center gap-2"
                >
                  {" "}
                  <ArrowLeft className="w-4 h-4" /> Home{" "}
                </Link>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </PageAnimate>
    );
  }
  return (
    <PageAnimate>
      {" "}
      <div className="bg-[#F8FAFC] min-h-screen">
        {" "}
        {/* Steps Indicator */}{" "}
        <div className="bg-white border-b border-slate-200">
          {" "}
          <div className="max-w-7xl mx-auto px-6 py-6">
            {" "}
            <div className="flex items-center justify-center gap-10">
              {" "}
              <div className="flex items-center gap-3">
                {" "}
                <div className="w-8 h-8 rounded-full bg-lime-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-lime-600/30">
                  1
                </div>{" "}
                <span className="text-xs font-black uppercase tracking-widest text-[zinc-950]">
                  Review Cart
                </span>{" "}
              </div>{" "}
              <div className="w-12 h-px bg-slate-100" />{" "}
              <div className="flex items-center gap-3 opacity-30">
                {" "}
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-black">
                  2
                </div>{" "}
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Shipping
                </span>{" "}
              </div>{" "}
              <div className="w-12 h-px bg-slate-100" />{" "}
              <div className="flex items-center gap-3 opacity-30">
                {" "}
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-black">
                  3
                </div>{" "}
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Payment
                </span>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {" "}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {" "}
            {/* Main Cart Area */}{" "}
            <div className="flex-grow space-y-8">
              {" "}
              <div className="flex items-center justify-between">
                {" "}
                <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter">
                  {" "}
                  My Shopping Cart{" "}
                  <span className="text-slate-300 ml-4">
                    {items.length}
                  </span>{" "}
                </h1>{" "}
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                >
                  {" "}
                  Clear All{" "}
                </button>{" "}
              </div>{" "}
              <div className="space-y-4">
                {" "}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-8 items-center group hover:border-slate-200 transition-all"
                  >
                    {" "}
                    {/* Image */}{" "}
                    <div className="w-32 h-32 rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform">
                      {" "}
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-4"
                      />{" "}
                    </div>{" "}
                    {/* Info */}{" "}
                    <div className="flex-grow text-center sm:text-left">
                      {" "}
                      <h3 className="text-xl font-black text-[zinc-950] mb-1 group-hover:text-lime-600 transition-colors">
                        {" "}
                        {item.name}{" "}
                      </h3>{" "}
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        {" "}
                        Premium Collection — EH-702{" "}
                      </p>{" "}
                      <div className="flex items-center justify-center sm:justify-start gap-4">
                        {" "}
                        <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                          {" "}
                          <button
                            onClick={() => dispatch(removeItem(item.id))}
                            className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-900"
                          >
                            {" "}
                            <Minus className="w-3 h-3" />{" "}
                          </button>{" "}
                          <span className="w-10 text-center text-sm font-black text-[zinc-950]">
                            {item.quantity}
                          </span>{" "}
                          <button
                            onClick={() =>
                              dispatch(addItem({ ...item, quantity: 1 }))
                            }
                            className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-slate-900"
                          >
                            {" "}
                            <Plus className="w-3 h-3" />{" "}
                          </button>{" "}
                        </div>{" "}
                        <button
                          onClick={() => {
                            for (let i = 0; i < item.quantity; i++)
                              dispatch(removeItem(item.id));
                          }}
                          className="text-xs font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                        >
                          {" "}
                          Remove{" "}
                        </button>{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Price */}{" "}
                    <div className="text-center sm:text-right">
                      {" "}
                      <p className="text-2xl font-black text-[zinc-950] tracking-tighter mb-1">
                        {" "}
                        Rs. {(item.price * item.quantity).toLocaleString()}{" "}
                      </p>{" "}
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                        {" "}
                        Rs. {item.price.toLocaleString()} / unit{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
              {/* Order Notes / Promo */}{" "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {" "}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                  {" "}
                  <h4 className="text-xs font-black uppercase tracking-widest text-[zinc-950] mb-4 flex items-center gap-2">
                    {" "}
                    <Info className="w-4 h-4 text-lime-600" /> Order
                    Notes{" "}
                  </h4>{" "}
                  <textarea
                    placeholder="Add a note to your order..."
                    className="w-full bg-slate-50 rounded-2xl p-4 text-sm font-medium border-0 focus:ring-2 focus:ring-lime-600/20 h-24 transition-all"
                  />{" "}
                </div>{" "}
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                  {" "}
                  <h4 className="text-xs font-black uppercase tracking-widest text-[zinc-950] mb-4 flex items-center gap-2">
                    {" "}
                    <Zap className="w-4 h-4 text-lime-600" /> Promo Code{" "}
                  </h4>{" "}
                  <div className="flex gap-2">
                    {" "}
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-grow bg-slate-50 rounded-2xl px-4 py-3 text-sm font-black uppercase tracking-widest border-0 focus:ring-2 focus:ring-lime-600/20 transition-all"
                    />{" "}
                    <button className="bg-[zinc-950] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                      {" "}
                      Apply{" "}
                    </button>{" "}
                  </div>{" "}
                  <p className="text-[10px] text-slate-400 font-medium mt-3">
                    Try code{" "}
                    <span className="text-lime-600 font-black">FIRST10</span>{" "}
                    for 10% off your first order.
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Sidebar: Order Summary */}{" "}
            <aside className="lg:w-[400px] w-full lg:sticky lg:top-12">
              {" "}
              <div className="bg-[zinc-950] rounded-[3rem] p-10 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden">
                {" "}
                <div className="absolute top-0 right-0 w-32 h-32 bg-lime-600 rounded-full opacity-10 -mr-16 -mt-16" />{" "}
                <h2 className="text-2xl font-black tracking-tighter mb-10">
                  Order Summary
                </h2>{" "}
                <div className="space-y-6 mb-10">
                  {" "}
                  <div className="flex justify-between items-center">
                    {" "}
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">
                      Subtotal
                    </span>{" "}
                    <span className="font-black">
                      Rs. {totalAmount.toLocaleString()}
                    </span>{" "}
                  </div>{" "}
                  <div className="flex justify-between items-center">
                    {" "}
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">
                      Shipping
                    </span>{" "}
                    <span className="font-black">
                      {shipping === 0 ? "FREE" : `Rs. ${shipping.toLocaleString()}`}
                    </span>{" "}
                  </div>{" "}
                  <div className="flex justify-between items-center">
                    {" "}
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">
                      Est. Tax
                    </span>{" "}
                    <span className="font-black">$0.00</span>{" "}
                  </div>{" "}
                  <div className="w-full h-px bg-white/10" />{" "}
                  <div className="flex justify-between items-end">
                    {" "}
                    <span className="text-xs font-black uppercase tracking-widest">
                      Total Amount
                    </span>{" "}
                    <span className="text-4xl font-black tracking-tighter text-lime-600 leading-none">
                      {" "}
                      Rs. {total.toLocaleString()}{" "}
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="space-y-4">
                  {" "}
                  <Link
                    href="/checkout"
                    className="btn-primary w-full !py-5 flex items-center justify-center gap-3 text-sm shadow-xl shadow-lime-600/20"
                  >
                    {" "}
                    Proceed to Checkout <ArrowRight className="w-5 h-5" />{" "}
                  </Link>{" "}
                  <div className="flex items-center justify-center gap-2 pt-4">
                    {" "}
                    <CreditCard className="w-4 h-4 text-slate-400" />{" "}
                    <Lock className="w-4 h-4 text-slate-400" />{" "}
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Secure Payment SSL
                    </span>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {/* Trust Badges */}{" "}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {" "}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 flex flex-col items-center text-center">
                  {" "}
                  <ShieldCheck className="w-8 h-8 text-lime-600 mb-3" />{" "}
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[zinc-950]">
                    Safe Shopping
                  </h4>{" "}
                </div>{" "}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 flex flex-col items-center text-center">
                  {" "}
                  <Truck className="w-8 h-8 text-lime-600 mb-3" />{" "}
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[zinc-950]">
                    Free Returns
                  </h4>{" "}
                </div>{" "}
              </div>{" "}
            </aside>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </PageAnimate>
  );
}
