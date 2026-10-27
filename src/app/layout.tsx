import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { RecentPurchasePopup } from '@/components/RecentPurchasePopup';

// Fonts are self-hosted (Fontsource, OFL-1.1) so builds don't depend on fetching Google Fonts
const inter = localFont({
  src: [
    { path: './fonts/inter-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/inter-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = localFont({
  src: [
    { path: './fonts/cormorant-garamond-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/cormorant-garamond-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ETHNIVA | Luxury Fashion & Modern Clothing Brand',
  description: 'ETHNIVA is a luxury and modern fashion clothing brand focused on elegance, confidence, timeless style, and premium quality.',
  icons: {
    icon: [
      { url: '/logo.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/logo.jpg', sizes: 'any' },
    ],
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-[#FFFFFF] text-[#303030] selection:bg-[#CE967E] selection:text-white text-[13px] sm:text-[14px] overflow-x-hidden">
        <CartProvider>
          <Navbar />
          <main className="flex-1 w-full overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <FloatingWhatsApp />
          <RecentPurchasePopup />
        </CartProvider>
      </body>
    </html>
  );
}
