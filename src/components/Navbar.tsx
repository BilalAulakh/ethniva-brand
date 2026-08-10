'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, Search, User, Heart, ChevronDown, 
  Menu, X, Sparkles, Check, Truck, ShieldCheck, AlertCircle, ArrowRight 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Navbar: React.FC = () => {
  const { cartCount, wishlistCount, setIsCartOpen } = useCart();
  const [showTicker, setShowTicker] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [readyToWearDropdownOpen, setReadyToWearDropdownOpen] = useState(false);
  const [luxuryPretDropdownOpen, setLuxuryPretDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto sliding ticker message index
  const [tickerIndex, setTickerIndex] = useState(0);
  const tickerMessages = [
    '👑 EID LUXURY FESTIVE EDIT ’26 — FLAT 50% OFF',
    '🚚 COMPLIMENTARY EXPRESS SHIPPING ACROSS PAKISTAN',
    '✨ BESPOKE TAILORING & CUSTOM MEASUREMENTS AVAILABLE'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % tickerMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Live Countdown Timer (04 DAYS 12 HRS 45 MINS 22 SECS)
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 12, minutes: 45, seconds: 22 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll detection for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* 1. Header Announcement Bar (40px Height, Luxury Champagne Cream #FAF6F0, Golden Typography) */}
      {showTicker && (
        <div className="h-[40px] bg-[#FAF6F0] text-[#785E2F] px-4 text-xs font-semibold flex items-center justify-between border-b border-[#E8DFC8] relative z-50 whitespace-nowrap">
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-bold text-[#881337] tracking-wider whitespace-nowrap">
            <Truck className="w-3.5 h-3.5 text-[#C7A76C] flex-shrink-0" />
            <span>FREE SHIPPING ACROSS PAKISTAN</span>
          </div>

          {/* Auto Sliding Ticker Message */}
          <div className="flex-1 text-center font-extrabold tracking-wide flex items-center justify-center gap-3 whitespace-nowrap">
            <span className="text-[#881337] transition-all duration-500 animate-fade-in whitespace-nowrap">
              {tickerMessages[tickerIndex]}
            </span>
            <div className="hidden sm:flex items-center gap-1 font-mono text-[10px] font-bold text-[#785E2F] flex-shrink-0">
              <span className="bg-white border border-[#C7A76C]/40 px-1.5 py-0.5 rounded shadow-xs">{String(timeLeft.days).padStart(2, '0')}D</span>
              <span className="bg-white border border-[#C7A76C]/40 px-1.5 py-0.5 rounded shadow-xs">{String(timeLeft.hours).padStart(2, '0')}H</span>
              <span className="bg-white border border-[#C7A76C]/40 px-1.5 py-0.5 rounded shadow-xs">{String(timeLeft.minutes).padStart(2, '0')}M</span>
              <span className="bg-white border border-[#C7A76C]/40 px-1.5 py-0.5 rounded shadow-xs">{String(timeLeft.seconds).padStart(2, '0')}S</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-medium text-stone-500 whitespace-nowrap">
            <span>SIGNATURE QUALITY</span>
            <button 
              onClick={() => setShowTicker(false)}
              className="p-1 hover:text-[#881337] transition-colors ml-2"
              title="Close announcement"
            >
              <X className="w-3.5 h-3.5 text-[#C7A76C]" />
            </button>
          </div>

          <button 
            onClick={() => setShowTicker(false)}
            className="lg:hidden p-1 hover:text-[#881337] transition-colors"
            title="Close announcement"
          >
            <X className="w-3.5 h-3.5 text-[#C7A76C]" />
          </button>
        </div>
      )}

      {/* 2. Main Luxury Sticky Navbar (Pristine White Background) */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/90 py-2.5' 
            : 'bg-white border-b border-stone-200 py-3.5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-800 hover:text-[#881337]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#C7A76C]/60 text-[#881337] flex items-center justify-center font-serif font-black text-lg tracking-tighter shadow-sm group-hover:bg-[#881337] group-hover:text-white transition-all">
              ZS
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-serif font-bold text-xl sm:text-2xl tracking-[0.15em] text-[#18181B] group-hover:text-[#881337] transition-colors leading-none">
                ZEHRA STUDIO
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#C7A76C] uppercase font-extrabold mt-1">
                LUXURY PRET & COUTURE
              </span>
            </div>
          </Link>

          {/* Center Main Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 whitespace-nowrap flex-shrink">
            <Link 
              href="/" 
              className="text-[12px] font-extrabold text-[#18181B] hover:text-[#881337] transition-colors uppercase tracking-wider py-2 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C7A76C]"
            >
              HOME
            </Link>

            <Link 
              href="/shop?sort=newest" 
              className="text-[12px] font-extrabold text-[#18181B] hover:text-[#881337] transition-colors uppercase tracking-wider py-2 whitespace-nowrap relative group/link"
            >
              <span>NEW ARRIVALS</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C7A76C] group-hover/link:w-full transition-all duration-300" />
            </Link>

            {/* Ready to Wear Mega Menu */}
            <div 
              className="relative py-2 group cursor-pointer whitespace-nowrap"
              onMouseEnter={() => setReadyToWearDropdownOpen(true)}
              onMouseLeave={() => setReadyToWearDropdownOpen(false)}
            >
              <Link 
                href="/shop?category=lawn-pret" 
                className="text-[12px] font-extrabold text-[#18181B] group-hover:text-[#881337] transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap"
              >
                <span>READY TO WEAR</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 group-hover:rotate-180 transition-transform duration-300 flex-shrink-0" />
              </Link>

              {readyToWearDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 grid grid-cols-3 gap-6 z-50 animate-slide-down">
                  <div className="space-y-3 border-r border-stone-100 pr-4">
                    <div className="text-[10px] font-black text-[#C7A76C] uppercase tracking-widest">CATEGORIES</div>
                    <ul className="space-y-2 text-xs font-bold text-stone-700">
                      <li><Link href="/shop" className="hover:text-[#881337]">Shirts</Link></li>
                      <li><Link href="/shop" className="hover:text-[#881337]">Kurta Sets</Link></li>
                      <li><Link href="/shop" className="hover:text-[#881337]">Co-ords</Link></li>
                      <li><Link href="/shop" className="hover:text-[#881337]">Trousers</Link></li>
                      <li><Link href="/shop" className="hover:text-[#881337]">Dupattas</Link></li>
                      <li><Link href="/shop" className="hover:text-[#881337]">Jackets</Link></li>
                      <li className="pt-1"><Link href="/shop" className="text-[#881337] underline">All Ready To Wear</Link></li>
                    </ul>
                  </div>

                  <div className="space-y-3 border-r border-stone-100 pr-4">
                    <div className="text-[10px] font-black text-[#C7A76C] uppercase tracking-widest">BEST SELLERS</div>
                    <div className="space-y-3">
                      <div className="flex gap-2.5 items-center">
                        <div className="w-10 h-12 bg-stone-100 rounded-lg overflow-hidden relative">
                          <Image src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200" alt="Item" fill className="object-cover" />
                        </div>
                        <div className="text-[11px]">
                          <div className="font-bold text-[#18181B] line-clamp-1">Embroidered Chiffon Shirt</div>
                          <div className="text-[#881337] font-extrabold">PKR 8,950</div>
                        </div>
                      </div>
                      <div className="flex gap-2.5 items-center">
                        <div className="w-10 h-12 bg-stone-100 rounded-lg overflow-hidden relative">
                          <Image src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200" alt="Item" fill className="object-cover" />
                        </div>
                        <div className="text-[11px]">
                          <div className="font-bold text-[#18181B] line-clamp-1">Luxury Lawn Co-ord Set</div>
                          <div className="text-[#881337] font-extrabold">PKR 7,450</div>
                        </div>
                      </div>
                      <Link href="/shop" className="block text-[10px] font-black text-[#881337] uppercase tracking-wider">VIEW ALL &rarr;</Link>
                    </div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[#FAF6F0] border border-[#E8DFC8] text-stone-900 p-4 flex flex-col justify-end">
                    <Image src="https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=400" alt="Banner" fill className="object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
                    <div className="relative z-10 space-y-2 text-white">
                      <span className="text-[9px] font-black text-amber-200 uppercase tracking-widest">EID LUXURY EDIT ’26</span>
                      <h4 className="text-xs font-serif font-bold italic leading-tight">Timeless Pieces For Timeless You</h4>
                      <Link href="/shop" className="inline-block bg-[#C7A76C] hover:bg-[#881337] text-white text-[9px] font-black px-3 py-1.5 rounded uppercase tracking-wider transition-colors shadow">
                        SHOP NOW
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Luxury Pret Dropdown */}
            <div 
              className="relative py-2 group cursor-pointer whitespace-nowrap"
              onMouseEnter={() => setLuxuryPretDropdownOpen(true)}
              onMouseLeave={() => setLuxuryPretDropdownOpen(false)}
            >
              <Link 
                href="/shop?category=velvet-luxury" 
                className="text-[12px] font-extrabold text-[#18181B] group-hover:text-[#881337] transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap"
              >
                <span>LUXURY PRET</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 group-hover:rotate-180 transition-transform duration-300 flex-shrink-0" />
              </Link>

              {luxuryPretDropdownOpen && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-slide-down">
                  <Link href="/shop?category=velvet-luxury" className="block px-3 py-2 text-xs font-bold text-stone-800 hover:bg-rose-50 hover:text-[#881337] rounded-xl">
                    Velvet Luxury Edition
                  </Link>
                  <Link href="/shop?category=chiffon-formals" className="block px-3 py-2 text-xs font-bold text-stone-800 hover:bg-rose-50 hover:text-[#881337] rounded-xl">
                    Handmade Chiffon
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/shop?category=chiffon-formals" 
              className="text-[12px] font-extrabold text-[#18181B] hover:text-[#881337] transition-colors uppercase tracking-wider py-2 whitespace-nowrap relative group/link"
            >
              <span>FORMALS</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C7A76C] group-hover/link:w-full transition-all duration-300" />
            </Link>

            <Link 
              href="/shop?sort=price-low" 
              className="text-[12px] font-extrabold text-[#881337] hover:text-[#18181B] transition-colors uppercase tracking-wider py-2 whitespace-nowrap"
            >
              SALE
            </Link>

            <Link 
              href="/shop" 
              className="text-[12px] font-extrabold text-[#18181B] hover:text-[#881337] transition-colors uppercase tracking-wider py-2 whitespace-nowrap relative group/link"
            >
              <span>LOOKBOOK</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C7A76C] group-hover/link:w-full transition-all duration-300" />
            </Link>

            <Link 
              href="/admin" 
              className="text-[12px] font-extrabold text-[#18181B] hover:text-[#881337] transition-colors uppercase tracking-wider py-2 whitespace-nowrap relative group/link"
            >
              <span>CONTACT</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C7A76C] group-hover/link:w-full transition-all duration-300" />
            </Link>
          </nav>

          {/* Right Action Icons & Currency Selector */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Currency Selector Pill */}
            <div className="relative hidden sm:block">
              <button 
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#C7A76C]/40 bg-[#FAF9F6] text-[11px] font-extrabold text-[#18181B] hover:border-[#C7A76C] transition-all whitespace-nowrap shadow-2xs"
              >
                <span>PKR (Rs)</span>
                <ChevronDown className="w-3 h-3 text-stone-600 flex-shrink-0" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 animate-slide-down">
                  <button 
                    onClick={() => setCurrencyDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-[#881337] bg-rose-50 rounded-xl flex items-center justify-between"
                  >
                    <span>PKR (Rs)</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setCurrencyDropdownOpen(false)}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 rounded-xl mt-1"
                  >
                    USD ($)
                  </button>
                </div>
              )}
            </div>

            {/* Search Trigger */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-stone-800 hover:text-[#881337] hover:bg-stone-50 rounded-full transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <Link 
              href="/shop" 
              className="p-2 text-stone-800 hover:text-[#881337] hover:bg-stone-50 transition-colors relative rounded-full"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#C7A76C] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            </Link>

            {/* User Account Modal */}
            <button 
              onClick={() => setAccountModalOpen(true)}
              className="p-2 text-stone-800 hover:text-[#881337] hover:bg-stone-50 rounded-full transition-colors"
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Icon with Rose Counter Badge */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-stone-800 hover:text-[#881337] hover:bg-stone-50 transition-colors relative rounded-full"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#881337] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount > 0 ? cartCount : 2}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-slide-down">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#881337] py-2.5 border-b border-stone-100 uppercase tracking-wider">HOME</Link>
            <Link href="/shop?sort=newest" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#881337] py-2.5 border-b border-stone-100 uppercase tracking-wider">NEW ARRIVALS</Link>
            <Link href="/shop?category=lawn-pret" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#881337] py-2.5 border-b border-stone-100 uppercase tracking-wider">READY TO WEAR</Link>
            <Link href="/shop?category=velvet-luxury" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#881337] py-2.5 border-b border-stone-100 uppercase tracking-wider">LUXURY PRET</Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-[#881337] py-2.5">⚙️ ADMIN DASHBOARD</Link>
          </div>
        )}
      </header>

      {/* Account Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-md p-6 shadow-2xl relative space-y-4">
            <button onClick={() => setAccountModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-rose-50 text-[#881337] rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg">ZS</div>
              <h3 className="text-lg font-bold text-[#18181B]">Zehra Studio Account Login</h3>
              <p className="text-xs text-stone-500">Sign in to track orders and save custom body measurements.</p>
            </div>
            <div className="space-y-3 pt-2">
              <input type="email" placeholder="Phone Number or Email" className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C7A76C]" />
              <input type="password" placeholder="Password" className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#C7A76C]" />
              <button onClick={() => setAccountModalOpen(false)} className="w-full btn-luxury-gold py-3 rounded-xl text-xs">LOG IN</button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-2xl p-6 shadow-2xl relative">
            <button onClick={() => setSearchOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold text-[#18181B] mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-[#881337]" />
              <span>Search ZEHRA STUDIO Catalog</span>
            </h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search by dress name, fabric (Velvet, Lawn, Chiffon)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-[#FAF9F6] border border-stone-300 rounded-2xl px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-[#C7A76C]"
                autoFocus
              />
              <Link 
                href={`/shop?search=${encodeURIComponent(searchQuery)}`}
                onClick={() => setSearchOpen(false)}
                className="btn-luxury-gold px-6 py-3 rounded-2xl text-xs flex items-center"
              >
                Search
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
