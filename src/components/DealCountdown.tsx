"use client";
import { useEffect, useState } from "react";
import { Clock, Zap } from "lucide-react";
interface DealCountdownProps {
  endDate: string;
  maxQuantity?: number;
  soldQuantity: number;
}
export default function DealCountdown({
  endDate,
  maxQuantity,
  soldQuantity,
}: DealCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
  } | null>(null);
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date();
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      } else {
        setTimeLeft(null);
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [endDate]);
  if (!timeLeft) return null;
  const remaining = maxQuantity ? maxQuantity - soldQuantity : null;
  return (
    <div className="bg-[zinc-950] rounded-3xl p-6 text-white overflow-hidden relative group">
      {" "}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
        {" "}
        <Zap className="w-16 h-16 text-lime-600" />{" "}
      </div>{" "}
      <div className="relative z-10 space-y-4">
        {" "}
        <div className="flex items-center justify-between">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <div className="w-2 h-2 rounded-full bg-lime-600 animate-pulse" />{" "}
            <span className="text-[10px] font-black uppercase tracking-widest text-lime-600">
              Flash Deal Active
            </span>{" "}
          </div>{" "}
          {remaining !== null && remaining <= 20 && (
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400 animate-bounce">
              {" "}
              Only {remaining} left{" "}
            </span>
          )}{" "}
        </div>{" "}
        <div className="flex items-center gap-4">
          {" "}
          <Clock className="w-5 h-5 text-slate-500" />{" "}
          <div className="flex items-baseline gap-2">
            {" "}
            <div className="flex flex-col">
              {" "}
              <span className="text-2xl font-black">{timeLeft.hours}</span>{" "}
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">
                Hrs
              </span>{" "}
            </div>{" "}
            <span className="text-xl font-black text-slate-700">:</span>{" "}
            <div className="flex flex-col">
              {" "}
              <span className="text-2xl font-black">
                {timeLeft.minutes}
              </span>{" "}
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">
                Min
              </span>{" "}
            </div>{" "}
            <span className="text-xl font-black text-slate-700">:</span>{" "}
            <div className="flex flex-col">
              {" "}
              <span className="text-2xl font-black">
                {timeLeft.seconds}
              </span>{" "}
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">
                Sec
              </span>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {maxQuantity && (
          <div className="space-y-2">
            {" "}
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
              {" "}
              <div
                className="h-full bg-lime-600 transition-all duration-1000"
                style={{ width: `${(soldQuantity / maxQuantity) * 100}%` }}
              />{" "}
            </div>{" "}
            <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-500">
              {" "}
              <span>
                {Math.round((soldQuantity / maxQuantity) * 100)}% Claimed
              </span>{" "}
              <span>
                {soldQuantity} / {maxQuantity} Units
              </span>{" "}
            </div>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
}
