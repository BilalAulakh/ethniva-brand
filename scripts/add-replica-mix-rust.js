const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');

// Usage: node scripts/add-replica-mix-rust.js <image1> <image2> <image3> <image4>

function loadEnv() {
  const envPaths = [
    path.join(__dirname, '..', '.env.local'),
    path.join(__dirname, '..', '.env.development'),
    path.join(__dirname, '..', '.env')
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const match = trimmed.match(/^([^=]+)=(.*)$/);
          if (match) {
            const key = match[1].trim();
            let val = match[2].trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) process.env[key] = val;
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

const imageNames = ['replica-mix-rust1.webp', 'replica-mix-rust2.webp', 'replica-mix-rust3.webp', 'replica-mix-rust4.webp'];

const product = {
  id: 'prod-replica-mix-brands-rust',
  title: 'MIX BRANDS (PREMIUM DHANAK) - RUST',
  slug: 'mix-brands-premium-dhanak-rust-replica',
  price: 4699,
  compare_at_price: null,
  category: 'Replica',
  fabric: 'Dhanak Shirt & Trouser with Dhanak / Twill Pashmina Shawl',
  images: imageNames.map(n => `/images/${n}`),
  description: `BRAND NAME : MIX BRANDS (PREMIUM DHANAK)

SHIRT : Dhanak
SHAWL : Dhanak / Twill Pashmina
TROUSER : Dhanak

BY PCS : 3 Pcs

PRODUCT DESCRIPTION :
• Embroidered Dhanak Front (Embroidered Daman Patch)
• Embroidered Dhanak Sleeves (Embroidered Sleeves Patch)
• Embroidered Dhanak Shawl / Digital Printed Twill Pashmina Shawl
• Dyed Dhanak Trouser

To order Dm/whatsapp us on 0320-1803537`,
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: [],
  is_featured: false,
  is_new: true,
  rating: 4.9,
  reviews_count: 16,
  created_at: new Date().toISOString()
};

async function main() {
  const sources = process.argv.slice(2);
  if (sources.length !== imageNames.length) {
    console.error(`❌ Pass ${imageNames.length} source image paths`);
    process.exit(1);
  }

  const outDir = path.join(__dirname, '..', 'public', 'images');
  for (let i = 0; i < sources.length; i++) {
    const out = path.join(outDir, imageNames[i]);
    await sharp(sources[i]).webp({ quality: 85 }).toFile(out);
    console.log(`🖼️  Saved ${out}`);
  }

  const { error } = await supabase.from('products').upsert([product], { onConflict: 'id' });
  if (error) {
    console.error('❌ Supabase upsert error:', error.message);
    process.exit(1);
  }
  console.log(`✅ Added "${product.title}" to category "${product.category}"`);
}

main();
