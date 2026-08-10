'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Star, Truck, ShieldCheck, RefreshCw, ShoppingBag, Check, Scissors, Zap } from 'lucide-react';
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

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      const data = await getProductBySlug(slug);
      setProduct(data);
      if (data && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
    }
    loadProduct();
  }, [slug]);

  if (!product) {
    return <ProductDetailSkeleton />;
  }

  // Handle Add to Shopping Bag
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, customMeasurements);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle 1-Click BUY NOW & Instant Checkout
  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize, customMeasurements);
    router.push('/checkout');
  };

  return (
    <div className="bg-[#FAF9F6] text-[#18181B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Image Gallery & Thumbnails */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xl">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#881337] scale-105 shadow-md' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Buy Form & Order Buttons */}
          <div className="space-y-6 bg-white p-8 rounded-3xl border border-stone-200 shadow-md">
            <div>
              <div className="text-[10px] font-black text-[#881337] uppercase tracking-[0.25em] mb-1">
                {product.category} &bull; {product.fabric}
              </div>
              
              <h1 className="text-2xl sm:text-4xl font-serif italic font-extrabold text-[#18181B] leading-tight mb-3">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 text-xs mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-extrabold text-[#18181B] text-sm">{product.rating}</span>
                <span className="text-stone-500 font-medium">({product.reviews_count} verified customer reviews)</span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-serif font-black text-[#18181B]">
                  PKR {product.price.toLocaleString()}
                </span>
                {product.compare_at_price && (
                  <span className="text-sm font-medium text-stone-400 line-through">
                    PKR {product.compare_at_price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-1.5 font-medium">
              <div><strong className="text-[#18181B]">Fabric Specifications:</strong> {product.fabric}</div>
              <div><strong className="text-[#18181B]">In Stock Status:</strong> Ready for Dispatch across Pakistan in 2-3 business days.</div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs font-extrabold text-[#18181B]">
                <span className="uppercase tracking-wider">SELECT SIZE</span>
                <span className="text-[#881337] font-bold cursor-pointer hover:underline">Size Guide</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'border-[#881337] bg-[#881337] text-white shadow-md scale-105'
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
                  placeholder="Enter your custom measurements (e.g. Chest: 36 in, Shirt Length: 42 in, Waist: 30 in)..."
                  value={customMeasurements}
                  onChange={(e) => setCustomMeasurements(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:border-[#C7A76C]"
                />
              </div>
            )}

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider">QUANTITY:</span>
              <div className="flex items-center border border-stone-300 rounded-2xl bg-[#FAF7F2] px-4 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-stone-600 hover:text-stone-900 font-extrabold text-base p-1"
                >
                  -
                </button>
                <span className="text-sm font-black text-[#18181B] px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-stone-600 hover:text-stone-900 font-extrabold text-base p-1"
                >
                  +
                </button>
              </div>
            </div>

            {/* 2 Main Action Buttons */}
            <div className="space-y-3 pt-2">
              {/* 1. Direct Instant Order Button */}
              <button
                onClick={handleBuyNow}
                className="w-full btn-luxury-gold py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-all duration-300"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>BUY NOW &bull; PLACE ORDER IMMEDIATELY</span>
              </button>

              {/* 2. Add to Cart Bag Button */}
              <button
                onClick={handleAddToCart}
                className="w-full brand-btn-primary text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4 text-[#fef08a]" />
                <span>ADD TO SHOPPING BAG</span>
              </button>
            </div>

            {/* Value Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-stone-200 text-[11px] text-stone-700 text-center font-medium">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <Truck className="w-4 h-4 text-[#881337] mx-auto mb-1" />
                <span>Free Delivery &gt; RS 5000</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-[#881337] mx-auto mb-1" />
                <span>100% Original Fabric</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <RefreshCw className="w-4 h-4 text-[#881337] mx-auto mb-1" />
                <span>Easy 7-Day Exchange</span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t border-stone-200 space-y-2">
              <h3 className="text-xs font-black text-[#18181B] uppercase tracking-wider">
                Product Description &amp; Details
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
