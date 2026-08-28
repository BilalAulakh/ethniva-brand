'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Truck, RotateCcw, ShieldCheck, Gem, 
  ChevronLeft, ChevronRight, ArrowRight, Sparkles, Star, 
  ShoppingBag, Eye, Check, Compass, Layers, Scissors, Heart
} from 'lucide-react';
import { getProducts, Product, MOCK_PRODUCTS } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeFabricTab, setActiveFabricTab] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const { addToCart } = useCart();

  // Premium high-fashion editorial slides
  const heroSlides = [
    {
      id: 1,
      tag: 'NEW COLLECTION ’26',
      title: 'ELEVATE\nYOUR STYLE',
      desc: 'Timeless fashion crafted for confidence, elegance, and international sophistication.',
      btn1Text: 'SHOP WOMEN',
      btn1Link: '/shop?category=women',
      btn2Text: 'SHOP MEN',
      btn2Link: '/shop?category=men',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1400&auto=format&fit=crop&q=90',
      hotspot: {
        top: '42%',
        left: '55%',
        title: 'Belted Blazer Dress',
        price: 'PKR 8,990',
        slug: 'belted-blazer-dress'
      }
    },
    {
      id: 2,
      tag: 'ETHNIVA COUTURE',
      title: 'TIMELESS\nSILHOUETTES',
      desc: 'Exquisite tailoring with handcrafted drapery, pure liquid silks, and architectural lines.',
      btn1Text: 'EXPLORE PRET',
      btn1Link: '/shop?category=ready-to-wear',
      btn2Text: 'VIEW COLLECTIONS',
      btn2Link: '/shop',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&auto=format&fit=crop&q=90',
      hotspot: {
        top: '38%',
        left: '48%',
        title: 'Liquid Satin Gown',
        price: 'PKR 6,990',
        slug: 'satin-slip-dress'
      }
    },
    {
      id: 3,
      tag: 'MEN’S ATELIER',
      title: 'EFFORTLESS\nLUXURY',
      desc: 'Breathable Italian linens, structured blazers, and mercerized knits for the modern muse.',
      btn1Text: 'SHOP MEN',
      btn1Link: '/shop?category=men',
      btn2Text: 'DISCOVER SUITING',
      btn2Link: '/shop?category=men',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=1400&auto=format&fit=crop&q=90',
      hotspot: {
        top: '35%',
        left: '52%',
        title: 'Premium Linen Shirt',
        price: 'PKR 4,490',
        slug: 'premium-linen-shirt'
      }
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Load backend / Supabase products
  useEffect(() => {
    async function loadData() {
      try {
        const prods = await getProducts();
        if (prods && prods.length > 0) {
          setProducts(prods);
        }
      } catch (err) {
        console.error('Home load error:', err);
      }
    }
    loadData();
  }, []);

  const categories = [
    {
      name: 'WOMEN',
      slug: 'women',
      count: '48 PIECES',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=85',
    },
    {
      name: 'MEN',
      slug: 'men',
      count: '32 PIECES',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=85',
    },
    {
      name: 'BAGS',
      slug: 'bags',
      count: '16 PIECES',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=85',
    },
    {
      name: 'SHOES',
      slug: 'shoes',
      count: '24 PIECES',
      image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&auto=format&fit=crop&q=85',
    },
    {
      name: 'ACCESSORIES',
      slug: 'accessories',
      count: '20 PIECES',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=85',
    },
  ];

  const fabrics = [
    {
      name: 'Pure Italian Linen',
      origin: 'Biella, Italy',
      desc: 'Crafted from 100% long-staple European flax. Incomparably breathable, naturally textured, and gets softer with every wear.',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=85',
      badge: '100% Organic'
    },
    {
      name: 'Mulberry Liquid Silk',
      origin: 'Lyons Atelier',
      desc: 'High-density 22-momme pure silk satin that drapes like liquid gold over the body with a radiant natural lustre.',
      image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800&auto=format&fit=crop&q=85',
      badge: 'Grade 6A Silk'
    },
    {
      name: 'Structured Tailoring Crepe',
      origin: 'Kyoto Weaving Mills',
      desc: 'Double-woven dense crepe that holds its sharp architectural form while providing crease-resistant luxury movement.',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop&q=85',
      badge: 'Anti-Crease'
    },
    {
      name: 'Mercerized Cotton Knit',
      origin: 'Giza, Egypt',
      desc: 'Extra-long staple yarn subjected to noble mercerization for enhanced tensile strength, silky smoothness, and rich color retention.',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=85',
      badge: 'Double Knit'
    }
  ];

  const lookbookItems = [
    {
      title: 'The Linen Minimalist',
      collection: 'Summer Pret ’26',
      image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=85',
      link: '/shop?category=women'
    },
    {
      title: 'Monochrome Suiting',
      collection: 'Atelier Formal',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=85',
      link: '/shop?category=men'
    },
    {
      title: 'Liquid Satin Evening',
      collection: 'Cocktail & Gala',
      image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800&auto=format&fit=crop&q=85',
      link: '/shop?category=women'
    },
    {
      title: 'Urban Structured Trench',
      collection: 'Outerwear Series',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=85',
      link: '/shop'
    }
  ];

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="bg-[#F7F5F0] text-[#171717] font-sans selection:bg-[#B08A4A] selection:text-white overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION WITH LUXURY INTERACTIVE SLIDER & SHOPPABLE HOTSPOTS       */}
      {/* ========================================================================= */}
      <section 
        className="relative w-full bg-[#F7F5F0] border-b border-[#D8D2C7] overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[76vh]">
          
          {/* Left Column: Typography & CTAs with Smooth Transition Key */}
          <div key={currentSlide.id} className="lg:col-span-6 space-y-6 lg:space-y-7 z-10 animate-fade-in">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#EEEAE2] border border-[#D8D2C7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B08A4A] animate-pulse" />
                <span className="text-[10px] font-sans font-medium tracking-[2.5px] text-[#B08A4A] uppercase">
                  {currentSlide.tag}
                </span>
              </div>
              
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-normal tracking-[0.03em] text-[#0A0A0A] leading-[1.08] uppercase whitespace-pre-line">
                {currentSlide.title}
              </h1>

              {/* Delicate Gold Diamond Ornament */}
              <div className="flex items-center gap-3 pt-1 pb-1">
                <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
                <span className="text-[#B08A4A] text-[11px]">◆</span>
                <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-md leading-relaxed">
                {currentSlide.desc}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link 
                href={currentSlide.btn1Link} 
                className="btn-primary-luxury group flex items-center gap-2"
              >
                <span>{currentSlide.btn1Text}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href={currentSlide.btn2Link} 
                className="btn-secondary-luxury"
              >
                {currentSlide.btn2Text}
              </Link>
            </div>

            {/* Slider Navigation Controls & Indicators */}
            <div className="flex items-center gap-6 pt-4 border-t border-[#D8D2C7]/70">
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-none border border-[#D8D2C7] bg-white hover:bg-[#0A0A0A] hover:text-[#B08A4A] hover:border-[#0A0A0A] flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-none border border-[#D8D2C7] bg-white hover:bg-[#0A0A0A] hover:text-[#B08A4A] hover:border-[#0A0A0A] flex items-center justify-center transition-colors shadow-2xs"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Indicators */}
              <div className="flex items-center gap-2">
                {heroSlides.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-[3px] transition-all duration-500 ${
                      activeSlide === idx ? 'w-8 bg-[#B08A4A]' : 'w-3 bg-[#D8D2C7] hover:bg-neutral-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="font-mono text-xs text-neutral-400 tracking-wider">
                0{activeSlide + 1} / 0{heroSlides.length}
              </span>
            </div>
          </div>

          {/* Right Column: High-End Editorial Photography with Interactive Shoppable Hotspot */}
          <div className="lg:col-span-6 relative w-full aspect-[4/5] sm:aspect-[4/5] lg:h-[580px] overflow-hidden bg-[#EEEAE2] border border-[#D8D2C7]">
            {heroSlides.map((slide, idx) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  activeSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title.replace('\n', ' ')}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-1000"
                />

                {/* Interactive Shoppable Pinpoint */}
                {slide.hotspot && (
                  <div 
                    className="absolute z-20"
                    style={{ top: slide.hotspot.top, left: slide.hotspot.left }}
                    onMouseEnter={() => setActiveHotspot(slide.id)}
                    onMouseLeave={() => setActiveHotspot(null)}
                  >
                    {/* Pulsing Ripple Dot */}
                    <div className="relative cursor-pointer">
                      <div className="w-5 h-5 rounded-full bg-[#B08A4A]/30 animate-ping absolute -inset-0" />
                      <div className="w-5 h-5 rounded-full bg-[#0A0A0A] border-2 border-[#B08A4A] flex items-center justify-center text-[9px] text-white font-bold relative shadow-lg">
                        +
                      </div>
                    </div>

                    {/* Popover Card */}
                    <Link
                      href={`/product/${slide.hotspot.slug}`}
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-white p-3 border border-[#D8D2C7] shadow-xl transition-all duration-300 pointer-events-auto block ${
                        activeHotspot === slide.id ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'
                      }`}
                    >
                      <span className="text-[9px] font-medium tracking-[1.5px] uppercase text-[#B08A4A] block">Featured Piece</span>
                      <h4 className="font-serif text-xs uppercase text-[#0A0A0A] mt-0.5 line-clamp-1">{slide.hotspot.title}</h4>
                      <div className="text-xs font-medium text-[#171717] mt-1">{slide.hotspot.price}</div>
                      <div className="text-[9.5px] text-[#B08A4A] font-medium tracking-wider uppercase mt-1.5 flex items-center gap-1">
                        <span>View Details</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* ========================================================================= */}
      {/* 3. BENEFITS SECTION (Clean Horizontal Bar with Thin Dividers)             */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-[#D8D2C7] py-6 sm:py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#D8D2C7]">
            
            {/* Benefit 1: FREE SHIPPING */}
            <div className="flex items-center justify-start lg:justify-center gap-3.5 sm:gap-4 px-2 lg:px-6">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717] stroke-[1.25] flex-shrink-0" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-medium tracking-[1.5px] uppercase text-[#0A0A0A]">
                  FREE SHIPPING
                </h4>
                <p className="text-[11px] text-neutral-500 font-light">
                  On orders over PKR 5,000
                </p>
              </div>
            </div>

            {/* Benefit 2: EASY RETURNS */}
            <div className="flex items-center justify-start lg:justify-center gap-3.5 sm:gap-4 px-2 lg:px-6">
              <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717] stroke-[1.25] flex-shrink-0" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-medium tracking-[1.5px] uppercase text-[#0A0A0A]">
                  EASY RETURNS
                </h4>
                <p className="text-[11px] text-neutral-500 font-light">
                  14-day return policy
                </p>
              </div>
            </div>

            {/* Benefit 3: SECURE PAYMENT */}
            <div className="flex items-center justify-start lg:justify-center gap-3.5 sm:gap-4 px-2 lg:px-6">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#171717] stroke-[1.25] flex-shrink-0" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-medium tracking-[1.5px] uppercase text-[#0A0A0A]">
                  SECURE PAYMENT
                </h4>
                <p className="text-[11px] text-neutral-500 font-light">
                  100% secure checkout
                </p>
              </div>
            </div>

            {/* Benefit 4: PREMIUM QUALITY */}
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
      {/* 4. SHOP BY CATEGORY                                                       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Heading */}
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

        {/* 5 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/shop?category=${cat.slug}`}
              className="group relative block overflow-hidden bg-[#EEEAE2] transition-all"
            >
              {/* Category Image (Portrait) */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />
              </div>

              {/* Bottom Minimal Banner Label */}
              <div className="bg-[#EEEAE2] group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors duration-300 py-3 px-2 text-center border-t border-[#D8D2C7]">
                <span className="font-serif text-sm sm:text-base tracking-[2px] font-normal uppercase block">
                  {cat.name}
                </span>
                <span className="text-[9px] tracking-[1.5px] text-neutral-400 group-hover:text-[#B08A4A] uppercase font-sans mt-0.5 block">
                  {cat.count}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="text-center pt-10 sm:pt-14">
          <Link href="/shop" className="btn-outline-luxury">
            VIEW ALL COLLECTIONS
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NEW ARRIVALS                                                           */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 border-t border-[#D8D2C7] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          {/* Header with Title and "VIEW ALL" on the right */}
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

          {/* 4 Products per row Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. ATELIER FABRIC & CRAFTSMANSHIP SPOTLIGHT (Cool Interactive Tabs)       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#F7F5F0] border-t border-[#D8D2C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="text-center space-y-2 mb-12">
            <span className="text-[11px] font-medium tracking-[2.5px] text-[#B08A4A] uppercase font-sans">
              ATELIER CRAFTSMANSHIP
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-wide text-[#0A0A0A] uppercase">
              NOBLE TEXTILES &amp; CUTS
            </h2>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
              <span className="text-[#B08A4A] text-[11px]">◆</span>
              <span className="w-10 h-[1px] bg-[#B08A4A]/50" />
            </div>
          </div>

          {/* Interactive Fabric Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {fabrics.map((fab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFabricTab(idx)}
                className={`px-5 py-2.5 text-xs font-medium tracking-[1.5px] uppercase transition-all ${
                  activeFabricTab === idx 
                    ? 'bg-[#0A0A0A] text-white border border-[#0A0A0A]' 
                    : 'bg-white text-neutral-600 border border-[#D8D2C7] hover:border-[#0A0A0A]'
                }`}
              >
                {fab.name}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-6 sm:p-10 border border-[#D8D2C7]">
            <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#EEEAE2]">
              <Image 
                src={fabrics[activeFabricTab].image}
                alt={fabrics[activeFabricTab].name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-all duration-700"
              />
              <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 text-[#B08A4A] text-[9.5px] tracking-[1.5px] uppercase px-2.5 py-1 font-mono font-medium">
                {fabrics[activeFabricTab].badge}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 font-sans">
              <div className="space-y-1">
                <span className="text-[10.5px] tracking-[2px] text-[#B08A4A] uppercase font-medium">
                  Sourced from {fabrics[activeFabricTab].origin}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#0A0A0A] uppercase">
                  {fabrics[activeFabricTab].name}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {fabrics[activeFabricTab].desc}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#D8D2C7]">
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Durability</div>
                  <div className="text-xs font-medium text-[#0A0A0A] mt-0.5">Heirloom Grade</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Feel</div>
                  <div className="text-xs font-medium text-[#0A0A0A] mt-0.5">Liquid Soft</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Finish</div>
                  <div className="text-xs font-medium text-[#0A0A0A] mt-0.5">Hand-Finished</div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/shop" className="btn-primary-luxury inline-block">
                  SHOP THIS FABRIC
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. THE ETHNIVA LOOKBOOK / RUNWAY EDITORIAL CAROUSEL                       */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#EEEAE2] border-t border-[#D8D2C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 sm:mb-14">
            <div className="text-center sm:text-left space-y-1">
              <span className="text-[11px] font-medium tracking-[2.5px] text-[#B08A4A] uppercase font-sans">
                RUNWAY &amp; CAMPAIGN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-wide text-[#0A0A0A] uppercase">
                THE ETHNIVA LOOKBOOK
              </h2>
            </div>

            <Link 
              href="/shop" 
              className="btn-outline-luxury"
            >
              DISCOVER EDITORIALS
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {lookbookItems.map((item, idx) => (
              <Link 
                key={idx}
                href={item.link}
                className="group relative block overflow-hidden bg-white border border-[#D8D2C7]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white space-y-1">
                    <span className="text-[9.5px] font-sans tracking-[2px] text-[#B08A4A] uppercase block">
                      {item.collection}
                    </span>
                    <h3 className="font-serif text-lg tracking-wide uppercase">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-300 group-hover:text-white pt-1">
                      <span className="tracking-wider text-[10px] uppercase font-medium">Shop The Look</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ETHNIVA EDIT BANNER (Dramatic Luxury Editorial)                        */}
      {/* ========================================================================= */}
      <section className="relative bg-[#0A0A0A] text-white py-24 sm:py-32 overflow-hidden border-t border-[#171717]">
        {/* Subtle Silk / Fabric Lighting Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#171717] to-black opacity-80" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#B08A4A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#B08A4A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Faint Monogram Watermark */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden md:block">
          <span className="font-serif text-[180px] font-bold text-[#B08A4A] leading-none">
            E
          </span>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 z-10">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal tracking-[0.1em] text-white uppercase">
            ETHNIVA EDIT
          </h2>

          <p className="text-xs sm:text-sm font-medium tracking-[3px] text-[#B08A4A] uppercase font-sans">
            LUXURY • CONFIDENCE • ELEGANCE
          </p>

          <div className="pt-4">
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center border border-[#B08A4A] hover:bg-[#B08A4A] text-white hover:text-[#0A0A0A] font-sans font-medium text-xs tracking-[2.5px] uppercase px-8 py-3.5 transition-colors"
            >
              DISCOVER MORE
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. CLIENT TESTIMONIALS & CRAFTSMANSHIP PRAISE                             */}
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
                &ldquo;The Italian Linen Shirt feels extraordinary. The cut is impeccable and the stitching detail matches high-end international couture houses.&rdquo;
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
                &ldquo;ETHNIVA is redefining modern luxury in Pakistan. The Belted Blazer Dress fits like bespoke tailoring. Truly exceptional experience!&rdquo;
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
                &ldquo;Super fast express delivery and the luxury packaging is breathtaking. The Knit Polo Shirt has the softest drape I have ever worn.&rdquo;
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
