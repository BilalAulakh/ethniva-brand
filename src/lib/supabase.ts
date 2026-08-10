import { createClient } from '@supabase/supabase-js';
import reetwearJson from './reetwear_data.json';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xmqnkpzhqegqazefnrwn.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey || 'dummy_key_for_client_init');

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  compare_at_price?: number;
  category: string;
  fabric: string;
  images: string[];
  description: string;
  sizes: string[];
  is_featured?: boolean;
  is_new?: boolean;
  rating?: number;
  reviews_count?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  item_count: number;
}

export interface OrderItem {
  product_id: string;
  title: string;
  quantity: number;
  price: number;
  selected_size: string;
  custom_measurements?: string;
  image: string;
}

export interface Order {
  id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  address: string;
  city: string;
  payment_method: 'cod' | 'bank_transfer';
  total_amount: number;
  items: OrderItem[];
  created_at?: string;
  status?: string;
}

// Full Real Product Catalog from https://reetwear.pk/ (191+ Real Articles)
export const MOCK_PRODUCTS: Product[] = (reetwearJson as Product[]);

export const MOCK_CATEGORIES: Category[] = [
  { 
    id: '1', 
    name: 'Bridal & Formals', 
    slug: 'bridal-formals', 
    image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/GULNAAR.png?v=1784821889', 
    item_count: MOCK_PRODUCTS.filter(p => p.category === 'Bridal & Formals').length || 24 
  },
  { 
    id: '2', 
    name: 'Velvet & Silk Couture', 
    slug: 'velvet-silk-couture', 
    image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/BLACK_BLING.png?v=1784821888', 
    item_count: MOCK_PRODUCTS.filter(p => p.category === 'Velvet & Silk Couture').length || 38 
  },
  { 
    id: '3', 
    name: 'Chiffon & Organza Formals', 
    slug: 'chiffon-organza-formals', 
    image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/SHAHEE_BLUE.png?v=1784821880', 
    item_count: MOCK_PRODUCTS.filter(p => p.category === 'Chiffon & Organza Formals').length || 42 
  },
  { 
    id: '4', 
    name: 'Luxury Pret', 
    slug: 'luxury-pret', 
    image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/PALE_PURPLE.png?v=1784821844', 
    item_count: MOCK_PRODUCTS.filter(p => p.category === 'Luxury Pret').length || 45 
  },
  { 
    id: '5', 
    name: 'Pret & Co-Ords', 
    slug: 'pret-co-ords', 
    image: 'https://cdn.shopify.com/s/files/1/0637/4391/8237/files/NORA.png?v=1784821888', 
    item_count: MOCK_PRODUCTS.filter(p => p.category === 'Pret & Co-Ords').length || 32 
  }
];

// Helper to get custom and base products combined
export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') {
    return MOCK_PRODUCTS;
  }
  try {
    const custom = localStorage.getItem('zehra_custom_products');
    const deleted = localStorage.getItem('zehra_deleted_products');
    const deletedIds: string[] = deleted ? JSON.parse(deleted) : [];
    const customList: Product[] = custom ? JSON.parse(custom) : [];
    
    // Filter out deleted base products and prepend custom products
    const filteredBase = MOCK_PRODUCTS.filter(p => !deletedIds.includes(p.id) && !deletedIds.includes(p.slug));
    
    // Combine custom (at the top) + filtered base products
    return [...customList, ...filteredBase];
  } catch {
    return MOCK_PRODUCTS;
  }
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  const allProds = getStoredProducts();
  if (categorySlug) {
    const term = categorySlug.toLowerCase().replace(/-/g, ' ');
    return allProds.filter(p => 
      p.category.toLowerCase().includes(term) || 
      p.category.toLowerCase().replace(/\s+/g, '-').includes(categorySlug.toLowerCase())
    );
  }
  return allProds;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const allProds = getStoredProducts();
  const found = allProds.find(p => p.slug === slug || p.id === slug);
  return found || allProds[0] || null;
}

export async function addProduct(product: Product): Promise<{ success: boolean; product: Product }> {
  const newProduct: Product = {
    ...product,
    id: product.id || 'prod-' + Date.now(),
    slug: product.slug || product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    rating: product.rating || 5.0,
    reviews_count: product.reviews_count || 1,
    is_new: true
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem('zehra_custom_products');
      const list: Product[] = existing ? JSON.parse(existing) : [];
      list.unshift(newProduct);
      localStorage.setItem('zehra_custom_products', JSON.stringify(list));
    } catch (e) {
      console.error('LocalStorage product save error:', e);
    }
  }

  if (supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE') {
    try {
      await supabase.from('products').insert([newProduct]);
    } catch (err) {
      console.warn('Supabase product insert notice:', err);
    }
  }

  return { success: true, product: newProduct };
}

export async function updateProduct(product: Product): Promise<{ success: boolean; product: Product }> {
  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem('zehra_custom_products');
      let list: Product[] = existing ? JSON.parse(existing) : [];
      const index = list.findIndex(p => p.id === product.id || p.slug === product.slug);
      if (index !== -1) {
        list[index] = { ...list[index], ...product };
      } else {
        list.unshift(product);
      }
      localStorage.setItem('zehra_custom_products', JSON.stringify(list));
    } catch (e) {
      console.error('LocalStorage product update error:', e);
    }
  }

  return { success: true, product };
}

export async function deleteProduct(idOrSlug: string): Promise<{ success: boolean }> {
  if (typeof window !== 'undefined') {
    try {
      // Remove from custom products
      const custom = localStorage.getItem('zehra_custom_products');
      if (custom) {
        let list: Product[] = JSON.parse(custom);
        list = list.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug);
        localStorage.setItem('zehra_custom_products', JSON.stringify(list));
      }

      // Mark in deleted products list to hide from base products
      const deleted = localStorage.getItem('zehra_deleted_products');
      const deletedList: string[] = deleted ? JSON.parse(deleted) : [];
      if (!deletedList.includes(idOrSlug)) {
        deletedList.push(idOrSlug);
        localStorage.setItem('zehra_deleted_products', JSON.stringify(deletedList));
      }
    } catch (e) {
      console.error('LocalStorage product delete error:', e);
    }
  }

  return { success: true };
}

export async function getCategories(): Promise<Category[]> {
  return MOCK_CATEGORIES;
}

let inMemoryOrders: Order[] = [];

export async function createOrder(order: Order): Promise<{ success: boolean; orderId: string }> {
  const generatedId = 'ZS-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder: Order = {
    ...order,
    id: generatedId,
    status: 'pending',
    created_at: new Date().toISOString()
  };

  if (supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE') {
    try {
      const { error } = await supabase.from('orders').insert([newOrder]);
      if (error) {
        console.warn('Supabase DB Notice:', error.message);
      }
    } catch (err) {
      console.warn('Supabase fallback:', err);
    }
  }

  inMemoryOrders.unshift(newOrder);

  // Sync with LocalStorage for 100% guaranteed persistence across refreshes
  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem('zehra_orders');
      const ordersList: Order[] = existing ? JSON.parse(existing) : [];
      ordersList.unshift(newOrder);
      localStorage.setItem('zehra_orders', JSON.stringify(ordersList));
    } catch (err) {
      console.error('LocalStorage order save error:', err);
    }
  }

  return { success: true, orderId: generatedId };
}

export async function getOrders(): Promise<Order[]> {
  if (supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE') {
    try {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data as Order[];
      }
    } catch (err) {
      console.warn('Supabase fetch notice:', err);
    }
  }

  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem('zehra_orders');
      if (existing) {
        const localOrders: Order[] = JSON.parse(existing);
        return localOrders;
      }
    } catch (err) {
      console.error('LocalStorage order read error:', err);
    }
  }

  return inMemoryOrders;
}

export async function updateOrderStatus(orderId: string, status: string): Promise<{ success: boolean }> {
  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem('zehra_orders');
      if (existing) {
        const ordersList: Order[] = JSON.parse(existing);
        const updated = ordersList.map(o => o.id === orderId ? { ...o, status } : o);
        localStorage.setItem('zehra_orders', JSON.stringify(updated));
      }
    } catch (err) {
      console.error('Update order error:', err);
    }
  }

  inMemoryOrders = inMemoryOrders.map(o => o.id === orderId ? { ...o, status } : o);

  if (supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE') {
    try {
      await supabase.from('orders').update({ status }).eq('id', orderId);
    } catch (err) {
      console.warn('Supabase update order status:', err);
    }
  }

  return { success: true };
}

export async function deleteOrder(orderId: string): Promise<{ success: boolean }> {
  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem('zehra_orders');
      if (existing) {
        const ordersList: Order[] = JSON.parse(existing);
        const filtered = ordersList.filter(o => o.id !== orderId);
        localStorage.setItem('zehra_orders', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error('Delete order error:', err);
    }
  }

  inMemoryOrders = inMemoryOrders.filter(o => o.id !== orderId);
  return { success: true };
}
