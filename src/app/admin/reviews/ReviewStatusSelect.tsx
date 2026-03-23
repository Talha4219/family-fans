"use client";

import { useState } from "react";
import { updateReviewStatus } from "@/lib/actions";
import { ChevronDown } from "lucide-react";

interface ReviewStatusSelectProps {
  reviewId: string;
  initialStatus: string;
}

const STATUSES = ["Pending", "Approved", "Rejected"];

export default function ReviewStatusSelect({
  reviewId,
  initialStatus,
}: ReviewStatusSelectProps) {
  const [status, setStatus] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsUpdating(true);
    try {
      await updateReviewStatus(reviewId, newStatus);
    } catch (error) {
      console.error("Failed to update status", error);
      setStatus(initialStatus); // revert on error
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "Pending":
        return "bg-lime-100 text-orange-700 border-lime-200";
      case "Approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="relative inline-block w-32">
      <select
        value={status}
        onChange={handleStatusChange}
        disabled={isUpdating}
        className={`appearance-none w-full text-xs font-black uppercase tracking-widest pl-4 pr-10 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors cursor-pointer ${getStatusColor(status)} ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s} className="bg-white text-[zinc-950]">
            {s}
          </option>
        ))}
      </select>
      <div
        className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${isUpdating ? "opacity-50" : ""}`}
      >
        <ChevronDown className="w-4 h-4 opacity-50" />
      </div>
    </div>
  );
}
