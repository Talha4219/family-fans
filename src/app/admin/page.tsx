import { getOrderAnalytics } from "@/lib/actions";

import {
  Package,
  DollarSign,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Calendar,
  Plus,
  ShoppingCart,
  MessageSquare,
  AlertTriangle,
  Star,
  CheckCircle,
  Zap,
  Box,
  LayoutGrid,
  Settings,
  LogOut,
} from "lucide-react";

import Link from "next/link";

export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function AdminDashboard() {
  const analytics = await getOrderAnalytics();

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        {" "}
        <Activity className="w-12 h-12 mb-4 animate-pulse" />{" "}
        <p className="font-black uppercase tracking-widest text-xs">
          Initializing Neural Link...
        </p>{" "}
      </div>
    );
  }

  const stats = [
    {
      title: "Net Revenue",
      value: `Rs ${analytics.totalRevenue.toLocaleString()}
`,
      icon: DollarSign,
      trend: "+12.5%",
      isUp: true,
      color: "text-green-500",
    },
    {
      title: "Total Orders",
      value: analytics.totalOrders.toString(),
      icon: ShoppingCart,
      trend: "+3.2%",
      isUp: true,
      color: "text-lime-600",
    },
    {
      title: "Total Customers",
      value: analytics.totalCustomers.toString(),
      icon: Users,
      trend: "+8.1%",
      isUp: true,
      color: "text-blue-500",
    },
    {
      title: "Avg. Order Value",
      value: `Rs ${Math.round(analytics.averageOrderValue).toLocaleString()}
`,
      icon: Package,
      trend: "Stable",
      isUp: true,
      color: "text-purple-500",
    },
  ];

  // Chart scaling: find max amount for height calculation
  const maxAmount = Math.max(
    ...analytics.salesData.map((d: any) => d.amount),
    1,
  );

  return (
    <div className="space-y-12 max-w-6xl pb-20">
      {" "}
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {" "}
        <div>
          {" "}
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            {" "}
            Admin <span className="text-lime-600">Dashboard</span>{" "}
          </h1>{" "}
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em] mt-1">
            Operational Pulse & Analytics
          </p>{" "}
          <div className="flex items-center gap-3 text-slate-600 mt-2">
            {" "}
            <Calendar className="w-3.5 h-3.5" />{" "}
            <span className="text-[10px] font-black uppercase tracking-widest">
              {" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>{" "}
          </div>{" "}
        </div>{" "}
        <div className="flex items-center gap-3">
          {" "}
          <button className="btn-secondary !bg-white border border-slate-100 !px-6 !py-3 text-[10px] font-black uppercase tracking-widest">
            {" "}
            Export Data{" "}
          </button>{" "}
          <Link
            href="/admin/products/add"
            className="btn-primary !px-6 !py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
          >
            {" "}
            <Plus className="w-4 h-4" /> Add Product{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {" "}
        {stats.map(({ title, value, icon: Icon, trend, isUp, color }) => (
          <div
            key={title}
            className="bg-white rounded-[2.5rem] p-8 border border-slate-50 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all group"
          >
            {" "}
            <div className="flex items-center justify-between mb-8">
              {" "}
              <div
                className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${
                  color
                }
group-hover:scale-110 transition-transform`}
              >
                {" "}
                <Icon className="w-6 h-6" />{" "}
              </div>{" "}
              <div
                className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${
                  isUp ? "text-green-500" : "text-red-500"
                }
`}
              >
                {" "}
                {isUp ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {trend}
              </div>{" "}
            </div>{" "}
            <div>
              {" "}
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 mb-2">
                {title}
              </p>{" "}
              <p className="text-2xl font-black text-[zinc-950] tracking-tighter">
                {value}
              </p>{" "}
            </div>{" "}
          </div>
        ))}
      </div>{" "}
      {/* Content Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {" "}
        {/* Sales Analytics Chart */}
        <div className="xl:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm flex flex-col min-h-[460px]">
          {" "}
          <div className="flex items-center justify-between mb-10">
            {" "}
            <div>
              {" "}
              <h3 className="text-sm font-black text-[zinc-950] uppercase tracking-widest mb-1 text-lime-600">
                Financial Performance
              </h3>{" "}
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Revenue trends over the last 30 days
              </p>{" "}
            </div>{" "}
            <div className="text-right">
              {" "}
              <p className="text-xs font-black text-[zinc-950]">
                Rs {analytics.totalRevenue.toLocaleString()}
              </p>{" "}
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                Gross Total
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex-grow flex items-end gap-2 px-2 h-64">
            {" "}
            {analytics.salesData.map((data: any, i: number) => {
              const barHeight = (data.amount / maxAmount) * 100;

              return (
                <div
                  key={data.date}
                  className="flex-1 bg-slate-50 rounded-t-lg relative group h-full"
                >
                  {" "}
                  <div
                    className="absolute bottom-0 left-0 w-full bg-[zinc-950] rounded-t-lg transition-all duration-1000 group-hover:bg-lime-600"
                    style={{
                      height: `${Math.max(barHeight, 5)}
%`,
                    }}
                  />{" "}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[zinc-950] text-white text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                    {" "}
                    {data.date}: Rs {Math.round(data.amount)}
                  </div>{" "}
                </div>
              );
            })}
          </div>{" "}
          <div className="flex items-center justify-between mt-6 px-2 text-[8px] font-black uppercase tracking-widest text-slate-400">
            {" "}
            <span>{analytics.salesData[0]?.date}</span>{" "}
            <span>{analytics.salesData[15]?.date}</span>{" "}
            <span>{analytics.salesData[29]?.date}</span>{" "}
          </div>{" "}
        </div>{" "}
        {/* Latest Activity */}
        <div className="flex flex-col gap-8">
          {" "}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-xl shadow-slate-900/20 flex-grow">
            {" "}
            <div className="flex items-center gap-3 mb-8 text-lime-600">
              {" "}
              <Activity className="w-5 h-5 animate-pulse" />{" "}
              <h3 className="text-sm font-black uppercase tracking-widest text-white">
                Operational Feed
              </h3>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              {analytics.recentActivity.length > 0 ? (
                analytics.recentActivity.map((order: any) => (
                  <Link
                    key={order._id}
                    href={`/admin/orders`}
                    className="flex gap-4 group cursor-pointer border-b border-white/5 pb-4 last:border-0"
                  >
                    {" "}
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-lime-600 transition-colors">
                      {" "}
                      <Package className="w-5 h-5 text-slate-400 group-hover:text-white" />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <p className="text-[10px] font-black text-white uppercase tracking-tight">
                        Order #{order._id.toString().slice(-6).toUpperCase()}
                      </p>{" "}
                      <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">
                        {" "}
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        by {order.shippingAddress.firstName}
                      </p>{" "}
                    </div>{" "}
                  </Link>
                ))
              ) : (
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest pt-10 text-center">
                  No recent records detected.
                </p>
              )}
            </div>{" "}
          </div>{" "}
          <Link
            href="/admin/orders"
            className="w-full py-5 border border-slate-100 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-[zinc-950] hover:bg-slate-50 transition-colors text-center"
          >
            {" "}
            All Transitions{" "}
          </Link>{" "}
        </div>{" "}
      </div>{" "}
      {/* Data Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {" "}
        {/* Low Stock Alerts */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm">
          {" "}
          <div className="flex items-center justify-between mb-8">
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <AlertTriangle className="w-5 h-5 text-red-500" />{" "}
              <h3 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
                Resource Scarcity
              </h3>{" "}
            </div>{" "}
            <Link
              href="/admin/products"
              className="text-[10px] font-black uppercase text-lime-600 hover:underline"
            >
              Restock All
            </Link>{" "}
          </div>{" "}
          <div className="space-y-4">
            {" "}
            {analytics.lowStockProducts.length > 0 ? (
              analytics.lowStockProducts.map((p: any) => (
                <div
                  key={p._id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-red-100 transition-colors"
                >
                  {" "}
                  <div className="flex items-center gap-4">
                    {" "}
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center">
                      {" "}
                      <Package className="w-5 h-5 text-slate-300" />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <p className="text-xs font-black text-[zinc-950] uppercase tracking-tighter">
                        {p.name}
                      </p>{" "}
                      <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">
                        ID: {p._id.toString().slice(-8).toUpperCase()}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="text-right">
                    {" "}
                    <p className="text-xs font-black text-red-500 tracking-tighter">
                      {p.stock}
                      units left
                    </p>{" "}
                  </div>{" "}
                </div>
              ))
            ) : (
              <div className="py-10 text-center bg-slate-50 rounded-2xl">
                {" "}
                <CheckCircle className="w-8 h-8 text-green-200 mx-auto mb-2" />{" "}
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  All silos populated.
                </p>{" "}
              </div>
            )}
          </div>{" "}
        </div>{" "}
        {/* Top Selling Products */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm">
          {" "}
          <div className="flex items-center justify-between mb-8">
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <TrendingUp className="w-5 h-5 text-emerald-500" />{" "}
              <h3 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
                High-Demand Nodes
              </h3>{" "}
            </div>{" "}
            <Link
              href="/admin/analytics"
              className="text-[10px] font-black uppercase text-lime-600 hover:underline"
            >
              Market Dynamics
            </Link>{" "}
          </div>{" "}
          <div className="space-y-4">
            {" "}
            {analytics.topSellingProducts.length > 0 ? (
              analytics.topSellingProducts.map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-lime-50 transition-colors cursor-pointer group"
                >
                  {" "}
                  <div className="flex items-center gap-4">
                    {" "}
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover:bg-lime-600 transition-colors">
                      {" "}
                      <Zap className="w-5 h-5 text-slate-300 group-hover:text-white" />{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <p className="text-xs font-black text-[zinc-950] uppercase tracking-tighter">
                        {p.name}
                      </p>{" "}
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        {p.sales}
                        Multi-units Sold
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <p className="text-xs font-black text-[zinc-950] tracking-tighter">
                    Rs {p.price.toLocaleString()}
                  </p>{" "}
                </div>
              ))
            ) : (
              <div className="py-10 text-center bg-slate-50 rounded-2xl">
                {" "}
                <Box className="w-8 h-8 text-slate-200 mx-auto mb-2" />{" "}
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Awaiting market feedback.
                </p>{" "}
              </div>
            )}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Reviews & Activity Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {" "}
        {/* Latest Reviews */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm">
          {" "}
          <div className="flex items-center justify-between mb-10">
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <MessageSquare className="w-5 h-5 text-blue-500" />{" "}
              <h3 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">
                Latest Reviews
              </h3>{" "}
            </div>{" "}
            <Link
              href="/admin/reviews"
              className="btn-secondary !py-2 !px-4 text-[8px] font-black uppercase"
            >
              Moderate
            </Link>{" "}
          </div>{" "}
          <div className="space-y-8">
            {" "}
            {analytics.latestReviews.length > 0 ? (
              analytics.latestReviews.map((review: any) => (
                <div key={review._id} className="space-y-4">
                  {" "}
                  <div className="flex items-center justify-between">
                    {" "}
                    <div className="flex items-center gap-3">
                      {" "}
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 uppercase">
                        {" "}
                        {review.userName.slice(0, 2)}
                      </div>{" "}
                      <div>
                        {" "}
                        <p className="text-xs font-black text-[zinc-950]">
                          {review.userName}
                        </p>{" "}
                        <div className="flex gap-0.5">
                          {" "}
                          {[...Array(5)].map((_, s) => (
                            <Star
                              key={s}
                              className={`w-2.5 h-2.5 ${
                                s < review.rating
                                  ? "text-lime-600 fill-lime-600"
                                  : "text-slate-200"
                              }
`}
                            />
                          ))}
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {" "}
                      {new Date(review.createdAt).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>{" "}
                  </div>{" "}
                  <p className="text-[11px] font-medium text-slate-500 leading-relaxed line-clamp-2">
                    "{review.comment}"{" "}
                  </p>{" "}
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-slate-500">
                {" "}
                <MessageSquare className="w-10 h-10 mx-auto mb-4 opacity-20" />{" "}
                <p className="text-[10px] font-black uppercase tracking-widest">
                  Awaiting public sentiment.
                </p>{" "}
              </div>
            )}
          </div>{" "}
        </div>{" "}
        {/* Operations Pulse */}
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
          {" "}
          <div className="absolute top-0 right-0 p-12 opacity-[0.05] group-hover:opacity-10 transition-opacity">
            {" "}
            <Box className="w-64 h-64" />{" "}
          </div>{" "}
          <div className="relative z-10">
            {" "}
            <div className="flex items-center gap-4 mb-8">
              {" "}
              <div className="w-12 h-12 rounded-2xl bg-lime-600 flex items-center justify-center">
                {" "}
                <CheckCircle className="w-6 h-6 text-white" />{" "}
              </div>{" "}
              <h3 className="text-xl font-black uppercase leading-none">
                Operations{" "}
                <span className="text-lime-600 block text-[10px] font-black uppercase tracking-widest mt-1">
                  Pulse Optimal
                </span>
              </h3>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              {[
                {
                  label: "Active Sessions",
                  val: "Neural linked",
                },
                {
                  label: "Pending Reviews",
                  val: analytics.pendingReviewsCount.toString(),
                  highlight: analytics.pendingReviewsCount > 0,
                },
                {
                  label: "Unread Inquiries",
                  val: analytics.unreadMessagesCount.toString(),
                  highlight: analytics.unreadMessagesCount > 0,
                },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex justify-between items-center py-4 border-b border-white/5"
                >
                  {" "}
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                    {p.label}
                  </span>{" "}
                  <span
                    className={`text-xs font-black uppercase ${
                      p.highlight ? "text-lime-600" : "text-white"
                    }
`}
                  >
                    {p.val}
                  </span>{" "}
                </div>
              ))}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Quick Access Matrix */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-50 shadow-sm mt-12">
        {" "}
        <div className="flex items-center gap-3 mb-10">
          {" "}
          <LayoutGrid className="w-5 h-5 text-lime-600" />{" "}
          <h3 className="text-sm font-black uppercase tracking-widest text-[zinc-950]">
            Direct Operational Matrix
          </h3>{" "}
        </div>{" "}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {" "}
          {[
            {
              label: "Orders",
              href: "/admin/orders",
              icon: ShoppingCart,
            },
            {
              label: "Reviews",
              href: "/admin/reviews",
              icon: Star,
              count: analytics.pendingReviewsCount,
            },
            {
              label: "Customers",
              href: "/admin/customers",
              icon: Users,
            },
            {
              label: "Messages",
              href: "/admin/messages",
              icon: MessageSquare,
              count: analytics.unreadMessagesCount,
            },
            {
              label: "Exit",
              href: "/",
              icon: LogOut,
            },
          ].map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-slate-50 hover:bg-lime-600 group transition-all relative"
            >
              {" "}
              {action.count && action.count > 0 ? (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full flex items-center justify-center">
                  {" "}
                  {action.count}
                </span>
              ) : null}
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:bg-lime-500 group-hover:text-white transition-all">
                {" "}
                <action.icon className="w-5 h-5" />{" "}
              </div>{" "}
              <h4 className="text-[10px] font-black text-[zinc-950] group-hover:text-white transition-colors uppercase tracking-widest">
                {action.label}
              </h4>{" "}
            </Link>
          ))}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
