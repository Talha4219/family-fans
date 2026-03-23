import { Metadata } from "next";
import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  User,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = {
  title: "My Account — Orders, Wishlist & Settings | FamilyFans",
  description:
    "Manage your FamilyFans account. View order history, track deliveries, update saved addresses, and manage your wishlist all in one place.",
  robots: { index: false, follow: false },
};

const ACCOUNT_LINKS = [
  {
    href: "/account/orders",
    icon: Package,
    title: "Order History",
    desc: "View and track your past orders",
  },
  {
    href: "/wishlist",
    icon: Heart,
    title: "Wishlist",
    desc: "Your saved products",
  },
  {
    href: "/account/addresses",
    icon: MapPin,
    title: "Saved Addresses",
    desc: "Manage shipping addresses",
  },
  {
    href: "/account/payment",
    icon: CreditCard,
    title: "Payment Methods",
    desc: "Manage cards and billing",
  },
  {
    href: "/account/profile",
    icon: User,
    title: "Profile Settings",
    desc: "Edit name, email, and password",
  },
];

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = session.user;
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-zinc-950 tracking-tighter uppercase mb-2">
            My <span className="text-lime-600">Account</span>
          </h1>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Manage your digital workspace & orders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sidebar / Profile Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-lime-600 rounded-[2rem] flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-lime-600/20 mb-6">
                  {initials}
                </div>
                <h3 className="text-xl font-black text-zinc-950 tracking-tight leading-none mb-2">
                  {user?.name}
                </h3>
                <p className="text-xs font-bold text-slate-400 mb-6 truncate w-full px-2">
                  {user?.email}
                </p>
                <div className="bg-lime-50 text-lime-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Verified Member
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 rounded-[2rem] p-8 text-white">
              <p className="text-[10px] font-black text-lime-600 uppercase tracking-widest mb-4">Account Status</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Membership</span>
                  <span className="font-bold">Standard</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Joined</span>
                  <span className="font-bold">March 2026</span>
                </div>
              </div>
            </div>

            <SignOutButton />
          </div>

          {/* Account Navigation Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ACCOUNT_LINKS.map(({ href, icon: Icon, title, desc }) => (
              <Link
                key={href}
                href={href}
                className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:border-lime-200 hover:shadow-xl hover:shadow-lime-600/5 transition-all"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-600 group-hover:text-white transition-all shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-zinc-950 tracking-tight mb-2 uppercase italic leading-none">
                  {title}
                </h4>
                <p className="text-xs font-medium text-slate-400 leading-relaxed">
                  {desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-lime-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Manage Now <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
