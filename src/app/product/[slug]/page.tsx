'use client';

import React, { useState, useEffect, use, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Star, Truck, ShieldCheck, RefreshCw, ShoppingBag, Check, 
  Scissors, Zap, Loader2, MessageCircle, MapPin, ChevronLeft, 
  ChevronRight, ZoomIn, Maximize2, X, Plus, Minus 
} from 'lucide-react';
import { getProductBySlug, Product } from '@/lib/supabase';
import { useCart } from '@/context/CartContext';
import { ProductDetailSkeleton } from '@/components/Shimmer';

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [customMeasurements, setCustomMeasurements] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [stitchingType, setStitchingType] = useState<'stitched' | 'unstitched' | 'custom'>('stitched');
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Determine active price based on stitching type
  const effectiveUnstitchedPrice = product?.unstitched_price 
    ? product.unstitched_price 
    : (product ? Math.max(1000, product.price - 1000) : 0);

  const activePrice = stitchingType === 'unstitched' 
    ? effectiveUnstitchedPrice 
    : (product?.price || 0);

  // Available colors list (from product or default smart palette)
  const availableColors = (product?.colors && product.colors.length > 0)
    ? product.colors
    : [];

  useEffect(() => {
    if (availableColors.length > 0 && !selectedColor) {
      setSelectedColor(availableColors[0]);
    }
  }, [availableColors, selectedColor]);

  // Extract or format package includes
  const packageIncludesText = product?.package_includes 
    || (product?.description?.match(/package includes?:?\s*([^.\n]+)/i)?.[1]?.trim())
    || '3-Piece Set (Shirt, Bottom / Shalwar, Dupatta)';

  // Handle Buy Now & Add to Cart with updated options
  const handleBuyNow = () => {
    if (!product) return;
    setIsBuyingNow(true);
    const targetProduct: Product = { ...product, price: activePrice };
    const targetSize = stitchingType === 'unstitched' 
      ? 'Unstitched' 
      : stitchingType === 'custom' 
      ? `Custom (${customMeasurements || 'Made-to-Measure'})` 
      : selectedSize;
    addToCart(targetProduct, quantity, targetSize, customMeasurements);
    setTimeout(() => {
      router.push('/checkout');
    }, 200);
  };

  const handleAddToCart = () => {
    if (!product) return;
    setIsAddingToCart(true);
    const targetProduct: Product = { ...product, price: activePrice };
    const targetSize = stitchingType === 'unstitched' 
      ? 'Unstitched' 
      : stitchingType === 'custom' 
      ? `Custom (${customMeasurements || 'Made-to-Measure'})` 
      : selectedSize;
    addToCart(targetProduct, quantity, targetSize, customMeasurements);
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 300);
  };

  // Zoom Lightbox Modal States
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = 100%, 2 = 200%, 2.5 = 250%

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  // Handle Swipe Gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current || !product?.images) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Image
      setActiveImageIndex((prev) => (prev + 1) % product.images.length);
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev Image
      setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!product?.images) return;
    setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!product?.images) return;
    setActiveImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const openZoomModal = (index?: number) => {
    if (typeof index === 'number') {
      setActiveImageIndex(index);
    }
    setZoomLevel(1);
    setIsZoomModalOpen(true);
  };

  const toggleZoomLevel = () => {
    setZoomLevel(prev => prev === 1 ? 2 : prev === 2 ? 2.5 : 1);
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
    <div className="py-6 sm:py-10 bg-[#FCFAF7] text-[#18181B] selection:bg-[#C5A880] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 bg-[#FAF7F2] text-[#111111]">
        
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-8 left-8 z-50 bg-white border border-[#C5A059] text-[#111111] px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
            <Check className="w-5 h-5 text-[#C5A059]" />
            <span className="text-xs font-bold tracking-wide">Added &ldquo;{product.title}&rdquo; to your shopping bag!</span>
          </div>
        )}

        {/* Breadcrumb Navigation */}
        <div className="text-xs text-stone-500 flex items-center gap-2 font-medium">
          <Link href="/" className="hover:text-[#C5A059]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#C5A059]">Shop Catalog</Link>
          <span>/</span>
          <span className="text-[#C5A059] font-bold truncate max-w-xs">{product.title}</span>
        </div>

        {/* Product Showcase Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Interactive Image Gallery with Slide & Zoom */}
          <div className="space-y-3">
            {/* Main Interactive Stage */}
            <div 
              className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-md group cursor-zoom-in select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => openZoomModal()}
            >
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                fill
                priority
                unoptimized={(product.images[activeImageIndex] || product.images[0])?.startsWith('data:')}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Floating Zoom Tooltip Badge */}
              <div className="absolute top-3.5 right-3.5 z-20 bg-white/90 backdrop-blur-md border border-[#C5A059]/50 text-[#111111] px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-sm transition-transform group-hover:scale-105">
                <ZoomIn className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Tap to Zoom</span>
              </div>

              {/* Picture Counter Badge */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3.5 left-3.5 z-20 bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
                  {activeImageIndex + 1} / {product.images.length}
                </div>
              )}

              {/* Next / Prev Navigation Buttons on Main Image */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-[#111111] text-stone-800 hover:text-[#C5A059] border border-stone-200/80 flex items-center justify-center transition-all shadow-md opacity-90 sm:opacity-0 group-hover:opacity-100 hover:scale-105"
                    title="Previous photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-[#111111] text-stone-800 hover:text-[#C5A059] border border-stone-200/80 flex items-center justify-center transition-all shadow-md opacity-90 sm:opacity-0 group-hover:opacity-100 hover:scale-105"
                    title="Next photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 sm:w-20 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                      activeImageIndex === idx ? 'border-[#6B1D2F] shadow-sm scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`thumbnail-${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Order Form */}
          <div className="space-y-4 sm:space-y-5 bg-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-xs">
            <div>
              <div className="text-[9.5px] font-bold text-[#C5A059] uppercase tracking-[0.25em] mb-1">
                {product.category} &bull; {product.fabric}
              </div>
              
              <h1 className="font-brand-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#111111] leading-tight mb-2">
                {product.title}
              </h1>

              <div className="flex items-center gap-2.5 text-xs mb-3">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-extrabold text-[#111111] text-xs">{product.rating || 5.0}</span>
                <span className="text-stone-500 text-[11px] font-medium">({product.reviews_count || 8} verified reviews)</span>
              </div>

              {/* Dynamic Price Display */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#111111]">
                  PKR {activePrice.toLocaleString()}
                </span>
                {product.compare_at_price && (
                  <span className="text-xs font-medium text-stone-400 line-through">
                    PKR {product.compare_at_price.toLocaleString()}
                  </span>
                )}
                {stitchingType === 'unstitched' && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-[#C5A059] px-2 py-0.5 rounded-full border border-[#C5A059]/40">
                    Unstitched Discount Applied
                  </span>
                )}
              </div>
            </div>

            {/* Priority Specs: Fabric & Package Includes */}
            <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 text-xs text-stone-700 space-y-1.5 font-medium">
              <div className="flex items-start gap-2">
                <strong className="text-[#111111] min-w-[70px]">Stuff/Fabric:</strong> 
                <span className="text-stone-800 font-semibold">{product.fabric}</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-[#C5A059] min-w-[70px]">Package:</strong> 
                <span className="text-[#111111] font-bold">{packageIncludesText}</span>
              </div>
              <div className="flex items-start gap-2 text-[11px] text-stone-500 pt-0.5 border-t border-stone-200/60">
                <strong className="min-w-[70px]">Dispatch:</strong> 
                <span>2-3 Days Nationwide Express Delivery</span>
              </div>
            </div>

            {/* Stitching Type Selector (Stitched Pret / Unstitched Fabric / Custom Made-to-Measure) */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-[#111111] uppercase tracking-wider block">
                CHOOSE STITCHING OPTION:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setStitchingType('stitched')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    stitchingType === 'stitched'
                      ? 'border-[#111111] bg-[#111111] text-[#C5A059] shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-[#C5A880]'
                  }`}
                >
                  <div>Stitched Pret</div>
                  <div className="text-[10px] font-normal opacity-90">Ready to wear</div>
                </button>

                <button
                  type="button"
                  onClick={() => setStitchingType('unstitched')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    stitchingType === 'unstitched'
                      ? 'border-[#111111] bg-[#111111] text-[#C5A059] shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-[#C5A880]'
                  }`}
                >
                  <div>Unstitched</div>
                  <div className={`text-[10px] ${stitchingType === 'unstitched' ? 'text-amber-200' : 'text-emerald-700 font-bold'}`}>
                    PKR {effectiveUnstitchedPrice.toLocaleString()}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setStitchingType('custom')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                    stitchingType === 'custom'
                      ? 'border-[#111111] bg-[#111111] text-[#C5A059] shadow-xs'
                      : 'border-stone-200 bg-white text-stone-700 hover:border-[#C5A880]'
                  }`}
                >
                  <div>Custom Size</div>
                  <div className="text-[10px] font-normal opacity-90">Made to measure</div>
                </button>
              </div>
            </div>

            {/* Color Selector (If multiple colors exist) */}
            {availableColors.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs font-bold text-[#111111]">
                  <span className="uppercase tracking-wider">SELECT COLOR:</span>
                  <span className="text-[#C5A059] font-bold">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedColor(col)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedColor === col
                          ? 'border-[#111111] bg-[#FAF7F2] text-[#C5A059] ring-1 ring-[#111111] font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-[#C5A880]'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector (Visible for Stitched Pret) */}
            {stitchingType === 'stitched' && (
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs font-bold text-[#111111]">
                  <span className="uppercase tracking-wider">SELECT SIZE</span>
                  <span className="text-[#C5A059] text-[11px] font-bold cursor-pointer hover:underline">Size Guide</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedSize === size
                          ? 'border-[#111111] bg-[#111111] text-[#C5A059] shadow-xs font-bold'
                          : 'border-stone-200 bg-white text-stone-800 hover:border-[#C5A880]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Measurements Input (Visible for Custom Size or Custom Stitching size) */}
            {(stitchingType === 'custom' || selectedSize === 'Custom Stitching') && (
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#C5A059]/60 space-y-2 animate-fade-in">
                <div className="text-xs font-bold text-[#111111] flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-[#C5A059]" />
                  <span>Custom Measurement Details (Inches)</span>
                </div>
                <textarea
                  placeholder="Enter your custom measurements (e.g. Chest: 38 in, Shirt Length: 42 in, Waist: 32 in, Shalwar Length: 38 in)..."
                  value={customMeasurements}
                  onChange={(e) => setCustomMeasurements(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:border-[#C5A059] shadow-2xs"
                />
              </div>
            )}

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-bold text-[#111111] uppercase tracking-wider">QUANTITY:</span>
              <div className="flex items-center border border-stone-300 rounded-xl bg-[#FAF7F2] px-3 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-stone-600 hover:text-stone-900 font-bold text-sm px-1"
                >
                  -
                </button>
                <span className="text-xs font-bold text-[#111111] px-3">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-stone-600 hover:text-stone-900 font-bold text-sm px-1"
                >
                  +
                </button>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleBuyNow}
                disabled={isBuyingNow || isAddingToCart}
                className="w-full btn-luxury-gold py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-75"
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
                className="w-full brand-btn-primary text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-75"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />
                    <span>ADDING TO BAG...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                    <span>ADD TO SHOPPING BAG</span>
                  </>
                )}
              </button>

              <a
                href={`https://wa.me/?text=Hello%20ETHNIVA!%20I%20would%20like%20to%20inquire%20about%20${encodeURIComponent(product.title)}%20(Option:%20${stitchingType.toUpperCase()}${selectedColor ? `%20Color:%20${encodeURIComponent(selectedColor)}` : ''},%20Size:%20${selectedSize},%20Price:%20PKR%20${activePrice.toLocaleString()})`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#EEEAE2] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-[#B08A4A] border border-[#D8D2C7] py-3.5 font-sans font-medium text-[11px] uppercase tracking-[2px] flex items-center justify-center gap-2 transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-[#B08A4A]" />
                <span>INQUIRE &bull; ORDER ASSISTANCE</span>
              </a>
            </div>

            {/* 1. PRODUCT DESCRIPTION & DETAILS (COMES FIRST) */}
            <div className="pt-4 border-t border-stone-200/80 space-y-2">
              <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                Product Description &amp; Details
              </h3>
              <div className="text-xs text-stone-700 leading-relaxed font-normal whitespace-pre-line bg-[#FAF7F2] p-3.5 rounded-2xl border border-stone-200/60">
                {product.description}
              </div>
            </div>

            {/* 2. SATISFACTION & DELIVERY BADGES (COMES BELOW DESCRIPTION) */}
            <div className="space-y-2 pt-2 border-t border-stone-200/80">
              <div className="grid grid-cols-3 gap-2 text-[10.5px] text-stone-700 text-center font-medium">
                <div className="p-2 bg-[#FAF7F2] rounded-xl border border-stone-200/80">
                  <Truck className="w-3.5 h-3.5 text-[#C5A059] mx-auto mb-0.5" />
                  <span>Free Delivery</span>
                </div>
                <div className="p-2 bg-[#FAF7F2] rounded-xl border border-stone-200/80">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] mx-auto mb-0.5" />
                  <span>100% Original</span>
                </div>
                <div className="p-2 bg-[#FAF7F2] rounded-xl border border-stone-200/80">
                  <RefreshCw className="w-3.5 h-3.5 text-[#C5A059] mx-auto mb-0.5" />
                  <span>7-Day Exchange</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-medium pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Atelier: Faisalabad, Pakistan &bull; Express Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* HIGH-RESOLUTION FULL-SCREEN ZOOM LIGHTBOX MODAL               */}
      {/* ------------------------------------------------------------- */}
      {isZoomModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 animate-fade-in select-none"
          onClick={() => setIsZoomModalOpen(false)}
        >
          {/* Top Bar with Controls */}
          <div className="flex items-center justify-between text-white z-30 px-2" onClick={e => e.stopPropagation()}>
            <div className="space-y-0.5">
              <h3 className="text-sm sm:text-base font-bold">{product.title}</h3>
              <span className="text-[11px] text-stone-400 font-mono">
                Photo {activeImageIndex + 1} of {product.images.length} &bull; Zoom: {zoomLevel}x
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleZoomLevel}
                className="px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-all"
                title="Toggle Zoom"
              >
                {zoomLevel > 1 ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                <span>{zoomLevel > 1 ? 'Zoom Out' : 'Zoom In (2x)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-rose-600 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Zoom Viewport */}
          <div 
            className="flex-1 relative flex items-center justify-center overflow-auto my-2 p-2"
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className={`relative transition-all duration-300 cursor-zoom-in ${
                zoomLevel === 1 ? 'w-full h-full max-w-2xl max-h-[75vh]' : zoomLevel === 2 ? 'w-[140vw] sm:w-[90vw] h-[120vh]' : 'w-[180vw] sm:w-[120vw] h-[150vh]'
              }`}
              onClick={toggleZoomLevel}
            >
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                fill
                priority
                unoptimized={(product.images[activeImageIndex] || product.images[0])?.startsWith('data:')}
                className="object-contain"
              />
            </div>

            {/* Navigation Chevrons inside Lightbox */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/30 flex items-center justify-center backdrop-blur-md transition-all"
                  title="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-white text-white hover:text-black border border-white/30 flex items-center justify-center backdrop-blur-md transition-all"
                  title="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails Strip in Lightbox */}
          {product.images.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 z-30" onClick={e => e.stopPropagation()}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setZoomLevel(1);
                  }}
                  className={`relative w-12 sm:w-14 aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeImageIndex === idx ? 'border-[#C5A880] scale-110 shadow-lg' : 'border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`thumb-${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
