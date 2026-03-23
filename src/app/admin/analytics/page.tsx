import { getOrderAnalytics } from "@/lib/actions";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Users,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function AnalyticsPage() {
  const data = await getOrderAnalytics();
  if (!data)
    return (
      <div className="p-20 text-center font-black uppercase text-slate-400">
        Failed to load analytics
      </div>
    );
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
              <BarChart3 className="w-5 h-5 text-white" />{" "}
            </div>{" "}
            <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
              {" "}
              Business <span className="text-lime-600">Analytics</span>{" "}
            </h1>{" "}
          </div>{" "}
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] pl-1">
            Performance & Metrics Overview
          </p>{" "}
        </div>{" "}
      </div>{" "}
      {/* Top Metrics */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {" "}
        {[
          {
            label: "Total Revenue",
            value: `Rs ${data.totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            trend: "+12.5%",
            color: "text-green-500",
            bg: "bg-green-50",
          },
          {
            label: "Total Orders",
            value: data.totalOrders,
            icon: ShoppingCart,
            trend: "+5.2%",
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            label: "Avg Order Value",
            value: `Rs ${data.avgOrderValue.toFixed(0)}`,
            icon: TrendingUp,
            trend: "-1.4%",
            color: "text-lime-600",
            bg: "bg-lime-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm"
          >
            {" "}
            <div className="flex items-start justify-between mb-6">
              {" "}
              <div className={`p-4 rounded-2xl ${stat.bg}`}>
                {" "}
                <stat.icon className={`w-6 h-6 ${stat.color}`} />{" "}
              </div>{" "}
              <div className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                {" "}
                {stat.trend.startsWith("+") ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500" />
                )}{" "}
                <span
                  className={`text-[10px] font-black ${stat.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.trend}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <p className="text-3xl font-black text-[zinc-950] mb-1">
              {stat.value}
            </p>{" "}
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {" "}
        {/* Revenue Chart Placeholder/Visual */}{" "}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-900/5">
          {" "}
          <div className="flex items-center justify-between mb-8">
            {" "}
            <h2 className="text-xl font-black text-[zinc-950] uppercase">
              Order <span className="text-lime-600">Volume</span>
            </h2>{" "}
            <div className="flex gap-2">
              {" "}
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Last 7 Days
              </span>{" "}
            </div>{" "}
          </div>{" "}
          <div className="h-64 flex items-end justify-between gap-4">
            {" "}
            {data.dailyData.map(
              (d: { date: string; count: number }, i: number) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-4 group"
                >
                  {" "}
                  <div className="w-full relative">
                    {" "}
                    <div
                      className="w-full bg-slate-50 rounded-t-xl group-hover:bg-lime-600 transition-all duration-500"
                      style={{
                        height: `${(d.count / (Math.max(...data.dailyData.map((v: { count: number }) => v.count)) || 1)) * 100}%`,
                        minHeight: "8px",
                      }}
                    >
                      {" "}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[zinc-950] text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {" "}
                        {d.count}{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {d.date}
                  </span>{" "}
                </div>
              ),
            )}{" "}
          </div>{" "}
        </div>{" "}
        {/* Top Products */}{" "}
        <div className="bg-white p-8 rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-900/5">
          {" "}
          <h2 className="text-xl font-black text-[zinc-950] uppercase mb-8">
            Top <span className="text-lime-600">Products</span>
          </h2>{" "}
          <div className="space-y-6">
            {" "}
            {data.productRevenue.map(
              (p: { name: string; value: number }, i: number) => (
                <div key={p.name} className="flex items-center gap-6 group">
                  {" "}
                  <span className="text-2xl font-black text-slate-100 group-hover:text-lime-600 transition-colors">
                    0{i + 1}
                  </span>{" "}
                  <div className="flex-1">
                    {" "}
                    <h3 className="text-sm font-black text-[zinc-950] uppercase truncate">
                      {p.name}
                    </h3>{" "}
                    <div className="w-full h-2 bg-slate-50 rounded-full mt-2 overflow-hidden">
                      {" "}
                      <div
                        className="h-full bg-lime-600 rounded-full transition-all duration-1000"
                        style={{
                          width: `${(p.value / data.totalRevenue) * 100}%`,
                        }}
                      ></div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="text-right">
                    {" "}
                    <p className="text-sm font-black text-[zinc-950]">
                      Rs {p.value.toLocaleString()}
                    </p>{" "}
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {((p.value / data.totalRevenue) * 100).toFixed(1)}%
                    </p>{" "}
                  </div>{" "}
                </div>
              ),
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
