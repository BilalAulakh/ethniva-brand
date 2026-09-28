const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Manually parse .env.local
function loadEnv() {
  const envPaths = [
    path.join(__dirname, '..', '.env.local'),
    path.join(__dirname, '..', '.env.development'),
    path.join(__dirname, '..', '.env')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const match = trimmed.match(/^([^=]+)=(.*)$/);
          if (match) {
            const key = match[1].trim();
            let val = match[2].trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      }
    }
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('\n❌ ERROR: Supabase credentials not found in .env.local\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const newProducts = [
  {
    id: 'prod-aa-elayne-mauve',
    title: 'ELAYNE MAUVE',
    slug: 'elayne-mauve',
    price: 8500,
    compare_at_price: 13500,
    category: 'Chiffon',
    fabric: 'Pure Chiffon with Attached Cape & Embellished Neckline',
    images: ['/images/aa1.webp'],
    description: `PACKAGE INCLUDED :

1 SHIRT WITH ATTACHED CAPE GOWN
1 CHOKER COLLAR NECKBAND
1 SILK TROUSER

PRODUCT DETAILS :
Crafted on ethereal fine chiffon in an exquisite dusty mauve hue, the ELAYNE dress features a regal silhouette with a flowing attached cape dupatta and crystal-embellished round neckline. Finished with a matching embroidered neck choker and tailored silk trousers for sophisticated evening charm.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 22,
    created_at: new Date(Date.now() + 5000).toISOString()
  },
  {
    id: 'prod-ab-rani-red',
    title: 'RANI',
    slug: 'rani-red',
    price: 8500,
    compare_at_price: 12000,
    category: 'Festive Formals',
    fabric: 'Pure Silk with Hand Painted Organza Dupatta',
    images: ['/images/ab1.webp'],
    description: `PACKAGE INCLUDED :

1PC SILK SHIRT / ANARKALI
1PC SILK TROUSER
1PC ORGANZA HAND PAINTED EMBELLISHED DUPATTA

PRODUCT DETAILS :
Introducing RANI, a majestic crimson red flared ensemble paired with a statement organza dupatta hand-painted with vibrant floral blooms and edged with delicate gold lace trims. The shirt features subtle sitara detailing and ornate hand-embroidery along the neckline and sleeves.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 28,
    created_at: new Date(Date.now() + 4000).toISOString()
  },
  {
    id: 'prod-ac-siah-black',
    title: 'SIAH',
    slug: 'siah-black',
    price: 7500,
    compare_at_price: 12000,
    category: 'Raw Silk',
    fabric: 'Pure Silk with Golden Dabka & Organza Dupatta',
    images: ['/images/ac1.webp'],
    description: `PACKAGE INCLUDED :

1PC SILK SHIRT
1PC SILK TROUSERS / PALAZZO
1PC ORGANZA DUPATTA

PRODUCT DETAILS :
Indulge in timeless luxury with our SIAH silk ensemble. Meticulously handcrafted with ornate golden dabka work and floral spray along the neckline, paired with relaxed wide-leg silk trousers and a sheer organza dupatta adorned with gold bootis.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 19,
    created_at: new Date(Date.now() + 3000).toISOString()
  },
  {
    id: 'prod-ad-naz-peach',
    title: 'NAZ',
    slug: 'naz-peach',
    price: 9500,
    compare_at_price: 14500,
    category: 'Raw Silk',
    fabric: 'Pure Raw Silk with Gold Zardozi Embroidery',
    images: ['/images/ad1.webp'],
    description: `PACKAGE INCLUDED :

1PC SILK SHIRT
1PC SILK TROUSERS
1PC ORGANZA DUPATTA

PRODUCT DETAILS :
Expertly handcrafted on lustrous blush peach raw silk, the NAZ dress combines regal elegance with artisanal precision. Features intricate gold zardozi neck embellishment with hanging cord accents, matching tailored pants with gota borders, and a gold-striped organza dupatta.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.8,
    reviews_count: 17,
    created_at: new Date(Date.now() + 2000).toISOString()
  },
  {
    id: 'prod-ae-anaya-black',
    title: 'ANAYA BLACK',
    slug: 'anaya-black',
    price: 7500,
    compare_at_price: 11500,
    category: 'Chiffon',
    fabric: 'Pure Chiffon with Heavy Embroidered Bodice & Silk Trouser',
    images: ['/images/ae1.webp'],
    description: `PACKAGE INCLUDED :

1PC CHIFFON MAXY
1PC CHIFFON DUPATTA
1PC SILK TROUSER / INNER

PRODUCT DETAILS :
ANAYA BLACK is a dramatic floor-length flared gown crafted in midnight black chiffon. Featuring an opulent antique gold embroidered bodice, sheer full-length sleeves, and a voluminous gathered flare that sweeps effortlessly.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 25,
    created_at: new Date(Date.now() + 1000).toISOString()
  }
];

async function addProducts() {
  console.log('\n========================================');
  console.log('🚀 Adding 5 New Products to Ethniva...');
  console.log('========================================');

  // 1. Upsert to Supabase
  console.log('⏳ Upserting 5 new products to Supabase...');
  const { data, error } = await supabase
    .from('products')
    .upsert(newProducts, { onConflict: 'id' });

  if (error) {
    console.error('❌ Supabase upsert error:', error.message);
    process.exit(1);
  }
  console.log('✅ 5 new products successfully added to Supabase!');

  // 2. Update latest_backup.json and create new backup
  const backupDir = path.join(__dirname, '..', 'backups');
  const latestBackupPath = path.join(backupDir, 'latest_backup.json');

  let existingProducts = [];
  let existingOrders = [];
  if (fs.existsSync(latestBackupPath)) {
    const backupContent = JSON.parse(fs.readFileSync(latestBackupPath, 'utf8'));
    existingProducts = backupContent.data?.products || [];
    existingOrders = backupContent.data?.orders || [];
  }

  // Merge keeping existing 26 products intact
  const mergedMap = new Map();
  for (const p of existingProducts) {
    mergedMap.set(p.id, p);
  }
  for (const p of newProducts) {
    mergedMap.set(p.id, p);
  }
  const mergedProducts = Array.from(mergedMap.values());

  const now = new Date();
  const timestamp = now.toISOString();
  const dateStr = now.toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0];
  const newBackupFileName = `backup_${dateStr}.json`;

  const updatedBackupData = {
    version: '1.0',
    timestamp: timestamp,
    summary: {
      totalProducts: mergedProducts.length,
      totalOrders: existingOrders.length
    },
    data: {
      products: mergedProducts,
      orders: existingOrders
    }
  };

  fs.writeFileSync(latestBackupPath, JSON.stringify(updatedBackupData, null, 2));
  fs.writeFileSync(path.join(backupDir, newBackupFileName), JSON.stringify(updatedBackupData, null, 2));

  console.log(`📁 Updated ${latestBackupPath}`);
  console.log(`📁 Created new backup: backups/${newBackupFileName}`);
  console.log(`📊 Total products in catalog: ${mergedProducts.length} (26 existing + 5 new)`);
  console.log('========================================\n');
}

addProducts();
