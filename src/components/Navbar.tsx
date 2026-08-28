'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ShoppingBag, Search, User, Heart, ChevronDown, ChevronLeft, ChevronRight,
  Menu, X, Sparkles, Check, Truck, ShieldCheck, AlertCircle, ArrowRight,
  Loader2, Lock, KeyRound, Eye, EyeOff, Phone
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, wishlist, wishlistCount, setIsCartOpen } = useCart();
  const [showTicker, setShowTicker] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [readyToWearDropdownOpen, setReadyToWearDropdownOpen] = useState(false);
  const [luxuryPretDropdownOpen, setLuxuryPretDropdownOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Admin Pre-Authentication Modal States
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [isAdminLoggingIn, setIsAdminLoggingIn] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Always open security credentials modal on clicking Admin Portal
  const handleAdminLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    setAdminAuthModalOpen(true);
  };

  const handleAdminModalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    setIsAdminLoggingIn(true);
    await new Promise(r => setTimeout(r, 450));

    const cleanEmail = adminEmail.trim().toLowerCase();
    const cleanPass = adminPassword.trim();

    if (
      (cleanEmail === 'ethnivabrand@gmail.com' || cleanEmail === 'admin@ethniva.com' || cleanEmail === 'admin' || cleanEmail === 'ethniva' || cleanEmail === 'zehrastudio3322@gmail.com') &&
      (cleanPass === 'ethniva2026' || cleanPass === 'zehra2026' || cleanPass === 'admin12345' || cleanPass === '7860')
    ) {
      localStorage.setItem('ethniva_admin_auth', 'authenticated_true');
      localStorage.setItem('zehra_admin_auth', 'authenticated_true');
      setIsAdminLoggingIn(false);
      setAdminAuthModalOpen(false);
      router.push('/admin');
    } else {
      setIsAdminLoggingIn(false);
      setAdminLoginError('Invalid credentials. Please enter valid email & password or click 1-Click Auto Fill.');
    }
  };

  const fillAdminDemo = () => {
    setAdminEmail('ethnivabrand@gmail.com');
    setAdminPassword('ethniva2026');
  };

  // Customer Account Login States
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const [isCustomerLoggingIn, setIsCustomerLoggingIn] = useState(false);
  const [customerLoginSuccess, setCustomerLoginSuccess] = useState(false);

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim()) return;
    setIsCustomerLoggingIn(true);
    await new Promise(r => setTimeout(r, 600));
    setIsCustomerLoggingIn(false);
    setCustomerLoginSuccess(true);
    setTimeout(() => {
      setCustomerLoginSuccess(false);
      setAccountModalOpen(false);
    }, 1200);
  };

  // Auto sliding ticker message index
  const [tickerIndex, setTickerIndex] = useState(0);
  const tickerMessages = [
    '👑 ETHNIVA FESTIVE COUTURE ’26 — FLAT 50% OFF',
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

  // Hide storefront Navbar on /admin routes (after all hooks are called)
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* 1. Header Announcement Bar (Black background, luxury gold text with chevron arrows) */}
      {showTicker && (
        <div className="h-[34px] bg-[#0A0A0A] text-[#B08A4A] px-4 text-[10.5px] sm:text-xs font-medium flex items-center justify-between border-b border-[#171717] relative z-50 overflow-hidden">
          <button 
            onClick={() => setTickerIndex((prev) => (prev - 1 + tickerMessages.length) % tickerMessages.length)} 
            className="hover:text-[#C9A86A] transition-colors p-1"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Centered Announcement Message */}
          <div className="flex-1 text-center font-medium tracking-[2px] uppercase text-[10px] sm:text-[11px] truncate px-2">
            <span>FREE SHIPPING ON ORDERS OVER PKR 5,000</span>
          </div>

          <button 
            onClick={() => setTickerIndex((prev) => (prev + 1) % tickerMessages.length)} 
            className="hover:text-[#C9A86A] transition-colors p-1"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 2. Main Luxury Sticky Header (Warm Cream / White background) */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#D8D2C7] py-2 sm:py-2.5' 
            : 'bg-white border-b border-[#D8D2C7] py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6">
          
          {/* Mobile Hamburger & Left Brand Logo */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#171717] hover:text-[#B08A4A]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Left Brand Logo (ETHNIVA) */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 overflow-hidden flex items-center justify-center">
                <Image 
                  src="/logo.jpg" 
                  alt="ETHNIVA Logo" 
                  fill 
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-[0.25em] text-xl sm:text-2xl xl:text-[26px] font-normal text-[#0A0A0A] group-hover:text-[#B08A4A] transition-colors leading-none">
                  ETHNIVA
                </span>
                <span className="text-[7.5px] tracking-[0.3em] text-[#B08A4A] uppercase font-sans font-medium mt-0.5">
                  CLOTHING BRAND
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (NEW IN, WOMEN, MEN, READY TO WEAR, COLLECTIONS, SALE) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link href="/shop?sort=newest" className="nav-link-luxury">
              NEW IN
            </Link>
            <Link href="/shop?category=women" className="nav-link-luxury">
              WOMEN
            </Link>
            <Link href="/shop?category=men" className="nav-link-luxury">
              MEN
            </Link>
            <Link href="/shop?category=ready-to-wear" className="nav-link-luxury">
              READY TO WEAR
            </Link>
            <Link href="/shop" className="nav-link-luxury">
              COLLECTIONS
            </Link>
            <Link href="/shop?category=sale" className="nav-link-luxury text-[#B08A4A]">
              SALE
            </Link>
          </nav>

          {/* Right Action Icons (Search, Account, Wishlist, Bag, Admin) */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 flex-shrink-0">
            {/* Search */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="text-[#171717] hover:text-[#B08A4A] transition-colors p-1"
              title="Search Catalog"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
            </button>

            {/* Account */}
            <button 
              onClick={() => setAccountModalOpen(true)}
              className="text-[#171717] hover:text-[#B08A4A] transition-colors p-1 hidden sm:block"
              title="Customer Account"
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
            </button>

            {/* Wishlist */}
            <Link 
              href="/shop?view=wishlist" 
              className="text-[#171717] hover:text-[#B08A4A] transition-colors p-1 relative hidden sm:block"
              title="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#B08A4A] text-white text-[8.5px] font-mono font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-[#171717] hover:text-[#B08A4A] transition-colors p-1 relative"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#B08A4A] text-white text-[9px] font-mono font-medium rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Discreet Admin Lock */}
            <button 
              onClick={handleAdminLinkClick}
              className="text-stone-400 hover:text-[#B08A4A] transition-colors p-1"
              title="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-slide-down">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#C5A059] py-2.5 border-b border-stone-100 uppercase tracking-wider">HOME</Link>
            <Link href="/shop?sort=newest" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#C5A059] py-2.5 border-b border-stone-100 uppercase tracking-wider">NEW ARRIVALS</Link>
            <Link href="/shop?category=luxury-pret" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#C5A059] py-2.5 border-b border-stone-100 uppercase tracking-wider">LUXURY PRET</Link>
            <Link href="/shop?category=ready-to-wear" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#C5A059] py-2.5 border-b border-stone-100 uppercase tracking-wider">READY TO WEAR</Link>
            <Link href="/shop?category=raw-silk-chiffon" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#C5A059] py-2.5 border-b border-stone-100 uppercase tracking-wider">RAW SILK &amp; CHIFFON</Link>
            <Link href="/shop?category=velvet-festive" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#C5A059] py-2.5 border-b border-stone-100 uppercase tracking-wider">VELVET FESTIVE</Link>
            <Link href="/shop?category=sale-clearance" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-[#C5A059] py-2.5 border-b border-stone-100 uppercase tracking-wider">TOP SALE &amp; CLEARANCE</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-medium text-[#171717] hover:text-[#B08A4A] py-2.5 border-b border-stone-100 uppercase tracking-wider">CONTACT US</Link>
            <button 
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleAdminLinkClick(e);
              }} 
              className="w-full flex items-center justify-between text-xs font-bold text-stone-700 bg-stone-100 hover:bg-[#111111] hover:text-white px-4 py-3 rounded-2xl transition-all uppercase tracking-wider mt-2 border border-stone-200"
            >
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#C5A059]" />
                ADMIN PORTAL
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        )}
      </header>

      {/* Admin Pre-Authentication Modal */}
      {adminAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl border border-[#E8DFC8] shadow-2xl p-6 sm:p-8 space-y-6 animate-scale-in relative overflow-hidden">
            
            {/* Top Gold Ornament */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C5A059] via-[#111111] to-[#C5A059]" />

            {/* Close Button */}
            <button 
              type="button"
              onClick={() => setAdminAuthModalOpen(false)} 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2 pt-2">
              <div className="w-13 h-13 rounded-2xl bg-[#111111] text-[#C5A059] border border-[#C5A059]/40 flex items-center justify-center mx-auto shadow-lg shadow-black/20">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.3em] block">
                ADMIN ACCESS REQUIRED
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
                ETHNIVA Admin Portal
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Please enter administrator credentials to manage products, pricing, and live orders.
              </p>
            </div>

            {/* Error Notification */}
            {adminLoginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                <span>{adminLoginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleAdminModalLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#111111] uppercase tracking-wider">
                  Admin Email / Username
                </label>
                <input
                  type="text"
                  required
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  placeholder="ethnivabrand@gmail.com"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#C5A059] rounded-xl text-xs text-[#111111] focus:outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-[#111111] uppercase tracking-wider">
                    Master Password / PIN
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="text-[10px] text-[#C5A059] font-semibold hover:underline"
                  >
                    {showAdminPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  required
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#C5A059] rounded-xl text-xs text-[#111111] focus:outline-none transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isAdminLoggingIn}
                className={`w-full py-3.5 bg-[#111111] hover:bg-[#C5A059] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2 ${
                  isAdminLoggingIn ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {isAdminLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />
                    <span>Verifying Master Access...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Unlock Admin Dashboard</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Account Modal */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-md p-6 shadow-2xl relative space-y-4">
            <button onClick={() => setAccountModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-700">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-1">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#C5A059] mx-auto mb-2">
                <Image src="/logo.jpg" alt="ETHNIVA" fill className="object-cover" />
              </div>
              <h3 className="font-brand-serif text-lg font-bold text-[#111111]">ETHNIVA Account Login</h3>
              <p className="text-xs text-stone-500">Sign in to track orders and save custom body measurements.</p>
            </div>
            <form onSubmit={handleCustomerLogin} className="space-y-3 pt-2">
              <input 
                type="text" 
                required
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                placeholder="Phone Number or Email" 
                className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]" 
              />
              <input 
                type="password" 
                required
                value={customerPassword}
                onChange={e => setCustomerPassword(e.target.value)}
                placeholder="Password" 
                className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]" 
              />
              <button 
                type="submit"
                disabled={isCustomerLoggingIn}
                className="w-full btn-luxury-gold py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isCustomerLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Signing In...</span>
                  </>
                ) : customerLoginSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Signed In Successfully!</span>
                  </>
                ) : (
                  <span>LOG IN TO ACCOUNT</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-3 sm:px-4 animate-fade-in">
          <div className="bg-white border border-stone-200 rounded-3xl w-full max-w-xl p-5 sm:p-7 shadow-2xl relative space-y-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-[#111111] flex items-center gap-2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A059]" />
                <span>Search Catalog</span>
              </h3>
              <button 
                onClick={() => setSearchOpen(false)} 
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  setSearchOpen(false);
                  router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                }
              }}
              className="flex items-center gap-2 w-full"
            >
              <input 
                type="text" 
                placeholder="Search by dress name, fabric, style..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-0 bg-[#FAF7F2] border border-stone-300 focus:border-[#C5A059] rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-stone-900 focus:outline-none transition-all placeholder:text-stone-400"
                autoFocus
              />
              <button 
                type="submit"
                className="btn-luxury-gold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold uppercase tracking-wider flex-shrink-0 whitespace-nowrap shadow-sm"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

