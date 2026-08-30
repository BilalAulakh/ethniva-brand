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
                href="https://wa.me/923201803537?text=Hi%20ETHNIVA" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-[#25D366] hover:border-[#25D366] transition-all"
                title="WhatsApp: 0320-1803537"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
              <a 
                href="https://www.facebook.com/ethnivaonline" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-[#1877F2] hover:border-[#1877F2] transition-all"
                title="Facebook: ethnivaonline"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#171717] border border-[#262626] flex items-center justify-center text-neutral-400 hover:text-[#E4405F] hover:border-[#E4405F] transition-all"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
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
              <li><a href="https://wa.me/923201803537" target="_blank" rel="noreferrer" className="hover:text-[#25D366] text-[#25D366] font-medium transition-colors">💬 WhatsApp: 0320-1803537</a></li>
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">Shipping &amp; Delivery</Link></li>
              <li><Link href="/contact" className="hover:text-[#B08A4A] transition-colors">Returns &amp; Refunds</Link></li>
              <li><Link href="/size-guide" className="hover:text-[#B08A4A] transition-colors">Size Guide</Link></li>
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

