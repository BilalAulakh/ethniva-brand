const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const backupPath = path.join(__dirname, '..', 'backups', 'latest_backup.json');

const files = fs.readdirSync(imagesDir);
const whatsappFiles = files.filter(f => f.toLowerCase().includes('whatsapp')).sort();

console.log('Total WhatsApp images found in public/images:', whatsappFiles.length);

const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
const products = backup.data.products;

const mapping = [
  // First 5 (added earlier)
  { wa: 'WhatsApp Image 2026-09-28 at 2.46.02 PM (1).jpeg', webp: 'aa1.webp', id: 'prod-aa-elayne-mauve' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.46.02 PM.jpeg', webp: 'ab1.webp', id: 'prod-ab-rani-red' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.46.01 PM (2).jpeg', webp: 'ac1.webp', id: 'prod-ac-siah-black' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.46.01 PM (1).jpeg', webp: 'ad1.webp', id: 'prod-ad-naz-peach' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.46.01 PM.jpeg', webp: 'ae1.webp', id: 'prod-ae-anaya-black' },
  // Remaining 11 (added now)
  { wa: 'WhatsApp Image 2026-09-28 at 2.45.57 PM.jpeg', webp: 'af1.webp', id: 'prod-af-layla-black' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.45.58 PM.jpeg', webp: 'ag1.webp', id: 'prod-ag-safia-ivory' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.45.58 PM (1).jpeg', webp: 'ah1.webp', id: 'prod-ah-mahnoor-magenta' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.45.58 PM (2).jpeg', webp: 'ai1.webp', id: 'prod-ai-sehar-lilac' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.45.59 PM.jpeg', webp: 'aj1.webp', id: 'prod-aj-zoya-taupe' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.45.59 PM (1).jpeg', webp: 'ak1.webp', id: 'prod-ak-noor-rani-ivory' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.45.59 PM (2).jpeg', webp: 'al1.webp', id: 'prod-al-qalb-mocha' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.46.00 PM.jpeg', webp: 'am1.webp', id: 'prod-am-pareesa-rose' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.46.00 PM (1).jpeg', webp: 'an1.webp', id: 'prod-an-afreen-black' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.46.00 PM (2).jpeg', webp: 'ao1.webp', id: 'prod-ao-gulzar-black' },
  { wa: 'WhatsApp Image 2026-09-28 at 2.46.00 PM (3).jpeg', webp: 'ap1.webp', id: 'prod-ap-saman-yellow' }
];

console.log('\n--- VERIFICATION OF ALL 16 WHATSAPP IMAGES ---');
let allAccounted = true;
mapping.forEach((m, idx) => {
  const fileExists = fs.existsSync(path.join(imagesDir, m.wa));
  const webpExists = fs.existsSync(path.join(imagesDir, m.webp));
  const prod = products.find(p => p.id === m.id);
  const ok = fileExists && webpExists && !!prod;
  if (!ok) allAccounted = false;
  console.log(`${idx + 1}. [${ok ? 'OK' : 'MISSING'}] ${m.wa}`);
  console.log(`   -> WebP: ${m.webp} (exists: ${webpExists})`);
  console.log(`   -> Product: "${prod?.title}" (ID: ${m.id}, Price: Rs. ${prod?.price})`);
});

// Check if any whatsapp file was NOT in mapping
const mappedWAFiles = new Set(mapping.map(m => m.wa));
const unmapped = whatsappFiles.filter(f => !mappedWAFiles.has(f));
console.log('\nUnmapped WhatsApp images in folder:', unmapped.length);
if (unmapped.length > 0) {
  console.log(unmapped);
}

console.log('\nAll 16 WhatsApp images accounted for:', allAccounted && unmapped.length === 0);
