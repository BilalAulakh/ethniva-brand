'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, Star, Check, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = async () => {
    if (isAdding) return;
    setIsAdding(true);
    addToCart(quickViewProduct, quantity, selectedSize);
    await new Promise(r => setTimeout(r, 400));
    setIsAdding(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 text-slate-500 hover:text-slate-900 rounded-full bg-slate-100 border border-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-slate-100">
            <Image
              src={quickViewProduct.images[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600'}
              alt={quickViewProduct.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-extrabold text-[#b8860b] uppercase tracking-wider mb-1">
                {quickViewProduct.category}
              </div>
              <h2 className="text-xl font-bold text-[#0f172a] mb-2 leading-snug">
                {quickViewProduct.title}
              </h2>

              <div className="flex items-center gap-2 mb-4 text-xs text-amber-500">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-slate-800">{quickViewProduct.rating}</span>
                <span className="text-slate-400">({quickViewProduct.reviews_count} reviews)</span>
              </div>

              <div className="text-2xl font-extrabold text-[#881337] mb-4">
                RS. {quickViewProduct.price.toLocaleString()}
                {quickViewProduct.compare_at_price && (
                  <span className="text-sm text-slate-400 line-through ml-2 font-normal">
                    RS. {quickViewProduct.compare_at_price.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Size: <span className="text-[#881337]">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === size
                          ? 'border-[#881337] bg-[#881337] text-white shadow-md'
                          : 'border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex gap-3">
                <div className="flex items-center border border-slate-300 rounded-2xl bg-slate-50 px-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-slate-600 hover:text-slate-900 px-1 font-bold">-</button>
                  <span className="text-xs font-bold text-slate-900 px-2">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-slate-600 hover:text-slate-900 px-1 font-bold">+</button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={isAdding}
                  className="flex-1 brand-btn-primary text-white text-xs uppercase tracking-wider font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-75"
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
              </div>

              <div className="text-[11px] text-slate-500 flex items-center gap-4 justify-center">
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
