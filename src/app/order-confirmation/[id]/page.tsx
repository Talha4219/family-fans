import { getOrderById } from "@/lib/actions";
import {
  CheckCircle2,
  Package,
  ArrowRight,
  Home,
  ShoppingBag,
  Mail,
  Calendar,
  Truck,
  ShieldCheck,
  Zap,
  MapPin,
  CreditCard,
  FileText,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import DownloadReceiptButton from "../DownloadReceiptButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-10 md:py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Celebratory Header (Print-hidden) */}
        <div className="text-center mb-16 space-y-6 print:hidden">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-green-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20 relative z-10">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lime-600">
              Transaction Successful
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-[zinc-950] tracking-tighter">
              Order Confirmed
            </h1>
            <p className="text-slate-400 font-medium text-sm md:text-base max-w-md mx-auto">
              Thank you, {order.shippingAddress.firstName}! Your premium
              technology is on its way.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <DownloadReceiptButton />
          </div>
        </div>

        {/* Print Only Header */}
        <div className="hidden print:block border-b-2 border-slate-900 pb-10 mb-10">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-black uppercase">Order Receipt</h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                Order #{order._id.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-black uppercase tracking-tighter text-lime-600">
                FamilyFans
              </h2>
              <p className="text-xs font-medium text-slate-400">
                www.familyfans.net
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left: Summary & Items */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Info */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 print:shadow-none print:border-slate-200">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-lime-600" /> Order ID
                </span>
                <p className="text-sm font-black text-[zinc-950]">
                  #{order._id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-lime-600" /> Date
                </span>
                <p className="text-sm font-black text-[zinc-950]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <CreditCard className="w-3 h-3 text-lime-600" /> Payment
                </span>
                <p className="text-sm font-black text-[zinc-950]">
                  Cash on Delivery (COD)
                </p>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden print:shadow-none print:border-slate-200">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
                  Order Summary
                </h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {order.items.length} Items
                </span>
              </div>
              <div className="divide-y divide-slate-50">
                {order.items.map((item: any) => (
                  <div
                    key={item.productId}
                    className="p-8 flex items-center gap-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex-shrink-0 relative overflow-hidden print:hidden">
                      {item.imageUrl && (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-2"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-[zinc-950] uppercase text-sm mb-1">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-black text-[zinc-950]">
                      Rs {item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-slate-50/50">
                <div className="space-y-3 max-w-xs ml-auto">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-widest">
                      Subtotal
                    </span>
                    <span className="text-[zinc-950] font-black">
                      Rs {(order.totalAmount - 550).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-widest">
                      Shipping
                    </span>
                    <span className="text-[zinc-950] font-black">Rs 550.00</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                    <span className="text-[zinc-950] font-black uppercase tracking-tighter text-base">
                      Total
                    </span>
                    <span className="text-2xl font-black text-[zinc-950] tracking-tighter">
                      Rs {order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Logistics & Tracking (Print-hidden column) */}
          <div className="space-y-8">
            {/* Tracking Link (Print-hidden) */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-900/20 print:hidden relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <Truck className="w-20 h-20" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <Package className="w-4 h-4 text-lime-600" /> Track Shipment
              </h3>
              <p className="text-xs text-slate-400 font-medium mb-6 leading-relaxed">
                Need to see where your items are? Use our real-time tracker for
                live updates.
              </p>
              <Link
                href={`/track-order?id=${order._id}`}
                className="btn-primary !w-full !py-4 flex items-center justify-center gap-3 group/btn"
              >
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Open Tracker
                </span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8 print:shadow-none print:border-slate-200">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-lime-600" /> Shipping
                  Address
                </h4>
                <div className="text-xs font-bold text-[zinc-950] space-y-1">
                  <p className="uppercase">
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </p>
                  <p className="text-slate-500 font-medium normal-case">
                    {order.shippingAddress.address}
                  </p>
                  <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.zipCode}
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-50" />

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-lime-600" /> Billing
                  Address
                </h4>
                <div className="text-xs font-bold text-[zinc-950] space-y-1">
                  <p className="uppercase">
                    {order.billingAddress?.firstName ||
                      order.shippingAddress.firstName}{" "}
                    {order.billingAddress?.lastName ||
                      order.shippingAddress.lastName}
                  </p>
                  <p className="text-slate-500 font-medium normal-case">
                    {order.billingAddress?.address ||
                      order.shippingAddress.address}
                  </p>
                  <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">
                    {order.billingAddress?.city || order.shippingAddress.city},{" "}
                    {order.billingAddress?.zipCode ||
                      order.shippingAddress.zipCode}
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-slate-50" />

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-lime-600" /> Contact
                  Details
                </h4>
                <div className="text-xs font-bold text-[zinc-950] space-y-1">
                  <p className="normal-case">{order.shippingAddress.email}</p>
                  <p className="text-slate-500 font-medium">
                    {order.shippingAddress.phone || "No phone provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps (Print-hidden) */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 text-center space-y-6 print:hidden">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-black text-[zinc-950] tracking-tighter">
              Check your inbox
            </h4>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-md mx-auto">
              We've sent a detailed confirmation to your email. You'll receive
              another update once your items are ready for shipment.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center print:hidden">
          <Link
            href="/shop"
            className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[zinc-950] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Print Footer */}
        <div className="hidden print:block pt-20 text-center border-t border-slate-100 mt-20">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
            FamilyFans &copy; 2026 - Premium Home Components
          </p>
        </div>
      </div>
    </div>
  );
}
