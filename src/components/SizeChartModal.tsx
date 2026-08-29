'use client';

import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check, Info } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [activeTab, setActiveTab] = useState<'all' | 'shirt' | 'bottom'>('all');

  if (!isOpen) return null;

  // Convert values if unit is cm (1 inch = 2.54 cm)
  const formatVal = (inVal: number) => {
    if (unit === 'in') return inVal.toString();
    return (inVal * 2.54).toFixed(1);
  };

  const shirtMeasurements = [
    { name: 'SLEEVES', xs: 21.5, s: 22, m: 22.5, l: 23, xl: 23.5 },
    { name: 'SHOULDER', xs: 13.5, s: 14, m: 15, l: 16, xl: 17 },
    { name: 'CHEST', xs: 17, s: 18, m: 20, l: 22, xl: 24 },
    { name: 'DAMAN', xs: 20, s: 21, m: 23, l: 25, xl: 27 },
    { name: 'BACK', xs: 14, s: 16, m: 18, l: 20, xl: 22 },
  ];

  const bottomMeasurements = [
    { name: 'LENGTH', xs: 36.5, s: 37, m: 38, l: 39, xl: 40 },
    { name: 'BELT / WAIST', xs: 5, s: 5, m: 5.25, l: 5.5, xl: 6 },
    { name: 'THIGH', xs: 10.5, s: 11.5, m: 12.5, l: 13.5, xl: 14.5 },
    { name: 'BACK THIGH', xs: 12.5, s: 13.5, m: 14.5, l: 15.5, xl: 17 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div 
        className="bg-white border border-[#D8D2C7] shadow-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-8 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#0A0A0A] hover:text-white text-stone-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EEEAE2] border border-[#D8D2C7] rounded-full text-[10px] font-sans font-semibold tracking-[2px] text-[#B08A4A] uppercase">
            <Ruler className="w-3 h-3 text-[#B08A4A]" />
            <span>ETHNIVA ATELIER SIZING GUIDE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal uppercase tracking-wider text-[#0A0A0A]">
            SIZE CHART
          </h2>
          <p className="text-[11px] text-stone-500 font-sans tracking-wide uppercase">
            Length of the dress as per the picture
          </p>
        </div>

        {/* Unit & Tab Switcher Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8D2C7] pb-4">
          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-[#FAF7F2] text-stone-600 hover:bg-[#EEEAE2]'
              }`}
            >
              All Specs
            </button>
            <button
              onClick={() => setActiveTab('shirt')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'shirt'
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-[#FAF7F2] text-stone-600 hover:bg-[#EEEAE2]'
              }`}
            >
              Shirt / Top
            </button>
            <button
              onClick={() => setActiveTab('bottom')}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'bottom'
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-[#FAF7F2] text-stone-600 hover:bg-[#EEEAE2]'
              }`}
            >
              Bottom / Trouser
            </button>
          </div>

          <div className="flex items-center gap-1 bg-[#FAF7F2] border border-[#D8D2C7] p-1 rounded-lg">
            <button
              onClick={() => setUnit('in')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-md transition-all ${
                unit === 'in'
                  ? 'bg-[#B08A4A] text-white shadow-xs'
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-md transition-all ${
                unit === 'cm'
                  ? 'bg-[#B08A4A] text-white shadow-xs'
                  : 'text-stone-600 hover:text-black'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* 1. SHIRT / TOP MEASUREMENTS TABLE */}
        {(activeTab === 'all' || activeTab === 'shirt') && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
              <span>SHIRT / TOP SPECIFICATIONS</span>
              <span className="text-[10px] text-stone-400 font-normal">Unit: {unit.toUpperCase()}</span>
            </div>

            <div className="overflow-x-auto border border-[#D8D2C7] rounded-xl shadow-2xs">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#FAF7F2] text-[#0A0A0A] uppercase tracking-wider font-bold text-[11px] border-b border-[#D8D2C7]">
                  <tr>
                    <th className="py-3 px-3.5 sm:px-4">MEASUREMENT</th>
                    <th className="py-3 px-3 sm:px-4 text-center">XS</th>
                    <th className="py-3 px-3 sm:px-4 text-center">S</th>
                    <th className="py-3 px-3 sm:px-4 text-center bg-[#B08A4A]/10 text-[#B08A4A]">M</th>
                    <th className="py-3 px-3 sm:px-4 text-center">L</th>
                    <th className="py-3 px-3 sm:px-4 text-center">XL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {shirtMeasurements.map((row, idx) => (
                    <tr key={row.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF7F2]/50'}>
                      <td className="py-2.5 px-3.5 sm:px-4 font-semibold text-[#0A0A0A]">{row.name}</td>
                      <td className="py-2.5 px-3 sm:px-4 text-center font-mono">{formatVal(row.xs)}</td>
                      <td className="py-2.5 px-3 sm:px-4 text-center font-mono">{formatVal(row.s)}</td>
                      <td className="py-2.5 px-3 sm:px-4 text-center font-mono font-bold text-[#B08A4A] bg-[#B08A4A]/5">
                        {formatVal(row.m)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-center font-mono">{formatVal(row.l)}</td>
                      <td className="py-2.5 px-3 sm:px-4 text-center font-mono">{formatVal(row.xl)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. BOTTOM / TROUSER MEASUREMENTS TABLE */}
        {(activeTab === 'all' || activeTab === 'bottom') && (
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
              <span>BOTTOM / TROUSER SPECIFICATIONS</span>
              <span className="text-[10px] text-stone-400 font-normal">Unit: {unit.toUpperCase()}</span>
            </div>

            <div className="overflow-x-auto border border-[#D8D2C7] rounded-xl shadow-2xs">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#FAF7F2] text-[#0A0A0A] uppercase tracking-wider font-bold text-[11px] border-b border-[#D8D2C7]">
                  <tr>
                    <th className="py-3 px-3.5 sm:px-4">MEASUREMENT</th>
                    <th className="py-3 px-3 sm:px-4 text-center">XS</th>
                    <th className="py-3 px-3 sm:px-4 text-center">S</th>
                    <th className="py-3 px-3 sm:px-4 text-center bg-[#B08A4A]/10 text-[#B08A4A]">M</th>
                    <th className="py-3 px-3 sm:px-4 text-center">L</th>
                    <th className="py-3 px-3 sm:px-4 text-center">XL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {bottomMeasurements.map((row, idx) => (
                    <tr key={row.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF7F2]/50'}>
                      <td className="py-2.5 px-3.5 sm:px-4 font-semibold text-[#0A0A0A]">{row.name}</td>
                      <td className="py-2.5 px-3 sm:px-4 text-center font-mono">{formatVal(row.xs)}</td>
                      <td className="py-2.5 px-3 sm:px-4 text-center font-mono">{formatVal(row.s)}</td>
                      <td className="py-2.5 px-3 sm:px-4 text-center font-mono font-bold text-[#B08A4A] bg-[#B08A4A]/5">
                        {formatVal(row.m)}
                      </td>
                      <td className="py-2.5 px-3 sm:px-4 text-center font-mono">{formatVal(row.l)}</td>
                      <td className="py-2.5 px-3 sm:px-4 text-center font-mono">{formatVal(row.xl)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Helpful Measuring Advice Note */}
        <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#D8D2C7] flex items-start gap-3 text-xs text-stone-600">
          <Info className="w-4 h-4 text-[#B08A4A] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-[#0A0A0A]">Fitting &amp; Measurement Guide:</p>
            <p className="text-[11px] leading-relaxed">
              All sizes are ready garment measurements. If your body measurements fall between sizes, we recommend selecting one size larger for a comfortable fit or choosing <strong>&ldquo;Custom Size&rdquo;</strong> during checkout.
            </p>
          </div>
        </div>

        {/* Close Button Action */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-[#0A0A0A] hover:bg-[#B08A4A] text-white hover:text-black font-sans font-semibold text-xs uppercase tracking-[2px] transition-all rounded-xl cursor-pointer"
          >
            Got It, Close Size Chart
          </button>
        </div>

      </div>
    </div>
  );
};
