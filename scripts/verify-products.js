const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
  const env = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
  for (const line of env.split('\n')) {
    const m = line.trim().match(/^([^=]+)=(.*)$/);
    if (m) {
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[m[1].trim()] = val;
    }
  }
}
loadEnv();

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function verify() {
  const { data, count, error } = await supabase
    .from('products')
    .select('id, title, category, images, price', { count: 'exact' });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Total products in Supabase:', count);
  console.log('\nAll products starting with prod-a:');
  const prodA = data.filter(p => p.id.startsWith('prod-a'));
  prodA.forEach(p => {
    console.log(`- [${p.id}] ${p.title} (Rs. ${p.price}) | ${p.images}`);
  });

  const backup = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'backups', 'latest_backup.json'), 'utf8'));
  console.log('\nTotal products in latest_backup.json:', backup.summary.totalProducts);
}

verify();
