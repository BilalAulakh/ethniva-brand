import React from 'react';
import Link from 'next/link';
import { Ruler, ChevronRight } from 'lucide-react';
import { SizeGuideContent } from './SizeGuideContent';

export const metadata = {
  title: 'Size Guide & Chart | Ethniva Atelier',
  description: 'Find your perfect fit with Ethniva Atelier comprehensive size guide and ready garment measurement charts for XS, S, M, L, and XL.',
};

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0A0A0A]">
      {/* Hero Header */}
      <div className="bg-[#0A0A0A] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#C5A059]/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-full text-[11px] font-sans font-semibold tracking-[2px] text-[#C5A059] uppercase">
            <Ruler className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>ETHNIVA ATELIER SIZING</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide">
            SIZE GUIDE &amp; MEASUREMENTS
          </h1>

          <p className="text-stone-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Find your flawless silhouette. All measurements represent finished garment sizes in inches.
          </p>

          <nav className="flex items-center justify-center gap-2 text-xs text-stone-500 font-sans pt-2">
            <Link href="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#C5A059]">Size Guide</span>
          </nav>
        </div>
      </div>

      {/* Main Interactive Guide Component */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <SizeGuideContent />
      </div>
    </div>
  );
}
