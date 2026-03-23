import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
export const metadata: Metadata = {
  title: "Page Not Found — 404 Error | FamilyFans",
  description:
    "The FamilyFans page you're looking for doesn't exist. Browse our fans, heaters, and accessories or use the search to find what you need.",
  robots: { index: false, follow: true },
};
export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      {" "}
      <div className="max-w-md text-center space-y-6">
        {" "}
        <p
          className="text-8xl font-black text-[var(--muted)] select-none"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          404
        </p>{" "}
        <div>
          {" "}
          <h1
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Page not found
          </h1>{" "}
          <p className="text-[var(--muted-text)]">
            {" "}
            Sorry, the page you're looking for has been moved or doesn't
            exist.{" "}
          </p>{" "}
        </div>{" "}
        <form method="GET" action="/search" className="flex gap-2">
          {" "}
          <div className="relative flex-1">
            {" "}
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--muted-text)]" />{" "}
            <input
              name="q"
              type="search"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--foreground)]"
            />{" "}
          </div>{" "}
          <button type="submit" className="btn-primary !py-2 !px-4 !text-sm">
            Go
          </button>{" "}
        </form>{" "}
        <div className="flex items-center justify-center gap-4">
          {" "}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-60 transition-opacity"
          >
            {" "}
            <ArrowLeft className="w-4 h-4" /> Go Home{" "}
          </Link>{" "}
          <span className="text-[var(--border)]">|</span>{" "}
          <Link
            href="/shop"
            className="text-sm font-medium hover:opacity-60 transition-opacity"
          >
            Browse Shop
          </Link>{" "}
          <span className="text-[var(--border)]">|</span>{" "}
          <Link
            href="/contact"
            className="text-sm font-medium hover:opacity-60 transition-opacity"
          >
            Contact Us
          </Link>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
