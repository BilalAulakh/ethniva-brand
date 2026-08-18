'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCw, Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide storefront Footer on /admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="bg-white text-stone-700 pt-16 pb-8 border-t border-stone-200">
      {/* Top Value Badges (Warm Ivory & Champagne) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-[#FAF7F2] rounded-3xl border border-[#E8DFC8] shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#C7A76C]/50 flex items-center justify-center text-[#881337] shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#18181B]">Free Nationwide Delivery</h4>
              <p className="text-xs text-stone-500">On all orders above RS. 5,000 across Pakistan</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#C7A76C]/50 flex items-center justify-center text-[#881337] shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#18181B]">100% Authentic Handcraft</h4>
              <p className="text-xs text-stone-500">Pure chiffon, micro velvet, and zardozi embroidery</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#C7A76C]/50 flex items-center justify-center text-[#881337] shadow-xs">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#18181B]">7-Day Easy Exchange</h4>
              <p className="text-xs text-stone-500">Hassle-free size replacement &amp; exchange policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand Info */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <span className="font-serif font-bold text-2xl tracking-[0.2em] text-[#18181B] hover:text-[#881337] transition-colors">
              ZEHRA STUDIO
            </span>
          </Link>
          <p className="text-xs text-stone-500 leading-relaxed">
            ZEHRA STUDIO is Pakistan’s premier luxury women’s fashion couture offering handmade stitched pret, velvet formals, chiffon ensembles, and party wear.
          </p>
          <div className="flex gap-3 text-stone-600 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-stone-200 flex items-center justify-center hover:text-[#881337] hover:border-[#881337] transition-all shadow-2xs" title="Instagram">
              <Globe className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-stone-200 flex items-center justify-center hover:text-[#881337] hover:border-[#881337] transition-all shadow-2xs" title="Facebook">
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-xs font-bold text-[#18181B] uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">
            Luxury Collections
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-600">
            <li><Link href="/shop?category=velvet-luxury" className="hover:text-[#881337] transition-colors">Velvet Luxury Edition</Link></li>
            <li><Link href="/shop?category=chiffon-formals" className="hover:text-[#881337] transition-colors">Handmade Chiffon Formals</Link></li>
            <li><Link href="/shop?category=lawn-pret" className="hover:text-[#881337] transition-colors">Swiss Lawn Pret 3-Piece</Link></li>
            <li><Link href="/shop?category=handmade-party-wear" className="hover:text-[#881337] transition-colors">Party Wear Angrakhas</Link></li>
            <li><Link href="/shop" className="hover:text-[#881337] transition-colors">All Stitched Dresses</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-xs font-bold text-[#18181B] uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-600">
            <li><Link href="/shop" className="hover:text-[#881337] transition-colors">Track Your Order</Link></li>
            <li><Link href="/shop" className="hover:text-[#881337] transition-colors">Custom Stitching Guide</Link></li>
            <li><Link href="/shop" className="hover:text-[#881337] transition-colors">Shipping &amp; Delivery Policy</Link></li>
            <li><Link href="/shop" className="hover:text-[#881337] transition-colors">Returns &amp; Exchange Policy</Link></li>
            <li><Link href="/admin" className="hover:text-[#881337] transition-colors font-bold text-[#881337]">Store Admin Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[#18181B] uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">
            Contact Support
          </h4>
          <div className="text-xs space-y-2.5 text-stone-600">
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#881337]" />
              <span>WhatsApp / Order: 0321-0004203</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#881337]" />
              <span>care@reetwear.pk</span>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#881337] flex-shrink-0 mt-0.5" />
              <span>Lahore &amp; Karachi, Pakistan &bull; Express Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 gap-4">
        <div>&copy; {new Date().getFullYear()} ZEHRA STUDIO. All rights reserved. Powered by Next.js &amp; Supabase.</div>
        <div className="flex gap-2 font-semibold text-[11px] text-stone-700">
          <span className="bg-[#FAF7F2] px-2.5 py-1 rounded border border-stone-200">CASH ON DELIVERY</span>
          <span className="bg-[#FAF7F2] px-2.5 py-1 rounded border border-stone-200">JAZZCASH</span>
          <span className="bg-[#FAF7F2] px-2.5 py-1 rounded border border-stone-200">EASYPAISA</span>
          <span className="bg-[#FAF7F2] px-2.5 py-1 rounded border border-stone-200">BANK TRANSFER</span>
        </div>
      </div>
    </footer>
  );
};
