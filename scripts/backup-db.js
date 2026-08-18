const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://satlkkoaqocikfwkmmdu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhdGxra29hcW9jaWtmd2ttbWR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5NzM1MjcsImV4cCI6MjEwMjU0OTUyN30.zSWUegpFlzISksyRN-vkTbjiUN72fjywTfDJWMl6-gc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createBackup() {
  console.log('----------------------------------------------------');
  console.log('📦 Starting Supabase Database Backup');
  console.log('Database URL:', supabaseUrl);
  console.log('----------------------------------------------------');

  try {
    // 1. Fetch Products
    console.log('⏳ Fetching products from Supabase...');
    const { data: products, error: prodErr } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (prodErr) {
      console.warn('⚠️ Notice fetching products:', prodErr.message);
    } else {
      console.log(`✅ Fetched ${products?.length || 0} products.`);
    }

    // 2. Fetch Orders
    console.log('⏳ Fetching orders from Supabase...');
    const { data: orders, error: orderErr } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (orderErr) {
      console.warn('⚠️ Notice fetching orders:', orderErr.message);
    } else {
      console.log(`✅ Fetched ${orders?.length || 0} orders.`);
    }

    // 3. Create Backup Payload
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupData = {
      timestamp: new Date().toISOString(),
      source: supabaseUrl,
      stats: {
        productsCount: products?.length || 0,
        ordersCount: orders?.length || 0
      },
      products: products || [],
      orders: orders || []
    };

    // 4. Save to backups directory
    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupFilePath = path.join(backupDir, `backup_${timestamp}.json`);
    fs.writeFileSync(backupFilePath, JSON.stringify(backupData, null, 2), 'utf8');

    console.log('\n🎉 BACKUP SUCCESSFUL!');
    console.log('📁 Saved to:', backupFilePath);
    console.log(`📊 Backup contents: ${backupData.stats.productsCount} products, ${backupData.stats.ordersCount} orders.`);
    console.log('----------------------------------------------------');
  } catch (err) {
    console.error('❌ Backup failed:', err);
  }
}

createBackup();
