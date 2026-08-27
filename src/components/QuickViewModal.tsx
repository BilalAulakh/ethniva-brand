'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Star, Check, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdding, setIsAdding] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = async () => {
    if (isAdding) return;
    setIsAdding(true);
    addToCart(quickViewProduct, 1, selectedSize);
    await new Promise(r => setTimeout(r, 400));
    setIsAdding(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border border-stone-200/80 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 rounded-full bg-white/90 border border-stone-200 shadow-2xs"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-stone-100">
            <Image
              src={quickViewProduct.images[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'}
              alt={quickViewProduct.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-[9.5px] font-bold text-[#6B1D2F] uppercase tracking-widest mb-1">
                {quickViewProduct.category}
              </div>
              <h2 className="text-xl font-serif font-bold text-[#18181B] mb-2 leading-snug">
                {quickViewProduct.title}
              </h2>

              <div className="flex items-center gap-2 mb-3 text-xs text-amber-500">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-stone-800">{quickViewProduct.rating || 5.0}</span>
                <span className="text-stone-400 text-[11px]">({quickViewProduct.reviews_count || 12} reviews)</span>
              </div>

              <div className="text-2xl font-serif font-bold text-[#6B1D2F] mb-3">
                PKR {quickViewProduct.price.toLocaleString()}
                {quickViewProduct.compare_at_price && (
                  <span className="text-xs text-stone-400 line-through ml-2 font-normal font-sans">
                    PKR {quickViewProduct.compare_at_price.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 mb-4 leading-relaxed font-normal">
                {quickViewProduct.description}
              </p>

              {/* Size Selector */}
              <div className="mb-4 space-y-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Select Size: <span className="text-[#6B1D2F]">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === size
                          ? 'border-[#6B1D2F] bg-[#6B1D2F] text-white shadow-2xs'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-[#C5A880]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <button
                onClick={handleAdd}
                disabled={isAdding}
                className="w-full brand-btn-primary text-white text-xs uppercase tracking-wider font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-xs disabled:opacity-75"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#fef08a]" />
                    <span>Adding To Bag...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#fef08a]" />
                    <span>Add To Shopping Bag</span>
                  </>
                )}
              </button>

              <div className="text-[10.5px] text-stone-500 flex items-center gap-4 justify-center font-medium">
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-600" /> Free Delivery</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-600" /> Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
