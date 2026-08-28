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
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartTotal);
  const deliveryProgress = Math.min(100, (cartTotal / FREE_DELIVERY_THRESHOLD) * 100);

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
          <div className="bg-[#FAF7F2] p-4 border-b border-stone-200">
            <div className="flex items-center gap-2 text-xs font-medium mb-2">
              <Truck className="w-4 h-4 text-[#881337]" />
              {cartTotal >= FREE_DELIVERY_THRESHOLD ? (
                <span className="text-emerald-700 font-bold">🎉 You unlocked FREE Delivery across Pakistan!</span>
              ) : (
                <span className="text-stone-700">
                  Add <strong className="text-[#881337]">RS. {remainingForFreeDelivery.toLocaleString()}</strong> more for FREE Delivery!
                </span>
              )}
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#881337] to-[#C7A76C] h-full transition-all duration-500 rounded-full"
                style={{ width: `${deliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingCart className="w-8 h-8 text-[#881337]/60" />
                </div>
                <h3 className="text-base font-bold text-stone-800">Your bag is currently empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore ZEHRA STUDIO handcrafted pret &amp; velvet formals to add items.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="brand-btn-primary text-white text-xs uppercase tracking-wider px-6 py-3 rounded-full font-bold inline-block shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="flex gap-4 p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200/80 shadow-xs">
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image
                      src={item.product.images[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400'}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-[#18181B] line-clamp-1">{item.product.title}</h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-stone-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#881337] font-semibold mt-0.5">
                        Size: <span>{item.selectedSize}</span> | {item.product.fabric}
                      </div>
                      {item.customMeasurements && (
                        <div className="text-[10px] text-stone-500 italic mt-0.5 line-clamp-1">
                          Custom: {item.customMeasurements}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                          className="p-1 text-stone-600 hover:text-stone-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                          className="p-1 text-stone-600 hover:text-stone-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-extrabold text-[#881337]">
                        RS. {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-[#FAF7F2] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Subtotal</span>
                <span className="text-xl font-extrabold text-[#18181B]">
                  RS. {cartTotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 text-center">
                Taxes &amp; Delivery calculated at checkout. Cash on Delivery available.
              </p>

              <button
                onClick={async () => {
                  if (isProceeding) return;
                  setIsProceeding(true);
                  await new Promise(r => setTimeout(r, 350));
                  setIsCartOpen(false);
                  setIsProceeding(false);
                  router.push('/checkout');
                }}
                disabled={isProceeding}
                className="w-full brand-btn-primary text-white py-3.5 rounded-2xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg disabled:opacity-75"
              >
                {isProceeding ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#fef08a]" />
                    <span>Proceeding to Checkout...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 text-[#fef08a]" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
