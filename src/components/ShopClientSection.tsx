'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  SlidersHorizontal, ChevronDown, X, Star, RotateCcw, 
  LayoutGrid, List, ShoppingBag, Search
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/lib/types';

interface FilterState {
  categories: string[];
  minPrice: number;
  maxPrice: number;
  brands: string[];
  availability: 'all' | 'instock' | 'outofstock';
  minRating: number | null;
  search: string;
}

interface ShopClientSectionProps {
  products: Product[];
  categories: Category[];
}

function extractBrands(products: Product[]): string[] {
  const brands = new Set<string>();
  products.forEach(p => {
    const brand = p.specifications?.brand || p.specifications?.Brand || p.specs?.brand || p.specs?.Brand;
    if (brand) brands.add(brand);
  });
  return Array.from(brands).sort();
}

function FilterCheckbox({ label, checked, onChange, count }: { 
  label: string; checked: boolean; onChange: () => void; count?: number 
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group py-1">
      <div 
        onClick={(e) => { e.preventDefault(); onChange(); }}
        className={`w-4 h-4 rounded-[5px] border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          checked ? 'bg-lime-600 border-lime-600' : 'border-slate-200 group-hover:border-lime-300'
        }`}
      >
        {checked && <div className="w-2 h-2 bg-white rounded-sm" />}
      </div>
      <span className={`text-[11px] font-bold transition-colors leading-tight ${
        checked ? 'text-[zinc-950]' : 'text-slate-500 group-hover:text-slate-700'
      }`}>
        {label}
      </span>
      {count !== undefined && (
        <span className="ml-auto text-[9px] font-black text-slate-300">{count}</span>
      )}
    </label>
  );
}

function FilterSection({ title, children, defaultOpen = true }: { 
  title: string; children: React.ReactNode; defaultOpen?: boolean 
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
      <button 
        onClick={() => setOpen(v => !v)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <span className="text-[10px] font-black text-[zinc-950] uppercase tracking-widest">{title}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="space-y-1">{children}</div>}
    </div>
  );
}

export default function ShopClientSection({ products, categories }: ShopClientSectionProps) {
  const priceMin = useMemo(() => Math.floor(Math.min(...products.map(p => p.price), 0)), [products]);
  const priceMax = useMemo(() => Math.ceil(Math.max(...products.map(p => p.price), 1000)), [products]);
  const brands = useMemo(() => extractBrands(products), [products]);

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    minPrice: priceMin,
    maxPrice: priceMax,
    brands: [],
    availability: 'all',
    minRating: null,
    search: ''
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sync URL from filters 
  const updateUrl = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();
    if (newFilters.categories.length === 1) {
      const catId = newFilters.categories[0];
      // Recursive function to find category and parent in tree
      const findInTree = (cats: Category[], id: string, parent?: Category): { cat: Category, sub?: Category } | null => {
        for (const c of cats) {
          if (c.id === id) return { cat: parent || c, sub: parent ? c : undefined };
          if (c.subCategories) {
            const found = findInTree(c.subCategories, id, parent || c);
            if (found) return found;
          }
        }
        return null;
      };

      const found = findInTree(categories, catId);
      if (found) {
        if (found.sub) {
          params.set('category', found.cat.slug);
          params.set('sub', found.sub.slug);
        } else {
          params.set('category', found.cat.slug);
        }
      }
    }
    if (newFilters.brands.length === 1) params.set('brand', newFilters.brands[0]);
    if (newFilters.search) params.set('search', newFilters.search);
    
    const query = params.toString();
    router.replace(`/shop${query ? '?' + query : ''}`, { scroll: false });
  }, [categories, router]);

  // Sync filters from URL on mount 
  useEffect(() => {
    const categorySlug = searchParams.get('category');
    const subcategorySlug = searchParams.get('sub');
    const brandParam = searchParams.get('brand');
    const searchParam = searchParams.get('search');

    setFilters(prev => {
      const next = { ...prev };
      let updated = false;

      if (categorySlug) {
        const findIdBySlugs = (cats: Category[], catSlug: string, subSlug?: string): string => {
          const root = cats.find(c => c.slug === catSlug);
          if (!root) return '';
          if (!subSlug) return root.id;

          // Search for subSlug in any level below root
          const searchSub = (c: Category, slug: string): string => {
            if (c.slug === slug) return c.id;
            if (c.subCategories) {
              for (const child of c.subCategories) {
                const found = searchSub(child, slug);
                if (found) return found;
              }
            }
            return '';
          };
          return searchSub(root, subSlug) || root.id;
        };

        const foundId = findIdBySlugs(categories, categorySlug, subcategorySlug || undefined);
        if (foundId && !next.categories.includes(foundId)) {
          next.categories = [foundId];
          updated = true;
        }
      } else if (next.categories.length > 0) {
        next.categories = [];
        updated = true;
      }

      if (brandParam && !next.brands.includes(brandParam)) {
        next.brands = [brandParam];
        updated = true;
      } else if (!brandParam && next.brands.length > 0) {
        next.brands = [];
        updated = true;
      }

      if (searchParam && next.search !== searchParam) {
        next.search = searchParam;
        updated = true;
      } else if (!searchParam && next.search) {
        next.search = '';
        updated = true;
      }

      return updated ? next : prev;
    });
  }, [searchParams, categories]);

  const toggleArray = useCallback((arr: string[], value: string) => 
    arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value], []);

  const totalActiveFilters = filters.categories.length + filters.brands.length + 
    (filters.availability !== 'all' ? 1 : 0) + (filters.minRating !== null ? 1 : 0) + 
    (filters.minPrice > priceMin || filters.maxPrice < priceMax ? 1 : 0) +
    (filters.search ? 1 : 0);

  const resetFilters = () => {
    const newState: FilterState = {
      categories: [],
      minPrice: priceMin,
      maxPrice: priceMax,
      brands: [],
      availability: 'all',
      minRating: null,
      search: ''
    };
    setFilters(newState);
    updateUrl(newState);
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      if (filters.search && !p.name.toLowerCase().includes(filters.search.toLowerCase()) && !p.description?.toLowerCase().includes(filters.search.toLowerCase()))
        return false;
      if (filters.categories.length > 0 && !filters.categories.includes(p.categoryId || '') && !filters.categories.includes(p.subcategoryId || ''))
        return false;
      if (p.price < filters.minPrice || p.price > filters.maxPrice)
        return false;
      const brand = p.specifications?.brand || p.specifications?.Brand || p.specs?.brand || p.specs?.Brand || '';
      if (filters.brands.length > 0 && !filters.brands.includes(brand))
        return false;
      if (filters.availability === 'instock' && (!p.stock || p.stock <= 0))
        return false;
      if (filters.availability === 'outofstock' && p.stock && p.stock > 0)
        return false;
      if (filters.minRating !== null && (!p.rating || p.rating < filters.minRating))
        return false;
      return true;
    });

    switch (sortBy) {
      case 'price-asc': result = result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result = result.sort((a, b) => b.price - a.price); break;
      case 'rating': result = result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
    }
    return result;
  }, [products, filters, sortBy]);

  const categoryCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach(p => {
      if (p.categoryId) map[p.categoryId] = (map[p.categoryId] || 0) + 1;
      if (p.subcategoryId) map[p.subcategoryId] = (map[p.subcategoryId] || 0) + 1;
    });
    return map;
  }, [products]);

  const brandCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach(p => {
      const brand = p.specifications?.brand || p.specifications?.Brand || p.specs?.brand || p.specs?.Brand;
      if (brand) map[brand] = (map[brand] || 0) + 1;
    });
    return map;
  }, [products]);

  const Sidebar = () => (
    <aside className="w-full space-y-2">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-lime-600" />
          <h2 className="text-sm font-black text-[zinc-950] uppercase tracking-widest">Filters</h2>
          {totalActiveFilters > 0 && (
            <span className="w-5 h-5 bg-lime-600 text-white text-[9px] font-black rounded-full flex items-center justify-center">
              {totalActiveFilters}
            </span>
          )}
        </div>
        {totalActiveFilters > 0 && (
          <button onClick={resetFilters} className="text-[9px] font-black text-slate-400 hover:text-lime-600 transition-colors uppercase tracking-widest flex items-center gap-1.5">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 space-y-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="SEARCH SHOP..." 
            value={filters.search}
            onChange={(e) => {
              const next = { ...filters, search: e.target.value };
              setFilters(next);
              updateUrl(next);
            }}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-lime-600 transition-colors"
          />
        </div>

        <FilterSection title="Category">
          {categories.filter(c => !c.parentCategoryId).map(cat => (
            <div key={cat.id} className="space-y-1">
              <FilterCheckbox 
                label={cat.name} 
                checked={filters.categories.includes(cat.id)} 
                onChange={() => {
                  const next = { ...filters, categories: toggleArray(filters.categories, cat.id) };
                  setFilters(next);
                  updateUrl(next);
                }}
                count={categoryCountMap[cat.id] || 0}
              />
              {filters.categories.includes(cat.id) && cat.subCategories && cat.subCategories.length > 0 && (
                <div className="ml-4 pl-4 border-l border-slate-100 space-y-1 py-1">
                  {cat.subCategories.map(sub => (
                    <FilterCheckbox 
                      key={sub.id} 
                      label={sub.name} 
                      checked={filters.categories.includes(sub.id)} 
                      onChange={() => {
                        const next = { ...filters, categories: toggleArray(filters.categories, sub.id) };
                        setFilters(next);
                        updateUrl(next);
                      }}
                      count={categoryCountMap[sub.id] || 0}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </FilterSection>

        <FilterSection title="Price Range">
          <div className="space-y-5 px-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Min</label>
                <input 
                  type="number" 
                  value={filters.minPrice} 
                  onChange={e => setFilters(f => ({ ...f, minPrice: Number(e.target.value) }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black focus:outline-none focus:border-lime-600"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Max</label>
                <input 
                  type="number" 
                  value={filters.maxPrice} 
                  onChange={e => setFilters(f => ({ ...f, maxPrice: Number(e.target.value) }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-black focus:outline-none focus:border-lime-600"
                />
              </div>
            </div>
          </div>
        </FilterSection>

        {brands.length > 0 && (
          <FilterSection title="Brand">
            {brands.map(brand => (
              <FilterCheckbox 
                key={brand} 
                label={brand} 
                checked={filters.brands.includes(brand)} 
                onChange={() => {
                  const next = { ...filters, brands: toggleArray(filters.brands, brand) };
                  setFilters(next);
                  updateUrl(next);
                }}
                count={brandCountMap[brand] || 0}
              />
            ))}
          </FilterSection>
        )}

        <FilterSection title="Availability">
          <FilterCheckbox 
            label="In Stock" 
            checked={filters.availability === 'instock'} 
            onChange={() => setFilters(f => ({ ...f, availability: f.availability === 'instock' ? 'all' : 'instock' }))} 
          />
          <FilterCheckbox 
            label="Out of Stock" 
            checked={filters.availability === 'outofstock'} 
            onChange={() => setFilters(f => ({ ...f, availability: f.availability === 'outofstock' ? 'all' : 'outofstock' }))} 
          />
        </FilterSection>
      </div>
    </aside>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="hidden lg:block lg:w-72 flex-shrink-0">
        <div className="sticky top-28">
          <Sidebar />
        </div>
      </div>

      <main className="flex-grow min-w-0 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl border border-slate-100 px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span className="text-lime-600 text-sm">{filteredProducts.length}</span> / {products.length} products
            </span>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value as any)}
              className="text-[10px] font-black text-[zinc-950] uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 focus:outline-none focus:border-lime-600"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-lime-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-lime-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-4"}>
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] border border-slate-50 p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-slate-200" />
            </div>
            <h2 className="text-2xl font-black text-[zinc-950] uppercase mb-3">No products match</h2>
            <button onClick={resetFilters} className="btn-primary inline-flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Reset All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
