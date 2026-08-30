const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Manually parse .env.local if dotenv is not installed
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
  console.error('\n❌ ERROR: Supabase credentials not found in .env.local');
  console.error('Please make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Maximum number of dated backups to keep
const MAX_BACKUPS_TO_KEEP = 3;

function cleanOldBackups(backupDir) {
  try {
    const files = fs.readdirSync(backupDir);
    // Find all timestamped backup files (e.g., backup_YYYY-MM-DD_HH-mm-ss.json)
    const backupFiles = files
      .filter((file) => file.startsWith('backup_') && file.endsWith('.json'))
      .map((file) => ({
        name: file,
        fullPath: path.join(backupDir, file),
        time: fs.statSync(path.join(backupDir, file)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time); // Newest first

    if (backupFiles.length > MAX_BACKUPS_TO_KEEP) {
      const filesToDelete = backupFiles.slice(MAX_BACKUPS_TO_KEEP);
      for (const fileObj of filesToDelete) {
        fs.unlinkSync(fileObj.fullPath);
        console.log(`🧹 Auto-removed old backup: ${fileObj.name}`);
      }
    }
  } catch (err) {
    console.warn('⚠️ Warning cleaning old backups:', err.message);
  }
}

async function runBackup() {
  console.log('\n========================================');
  console.log('📦 Starting Ethniva Database Backup...');
  console.log('========================================');

  try {
    // 1. Fetch Products
    console.log('⏳ Fetching products from Supabase...');
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (productsError) {
      throw new Error(`Failed to fetch products: ${productsError.message}`);
    }
    console.log(`✅ Products fetched: ${products.length}`);

    // 2. Fetch Orders
    console.log('⏳ Fetching orders from Supabase...');
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordersError) {
      throw new Error(`Failed to fetch orders: ${ordersError.message}`);
    }
    console.log(`✅ Orders fetched: ${orders.length}`);

    // 3. Prepare Backup Directory
    const backupDir = path.join(__dirname, '..', 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // 4. Create Timestamped File
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

    const backupPayload = {
      version: '1.0',
      timestamp: now.toISOString(),
      summary: {
        totalProducts: products.length,
        totalOrders: orders.length
      },
      data: {
        products,
        orders
      }
    };

    const fileName = `backup_${timestamp}.json`;
    const filePath = path.join(backupDir, fileName);
    const latestFilePath = path.join(backupDir, 'latest_backup.json');

    const jsonContent = JSON.stringify(backupPayload, null, 2);

    fs.writeFileSync(filePath, jsonContent, 'utf8');
    fs.writeFileSync(latestFilePath, jsonContent, 'utf8');

    // 5. Clean up older backups automatically
    cleanOldBackups(backupDir);

    const fileSizeKB = (Buffer.byteLength(jsonContent, 'utf8') / 1024).toFixed(2);

    console.log('\n----------------------------------------');
    console.log('🎉 BACKUP COMPLETED SUCCESSFULLY!');
    console.log('----------------------------------------');
    console.log(`📁 File saved to: backups/${fileName} (${fileSizeKB} KB)`);
    console.log(`📁 Also updated: backups/latest_backup.json`);
    console.log(`📊 Summary:`);
    console.log(`   - 👗 Products: ${products.length}`);
    console.log(`   - 🛒 Orders:   ${orders.length}`);
    console.log('========================================\n');
  } catch (err) {
    console.error('\n❌ Backup failed with error:', err.message);
    process.exit(1);
  }
}

runBackup();
