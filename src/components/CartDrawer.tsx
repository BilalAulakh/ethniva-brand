'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { X, Trash2, Plus, Minus, Truck, ArrowRight, ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isProceeding, setIsProceeding] = useState(false);

  const FREE_DELIVERY_THRESHOLD = 5000;
  const deliveryCharges = cartTotal >= FREE_DELIVERY_THRESHOLD || cartTotal === 0 ? 0 : 250;
  const grandTotal = cartTotal + deliveryCharges;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal);
  const deliveryProgress = Math.min(100, (cartTotal / FREE_DELIVERY_THRESHOLD) * 100);

  const handleProceedToCheckout = async () => {
    if (isProceeding) return;
    setIsProceeding(true);
    await new Promise(r => setTimeout(r, 350));
    setIsCartOpen(false);
    setIsProceeding(false);
    router.push('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 text-stone-900 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#881337]" />
              <h2 className="text-base font-bold text-[#18181B] tracking-wide">Shopping Bag ({cart.length})</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#EEEAE2] p-4 border-b border-[#D8D2C7]">
            <div className="flex items-center gap-2 text-xs font-medium mb-2">
              <Truck className="w-4 h-4 text-[#B08A4A]" />
              {cartTotal >= FREE_DELIVERY_THRESHOLD ? (
                <span className="text-[#0A0A0A] font-medium">🎉 You unlocked FREE Delivery on orders over PKR 5,000!</span>
              ) : (
                <span className="text-stone-700 text-[11.5px]">
                  Add <strong className="text-[#B08A4A]">PKR {remainingForFreeDelivery.toLocaleString()}</strong> more for FREE Delivery!
                </span>
              )}
            </div>
            <div className="w-full bg-[#D8D2C7] h-1.5 overflow-hidden">
              <div 
                className="bg-[#B08A4A] h-full transition-all duration-500"
                style={{ width: `${deliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#EEEAE2] flex items-center justify-center mx-auto text-stone-400 border border-[#D8D2C7]">
                  <ShoppingCart className="w-6 h-6 text-[#B08A4A]" />
                </div>
                <h3 className="text-sm font-medium tracking-wider uppercase text-[#0A0A0A]">Your bag is currently empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto font-light">
                  Explore ETHNIVA modern luxury fashion collections.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary-luxury"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="flex gap-4 p-3 bg-white border border-[#D8D2C7] shadow-none">
                  <div className="relative w-20 h-24 overflow-hidden bg-[#EEEAE2] flex-shrink-0">
                    <Image
                      src={item.product.images[0] || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400'}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between font-sans">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-medium uppercase text-[#0A0A0A] line-clamp-1 tracking-wide">{item.product.title}</h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-neutral-400 hover:text-[#0A0A0A] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#B08A4A] font-medium mt-0.5">
                        Size: <span>{item.selectedSize}</span> {item.product.fabric ? `| ${item.product.fabric}` : ''}
                      </div>
                      {item.customMeasurements && (
                        <div className="text-[10px] text-neutral-500 italic mt-0.5 line-clamp-1">
                          Custom: {item.customMeasurements}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-[#D8D2C7] bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                          className="p-1 text-neutral-600 hover:text-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-medium text-neutral-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                          className="p-1 text-neutral-600 hover:text-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-medium text-[#0A0A0A]">
                        PKR {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#D8D2C7] space-y-3 font-sans">
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#0A0A0A]">PKR {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Pakistan)</span>
                  <span className="font-medium text-[#0A0A0A]">
                    {deliveryCharges === 0 ? <strong className="text-[#B08A4A]">FREE</strong> : `PKR ${deliveryCharges}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#0A0A0A] pt-2 border-t border-[#D8D2C7]">
                  <span>Estimated Total</span>
                  <span className="font-medium">PKR {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleProceedToCheckout}
                  disabled={isProceeding}
                  className="w-full btn-primary-luxury py-4 text-xs tracking-[2.5px] uppercase font-medium flex items-center justify-center gap-2"
                >
                  {isProceeding ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#B08A4A]" />
                      <span>PROCEEDING...</span>
                    </>
                  ) : (
                    <>
                      <span>CHECKOUT &bull; PKR {grandTotal.toLocaleString()}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
