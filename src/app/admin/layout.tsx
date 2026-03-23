"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutGrid,
  Box,
  Layers,
  ShoppingCart,
  MessageSquare,
  Mail,
  FileText,
  Ticket,
  LogOut,
  Menu,
  X,
  Zap,
  Bell,
  Search,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const MENU_SECTIONS = [
  {
    title: "Operations",
    links: [
      { label: "Dashboard", href: "/admin", icon: LayoutGrid },
      { label: "Products", href: "/admin/products", icon: Box },
      { label: "Categories", href: "/admin/categories", icon: Layers },
      { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
    ],
  },
  {
    title: "Engagement",
    links: [
      { label: "Messages", href: "/admin/messages", icon: Mail },
      {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: MessageSquare,
      },
      { label: "Reviews", href: "/admin/reviews", icon: MessageSquare },
      { label: "Sales", href: "/admin/offers/sales", icon: Ticket },
      { label: "Blog", href: "/admin/blog", icon: FileText },
    ],
  },
];

function SidebarNav({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Brand */}
      <div className="flex items-center gap-3 p-8 pb-0 border-b border-slate-100 pb-6 mb-2">
        <div className="w-10 h-10 bg-lime-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-lime-600/30 flex-shrink-0">
          <Zap className="w-6 h-6" />
        </div>
        <span className="text-xl font-black text-[zinc-950] tracking-tighter">
          Store <span className="text-lime-600">Manager</span>
        </span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-6 space-y-6">
        {MENU_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-3 mb-3">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.links.map(({ href, icon: Icon, label }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/admin" && pathname.startsWith(href));
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      isActive
                        ? "bg-lime-50 text-lime-700"
                        : "text-slate-500 hover:text-[zinc-950] hover:bg-slate-50"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-lime-600" : ""}`}
                    />
                    <span className="truncate">{label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-lime-600 flex-shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-slate-100">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-black text-white bg-slate-900 hover:bg-slate-800 transition-all shadow-lg group justify-center"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Exit Admin
        </Link>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-72 xl:w-80 bg-white border-r border-slate-100 sticky top-0 h-screen flex-shrink-0">
        <SidebarNav pathname={pathname} onClose={closeSidebar} />
      </aside>

      {/* ── Mobile: Overlay backdrop ── */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] lg:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* ── Mobile: Sidebar Drawer ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-[110] lg:hidden shadow-2xl transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
          aria-label="Close menu"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>
        <SidebarNav pathname={pathname} onClose={closeSidebar} />
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-50 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-lime-50 hover:border-lime-200 hover:text-lime-700 transition-all"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-slate-400 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 cursor-text hover:border-slate-200 transition-colors">
              <Search className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wider">
                Search admin...
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-lime-600 rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-slate-100" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-[zinc-950] leading-tight">
                  {session?.user?.name || "Admin User"}
                </p>
                <p className="text-[10px] font-bold text-lime-600 uppercase tracking-widest leading-tight">
                  {(session?.user as any)?.role === 'admin' ? "Master Access" : "Unauthorized"}
                </p>
              </div>
              <div className="w-9 h-9 bg-lime-50 rounded-full flex items-center justify-center border-2 border-lime-200 cursor-pointer hover:border-lime-500 transition-all">
                <User className="w-4 h-4 text-lime-600" />
              </div>
            </div>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 min-w-0">{children}</main>
      </div>
    </div>
  );
}
