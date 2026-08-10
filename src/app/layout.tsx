import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { QuickViewModal } from '@/components/QuickViewModal';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';

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
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-[#FAF9F6] text-[#18181B] selection:bg-[#C7A76C] selection:text-white">
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
