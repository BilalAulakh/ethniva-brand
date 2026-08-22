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
        className="group relative bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#C7A76C] transition-all duration-500 shadow-xs hover:shadow-xl flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Box with React Shimmer placeholder */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF9F6]">
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer-card z-0" />
          )}

          <Link href={`/product/${product.slug}`} className="block w-full h-full relative z-1">
            <Image
              src={isHovered && product.images?.[1] ? product.images[1] : product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              onLoad={() => setImageLoaded(true)}
              className={`object-cover object-top group-hover:scale-108 transition-all duration-700 ease-out ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </Link>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.is_new && (
              <span className="bg-[#881337] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                NEW
              </span>
            )}
            {discountPercent > 0 && (
              <span className="bg-[#C7A76C] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Top Right Wishlist Heart Toggle */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              inWishlist 
                ? 'bg-rose-50 text-[#881337] border border-rose-200 shadow-sm' 
                : 'bg-white/90 backdrop-blur-md text-stone-700 hover:text-[#881337] hover:bg-white shadow-xs'
            }`}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Hover Quick Action Buttons */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={() => setQuickViewOpen(true)}
              className="flex-1 bg-white/95 backdrop-blur-md hover:bg-[#881337] hover:text-white text-stone-900 font-bold text-[10px] uppercase tracking-wider py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>QUICK VIEW</span>
            </button>
            <button
              onClick={handleQuickBuy}
              disabled={isAddingToCart}
              className="flex-1 bg-[#C7A76C] hover:bg-[#881337] text-white font-black text-[10px] uppercase tracking-wider py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1 transition-all disabled:opacity-75"
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>ADDING...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>BUY NOW</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 space-y-2 bg-white flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[10px] text-stone-500 font-bold uppercase tracking-wider mb-1">
              <span>{product.fabric || 'CHIFFON PRET'}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3 h-3 fill-current" />
                <span>{product.rating || 4.9}</span>
              </div>
            </div>

            <Link href={`/product/${product.slug}`} className="block group-hover:text-[#881337] transition-colors">
              <h3 className="text-xs font-extrabold text-[#18181B] line-clamp-1 leading-snug">
                {product.title}
              </h3>
            </Link>
          </div>

          {/* Size Pill Selector */}
          <div className="flex items-center gap-1 pt-1">
            {['S', 'M', 'L', 'XL'].map((sz) => (
              <button
                key={sz}
                onClick={(e) => { e.preventDefault(); setSelectedSize(sz); }}
                className={`text-[9px] font-extrabold w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                  selectedSize === sz
                    ? 'bg-[#881337] text-white border-[#881337] shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-[#C7A76C]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Price Box & Instant Order Trigger */}
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black text-[#18181B]">
                PKR {product.price.toLocaleString()}
              </span>
              {product.compare_at_price && (
                <span className="text-[11px] text-stone-400 line-through">
                  PKR {product.compare_at_price.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={handleQuickBuy}
              disabled={isAddingToCart}
              className="bg-[#FAF6F0] text-[#881337] border border-[#C7A76C]/50 hover:bg-[#881337] hover:text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-all shadow-xs disabled:opacity-75"
              title="Buy Now - Instant Checkout"
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="w-3 h-3 text-[#881337] animate-spin" />
                  <span>ADDING...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3 h-3 text-[#C7A76C]" />
                  <span>BUY NOW</span>
                </>
              )}
            </button>
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
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100">
              <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
            </div>
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-[#881337] uppercase tracking-widest">{product.fabric}</span>
                <h3 className="text-lg font-extrabold text-[#18181B]">{product.title}</h3>
                <div className="text-base font-black text-[#881337] mt-1">PKR {product.price.toLocaleString()}</div>
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
                        selectedSize === sz ? 'bg-[#881337] text-white border-[#881337] shadow-xs' : 'bg-white text-stone-700 border-stone-200 hover:border-[#C7A76C]'
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
