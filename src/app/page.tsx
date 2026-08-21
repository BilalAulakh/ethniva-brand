'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, Star, ShieldCheck, Truck, Gem, 
  RotateCcw, Headphones, Play, Camera, ChevronRight, ChevronLeft, Sparkles, Plus, Package 
} from 'lucide-react';
import { getProducts, getCategories, Product, Category } from '@/lib/supabase';
import { ProductCard } from '@/components/ProductCard';
import { ProductCardSkeleton } from '@/components/Shimmer';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  // Slider Refs
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
  
  // Real dynamic hero slides from actual products
  const productsWithImages = products.filter(p => p.images && p.images.length > 0 && p.images[0]);
  const heroProducts = productsWithImages.slice(0, 5);

  // Auto-play Hero Slider when multiple products exist
  useEffect(() => {
    if (heroProducts.length <= 1) return;
    const timer = setInterval(() => {
      setActiveHeroSlide(prev => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const handleNextHeroSlide = () => {
    if (heroProducts.length === 0) return;
    setActiveHeroSlide(prev => (prev + 1) % heroProducts.length);
  };

  const handlePrevHeroSlide = () => {
    if (heroProducts.length === 0) return;
    setActiveHeroSlide(prev => (prev - 1 + heroProducts.length) % heroProducts.length);
  };

  const scrollSlider = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const currentHeroProduct = heroProducts[activeHeroSlide] || null;

  return (
    <div className="space-y-16 sm:space-y-24 md:space-y-32 pb-16 bg-[#FAF9F6] text-[#18181B] font-sans selection:bg-[#C7A76C] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-end sm:items-center justify-start overflow-hidden bg-[#FAF9F6]">
        {currentHeroProduct && currentHeroProduct.images?.[0] ? (
          <>
            <div className="absolute inset-0 z-0">
              <Image
                key={currentHeroProduct.id}
                src={currentHeroProduct.images[0]}
                alt={currentHeroProduct.title}
                fill
                priority
                className="object-cover object-center sm:object-[75%_center] lg:object-[82%_25%] transition-all duration-700 animate-fade-in"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/85 to-transparent sm:bg-gradient-to-r sm:from-[#FAF9F6]/95 sm:via-[#FAF9F6]/45 sm:to-transparent z-10 pointer-events-none" />
            </div>

            {heroProducts.length > 1 && (
              <>
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
              </>
            )}

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-12 lg:px-20 w-full pt-16 pb-10 sm:py-24">
              <div className="max-w-xl space-y-4 sm:space-y-6 text-left animate-fade-in">
                <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#C7A76C]/60 bg-white/90 backdrop-blur-sm text-[9px] sm:text-[10px] font-black text-[#881337] uppercase tracking-[0.25em] sm:tracking-[0.3em] shadow-xs">
                  <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#C7A76C]" />
                  <span>{currentHeroProduct.category || 'FEATURED COUTURE'}</span>
                </div>

                <div className="space-y-0.5 sm:space-y-1">
                  <h1 className="text-3xl sm:text-6xl font-serif font-bold text-[#18181B] tracking-tight leading-[1.1]">
                    {currentHeroProduct.title}
                  </h1>
                  <div className="text-2xl sm:text-3xl font-serif italic font-extrabold text-[#881337]">
                    RS. {currentHeroProduct.price.toLocaleString()}
                  </div>
                </div>

                <p className="text-xs sm:text-base text-stone-800 font-semibold sm:font-medium max-w-md leading-relaxed line-clamp-3">
                  {currentHeroProduct.description || `${currentHeroProduct.fabric} - Handcrafted luxury design.`}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                  <Link
                    href={`/product/${currentHeroProduct.slug || currentHeroProduct.id}`}
                    className="btn-luxury-gold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs shadow-lg tracking-widest uppercase font-black text-center"
                  >
                    VIEW ARTICLE
                  </Link>
                  <Link
                    href="/shop"
                    className="btn-luxury-outline px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs tracking-widest shadow-xs uppercase font-black bg-white/90 hover:bg-[#881337] hover:text-white text-center"
                  >
                    SHOP CATALOG
                  </Link>
                </div>

                {heroProducts.length > 1 && (
                  <div className="flex items-center gap-2 pt-2 sm:pt-3">
                    {heroProducts.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveHeroSlide(idx)}
                        className={`h-2 sm:h-2.5 rounded-full transition-all duration-500 ${
                          activeHeroSlide === idx ? 'w-8 sm:w-10 bg-[#881337]' : 'w-2 sm:w-2.5 bg-stone-400/60 hover:bg-[#881337]'
                        }`}
                        title={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-12 lg:px-20 w-full py-20 sm:py-32 text-center sm:text-left">
            <div className="max-w-2xl space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C7A76C]/60 bg-white/90 backdrop-blur-sm text-[10px] font-black text-[#881337] uppercase tracking-[0.3em] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C7A76C]" />
                <span>ZEHRA STUDIO &bull; OFFICIAL ATELIER</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-7xl font-serif font-bold text-[#18181B] tracking-tight leading-[1.1]">
                  Luxury Pret &amp;
                </h1>
                <h2 className="text-4xl sm:text-7xl font-serif italic font-extrabold text-[#881337] tracking-tight">
                  Bespoke Couture.
                </h2>
              </div>

              <p className="text-xs sm:text-base text-stone-600 font-medium max-w-lg leading-relaxed">
                Handcrafted pure fabrics, micro velvet formals, and delicate handmade adda work with custom tailoring &amp; express nationwide delivery.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <Link
                  href="/shop"
                  className="btn-luxury-gold w-full sm:w-auto px-8 py-4 rounded-full text-xs shadow-lg tracking-widest uppercase font-black text-center"
                >
                  EXPLORE SHOP
                </Link>
                <Link
                  href="/admin"
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-xs tracking-widest uppercase font-black bg-white border border-stone-300 hover:border-[#881337] text-stone-800 text-center shadow-xs flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-[#881337]" /> ADD ARTICLES IN ADMIN
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. LUXURY BENEFITS STRIP */}
      <section className="bg-white border-y border-stone-200 py-6 sm:py-8 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 text-left">
            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0">
              <Gem className="w-6 h-6 sm:w-7 sm:h-7 text-[#C7A76C] flex-shrink-0" />
              <div>
                <div className="text-[11px] sm:text-xs font-black text-[#18181B] uppercase tracking-wider">PREMIUM QUALITY</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Finest Fabric &amp; Stitching</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0">
              <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-[#C7A76C] flex-shrink-0" />
              <div>
                <div className="text-[11px] sm:text-xs font-black text-[#18181B] uppercase tracking-wider">FREE SHIPPING</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Across Pakistan</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#C7A76C] flex-shrink-0" />
              <div>
                <div className="text-[11px] sm:text-xs font-black text-[#18181B] uppercase tracking-wider">SECURE PAYMENTS</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500 font-medium">100% Safe &amp; Protected</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0">
              <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7 text-[#C7A76C] flex-shrink-0" />
              <div>
                <div className="text-[11px] sm:text-xs font-black text-[#18181B] uppercase tracking-wider">EASY RETURNS</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Within 7 Days</div>
              </div>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3.5 p-2 sm:p-0 col-span-2 sm:col-span-1">
              <Headphones className="w-6 h-6 sm:w-7 sm:h-7 text-[#C7A76C] flex-shrink-0" />
              <div>
                <div className="text-[11px] sm:text-xs font-black text-[#18181B] uppercase tracking-wider">24/7 SUPPORT</div>
                <div className="text-[10px] sm:text-[11px] text-stone-500 font-medium">Personal Styling Advice</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COUTURE COLLECTIONS SLIDER */}
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

        {categories.filter(cat => cat.item_count > 0 && cat.image).length > 0 ? (
          <div 
            ref={collectionsRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {categories.filter(cat => cat.item_count > 0 && cat.image).map((cat, idx) => (
              <Link 
                key={idx} 
                href={`/shop?category=${cat.slug}`} 
                className="flex-none w-[280px] sm:w-[320px] snap-start group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-200 bg-white"
              >
                <Image 
                  src={cat.image} 
                  alt={cat.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/95 backdrop-blur-md border border-[#C7A76C]/60 text-[#881337] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    {cat.item_count} {cat.item_count === 1 ? 'DESIGN' : 'DESIGNS'}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end z-10">
                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold tracking-wider uppercase leading-snug">{cat.name}</h3>
                    <p className="text-[11px] text-stone-200 font-light">Explore Luxury Edit</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-[#C7A76C] text-white group-hover:text-black flex items-center justify-center transition-all shadow-md group-hover:scale-110">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-6 space-y-3">
            <p className="text-xs text-stone-500">
              Couture collections will dynamically display here with your real product photography once you add articles to categories in Admin.
            </p>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#881337] hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add Articles in Admin Portal
            </Link>
          </div>
        )}
      </section>

      {/* 4. NEW ARRIVALS SLIDER */}
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

            <Link href="/shop" className="text-xs font-black text-[#881337] hover:text-[#C7A76C] uppercase tracking-widest hidden lg:block transition-colors">
              VIEW CATALOG &rarr;
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-x-auto pb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex-none w-[270px] sm:w-[300px]">
                <ProductCardSkeleton count={1} />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-4 shadow-xs">
            <Package className="w-12 h-12 text-[#C7A76C] mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#18181B]">Store Catalog is Ready</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No articles have been added to the store yet. Add your original products from the admin portal to showcase them here.
              </p>
            </div>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-2 brand-btn-primary text-white text-xs font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Your Real Articles
            </Link>
          </div>
        ) : (
          <div 
            ref={newArrivalsRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {(newArrivals.length > 0 ? newArrivals : products).map(product => (
              <div key={product.id} className="flex-none w-[270px] sm:w-[300px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. ANATOMY OF LUXURY / FEATURED ARTICLES COLLAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-16">
          <span className="text-[10px] font-black text-[#C7A76C] uppercase tracking-[0.3em]">CRAFT &amp; HERITAGE</span>
          <h2 className="text-3xl sm:text-5xl font-serif italic font-extrabold text-[#18181B]">Anatomy of Luxury</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {products.slice(0, 3).map((prod, idx) => (
            <Link 
              key={prod.id} 
              href={`/product/${prod.slug || prod.id}`} 
              className={`relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg group border border-stone-200 bg-white block ${
                idx === 1 ? 'md:-translate-y-8 border-2 border-[#C7A76C] shadow-2xl' : ''
              }`}
            >
              {prod.images?.[0] ? (
                <Image src={prod.images[0]} alt={prod.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full bg-stone-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
              {idx === 1 && (
                <div className="absolute top-4 right-4 bg-[#881337] text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase shadow-md">
                  SIGNATURE
                </div>
              )}
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <div className="text-xs font-extrabold uppercase tracking-wider">0{idx + 1}. {prod.title}</div>
                <div className="text-[11px] text-stone-200">{prod.fabric || prod.category}</div>
              </div>
            </Link>
          ))}
          {products.length === 0 && (
            <div className="col-span-3 text-center py-12 bg-white rounded-3xl border border-stone-200 p-6 text-xs text-stone-500">
              Featured collage will display your top 3 articles once added in the Admin Portal.
            </div>
          )}
        </div>
      </section>

      {/* 6. CINEMATIC CAMPAIGN VIDEO BANNER */}
      <section className="relative min-h-[440px] sm:min-h-[480px] flex items-center justify-center overflow-hidden rounded-3xl max-w-7xl mx-auto border border-stone-200 shadow-2xl bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900">
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
              Watch our master artisans bring traditional embroidery and bespoke couture to life.
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

      {/* 7. LOOKBOOK SPREAD & CUSTOMER STORY */}
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

        {products.length > 0 ? (
          <div 
            ref={lookbookRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {products.slice(0, 5).map((item, idx) => (
              <Link 
                key={idx} 
                href={`/product/${item.slug || item.id}`}
                className="flex-none w-[240px] sm:w-[280px] snap-start relative aspect-[3/5] rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl border border-stone-200 bg-white block"
              >
                {item.images?.[0] ? (
                  <Image src={item.images[0]} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-stone-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-white/95 backdrop-blur-md border border-[#C7A76C]/50 text-[#881337] text-[9px] font-black px-3 py-1 rounded-full uppercase shadow-xs">
                    VOL. 0{idx + 1}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                  <h4 className="text-sm font-serif italic font-bold leading-tight">{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-3xl border border-stone-200 text-xs text-stone-500">
            Lookbook editorial cards will showcase your latest uploaded photos.
          </div>
        )}

        {/* Customer Story Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-[#FAF7F2] via-[#F5EFEB] to-[#FAF7F2] text-stone-900 rounded-3xl p-8 sm:p-12 border border-[#E8DFC8] shadow-xl">
          <div className="lg:col-span-12 space-y-6">
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
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-[#18181B]">FATIMA TARIQ</div>
                <div className="text-[10px] text-stone-500 font-semibold">Lahore, Pakistan &bull; Verified Client</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM JOURNAL & VIP NEWSLETTER */}
      <section className="bg-white text-stone-900 pt-16 pb-0 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-black text-[#881337] uppercase tracking-[0.3em]">#ZEHRASTUDIO</span>
              <h3 className="text-2xl font-serif italic font-bold text-[#18181B]">Follow Our Journal</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0, 4).map((p, i) => (
                <Link key={i} href={`/product/${p.slug || p.id}`} className="relative aspect-square rounded-2xl overflow-hidden group border border-stone-200 shadow-sm block">
                  {p.images?.[0] ? (
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-stone-900" />
                  )}
                  <div className="absolute inset-0 bg-[#881337]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Camera className="w-6 h-6" />
                  </div>
                </Link>
              ))}
              {products.length === 0 && (
                <div className="col-span-2 md:col-span-4 text-center py-8 bg-[#FAF7F2] rounded-2xl border border-stone-200 text-xs text-stone-500">
                  Instagram photo stream will display your articles here.
                </div>
              )}
            </div>
          </div>

          {/* VIP Couture Club */}
          <div className="bg-gradient-to-r from-[#FAF7F2] via-[#F5EFEB] to-[#FAF7F2] rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-[#E8DFC8] shadow-lg">
            <span className="text-[10px] font-black text-[#881337] uppercase tracking-widest">VIP COUTURE CLUB</span>
            <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-[#18181B]">Receive Private Collection Previews</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Subscribe to get exclusive early access to Eid Festive edits, bespoke designs, and private previews.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Zehra Studio!'); }}>
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="flex-1 bg-white border border-stone-300 rounded-full px-5 py-3 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#C7A76C] shadow-xs"
              />
              <button type="submit" className="btn-luxury-gold text-xs px-8 py-3 rounded-full shadow-md font-bold">
                JOIN VIP
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}
