'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Truck, ShieldCheck, RefreshCw, ShoppingBag, Check, Scissors, Zap, Loader2, MessageCircle, MapPin } from 'lucide-react';
import { getProductBySlug, Product } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import { ProductDetailSkeleton } from '@/components/Shimmer';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [customMeasurements, setCustomMeasurements] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        if (data && data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    setIsAddingToCart(true);
    setTimeout(() => {
      addToCart(product, quantity, selectedSize, customMeasurements);
      setIsAddingToCart(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 400);
  };

  const handleBuyNow = () => {
    if (!product) return;
    setIsBuyingNow(true);
    addToCart(product, quantity, selectedSize, customMeasurements);
    setTimeout(() => {
      router.push('/checkout');
    }, 300);
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-[#18181B]">Article Not Found</h1>
        <p className="text-xs text-stone-500">The article you are looking for is currently unavailable.</p>
        <Link href="/shop" className="inline-block btn-luxury-gold text-xs px-6 py-3 rounded-full">
          Return To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#FAF9F6] text-[#18181B] selection:bg-[#C7A76C] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-8 left-8 z-50 bg-white border border-[#C7A76C] text-[#18181B] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <Check className="w-5 h-5 text-[#881337]" />
            <span className="text-xs font-bold tracking-wide">Added &ldquo;{product.title}&rdquo; to your shopping bag!</span>
          </div>
        )}

        {/* Breadcrumb Navigation */}
        <div className="text-xs text-stone-500 flex items-center gap-2 font-medium">
          <Link href="/" className="hover:text-[#881337]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#881337]">Shop Catalog</Link>
          <span>/</span>
          <span className="text-[#881337] font-bold">{product.title}</span>
        </div>

        {/* Product Showcase Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-white border border-stone-200 shadow-md">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                      activeImageIndex === idx ? 'border-[#881337] shadow-md scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Buy Form & Order Buttons */}
          <div className="space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md">
            <div>
              <div className="text-[9.5px] font-black text-[#881337] uppercase tracking-[0.25em] mb-1">
                {product.category} &bull; {product.fabric}
              </div>
              
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#18181B] leading-tight mb-2">
                {product.title}
              </h1>

              <div className="flex items-center gap-2.5 text-xs mb-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-extrabold text-[#18181B] text-xs">{product.rating}</span>
                <span className="text-stone-500 text-[11px] font-medium">({product.reviews_count} verified reviews)</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#881337]">
                  PKR {product.price.toLocaleString()}
                </span>
                {product.compare_at_price && (
                  <span className="text-xs font-medium text-stone-400 line-through">
                    PKR {product.compare_at_price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-1 font-medium">
              <div><strong className="text-[#18181B]">Fabric:</strong> {product.fabric}</div>
              <div><strong className="text-[#18181B]">Availability:</strong> Ready for Dispatch across Pakistan (2-3 days).</div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2.5 pt-1">
              <div className="flex justify-between items-center text-xs font-bold text-[#18181B]">
                <span className="uppercase tracking-wider">SELECT SIZE</span>
                <span className="text-[#881337] text-[11px] font-bold cursor-pointer hover:underline">Size Chart</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'border-[#881337] bg-[#881337] text-white shadow-md'
                        : 'border-stone-200 bg-white text-stone-800 hover:border-[#C7A76C]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Measurements Input */}
            {selectedSize === 'Custom Stitching' && (
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#C7A76C]/60 space-y-2">
                <div className="text-xs font-bold text-[#18181B] flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-[#881337]" />
                  <span>Custom Measurement Notes</span>
                </div>
                <textarea
                  placeholder="Enter custom measurements (e.g. Chest: 36 in, Length: 42 in, Waist: 30 in)..."
                  value={customMeasurements}
                  onChange={(e) => setCustomMeasurements(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:border-[#C7A76C]"
                />
              </div>
            )}

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-bold text-[#18181B] uppercase tracking-wider">QUANTITY:</span>
              <div className="flex items-center border border-stone-300 rounded-xl bg-[#FAF7F2] px-3 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-stone-600 hover:text-stone-900 font-bold text-sm px-1"
                >
                  -
                </button>
                <span className="text-xs font-bold text-[#18181B] px-3">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-stone-600 hover:text-stone-900 font-bold text-sm px-1"
                >
                  +
                </button>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleBuyNow}
                disabled={isBuyingNow || isAddingToCart}
                className="w-full btn-luxury-gold py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-75"
              >
                {isBuyingNow ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>PROCEEDING...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>BUY NOW &bull; PLACE ORDER</span>
                  </>
                )}
              </button>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || isBuyingNow}
                className="w-full brand-btn-primary text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-75"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#fef08a]" />
                    <span>ADDING TO BAG...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#fef08a]" />
                    <span>ADD TO SHOPPING BAG</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/923094329812?text=Hello%20Zehra%20Studio!%20I%20would%20like%20to%20order%20${encodeURIComponent(product.title)}%20(Size:%20${selectedSize},%20Price:%20PKR%20${product.price.toLocaleString()})`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#FAF7F2] hover:bg-[#25D366] text-[#18181B] hover:text-white border border-[#C7A76C]/60 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-2xs group"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white" />
                <span>ORDER ON WHATSAPP (0309 43 29 812)</span>
              </a>
            </div>

            {/* Value Trust Badges */}
            <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-stone-200 text-[10.5px] text-stone-700 text-center font-medium">
              <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <Truck className="w-4 h-4 text-[#881337] mx-auto mb-1" />
                <span>Free Delivery</span>
              </div>
              <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-[#881337] mx-auto mb-1" />
                <span>100% Original</span>
              </div>
              <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <RefreshCw className="w-4 h-4 text-[#881337] mx-auto mb-1" />
                <span>7-Day Easy Exchange</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-medium pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#881337]" />
              <span>Atelier: Faisalabad, Pakistan &bull; Express Delivery</span>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-stone-200 space-y-1.5">
              <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">
                Product Description &amp; Details
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
