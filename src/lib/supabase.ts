import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://zeysbwhgakissozuyspw.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpleXNid2hnYWtpc3NvenV5c3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4OTc3NTUsImV4cCI6MjEwMzQ3Mzc1NX0.BmPbf2RL1RXOrH1BpULoVRb2TGy7JvTcy9rBCRvLVQQ';

function sanitizeUrl(rawUrl?: string): string {
  if (!rawUrl) return DEFAULT_SUPABASE_URL;
  const clean = rawUrl.trim().replace(/^["']|["']$/g, '');
  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    return DEFAULT_SUPABASE_URL;
  }
  return clean;
}

function sanitizeKey(rawKey?: string): string {
  if (!rawKey) return DEFAULT_SUPABASE_ANON_KEY;
  const clean = rawKey.trim().replace(/^["']|["']$/g, '');
  if (clean.length < 20) {
    return DEFAULT_SUPABASE_ANON_KEY;
  }
  return clean;
}

const supabaseUrl = sanitizeUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
const supabaseAnonKey = sanitizeKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  compare_at_price?: number;
  unstitched_price?: number;
  package_includes?: string;
  colors?: string[];
  category: string;
  fabric: string;
  images: string[];
  description: string;
  sizes: string[];
  is_featured?: boolean;
  is_new?: boolean;
  is_top_sale?: boolean;
  rating?: number;
  reviews_count?: number;
  created_at?: string;
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
  selected_color?: string;
  stitching_type?: string;
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
  notes?: string;
}

export const MOCK_PRODUCTS: Product[] = [
  // 1. VEZ APPARELS
  {
    id: 'vez-lina-01',
    title: 'Lina - Embroidered Raw Silk 3PC',
    slug: 'lina-embroidered-raw-silk-3pc',
    price: 14500,
    compare_at_price: 17500,
    category: 'VEZ APPARELS',
    fabric: 'Pure 80g Raw Silk with Embroidered Organza Dupatta',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'LINA exudes effortless grace with intricate hand-embellished resham motifs along the neckline, sleeves and daman. Paired with a scalloped organza dupatta and tailored cigarette pants.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 24,
    created_at: '2026-08-29T10:00:00.000Z'
  },
  {
    id: 'vez-elva-02',
    title: 'Elva - Handcrafted Farshi Ensemble',
    slug: 'elva-handcrafted-farshi-ensemble',
    price: 16500,
    compare_at_price: 19500,
    category: 'VEZ APPARELS',
    fabric: 'Pure Silk & Hand-Embroidered Organza',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'ELVA is a luxurious shirt and dupatta set made with fine silk and delicate handmade embroidery. Expertly crafted with a traditional farshi cut, experience high couture comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 18,
    created_at: '2026-08-29T09:45:00.000Z'
  },
  {
    id: 'vez-zehra-03',
    title: 'Zehra - Signature Metallic Tissue Suit',
    slug: 'zehra-signature-metallic-tissue-suit',
    price: 18500,
    compare_at_price: 22000,
    category: 'VEZ APPARELS',
    fabric: 'Metallic Tissue Silk & Zari Chiffon',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'ZEHRA is a showstopper statement piece illuminated by subtle golden metallic sheens, detailed tilla needlework, and opulent crystal hangings.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: true,
    rating: 4.8,
    reviews_count: 15,
    created_at: '2026-08-29T09:30:00.000Z'
  },

  // 2. Chiffon
  {
    id: 'chiffon-aira-04',
    title: 'Aira - Pastel Mint Embroidered Chiffon',
    slug: 'aira-pastel-mint-embroidered-chiffon',
    price: 11500,
    compare_at_price: 13900,
    category: 'Chiffon',
    fabric: 'Pure Bemberg Chiffon with Silk Lining',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'AIRA captures breezy sophistication with delicate floral thread embroidery on airy mint chiffon, complemented by pearls on the cuffs.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new: true,
    rating: 4.7,
    reviews_count: 9,
    created_at: '2026-08-29T09:15:00.000Z'
  },
  {
    id: 'chiffon-meher-05',
    title: 'Meher - Rose Quartz Chiffon Kurta & Dupatta',
    slug: 'meher-rose-quartz-chiffon-kurta-dupatta',
    price: 12500,
    compare_at_price: 15000,
    category: 'Chiffon',
    fabric: 'Crinkle Chiffon with Silver Zari Accent',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'MEHER presents a delicate blush pink hue paired with shimmering silver zari work on fine crinkle chiffon.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: false,
    rating: 4.9,
    reviews_count: 14,
    created_at: '2026-08-29T09:00:00.000Z'
  },
  {
    id: 'chiffon-saira-06',
    title: 'Saira - Midnight Obsidian Chiffon Formal',
    slug: 'saira-midnight-obsidian-chiffon-formal',
    price: 13800,
    compare_at_price: 16500,
    category: 'Chiffon',
    fabric: 'Embroidered Chiffon & Silk Trousers',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'SAIRA combines dark midnight glamour with intricate silver sequin work on soft flowy chiffon fabric.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new: true,
    rating: 4.8,
    reviews_count: 11,
    created_at: '2026-08-29T08:45:00.000Z'
  },

  // 3. Luxury Pret
  {
    id: 'lux-noor-07',
    title: 'Noor - Pearl White Hand-Embellished Tunic',
    slug: 'noor-pearl-white-hand-embellished-tunic',
    price: 14000,
    compare_at_price: 16500,
    category: 'Luxury Pret',
    fabric: 'Korean Raw Silk & Organza Accents',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'NOOR is crafted on premium pearl white raw silk with 3D floral appliqués, pearls, and cutwork borders.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 31,
    created_at: '2026-08-29T08:30:00.000Z'
  },
  {
    id: 'lux-mahnoor-08',
    title: 'Mahnoor - Emerald Green Velvet Trim Pret',
    slug: 'mahnoor-emerald-green-velvet-trim-pret',
    price: 15500,
    compare_at_price: 18000,
    category: 'Luxury Pret',
    fabric: 'Pure Raw Silk with Velvet Borders',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'MAHNOOR features regal emerald tones accented with micro-velvet borders, antique gold gota, and dabka work.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: false,
    rating: 4.9,
    reviews_count: 22,
    created_at: '2026-08-29T08:15:00.000Z'
  },
  {
    id: 'lux-zimal-09',
    title: 'Zimal - Tuscan Ochre Embroidered Kurta Set',
    slug: 'zimal-tuscan-ochre-embroidered-kurta-set',
    price: 12800,
    compare_at_price: 15200,
    category: 'Luxury Pret',
    fabric: 'Cotton Net with Pure Silk Floss',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'ZIMAL is bathed in rich warm ochre featuring botanical vine embroidery, paired with straight trousers and embroidered dupatta.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new: true,
    rating: 4.7,
    reviews_count: 17,
    created_at: '2026-08-29T08:00:00.000Z'
  },
  {
    id: 'lux-inaya-10',
    title: 'Inaya - Lilac Bloom Hand-Crafted 3PC',
    slug: 'inaya-lilac-bloom-hand-crafted-3pc',
    price: 16200,
    compare_at_price: 19000,
    category: 'Luxury Pret',
    fabric: 'Silk Organza & Crepe Silk',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'INAYA captures dreamy soft lilac tones with hand-sewn crystal beads, sheer organza sleeves, and a scalloped dupatta.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 19,
    created_at: '2026-08-29T07:45:00.000Z'
  },

  // 4. Ready To Wear
  {
    id: 'rtw-safa-11',
    title: 'Safa - Monochrome Geometric Block-Printed Pret',
    slug: 'safa-monochrome-geometric-block-printed-pret',
    price: 8500,
    compare_at_price: 9900,
    category: 'Ready To Wear',
    fabric: 'Fine Jacquard Cotton',
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'SAFA is an everyday staple featuring contemporary monochrome patterns, delicate loop-button detailing, and relaxed trousers.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new: false,
    rating: 4.6,
    reviews_count: 8,
    created_at: '2026-08-29T07:30:00.000Z'
  },
  {
    id: 'rtw-dariya-12',
    title: 'Dariya - Ocean Blue Everyday Chic 2PC',
    slug: 'dariya-ocean-blue-everyday-chic-2pc',
    price: 9200,
    compare_at_price: 10800,
    category: 'Ready To Wear',
    fabric: 'Slub Raw Silk with Lace Insets',
    images: [
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'DARIYA features refreshing oceanic blues, soft lace panels on the hemline, and tailored cigarette trousers.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new: true,
    rating: 4.8,
    reviews_count: 13,
    created_at: '2026-08-29T07:15:00.000Z'
  },
  {
    id: 'rtw-rania-13',
    title: 'Rania - Crimson Blossom Ready 3PC',
    slug: 'rania-crimson-blossom-ready-3pc',
    price: 9800,
    compare_at_price: 11500,
    category: 'Ready To Wear',
    fabric: 'Printed Viscose Silk with Lawn Lining',
    images: [
      'https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'RANIA brings lively crimson floral charm in a ready-to-wear silhouette, paired with a matching printed silk dupatta.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: false,
    rating: 4.7,
    reviews_count: 10,
    created_at: '2026-08-29T07:00:00.000Z'
  },

  // 5. Raw Silk & Chiffon
  {
    id: 'rs-afreen-14',
    title: 'Afreen - Royal Sapphire Raw Silk & Mukesh Dupatta',
    slug: 'afreen-royal-sapphire-raw-silk-mukesh-dupatta',
    price: 17500,
    compare_at_price: 21000,
    category: 'Raw Silk & Chiffon',
    fabric: '80g Raw Silk with Heavy Mukesh Chiffon',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'AFREEN showcases deep royal sapphire raw silk embellished with hand-hammered mukesh stars on pure chiffon dupatta.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 27,
    created_at: '2026-08-29T06:45:00.000Z'
  },
  {
    id: 'rs-nazia-15',
    title: 'Nazia - Ivory Gilded Raw Silk Formal',
    slug: 'nazia-ivory-gilded-raw-silk-formal',
    price: 19000,
    compare_at_price: 23500,
    category: 'Raw Silk & Chiffon',
    fabric: 'Pure Raw Silk & Embroidered Chiffon',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'NAZIA combines classic ivory raw silk with glistening gold marori work and a gossamer embroidered chiffon shawl.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new: true,
    rating: 4.9,
    reviews_count: 16,
    created_at: '2026-08-29T06:30:00.000Z'
  },
  {
    id: 'rs-hoor-16',
    title: 'Hoor - Plum Wine Raw Silk Peshwas',
    slug: 'hoor-plum-wine-raw-silk-peshwas',
    price: 18500,
    compare_at_price: 22000,
    category: 'Raw Silk & Chiffon',
    fabric: 'Raw Silk & Zari Chiffon',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'HOOR is a flared royal peshwas in rich plum wine, paired with a kiran-laced chiffon dupatta and churidar.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: false,
    rating: 4.8,
    reviews_count: 20,
    created_at: '2026-08-29T06:15:00.000Z'
  },

  // 6. Velvet Festive
  {
    id: 'velvet-shabnam-17',
    title: 'Shabnam - Maroon Micro-Velvet Embroidered 3PC',
    slug: 'shabnam-maroon-micro-velvet-embroidered-3pc',
    price: 22500,
    compare_at_price: 26000,
    category: 'Velvet Festive',
    fabric: '9000 Micro Velvet with Organza Details',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'SHABNAM is spun from premium 9000 micro velvet, adorned with heavy antique copper tilla work along neckline and daman.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 35,
    created_at: '2026-08-29T06:00:00.000Z'
  },
  {
    id: 'velvet-kohinoor-18',
    title: 'Kohinoor - Midnight Teal Zardozi Velvet Shawl Set',
    slug: 'kohinoor-midnight-teal-zardozi-velvet-shawl-set',
    price: 24500,
    compare_at_price: 28500,
    category: 'Velvet Festive',
    fabric: 'Royal Silk Velvet & Zardozi Handwork',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'KOHINOOR features an opulent 2.75-yard velvet shawl with comprehensive zardozi embroidery and matching straight velvet kurta.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: false,
    rating: 4.9,
    reviews_count: 28,
    created_at: '2026-08-29T05:45:00.000Z'
  },
  {
    id: 'velvet-shehnai-19',
    title: 'Shehnai - Black Velvet Hand-Tilla Kurta Trouser',
    slug: 'shehnai-black-velvet-hand-tilla-kurta-trouser',
    price: 21000,
    compare_at_price: 24500,
    category: 'Velvet Festive',
    fabric: 'Plush Velvet & Embroidered Net',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'SHEHNAI delivers timeless jet-black luxury with gold and silver wire embroidery, perfect for grand winter wedding soirees.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new: true,
    rating: 4.8,
    reviews_count: 15,
    created_at: '2026-08-29T05:30:00.000Z'
  },

  // 7. Bridal & Couture
  {
    id: 'bridal-dilkash-20',
    title: 'Dilkash - Heavily Embellished Bridal Peshwas',
    slug: 'dilkash-heavily-embellished-bridal-peshwas',
    price: 34500,
    compare_at_price: 42000,
    category: 'Bridal & Couture',
    fabric: 'Net, Zari & Tissue Organza',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'DILKASH is an ethereal bridal masterpiece handcrafted with dabka, naqshi, swarovski crystals, and a voluminous 16-panel flare.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 42,
    created_at: '2026-08-29T05:15:00.000Z'
  },
  {
    id: 'bridal-shahana-21',
    title: 'Shahana - Traditional Rust Red Farshi Gharara',
    slug: 'shahana-traditional-rust-red-farshi-gharara',
    price: 38000,
    compare_at_price: 45000,
    category: 'Bridal & Couture',
    fabric: 'Pure Jamawar & Tissue Chiffon',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'SHAHANA pays homage to Mughal royalty with deep scarlet rust hues, handwoven gold jamawar, and a sprawling farshi trail.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: false,
    rating: 5.0,
    reviews_count: 36,
    created_at: '2026-08-29T05:00:00.000Z'
  },
  {
    id: 'bridal-gulbahar-22',
    title: 'Gulbahar - Champagne Gold Angrakha Couture',
    slug: 'gulbahar-champagne-gold-angrakha-couture',
    price: 32000,
    compare_at_price: 39000,
    category: 'Bridal & Couture',
    fabric: 'Embossed Tissue & Mukesh Net',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'GULBAHAR radiates soft luxury in champagne gold with an asymmetric crossover angrakha cut and delicate pearl tassel ties.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new: true,
    rating: 4.9,
    reviews_count: 21,
    created_at: '2026-08-29T04:45:00.000Z'
  },

  // 8. Top Sale & Clearance
  {
    id: 'sale-falak-23',
    title: 'Falak - Powder Blue Embroidered 3PC (Sale)',
    slug: 'falak-powder-blue-embroidered-3pc-sale',
    price: 7900,
    compare_at_price: 13500,
    category: 'Top Sale & Clearance',
    fabric: 'Cotton Net Silk with Organza Border',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'FALAK is on special promotional clearance. A refreshing powder blue ensemble with fine threadwork and matching organza dupatta.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: false,
    rating: 4.8,
    reviews_count: 45,
    created_at: '2026-08-29T04:30:00.000Z'
  },
  {
    id: 'sale-suraya-24',
    title: 'Suraya - Terracotta Embroidered 2PC (Sale)',
    slug: 'suraya-terracotta-embroidered-2pc-sale',
    price: 6500,
    compare_at_price: 11000,
    category: 'Top Sale & Clearance',
    fabric: 'Slub Khaddar Silk with Resham Embroidery',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'SURAYA brings earthy terracotta warmth in an embroidered 2-piece kurta and trouser set at an unbeatable clearance price.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: false,
    is_new: false,
    rating: 4.7,
    reviews_count: 38,
    created_at: '2026-08-29T04:15:00.000Z'
  },
  {
    id: 'sale-laila-25',
    title: 'Laila - Rose Dust Chiffon Dupe (Clearance)',
    slug: 'laila-rose-dust-chiffon-dupe-clearance',
    price: 8200,
    compare_at_price: 14500,
    category: 'Top Sale & Clearance',
    fabric: 'Fine Chiffon with Zari Borders',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1000&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85'
    ],
    description: 'LAILA offers romantic dusty rose tones with scalloped zari embroidery borders and pearl button accents.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: true,
    is_new: false,
    rating: 4.9,
    reviews_count: 52,
    created_at: '2026-08-29T04:00:00.000Z'
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'VEZ APPARELS', slug: 'vez-apparels', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80', item_count: 3 },
  { id: '2', name: 'Chiffon', slug: 'chiffon', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80', item_count: 3 },
  { id: '3', name: 'Luxury Pret', slug: 'luxury-pret', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80', item_count: 4 },
  { id: '4', name: 'Ready To Wear', slug: 'ready-to-wear', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80', item_count: 3 },
  { id: '5', name: 'Raw Silk & Chiffon', slug: 'raw-silk-chiffon', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80', item_count: 3 },
  { id: '6', name: 'Velvet Festive', slug: 'velvet-festive', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&auto=format&fit=crop&q=80', item_count: 3 },
  { id: '7', name: 'Bridal & Couture', slug: 'bridal-couture', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', item_count: 3 },
  { id: '8', name: 'Top Sale & Clearance', slug: 'top-sale-clearance', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80', item_count: 3 }
];

// In-memory runtime cache for high performance
let memoryProductsCache: Product[] | null = null;
let inMemoryOrders: Order[] = [];

// Helper to get stored products (only real user created products)
export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') {
    return memoryProductsCache || [];
  }
  try {
    const custom = localStorage.getItem('zehra_custom_products');
    const deleted = localStorage.getItem('zehra_deleted_products');
    const deletedIds: string[] = deleted ? JSON.parse(deleted) : [];
    const customList: Product[] = custom ? JSON.parse(custom) : [];
    
    return customList.filter(p => !deletedIds.includes(p.id) && !deletedIds.includes(p.slug));
  } catch {
    return [];
  }
}

// -----------------------------------------------------------------------------
// PRODUCTS API (GUARANTEED ALL 72+ LIVE PRODUCTS FETCHING + FAST STREAMING)
// -----------------------------------------------------------------------------

export async function getProducts(
  categorySlug?: string,
  onPartialLoad?: (products: Product[]) => void
): Promise<Product[]> {
  // 1. If memory cache already has full 70+ live items, serve instantly
  if (memoryProductsCache && memoryProductsCache.length >= 70) {
    if (onPartialLoad) onPartialLoad(memoryProductsCache);
    if (categorySlug && categorySlug !== 'all') {
      const term = categorySlug.toLowerCase().replace(/-/g, ' ');
      return memoryProductsCache.filter(p => 
        p.category?.toLowerCase().includes(term) || 
        p.category?.toLowerCase().replace(/\s+/g, '-').includes(categorySlug.toLowerCase())
      );
    }
    return memoryProductsCache;
  }

  // 2. If valid localStorage cache exists, hydrate UI first for 0ms initial render, then refresh from live DB
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('zehra_live_supabase_v2');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length >= 70) {
          memoryProductsCache = parsed;
          if (onPartialLoad) onPartialLoad(parsed);
          if (categorySlug && categorySlug !== 'all') {
            const term = categorySlug.toLowerCase().replace(/-/g, ' ');
            return parsed.filter(p => 
              p.category?.toLowerCase().includes(term) || 
              p.category?.toLowerCase().replace(/\s+/g, '-').includes(categorySlug.toLowerCase())
            );
          }
          return parsed;
        } else if (Array.isArray(parsed) && parsed.length > 0) {
          // Stale cache: provide initial render preview but DO NOT return early so live 72 items get fetched
          if (onPartialLoad) onPartialLoad(parsed);
        }
      }
    } catch (e) {
      console.warn('Cache parse notice:', e);
    }
  }

  // 3. Fetch all live products from Supabase in safe batches of 15 (retrieving all 72 items)
  try {
    const limit = 15;
    let offset = 0;
    let hasMore = true;
    const fetchedLiveList: Product[] = [];

    while (hasMore) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (!error && data && Array.isArray(data) && data.length > 0) {
        fetchedLiveList.push(...(data as Product[]));
        // Progressive UI streaming
        if (onPartialLoad) {
          onPartialLoad([...fetchedLiveList]);
        }
        if (data.length < limit || offset >= 300) {
          hasMore = false;
        } else {
          offset += limit;
        }
      } else {
        hasMore = false;
      }
    }

    if (fetchedLiveList.length > 0) {
      memoryProductsCache = fetchedLiveList;

      if (typeof window !== 'undefined') {
        try {
          // Clear any old key and save fresh live catalog
          localStorage.removeItem('zehra_live_supabase_products');
          localStorage.setItem('zehra_live_supabase_v2', JSON.stringify(fetchedLiveList.slice(0, 35)));
        } catch (e) {
          console.warn('Storage quota notice:', e);
        }
      }

      if (categorySlug && categorySlug !== 'all') {
        const term = categorySlug.toLowerCase().replace(/-/g, ' ');
        return fetchedLiveList.filter(p => 
          p.category?.toLowerCase().includes(term) || 
          p.category?.toLowerCase().replace(/\s+/g, '-').includes(categorySlug.toLowerCase())
        );
      }
      return fetchedLiveList;
    }
  } catch (err) {
    console.warn('Supabase getProducts notice:', err);
  }

  // 4. Fallback
  const localList = memoryProductsCache || getStoredProducts();
  if (localList && localList.length > 0) {
    if (onPartialLoad) onPartialLoad(localList);
    if (categorySlug && categorySlug !== 'all') {
      const term = categorySlug.toLowerCase().replace(/-/g, ' ');
      return localList.filter(p => 
        p.category?.toLowerCase().includes(term) || 
        p.category?.toLowerCase().replace(/\s+/g, '-').includes(categorySlug.toLowerCase())
      );
    }
    return localList;
  }

  return [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  // First check memory cache
  if (memoryProductsCache && memoryProductsCache.length > 0) {
    const found = memoryProductsCache.find(p => p.slug === slug || p.id === slug);
    if (found) return found;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .limit(1)
      .maybeSingle();

    if (!error && data) {
      return data as Product;
    }
  } catch (err) {
    console.warn('Supabase getProductBySlug notice:', err);
  }

  // Check locally stored products
  const allProds = memoryProductsCache && memoryProductsCache.length > 0 ? memoryProductsCache : getStoredProducts();
  const found = allProds.find(p => p.slug === slug || p.id === slug);
  return found || null;
}

// Helper to sanitize and send only valid database columns to Supabase
function toDatabaseProduct(product: Product) {
  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    price: Number(product.price) || 0,
    compare_at_price: product.compare_at_price ? Number(product.compare_at_price) : null,
    category: product.category || 'Luxury Pret',
    fabric: product.fabric || '',
    images: Array.isArray(product.images) ? product.images : [],
    description: product.description || '',
    sizes: Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ['XS', 'S', 'M', 'L', 'XL'],
    is_featured: Boolean(product.is_featured),
    is_new: product.is_new ?? true,
    rating: Number(product.rating) || 5.0,
    reviews_count: Number(product.reviews_count) || 1,
    created_at: product.created_at || new Date().toISOString()
  };
}

export async function addProduct(product: Product): Promise<{ success: boolean; product: Product; error?: string }> {
  const newProduct: Product = {
    ...product,
    id: product.id || 'prod-' + Date.now(),
    slug: product.slug || product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    rating: product.rating || 5.0,
    reviews_count: product.reviews_count || 1,
    is_new: product.is_new ?? true,
    created_at: product.created_at || new Date().toISOString()
  };

  const dbPayload = toDatabaseProduct(newProduct);

  // 1. Save directly to Supabase
  try {
    const { data, error } = await supabase.from('products').upsert([dbPayload], { onConflict: 'id' }).select().single();
    if (error) {
      console.warn('Supabase product save notice:', error.message);
    } else if (data) {
      memoryProductsCache = null;
      return { success: true, product: { ...newProduct, ...(data as Product) } };
    }
  } catch (err: any) {
    console.warn('Supabase addProduct exception:', err);
  }

  // 2. LocalStorage sync backup
  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem('zehra_custom_products');
      const list: Product[] = existing ? JSON.parse(existing) : [];
      const filtered = list.filter(p => p.id !== newProduct.id);
      filtered.unshift(newProduct);
      localStorage.setItem('zehra_custom_products', JSON.stringify(filtered));
    } catch (e) {
      console.warn('LocalStorage backup quota notice:', e);
    }
  }

  return { success: true, product: newProduct };
}

export async function updateProduct(product: Product): Promise<{ success: boolean; product: Product }> {
  const dbPayload = toDatabaseProduct(product);

  // 1. Update in Supabase
  try {
    const { error } = await supabase
      .from('products')
      .update(dbPayload)
      .eq('id', product.id);
    
    if (error) {
      console.warn('Supabase product update notice:', error.message);
    } else {
      memoryProductsCache = null;
    }
  } catch (err) {
    console.warn('Supabase updateProduct error:', err);
  }

  // 2. Update in LocalStorage
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
  // 1. Delete from Supabase
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);
    
    if (error) {
      console.warn('Supabase product delete notice:', error.message);
    } else {
      memoryProductsCache = null;
    }
  } catch (err) {
    console.warn('Supabase deleteProduct error:', err);
  }

  // 2. Delete from LocalStorage
  if (typeof window !== 'undefined') {
    try {
      const custom = localStorage.getItem('zehra_custom_products');
      if (custom) {
        let list: Product[] = JSON.parse(custom);
        list = list.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug);
        localStorage.setItem('zehra_custom_products', JSON.stringify(list));
      }

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

export async function deleteAllProducts(): Promise<{ success: boolean; error?: string }> {
  // 1. Delete all rows from Supabase
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .neq('id', '___non_existent_id___');

    if (error) {
      console.warn('Supabase deleteAllProducts notice:', error.message);
    }
  } catch (err: any) {
    console.warn('Supabase deleteAllProducts error:', err);
  }

  // 2. Clear memory and local storage
  memoryProductsCache = [];
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('zehra_custom_products');
      localStorage.removeItem('zehra_deleted_products');
    } catch (e) {
      console.error('LocalStorage clear products error:', e);
    }
  }

  return { success: true };
}

// -----------------------------------------------------------------------------
// ORDERS API (SUPABASE REAL-TIME DATABASE)
// -----------------------------------------------------------------------------

export async function createOrder(order: Order): Promise<{ success: boolean; orderId: string; error?: string }> {
  const generatedId = 'ZS-' + Math.floor(100000 + Math.random() * 900000);
  const newOrder: Order = {
    ...order,
    id: generatedId,
    status: order.status || 'pending',
    created_at: new Date().toISOString()
  };

  // 1. Primary: Save directly to Supabase orders table
  let supabaseSuccess = false;
  try {
    const { error } = await supabase.from('orders').insert([newOrder]);
    if (error) {
      console.warn('Supabase orders insert notice:', error.message);
    } else {
      supabaseSuccess = true;
    }
  } catch (err) {
    console.warn('Supabase createOrder fallback:', err);
  }

  // 2. Memory & LocalStorage sync
  inMemoryOrders.unshift(newOrder);
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
  // 1. Try Supabase live fetch
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('zehra_orders', JSON.stringify(data));
      }
      inMemoryOrders = data as Order[];
      return data as Order[];
    }
  } catch (err) {
    console.warn('Supabase getOrders fetch notice:', err);
  }

  // 2. Fallback to LocalStorage / Memory
  let localOrders: Order[] = inMemoryOrders;
  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem('zehra_orders');
      if (existing) {
        localOrders = JSON.parse(existing);
      }
    } catch (err) {
      console.error('LocalStorage order read error:', err);
    }
  }
  return localOrders;
}

export async function updateOrderStatus(orderId: string, status: string): Promise<{ success: boolean }> {
  // 1. Update in Supabase
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);
    
    if (error) {
      console.warn('Supabase update order status error:', error.message);
    }
  } catch (err) {
    console.warn('Supabase update order error:', err);
  }

  // 2. Update local state
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
  return { success: true };
}

export async function deleteOrder(orderId: string): Promise<{ success: boolean }> {
  // 1. Delete from Supabase
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId);
    
    if (error) {
      console.warn('Supabase delete order error:', error.message);
    }
  } catch (err) {
    console.warn('Supabase delete order error:', err);
  }

  // 2. Delete from local state
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

export async function deleteAllOrders(): Promise<{ success: boolean }> {
  // 1. Delete from Supabase
  try {
    const { error } = await supabase
      .from('orders')
      .delete()
      .neq('id', '___non_existent_id___');
    
    if (error) {
      console.warn('Supabase deleteAllOrders error:', error.message);
    }
  } catch (err) {
    console.warn('Supabase deleteAllOrders error:', err);
  }

  // 2. Delete from local state
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('zehra_orders');
    } catch (err) {
      console.error('Delete orders error:', err);
    }
  }

  inMemoryOrders = [];
  return { success: true };
}

// -----------------------------------------------------------------------------
// SUPABASE HEALTH CHECK & SEEDING UTILITIES
// -----------------------------------------------------------------------------

export async function checkSupabaseHealth(): Promise<{
  connected: boolean;
  productsTableExists: boolean;
  ordersTableExists: boolean;
  productsCount: number;
  ordersCount: number;
  message: string;
}> {
  let productsTableExists = false;
  let ordersTableExists = false;
  let productsCount = 0;
  let ordersCount = 0;

  try {
    const pCheck = await supabase.from('products').select('*', { count: 'exact', head: true });
    if (!pCheck.error) {
      productsTableExists = true;
      productsCount = pCheck.count || 0;
    }
  } catch (e) {
    console.warn('Products check error:', e);
  }

  try {
    const oCheck = await supabase.from('orders').select('*', { count: 'exact', head: true });
    if (!oCheck.error) {
      ordersTableExists = true;
      ordersCount = oCheck.count || 0;
    }
  } catch (e) {
    console.warn('Orders check error:', e);
  }

  const connected = productsTableExists || ordersTableExists;
  let message = 'Connected to Supabase';
  if (!productsTableExists || !ordersTableExists) {
    message = 'Tables not found. Please run supabase_schema.sql in Supabase SQL Editor.';
  } else {
    message = `Live connected! Database has ${productsCount} products and ${ordersCount} orders.`;
  }

  return {
    connected,
    productsTableExists,
    ordersTableExists,
    productsCount,
    ordersCount,
    message
  };
}

export async function seedProductsToSupabase(
  onProgress?: (progress: number, total: number, message: string) => void
): Promise<{ success: boolean; inserted: number; error?: string }> {
  try {
    const total = MOCK_PRODUCTS.length;
    const chunkSize = 40;
    let inserted = 0;

    for (let i = 0; i < total; i += chunkSize) {
      const chunk = MOCK_PRODUCTS.slice(i, i + chunkSize);
      
      const { error } = await supabase.from('products').upsert(chunk, { onConflict: 'id' });
      
      if (error) {
        throw new Error(error.message);
      }
      
      inserted += chunk.length;
      if (onProgress) {
        onProgress(Math.min(inserted, total), total, `Synced ${Math.min(inserted, total)} of ${total} products...`);
      }
    }

    memoryProductsCache = null;
    return { success: true, inserted };
  } catch (err: any) {
    console.error('Seed products error:', err);
    return { success: false, inserted: 0, error: err.message || 'Seeding failed' };
  }
}

export async function getCategories(): Promise<Category[]> {
  const prods = await getProducts();
  
  // Extract all unique category names from real products
  const productCatNames = Array.from(
    new Set(prods.map(p => p.category?.trim()).filter(Boolean) as string[])
  );

  // Standard predefined base list
  const baseCategories = [
    'Luxury Pret',
    'Ready To Wear',
    'Raw Silk & Chiffon',
    'Velvet Festive',
    'Bridal & Couture',
    'Top Sale & Clearance'
  ];

  // Merge unique names
  const allNames = Array.from(new Set([...baseCategories, ...productCatNames]));

  return allNames.map((name, idx) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const matchingProds = prods.filter(p => {
      const pCat = (p.category || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const cCat = name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return pCat === cCat || pCat.includes(cCat) || cCat.includes(pCat);
    });
    
    const firstProductWithImage = matchingProds.find(p => p.images && p.images.length > 0 && p.images[0]);
    
    return {
      id: String(idx + 1),
      name,
      slug,
      image: firstProductWithImage?.images?.[0] || '',
      item_count: matchingProds.length
    };
  });
}
