'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ShoppingBag, Search, User, Heart, ChevronDown, 
  Menu, X, Sparkles, Check, Truck, ShieldCheck, AlertCircle, ArrowRight,
  Loader2, Lock, KeyRound, Eye, EyeOff, Phone
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, wishlistCount, setIsCartOpen } = useCart();
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
      (cleanEmail === 'zehrastudio3322@gmail.com' || cleanEmail === 'admin@zehrastudio.pk' || cleanEmail === 'admin' || cleanEmail === 'zehra' || cleanEmail === 'admin@zehra.com') &&
      (cleanPass === 'zehra2026' || cleanPass === 'admin12345' || cleanPass === '7860')
    ) {
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
    setAdminEmail('zehrastudio3322@gmail.com');
    setAdminPassword('zehra2026');
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

  // Hide storefront Navbar on /admin routes (after all hooks are called)
  if (pathname?.startsWith('/admin')) {
    return null;
  }

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

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-medium text-stone-700 whitespace-nowrap">
            <a 
              href="https://wa.me/923094329812" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 font-extrabold text-[#881337] hover:text-[#785E2F] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C7A76C]" />
              <span>WHATSAPP / HELP: 0309 43 29 812</span>
            </a>
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
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/90 py-2 sm:py-2.5' 
            : 'bg-white border-b border-stone-200 py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-stone-800 hover:text-[#881337] flex-shrink-0"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* Left Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 rounded-full bg-[#FAF6F0] border border-[#C7A76C]/60 text-[#881337] flex items-center justify-center font-serif font-black text-xs sm:text-sm xl:text-lg tracking-tighter shadow-xs group-hover:bg-[#881337] group-hover:text-white transition-all">
              ZS
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-serif font-bold text-base sm:text-lg xl:text-2xl tracking-[0.12em] sm:tracking-[0.15em] text-[#18181B] group-hover:text-[#881337] transition-colors leading-none">
                ZEHRA STUDIO
              </span>
              <span className="text-[7.5px] sm:text-[8px] xl:text-[9px] tracking-[0.25em] sm:tracking-[0.35em] text-[#C7A76C] uppercase font-extrabold mt-0.5 sm:mt-1">
                LUXURY PRET &amp; COUTURE
              </span>
            </div>
          </Link>

          {/* Center Main Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 lg:gap-4 xl:gap-6 whitespace-nowrap flex-shrink">
            <Link 
              href="/" 
              className="text-[11px] xl:text-[12px] font-extrabold text-[#18181B] hover:text-[#881337] transition-colors uppercase tracking-wider py-2 whitespace-nowrap relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#C7A76C]"
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
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 animate-slide-down">
                  <div className="text-[10px] font-black text-[#C7A76C] uppercase tracking-widest pb-2 border-b border-stone-100 mb-2">
                    COLLECTIONS &amp; STYLES
                  </div>
                  <ul className="space-y-1.5 text-xs font-bold text-stone-700">
                    <li><Link href="/shop?category=luxury-pret" className="block px-3 py-1.5 rounded-lg hover:bg-rose-50 hover:text-[#881337] transition-all">Luxury Pret</Link></li>
                    <li><Link href="/shop?category=pret-co-ords" className="block px-3 py-1.5 rounded-lg hover:bg-rose-50 hover:text-[#881337] transition-all">Pret &amp; Co-Ords</Link></li>
                    <li><Link href="/shop?category=velvet-silk-couture" className="block px-3 py-1.5 rounded-lg hover:bg-rose-50 hover:text-[#881337] transition-all">Velvet &amp; Silk Couture</Link></li>
                    <li><Link href="/shop?category=chiffon-organza-formals" className="block px-3 py-1.5 rounded-lg hover:bg-rose-50 hover:text-[#881337] transition-all">Chiffon &amp; Organza</Link></li>
                    <li><Link href="/shop?category=bridal-formals" className="block px-3 py-1.5 rounded-lg hover:bg-rose-50 hover:text-[#881337] transition-all">Bridal &amp; Formals</Link></li>
                    <li className="pt-2 border-t border-stone-100"><Link href="/shop" className="block px-3 py-1.5 text-[#881337] font-black underline">View All Ready To Wear &rarr;</Link></li>
                  </ul>
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
              className="text-[11px] xl:text-[12px] font-extrabold text-[#881337] hover:text-[#18181B] transition-colors uppercase tracking-wider py-2 whitespace-nowrap"
            >
              SALE
            </Link>

            <Link 
              href="/contact" 
              className="text-[11px] xl:text-[12px] font-extrabold text-[#18181B] hover:text-[#881337] transition-colors uppercase tracking-wider py-2 whitespace-nowrap relative group/link"
            >
              <span>CONTACT</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C7A76C] group-hover/link:w-full transition-all duration-300" />
            </Link>
          </nav>

          {/* Right Action Icons & Currency Selector */}
          <div className="flex items-center gap-1 sm:gap-2 xl:gap-3 flex-shrink-0">
            {/* Compact Admin Portal Button */}
            <button 
              onClick={handleAdminLinkClick}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#881337] text-[#881337] hover:text-white border border-[#C7A76C]/60 text-[10px] sm:text-[11px] font-black tracking-wider uppercase transition-all shadow-2xs group flex-shrink-0"
              title="Store Admin Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C7A76C] group-hover:text-white transition-colors flex-shrink-0" />
              <span className="hidden sm:inline">Admin Portal</span>
              <span className="sm:hidden">Admin</span>
            </button>

            {/* Search Trigger */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-1.5 sm:p-2 text-stone-800 hover:text-[#881337] hover:bg-stone-50 rounded-full transition-colors flex-shrink-0"
              title="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-slide-down">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#881337] py-2.5 border-b border-stone-100 uppercase tracking-wider">HOME</Link>
            <Link href="/shop?sort=newest" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#881337] py-2.5 border-b border-stone-100 uppercase tracking-wider">NEW ARRIVALS</Link>
            <Link href="/shop?category=luxury-pret" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-stone-800 hover:text-[#881337] py-2.5 border-b border-stone-100 uppercase tracking-wider">READY TO WEAR</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold text-[#881337] py-2.5 border-b border-stone-100 uppercase tracking-wider">CONTACT: 0309 43 29 812</Link>
            <button 
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleAdminLinkClick(e);
              }} 
              className="w-full flex items-center justify-between text-xs font-black text-white bg-[#881337] px-4 py-3 rounded-2xl shadow-md uppercase tracking-wider mt-2"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C7A76C]" />
                ADMIN DASHBOARD
              </span>
              <ArrowRight className="w-4 h-4 text-[#C7A76C]" />
            </button>
          </div>
        )}
      </header>

      {/* Admin Pre-Authentication Modal */}
      {adminAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl border border-[#E8DFC8] shadow-2xl p-6 sm:p-8 space-y-6 animate-scale-in relative overflow-hidden">
            
            {/* Top Gold Ornament */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C7A76C] via-[#881337] to-[#C7A76C]" />

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
              <div className="w-13 h-13 rounded-2xl bg-[#881337] text-white flex items-center justify-center mx-auto shadow-lg shadow-[#881337]/20">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black text-[#C7A76C] uppercase tracking-[0.3em] block">
                ADMIN ACCESS REQUIRED
              </span>
              <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-[#18181B]">
                Store Admin Portal
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
                <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                  Admin Email / Username
                </label>
                <input
                  type="text"
                  required
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  placeholder="admin@zehrastudio.pk"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#881337] rounded-xl text-xs text-[#18181B] focus:outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-[#18181B] uppercase tracking-wider">
                    Master Password / PIN
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="text-[10px] text-[#881337] font-semibold hover:underline"
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
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 focus:border-[#881337] rounded-xl text-xs text-[#18181B] focus:outline-none transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isAdminLoggingIn}
                className={`w-full py-3.5 bg-[#881337] hover:bg-[#6b0f2b] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-[#881337]/30 flex items-center justify-center gap-2 ${
                  isAdminLoggingIn ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99]'
                }`}
              >
                {isAdminLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#C7A76C]" />
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

            {/* Quick Credentials Demo Box */}
            <div className="bg-[#FAF7F2] border border-[#E8DFC8] rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-[#881337] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#C7A76C]" />
                  <span>Demo Credentials</span>
                </div>
                <button
                  type="button"
                  onClick={fillAdminDemo}
                  className="text-[10px] font-bold text-[#881337] bg-white border border-[#C7A76C]/40 px-2 py-0.5 rounded-md hover:bg-[#881337] hover:text-white transition-all shadow-2xs"
                >
                  1-Click Auto Fill
                </button>
              </div>

              <div className="text-[11px] space-y-1 font-mono text-stone-700 bg-white/70 p-2.5 rounded-lg border border-stone-200/60">
                <div className="flex justify-between">
                  <span className="text-stone-400">Email:</span>
                  <span className="font-bold text-[#18181B]">zehrastudio3322@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Password:</span>
                  <span className="font-bold text-[#881337]">zehra2026 (or admin12345)</span>
                </div>
              </div>
            </div>
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
              <div className="w-12 h-12 bg-rose-50 text-[#881337] rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-lg">ZS</div>
              <h3 className="text-lg font-bold text-[#18181B]">Zehra Studio Account Login</h3>
              <p className="text-xs text-stone-500">Sign in to track orders and save custom body measurements.</p>
            </div>
            <form onSubmit={handleCustomerLogin} className="space-y-3 pt-2">
              <input 
                type="text" 
                required
                value={customerEmail}
                onChange={e => setCustomerEmail(e.target.value)}
                placeholder="Phone Number or Email" 
                className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-[#C7A76C]" 
              />
              <input 
                type="password" 
                required
                value={customerPassword}
                onChange={e => setCustomerPassword(e.target.value)}
                placeholder="Password" 
                className="w-full bg-[#FAF9F6] border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-[#C7A76C]" 
              />
              <button 
                type="submit"
                disabled={isCustomerLoggingIn}
                className="w-full btn-luxury-gold py-3.5 rounded-xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 disabled:opacity-75"
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
