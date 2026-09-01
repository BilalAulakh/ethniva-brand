const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

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

function cleanPhone(text) {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/0309[-\s]?4292220/gi, '0320-1803537')
    .replace(/923094292220/gi, '923201803537');
}

async function runUpdate() {
  console.log('\n========================================');
  console.log('🔄 Updating Phone Numbers in Database & Backups...');
  console.log('========================================');

  // 1. Update Supabase
  try {
    const { data: products, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching products from Supabase:', error.message);
    } else if (products && products.length > 0) {
      console.log(`🔍 Found ${products.length} products in Supabase. Checking for old numbers...`);
      let updatedCount = 0;
      for (const p of products) {
        const originalDesc = p.description || '';
        const cleanedDesc = cleanPhone(originalDesc);

        if (cleanedDesc !== originalDesc) {
          const { error: updateErr } = await supabase
            .from('products')
            .update({
              description: cleanedDesc
            })
            .eq('id', p.id);

          if (updateErr) {
            console.error(`Failed to update product ${p.title}: ${updateErr.message}`);
          } else {
            updatedCount++;
            console.log(`✅ Updated product "${p.title}" (${p.slug}) with 0320-1803537 in database`);
          }
        }
      }
      console.log(`✨ Total products updated in Supabase: ${updatedCount}`);
    }
  } catch (e) {
    console.error('Supabase update exception:', e.message);
  }

  // 2. Update backup JSON files
  const backupDir = path.join(__dirname, '..', 'backups');
  if (fs.existsSync(backupDir)) {
    const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const filePath = path.join(backupDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const cleaned = cleanPhone(content);
        if (cleaned !== content) {
          fs.writeFileSync(filePath, cleaned, 'utf8');
          console.log(`📝 Updated backup file: ${file}`);
        }
      } catch (err) {
        console.error(`Error updating backup file ${file}:`, err.message);
      }
    }
  }

  console.log('\n----------------------------------------');
  console.log('🎉 PHONE NUMBER SYNC COMPLETED!');
  console.log('========================================\n');
}

runUpdate();
