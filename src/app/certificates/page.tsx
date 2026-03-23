"use client";

import {
  Award,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Zap,
  ArrowRight,
  ExternalLink,
  Search,
  Maximize2,
  X,
  Download,
  ScrollText,
  Star,
  Globe,
  Clock,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { NewsletterSection } from "@/components/HomeSections";

const certificates = [
  {
    id: "neeca",
    title: "NEECA Energy Label",
    organization: "National Energy Efficiency & Conservation Authority",
    description: "Official energy efficiency certification verifying the high-performance standards and energy savings of our products. This label ensures our appliances meet stringent national power consumption benchmarks.",
    date: "2024 - 2025",
    category: "Efficiency",
    image: "/certificate.jpeg",
    pdfUrl: "/certificates.pdf",
    isPrimary: true,
    stats: [
      { label: "Efficiency Rating", value: "5-Star" },
      { label: "Power Saving", value: "Up to 65%" },
    ]
  },
  {
    id: "iso-9001",
    title: "ISO 9001:2015",
    organization: "International Organization for Standardization",
    description: "Certified Quality Management System (QMS) ensuring consistent product quality and customer satisfaction through rigorous process controls.",
    date: "2024 - 2027",
    category: "Quality",
    image: "/hero/hero.jpg",
    pdfUrl: "/certificates.pdf",
    stats: [
      { label: "Valid Until", value: "2027" },
      { label: "Scope", value: "QMS" },
    ]
  },
  {
    id: "iso-14001",
    title: "ISO 14001:2015",
    organization: "International Organization for Standardization",
    description: "Environmental Management System certification for our commitment to sustainable manufacturing and eco-friendly operations.",
    date: "2023 - 2026",
    category: "Environmental",
    image: "/hero/heater.jpg",
    pdfUrl: "/certificates.pdf",
    stats: [
      { label: "Impact", value: "Sustainable" },
      { label: "Audit", value: "Passed" },
    ]
  },
  {
    id: "ce-mark",
    title: "CE Marking",
    organization: "European Economic Area",
    description: "Conformance with health, safety, and environmental protection standards for products sold within the European Economic Area.",
    date: "Valid 2025",
    category: "Safety",
    image: "/hero/purifier.png",
    pdfUrl: "/certificates.pdf",
    stats: [
      { label: "Market", value: "EEA" },
      { label: "Safety", value: "A+" },
    ]
  },
  {
    id: "pcsir",
    title: "PCSIR Certified",
    organization: "Pakistan Council of Scientific & Industrial Research",
    description: "Locally recognized certification for electrical safety and performance efficiency standards in Pakistan's diverse climate conditions.",
    date: "Annual 2024",
    category: "Regional",
    image: "/hero/fan.png",
    pdfUrl: "/certificates.pdf",
    stats: [
      { label: "Type", value: "National" },
      { label: "Lab", value: "Certified" },
    ]
  },
];

const BackgroundIcons = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          {i % 2 === 0 ? (
            <ShieldCheck className="w-12 h-12 text-lime-600/30" />
          ) : (
            <Award className="w-16 h-16 text-slate-300/30" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default function CertificatesPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springScroll, [0, 1], [0, 5]);

  const primaryCert = certificates.find((c) => c.isPrimary);
  const otherCerts = certificates.filter((c) => !c.isPrimary);

  return (
    <div ref={containerRef} className="bg-white min-h-screen font-body selection:bg-lime-200">
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-zinc-950/98 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[1100]"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-12 h-12" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage} alt="Certificate view" fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Dynamic Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50/50" />
        <BackgroundIcons />
        
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-lime-400/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100 mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-lime-600 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Verified Excellence 2025</span>
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-black text-zinc-950 tracking-tight leading-[0.85] mb-8">
                TRUSTED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-700">CERTIFIED</span> <br />
                QUALITY.
              </h1>

              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg mb-12">
                Our commitment to global standards isn't just a promise—it's documented. 
                Explore the certifications that power FamilyFans quality.
              </p>

              <div className="flex flex-wrap gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-5 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-zinc-950/20 flex items-center gap-3 group"
                >
                  Explore Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-14 h-14 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-sm">
                      <Image src={`/hero/${i % 2 === 0 ? 'hero' : 'heater'}.jpg`} alt="Quality" width={56} height={56} className="object-cover" />
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-2xl border-4 border-white bg-lime-600 flex items-center justify-center text-white text-xs font-black shadow-sm">
                    +5
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-20 bg-white p-6 rounded-[3rem] shadow-2xl border border-slate-100">
                <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer" onClick={() => setSelectedImage(primaryCert?.image || '')}>
                  <Image src={primaryCert?.image || ''} alt="Cert" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                    <span className="text-lime-500 font-black text-xs uppercase tracking-widest mb-2">Primary Accreditation</span>
                    <h3 className="text-white text-2xl font-black tracking-tight uppercase leading-tight">{primaryCert?.title}</h3>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-lime-600 rounded-[2.5rem] -z-10 animate-spin-slow opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-slate-300 rounded-[2rem] -z-10 animate-bounce-slow opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Glassmorphism Section ──────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            style={{ rotateX }}
            className="bg-white/40 backdrop-blur-3xl rounded-[4rem] border border-white/50 shadow-2xl overflow-hidden shadow-slate-200/40"
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-12 md:p-20 order-2 lg:order-1">
                <div className="space-y-10">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-lime-600 rounded-3xl flex items-center justify-center shadow-lg shadow-lime-600/30">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h4 className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-1">Premier Certification</h4>
                      <h2 className="text-4xl md:text-6xl font-black text-zinc-950 tracking-tighter uppercase leading-[0.85]">
                        {primaryCert?.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-xl text-slate-500 font-medium leading-relaxed">
                    {primaryCert?.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6 pb-10 border-b border-slate-100">
                    {primaryCert?.stats.map((stat, i) => (
                      <div key={i}>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
                        <p className="text-2xl font-black text-zinc-950 uppercase">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <motion.a
                      whileHover={{ y: -5 }}
                      href={primaryCert?.pdfUrl}
                      target="_blank"
                      className="px-10 py-5 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3"
                    >
                      <FileText className="w-5 h-5" /> View Full Credentials
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href={primaryCert?.pdfUrl}
                      download
                      className="px-10 py-5 bg-white text-zinc-950 border border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-sm hover:bg-slate-50"
                    >
                      <Download className="w-5 h-5" /> Download PDF
                    </motion.a>
                  </div>
                </div>
              </div>

              <div className="relative h-[500px] lg:h-auto order-1 lg:order-2 group">
                <Image src={primaryCert?.image || ''} alt="Featured" fill className="object-cover" />
                <div className="absolute inset-0 bg-lime-600/10 group-hover:bg-transparent transition-colors duration-700" />
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 backdrop-blur-sm transition-all"
                >
                  <button 
                    onClick={() => setSelectedImage(primaryCert?.image || '')}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-zinc-950 shadow-2xl hover:bg-lime-600 hover:text-white transition-all transform hover:scale-110"
                  >
                    <Maximize2 className="w-8 h-8" />
                  </button>
                </motion.div>
                <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur p-6 rounded-3xl border border-white/50 shadow-xl max-w-xs hidden xl:block">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 italic">Official Quote</p>
                  <p className="text-sm font-bold text-zinc-950 leading-relaxed italic">
                    "Setting the benchmark for energy conservation in modern appliances."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Global Standards Grid ──────────────────────────────── */}
      <section className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-[10px] font-black text-lime-600 uppercase tracking-[0.4em] mb-4">Quality Ecosystem</h2>
              <h3 className="text-4xl md:text-5xl font-black text-zinc-950 tracking-tighter uppercase leading-none">
                ISO & International <br /> Standards Compliance.
              </h3>
            </div>
            <p className="text-slate-500 font-medium max-w-sm mb-2">
              Our factory operates under the most rigorous global auditing processes for safety and quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {otherCerts.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[3.5rem] border border-slate-100 p-8 md:p-12 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-12">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-lime-600 transition-colors duration-500">
                      <ScrollText className="w-8 h-8 text-lime-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="bg-slate-50 px-5 py-2 rounded-full border border-slate-100 group-hover:bg-lime-50 group-hover:border-lime-100 transition-colors">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 group-hover:text-lime-600">{cert.category}</span>
                    </div>
                  </div>

                  <div className="space-y-6 flex-grow">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{cert.organization}</h4>
                      <h3 className="text-2xl font-black text-zinc-950 tracking-tight uppercase leading-[0.9]">{cert.title}</h3>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                      {cert.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-50">
                    {cert.stats.map((s, j) => (
                      <div key={j}>
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{s.label}</span>
                        <p className="text-[11px] font-bold text-zinc-950 uppercase">{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex items-center gap-4">
                    <button 
                      onClick={() => setSelectedImage(cert.image)}
                      className="btn-primary !bg-zinc-950 !py-4 !px-8 text-[10px] flex-grow tracking-[0.2em]"
                    >
                      Inspect Certificate
                    </button>
                    <Link 
                      href={cert.pdfUrl} 
                      target="_blank"
                      className="w-14 h-14 rounded-2xl border border-slate-100 flex items-center justify-center hover:bg-lime-50 hover:border-lime-100 transition-colors"
                    >
                      <Download className="w-5 h-5 text-zinc-950" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Immersive Verification Badge ────────────────────────── */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-zinc-950 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-zinc-950/40"
          >
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/Logo.png')", backgroundSize: '100px', backgroundRepeat: 'repeat' }} />
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 md:w-48 md:h-48 border-2 border-dashed border-white/20 rounded-full mx-auto mb-10 flex items-center justify-center"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 bg-lime-600 rounded-full flex items-center justify-center shadow-2xl shadow-lime-600/50">
                <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6 relative z-10">
              Unyielding <br /> <span className="text-lime-500">Authenticity.</span>
            </h2>
            <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-2xl mx-auto mb-12 relative z-10">
              Every document presented here is a live accreditation. We maintain a zero-tolerance policy for substandard components or unverified claims.
            </p>

            <Link href="/contact" className="btn-primary !bg-white !text-zinc-950 !px-12 !py-6 shadow-2xl shadow-white/10 hover:!bg-lime-600 hover:!text-white transition-all text-[11px] tracking-[0.3em]">
              Request Verification Support
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer Elements ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <NewsletterSection />
      </div>
      
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
