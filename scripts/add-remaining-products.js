const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
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

// Image conversion mapping: WhatsApp Image -> webp
const imageConversions = [
  {
    src: 'WhatsApp Image 2026-09-28 at 2.45.57 PM.jpeg',
    dest: 'af1.webp'
  },
  {
    src: 'WhatsApp Image 2026-09-28 at 2.45.58 PM.jpeg',
    dest: 'ag1.webp'
  },
  {
    src: 'WhatsApp Image 2026-09-28 at 2.45.58 PM (1).jpeg',
    dest: 'ah1.webp'
  },
  {
    src: 'WhatsApp Image 2026-09-28 at 2.45.58 PM (2).jpeg',
    dest: 'ai1.webp'
  },
  {
    src: 'WhatsApp Image 2026-09-28 at 2.45.59 PM.jpeg',
    dest: 'aj1.webp'
  },
  {
    src: 'WhatsApp Image 2026-09-28 at 2.45.59 PM (1).jpeg',
    dest: 'ak1.webp'
  },
  {
    src: 'WhatsApp Image 2026-09-28 at 2.45.59 PM (2).jpeg',
    dest: 'al1.webp'
  },
  {
    src: 'WhatsApp Image 2026-09-28 at 2.46.00 PM.jpeg',
    dest: 'am1.webp'
  },
  {
    src: 'WhatsApp Image 2026-09-28 at 2.46.00 PM (1).jpeg',
    dest: 'an1.webp'
  },
  {
    src: 'WhatsApp Image 2026-09-28 at 2.46.00 PM (2).jpeg',
    dest: 'ao1.webp'
  },
  {
    src: 'WhatsApp Image 2026-09-28 at 2.46.00 PM (3).jpeg',
    dest: 'ap1.webp'
  }
];

const newProducts = [
  {
    id: 'prod-af-layla-black',
    title: 'LAYLA BLACK',
    slug: 'layla-black',
    price: 6500,
    compare_at_price: 9500,
    category: 'Chiffon',
    fabric: 'Pure Chiffon with Intricate Embroidered Sleeve Cuffs & Silk Inner',
    images: ['/images/af1.webp'],
    description: `PACKAGE INCLUDED :

1PC SOLID CHIFFON MAXI DRESS
1PC ATTACHED SILK LINING / INNER
1PC CHIFFON DUPATTA

PRODUCT DETAILS :
An epitome of minimalist sophistication, LAYLA BLACK features a flowing full-length chiffon silhouette with an elegant round neckline and sheer sleeves accented with intricate tonal embroidery and lace cuffs. Includes a matching solid chiffon dupatta.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 24,
    created_at: new Date(Date.now() + 11000).toISOString()
  },
  {
    id: 'prod-ag-safia-ivory',
    title: 'SAFIA IVORY',
    slug: 'safia-ivory',
    price: 8500,
    compare_at_price: 13000,
    category: 'Festive Formals',
    fabric: 'Pure Raw Silk & Chiffon with Silver Zardozi Embroidery',
    images: ['/images/ag1.webp'],
    description: `PACKAGE INCLUDED :

1PC RAW SILK EMBROIDERED SHIRT
1PC RAW SILK TROUSER
1PC CHIFFON DUPATTA WITH SITARA SPRAY

PRODUCT DETAILS :
Radiate effortless grace in SAFIA IVORY. Meticulously handcrafted on pure ivory fabric featuring silver zardozi neckwork, fine floral motifs across the shirt, and a regal cutwork embroidered daman. Paired with a delicate sheer dupatta and tailored trousers for a breathtaking festive look.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 31,
    created_at: new Date(Date.now() + 10000).toISOString()
  },
  {
    id: 'prod-ah-mahnoor-magenta',
    title: 'MAHNOOR MAGENTA',
    slug: 'mahnoor-magenta',
    price: 9000,
    compare_at_price: 14000,
    category: 'Festive Formals',
    fabric: 'Fine Chiffon & Silk with Ornate Gold Zari Embellishments',
    images: ['/images/ah1.webp'],
    description: `PACKAGE INCLUDED :

1PC EMBROIDERED CHIFFON ANARKALI / PISHWAS
1PC SILK SHARARA / PALAZZO
1PC CHIFFON DUPATTA

PRODUCT DETAILS :
Make an unforgettable entrance with MAHNOOR MAGENTA. Draped in rich berry tones on sheer chiffon, this regal flared gown features intricate gold threadwork along the scooped neckline and empire waist bodice, subtly sprinkled with shimmering sitara bootis. Paired with wide-leg silk sharara trousers and a cascading matching dupatta.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 27,
    created_at: new Date(Date.now() + 9000).toISOString()
  },
  {
    id: 'prod-ai-sehar-lilac',
    title: 'SEHAR LILAC',
    slug: 'sehar-lilac',
    price: 7500,
    compare_at_price: 11500,
    category: 'Luxury Pret',
    fabric: 'Pure Organza & Silk with Delicate Zari Panel Embroidery',
    images: ['/images/ai1.webp'],
    description: `PACKAGE INCLUDED :

1PC ORGANZA EMBROIDERED SHIRT
1PC SILK TROUSER
1PC ORGANZA DUPATTA

PRODUCT DETAILS :
Subtle elegance meets modern charm in SEHAR LILAC. Rendered in a soothing pastel lilac hue on lustrous organza with straight vertical panel embellishments in antique gold tilla and sequin work. Complemented by tailored silk trousers and an ethereal sheer dupatta.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.8,
    reviews_count: 19,
    created_at: new Date(Date.now() + 8000).toISOString()
  },
  {
    id: 'prod-aj-zoya-taupe',
    title: 'ZOYA TAUPE',
    slug: 'zoya-taupe',
    price: 8500,
    compare_at_price: 13500,
    category: 'Festive Formals',
    fabric: 'Pure Raw Silk Shirt & Trouser with Contrast Magenta Silk Dupatta',
    images: ['/images/aj1.webp'],
    description: `PACKAGE INCLUDED :

1PC RAW SILK A-LINE SHIRT
1PC CONTRAST MAGENTA SILK DUPATTA WITH ZARI BORDERS
1PC RAW SILK TROUSER

PRODUCT DETAILS :
A regal interplay of neutral tones and jewel accents, ZOYA TAUPE features a flared silhouette in champagne taupe raw silk with an opulent handcrafted neckline. The look is crowned by a contrasting deep magenta dupatta with lustrous gold embroidered borders and delicate bootis.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 23,
    created_at: new Date(Date.now() + 7000).toISOString()
  },
  {
    id: 'prod-ak-noor-rani-ivory',
    title: 'NOOR RANI',
    slug: 'noor-rani-ivory',
    price: 8500,
    compare_at_price: 12000,
    category: 'Festive Formals',
    fabric: 'Pure Silk with Hand Painted Floral Organza Dupatta',
    images: ['/images/ak1.webp'],
    description: `PACKAGE INCLUDED :

1PC SILK ANARKALI GOWN
1PC SILK TROUSER
1PC ORGANZA HAND PAINTED EMBELLISHED DUPATTA

PRODUCT DETAILS :
NOOR RANI is a sublime ivory interpretation of traditional majesty. Designed in lustrous pure silk with an intricately embellished neckline and a grand flared hem with rich gota accents. Complemented by an organza dupatta hand-painted with delicate rosy florals and finished with artisanal gold lace.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 35,
    created_at: new Date(Date.now() + 6000).toISOString()
  },
  {
    id: 'prod-al-qalb-mocha',
    title: 'QALB MOCHA',
    slug: 'qalb-mocha',
    price: 8500,
    compare_at_price: 13000,
    category: 'Raw Silk',
    fabric: 'Pure Raw Silk with Gold Zardozi & Pleated Crinkle Sharara',
    images: ['/images/al1.webp'],
    description: `PACKAGE INCLUDED :

1PC RAW SILK EMBROIDERED SHIRT
1PC CRINKLED PLEATED SHARARA WITH GOLD ACCENTS
1PC CHIFFON DUPATTA WITH TASSEL LACE

PRODUCT DETAILS :
Rich and decadent, QALB MOCHA is crafted on deep espresso brown silk. Highlights include a royal jeweled neckline adorned with antique gold zardozi work, delicate dangling pearl beads on the hem, and a voluminous crinkle sharara with gold thread details.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.8,
    reviews_count: 18,
    created_at: new Date(Date.now() + 5000).toISOString()
  },
  {
    id: 'prod-am-pareesa-rose',
    title: 'PAREESA ROSE',
    slug: 'pareesa-rose',
    price: 8500,
    compare_at_price: 13000,
    category: 'Chiffon',
    fabric: 'Fine Chiffon with Gold Tilla Kalidaar Flare & Silk Inner',
    images: ['/images/am1.webp'],
    description: `PACKAGE INCLUDED :

1PC KALIDAAR CHIFFON GOWN WITH ATTACHED SILK INNER
1PC SILK TROUSER
1PC CHIFFON DUPATTA WITH GOLD SCALLOPED BORDERS

PRODUCT DETAILS :
Flow effortlessly in PAREESA ROSE, a romantic kalidaar ensemble rendered in soft dusty rose chiffon. Boasting a flattering V-shaped embellished neckline with antique gold embroidery, panels bordered with shimmering zari, and a tiered flared hemline with scallop finishes.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 22,
    created_at: new Date(Date.now() + 4000).toISOString()
  },
  {
    id: 'prod-an-afreen-black',
    title: 'AFREEN BLACK',
    slug: 'afreen-black',
    price: 9500,
    compare_at_price: 14500,
    category: 'Festive Formals',
    fabric: 'Pure Raw Silk & Organza with Teardrop Zardozi Embroidery',
    images: ['/images/an1.webp'],
    description: `PACKAGE INCLUDED :

1PC RAW SILK EMBROIDERED SHIRT
1PC FLARED SILK LEHENGA / SHARARA
1PC ORGANZA DUPATTA WITH EMBROIDERED BORDERS

PRODUCT DETAILS :
Unleash dramatic regal poise with AFREEN BLACK. Featuring an iconic teardrop neckline framed with antique gold zardozi embroidery, intricate floral vine accents along the waist and side slits, and a flared floor-grazing lehenga. Completed with a sheer black organza dupatta edged in dense gold threadwork.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 5.0,
    reviews_count: 29,
    created_at: new Date(Date.now() + 3000).toISOString()
  },
  {
    id: 'prod-ao-gulzar-black',
    title: 'GULZAR BLACK',
    slug: 'gulzar-black',
    price: 8000,
    compare_at_price: 12500,
    category: 'Raw Silk',
    fabric: 'Pure Raw Silk with Multicolored Floral Embroidered Organza Dupatta',
    images: ['/images/ao1.webp'],
    description: `PACKAGE INCLUDED :

1PC RAW SILK EMBROIDERED SHIRT
1PC RAW SILK TROUSER
1PC MULTICOLOR FLORAL EMBROIDERED ORGANZA DUPATTA

PRODUCT DETAILS :
A captivating blend of classic black and festive vibrancy, GULZAR BLACK features an understated raw silk silhouette with delicate gold wheat-stalk neck embroidery. Paired with a statement organza dupatta enriched with colorful threadwork blooms and shimmering coin lace.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.9,
    reviews_count: 21,
    created_at: new Date(Date.now() + 2000).toISOString()
  },
  {
    id: 'prod-ap-saman-yellow',
    title: 'SAMAN LEMON',
    slug: 'saman-lemon',
    price: 7000,
    compare_at_price: 11000,
    category: 'Luxury Pret',
    fabric: 'Pure Chiffon & Silk with Delicate Pastel Floral Embroidery',
    images: ['/images/ap1.webp'],
    description: `PACKAGE INCLUDED :

1PC CHIFFON EMBROIDERED SHIRT
1PC SILK TROUSER
1PC CHIFFON DUPATTA WITH GOLD LACE TRIM

PRODUCT DETAILS :
Exude fresh, sunny grace in SAMAN LEMON. Cut from lightweight pastel butter yellow chiffon, featuring an intricately embroidered neckline placket accented with soft rose-pink resham and silver zari details, paired with tailored trousers and a sheer fluid dupatta.

To order Dm/whatsapp us on 0320-1803537`,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [],
    is_featured: true,
    is_new: true,
    rating: 4.8,
    reviews_count: 17,
    created_at: new Date(Date.now() + 1000).toISOString()
  }
];

async function run() {
  console.log('\n========================================');
  console.log('🖼️ Step 1: Converting 11 Images to WebP (height 1024, q=85)...');
  console.log('========================================');

  const imagesDir = path.join(__dirname, '..', 'public', 'images');

  for (const item of imageConversions) {
    const srcPath = path.join(imagesDir, item.src);
    const destPath = path.join(imagesDir, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.error(`❌ Source image not found: ${item.src}`);
      continue;
    }

    try {
      await sharp(srcPath)
        .resize({ height: 1024, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(destPath);
      const stat = fs.statSync(destPath);
      console.log(`✅ Converted ${item.src} -> ${item.dest} (${(stat.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`❌ Error converting ${item.src}:`, err.message);
    }
  }

  console.log('\n========================================');
  console.log('🚀 Step 2: Upserting 11 New Products to Supabase...');
  console.log('========================================');

  const { data, error } = await supabase
    .from('products')
    .upsert(newProducts, { onConflict: 'id' });

  if (error) {
    console.error('❌ Supabase upsert error:', error.message);
    process.exit(1);
  }
  console.log('✅ 11 new products successfully added to Supabase!');

  console.log('\n========================================');
  console.log('📁 Step 3: Updating Backup JSON...');
  console.log('========================================');

  const backupDir = path.join(__dirname, '..', 'backups');
  const latestBackupPath = path.join(backupDir, 'latest_backup.json');

  let existingProducts = [];
  let existingOrders = [];
  if (fs.existsSync(latestBackupPath)) {
    const backupContent = JSON.parse(fs.readFileSync(latestBackupPath, 'utf8'));
    existingProducts = backupContent.data?.products || [];
    existingOrders = backupContent.data?.orders || [];
  }

  // Merge keeping all previous products intact
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
  console.log(`📊 Total products in catalog now: ${mergedProducts.length} (31 existing + 11 new = 42 total)`);
  console.log('========================================\n');
}

run();
