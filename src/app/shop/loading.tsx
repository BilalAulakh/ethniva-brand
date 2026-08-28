'use client';

import React from 'react';
import { ProductCardSkeleton } from '@/components/Shimmer';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FAF9F6] text-[#18181B]">
      {/* Header Banner Shimmer */}
      <div className="bg-gradient-to-r from-[#FAF7F2] via-[#F6F1E7] to-[#FAF7F2] rounded-3xl p-8 sm:p-12 text-stone-900 relative overflow-hidden shadow-sm border border-[#E8E2D5]">
        <div className="max-w-xl space-y-3 z-10 relative">
          <div className="flex items-center gap-2 text-xs font-black text-[#C5A059] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>ETHNIVA CATALOG</span>
          </div>
          <div className="h-9 w-64 rounded-xl bg-stone-300/70 shimmer-effect" />
          <div className="h-4 w-96 rounded-lg bg-stone-200/60 shimmer-effect" />
        </div>
      </div>

      {/* Filter Sidebar & Product Grid Shimmer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filter Sidebar Shimmer */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#111111] uppercase tracking-wider pb-3 border-b border-stone-100">
              <Filter className="w-4 h-4 text-[#C5A059]" />
              <span>Filter By Category</span>
            </div>

            <div className="space-y-2">
              <div className="h-8 rounded-xl bg-stone-200/60 shimmer-effect" />
              <div className="h-8 rounded-xl bg-stone-200/40 shimmer-effect" />
              <div className="h-8 rounded-xl bg-stone-200/40 shimmer-effect" />
              <div className="h-8 rounded-xl bg-stone-200/40 shimmer-effect" />
              <div className="h-8 rounded-xl bg-stone-200/40 shimmer-effect" />
            </div>
          </div>
        </div>

        {/* Right Product Grid Shimmer */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs text-xs">
            <div className="h-4 w-32 rounded bg-stone-200/70 shimmer-effect" />
            <div className="flex gap-2">
              <div className="h-7 w-20 rounded bg-stone-200/60 shimmer-effect" />
              <div className="h-7 w-20 rounded bg-stone-200/60 shimmer-effect" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <ProductCardSkeleton count={6} />
          </div>
        </div>
      </div>
    </div>
  );
}
