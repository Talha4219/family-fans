"use client";

import {
  Zap,
  ShieldCheck,
  Truck,
  Users,
  Award,
  Heart,
  Globe,
  Target,
} from "lucide-react";

import Link from "next/link";
import { NewsletterSection } from "@/components/HomeSections";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {" "}
      {/* Split Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        {" "}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          {" "}
          <div className="space-y-8 relative z-10">
            {" "}
            <div className="inline-flex items-center gap-2 bg-lime-50 text-lime-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-lime-100">
              {" "}
              Since 2024 — Modernizing Homes{" "}
            </div>{" "}
            <h1 className="text-6xl md:text-8xl font-black text-[zinc-950] tracking-[ -0.05em] leading-[0.85]">
              {" "}
              The Future of <br />{" "}
              <span className="text-lime-600">Home Life.</span>{" "}
            </h1>{" "}
            <p className="text-slate-500 text-lg font-medium max-w-lg leading-relaxed">
              {" "}
              FamilyFans isn't just a store; it's a commitment to performance,
              reliability, and the seamless integration of technology into your
              daily routine.{" "}
            </p>{" "}
            <div className="flex gap-4 pt-4">
              {" "}
              <Link
                href="/shop"
                className="btn-primary !px-10 shadow-xl shadow-lime-600/20"
              >
                Explore Products
              </Link>{" "}
              <Link
                href="/contact"
                className="btn-secondary !bg-white border-2 border-slate-100 font-bold"
              >
                Get in Touch
              </Link>{" "}
            </div>{" "}
          </div>{" "}
          <div className="relative aspect-square lg:aspect-auto h-full min-h-[500px]">
            {" "}
            <div className="absolute inset-x-0 inset-y-12 bg-slate-50 rounded-[4rem] -rotate-2" />{" "}
            <div className="absolute inset-0 bg-white border-2 border-slate-100 rounded-[4rem] rotate-1 overflow-hidden shadow-2xl shadow-slate-200/50">
              {" "}
              <img
                src="/about.webp"
                alt="Modern Appliances"
                className="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-1000"
              />{" "}
              <div className="absolute inset-0 bg-gradient-to-t from-[zinc-950]/40 to-transparent" />{" "}
            </div>{" "}
            {/* Floating Metric */}
            <div className="absolute bottom-12 -left-8 bg-white p-6 rounded-3xl shadow-2xl shadow-slate-900/10 border border-slate-50 z-20 flex items-center gap-4">
              {" "}
              <div className="w-12 h-12 bg-lime-600 rounded-2xl flex items-center justify-center text-white">
                {" "}
                <Users className="w-6 h-6" />{" "}
              </div>{" "}
              <div>
                {" "}
                <p className="text-2xl font-black text-[zinc-950] tracking-tighter">
                  50K+
                </p>{" "}
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Happy Homes
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* Core Values Grid */}
      <section className="py-32 bg-white border-y border-slate-100 mt-24">
        {" "}
        <div className="max-w-7xl mx-auto px-6">
          {" "}
          <div className="text-center mb-20 space-y-4">
            {" "}
            <p className="text-lime-600 font-black text-[10px] uppercase tracking-[0.3em]">
              Our Foundations
            </p>{" "}
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-[zinc-950]">
              Built on Excellence
            </h2>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {" "}
            {[
              {
                icon: Target,
                title: "Precision Engineering",
                desc: "Every component is selected for its longevity and performance under heavy load.",
              },
              {
                icon: Globe,
                title: "Sustainable Sourcing",
                desc: "We prioritize energy-efficient models that reduce carbon footprints and utility costs.",
              },
              {
                icon: Heart,
                title: "Customer First",
                desc: "Our dedicated support team is available 24/7 to ensure your satisfaction never wanes.",
              },
            ].map((v, i) => (
              <div
                key={i}
                className="group p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all text-center"
              >
                {" "}
                <div className="w-16 h-16 bg-lime-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-lime-100 group-hover:scale-110 transition-transform">
                  {" "}
                  <v.icon className="w-8 h-8 text-lime-600" />{" "}
                </div>{" "}
                <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-[zinc-950]">
                  {v.title}
                </h3>{" "}
                <p className="text-slate-600 font-medium text-sm leading-relaxed">
                  {v.desc}
                </p>{" "}
              </div>
            ))}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* History / Mission */}
      <section className="py-24">
        {" "}
        <div className="max-w-7xl mx-auto px-6">
          {" "}
          <div className="bg-slate-50 rounded-[4rem] p-10 md:p-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center border border-slate-100">
            {" "}
            <div className="order-2 lg:order-1 relative h-96 lg:h-full min-h-[400px]">
              {" "}
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
                alt="Innovation"
                className="w-full h-full object-cover rounded-[3rem]"
              />{" "}
            </div>{" "}
            <div className="order-1 lg:order-2 space-y-8">
              {" "}
              <h2 className="text-4xl font-black text-[zinc-950] tracking-tighter">
                Revolutionizing the <br />
                <span className="text-lime-600">Appliance Industry.</span>
              </h2>{" "}
              <div className="space-y-6 text-slate-500 font-medium">
                {" "}
                <p>
                  We started with a simple observation: mid-tier appliances were
                  failing too often, and premium options were priced beyond
                  reach. FamilyFans was created to bridge that gap.
                </p>{" "}
                <p>
                  By eliminating the overhead of massive physical showrooms and
                  focusing on direct distribution, we provide high-performance
                  hardware at an accessible price point.
                </p>{" "}
              </div>{" "}
              <div className="grid grid-cols-2 gap-8 pt-6">
                {" "}
                <div>
                  {" "}
                  <p className="text-4xl font-black text-[zinc-950]">94%</p>{" "}
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                    Returning Rate
                  </p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <p className="text-4xl font-black text-[zinc-950]">
                    120+
                  </p>{" "}
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                    Service Centers
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      {/* CTA */}
      <section className="py-24 relative overflow-hidden bg-white">
        {" "}
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          {" "}
          <div className="w-20 h-20 bg-lime-100 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 rotate-12">
            {" "}
            <Zap className="w-10 h-10 text-lime-600" />{" "}
          </div>{" "}
          <h2 className="text-4xl md:text-6xl font-black text-[zinc-950] tracking-tight">
            Ready to upgrade your home?
          </h2>{" "}
          <p className="text-slate-500 font-medium text-lg max-w-xl mx-auto">
            Join thousands of households that have already made the switch to
            smarter, more efficient living.
          </p>{" "}
          <Link
            href="/shop"
            className="btn-primary !px-12 !py-5 shadow-2xl shadow-lime-600/20 inline-block"
          >
            Start Shopping Now
          </Link>{" "}
        </div>{" "}
      </section>{" "}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {" "}
        <NewsletterSection />{" "}
      </div>{" "}
    </div>
  );
}
