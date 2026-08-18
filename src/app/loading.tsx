'use client';

import React from 'react';
import { ProductCardSkeleton } from '@/components/Shimmer';

export default function GlobalLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-[#FAF9F6] text-[#18181B] animate-fade-in">
      {/* Top Banner Shimmer */}
      <div className="aspect-[21/9] sm:aspect-[24/8] w-full rounded-3xl shimmer-gold relative overflow-hidden border border-[#E8DFC8]/60 flex items-center p-8 sm:p-14">
        <div className="space-y-4 max-w-lg">
          <div className="h-4 w-32 rounded-full bg-stone-300/70 shimmer-effect" />
          <div className="h-10 w-3/4 rounded-xl bg-stone-300/80 shimmer-effect" />
          <div className="h-4 w-full rounded-lg bg-stone-200/60 shimmer-effect" />
          <div className="h-10 w-40 rounded-full bg-[#881337]/30 shimmer-effect" />
        </div>
      </div>

      {/* Grid of Shimmer Product Cards */}
      <div className="space-y-6">
        <div className="flex justify-between items-center border-b border-stone-200 pb-4">
          <div className="h-7 w-48 rounded-xl bg-stone-300/70 shimmer-effect" />
          <div className="h-5 w-24 rounded-lg bg-stone-200/60 shimmer-effect" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <ProductCardSkeleton count={8} />
        </div>
      </div>
    </div>
  );
}
