'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, Star, ShieldCheck, Truck, Mail, Send, Gem, 
  RotateCcw, Headphones, Play, Camera, Heart, ChevronRight, ChevronLeft, ArrowDown, Sparkles 
} from 'lucide-react';
import { getProducts, getCategories, Product, Category } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Shimmer';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Hero Slider State & Real ReetWear Articles
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const HERO_SLIDES = [
    {
      tag: 'BRIDAL & FORMALS EDIT ’26',
      line1: 'Gulnaar Royal',
      line2: 'Heritage.',
      desc: 'Exquisite handcrafted bridal lehenga on pure silk with handpainted dupatta and elaborate zardozi beadwork.',
      image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/GULNAAR.png?v=1784821889',
      btnPrimary: 'DISCOVER GULNAAR',
      btnSecondary: 'VIEW ALL FORMALS',
      linkPrimary: '/product/gulnaar',
      linkSecondary: '/shop'
    },
    {
      tag: 'SILK & ADDA WORK EDIT ’26',
      line1: 'Shahee Blue',
      line2: 'Couture.',
      desc: 'Exquisite beaded handmade adda work meticulously crafted on pure silk with matching sharara and dupatta.',
      image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/SHAHEE_BLUE.png?v=1784821880',
      btnPrimary: 'VIEW SHAHEE BLUE',
      btnSecondary: 'SHOP CATALOG',
      linkPrimary: '/product/shahee_blue',
      linkSecondary: '/shop'
    },
    {
      tag: 'MAXY FORMALS COLLECTION',
      line1: 'Nora Handbeaded',
      line2: 'Elegance.',
      desc: 'Stunning maxy crafted from premium fabric with intricate pure handbeaded work, paired with trousers and dupatta.',
      image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/NORA.png?v=1784821888',
      btnPrimary: 'SHOP NORA MAXY',
      btnSecondary: 'VIEW ALL DESIGNS',
      linkPrimary: '/product/nora',
      linkSecondary: '/shop'
    },
    {
      tag: 'CHERMOUSE LUXURY PRET',
      line1: 'Pale Purple',
      line2: 'Sophistication.',
      desc: 'Crafted from pure chermouse silk ensuring softness and breathability with delicate handmade adda work.',
      image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/PALE_PURPLE.png?v=1784821844',
      btnPrimary: 'VIEW PALE PURPLE',
      btnSecondary: 'EXPLORE PRET',
      linkPrimary: '/product/pale_purple',
      linkSecondary: '/shop'
    },
    {
      tag: 'SIGNATURE GHERA CUT',
      line1: 'Black Bling',
      line2: 'Glamour.',
      desc: 'Masterpiece on pure silk with intricate beaded adda work and signature flared ghera design.',
      image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/BLACK_BLING.png?v=1784821888',
      btnPrimary: 'ORDER BLACK BLING',
      btnSecondary: 'SHOP NOW',
      linkPrimary: '/product/black_bling',
      linkSecondary: '/shop'
    }
  ];

  // Auto-play Hero Slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [HERO_SLIDES.length]);

  const handleNextHeroSlide = () => {
    setActiveHeroSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevHeroSlide = () => {
    setActiveHeroSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Slider Refs & Scroll Progress
  const newArrivalsRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const lookbookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadHomeData() {
      setLoading(true);
      try {
        const [prodData, catData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(prodData);
        setCategories(catData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const featuredProducts = products.filter(p => p.is_featured);
  const newArrivals = products.filter(p => p.is_new);

  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Real ReetWear Featured Collections Cards
  const FEATURED_COLLECTIONS = [
    { title: 'GULNAAR BRIDAL', subtitle: 'Handcrafted Silk & Lehengas', tag: 'COUTURE', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/GULNAAR.png?v=1784821889', link: '/product/gulnaar' },
    { title: 'SHAHEE BLUE', subtitle: 'Beaded Adda Work on Silk', tag: 'SIGNATURE', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/SHAHEE_BLUE.png?v=1784821880', link: '/product/shahee_blue' },
    { title: 'NORA MAXY', subtitle: 'Handbeaded Pure Flared Maxy', tag: 'TRENDING', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/NORA.png?v=1784821888', link: '/product/nora' },
    { title: 'BLACK BLING', subtitle: 'Ghera Cut & Pure Silk', tag: 'HIT ARTICLE', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/BLACK_BLING.png?v=1784821888', link: '/product/black_bling' },
    { title: 'MAROON BLING', subtitle: 'Traditional Beaded Adda Work', tag: 'EID EDIT', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/MAROON_BLING.png?v=1784821880', link: '/product/maroon_bling' },
    { title: 'PALE PURPLE', subtitle: 'Chermouse Soft Pret', tag: 'NEW LUXURY', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/PALE_PURPLE.png?v=1784821844', link: '/product/pale_purple' }
  ];

  // Lookbook Vertical Banner Shots from Real ReetWear Products
  const LOOKBOOK_IMAGES = [
    { title: 'Gulnaar Zardozi Mastery', issue: 'VOL. 01', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/Gulnaar4_9df8d1b4-7d63-4530-964e-c69d9bd0b9dd.png?v=1776338211' },
    { title: 'Shahee Blue Silk Sheen', issue: 'VOL. 02', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/SnapInsta.to_670598575_18314950543262080_1399575883604697496_n.jpg?v=1776430894' },
    { title: 'Naaz Handcrafted Elegance', issue: 'VOL. 03', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/SnapInsta.to_670166048_18263444161292282_9000666055044581959_n.jpg?v=1776338635' },
    { title: 'Maroon Bling Detail', issue: 'VOL. 04', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/SnapInsta.to_540101160_18072702941474776_5260783250879771553_n.jpg?v=1776101327' },
    { title: 'Nora Pure Beaded Maxy', issue: 'VOL. 05', image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/SnapInsta.to_671136028_18314947678262080_3262451630465070838_n.jpg?v=1776430626' }
  ];

  const currentSlide = HERO_SLIDES[activeHeroSlide];

  return (
    <div className="space-y-28 sm:space-y-32 pb-16 bg-[#FAF9F6] text-[#18181B] font-sans selection:bg-[#C7A76C] selection:text-white">
      
      {/* 1. HERO SLIDER SECTION (Crystal Clear Luxury Showcase with Floating Editorial Card) */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start overflow-hidden bg-[#FAF9F6]">
        
        {/* Crystal Clear Full-Bleed Photography - No White Fog / Heavy Washout */}
        <div className="absolute inset-0 z-0">
          <Image
            key={activeHeroSlide}
            src={currentSlide.image}
            alt={currentSlide.line1}
            fill
            priority
            className="object-cover object-center sm:object-[75%_center] lg:object-[82%_25%] transition-all duration-700 animate-fade-in"
          />
          {/* Very Subtle Gentle Gradient for Left Text Contrast while Keeping 100% Image Visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/80 via-[#FAF9F6]/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/40 via-transparent to-transparent z-10 pointer-events-none" />
        </div>

        {/* Hero Slider Control Arrows (< & >) */}
        <button 
          onClick={handlePrevHeroSlide}
          className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-[#881337] text-stone-800 hover:text-white border border-stone-200/80 items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-105"
          title="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNextHeroSlide}
          className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-[#881337] text-stone-800 hover:text-white border border-stone-200/80 items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-105"
          title="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Hero Left Content - Completely Transparent, No Card Box */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full py-16 sm:py-24">
          <div className="max-w-xl space-y-6 text-left animate-fade-in">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A76C]/60 bg-white/80 backdrop-blur-sm text-[10px] font-black text-[#881337] uppercase tracking-[0.3em] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A76C]" />
              <span>{currentSlide.tag}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#18181B] tracking-tight leading-[1.05] drop-shadow-xs">
                {currentSlide.line1}
              </h1>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif italic font-extrabold text-[#881337] tracking-tight drop-shadow-xs">
                {currentSlide.line2}
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone-700 font-medium max-w-md leading-relaxed tracking-wide">
              {currentSlide.desc}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={currentSlide.linkPrimary}
                className="btn-luxury-gold px-8 py-4 rounded-full text-xs shadow-xl tracking-widest uppercase font-black"
              >
                {currentSlide.btnPrimary}
              </Link>
              <Link
                href={currentSlide.linkSecondary}
                className="btn-luxury-outline px-8 py-4 rounded-full text-xs tracking-widest shadow-sm uppercase font-black bg-white/90 hover:bg-[#881337] hover:text-white"
              >
                {currentSlide.btnSecondary}
              </Link>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center gap-2.5 pt-3">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHeroSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    activeHeroSlide === idx ? 'w-10 bg-[#881337]' : 'w-2.5 bg-stone-400/60 hover:bg-[#881337]'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Social Proof Badge (Bottom Right) */}
        <div className="absolute bottom-8 right-6 lg:right-12 z-20 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-lg text-xs text-stone-900">
          <div className="flex -space-x-2">
            <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="User 1" />
            <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="User 2" />
            <img className="w-7 h-7 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100" alt="User 3" />
          </div>
          <div>
            <div className="font-extrabold flex items-center gap-1">
              <span>4.9 / 5.0</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[10px] text-stone-500 font-medium">Trusted by 10,000+ Couture Enthusiasts</div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1: LUXURY BENEFITS STRIP */}
      <section className="bg-white border-y border-stone-200 py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-stone-200">
            <div className="flex items-center gap-3.5 justify-center md:justify-start pt-3 md:pt-0 md:px-4">
              <Gem className="w-7 h-7 text-[#C7A76C] flex-shrink-0" />
              <div>
                <div className="text-xs font-black text-[#18181B] uppercase tracking-wider">PREMIUM QUALITY</div>
                <div className="text-[11px] text-stone-500 font-medium">Finest Fabric &amp; Stitching</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5 justify-center md:justify-start pt-3 md:pt-0 md:px-4">
              <Truck className="w-7 h-7 text-[#C7A76C] flex-shrink-0" />
              <div>
                <div className="text-xs font-black text-[#18181B] uppercase tracking-wider">FREE SHIPPING</div>
                <div className="text-[11px] text-stone-500 font-medium">Across Pakistan</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5 justify-center md:justify-start pt-3 md:pt-0 md:px-4">
              <ShieldCheck className="w-7 h-7 text-[#C7A76C] flex-shrink-0" />
              <div>
                <div className="text-xs font-black text-[#18181B] uppercase tracking-wider">SECURE PAYMENTS</div>
                <div className="text-[11px] text-stone-500 font-medium">100% Safe &amp; Protected</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5 justify-center md:justify-start pt-3 md:pt-0 md:px-4">
              <RotateCcw className="w-7 h-7 text-[#C7A76C] flex-shrink-0" />
              <div>
                <div className="text-xs font-black text-[#18181B] uppercase tracking-wider">EASY RETURNS</div>
                <div className="text-[11px] text-stone-500 font-medium">Within 7 Days</div>
              </div>
            </div>
            <div className="flex items-center gap-3.5 justify-center md:justify-start pt-3 md:pt-0 md:px-4">
              <Headphones className="w-7 h-7 text-[#C7A76C] flex-shrink-0" />
              <div>
                <div className="text-xs font-black text-[#18181B] uppercase tracking-wider">24/7 SUPPORT</div>
                <div className="text-[11px] text-stone-500 font-medium">Personal Styling Advice</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ULTRA-AESTHETIC FEATURED COLLECTIONS SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-5 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black text-[#881337] uppercase tracking-[0.3em]">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A76C]" />
              <span>CURATED ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif italic font-extrabold text-[#18181B] tracking-tight">
              Featured Couture Collections
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 bg-white border border-[#C7A76C]/30 p-1.5 rounded-full shadow-xs">
              <button 
                onClick={() => scrollSlider(collectionsRef, 'left')}
                className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#881337] border border-[#C7A76C]/40 hover:bg-[#881337] hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-black text-stone-400 px-1 uppercase tracking-widest">SLIDE</span>
              <button 
                onClick={() => scrollSlider(collectionsRef, 'right')}
                className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#881337] border border-[#C7A76C]/40 hover:bg-[#881337] hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link href="/shop" className="text-xs font-black text-[#881337] hover:text-[#C7A76C] uppercase tracking-widest hidden lg:block transition-colors">
              EXPLORE ALL &rarr;
            </Link>
          </div>
        </div>

        <div 
          ref={collectionsRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {FEATURED_COLLECTIONS.map((col, idx) => (
            <Link 
              key={idx} 
              href={col.link} 
              className="flex-none w-[280px] sm:w-[320px] snap-start group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-200 bg-white"
            >
              <Image 
                src={col.image} 
                alt={col.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/95 backdrop-blur-md border border-[#C7A76C]/60 text-[#881337] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  {col.tag}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end z-10">
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold tracking-wider uppercase leading-snug">{col.title}</h3>
                  <p className="text-[11px] text-stone-200 font-light">{col.subtitle}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-[#C7A76C] text-white group-hover:text-black flex items-center justify-center transition-all shadow-md group-hover:scale-110">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. ULTRA-AESTHETIC NEW ARRIVALS COUTURE SLIDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-5 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black text-[#881337] uppercase tracking-[0.3em]">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A76C]" />
              <span>FRESH OFF THE LOOM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif italic font-extrabold text-[#18181B] tracking-tight">
              New Arrivals Edition &rsquo;26
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 bg-white border border-[#C7A76C]/30 p-1.5 rounded-full shadow-xs">
              <button 
                onClick={() => scrollSlider(newArrivalsRef, 'left')}
                className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#881337] border border-[#C7A76C]/40 hover:bg-[#881337] hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-black text-stone-400 px-1 uppercase tracking-widest">SLIDE</span>
              <button 
                onClick={() => scrollSlider(newArrivalsRef, 'right')}
                className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#881337] border border-[#C7A76C]/40 hover:bg-[#881337] hover:text-white flex items-center justify-center transition-all shadow-xs"
                title="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <Link href="/shop?sort=newest" className="text-xs font-black text-[#881337] hover:text-[#C7A76C] uppercase tracking-widest hidden lg:block transition-colors">
              VIEW CATALOG &rarr;
            </Link>
          </div>
        </div>

        <div 
          ref={newArrivalsRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {loading ? (
            <div className="flex gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-none w-[270px] sm:w-[300px]">
                  <ProductCardSkeleton count={1} />
                </div>
              ))}
            </div>
          ) : (
            (newArrivals.length > 0 ? newArrivals : products).map(product => (
              <div key={product.id} className="flex-none w-[270px] sm:w-[300px] snap-start">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. SECTION 4: ASYMMETRICAL LAYERED IMAGE COLLAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-16">
          <span className="text-[10px] font-black text-[#C7A76C] uppercase tracking-[0.3em]">CRAFT &amp; HERITAGE</span>
          <h2 className="text-3xl sm:text-5xl font-serif italic font-extrabold text-[#18181B]">Anatomy of Luxury</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <Link href="/product/shahee_blue" className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg group border border-stone-200 bg-white block">
            <Image src="https://cdn.shopify.com/s/files/1/0637/4391/8237/files/SHAHEE_BLUE.png?v=1784821880" alt="Shahee Blue" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-wider">01. Shahee Blue Silk</div>
              <div className="text-[11px] text-stone-200">Handmade Beaded Adda Work</div>
            </div>
          </Link>

          <Link href="/product/gulnaar" className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group border-2 border-[#C7A76C] md:-translate-y-8 bg-white block">
            <Image src="https://cdn.shopify.com/s/files/1/0637/4391/8237/files/GULNAAR.png?v=1784821889" alt="Gulnaar Bridal" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 bg-[#881337] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase shadow-md">HOT EDIT</div>
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-wider">02. Gulnaar Bridal Lehenga</div>
              <div className="text-[11px] text-stone-200">Pure Silk &amp; Handpainted Dupatta</div>
            </div>
          </Link>

          <Link href="/product/maroon_bling" className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg group border border-stone-200 bg-white block">
            <Image src="https://cdn.shopify.com/s/files/1/0637/4391/8237/files/MAROON_BLING.png?v=1784821880" alt="Maroon Bling" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <div className="text-xs font-extrabold uppercase tracking-wider">03. Maroon Bling Sharara</div>
              <div className="text-[11px] text-stone-200">Signature Flared Ghera Cut</div>
            </div>
          </Link>
        </div>
      </section>

      {/* 6. CINEMATIC CAMPAIGN VIDEO BANNER */}
      <section className="relative min-h-[480px] sm:min-h-[520px] flex items-center justify-center overflow-hidden rounded-3xl max-w-7xl mx-auto border border-stone-200 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.shopify.com/s/files/1/0637/4391/8237/files/PALE_PURPLE.png?v=1784821844"
            alt="ReetWear Luxury Campaign"
            fill
            className="object-cover object-[50%_25%] filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/75 via-stone-950/60 to-stone-950/75" />
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-2xl px-4 animate-fade-in">
          <button 
            onClick={() => setVideoModalOpen(true)}
            className="w-20 h-20 rounded-full bg-[#C7A76C] text-white hover:bg-[#881337] flex items-center justify-center mx-auto shadow-2xl hover:scale-110 transition-all duration-300"
            title="Play Campaign Film"
          >
            <Play className="w-8 h-8 fill-current ml-1" />
          </button>
          
          <div className="space-y-2">
            <span className="text-[10px] font-black text-amber-200 uppercase tracking-[0.4em]">CAMPAIGN FILM ’26</span>
            <h2 className="text-3xl sm:text-5xl font-serif italic font-bold text-white">The Art of Handcrafting</h2>
            <p className="text-xs text-stone-200 max-w-md mx-auto leading-relaxed font-light">
              Watch our master artisans bring Zardozi embroidery to life in our Lahore atelier.
            </p>
          </div>
        </div>

        {videoModalOpen && (
          <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-stone-700 shadow-2xl bg-black">
              <button 
                onClick={() => setVideoModalOpen(false)} 
                className="absolute top-4 right-4 text-white hover:text-[#C7A76C] font-bold z-20 text-xs bg-black/60 px-3 py-1.5 rounded-full border border-white/20"
              >
                ✕ Close
              </button>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Zehra Studio Campaign"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </section>

      {/* 7. ULTRA-AESTHETIC LOOKBOOK JOURNAL SLIDER & CUSTOMER STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-5 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black text-[#881337] uppercase tracking-[0.3em]">
              <Sparkles className="w-3.5 h-3.5 text-[#C7A76C]" />
              <span>MAGAZINE JOURNAL</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif italic font-extrabold text-[#18181B] tracking-tight">
              Luxury Lookbook Spread
            </h2>
          </div>

          <div className="flex items-center gap-2.5 bg-white border border-[#C7A76C]/30 p-1.5 rounded-full shadow-xs">
            <button 
              onClick={() => scrollSlider(lookbookRef, 'left')}
              className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#881337] border border-[#C7A76C]/40 hover:bg-[#881337] hover:text-white flex items-center justify-center transition-all shadow-xs"
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-[10px] font-black text-stone-400 px-1 uppercase tracking-widest">SLIDE</span>
            <button 
              onClick={() => scrollSlider(lookbookRef, 'right')}
              className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#881337] border border-[#C7A76C]/40 hover:bg-[#881337] hover:text-white flex items-center justify-center transition-all shadow-xs"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div 
          ref={lookbookRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {LOOKBOOK_IMAGES.map((item, idx) => (
            <div 
              key={idx} 
              className="flex-none w-[240px] sm:w-[280px] snap-start relative aspect-[3/5] rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl border border-stone-200 bg-white"
            >
              <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
              
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/95 backdrop-blur-md border border-[#C7A76C]/50 text-[#881337] text-[9px] font-black px-3 py-1 rounded-full uppercase shadow-xs">
                  {item.issue}
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <h4 className="text-sm font-serif italic font-bold leading-tight">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Story Banner (Warm Ivory & Champagne Luxury Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#FAF7F2] via-[#F5EFEB] to-[#FAF7F2] text-stone-900 rounded-3xl p-8 sm:p-12 border border-[#E8DFC8] shadow-xl">
          <div className="lg:col-span-5 space-y-6">
            <div className="w-10 h-10 rounded-full bg-[#881337] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              &ldquo;
            </div>
            <div className="space-y-3">
              <span className="text-[10px] font-black text-[#881337] uppercase tracking-widest">COUTURE VOICES</span>
              <h3 className="text-2xl sm:text-3xl font-serif italic font-bold leading-snug text-[#18181B]">
                &ldquo;The fabric, the finishing, and the embroidery exceed every expectation. Zehra Studio is pure luxury.&rdquo;
              </h3>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-[#E8DFC8]">
              <img className="w-11 h-11 rounded-full object-cover border-2 border-[#C7A76C]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Fatima Tariq" />
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-[#18181B]">FATIMA TARIQ</div>
                <div className="text-[10px] text-stone-500 font-semibold">Lahore, Pakistan &bull; Verified Bride</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-md">
            <Image src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000" alt="Lookbook Story" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* 8. SECTION 7 & 8: INSTAGRAM GALLERY & VIP NEWSLETTER */}
      <section className="bg-white text-stone-900 pt-16 pb-0 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black text-[#881337] uppercase tracking-[0.3em]">#ZEHRASTUDIO</span>
              <h3 className="text-2xl font-serif italic font-bold text-[#18181B]">Follow Our Journal</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden group border border-stone-200 shadow-sm">
                <Image src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600" alt="Insta 1" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#881337]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"><Camera className="w-6 h-6" /></div>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden group border border-stone-200 shadow-sm">
                <Image src="https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=600" alt="Insta 2" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#881337]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"><Camera className="w-6 h-6" /></div>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden group border border-stone-200 shadow-sm">
                <Image src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600" alt="Insta 3" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#881337]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"><Camera className="w-6 h-6" /></div>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden group border border-stone-200 shadow-sm">
                <Image src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600" alt="Insta 4" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#881337]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"><Camera className="w-6 h-6" /></div>
              </div>
            </div>
          </div>

          {/* VIP Couture Club (Warm Champagne Ivory Luxury Box) */}
          <div className="bg-gradient-to-r from-[#FAF7F2] via-[#F5EFEB] to-[#FAF7F2] rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-[#E8DFC8] shadow-lg">
            <span className="text-[10px] font-black text-[#881337] uppercase tracking-widest">VIP COUTURE CLUB</span>
            <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#18181B]">Receive Private Collection Previews</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Subscribe to get exclusive early access to Eid Festive edits and private trunk show invitations.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Shukriya! Subscribed.'); }}>
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="flex-1 bg-white border border-stone-300 rounded-full px-5 py-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C7A76C] shadow-xs"
              />
              <button type="submit" className="btn-luxury-gold text-xs px-8 py-3 rounded-full shadow-md">
                JOIN VIP
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}

