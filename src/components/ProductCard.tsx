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
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F0ED] mb-3.5">
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

          {/* Discount badge (round, accent) */}
          {discountPercent > 0 && (
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span className="w-10 h-10 rounded-full bg-[#CE967E] text-white text-[10px] font-medium flex items-center justify-center">
                -{discountPercent}%
              </span>
            </div>
          )}
          {discountPercent === 0 && product.is_new && (
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span className="bg-white text-[#222222] text-[10px] font-medium uppercase tracking-[0.08em] px-2.5 py-1">
                New
              </span>
            </div>
          )}

          {/* Wishlist heart */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#222222] hover:text-[#CE967E] shadow-sm transition-colors"
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#CE967E] text-[#CE967E]' : 'stroke-[1.5]'}`} />
          </button>

          {/* Quick Add on hover */}
          <div className="absolute bottom-0 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleQuickBuy}
              disabled={isAddingToCart}
              className="w-full bg-[#CE967E] hover:bg-[#B9806A] text-white font-medium text-[11px] uppercase tracking-[0.1em] py-3 transition-colors flex items-center justify-center gap-1.5"
            >
              {isAddingToCart ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <span>Quick Add</span>
              )}
            </button>
          </div>
        </div>

        {/* Product Information (centered) */}
        <div className="space-y-1.5 text-center px-1">
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="text-[13px] sm:text-[14px] text-[#222222] tracking-[0.03em] line-clamp-1 hover:text-[#CE967E] transition-colors">
              {product.title}
            </h3>
          </Link>

          {/* Stars only when the product has a real rating */}
          {typeof product.rating === 'number' && product.rating > 0 && (
            <div className="flex items-center justify-center gap-0.5 text-[#F2B600]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating || 0) ? 'fill-current' : 'text-[#CCCCCC]'}`} />
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex flex-col items-center gap-0.5">
            {product.compare_at_price && (
              <span className="text-[12px] text-[#888888] line-through">
                PKR {product.compare_at_price.toLocaleString()}
              </span>
            )}
            <span className="text-[13px] sm:text-[14px] font-semibold text-[#CE967E] tracking-[0.02em]">
              PKR {product.price.toLocaleString()}
            </span>
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
                <span className="text-[10px] font-black text-[#CE967E] uppercase tracking-widest">{product.fabric}</span>
                <h3 className="font-brand-serif text-lg font-extrabold text-[#222222]">{product.title}</h3>
                <div className="text-base font-black text-[#222222] mt-1">PKR {product.price.toLocaleString()}</div>
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
                        selectedSize === sz ? 'bg-[#222222] text-[#CE967E] border-[#222222] shadow-xs font-bold' : 'bg-white text-stone-700 border-stone-200 hover:border-[#CE967E]'
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
