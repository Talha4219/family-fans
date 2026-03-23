import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
interface BreadcrumbItem {
  label: string;
  href?: string;
}
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      className="flex items-center gap-2 text-sm text-[var(--muted-text)] mb-6 flex-wrap"
      aria-label="Breadcrumb"
    >
      {" "}
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors"
      >
        {" "}
        <Home className="w-3.5 h-3.5" />{" "}
        <span className="sr-only">Home</span>{" "}
      </Link>{" "}
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {" "}
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />{" "}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[var(--foreground)] transition-colors capitalize"
            >
              {" "}
              {item.label}{" "}
            </Link>
          ) : (
            <span className="text-[var(--foreground)] font-medium capitalize">
              {" "}
              {item.label}{" "}
            </span>
          )}{" "}
        </div>
      ))}{" "}
    </nav>
  );
}
