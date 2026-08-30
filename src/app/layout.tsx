import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
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
      <body className="min-h-screen flex flex-col antialiased bg-[#F7F5F0] text-[#171717] selection:bg-[#B08A4A] selection:text-white text-[13px] sm:text-[14px] overflow-x-hidden">
        <CartProvider>
          <Navbar />
          <main className="flex-1 w-full overflow-x-hidden">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <FloatingWhatsApp />
        </CartProvider>
      </body>
    </html>
  );
}
