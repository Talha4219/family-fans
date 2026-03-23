import { Metadata } from "next";
import Link from "next/link";
import { Package, ChevronRight, ArrowRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Order History — View Your Past Orders | FamilyFans",
  description:
    "View all your past FamilyFans orders, track shipments, and request returns or exchanges from your personal order history dashboard.",
  robots: { index: false, follow: false },
};
const MOCK_ORDERS = [
  {
    id: "ECO-10241",
    date: "Mar 10, 2026",
    status: "Delivered",
    total: 79.99,
    items: 2,
  },
  {
    id: "ECO-10198",
    date: "Feb 23, 2026",
    status: "Shipped",
    total: 44.99,
    items: 1,
  },
  {
    id: "ECO-10102",
    date: "Jan 15, 2026",
    status: "Processing",
    total: 149.99,
    items: 3,
  },
];
const STATUS_COLORS: Record<string, string> = {
  Delivered: "bg-green-50 text-green-700",
  Shipped: "bg-blue-50 text-blue-700",
  Processing: "bg-yellow-50 text-yellow-700",
};
export default function OrderHistoryPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
      {" "}
      <nav className="text-sm text-[var(--muted-text)] mb-6 flex items-center gap-2">
        {" "}
        <Link
          href="/account"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          Account
        </Link>{" "}
        <span>/</span>{" "}
        <span className="text-[var(--foreground)] font-medium">
          Orders
        </span>{" "}
      </nav>{" "}
      <h1
        className="text-2xl font-bold mb-6"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        Order History
      </h1>{" "}
      {MOCK_ORDERS.length > 0 ? (
        <div className="space-y-3">
          {" "}
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="border border-[var(--border)] rounded-xl p-5 hover:bg-[var(--muted)] transition-colors"
            >
              {" "}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {" "}
                <div className="flex items-center gap-4">
                  {" "}
                  <div className="w-10 h-10 bg-[var(--muted)] rounded-md flex items-center justify-center">
                    {" "}
                    <Package className="w-5 h-5 text-[var(--muted-text)]" />{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <p className="text-sm font-semibold">{order.id}</p>{" "}
                    <p className="text-xs text-[var(--muted-text)]">
                      {order.date} · {order.items} item
                      {order.items > 1 ? "s" : ""}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="flex items-center gap-3">
                  {" "}
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}
                  >
                    {order.status}
                  </span>{" "}
                  <p className="text-sm font-bold">Rs. {order.total.toLocaleString()}</p>{" "}
                  <Link
                    href={`/track-order?id=${order.id}`}
                    className="p-1 text-[var(--muted-text)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {" "}
                    <ChevronRight className="w-4 h-4" />{" "}
                  </Link>{" "}
                </div>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-[var(--border)] rounded-xl">
          {" "}
          <h2 className="text-lg font-medium mb-2">No orders yet</h2>{" "}
          <p className="text-sm text-[var(--muted-text)] mb-4">
            Start shopping to see your orders here.
          </p>{" "}
          <Link href="/shop" className="btn-primary !text-sm inline-flex">
            {" "}
            Shop Now <ArrowRight className="w-4 h-4" />{" "}
          </Link>{" "}
        </div>
      )}{" "}
    </div>
  );
}
