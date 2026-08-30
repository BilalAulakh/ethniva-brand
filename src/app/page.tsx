'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Truck, RotateCcw, ShieldCheck, Gem, 
  ChevronLeft, ChevronRight, ArrowRight, Sparkles, Star, 
  ShoppingBag, Eye, Layers, Scissors, Heart, Sparkle
} from 'lucide-react';
import { getProducts, getCategories, Product, Category } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { ProductCardSkeleton } from '@/components/Shimmer';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeFabricTab, setActiveFabricTab] = useState(0);
  const { addToCart } = useCart();

  // Load live data from Supabase / database
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const prodList = await getProducts();
        if (isMounted && Array.isArray(prodList)) {
          setProducts(prodList);
        }

        try {
          const catList = await getCategories();
          if (isMounted && Array.isArray(catList)) {
            // Keep only categories that have at least 1 product or user customized
            const activeCats = catList.filter(c => c.item_count > 0 || c.image);
            setCategories(activeCats.length > 0 ? activeCats : catList.slice(0, 5));
          }
        } catch (catErr) {
          console.warn('Error loading categories:', catErr);
        }
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter hero products from real database
  const heroProducts = products.filter(p => p.images && p.images.length > 0).slice(0, 4);

  // Auto-advance slides if hero products exist
  useEffect(() => {
    if (isPaused || heroProducts.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, heroProducts.length]);

  const nextSlide = () => {
    if (heroProducts.length > 0) {
      setActiveSlide((prev) => (prev + 1) % heroProducts.length);
    }
  };

  const prevSlide = () => {
    if (heroProducts.length > 0) {
      setActiveSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
    }
  };

  const currentHeroProduct = heroProducts[activeSlide] || heroProducts[0];

  // Distinct fabrics found in real database products
  const availableFabrics = Array.from(
    new Set(products.map(p => p.fabric?.trim()).filter(Boolean))
  );

  return (
    <div className="bg-[#F7F5F0] text-[#171717] font-sans selection:bg-[#B08A4A] selection:text-white overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. FULL-WIDTH LUXURY BACKGROUND SLIDER HERO                               */}
      {/* ========================================================================= */}
      <section 
        className="relative w-full min-h-[75vh] lg:min-h-[85vh] flex items-center border-b border-[#D8D2C7] overflow-hidden bg-[#0A0A0A]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Full-Bleed Background Images with Smooth Crossfade */}
        {heroProducts.length > 0 ? (
          heroProducts.map((prod, idx) => (
            <div 
              key={prod.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                activeSlide === idx ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            >
              {prod.images && prod.images[0] ? (
                <Image
                  src={prod.images[0]}
                  alt={prod.title}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-1000"
                />
              ) : null}
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-[#171717] z-0" />
        )}

        {/* Subtle Gradient only on far left for clean text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10 pointer-events-none" />

        {/* Foreground Content Overlay */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
          
          <div className="max-w-2xl space-y-6 animate-fade-in text-white">
            <div className="space-y-3.5">
              
              {/* Category / Collection Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/50 backdrop-blur-md border border-[#B08A4A]/40 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08A4A] animate-pulse" />
                <span className="text-[10px] font-sans font-semibold tracking-[2.5px] text-[#C9A86A] uppercase">
                  {currentHeroProduct?.category ? `${currentHeroProduct.category} Collection` : 'ETHNIVA ATELIER ’26'}
                </span>
              </div>
              
              {/* Hero Title */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-[0.03em] text-white leading-[1.08] uppercase whitespace-pre-line drop-shadow-md">
                {currentHeroProduct ? currentHeroProduct.title : 'ELEVATE\nYOUR STYLE'}
              </h1>

              {/* Gold Diamond Ornament */}
              <div className="flex items-center gap-3 pt-1 pb-1">
                <span className="w-12 h-[1px] bg-[#B08A4A]/60" />
                <span className="text-[#C9A86A] text-xs">◆</span>
                <span className="w-12 h-[1px] bg-[#B08A4A]/60" />
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-200 font-light max-w-lg leading-relaxed line-clamp-3 drop-shadow-sm">
                {currentHeroProduct?.description 
                  ? currentHeroProduct.description 
                  : 'Timeless fashion crafted for confidence, elegance, and international sophistication. Discover bespoke tailoring and luxury pret.'}
              </p>

              {/* Price Display */}
              {currentHeroProduct && (
                <div className="pt-2 flex items-baseline gap-3">
                  <span className="text-xl sm:text-2xl font-serif font-bold text-[#C9A86A] tracking-wide">
                    PKR {currentHeroProduct.price.toLocaleString()}
                  </span>
                  {currentHeroProduct.compare_at_price && (
                    <span className="text-xs sm:text-sm line-through text-stone-400 font-sans">
                      PKR {currentHeroProduct.compare_at_price.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {currentHeroProduct ? (
                <Link 
                  href={`/product/${currentHeroProduct.slug}`} 
                  className="px-7 py-3.5 bg-[#B08A4A] hover:bg-white text-[#0A0A0A] hover:text-[#0A0A0A] border border-[#B08A4A] hover:border-white font-sans font-semibold text-xs tracking-[2px] uppercase transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 group cursor-pointer"
                >
                  <span>SHOP THIS PIECE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link 
                  href="/shop" 
                  className="px-7 py-3.5 bg-[#B08A4A] hover:bg-white text-[#0A0A0A] hover:text-[#0A0A0A] border border-[#B08A4A] hover:border-white font-sans font-semibold text-xs tracking-[2px] uppercase transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 group cursor-pointer"
                >
                  <span>EXPLORE SHOP</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              
              <Link 
                href="/shop" 
                className="px-7 py-3.5 bg-black/40 hover:bg-white/15 text-white border border-white/40 hover:border-white font-sans font-semibold text-xs tracking-[2px] uppercase backdrop-blur-md transition-all cursor-pointer"
              >
                VIEW COLLECTIONS
              </Link>
            </div>

            {/* Slider Navigation Controls & Indicators */}
            {heroProducts.length > 1 && (
              <div className="flex items-center gap-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={prevSlide}
                    className="w-9 h-9 border border-white/30 bg-black/40 hover:bg-[#B08A4A] hover:text-black hover:border-[#B08A4A] text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-9 h-9 border border-white/30 bg-black/40 hover:bg-[#B08A4A] hover:text-black hover:border-[#B08A4A] text-white flex items-center justify-center backdrop-blur-sm transition-all shadow-md cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {heroProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-[3px] transition-all duration-500 cursor-pointer ${
                        activeSlide === idx ? 'w-10 bg-[#B08A4A]' : 'w-4 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <span className="font-mono text-xs text-stone-300 tracking-wider">
                  0{activeSlide + 1} / 0{heroProducts.length}
                </span>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BENEFITS SECTION (Clean Horizontal Bar with Thin Dividers)             */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-[#D8D2C7] py-6 sm:py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#D8D2C7]">
            
            <div className="flex items-center justify-start lg:justify-center gap-3.5 sm:gap-4 px-2 lg:px-6">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717] stroke-[1.25] flex-shrink-0" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-medium tracking-[1.5px] uppercase text-[#0A0A0A]">
                  FREE SHIPPING
                </h4>
                <p className="text-[11px] text-neutral-500 font-light">
                  Across Pakistan on select orders
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start lg:justify-center gap-3.5 sm:gap-4 px-2 lg:px-6">
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717] stroke-[1.25] flex-shrink-0" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-medium tracking-[1.5px] uppercase text-[#0A0A0A]">
                  EASY EXCHANGE
                </h4>
                <p className="text-[11px] text-neutral-500 font-light">
                  Hassle-free 7-day exchange
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start lg:justify-center gap-3.5 sm:gap-4 px-2 lg:px-6">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717] stroke-[1.25] flex-shrink-0" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-medium tracking-[1.5px] uppercase text-[#0A0A0A]">
                  SECURE PAYMENT
                </h4>
                <p className="text-[11px] text-neutral-500 font-light">
                  Cash on Delivery &amp; Bank Transfer
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start lg:justify-center gap-3.5 sm:gap-4 px-2 lg:px-6">
              <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717] stroke-[1.25] flex-shrink-0" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-medium tracking-[1.5px] uppercase text-[#0A0A0A]">
                  PREMIUM QUALITY
                </h4>
                <p className="text-[11px] text-neutral-500 font-light">
                  Crafted to perfection
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SHOP BY CATEGORY (REAL CATEGORIES FROM LIVE PRODUCTS)                   */}
      {/* ========================================================================= */}
      {categories.length > 0 && (
        <section className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center space-y-2 mb-10 sm:mb-14">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-wide text-[#0A0A0A] uppercase">
              SHOP BY CATEGORY
            </h2>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
              <span className="text-[#B08A4A] text-[11px]">◆</span>
              <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className="group relative block overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-[#D8D2C7] hover:border-[#B08A4A] transition-all duration-500 ease-out hover:-translate-y-2.5 hover:shadow-[0_20px_40px_-15px_rgba(176,138,74,0.28)]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EEEAE2]">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                      <span className="font-serif text-xl text-[#0A0A0A] uppercase tracking-wider mb-1">
                        {cat.name.slice(0, 1)}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-sans tracking-widest uppercase">
                        ETHNIVA
                      </span>
                    </div>
                  )}
                  
                  {/* Subtle Dark Vignette on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating Glassmorphic 'Explore' Badge on Hover */}
                  <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none z-10">
                    <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#0A0A0A] px-3 py-1 rounded-full text-[9.5px] font-sans font-bold tracking-[1.5px] uppercase shadow-lg border border-white/60 whitespace-nowrap">
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3 h-3 text-[#B08A4A]" />
                    </span>
                  </div>
                </div>

                <div className="bg-[#EEEAE2] group-hover:bg-[#0A0A0A] group-hover:text-white transition-all duration-400 py-3.5 px-2.5 text-center border-t border-[#D8D2C7] group-hover:border-[#0A0A0A] relative overflow-hidden">
                  <span className="font-serif text-xs sm:text-sm tracking-[1.5px] font-normal uppercase block transition-all duration-300 group-hover:tracking-[2px]">
                    {cat.name}
                  </span>
                  {cat.item_count > 0 && (
                    <span className="text-[9px] tracking-[1.5px] text-neutral-400 group-hover:text-[#B08A4A] uppercase font-sans mt-0.5 block transition-colors duration-300">
                      {cat.item_count} {cat.item_count === 1 ? 'PIECE' : 'PIECES'}
                    </span>
                  )}
                  
                  {/* Animated Gold Bottom Accent Line */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-20 h-[2px] bg-gradient-to-r from-transparent via-[#B08A4A] to-transparent transition-all duration-500 rounded-full" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-10 sm:pt-14">
            <Link href="/shop" className="btn-outline-luxury">
              VIEW ALL COLLECTIONS
            </Link>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 4. NEW ARRIVALS (LIVE PRODUCTS FROM DATABASE)                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-t border-[#D8D2C7] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 sm:mb-14">
            <div className="text-center sm:text-left space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-wide text-[#0A0A0A] uppercase">
                NEW ARRIVALS
              </h2>
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-0.5">
                <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
                <span className="text-[#B08A4A] text-[10px]">◆</span>
                <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
              </div>
            </div>

            <Link 
              href="/shop?sort=newest" 
              className="text-xs font-medium tracking-[2px] uppercase text-[#171717] hover:text-[#B08A4A] transition-colors border-b border-[#171717] hover:border-[#B08A4A] pb-0.5"
            >
              VIEW ALL
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              {[...Array(4)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-[#F7F5F0] border border-[#D8D2C7] max-w-2xl mx-auto space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#EEEAE2] flex items-center justify-center text-[#B08A4A]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-[#0A0A0A] uppercase tracking-wider">
                New Collection Arriving Soon
              </h3>
              <p className="text-xs text-neutral-500 font-light max-w-md mx-auto">
                Our latest bespoke pieces and couture designs are currently being prepared. Check back shortly or visit our shop.
              </p>
              <div className="pt-2">
                <Link href="/admin" className="btn-primary-luxury inline-block text-xs">
                  ADD FIRST PRODUCT
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FEATURED PIECES SPOTLIGHT (ONLY SHOWN IF PRODUCTS EXIST)               */}
      {/* ========================================================================= */}
      {products.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#EEEAE2] border-t border-[#D8D2C7]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 sm:mb-14">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[11px] font-medium tracking-[2.5px] text-[#B08A4A] uppercase font-sans">
                  EDITORIAL SELECTION
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-wide text-[#0A0A0A] uppercase">
                  ATELIER SPOTLIGHT
                </h2>
              </div>

              <Link 
                href="/shop" 
                className="btn-outline-luxury"
              >
                DISCOVER ALL PIECES
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((item) => (
                <Link 
                  key={item.id}
                  href={`/product/${item.slug}`}
                  className="group relative block overflow-hidden bg-white border border-[#D8D2C7]"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EEEAE2]">
                    {item.images && item.images[0] ? (
                      <Image 
                        src={item.images[0]} 
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-serif text-neutral-400">
                        ETHNIVA
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-1">
                      <span className="text-[9.5px] font-sans tracking-[2px] text-[#B08A4A] uppercase block">
                        {item.category || 'Atelier Collection'}
                      </span>
                      <h3 className="font-serif text-base tracking-wide uppercase line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-neutral-300 group-hover:text-white pt-1">
                        <span className="font-serif text-sm text-white font-medium">PKR {item.price.toLocaleString()}</span>
                        <div className="flex items-center gap-1">
                          <span className="tracking-wider text-[10px] uppercase font-medium">Shop</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. ETHNIVA EDIT BANNER (Minimal Dramatic Luxury Aesthetic)                */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0A0A0A] text-white py-20 sm:py-28 overflow-hidden border-t border-[#171717]">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#171717] to-black opacity-80" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#B08A4A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#B08A4A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 z-10">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal tracking-[0.1em] text-white uppercase">
            ETHNIVA EDIT
          </h2>

          <p className="text-xs sm:text-sm font-medium tracking-[3px] text-[#B08A4A] uppercase font-sans">
            LUXURY • CONFIDENCE • ELEGANCE
          </p>

          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-lg mx-auto leading-relaxed">
            Every creation is infused with thoughtful craftsmanship, premium fabrics, and contemporary silhouettes designed for the discerning individual.
          </p>

          <div className="pt-2">
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center border border-[#B08A4A] hover:bg-[#B08A4A] text-white hover:text-[#0A0A0A] font-sans font-medium text-xs tracking-[2.5px] uppercase px-8 py-3.5 transition-colors"
            >
              DISCOVER STORE
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CLIENT TESTIMONIALS & CRAFTSMANSHIP PRAISE                             */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#D8D2C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
          
          <div className="space-y-2 mb-12">
            <span className="text-[11px] font-medium tracking-[2.5px] text-[#B08A4A] uppercase font-sans">
              ATELIER REVIEWS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-[#0A0A0A] uppercase">
              WORDS OF APPRECIATION
            </h2>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
              <span className="text-[#B08A4A] text-xs">◆</span>
              <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-8 bg-[#F7F5F0] border border-[#D8D2C7] space-y-4">
              <div className="flex gap-1 text-[#B08A4A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed italic">
                &ldquo;The fabric quality feels extraordinary. The cut is impeccable and the stitching detail matches high-end international couture houses.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#D8D2C7]">
                <h4 className="text-xs font-medium uppercase text-[#0A0A0A] tracking-wider">Ayla R.</h4>
                <span className="text-[10px] text-neutral-400 font-light uppercase tracking-wider">Lahore, Pakistan</span>
              </div>
            </div>

            <div className="p-8 bg-[#F7F5F0] border border-[#D8D2C7] space-y-4">
              <div className="flex gap-1 text-[#B08A4A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed italic">
                &ldquo;ETHNIVA is redefining modern luxury fashion. The tailoring and fitting is bespoke. Truly exceptional experience!&rdquo;
              </p>
              <div className="pt-2 border-t border-[#D8D2C7]">
                <h4 className="text-xs font-medium uppercase text-[#0A0A0A] tracking-wider">Sarah M.</h4>
                <span className="text-[10px] text-neutral-400 font-light uppercase tracking-wider">Islamabad, Pakistan</span>
              </div>
            </div>

            <div className="p-8 bg-[#F7F5F0] border border-[#D8D2C7] space-y-4">
              <div className="flex gap-1 text-[#B08A4A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed italic">
                &ldquo;Super fast express delivery and the luxury packaging is breathtaking. Easily the best pret purchase I have made.&rdquo;
              </p>
              <div className="pt-2 border-t border-[#D8D2C7]">
                <h4 className="text-xs font-medium uppercase text-[#0A0A0A] tracking-wider">Zayn K.</h4>
                <span className="text-[10px] text-neutral-400 font-light uppercase tracking-wider">Karachi, Pakistan</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
