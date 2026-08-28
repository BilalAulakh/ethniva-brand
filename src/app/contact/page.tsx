'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Clock, Send, MessageCircle, 
  ShieldCheck, Truck, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Order & Custom Stitching Inquiry',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="py-8 sm:py-12 bg-[#FAF7F2] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="text-xs text-stone-500 flex items-center gap-2 font-medium">
          <Link href="/" className="hover:text-[#C5A059]">Home</Link>
          <span>/</span>
          <span className="text-[#C5A059] font-bold">Contact &amp; Atelier Support</span>
        </div>

        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A059]/60 bg-white shadow-2xs text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>ETHNIVA ATELIER</span>
          </div>
          <h1 className="font-brand-serif text-3xl sm:text-4xl font-bold text-[#111111] tracking-tight">
            Contact &amp; Customer Care
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
            Have questions regarding custom measurements, fabric details, order tracking, or bridal couture? Our styling atelier team is available to assist you.
          </p>
        </div>

        {/* 3 Main Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Client Concierge & Support */}
          <div className="bg-white p-6 sm:p-8 border border-[#D8D2C7] space-y-4 text-center hover:border-[#B08A4A] transition-all">
            <div className="w-14 h-14 bg-[#EEEAE2] border border-[#B08A4A]/50 text-[#B08A4A] flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-sans font-medium uppercase text-[#B08A4A] tracking-widest">CLIENT CONCIERGE</div>
              <h3 className="text-base font-serif font-normal text-[#0A0A0A] mt-1">ethnivabrand@gmail.com</h3>
            </div>
            <p className="text-xs text-neutral-500 font-light">
              Bespoke orders, sizing guidance, and international inquiries.
            </p>
            <a
              href="mailto:ethnivabrand@gmail.com"
              className="inline-flex items-center gap-2 btn-primary-luxury py-2.5 px-5 text-[10px] tracking-[2px]"
            >
              <span>SEND EMAIL</span>
            </a>
          </div>

          {/* Card 2: Official Email */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-2xs space-y-4 text-center hover:border-[#C5A059] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#C5A059]/50 text-[#C5A059] flex items-center justify-center mx-auto shadow-2xs">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-[#C5A059] tracking-widest">OFFICIAL EMAIL</div>
              <a href="mailto:ethnivabrand@gmail.com" className="text-xs font-bold text-[#111111] hover:text-[#C5A059] transition-colors mt-1 block">
                ethnivabrand@gmail.com
              </a>
            </div>
            <p className="text-xs text-stone-500 font-normal">
              Formal inquiries, bespoke quotes, and verified order queries.
            </p>
            <div className="text-[11px] text-stone-500 space-y-1">
              <div className="flex items-center justify-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Mon - Sat: 10:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Card 3: Atelier Location */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-2xs space-y-4 text-center hover:border-[#C5A059] transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#C5A059]/50 text-[#C5A059] flex items-center justify-center mx-auto shadow-2xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-[#C5A059] tracking-widest">ATELIER &amp; DISPATCH</div>
              <h3 className="text-base font-bold text-[#111111] mt-1">Faisalabad, Pakistan</h3>
            </div>
            <p className="text-xs text-stone-500 font-normal">
              Bespoke craftsmanship and express nationwide delivery across Pakistan.
            </p>
            <div className="text-[11px] font-bold text-[#C5A059] flex items-center justify-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Free Delivery on all orders</span>
            </div>
          </div>

        </div>

        {/* Contact Form & Assurance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-2xs space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">SEND A MESSAGE</span>
              <h2 className="font-brand-serif text-xl sm:text-2xl font-bold text-[#111111]">Online Inquiry Form</h2>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#C5A059]/60 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-[#C5A059] mx-auto" />
                <h3 className="text-base font-bold text-[#111111]">Thank you, {formData.name || 'valued customer'}!</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto font-normal">
                  Your message has been received. Our team will contact you shortly on <strong>{formData.phone || 'your phone number'}</strong>.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-[#C5A059] font-bold underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Order & Custom Stitching Inquiry">Order &amp; Custom Stitching Inquiry</option>
                    <option value="Delivery Status & Tracking">Delivery Status &amp; Tracking</option>
                    <option value="Fabric & Measurements Advice">Fabric &amp; Measurements Advice</option>
                    <option value="Bridal Couture Consultation">Bridal Couture Consultation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700">Message / Request *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your dress name, custom measurement notes, or questions..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl p-4 text-xs text-stone-900 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-luxury-gold py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Side Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-[#FAF7F2] via-[#F6F1E7] to-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E8E2D5] shadow-2xs space-y-4">
              <div className="text-[10px] font-bold uppercase text-[#C5A059] tracking-widest">ETHNIVA PROMISE</div>
              <h3 className="font-brand-serif text-xl font-bold text-[#111111]">Bespoke Craftsmanship</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                Every ETHNIVA article is hand-tailored with premium threads, pure fabrics, and strict quality control before being dispatched from our Faisalabad atelier.
              </p>
              <div className="pt-2 border-t border-[#E8E2D5] space-y-2 text-xs text-stone-700 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>100% Handcrafted Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#B08A4A]" />
                  <span>Nationwide Express Courier &bull; Cash On Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#B08A4A]" />
                  <span>Client Care: ethnivabrand@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
