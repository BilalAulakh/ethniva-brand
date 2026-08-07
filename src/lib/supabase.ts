import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  compare_at_price?: number;
  category: string;
  fabric: string;
  description: string;
  images: string[];
  sizes: string[];
  in_stock: boolean;
  is_featured?: boolean;
  is_new?: boolean;
  rating: number;
  reviews_count: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  item_count: number;
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  selected_size: string;
  image: string;
  custom_measurements?: string;
}

export interface Order {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  city: string;
  address: string;
  payment_method: 'cod' | 'bank_transfer';
  total_amount: number;
  items: OrderItem[];
  status?: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at?: string;
}

// Fallback Luxury Pakistani Fashion Products (Reet Wear Catalog)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Gul-e-Rana Handmade Embroidered Chiffon Pret',
    slug: 'gul-e-rana-embroidered-chiffon-pret',
    price: 8999,
    compare_at_price: 11500,
    category: 'Chiffon Formals',
    fabric: 'Pure Chiffon & Organza Dupatta',
    description: 'Exquisite maroon hand-crafted heavy embroidered long shirt paired with thread-work zari organza dupatta and dyed viscose trousers.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'Custom Stitching'],
    in_stock: true,
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 48
  },
  {
    id: '2',
    title: 'Noor-e-Zahra Velvet Heavy Festive Suit',
    slug: 'noor-e-zahra-velvet-festive-suit',
    price: 14999,
    compare_at_price: 18000,
    category: 'Velvet Luxury',
    fabric: 'Micro Velvet 9000 & Zari Tilla',
    description: 'Royal emerald green luxury velvet shirt with tilla work detailing, crushed silk dupatta, and embroidered trouser borders.',
    images: [
      'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=800',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    in_stock: true,
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 62
  },
  {
    id: '3',
    title: 'Mehrunisa Printed Luxury Lawn 3-Piece',
    slug: 'mehrunisa-printed-luxury-lawn-3pc',
    price: 5499,
    compare_at_price: 6999,
    category: 'Lawn Pret',
    fabric: 'Premium Swiss Lawn & Silk Dupatta',
    description: 'Vibrant sapphire blue digital printed swiss lawn shirt with silk tissue dupatta and dyed cambric trouser.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    in_stock: true,
    is_featured: true,
    is_new: false,
    rating: 4.8,
    reviews_count: 34
  },
  {
    id: '4',
    title: 'Shahbano Dori Work Organza Angrakha',
    slug: 'shahbano-dori-work-organza-angrakha',
    price: 12500,
    compare_at_price: 15000,
    category: 'Chiffon Formals',
    fabric: 'Sheer Organza & Raw Silk',
    description: 'Blush pink hand-embellished angrakha featuring pearl beads, dori work border, raw silk flared trousers, and mukesh net dupatta.',
    images: [
      'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=800',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800'
    ],
    sizes: ['S', 'M', 'L', 'Custom Stitching'],
    in_stock: true,
    is_featured: false,
    is_new: true,
    rating: 5.0,
    reviews_count: 29
  },
  {
    id: '5',
    title: 'Daria Raw Silk Embroidered Kurti Pret',
    slug: 'daria-raw-silk-embroidered-kurti',
    price: 6499,
    compare_at_price: 7999,
    category: 'Pret Collection',
    fabric: 'Korean Raw Silk',
    description: 'Contemporary jet black raw silk embroidered kurti with gold sequin neckline and tailored culottes.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    in_stock: true,
    is_featured: true,
    is_new: false,
    rating: 4.7,
    reviews_count: 19
  },
  {
    id: '6',
    title: 'Zainab Heavily Embroidered Bridal Peshwas',
    slug: 'zainab-embroidered-bridal-peshwas',
    price: 18999,
    compare_at_price: 24000,
    category: 'Velvet Luxury',
    fabric: 'Raw Silk & Tissue Zari',
    description: 'Deep crimson heavy bridal peshwas with handworked zardozi neckline, dabka borders, and full velvet shawl.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
      'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=800'
    ],
    sizes: ['S', 'M', 'L', 'Custom Stitching'],
    in_stock: true,
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 85
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Velvet Luxury', slug: 'velvet-luxury', image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=600', item_count: 14 },
  { id: '2', name: 'Chiffon Formals', slug: 'chiffon-formals', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600', item_count: 22 },
  { id: '3', name: 'Lawn Pret', slug: 'lawn-pret', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600', item_count: 18 },
  { id: '4', name: 'Handmade Party Wear', slug: 'handmade-party-wear', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600', item_count: 12 }
];

// Helper Functions
export async function getProducts(categorySlug?: string): Promise<Product[]> {
  try {
    let query = supabase.from('products').select('*');
    if (categorySlug) {
      query = query.eq('category', categorySlug);
    }
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return categorySlug 
        ? MOCK_PRODUCTS.filter(p => p.category.toLowerCase().includes(categorySlug.toLowerCase()))
        : MOCK_PRODUCTS;
    }
    return data as Product[];
  } catch {
    return MOCK_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
    if (error || !data) {
      return MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
    }
    return data as Product;
  } catch {
    return MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error || !data || data.length === 0) {
      return MOCK_CATEGORIES;
    }
    return data as Category[];
  } catch {
    return MOCK_CATEGORIES;
  }
}

// In-memory fallback order storage for immediate admin preview
let inMemoryOrders: Order[] = [];

export async function createOrder(order: Order): Promise<{ success: boolean; orderId: string }> {
  const generatedId = 'RW-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder: Order = {
    ...order,
    id: generatedId,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  try {
    const { error } = await supabase.from('orders').insert([newOrder]);
    if (error) {
      console.warn('Supabase DB notice (using fallback order memory):', error.message);
    }
  } catch (err) {
    console.warn('Supabase client fallback:', err);
  }

  inMemoryOrders.unshift(newOrder);
  return { success: true, orderId: generatedId };
}

export async function getOrders(): Promise<Order[]> {
  try {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error || !data || data.length === 0) {
      return inMemoryOrders;
    }
    return data as Order[];
  } catch {
    return inMemoryOrders;
  }
}
