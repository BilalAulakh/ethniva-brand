const { createClient } = require('@supabase/supabase-js');

const url = 'https://zeysbwhgakissozuyspw.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpleXNid2hnYWtpc3NvenV5c3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4OTc3NTUsImV4cCI6MjEwMzQ3Mzc1NX0.BmPbf2RL1RXOrH1BpULoVRb2TGy7JvTcy9rBCRvLVQQ';
const supabase = createClient(url, key);

const products25 = [
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 13).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 17).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 19).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 21).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString()
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
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString()
  }
];

async function seed() {
  console.log(`Starting insertion of ${products25.length} demo products...`);
  
  // Upsert all 25 items
  const { data, error } = await supabase
    .from('products')
    .upsert(products25, { onConflict: 'id' })
    .select('id, title, category, price');

  if (error) {
    console.error('Error inserting products:', error);
  } else {
    console.log(`Successfully inserted/updated ${data.length} products!`);
    data.forEach(p => console.log(`✓ [${p.category}] ${p.title} - Rs. ${p.price}`));
  }
}

seed();
