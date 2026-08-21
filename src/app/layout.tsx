import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZEHRA STUDIO | Pakistani Luxury Women’s Clothing Online',
  description: 'Shop premium Pakistani women’s clothing at ZEHRA STUDIO. Explore handmade stitched dresses, velvet formals, chiffon ensembles, and elegant pret collections with free delivery across Pakistan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased bg-[#FAF9F6] text-[#18181B] selection:bg-[#C7A76C] selection:text-white text-[13px] sm:text-[14px]">
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <WhatsAppWidget />
        </CartProvider>
      </body>
    </html>
  );
}
