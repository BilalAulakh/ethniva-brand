'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag, Eye, Star, Zap, Loader2 } from 'lucide-react';
import { Product } from '@/lib/supabase';

import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const discountPercent = product.compare_at_price 
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100) 
    : 0;

  // 1-Click Instant Checkout when clicking BUY NOW / QUICK ADD
  const handleQuickBuy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    addToCart(product, 1, selectedSize);
    await new Promise(r => setTimeout(r, 450));
    router.push('/checkout');
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <div 
        className="group relative bg-transparent flex flex-col justify-between transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Box */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EEEAE2] mb-3">
          <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
            {(() => {
              const currentSrc = (isHovered && product.images?.[1]) ? product.images[1] : (product.images?.[0] || '');
              const isBase64 = currentSrc.startsWith('data:');
              return (
                <Image
                  src={currentSrc}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized={isBase64}
                  loading="lazy"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              );
            })()}
          </Link>

          {/* Optional Subtle Badge */}
          {product.is_new && (
            <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
              <span className="bg-[#0A0A0A] text-white text-[9px] font-sans font-medium uppercase tracking-[1.5px] px-2 py-0.5">
                NEW
              </span>
            </div>
          )}

          {/* Top Right Wishlist Minimal Outline Heart */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2.5 right-2.5 z-10 p-1.5 transition-all text-[#0A0A0A] hover:text-[#B08A4A]`}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#B08A4A] text-[#B08A4A]' : 'stroke-[1.5]'}`} />
          </button>

          {/* Quick Add Overlay on Hover */}
          <div className="absolute bottom-0 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleQuickBuy}
              disabled={isAddingToCart}
              className="w-full bg-[#0A0A0A]/90 backdrop-blur-sm hover:bg-[#B08A4A] text-white hover:text-[#0A0A0A] font-sans font-medium text-[10px] uppercase tracking-[2px] py-3 transition-colors flex items-center justify-center gap-1.5"
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>ADDING...</span>
                </>
              ) : (
                <span>QUICK ADD</span>
              )}
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-1 text-left font-sans">
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#B08A4A] transition-colors">
            <h3 className="text-xs sm:text-[13px] font-medium text-[#171717] tracking-[0.5px] uppercase line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-[13px] font-medium text-[#171717]">
              PKR {product.price.toLocaleString()}
            </span>
            {product.compare_at_price && (
              <span className="text-[11px] text-neutral-400 line-through">
                PKR {product.compare_at_price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0A0A0A] border border-neutral-300 inline-block cursor-pointer" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EEEAE2] border border-neutral-300 inline-block cursor-pointer" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#B08A4A] border border-neutral-300 inline-block cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button 
              onClick={() => setQuickViewOpen(false)} 
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 z-10 font-bold text-lg p-1 rounded-full hover:bg-stone-100"
            >
              ✕
            </button>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
            </div>
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest">{product.fabric}</span>
                <h3 className="font-brand-serif text-lg font-extrabold text-[#111111]">{product.title}</h3>
                <div className="text-base font-black text-[#111111] mt-1">PKR {product.price.toLocaleString()}</div>
                <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-stone-700">Select Size:</div>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        selectedSize === sz ? 'bg-[#111111] text-[#C5A059] border-[#111111] shadow-xs font-bold' : 'bg-white text-stone-700 border-stone-200 hover:border-[#C5A059]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={async (e) => {
                    await handleQuickBuy(e);
                    setQuickViewOpen(false);
                  }}
                  disabled={isAddingToCart}
                  className="w-full btn-luxury-gold py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg disabled:opacity-75"
                >
                  {isAddingToCart ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>PROCEEDING TO CHECKOUT...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-current" />
                      <span>BUY NOW &bull; INSTANT CHECKOUT</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
