const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');

// Usage: node scripts/add-replica-batch.js <products.json> <source-image-dir>
// products.json: [{ key, color, images: ["9.jpg", ...] }]
// Images are converted to webp, uploaded to Supabase Storage (ethniva-images/products/)
// and products are upserted into the "Replica" category.

function loadEnv() {
  for (const f of ['.env.local', '.env.development', '.env']) {
    const envPath = path.join(__dirname, '..', f);
    if (!fs.existsSync(envPath)) continue;
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const match = line.trim().match(/^([^#=]+)=(.*)$/);
      if (match && !process.env[match[1].trim()]) {
        process.env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }
}

loadEnv();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const BUCKET = 'ethniva-images';

const DESCRIPTION = `BRAND NAME : ETHNIVA PREMIUM (DHANAK)

SHIRT : Dhanak
SHAWL : Dhanak / Twill Pashmina
TROUSER : Dhanak

BY PCS : 3 Pcs

PRODUCT DESCRIPTION :
• Embroidered Dhanak Front (Embroidered Daman Patch)
• Embroidered Dhanak Sleeves (Embroidered Sleeves Patch)
• Embroidered Dhanak Shawl / Digital Printed Twill Pashmina Shawl
• Dyed Dhanak Trouser

To order Dm/whatsapp us on 0320-1803537`;

async function uploadImage(srcPath, name) {
  const buffer = await sharp(srcPath).webp({ quality: 85 }).toBuffer();
  const objectPath = `products/${name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(objectPath, buffer, { contentType: 'image/webp', upsert: true });
  if (error) throw new Error(`Upload failed for ${name}: ${error.message}`);
  return supabase.storage.from(BUCKET).getPublicUrl(objectPath).data.publicUrl;
}

async function main() {
  const [configPath, srcDir] = process.argv.slice(2);
  const items = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const baseTime = Date.now();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const images = [];
    for (let j = 0; j < item.images.length; j++) {
      images.push(await uploadImage(path.join(srcDir, item.images[j]), `replica-${item.key}-${j + 1}.webp`));
    }

    const product = {
      id: `prod-replica-${item.key}`,
      title: `ETHNIVA PREMIUM (DHANAK) - ${item.color}`,
      slug: `mix-brands-premium-dhanak-${item.key}-replica`,
      price: 4699,
      compare_at_price: null,
      category: 'Replica',
      fabric: 'Dhanak Shirt & Trouser with Dhanak / Twill Pashmina Shawl',
      images,
      description: DESCRIPTION,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [],
      is_featured: false,
      is_new: true,
      rating: 4.9,
      reviews_count: 12 + (i % 9),
      created_at: new Date(baseTime - i * 1000).toISOString()
    };

    const { error } = await supabase.from('products').upsert([product], { onConflict: 'id' });
    if (error) throw new Error(`Supabase upsert failed for ${product.id}: ${error.message}`);
    console.log(`✅ ${product.title} (${images.length} images)`);
  }
}

main().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
