"use client";

import { Suspense, useState, useEffect } from "react";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

import {
  MapPin,
  Package,
  Truck,
  CheckCircle2,
  Search,
  ArrowRight,
  Loader2,
  Calendar,
  AlertCircle,
  Star,
  Zap,
} from "lucide-react";

import { getOrderById } from "@/lib/actions";

function TrackOrderContent() {
  const searchParams = useSearchParams();

  const [orderId, setOrderId] = useState("");

  const [loading, setLoading] = useState(false);

  const [order, setOrder] = useState<any>(null);

  const [error, setError] = useState("");
  useEffect(() => {
    const id = searchParams.get("id");

    if (id) {
      setOrderId(id);

      // We need to trigger the tracking logic.
      // since handleTrack is a function, we can extract the core logic. trackOrder(id);
    }
  }, [searchParams]);

  const trackOrder = async (idToTrack: string) => {
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const data = await getOrderById(idToTrack);

      if (data) {
        setOrder(data);
      } else {
        setError("Order not found. Please double check the ID.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderId) return;
    trackOrder(orderId);
  };
  const getSteps = (status: string) => {
    const statuses = ["Pending", "Processing", "Shipped", "Delivered"];

    const currentIdx = statuses.indexOf(status);

    return [
      {
        icon: Package,
        label: "Order Received",
        done: currentIdx >= 0,
      },
      {
        icon: CheckCircle2,
        label: "Processing",
        done: currentIdx >= 1,
      },
      {
        icon: Truck,
        label: "Shipped",
        done: currentIdx >= 2,
      },
      {
        icon: CheckCircle2,
        label: "Delivered",
        done: currentIdx >= 3,
      },
    ];
  };
  return (
    <div className="bg-[#F8FAFC] min-h-screen py-20 px-6">
      {" "}
      <div className="max-w-2xl mx-auto space-y-12">
        {" "}
        <div className="text-center space-y-4">
          {" "}
          <nav className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center justify-center gap-2 mb-4">
            {" "}
            <Link href="/" className="hover:text-lime-600 transition-colors">
              Home
            </Link>{" "}
            <span>/</span>{" "}
            <span className="text-slate-900">Track Order</span>{" "}
          </nav>{" "}
          <h1 className="text-5xl font-black text-zinc-950 tracking-tighter">
            {" "}
            Track Your <span className="text-lime-600">Journey</span>{" "}
          </h1>{" "}
          <p className="text-slate-400 font-medium max-w-xs mx-auto text-sm">
            {" "}
            Enter your Order ID to see real-time updates on your premium
            shipment.{" "}
          </p>{" "}
        </div>{" "}
        {/* Tracker Search */}
        <form
          onSubmit={handleTrack}
          className="bg-white rounded-[2.5rem] p-4 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col sm:flex-row gap-3"
        >
          {" "}
          <div className="relative flex-grow">
            {" "}
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />{" "}
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g. 65f...)"
              required
              className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-slate-50 border-none text-sm font-black text-zinc-950 focus:ring-2 focus:ring-lime-600/20 transition-all uppercase placeholder:normal-case"
            />{" "}
          </div>{" "}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary !px-10 !py-5 shadow-lg shadow-lime-600/30 flex items-center justify-center gap-3"
          >
            {" "}
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" /> Check Status
              </>
            )}
          </button>{" "}
        </form>{" "}
        {error && (
          <div className="p-6 bg-red-50 rounded-[2rem] border border-red-100 flex items-center gap-4 text-red-600 animate-in fade-in zoom-in duration-300">
            {" "}
            <AlertCircle className="w-6 h-6" />{" "}
            <p className="text-sm font-black uppercase tracking-widest">
              {error}
            </p>{" "}
          </div>
        )}
        {/* Progress Results */}
        {order && (
          <div className="space-y-10 animate-in slide-in-from-bottom-5 duration-700">
            {" "}
            {/* Summary Header */}
            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm">
              {" "}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-slate-50">
                {" "}
                <div className="space-y-2">
                  {" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <div className="w-3 h-3 rounded-full bg-lime-600 animate-pulse" />{" "}
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lime-600">
                      Active Shipment
                    </p>{" "}
                  </div>{" "}
                  <h3 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tighter uppercase">
                    {" "}
                    Order{" "}
                    <span className="text-slate-300">
                      #{order._id.slice(-8).toUpperCase()}
                    </span>{" "}
                  </h3>{" "}
                </div>{" "}
                <div className="flex items-center gap-8">
                  {" "}
                  <div>
                    {" "}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                      Placed On
                    </p>{" "}
                    <p className="text-sm font-black text-zinc-950">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>{" "}
                  </div>{" "}
                  <div
                    className={`px-6 py-3 rounded-2xl border-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                      order.status === "Cancelled"
                        ? "bg-red-50 text-red-600 border-red-100 shadow-red-100"
                        : "bg-lime-50 text-lime-700 border-lime-100 shadow-lime-100"
                    }
`}
                  >
                    {" "}
                    {order.status}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                {" "}
                {/* Left: Timeline */}
                <div className="space-y-8">
                  {" "}
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 border-l-2 border-lime-600 pl-4">
                    Delivery Status
                  </h4>{" "}
                  {order.status === "Cancelled" ? (
                    <div className="bg-red-50 rounded-[2.5rem] p-10 border border-red-100 text-center space-y-4">
                      {" "}
                      <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />{" "}
                      <h4 className="text-xl font-black text-zinc-950 tracking-tighter">
                        Order Cancelled
                      </h4>{" "}
                      <p className="text-slate-500 text-xs font-medium max-w-[200px] mx-auto">
                        This order was revoked. Please contact support if you
                        have questions.
                      </p>{" "}
                    </div>
                  ) : (
                    <div className="relative pl-12 space-y-12">
                      {" "}
                      <div className="absolute left-[23px] top-4 bottom-4 w-px bg-slate-100" />{" "}
                      {getSteps(order.status).map(
                        ({ icon: Icon, label, done }, i) => (
                          <div
                            key={label}
                            className="relative flex items-center gap-8 group"
                          >
                            {" "}
                            <div
                              className={`absolute -left-12 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 z-10 ${
                                done
                                  ? "bg-zinc-950 shadow-xl shadow-slate-200"
                                  : "bg-white border-2 border-slate-100 text-slate-200"
                              }
`}
                            >
                              {" "}
                              <Icon
                                className={`w-5 h-5 ${
                                  done ? "text-lime-600" : "text-slate-200"
                                }
`}
                              />{" "}
                            </div>{" "}
                            <div>
                              {" "}
                              <p
                                className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 ${
                                  done ? "text-lime-600" : "text-slate-300"
                                }
`}
                              >
                                {" "}
                                Milestone 0{i + 1}
                              </p>{" "}
                              <h5
                                className={`text-sm font-black uppercase tracking-tight ${
                                  done ? "text-zinc-950" : "text-slate-200"
                                }
`}
                              >
                                {" "}
                                {label}
                              </h5>{" "}
                            </div>{" "}
                          </div>
                        ),
                      )}
                    </div>
                  )}
                  {order.trackingId && (
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex items-center justify-between mt-12">
                      {" "}
                      <div className="flex items-center gap-4">
                        {" "}
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                          {" "}
                          <Truck className="w-6 h-6 text-lime-600" />{" "}
                        </div>{" "}
                        <div>
                          {" "}
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            Carrier ID
                          </p>{" "}
                          <p className="text-sm font-black text-zinc-950 tracking-widest uppercase">
                            {order.trackingId}
                          </p>{" "}
                        </div>{" "}
                      </div>{" "}
                      <button className="text-[9px] font-black uppercase tracking-widest bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors">
                        {" "}
                        Copy{" "}
                      </button>{" "}
                    </div>
                  )}
                </div>{" "}
                {/* Right: Summary & Address */}
                <div className="space-y-8">
                  {" "}
                  {/* Items List */}
                  <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100">
                    {" "}
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
                      Package Contents
                    </h4>{" "}
                    <div className="space-y-6">
                      {" "}
                      {order.items.map((item: any) => (
                        <div
                          key={item.productId}
                          className="flex items-center gap-5"
                        >
                          {" "}
                          <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200 p-2 shadow-sm">
                            {" "}
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-slate-100 m-auto mt-3" />
                            )}
                          </div>{" "}
                          <div className="min-w-0 flex-1">
                            {" "}
                            <p className="text-xs font-black text-zinc-950 uppercase truncate mb-1">
                              {item.name}
                            </p>{" "}
                            <div className="flex justify-between items-center">
                              {" "}
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Qty: {item.quantity}
                              </p>{" "}
                              <p className="text-[10px] font-black text-zinc-950">
                                Rs {item.price.toLocaleString()}
                              </p>{" "}
                            </div>{" "}
                          </div>{" "}
                        </div>
                      ))}
                    </div>{" "}
                    <div className="mt-8 pt-8 border-t border-slate-200/60 flex justify-between items-center">
                      {" "}
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Amount Paid
                      </p>{" "}
                      <p className="text-2xl font-black text-zinc-950">
                        Rs {order.totalAmount.toLocaleString()}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Destination Address */}
                  <div className="bg-zinc-950 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-slate-900/10">
                    {" "}
                    <div className="flex items-center gap-4 mb-6">
                      {" "}
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                        {" "}
                        <MapPin className="w-5 h-5 text-lime-600" />{" "}
                      </div>{" "}
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">
                        Destination
                      </h4>{" "}
                    </div>{" "}
                    <div className="space-y-2">
                      {" "}
                      <p className="text-sm font-black uppercase">
                        {order.shippingAddress.firstName}
                        {order.shippingAddress.lastName}
                      </p>{" "}
                      <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[200px]">
                        {" "}
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city}
                        <br /> {order.shippingAddress.country}
                        {order.shippingAddress.zipCode}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            {/* Support Link */}
            <div className="bg-lime-600 rounded-3xl p-10 text-white text-center space-y-4 relative overflow-hidden group">
              {" "}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />{" "}
              <Zap className="w-8 h-8 mx-auto text-white/50" />{" "}
              <h4 className="text-xl font-black uppercase tracking-widest">
                Need Assistance?
              </h4>{" "}
              <p className="text-white/80 text-xs font-medium max-w-xs mx-auto">
                Our premium support team is available 24/7 to help with your
                delivery journey.
              </p>{" "}
              <Link
                href="/contact"
                className="inline-block bg-zinc-950 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors mt-4"
              >
                {" "}
                Contact Support{" "}
              </Link>{" "}
            </div>{" "}
          </div>
        )}
        <div className="text-center pt-8">
          {" "}
          <Link
            href="/shop"
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-lime-600 transition-colors flex items-center justify-center gap-2 group"
          >
            {" "}
            Return to Store{" "}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-lime-600" />
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
