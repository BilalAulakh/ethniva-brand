const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read environment variables or default to configured Supabase project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://satlkkoaqocikfwkmmdu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhdGxra29hcW9jaWtmd2ttbWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NzM1MjcsImV4cCI6MjEwMjU0OTUyN30.zSWUegpFlzISksyRN-vkTbjiUN72fjywTfDJWMl6-gc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('----------------------------------------------------');
  console.log('🚀 Starting Zehra Studio / Reetwear Supabase Seeder');
  console.log('Target URL:', supabaseUrl);
  console.log('----------------------------------------------------');

  const jsonPath = path.join(__dirname, '../src/lib/reetwear_data.json');
  if (!fs.existsSync(jsonPath)) {
    console.error('❌ Error: reetwear_data.json not found at', jsonPath);
    process.exit(1);
  }

  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const products = JSON.parse(rawData);

  console.log(`📦 Loaded ${products.length} products from reetwear_data.json`);

  // Check if table exists
  const { error: checkError } = await supabase.from('products').select('*').limit(1);
  if (checkError) {
    console.error('\n❌ ERROR: Could not query public.products table!');
    console.error('Supabase error message:', checkError.message);
    console.error('\n👉 Solution: Please run the SQL queries from `supabase_schema.sql` in your Supabase SQL Editor first, then run this command again.');
    process.exit(1);
  }

  console.log('✅ Connection to public.products verified.');
  console.log('⏳ Uploading in chunks of 40...');

  const chunkSize = 40;
  let uploaded = 0;

  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    const { error } = await supabase.from('products').upsert(chunk, { onConflict: 'id' });

    if (error) {
      console.error(`\n❌ Error during chunk ${i} - ${i + chunk.length}:`, error.message);
      process.exit(1);
    }

    uploaded += chunk.length;
    console.log(`  ✓ Synced ${uploaded} / ${products.length} products (${Math.round((uploaded / products.length) * 100)}%)`);
  }

  console.log('\n🎉 SUCCESS! All products have been seeded to Supabase public.products table.');
  console.log('----------------------------------------------------');
}

seed();
