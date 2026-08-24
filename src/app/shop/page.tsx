'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, Sparkles, Package } from 'lucide-react';
import { getProducts, getCategories, Product, Category } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Shimmer';

function ShopContent() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const selectedSort = searchParams.get('sort') || 'featured';
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShopData() {
      setLoading(true);
      try {
        try {
          const prodList = await getProducts();
          if (prodList && Array.isArray(prodList)) {
            setProducts(prodList);
          }
        } catch (err) {
          console.error('Error loading shop products:', err);
        }

        try {
          const catList = await getCategories();
          if (catList && Array.isArray(catList)) {
            setCategories(catList);
          }
        } catch (err) {
          console.error('Error loading shop categories:', err);
        }
      } finally {
        setLoading(false);
      }
    }
    loadShopData();
  }, []);

  // Smart Normalized Filter for Category & Search
  let filteredProducts = products.filter(p => {
    if (!p) return false;
    
    let matchesCategory = true;
    if (selectedCategory && selectedCategory !== 'all') {
      const pCat = (p.category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const sCat = selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      matchesCategory = 
        pCat === sCat ||
        pCat.includes(sCat) ||
        sCat.includes(pCat) ||
        (sCat.includes('pret') && pCat.includes('pret')) ||
        (sCat.includes('velvet') && pCat.includes('velvet')) ||
        (sCat.includes('chiffon') && pCat.includes('chiffon')) ||
        (sCat.includes('formal') && pCat.includes('formal')) ||
        (sCat.includes('bridal') && pCat.includes('bridal'));
    }

    let matchesSearch = true;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      matchesSearch = Boolean(
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.fabric && p.fabric.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    return Boolean(matchesCategory && matchesSearch);
  });

  // Sort products
  if (selectedSort === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === 'rating') {
    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (selectedSort === 'newest') {
    filteredProducts.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FAF9F6] text-[#18181B]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#FAF7F2] via-[#F5EFEB] to-[#FAF7F2] rounded-3xl p-8 sm:p-12 text-stone-900 relative overflow-hidden shadow-sm border border-[#E8DFC8]">
        <div className="max-w-xl space-y-3 z-10 relative">
          <div className="flex items-center gap-2 text-xs font-black text-[#881337] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A76C]" />
            <span>ZEHRA STUDIO CATALOG</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic font-extrabold text-[#18181B] tracking-tight">
            {selectedCategory ? selectedCategory.replace(/-/g, ' ').toUpperCase() : 'ALL DRESS DESIGNS'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Handcrafted Pakistani Pret, Micro Velvet Luxury, and Pure Chiffon Formals with free express delivery across Pakistan.
          </p>
        </div>
      </div>

      {/* Filter Sidebar & Product Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#18181B] uppercase tracking-wider pb-3 border-b border-stone-100">
              <Filter className="w-4 h-4 text-[#881337]" />
              <span>Filter By Category</span>
            </div>

            <div className="space-y-1 text-xs">
              <Link
                href="/shop"
                className={`block px-3 py-2 rounded-xl transition-all font-semibold ${
                  !selectedCategory 
                    ? 'bg-rose-50 text-[#881337] font-bold' 
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                All Categories ({products.length})
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.slug}`}
                  className={`block px-3 py-2 rounded-xl transition-all font-semibold ${
                    selectedCategory === cat.slug 
                      ? 'bg-rose-50 text-[#881337] font-bold' 
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {cat.name} ({cat.item_count})
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Product Grid */}
        <div className="lg:col-span-3 space-y-6">
          {/* Sorting Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs text-xs">
            <div className="text-stone-500 font-medium">
              Showing <strong className="text-stone-900 font-extrabold">{filteredProducts.length}</strong> designs
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-stone-400" />
              <span className="text-stone-600 font-bold">Sort By:</span>
              <div className="flex gap-2">
                <Link
                  href={`/shop?${selectedCategory ? `category=${selectedCategory}&` : ''}sort=featured`}
                  className={`px-3 py-1.5 rounded-lg border font-bold ${
                    selectedSort === 'featured' ? 'border-[#881337] bg-rose-50 text-[#881337]' : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  Featured
                </Link>
                <Link
                  href={`/shop?${selectedCategory ? `category=${selectedCategory}&` : ''}sort=price-low`}
                  className={`px-3 py-1.5 rounded-lg border font-bold ${
                    selectedSort === 'price-low' ? 'border-[#881337] bg-rose-50 text-[#881337]' : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  Price Low
                </Link>
                <Link
                  href={`/shop?${selectedCategory ? `category=${selectedCategory}&` : ''}sort=price-high`}
                  className={`px-3 py-1.5 rounded-lg border font-bold ${
                    selectedSort === 'price-high' ? 'border-[#881337] bg-rose-50 text-[#881337]' : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  Price High
                </Link>
              </div>
            </div>
          </div>

          {/* Product Grid / Loading State */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} count={1} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-3 shadow-xs">
              <Package className="w-12 h-12 text-[#C7A76C] mx-auto" />
              <h3 className="text-lg font-bold text-[#18181B]">No Dress Designs Found</h3>
              <p className="text-xs text-stone-500">Try changing your search keywords or category filters.</p>
              <Link href="/shop" className="inline-block brand-btn-primary text-white text-xs font-bold px-6 py-2.5 rounded-full mt-2 shadow-md">
                Reset All Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} count={1} />
          ))}
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
