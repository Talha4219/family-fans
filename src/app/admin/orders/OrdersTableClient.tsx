"use client";
import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronRight,
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import OrderStatusSelect from "./OrderStatusSelect";
type Status =
  | "All"
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";
export default function OrdersTableClient({
  initialOrders,
}: {
  initialOrders: any[];
}) {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<Status>("All");
  const filteredOrders = useMemo(() => {
    return initialOrders.filter((order) => {
      const matchesStatus =
        activeStatus === "All" || order.status === activeStatus;
      const searchTerm = search.toLowerCase();
      const matchesSearch =
        order._id.toLowerCase().includes(searchTerm) ||
        order.shippingAddress.firstName.toLowerCase().includes(searchTerm) ||
        order.shippingAddress.lastName.toLowerCase().includes(searchTerm) ||
        order.shippingAddress.email.toLowerCase().includes(searchTerm) ||
        order.items.some((item: any) =>
          item.name.toLowerCase().includes(searchTerm),
        );
      return matchesStatus && matchesSearch;
    });
  }, [initialOrders, activeStatus, search]);
  const statusTabs: { label: Status; icon: any; color: string }[] = [
    { label: "All", icon: ShoppingBag, color: "text-slate-400" },
    { label: "Pending", icon: Clock, color: "text-lime-600" },
    { label: "Processing", icon: Filter, color: "text-blue-500" },
    { label: "Shipped", icon: Truck, color: "text-purple-500" },
    { label: "Delivered", icon: CheckCircle, color: "text-green-500" },
    { label: "Cancelled", icon: XCircle, color: "text-red-500" },
  ];
  return (
    <div className="space-y-8">
      {" "}
      {/* Filters and Tabs */}{" "}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm">
        {" "}
        <div className="flex flex-wrap gap-2">
          {" "}
          {statusTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveStatus(tab.label)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeStatus === tab.label ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
            >
              {" "}
              <tab.icon
                className={`w-3.5 h-3.5 ${activeStatus === tab.label ? "text-white" : tab.color}`}
              />{" "}
              {tab.label}{" "}
            </button>
          ))}{" "}
        </div>{" "}
        <div className="relative group max-w-md w-full">
          {" "}
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-lime-600 transition-colors" />{" "}
          <input
            type="text"
            placeholder="Search by ID, Customer, or Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-lime-600/20 font-medium text-sm transition-all"
          />{" "}
        </div>{" "}
      </div>{" "}
      {/* Table */}{" "}
      <div className="bg-white rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-900/5 overflow-hidden">
        {" "}
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          {" "}
          <h2 className="text-xl font-black text-[zinc-950] uppercase">
            {" "}
            {activeStatus} <span className="text-lime-600">Orders</span>{" "}
          </h2>{" "}
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            {" "}
            Showing {filteredOrders.length} results{" "}
          </span>{" "}
        </div>{" "}
        {filteredOrders.length === 0 ? (
          <div className="p-20 text-center">
            {" "}
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
              {" "}
              <ShoppingBag className="w-8 h-8 text-slate-200" />{" "}
            </div>{" "}
            <h3 className="text-xl font-black text-[zinc-950] mb-2 uppercase">
              No Matches Found
            </h3>{" "}
            <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm">
              Try adjusting your filters or search keywords.
            </p>{" "}
          </div>
        ) : (
          <div className="overflow-x-auto">
            {" "}
            <table className="w-full text-left border-collapse">
              {" "}
              <thead>
                {" "}
                <tr className="border-b border-slate-50 bg-slate-50/30">
                  {" "}
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Order & Items
                  </th>{" "}
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Customer Details
                  </th>{" "}
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Financials
                  </th>{" "}
                  <th className="p-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Management
                  </th>{" "}
                  <th className="p-8"></th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {filteredOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                  ><td className="p-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center font-black text-[zinc-950] text-xs border border-slate-100">
                          #{order._id.slice(-4).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-black text-[zinc-950] leading-none mb-1 uppercase tracking-tight">
                            {order.items.length}{" "}
                            {order.items.length === 1 ? "Item" : "Items"}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            {new Date(order.createdAt).toLocaleDateString(
                              undefined,
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    </td><td className="p-8">
                      <p className="text-sm font-black text-[zinc-950] uppercase tracking-tighter mb-1">
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                          {order.shippingAddress.city}
                        </p>
                      </div>
                    </td><td className="p-8">
                      <p className="text-lg font-black text-[zinc-950] tracking-tighter leading-none mb-1">
                        Rs {order.totalAmount.toLocaleString()}
                      </p>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${order.paymentStatus === "Paid" ? "text-green-500" : "text-lime-600"}`}
                      >
                        {order.paymentStatus || "Manual COD"}
                      </span>
                    </td><td className="p-8">
                      <OrderStatusSelect
                        orderId={order._id}
                        initialStatus={order.status}
                      />
                    </td><td className="p-8 text-right">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-[zinc-950] group-hover:text-white transition-all shadow-sm"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </td></tr>
                ))}{" "}
              </tbody>{" "}
            </table>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
