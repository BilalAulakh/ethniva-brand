'use client';

import React from 'react';

// General Versatile Shimmer Box
export const ShimmerBox: React.FC<{ className?: string }> = ({ className = 'h-4 w-full rounded-md' }) => {
  return <div className={`shimmer-effect ${className}`} />;
};

// Luxury Product Card Skeleton (Grid & Slider placeholder)
export const ProductCardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-xs p-0 flex flex-col justify-between"
        >
          {/* Main Image Shimmer */}
          <div className="aspect-[3/4] w-full shimmer-effect relative overflow-hidden">
            <div className="absolute top-3 left-3 w-12 h-4 rounded bg-stone-200/50" />
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-stone-200/50" />
          </div>

          {/* Details Shimmer */}
          <div className="p-4 space-y-3">
            <div className="space-y-1.5">
              <div className="h-3 w-20 rounded bg-stone-200/70 shimmer-effect" />
              <div className="h-4 w-3/4 rounded bg-stone-300/80 shimmer-effect" />
              <div className="h-2.5 w-1/2 rounded bg-stone-200/50 shimmer-effect" />
            </div>

            {/* Price & Rating */}
            <div className="flex justify-between items-end pt-1">
              <div className="space-y-1">
                <div className="h-4 w-24 rounded bg-[#881337]/20 shimmer-effect" />
                <div className="h-2.5 w-16 rounded bg-stone-200/60 shimmer-effect" />
              </div>
              <div className="h-4 w-10 rounded bg-amber-100 shimmer-effect" />
            </div>

            {/* Buttons Shimmer */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
              <div className="h-8 rounded-xl bg-stone-100 shimmer-effect" />
              <div className="h-8 rounded-xl bg-[#C7A76C]/30 shimmer-effect" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

// Admin Table Rows Shimmer Skeleton
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden divide-y divide-stone-100">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 flex-1">
            <div className="w-12 h-16 rounded-xl bg-stone-200 shimmer-effect flex-shrink-0" />
            <div className="space-y-2 flex-1 max-w-sm">
              <div className="h-4 w-44 rounded bg-stone-300 shimmer-effect" />
              <div className="h-3 w-28 rounded bg-stone-200 shimmer-effect" />
            </div>
          </div>

          <div className="hidden sm:block space-y-1.5 w-40">
            <div className="h-3.5 w-24 rounded bg-stone-300 shimmer-effect" />
            <div className="h-2.5 w-32 rounded bg-stone-200 shimmer-effect" />
          </div>

          <div className="space-y-1.5 w-28 text-right">
            <div className="h-4 w-20 rounded bg-[#881337]/30 shimmer-effect ml-auto" />
            <div className="h-2.5 w-12 rounded bg-stone-200 shimmer-effect ml-auto" />
          </div>

          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-lg bg-stone-100 shimmer-effect" />
            <div className="w-8 h-8 rounded-lg bg-stone-100 shimmer-effect" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Orders Card Skeleton
export const OrderSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 shadow-xs">
          <div className="flex justify-between border-b border-stone-100 pb-3">
            <div className="h-4 w-36 rounded bg-stone-300 shimmer-effect" />
            <div className="h-5 w-24 rounded-full bg-[#FAF7F2] shimmer-effect" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="h-2.5 w-20 rounded bg-stone-200 shimmer-effect" />
              <div className="h-4 w-36 rounded bg-stone-300 shimmer-effect" />
              <div className="h-3 w-28 rounded bg-stone-200 shimmer-effect" />
            </div>
            <div className="space-y-2">
              <div className="h-2.5 w-20 rounded bg-stone-200 shimmer-effect" />
              <div className="h-4 w-32 rounded bg-stone-300 shimmer-effect" />
              <div className="h-3 w-48 rounded bg-stone-200 shimmer-effect" />
            </div>
            <div className="space-y-2 md:text-right">
              <div className="h-2.5 w-20 rounded bg-stone-200 shimmer-effect md:ml-auto" />
              <div className="h-6 w-28 rounded bg-[#881337]/30 shimmer-effect md:ml-auto" />
              <div className="h-3 w-16 rounded bg-stone-200 shimmer-effect md:ml-auto" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Product Detail Hero Skeleton
export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Gallery Shimmer */}
        <div className="space-y-4">
          <div className="aspect-[3/4] w-full rounded-3xl bg-stone-200 shimmer-effect" />
          <div className="grid grid-cols-4 gap-3">
            <div className="aspect-square rounded-2xl bg-stone-200 shimmer-effect" />
            <div className="aspect-square rounded-2xl bg-stone-200 shimmer-effect" />
            <div className="aspect-square rounded-2xl bg-stone-200 shimmer-effect" />
            <div className="aspect-square rounded-2xl bg-stone-200 shimmer-effect" />
          </div>
        </div>

        {/* Right Details Shimmer */}
        <div className="space-y-6 pt-2">
          <div className="space-y-3">
            <div className="h-4 w-28 rounded bg-stone-200 shimmer-effect" />
            <div className="h-8 w-3/4 rounded bg-stone-300 shimmer-effect" />
            <div className="h-7 w-36 rounded bg-[#881337]/20 shimmer-effect" />
          </div>

          <div className="space-y-2 pt-4 border-t border-stone-200">
            <div className="h-3.5 w-full rounded bg-stone-200 shimmer-effect" />
            <div className="h-3.5 w-5/6 rounded bg-stone-200 shimmer-effect" />
            <div className="h-3.5 w-2/3 rounded bg-stone-200 shimmer-effect" />
          </div>

          <div className="space-y-2 pt-2">
            <div className="h-3.5 w-24 rounded bg-stone-200 shimmer-effect" />
            <div className="flex gap-2">
              <div className="w-12 h-10 rounded-xl bg-stone-200 shimmer-effect" />
              <div className="w-12 h-10 rounded-xl bg-stone-200 shimmer-effect" />
              <div className="w-12 h-10 rounded-xl bg-stone-200 shimmer-effect" />
              <div className="w-12 h-10 rounded-xl bg-stone-200 shimmer-effect" />
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="h-12 w-full rounded-2xl bg-[#881337]/30 shimmer-effect" />
            <div className="h-12 w-full rounded-2xl bg-[#C7A76C]/30 shimmer-effect" />
          </div>
        </div>
      </div>
    </div>
  );
};
