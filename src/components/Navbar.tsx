'use client';

import Link from 'next/link';
import {
  ShoppingCart, User, Menu, X, Search, LogOut, ChevronDown, Zap,
  LayoutGrid, Package, Users, Mail, HelpCircle, BookOpen, LifeBuoy,
  Fan, Wind, Shirt
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { getCategoryTree } from '@/lib/actions';
import { Category } from '@/lib/types';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import TopBar from './TopBar';

export default function Navbar() {
  const { data: session } = useSession();
  const { totalQuantity } = useSelector((state: RootState) => state.cart as any);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSubExpanded, setMobileSubExpanded] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for responsive header heights
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth Header Animation on Scroll
  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 80], isMobile ? [85, 65] : [140, 90]);
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)']
  );
  const headerBorder = useTransform(
    scrollY,
    [0, 80],
    ['rgba(255,255,255,0)', 'rgba(226,232,240,0.4)']
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 80],
    ['0 0 0 rgba(0,0,0,0)', '0 10px 40px -10px rgba(0,0,0,0.05)']
  );

  useEffect(() => {
    getCategoryTree().then(setCategories);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSearch = (q: string) => {
    const trimmed = q.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearchQuery('');
      setMobileSearchQuery('');
      setMobileOpen(false);
    }
  };

  const getDropdownItems = (keywords: string[]) => {
    const category = categories.find((c) => keywords.includes(c.slug));
    if (!category || !category.subCategories || category.subCategories.length === 0) return undefined;
    
    return category.subCategories.map((sub) => ({
      label: sub.name,
      href: `/shop?category=${category.slug}&sub=${sub.slug}`,
      subItems: sub.subCategories?.map((child) => ({
        label: child.name,
        href: `/shop?category=${category.slug}&sub=${sub.slug}&child=${child.slug}`,
      })),
    }));
  };

  const NAV_STRUCTURE = [
    {
      label: 'Shop',
      href: '/shop',
      icon: LayoutGrid,
      type: 'mega',
      dropdown: categories.map((cat) => ({
        label: cat.name,
        href: `/shop?category=${cat.slug}`,
        subItems: cat.subCategories?.map((sub) => ({
          label: sub.name,
          href: `/shop?category=${cat.slug}&sub=${sub.slug}`,
        })),
      })),
    },
    { 
      label: 'Fans', 
      href: '/shop?category=fans', 
      icon: Fan,
      type: 'simple',
      dropdown: getDropdownItems(['fans', 'fan'])
    },
    { 
      label: 'Air Cooler', 
      href: '/shop?category=room-coolers', 
      icon: Wind,
      type: 'simple',
      dropdown: getDropdownItems(['air-coolers', 'air-cooler', 'room-coolers', 'room-cooler'])
    },
    { 
      label: 'Washing Machine', 
      href: '/shop?category=washing-machines', 
      icon: Shirt,
      type: 'simple',
      dropdown: getDropdownItems(['washing-machines', 'washing-machine'])
    },
    { 
      label: 'BLDC Accessories', 
      href: '/shop?category=bldc-accessories', 
      icon: Zap,
      type: 'mega',
      dropdown: getDropdownItems(['bldc-accessories'])
    },
    { label: 'Blog', href: '/blog', icon: Package },
    {
      label: 'Support',
      href: '#',
      icon: LifeBuoy,
      type: 'simple',
      dropdown: [
        { label: 'Contact Us', href: '/contact', icon: Mail },
        { label: 'FAQ', href: '/faq', icon: HelpCircle },
        { label: 'About Us', href: '/about', icon: Users },
        { label: 'View Catalog', href: '/catalog', icon: BookOpen },
      ],
    },
  ];

  return (
    <>
      <TopBar />
      <motion.header
        style={{
          height: headerHeight,
          backgroundColor: headerBg,
          borderBottomColor: headerBorder,
          boxShadow: headerShadow,
          top: 40, // Height of TopBar
        }}
        className="fixed w-full z-[100] backdrop-blur-xl border-b flex items-center transition-all duration-500"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full flex items-center justify-between gap-2 sm:gap-10">
          {/* ── Logo ── */}
          <motion.div whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
            <Link href="/" className="flex items-center group flex-shrink-0">
              <Image
                src="/Logo.png"
                alt="FamilyFans Logo"
                width={200}
                height={90}
                className="h-10 sm:h-12 md:h-20 lg:h-24 w-auto object-contain transition-all duration-300"
                priority
              />
            </Link>
          </motion.div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-2" ref={dropdownRef}>
            {NAV_STRUCTURE.map((item) => {
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              const isOpen = activeDropdown === item.label;
              return (
                <div key={item.label} className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onClick={() => {
                      if (!hasDropdown) window.location.href = item.href;
                      else setActiveDropdown(isOpen ? null : item.label);
                    }}
                    className={`flex items-center gap-2 text-[15px] font-semibold tracking-wide capitalize transition-all px-4 py-2.5 rounded-2xl ${
                      isOpen ? 'bg-[lab(61.1055%_-41.0235_73.1483)] text-white shadow-lg' : 'text-zinc-950 hover:text-[lab(61.1055%_-41.0235_73.1483)] hover:bg-slate-50'
                    }`}
                  >
                    <Link href={item.href} className="hover:opacity-80">{item.label}</Link>
                    {hasDropdown && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    )}
                  </motion.button>
                  {/* Dropdown Panels */}
                  <AnimatePresence>
                    {hasDropdown && isOpen && item.type === 'mega' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onMouseEnter={() => setActiveDropdown(item.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        style={{ top: headerHeight }}
                        className="fixed left-0 right-0 w-full bg-white/95 backdrop-blur-3xl border-b border-slate-100 shadow-2xl z-[120] overflow-hidden rounded-b-[4rem]"
                      >
                        <div className="max-w-7xl mx-auto px-8 py-16">
                          <div className="grid grid-cols-4 gap-12">
                            {item.dropdown!.map((dropItem: any) => (
                              <div key={dropItem.href} className="space-y-6">
                                <Link
                                  href={dropItem.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="group/cat flex items-center gap-3 text-[15px] font-bold text-zinc-950 tracking-wide hover:text-[lab(61.1055%_-41.0235_73.1483)] transition-colors capitalize"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center group-hover/cat:bg-[lab(61.1055%_-41.0235_73.1483)]/10 transition-colors">
                                    <LayoutGrid className="w-4 h-4 text-[lab(61.1055%_-41.0235_73.1483)]" />
                                  </div>
                                  {dropItem.label}
                                </Link>
                                {dropItem.subItems && dropItem.subItems.length > 0 && (
                                  <div className="space-y-3 pl-11">
                                    {dropItem.subItems.map((sub: any) => (
                                      <Link
                                        key={sub.href}
                                        href={sub.href}
                                        onClick={() => setActiveDropdown(null)}
                                        className="block text-[14px] font-semibold text-slate-500 hover:text-[lab(61.1055%_-41.0235_73.1483)] transition-all hover:translate-x-1 capitalize"
                                      >
                                        {sub.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                            {/* Featured/Promo Section in Menu */}
                            <div className="bg-zinc-950 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                                <Zap className="w-24 h-24 text-[lab(61.1055%_-41.0235_73.1483)]" />
                              </div>
                              <div className="relative z-10">
                                <p className="text-[10px] font-black text-[lab(61.1055%_-41.0235_73.1483)] uppercase tracking-[0.3em] mb-4">Limited Edition</p>
                                <h4 className="text-xl font-heading font-black tracking-tighter mb-4">WINTER<br />ESSENTIALS</h4>
                                <Link
                                  href="/shop"
                                  onClick={() => setActiveDropdown(null)}
                                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-[lab(61.1055%_-41.0235_73.1483)] text-white px-5 py-3 rounded-xl hover:opacity-90 transition-colors shadow-lg"
                                >
                                  Explore Now
                                </Link>
                              </div>
                            </div>
                          </div>
                          {/* Bottom bar in Mega Menu */}
                          <div className="bg-slate-50/50 px-8 py-4 border-t border-slate-100 flex items-center justify-center gap-8 mt-8 -mx-8 -mb-16">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-slate-500" />
                              <span className="text-[9px] font-black text-slate-700 tracking-[0.2em]">FAST SHIPPING</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-slate-500" />
                              <span className="text-[9px] font-black text-slate-700 tracking-[0.2em]">PREMIUM SUPPORT</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            <div className="flex items-center gap-2">
                              <LayoutGrid className="w-4 h-4 text-slate-500" />
                              <span className="text-[9px] font-black text-slate-700 tracking-[0.2em]">CURATED QUALITY</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {hasDropdown && isOpen && item.type === 'simple' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setActiveDropdown(item.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                        className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-3xl rounded-2xl border border-slate-100 shadow-xl overflow-hidden z-[120]"
                      >
                        <div className="p-2 space-y-1">
                          {item.dropdown!.map((dropItem: any) => (
                            <Link
                              key={dropItem.href}
                              href={dropItem.href}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-3 px-4 py-3 text-[14px] font-semibold text-slate-600 hover:text-[lab(61.1055%_-41.0235_73.1483)] hover:bg-slate-50 rounded-xl transition-all"
                            >
                              {dropItem.icon && <dropItem.icon className="w-4 h-4 flex-shrink-0" />}
                              {dropItem.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Search (desktop) */}
            <motion.div
              initial={false}
              animate={{ width: searchQuery ? 180 : 140 }}
              className="hidden lg:flex items-center bg-slate-50/50 border border-slate-100/50 rounded-2xl px-4 py-2.5 gap-2 focus-within:bg-white focus-within:border-[lab(61.1055%_-41.0235_73.1483)]/30 focus-within:shadow-lg focus-within:shadow-[lab(61.1055%_-41.0235_73.1483)]/5 transition-all duration-300"
            >
              <Search className="w-4 h-4 text-slate-600 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                placeholder="SEARCH PRODUCTS..."
                className="bg-transparent border-none p-0 text-[11px] tracking-wider font-bold focus:ring-0 w-full placeholder:text-zinc-300 text-zinc-950 outline-none"
              />
            </motion.div>
            {/* Cart */}
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
              <Link
                href="/cart"
                className="relative p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-lime-200 hover:shadow-lime-100/50 transition-all flex items-center justify-center"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-950" />
                <AnimatePresence>
                  {totalQuantity > 0 && (
                    <motion.span
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 45 }}
                      className="absolute -top-1.5 -right-1.5 bg-lime-600 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg shadow-lime-600/30 border-2 border-white"
                    >
                      {totalQuantity > 9 ? '9+' : totalQuantity}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
            {/* User */}
            <div className="relative" ref={userDropdownRef}>
              {session ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-slate-100 bg-slate-50"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-zinc-950 flex items-center justify-center text-lime-600 shadow-lg flex-shrink-0">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] tracking-wider hidden xl:block text-zinc-950 font-bold">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-3 h-3 transition-transform hidden sm:block ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link href="/login" className="p-2.5 rounded-2xl bg-zinc-950 text-white hover:bg-slate-800 transition-colors block">
                  <User className="w-5 h-5" />
                </Link>
              )}

              <AnimatePresence>
                {session && userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 z-[150]"
                  >
                    <div className="px-4 py-3 border-b border-slate-50 mb-2">
                      <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Signed in as</p>
                      <p className="text-xs font-black text-zinc-950 truncate">{session.user?.email}</p>
                    </div>

                    <Link href="/account" className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-800 hover:text-zinc-950 hover:bg-slate-50 transition-colors">
                      <User className="w-4 h-4" /> My Profile
                    </Link>

                    {(session.user as any)?.role === 'admin' && (
                      <Link href="/admin" className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-lime-600 hover:bg-lime-50 transition-colors">
                        <LayoutGrid className="w-4 h-4" /> Admin Dashboard
                      </Link>
                    )}

                    <div className="h-px bg-slate-50 my-2" />

                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className={`md:hidden p-2.5 rounded-2xl bg-white border border-zinc-100 text-zinc-950 hover:bg-zinc-50 transition-colors ${mobileOpen ? 'opacity-0 pointer-events-none' : ''}`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Full-Screen Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.nav
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-50 flex items-center justify-between flex-shrink-0 bg-white">
                <Image
                  src="/Logo.png"
                  alt="FamilyFans Logo"
                  width={160}
                  height={70}
                  className="h-14 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-2xl bg-slate-50 text-zinc-950 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {/* Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1 min-h-0">
                {NAV_STRUCTURE.map((item) => {
                  const hasDropdown = item.dropdown && item.dropdown.length > 0;
                  const isExpanded = mobileExpanded === item.label;
                  return (
                    <div key={item.label}>
                      <div className="flex items-center">
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-4 flex-1 px-5 py-4 rounded-[1.5rem] tracking-wide text-[15px] font-bold transition-all capitalize ${
                            pathname === item.href ? 'bg-[lab(61.1055%_-41.0235_73.1483)] text-white shadow-xl' : 'text-zinc-950 hover:bg-slate-50'
                          }`}
                        >
                          <item.icon className={`w-4 h-4 flex-shrink-0 ${pathname === item.href ? 'text-white' : 'text-[lab(61.1055%_-41.0235_73.1483)]'}`} />
                          {item.label}
                        </Link>
                        {hasDropdown && (
                          <button
                            onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                            className="p-3 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-[lab(61.1055%_-41.0235_73.1483)] transition-colors mr-1"
                            aria-label="Expand"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                      {/* Sub-items */}
                      <AnimatePresence initial={false}>
                        {hasDropdown && isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-4 border-l border-lime-100 py-1 space-y-1">
                              {item.dropdown!.map((dropItem: any) => {
                                const hasSubItems = dropItem.subItems && dropItem.subItems.length > 0;
                                const isSubExpanded = mobileSubExpanded === dropItem.label;
                                return (
                                  <div key={dropItem.href} className="space-y-1">
                                    <div className="flex items-center">
                                      <Link
                                        href={dropItem.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="flex-1 px-3 py-2 text-[14px] font-semibold text-zinc-700 hover:text-[lab(61.1055%_-41.0235_73.1483)] transition-all tracking-wide capitalize"
                                      >
                                        {dropItem.label}
                                      </Link>
                                      {hasSubItems && (
                                        <button
                                          onClick={() => setMobileSubExpanded(isSubExpanded ? null : dropItem.label)}
                                          className="p-2 text-slate-400"
                                        >
                                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSubExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                      )}
                                    </div>
                                    {hasSubItems && isSubExpanded && (
                                      <div className="ml-3 pl-3 border-l border-slate-100 space-y-1">
                                        {dropItem.subItems.map((sub: any) => (
                                          <Link
                                            key={sub.href}
                                            href={sub.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="block px-3 py-2 text-[13px] font-semibold text-slate-500 hover:text-[lab(61.1055%_-41.0235_73.1483)] transition-all capitalize"
                                          >
                                            {sub.label}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              {/* Footer */}
              <div className="p-4 border-t border-slate-100 flex-shrink-0 space-y-3">
                <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(mobileSearchQuery)}
                    placeholder="Search products..."
                    className="bg-transparent border-none text-sm font-semibold focus:ring-0 w-full placeholder:text-slate-300 text-zinc-950 outline-none"
                  />
                </div>
                {session ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 px-2 py-1">
                      <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-lime-600">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-black text-sm text-zinc-950">{session.user?.name}</p>
                        <p className="text-[10px] text-zinc-400">{session.user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => signOut()}
                      className="w-full py-3 bg-red-50 border border-red-100 rounded-xl text-sm font-black text-red-600 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary w-full text-center py-4 text-sm font-black uppercase tracking-widest shadow-xl shadow-lime-600/20 flex items-center justify-center gap-2"
                  >
                    <User className="w-4 h-4" /> Login
                  </Link>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
