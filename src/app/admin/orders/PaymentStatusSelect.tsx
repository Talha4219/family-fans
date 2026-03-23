"use client";
import { useState } from "react";
import { updateOrder } from "@/lib/actions";
import { ChevronDown, CreditCard, Loader2 } from "lucide-react";
export default function PaymentStatusSelect({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus || "Pending");
  const [loading, setLoading] = useState(false);
  const statuses = ["Pending", "Paid", "Failed", "Refunded"];
  const handleChange = async (newStatus: string) => {
    setLoading(true);
    const res = await updateOrder(orderId, { paymentStatus: newStatus });
    if (res.success) {
      setStatus(newStatus);
    } else {
      alert("Failed to update payment status");
    }
    setLoading(false);
  };
  return (
    <div className="relative group">
      {" "}
      <select
        value={status}
        disabled={loading}
        onChange={(e) => handleChange(e.target.value)}
        className={`w-full appearance-none p-4 pr-12 rounded-2xl border font-black uppercase tracking-widest text-xs transition-all outline-none ${status === "Paid" ? "border-green-100 bg-green-50 text-green-600" : status === "Failed" ? "border-red-100 bg-red-50 text-red-600" : "border-lime-100 bg-lime-50 text-lime-700"}`}
      >
        {" "}
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}{" "}
      </select>{" "}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        {" "}
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}{" "}
      </div>{" "}
    </div>
  );
}
