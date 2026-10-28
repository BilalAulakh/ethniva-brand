'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Truck, RotateCcw, ShieldCheck, Gem,
  ChevronLeft, ChevronRight, Sparkles, Star,
} from 'lucide-react';
import { getProducts, getCategories, Product, Category } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Shimmer';

// Shared section heading (centered, clean sans style)
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center space-y-2 mb-10 sm:mb-12">
      <h2 className="text-[22px] sm:text-[28px] font-normal tracking-[0.04em] text-[#222222] uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[12.5px] sm:text-[13px] text-[#666666] tracking-[0.03em]">{subtitle}</p>
      )}
    </div>
  );
}

// Hero slider: one product per slide, whole photo shown (head to toe).
// Hero look:
//   1 = blurred copy of the same photo fills the width, whole photo in the middle, text on the left
//   2 = plain beige background, text left, whole photo right
const HERO_STYLE: 1 | 2 = 2;

// Hero: first 3 Dhanak (Replica) designs, then these other designs.
// Change slugs here to change the hero.
const HERO_DHANAK_COUNT = 3;
const HERO_OTHER_SLUGS = ['heena', 'senroa-white', 'elva', 'moon-light', 'gul-green'];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

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

  // New Arrivals shows the Replica articles (4 on home, rest via VIEW ALL)
  const replicaProducts = products.filter(p => (p.category || '').trim().toLowerCase() === 'replica');

  // Hero products
  const heroProducts: Product[] = [
    ...replicaProducts.filter(p => !!p.images?.length).slice(0, HERO_DHANAK_COUNT),
    ...HERO_OTHER_SLUGS
      .map(slug => products.find(p => p.slug === slug))
      .filter((p): p is Product => !!p && !!p.images?.length),
  ];
  const heroCount = heroProducts.length;
  const currentHero = heroProducts[activeSlide] || heroProducts[0];

  // Auto-advance every 6s (always runs; restarts after a manual arrow click)
  useEffect(() => {
    if (heroCount <= 1) return;
    const timer = setTimeout(() => {
      setActiveSlide((prev) => (prev + 1) % heroCount);
    }, 6000);
    return () => clearTimeout(timer);
  }, [activeSlide, heroCount]);

  const nextSlide = () => {
    if (heroCount > 0) setActiveSlide((prev) => (prev + 1) % heroCount);
  };
  const prevSlide = () => {
    if (heroCount > 0) setActiveSlide((prev) => (prev - 1 + heroCount) % heroCount);
  };


  // Two promo banners + "who we are" image, picked from real products
  const withImages = products.filter(p => p.images && p.images.length > 0);
  const promoProducts = withImages.filter(p => !heroProducts.includes(p)).slice(0, 2);
  const storyProduct = withImages.find(p => !heroProducts.includes(p) && !promoProducts.includes(p));

  return (
    <div className="bg-white text-[#222222] font-sans overflow-x-hidden">

      {HERO_STYLE === 1 ? (
        <>
      {/* 1. HERO (style 1): blurred same-photo background, whole photo center, text left */}
      <section
        className="relative w-full h-[calc(100svh-120px)] min-h-[560px] max-h-[860px] overflow-hidden bg-[#2A2422]"
      >
        {heroProducts.map((prod, idx) => (
          <div
            key={prod.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Blurred copy fills the full width */}
            <Image
              src={prod.images[0]}
              alt=""
              aria-hidden
              fill
              sizes="100vw"
              className="object-cover scale-110 blur-2xl"
            />
            <div className="absolute inset-0 bg-black/25" />
            {/* Whole photo, head to toe */}
            <Link
              href={`/product/${prod.slug}`}
              className="absolute inset-y-0 py-5 right-0 left-0 lg:left-[30%] lg:right-[6%]"
              aria-label={prod.title}
            >
              <div className="relative w-full h-full">
                <Image
                  src={prod.images[0]}
                  alt={prod.title}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 1024px) 100vw, 64vw"
                  className="object-contain object-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                />
              </div>
            </Link>
          </div>
        ))}

        {/* Left fade so the text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none lg:hidden" />

        {heroCount > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#222222] flex items-center justify-center shadow-md transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#222222] flex items-center justify-center shadow-md transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Text */}
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 flex items-end lg:items-center pb-10 lg:pb-0 pointer-events-none">
          {currentHero && (
            <div key={currentHero.id} className="space-y-5 max-w-sm text-white pointer-events-auto animate-fade-in">
              <span className="block text-[11px] sm:text-xs tracking-[0.14em] uppercase text-white/90">
                {currentHero.category} Collection
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[0.02em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                {currentHero.title}
              </h1>
              <div className="flex items-baseline gap-3">
                {currentHero.compare_at_price && (
                  <span className="text-sm text-white/70 line-through">
                    PKR {currentHero.compare_at_price.toLocaleString()}
                  </span>
                )}
                <span className="text-xl font-semibold">PKR {currentHero.price.toLocaleString()}</span>
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <Link href={`/product/${currentHero.slug}`} className="btn-accent">Shop Now</Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center border-[1.5px] border-white text-white hover:bg-white hover:text-[#222222] text-xs font-medium tracking-[0.08em] uppercase px-7 py-[11px] transition-colors"
                >
                  View All
                </Link>
              </div>
              {heroCount > 1 && (
                <div className="flex items-center gap-2 pt-2">
                  {heroProducts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                        activeSlide === idx ? 'w-6 bg-[#CE967E]' : 'w-2 bg-white/60 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
        </>
      ) : (
        <>
      {/* 1. HERO (style 2): beige panel, text left, one full photo (head to toe) right */}
      <section
        className="relative w-full bg-[#F5F0ED] overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:h-[calc(100svh-120px)] lg:min-h-[560px] lg:max-h-[860px]">

          {/* Photo (shown first on mobile) */}
          <div className="relative order-1 lg:order-2 h-[72svh] min-h-[440px] lg:h-full">
            {loading && heroCount === 0 && (
              <div className="absolute inset-0 py-4 lg:py-6 flex justify-center">
                <div className="h-full aspect-[4/5] max-w-full shimmer-beige" />
              </div>
            )}
            {heroProducts.map((prod, idx) => (
              <Link
                key={prod.id}
                href={`/product/${prod.slug}`}
                className={`absolute inset-0 py-4 lg:py-6 transition-opacity duration-1000 ease-in-out ${
                  activeSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                aria-label={prod.title}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={prod.images[0]}
                    alt={prod.title}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain object-center drop-shadow-[0_18px_30px_rgba(0,0,0,0.12)]"
                  />
                </div>
              </Link>
            ))}

            {heroCount > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#222222] flex items-center justify-center shadow-md transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#222222] flex items-center justify-center shadow-md transition-colors cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Text */}
          <div className="order-2 lg:order-1 flex items-center px-6 sm:px-10 lg:px-16 xl:px-20 py-10 lg:py-0">
            {currentHero ? (
              <div className="space-y-5 max-w-md">
                {/* Only this part changes (and fades) with each slide */}
                <div key={currentHero.id} className="min-h-[220px] sm:min-h-[240px] lg:min-h-[260px] flex flex-col justify-end gap-5 animate-fade-in">
                <span className="block text-[11px] sm:text-xs tracking-[0.14em] text-[#222222] uppercase">
                  {currentHero.category} Collection
                </span>
                <h1 className={`font-bold leading-[1.12] tracking-[0.02em] text-[#222222] uppercase ${
                  currentHero.title.length > 20 ? 'text-2xl sm:text-3xl lg:text-[32px]' : 'text-4xl sm:text-5xl lg:text-[56px]'
                }`}>
                  {currentHero.title}
                </h1>
                <div className="flex items-baseline gap-3">
                  {currentHero.compare_at_price && (
                    <span className="text-sm text-[#888888] line-through">
                      PKR {currentHero.compare_at_price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xl font-semibold text-[#CE967E]">
                    PKR {currentHero.price.toLocaleString()}
                  </span>
                </div>
                {/* Product's own fabric line (falls back to a general line) */}
                <p className="text-[13px] text-[#666666] leading-[1.9] tracking-[0.02em] line-clamp-2">
                  {currentHero.fabric?.trim() || 'Thoughtful craftsmanship, premium fabrics, and contemporary silhouettes.'}
                </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link href={`/product/${currentHero.slug}`} className="btn-accent">Shop Now</Link>
                  <Link href="/shop" className="btn-outline-dark">View All</Link>
                </div>

              </div>
            ) : loading ? (
              <div className="w-full max-w-md space-y-5" aria-label="Loading">
                <div className="h-3 w-40 shimmer-beige" />
                <div className="space-y-3">
                  <div className="h-10 w-full shimmer-beige" />
                  <div className="h-10 w-3/4 shimmer-beige" />
                </div>
                <div className="h-6 w-32 shimmer-beige" />
                <div className="space-y-2">
                  <div className="h-3 w-full shimmer-beige" />
                  <div className="h-3 w-5/6 shimmer-beige" />
                </div>
                <div className="flex gap-3 pt-1">
                  <div className="h-[46px] w-36 shimmer-beige" />
                  <div className="h-[46px] w-32 shimmer-beige" />
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <h1 className="text-4xl font-bold text-[#222222] uppercase">Elevate Your Style</h1>
                <Link href="/shop" className="btn-accent">Explore Shop</Link>
              </div>
            )}
          </div>
        </div>
      </section>
        </>
      )}

      {/* 2. BENEFITS STRIP (accent bar) */}
      <section className="bg-[#CE967E] text-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { Icon: Truck, title: 'Free Shipping', sub: 'Across Pakistan on select orders' },
              { Icon: RotateCcw, title: 'Easy Exchange', sub: 'Hassle-free 7-day exchange' },
              { Icon: ShieldCheck, title: 'Secure Payment', sub: 'Cash on Delivery & Bank Transfer' },
              { Icon: Gem, title: 'Premium Quality', sub: 'Crafted to perfection' },
            ].map(({ Icon, title, sub }) => (
              <div key={title} className="flex items-center justify-start lg:justify-center gap-3">
                <Icon className="w-7 h-7 stroke-[1.25] flex-shrink-0" />
                <div className="leading-tight">
                  <h4 className="text-[12.5px] sm:text-[13px] font-medium tracking-[0.03em]">{title}</h4>
                  <p className="text-[10.5px] sm:text-[11px] text-white/80">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <SectionTitle title="New Arrivals" subtitle="Discover the latest arrivals at ETHNIVA" />

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : replicaProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {replicaProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center pt-10">
                <Link href="/shop?category=replica" className="btn-accent">
                  View All{replicaProducts.length > 4 ? ` (${replicaProducts.length})` : ''}
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 px-4 bg-[#F5F0ED] max-w-2xl mx-auto space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-white flex items-center justify-center text-[#CE967E]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg text-[#222222] uppercase tracking-wider">New Collection Arriving Soon</h3>
              <p className="text-xs text-[#666666] max-w-md mx-auto">
                Our latest pieces are currently being prepared. Check back shortly or visit our shop.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 4. COLLECTIONS (real categories) */}
      {categories.filter(cat => (cat.item_count || 0) > 0).length > 0 && (
        <section className="pb-16 sm:pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Collections" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {categories.filter(cat => (cat.item_count || 0) > 0).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                  className="group relative block overflow-hidden bg-[#F5F0ED]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    {cat.image ? (
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl text-[#CE967E] uppercase">
                        {cat.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="absolute left-0 bottom-4 sm:bottom-6 bg-white px-4 sm:px-5 py-2.5 sm:py-3 min-w-[55%] shadow-sm">
                    <span className="block text-[13px] sm:text-[15px] text-[#222222] group-hover:text-[#CE967E] transition-colors">
                      {cat.name}
                    </span>
                    <span className="block text-[10.5px] sm:text-[11px] text-[#666666] mt-0.5">
                      {cat.item_count} {cat.item_count === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center pt-10">
              <Link href="/shop" className="btn-accent">Shop Now</Link>
            </div>
          </div>
        </section>
      )}

      {/* 5. PROMO BANNERS (two large product images) */}
      {promoProducts.length === 2 && (
        <section className="pb-16 sm:pb-20">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {promoProducts.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="group relative block aspect-[4/5] sm:aspect-[5/6] overflow-hidden bg-[#F5F0ED]"
              >
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                <div className="absolute bottom-8 left-0 right-0 text-center space-y-4 px-4">
                  <span className="block text-[11px] tracking-[0.12em] uppercase text-white/85">
                    {item.category || 'Collection'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl text-white tracking-[0.03em]">{item.title}</h3>
                  <span className="btn-accent">Shop Now</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 6. WHO WE ARE */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F0ED]">
            {storyProduct?.images?.[0] && (
              <Image
                src={storyProduct.images[0]}
                alt={storyProduct.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            )}
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-[30px] font-semibold tracking-[0.02em] text-[#222222] uppercase">
              Who We Are
            </h2>
            <p className="text-[13px] sm:text-sm text-[#666666] leading-[1.9] tracking-[0.02em]">
              ETHNIVA is more than fashion. It&apos;s who you choose to be. Every creation is infused with
              thoughtful craftsmanship, premium fabrics, and contemporary silhouettes designed for the
              discerning individual.
            </p>
            <Link href="/shop" className="btn-accent">Discover Store</Link>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEWS */}
      <section className="py-16 sm:py-20 border-t border-[#E6E6E6]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
          <SectionTitle title="Words of Appreciation" subtitle="What our customers say about ETHNIVA" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Ayla R.', city: 'Lahore, Pakistan', text: 'The fabric quality feels extraordinary. The cut is impeccable and the stitching detail matches high-end international couture houses.' },
              { name: 'Sarah M.', city: 'Islamabad, Pakistan', text: 'ETHNIVA is redefining modern luxury fashion. The tailoring and fitting is bespoke. Truly exceptional experience!' },
              { name: 'Zayn K.', city: 'Karachi, Pakistan', text: 'Super fast express delivery and the luxury packaging is breathtaking. Easily the best pret purchase I have made.' },
            ].map((r) => (
              <div key={r.name} className="p-7 bg-white border border-[#EFEFEF] shadow-[0_6px_24px_-12px_rgba(0,0,0,0.12)] space-y-4">
                <div className="flex items-center gap-3">
                  <h4 className="text-[13px] font-semibold text-[#222222]">{r.name}</h4>
                  <div className="flex gap-0.5 text-[#F2B600]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                </div>
                <p className="text-[13px] text-[#555555] leading-relaxed">{r.text}</p>
                <span className="block text-[11px] text-[#999999]">{r.city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
