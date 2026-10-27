'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Ruler, Sparkles, Check, Info, Scissors, HelpCircle, ArrowRight } from 'lucide-react';

export const SizeGuideContent: React.FC = () => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeTab, setActiveTab] = useState<'all' | 'shirt' | 'bottom'>('all');

  // Convert values if unit is cm (1 inch = 2.54 cm)
  const formatVal = (inVal: number) => {
    if (unit === 'in') return inVal.toString();
    return (inVal * 2.54).toFixed(1);
  };

  const shirtMeasurements = [
    { name: 'SLEEVES', xs: 21.5, s: 22, m: 22.5, l: 23, xl: 23.5, desc: 'From shoulder seam down to cuff edge' },
    { name: 'SHOULDER', xs: 13.5, s: 14, m: 15, l: 16, xl: 17, desc: 'Across back from shoulder tip to shoulder tip' },
    { name: 'CHEST', xs: 17, s: 18, m: 20, l: 22, xl: 24, desc: 'Across bust/chest from armhole to armhole (flat)' },
    { name: 'DAMAN', xs: 20, s: 21, m: 23, l: 25, xl: 27, desc: 'Bottom shirt hem width from corner to corner' },
    { name: 'BACK', xs: 14, s: 16, m: 18, l: 20, xl: 22, desc: 'Width across back blade area' },
  ];

  const bottomMeasurements = [
    { name: 'LENGHT / LENGTH', xs: 36.5, s: 37, m: 38, l: 39, xl: 40, desc: 'Top waist waistband down to bottom hem' },
    { name: 'BELT / WAIST', xs: 5, s: 5, m: 5.25, l: 5.5, xl: 6, desc: 'Waistband width / belt height' },
    { name: 'THIGH', xs: 10.5, s: 11.5, m: 12.5, l: 13.5, xl: 14.5, desc: 'Front thigh width flat measurement' },
    { name: 'BACK THIGH', xs: 12.5, s: 13.5, m: 14.5, l: 15.5, xl: 17, desc: 'Back thigh width flat measurement' },
  ];

  return (
    <div className="space-y-10">
      {/* Overview Card */}
      <div className="bg-white border border-[#E6E6E6] p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
        
        {/* Controls Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E6E6E6] pb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#222222] text-white shadow-xs'
                  : 'bg-[#FAFAFA] text-stone-600 hover:bg-[#F5F0ED]'
              }`}
            >
              All Specifications
            </button>
            <button
              onClick={() => setActiveTab('shirt')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === 'shirt'
                  ? 'bg-[#222222] text-white shadow-xs'
                  : 'bg-[#FAFAFA] text-stone-600 hover:bg-[#F5F0ED]'
              }`}
            >
              Shirt / Top
            </button>
            <button
              onClick={() => setActiveTab('bottom')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                activeTab === 'bottom'
                  ? 'bg-[#222222] text-white shadow-xs'
                  : 'bg-[#FAFAFA] text-stone-600 hover:bg-[#F5F0ED]'
              }`}
            >
              Bottom / Trouser
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#FAFAFA] border border-[#E6E6E6] p-1.5 rounded-xl self-end sm:self-auto">
            <span className="text-[11px] font-semibold text-stone-500 uppercase px-2">Unit:</span>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer ${
                unit === 'in'
                  ? 'bg-[#CE967E] text-white shadow-xs'
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer ${
                unit === 'cm'
                  ? 'bg-[#CE967E] text-white shadow-xs'
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Note on Picture Length */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FAFAFA] border border-[#E6E6E6] rounded-lg text-xs text-stone-600 font-sans">
          <Info className="w-4 h-4 text-[#CE967E] shrink-0" />
          <span>Note: <strong>Length of the dress is as per the picture</strong> in catalog presentations.</span>
        </div>

        {/* 1. SHIRT / TOP SPECIFICATIONS */}
        {(activeTab === 'all' || activeTab === 'shirt') && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#222222] font-normal">
                  Shirt / Top Specifications
                </h2>
                <p className="text-xs text-stone-500 font-sans">Ready garment measurements across all standard sizes</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-[#FAFAFA] border border-stone-200 rounded-md text-stone-600">
                {unit.toUpperCase()}
              </span>
            </div>

            <div className="overflow-x-auto border border-[#E6E6E6] rounded-xl">
              <table className="w-full text-left text-sm font-sans">
                <thead className="bg-[#FAFAFA] text-[#222222] uppercase tracking-wider font-bold text-xs border-b border-[#E6E6E6]">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">MEASUREMENT</th>
                    <th className="py-3.5 px-4 text-center">XS</th>
                    <th className="py-3.5 px-4 text-center">S</th>
                    <th className="py-3.5 px-4 text-center bg-[#CE967E]/10 text-[#CE967E]">M (Standard)</th>
                    <th className="py-3.5 px-4 text-center">L</th>
                    <th className="py-3.5 px-4 text-center">XL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F0ED] text-stone-700">
                  {shirtMeasurements.map((row, idx) => (
                    <tr key={row.name} className={`hover:bg-[#FAFAFA]/60 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]/30'}`}>
                      <td className="py-3 px-4 sm:px-6 font-semibold text-[#222222]">
                        <div>{row.name}</div>
                        <div className="text-[10px] text-stone-400 font-normal hidden sm:block">{row.desc}</div>
                      </td>
                      <td className="py-3 px-4 text-center font-mono">{formatVal(row.xs)}</td>
                      <td className="py-3 px-4 text-center font-mono">{formatVal(row.s)}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-[#CE967E] bg-[#CE967E]/5">
                        {formatVal(row.m)}
                      </td>
                      <td className="py-3 px-4 text-center font-mono">{formatVal(row.l)}</td>
                      <td className="py-3 px-4 text-center font-mono">{formatVal(row.xl)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. BOTTOM / TROUSER SPECIFICATIONS */}
        {(activeTab === 'all' || activeTab === 'bottom') && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#222222] font-normal">
                  Bottom / Trouser Specifications
                </h2>
                <p className="text-xs text-stone-500 font-sans">Ready garment measurements across all standard sizes</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-[#FAFAFA] border border-stone-200 rounded-md text-stone-600">
                {unit.toUpperCase()}
              </span>
            </div>

            <div className="overflow-x-auto border border-[#E6E6E6] rounded-xl">
              <table className="w-full text-left text-sm font-sans">
                <thead className="bg-[#FAFAFA] text-[#222222] uppercase tracking-wider font-bold text-xs border-b border-[#E6E6E6]">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">MEASUREMENT</th>
                    <th className="py-3.5 px-4 text-center">XS</th>
                    <th className="py-3.5 px-4 text-center">S</th>
                    <th className="py-3.5 px-4 text-center bg-[#CE967E]/10 text-[#CE967E]">M (Standard)</th>
                    <th className="py-3.5 px-4 text-center">L</th>
                    <th className="py-3.5 px-4 text-center">XL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5F0ED] text-stone-700">
                  {bottomMeasurements.map((row, idx) => (
                    <tr key={row.name} className={`hover:bg-[#FAFAFA]/60 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]/30'}`}>
                      <td className="py-3 px-4 sm:px-6 font-semibold text-[#222222]">
                        <div>{row.name}</div>
                        <div className="text-[10px] text-stone-400 font-normal hidden sm:block">{row.desc}</div>
                      </td>
                      <td className="py-3 px-4 text-center font-mono">{formatVal(row.xs)}</td>
                      <td className="py-3 px-4 text-center font-mono">{formatVal(row.s)}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-[#CE967E] bg-[#CE967E]/5">
                        {formatVal(row.m)}
                      </td>
                      <td className="py-3 px-4 text-center font-mono">{formatVal(row.l)}</td>
                      <td className="py-3 px-4 text-center font-mono">{formatVal(row.xl)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Guidelines and Custom Stitching Feature Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: How to Measure */}
        <div className="bg-white border border-[#E6E6E6] p-6 sm:p-7 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#E6E6E6] flex items-center justify-center text-[#CE967E]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-normal text-[#222222]">How to Measure</h3>
              <p className="text-xs text-stone-500 font-sans">Garment measuring tips</p>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-stone-600 font-sans leading-relaxed">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#CE967E] shrink-0 mt-0.5" />
              <span><strong>Chest / Bust:</strong> Measure flat across the garment from armhole to armhole, then double for total circumference.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#CE967E] shrink-0 mt-0.5" />
              <span><strong>Shoulder:</strong> Measure straight across the back from the edge of one shoulder seam to the other.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#CE967E] shrink-0 mt-0.5" />
              <span><strong>Sleeves:</strong> Measure from the top shoulder seam straight down to the cuff edge.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#CE967E] shrink-0 mt-0.5" />
              <span><strong>Trouser Length:</strong> Measure from the top edge of the waistband down along the side seam to the bottom hem.</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Custom Made to Measure */}
        <div className="bg-[#222222] text-white p-6 sm:p-7 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#CE967E]">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-normal text-white">Custom Stitching Available</h3>
                <p className="text-xs text-[#CE967E] font-sans">Made exactly to your measurements</p>
              </div>
            </div>

            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              If your body measurements fall between standard sizes or you prefer custom lengths, choose <strong>&ldquo;Custom Size&rdquo;</strong> on any stitched product and specify your exact dimensions.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#CE967E] hover:bg-white text-black font-sans font-bold text-xs uppercase tracking-[2px] rounded-xl transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
