import { getOrderById } from "@/lib/actions";
import {
  ChevronLeft,
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  Calendar,
  ArrowLeft,
  Printer,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderStatusSelect from "../OrderStatusSelect";
import TrackingIdManager from "../TrackingIdManager";
import PaymentStatusSelect from "../PaymentStatusSelect";

import PrintButton from "../PrintButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OrderDetailsPage({
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
    <div className="max-w-6xl mx-auto space-y-8 pb-20 print:p-0 print:space-y-4">
      <div className="flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/orders"
            className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-[zinc-950] tracking-tighter uppercase leading-none mb-1">
              Order{" "}
              <span className="text-lime-600">
                #{order._id.slice(-6).toUpperCase()}
              </span>
            </h1>
            <p className="text-slate-500 font-medium text-xs flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <PrintButton />
      </div>

      {/* Print Header (Visible only in print) */}
      <div className="hidden print:block border-b-2 border-slate-900 pb-8 mb-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black uppercase">Packing Slip</h1>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
              Order #{order._id.toUpperCase()}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-black uppercase">FamilyFans</h2>
            <p className="text-sm font-medium">www.familyfans.net</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Items and Logistics */}
        <div className="lg:col-span-2 space-y-8 print:col-span-3">
          {/* Items Card */}
          <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm overflow-hidden print:border-none print:shadow-none print:rounded-none">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30 print:bg-transparent">
              <h2 className="text-xl font-black text-[zinc-950] flex items-center gap-3">
                <Package className="w-6 h-6 text-lime-600" /> Items Summary
              </h2>
              <span className="bg-white px-4 py-1 rounded-full border border-slate-100 text-xs font-black text-slate-500 uppercase tracking-widest leading-none print:hidden">
                {order.items.length} Products
              </span>
            </div>
            <div className="divide-y divide-slate-50">
              {order.items.map((item: any) => (
                <div
                  key={item.productId}
                  className="p-8 flex items-center gap-6 hover:bg-slate-50/30 transition-colors print:p-4"
                >
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex-shrink-0 overflow-hidden print:w-16 print:h-16">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-black text-[zinc-950] uppercase leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-[zinc-950]">
                      Rs {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-400 font-bold">
                      Rs {item.price.toLocaleString()} / unit
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 bg-slate-50/50 print:bg-transparent print:pt-4">
              <div className="space-y-3 max-w-sm ml-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-widest">
                    Subtotal
                  </span>
                  <span className="text-[zinc-950] font-black">
                    Rs {order.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase tracking-widest">
                    Estimation
                  </span>
                  <span className="text-[zinc-950] font-black">Rs 550.00</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-[zinc-950] font-black uppercase tracking-tighter text-xl">
                    Total Paid
                  </span>
                  <span className="text-3xl font-black text-[zinc-950] tracking-tighter">
                    Rs {(order.totalAmount + 550).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping/Tracking Card */}
          <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm p-8 print:hidden">
            <h2 className="text-xl font-black text-[zinc-950] flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6 text-blue-500" /> Shipping & Logistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Shipping Method
                </label>
                <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                  <p className="font-black text-[zinc-950] uppercase">
                    Standard Delivery
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Tracking provided via SMS
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Tracking Number
                </label>
                <TrackingIdManager
                  orderId={order._id}
                  initialTrackingId={order.trackingId}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customer and Status */}
        <div className="space-y-8 print:col-span-3 print:grid print:grid-cols-2 print:gap-8 print:space-y-0">
          {/* Order Status Action */}
          <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm p-8 space-y-6 print:hidden">
            <h2 className="text-lg font-black text-[zinc-950] uppercase">
              Fulfillment
            </h2>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Status
              </label>
              <OrderStatusSelect
                orderId={order._id}
                initialStatus={order.status}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Payment
              </label>
              <PaymentStatusSelect
                orderId={order._id}
                initialStatus={order.paymentStatus}
              />
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm p-8 space-y-6 print:border-none print:shadow-none print:p-4">
            <h2 className="text-lg font-black text-[zinc-950] flex items-center gap-3 print:text-sm">
              <User className="w-5 h-5 text-slate-400 print:hidden" /> Shipping
              Address
            </h2>
            <div className="space-y-4 print:space-y-2">
              <p className="text-sm font-black text-[zinc-950] uppercase tracking-tight">
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </p>
              <div className="space-y-2 text-sm text-slate-600 font-medium">
                <p className="leading-relaxed">
                  {order.shippingAddress.address}
                </p>
                <p className="uppercase tracking-widest font-black text-[10px] text-slate-400">
                  {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Contact Info (Print Only) */}
          <div className="bg-white rounded-[2.5rem] border border-slate-50 shadow-sm p-8 space-y-6 print:border-none print:shadow-none print:p-4">
            <h2 className="text-lg font-black text-[zinc-950] flex items-center gap-3 print:text-sm">
              <FileText className="w-5 h-5 text-slate-400 print:hidden" />{" "}
              Contact Info
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  Email
                </p>
                <p className="text-sm text-slate-600 font-bold">
                  {order.shippingAddress.email}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  Phone
                </p>
                <p className="text-sm text-slate-600 font-bold">
                  {order.shippingAddress.phone || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Footer */}
      <div className="hidden print:block pt-12 border-t border-slate-100 text-center">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          Thank you for choosing FamilyFans
        </p>
        <p className="text-[10px] text-slate-300 font-medium mt-1 uppercase tracking-widest">
          This is an automated packing slip - FamilyFans &copy; 2026
        </p>
      </div>
    </div>
  );
}
