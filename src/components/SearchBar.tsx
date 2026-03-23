"use client";
import { useState, useEffect, useRef } from "react";
import { Search, X, ShoppingCart } from "lucide-react";
import { searchProducts } from "@/lib/actions";
import { Product } from "@/lib/types";
import Link from "next/link";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 1) {
        setIsSearching(true);
        const data = await searchProducts(query);
        setResults(data);
        setIsSearching(false);
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0" ref={searchRef}>
      {" "}
      <div className="relative">
        {" "}
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />{" "}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 1 && setShowResults(true)}
          placeholder="Search premium fans, heaters..."
          className="glass-input !pl-11 !pr-10 !py-2.5 w-full text-sm"
        />{" "}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {" "}
            <X className="w-4 h-4 text-foreground/40 hover:text-foreground/80 transition" />{" "}
          </button>
        )}{" "}
      </div>{" "}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 glass-panel !p-2 !rounded-xl z-[60] overflow-hidden shadow-2xl">
          {" "}
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              onClick={() => setShowResults(false)}
              className="flex items-center gap-3 p-2 hover:bg-black/5 rounded-lg transition group"
            >
              {" "}
              <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-white/20">
                {" "}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />{" "}
              </div>{" "}
              <div className="flex-grow min-w-0">
                {" "}
                <p className="text-sm font-medium truncate group-hover:text-emerald-600 transition">
                  {product.name}
                </p>{" "}
                <p className="text-xs text-foreground/50">
                  {product.category}
                </p>{" "}
              </div>{" "}
              <p className="text-sm font-bold text-emerald-600">
                ${product.price}
              </p>{" "}
            </Link>
          ))}{" "}
        </div>
      )}{" "}
      {showResults &&
        query.length > 1 &&
        results.length === 0 &&
        !isSearching && (
          <div className="absolute top-full left-0 w-full mt-2 glass-panel p-4 z-[100] text-center text-sm text-foreground/60">
            {" "}
            No results found for"{query}"{" "}
          </div>
        )}{" "}
    </div>
  );
}
