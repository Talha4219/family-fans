"use client";

import Link from "next/link";

import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

// Note: In production, wishlist would be persisted to user's account via a server action.
// This is a client-side demo that shows the wishlist UI pattern.
export default function WishlistPage() {
  // Mock wishlist items for demonstration
  const items: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  }[] = [];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      {" "}
      <nav className="text-sm text-[var(--muted-text)] mb-6 flex items-center gap-2">
        {" "}
        <Link
          href="/"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          Home
        </Link>{" "}
        <span>/</span>{" "}
        <Link
          href="/account"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          Account
        </Link>{" "}
        <span>/</span>{" "}
        <span className="text-[var(--foreground)] font-medium">
          Wishlist
        </span>{" "}
      </nav>{" "}
      <div className="flex items-center gap-3 mb-8">
        {" "}
        <Heart className="w-5 h-5" />{" "}
        <h1
          className="text-2xl font-bold"
          style={{
            fontFamily: "var(--font-inter)",
          }}
        >
          {" "}
          Wishlist{" "}
          <span className="text-[var(--muted-text)] font-normal text-lg">
            ({items.length})
          </span>{" "}
        </h1>{" "}
      </div>{" "}
      {items.length > 0 ? (
        <div className="space-y-3">
          {" "}
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border border-[var(--border)] rounded-xl"
            >
              {" "}
              <div className="w-20 h-20 bg-[var(--muted)] rounded-md flex-shrink-0" />{" "}
              <div className="flex-grow min-w-0">
                {" "}
                <p className="text-xs text-[var(--muted-text)] uppercase tracking-widest">
                  {item.category}
                </p>{" "}
                <p className="font-semibold text-sm mt-0.5 truncate">
                  {item.name}
                </p>{" "}
                <p className="font-bold mt-1">Rs. {item.price.toLocaleString()}</p>{" "}
              </div>{" "}
              <div className="flex flex-col gap-2 flex-shrink-0">
                {" "}
                <button className="btn-primary !py-2 !px-3 !text-xs">
                  <ShoppingCart className="w-3.5 h-3.5" /> Add
                </button>{" "}
                <button className="p-2 text-[var(--muted-text)] hover:text-red-500 transition-colors self-center">
                  <Trash2 className="w-4 h-4" />
                </button>{" "}
              </div>{" "}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-dashed border-[var(--border)] rounded-2xl">
          {" "}
          <div className="w-14 h-14 bg-[var(--muted)] rounded-full flex items-center justify-center mx-auto mb-4">
            {" "}
            <ShoppingBag className="w-6 h-6 text-[var(--muted-text)]" />{" "}
          </div>{" "}
          <h2 className="text-lg font-semibold mb-2">Your wishlist is empty</h2>{" "}
          <p className="text-sm text-[var(--muted-text)] mb-6 max-w-xs mx-auto">
            Save items you love by clicking the heart icon on any product page.
          </p>{" "}
          <Link href="/shop" className="btn-primary !text-sm inline-flex">
            {" "}
            Start Shopping <ArrowRight className="w-4 h-4" />{" "}
          </Link>{" "}
        </div>
      )}
    </div>
  );
}
