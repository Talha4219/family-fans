import {
  ShoppingCart,
  Clock,
  CheckCircle,
  Truck,
  Package,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { getOrders } from "@/lib/actions";
import OrdersTableClient from "./OrdersTableClient";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function OrdersPage() {
  const orders = (await getOrders()) as any[];
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    processing: orders.filter((o) => o.status === "Processing").length,
    revenue: orders.reduce((acc, curr) => acc + curr.totalAmount, 0),
  };
  return (
    <div className="space-y-12 pb-20">
      {" "}
      {/* Header */}{" "}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {" "}
        <div className="space-y-2">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <div className="w-10 h-10 rounded-2xl bg-lime-600 flex items-center justify-center shadow-lg shadow-lime-600/20">
              {" "}
              <ShoppingCart className="w-5 h-5 text-white" />{" "}
            </div>{" "}
            <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
              {" "}
              Order <span className="text-lime-600">Dashboard</span>{" "}
            </h1>{" "}
          </div>{" "}
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] pl-1">
            Professional Logistics Management
          </p>{" "}
        </div>{" "}
        <div className="flex items-center gap-4 bg-white p-2 rounded-3xl border border-slate-50 shadow-sm">
          {" "}
          <div className="px-6 py-2">
            {" "}
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-0.5">
              Total Revenue
            </p>{" "}
            <p className="text-lg font-black text-[zinc-950] tracking-tighter">
              Rs {stats.revenue.toLocaleString()}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Quick Stats Grid */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {" "}
        {[
          {
            label: "Total Orders",
            value: stats.total,
            icon: ShoppingCart,
            color: "text-slate-900",
            shadow: "shadow-slate-100",
          },
          {
            label: "Pending Action",
            value: stats.pending,
            icon: Clock,
            color: "text-lime-600",
            shadow: "shadow-lime-600/10",
          },
          {
            label: "In Processing",
            value: stats.processing,
            icon: Package,
            color: "text-blue-500",
            shadow: "shadow-blue-500/10",
          },
          {
            label: "Fulfilled",
            value: orders.filter((o) => o.status === "Delivered").length,
            icon: CheckCircle,
            color: "text-green-500",
            shadow: "shadow-green-500/10",
          },
        ].map((s) => (
          <div
            key={s.label}
            className={`bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-xl ${s.shadow} hover:-translate-y-1 transition-transform duration-300`}
          >
            {" "}
            <div className="flex items-start justify-between mb-4">
              {" "}
              <s.icon className={`w-6 h-6 ${s.color}`} />{" "}
              <span className="text-[10px] font-black bg-slate-50 px-2 py-1 rounded text-slate-400 tracking-widest">
                REALTIME
              </span>{" "}
            </div>{" "}
            <p className="text-3xl font-black text-[zinc-950] mb-1">{s.value}</p>{" "}
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {s.label}
            </p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {/* Interactive Table Section */}{" "}
      <OrdersTableClient initialOrders={orders} />{" "}
    </div>
  );
}
