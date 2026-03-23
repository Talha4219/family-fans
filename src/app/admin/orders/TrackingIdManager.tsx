"use client";
import { useState } from "react";
import { updateOrder } from "@/lib/actions";
import { Truck, Check, Edit2 } from "lucide-react";
export default function TrackingIdManager({
  orderId,
  initialTrackingId,
}: {
  orderId: string;
  initialTrackingId?: string;
}) {
  const [trackingId, setTrackingId] = useState(initialTrackingId || "");
  const [isEditing, setIsEditing] = useState(!initialTrackingId);
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async () => {
    setIsSaving(true);
    const res = await updateOrder(orderId, { trackingId });
    if (res.success) {
      setIsEditing(false);
    } else {
      alert("Failed to update tracking ID");
    }
    setIsSaving(false);
  };
  if (!isEditing) {
    return (
      <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-between">
        {" "}
        <p className="font-black text-[zinc-950] uppercase tracking-widest">
          {trackingId}
        </p>{" "}
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 hover:bg-white rounded-lg transition-colors text-slate-400 hover:text-lime-600"
        >
          {" "}
          <Edit2 className="w-4 h-4" />{" "}
        </button>{" "}
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {" "}
      <div className="relative group">
        {" "}
        <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-lime-600 transition-colors" />{" "}
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter Tracking ID..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-lime-600/20 font-bold text-xs transition-all uppercase"
        />{" "}
      </div>{" "}
      <div className="flex gap-2">
        {" "}
        <button
          onClick={handleSave}
          disabled={isSaving || !trackingId}
          className="flex-1 bg-[zinc-950] text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {" "}
          {isSaving ? (
            "Saving..."
          ) : (
            <>
              <Check className="w-3.5 h-3.5" /> Save ID
            </>
          )}{" "}
        </button>{" "}
        {initialTrackingId && (
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50"
          >
            {" "}
            Cancel{" "}
          </button>
        )}{" "}
      </div>{" "}
    </div>
  );
}
