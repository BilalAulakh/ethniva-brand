'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X, Star } from 'lucide-react';
import { getRecentPurchases, getProducts, RecentPurchase, Product } from '@/lib/supabase';

const FIRST_DELAY_MS = 8000;   // wait before the first popup
const SHOW_FOR_MS = 7000;      // how long each popup stays
const GAP_MS = 18000;          // pause between popups
const DISMISS_KEY = 'ethniva_purchase_popup_dismissed';

function timeAgo(iso: string): string {
  const mins = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${mins} ${mins === 1 ? 'Minute' : 'Minutes'} Ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? 'Hour' : 'Hours'} Ago`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? 'Day' : 'Days'} Ago`;
}

// Shows real recent orders only (product + city + time). Shows nothing if there are none.
export const RecentPurchasePopup: React.FC = () => {
  const pathname = usePathname();
  const [purchases, setPurchases] = useState<RecentPurchase[]>([]);
  const [productById, setProductById] = useState<Record<string, Product>>({});
  const productByIdRef = useRef<Record<string, Product>>({});
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      return false; // storage unavailable — popup still works, just won't remember dismiss
    }
  });

  const hiddenRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/checkout');

  useEffect(() => {
    let alive = true;
    (async () => {
      const list = await getRecentPurchases();
      if (!alive || list.length === 0) return;
      // Only update when something changed, so the popup loop isn't restarted needlessly
      setPurchases((prev) =>
        prev.length === list.length && prev[0]?.created_at === list[0]?.created_at ? prev : list
      );
      if (Object.keys(productByIdRef.current).length > 0) return;
      try {
        const products = await getProducts();
        if (!alive) return;
        const map: Record<string, Product> = {};
        for (const p of products) map[p.id] = p;
        productByIdRef.current = map;
        setProductById(map);
      } catch {
        // links fall back to the shop page
      }
    })();
    return () => {
      alive = false;
    };
    // Re-check on every page change so new orders show up without a full reload
  }, [pathname]);

  // Show → hide → next, on a loop
  useEffect(() => {
    if (purchases.length === 0 || dismissed || hiddenRoute) return;
    let showTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    const cycle = (delay: number) => {
      showTimer = setTimeout(() => {
        setVisible(true);
        hideTimer = setTimeout(() => {
          setVisible(false);
          setIndex((i) => (i + 1) % purchases.length);
          cycle(GAP_MS);
        }, SHOW_FOR_MS);
      }, delay);
    };
    cycle(FIRST_DELAY_MS);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [purchases.length, dismissed, hiddenRoute]);

  if (hiddenRoute || dismissed || purchases.length === 0) return null;

  const p = purchases[index];
  const product = productById[p.product_id];
  const slug = product?.slug;
  const rating = Math.round(product?.rating || 0);
  const reviewsCount = product?.reviews_count || 0;
  const href = slug ? `/product/${slug}` : `/shop?search=${encodeURIComponent(p.title)}`;

  const close = () => {
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-40 w-[calc(100vw-2rem)] max-w-[340px] transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex gap-3.5 bg-white border border-[#EAEAEA] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] p-3 pr-8">
        <button
          onClick={close}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-[#999999] hover:text-[#222222]"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <Link href={href} className="relative w-[72px] h-[92px] flex-shrink-0 overflow-hidden bg-[#F5F0ED]">
          {p.image && (
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="72px"
              unoptimized={p.image.startsWith('data:')}
              className="object-cover object-top"
            />
          )}
        </Link>

        <div className="min-w-0 flex flex-col justify-center gap-1">
          <span className="text-[10px] tracking-[0.12em] uppercase text-[#666666]">Someone Purchased</span>
          <Link href={href} className="text-[14px] text-[#222222] hover:text-[#CE967E] leading-snug line-clamp-2">
            {p.title}
          </Link>
          {/* Product's own rating; empty stars + "0 Reviews" when it has none */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < rating ? 'fill-[#F2B600] text-[#F2B600]' : 'fill-[#E0E0E0] text-[#E0E0E0]'}`}
                />
              ))}
            </div>
            <span className="text-[11.5px] text-[#444444]">
              {reviewsCount} {reviewsCount === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
          {p.city && <span className="text-[11.5px] text-[#666666]">({p.city})</span>}
          <span className="text-[11px] text-[#999999]">{timeAgo(p.created_at)}</span>
        </div>
      </div>
    </div>
  );
};
