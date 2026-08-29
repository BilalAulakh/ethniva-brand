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
      {/* 1. HERO SECTION (100% DYNAMIC FROM DATABASE PRODUCTS)                     */}
      {/* ========================================================================= */}
      <section 
        className="relative w-full bg-[#F7F5F0] border-b border-[#D8D2C7] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[72vh]">
          
          {/* Left Column: Brand Typography & Real Product Details */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-7 z-10 animate-fade-in">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#EEEAE2] border border-[#D8D2C7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08A4A] animate-pulse" />
                <span className="text-[10px] font-sans font-medium tracking-[2.5px] text-[#B08A4A] uppercase">
                  {currentHeroProduct?.category ? `${currentHeroProduct.category} Collection` : 'ETHNIVA ATELIER ’26'}
                </span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[50px] xl:text-[56px] font-normal tracking-[0.03em] text-[#0A0A0A] leading-[1.08] uppercase whitespace-pre-line">
                {currentHeroProduct ? currentHeroProduct.title : 'ELEVATE\nYOUR STYLE'}
              </h1>

              {/* Gold Diamond Ornament */}
              <div className="flex items-center gap-3 pt-1 pb-1">
                <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
                <span className="text-[#B08A4A] text-[11px]">◆</span>
                <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-md leading-relaxed line-clamp-3">
                {currentHeroProduct?.description 
                  ? currentHeroProduct.description 
                  : 'Timeless fashion crafted for confidence, elegance, and international sophistication. Discover bespoke tailoring and luxury pret.'}
              </p>

              {currentHeroProduct && (
                <div className="pt-1 text-lg font-serif font-medium text-[#0A0A0A]">
                  PKR {currentHeroProduct.price.toLocaleString()}
                  {currentHeroProduct.compare_at_price && (
                    <span className="ml-3 text-xs line-through text-neutral-400 font-sans">
                      PKR {currentHeroProduct.compare_at_price.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {currentHeroProduct ? (
                <Link 
                  href={`/product/${currentHeroProduct.slug}`} 
                  className="btn-primary-luxury group flex items-center gap-2"
                >
                  <span>SHOP THIS PIECE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link 
                  href="/shop" 
                  className="btn-primary-luxury group flex items-center gap-2"
                >
                  <span>EXPLORE SHOP</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              
              <Link 
                href="/shop" 
                className="btn-secondary-luxury"
              >
                VIEW ALL PIECES
              </Link>
            </div>

            {/* Slider Navigation Controls (Only if multiple live products exist) */}
            {heroProducts.length > 1 && (
              <div className="flex items-center gap-6 pt-4 border-t border-[#D8D2C7]/70">
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={prevSlide}
                    className="w-8 h-8 border border-[#D8D2C7] bg-white hover:bg-[#0A0A0A] hover:text-[#B08A4A] hover:border-[#0A0A0A] flex items-center justify-center transition-colors shadow-2xs"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-8 h-8 border border-[#D8D2C7] bg-white hover:bg-[#0A0A0A] hover:text-[#B08A4A] hover:border-[#0A0A0A] flex items-center justify-center transition-colors shadow-2xs"
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
                      className={`h-[3px] transition-all duration-500 ${
                        activeSlide === idx ? 'w-8 bg-[#B08A4A]' : 'w-3 bg-[#D8D2C7] hover:bg-neutral-400'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <span className="font-mono text-xs text-neutral-400 tracking-wider">
                  0{activeSlide + 1} / 0{heroProducts.length}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Real Product Photography from Database */}
          <div className="lg:col-span-6 relative w-full aspect-[4/5] sm:aspect-[4/5] lg:h-[560px] overflow-hidden bg-[#EEEAE2] border border-[#D8D2C7]">
            {currentHeroProduct && currentHeroProduct.images && currentHeroProduct.images[0] ? (
              <Link href={`/product/${currentHeroProduct.slug}`} className="block w-full h-full relative group">
                <Image
                  src={currentHeroProduct.images[0]}
                  alt={currentHeroProduct.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 border border-[#D8D2C7] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-sans font-medium tracking-[1.5px] uppercase text-[#B08A4A] block">
                      {currentHeroProduct.category || 'Featured Piece'}
                    </span>
                    <h4 className="font-serif text-xs uppercase text-[#0A0A0A] font-medium line-clamp-1">
                      {currentHeroProduct.title}
                    </h4>
                  </div>
                  <div className="text-xs font-serif font-semibold text-[#0A0A0A]">
                    PKR {currentHeroProduct.price.toLocaleString()}
                  </div>
                </div>
              </Link>
            ) : (
              /* Minimal High-Fashion Placeholder when no database products exist yet */
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#EEEAE2]">
                <div className="w-16 h-16 rounded-full border border-[#B08A4A] flex items-center justify-center mb-4">
                  <Sparkles className="w-7 h-7 text-[#B08A4A] stroke-1" />
                </div>
                <h3 className="font-serif text-2xl uppercase tracking-widest text-[#0A0A0A] mb-2">
                  ETHNIVA
                </h3>
                <p className="text-xs text-neutral-500 font-light max-w-xs uppercase tracking-wider mb-6">
                  Atelier Luxury Pret &amp; Couture Collection
                </p>
                <Link href="/admin" className="text-[11px] font-medium tracking-[2px] text-[#B08A4A] uppercase border-b border-[#B08A4A] pb-1 hover:text-[#0A0A0A] transition-colors">
                  Add Products via Admin Panel →
                </Link>
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
                className="group relative block overflow-hidden bg-white border border-[#D8D2C7] transition-all hover:border-[#0A0A0A]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EEEAE2]">
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
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
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />
                </div>

                <div className="bg-[#EEEAE2] group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors duration-300 py-3 px-2 text-center border-t border-[#D8D2C7]">
                  <span className="font-serif text-xs sm:text-sm tracking-[1.5px] font-normal uppercase block">
                    {cat.name}
                  </span>
                  {cat.item_count > 0 && (
                    <span className="text-[9px] tracking-[1.5px] text-neutral-400 group-hover:text-[#B08A4A] uppercase font-sans mt-0.5 block">
                      {cat.item_count} {cat.item_count === 1 ? 'PIECE' : 'PIECES'}
                    </span>
                  )}
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
