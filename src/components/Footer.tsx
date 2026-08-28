'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Send, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Hide storefront Footer on /admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 sm:pt-20 pb-10 border-t border-[#171717]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#262626]">
          
          {/* COLUMN 1: Brand Info & Socials */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#B08A4A]/50 bg-[#171717] flex items-center justify-center">
                <Image 
                  src="/logo.jpg" 
                  alt="ETHNIVA" 
                  fill 
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="font-serif text-xl tracking-[0.25em] text-white group-hover:text-[#B08A4A] transition-colors leading-none">
                ETHNIVA
              </span>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              ETHNIVA is more than fashion.<br />
              It&apos;s who you choose to be.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-[#B08A4A] hover:border-[#B08A4A] transition-all"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-[#B08A4A] hover:border-[#B08A4A] transition-all"
                title="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-[#B08A4A] hover:border-[#B08A4A] transition-all text-xs font-serif font-bold"
                title="Pinterest"
              >
                P
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-[#B08A4A] hover:border-[#B08A4A] transition-all text-[11px] font-bold"
                title="TikTok"
              >
                ♪
              </a>
            </div>
          </div>

          {/* COLUMN 2: SHOP */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-medium tracking-[2px] uppercase text-white font-sans">
              SHOP
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li><Link href="/shop?category=women" className="hover:text-[#B08A4A] transition-colors">Women</Link></li>
              <li><Link href="/shop?category=men" className="hover:text-[#B08A4A] transition-colors">Men</Link></li>
              <li><Link href="/shop?sort=newest" className="hover:text-[#B08A4A] transition-colors">New In</Link></li>
              <li><Link href="/shop" className="hover:text-[#B08A4A] transition-colors">Collections</Link></li>
              <li><Link href="/shop?category=sale" className="hover:text-[#B08A4A] transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: CUSTOMER CARE */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-medium tracking-[2px] uppercase text-white font-sans">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">Shipping &amp; Delivery</Link></li>
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">Returns &amp; Refunds</Link></li>
              <li><Link href="/shop" className="hover:text-[#B08A4A] transition-colors">Size Guide</Link></li>
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: POLICIES */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-medium tracking-[2px] uppercase text-white font-sans">
              POLICIES
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-light">
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">Return Policy</Link></li>
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* COLUMN 5: NEWSLETTER */}
          <div className="space-y-3 lg:col-span-1">
            <h4 className="text-[11px] font-medium tracking-[2px] uppercase text-white font-sans">
              NEWSLETTER
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#171717] border border-[#B08A4A]/40 text-[#C9A86A] text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-[#B08A4A]" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-stretch mt-2">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full bg-[#171717] border border-[#262626] text-white text-xs px-3.5 py-2.5 focus:outline-none focus:border-[#B08A4A] placeholder:text-neutral-500 rounded-none"
                />
                <button 
                  type="submit"
                  className="bg-[#B08A4A] hover:bg-[#C9A86A] text-[#0A0A0A] px-4 flex items-center justify-center transition-colors rounded-none flex-shrink-0"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-neutral-400 font-light">
          <div>
            &copy; 2026 ETHNIVA. All Rights Reserved.
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2 text-[9.5px] font-mono">
            <span className="bg-[#171717] border border-[#262626] px-2.5 py-1 text-white font-bold tracking-wider">VISA</span>
            <span className="bg-[#171717] border border-[#262626] px-2.5 py-1 text-white font-bold tracking-wider">MASTERCARD</span>
            <span className="bg-[#171717] border border-[#262626] px-2.5 py-1 text-white font-bold tracking-wider">EASYPAISA</span>
            <span className="bg-[#171717] border border-[#262626] px-2.5 py-1 text-white font-bold tracking-wider">JAZZCASH</span>
            <span className="bg-[#171717] border border-[#262626] px-2.5 py-1 text-white font-bold tracking-wider">COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

