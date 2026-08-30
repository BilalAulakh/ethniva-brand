import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isDownload = searchParams.get('download') === 'true';

    // 1. Fetch live products from Supabase
    const { data: products, error: prodErr } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (prodErr) throw prodErr;

    // 2. Fetch live orders from Supabase
    const { data: orders, error: ordErr } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (ordErr) throw ordErr;

    const payload = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      summary: {
        totalProducts: products?.length || 0,
        totalOrders: orders?.length || 0,
      },
      data: {
        products: products || [],
        orders: orders || [],
      },
    };

    if (isDownload) {
      const fileName = `ethniva_backup_${new Date().toISOString().split('T')[0]}.json`;
      return new NextResponse(JSON.stringify(payload, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${fileName}"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Backup generated successfully',
      summary: payload.summary,
      timestamp: payload.timestamp,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to generate backup' },
      { status: 500 }
    );
  }
}
