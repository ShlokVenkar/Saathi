import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { device_id = 'wristband_01', alert_type = 'EMERGENCY' } = body;

    console.log(`[ESP32 Hardware API] Alert received from ${device_id}: ${alert_type}`);

    return NextResponse.json(
      {
        success: true,
        message: `Hardware alert '${alert_type}' processed successfully for device '${device_id}'`,
        received: {
          device_id,
          alert_type,
          timestamp: new Date().toISOString()
        }
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  } catch (error: any) {
    console.error('[ESP32 Hardware API Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    endpoint: '/api/alert',
    description: 'SAATHI ESP32 Hardware Integration Alert Gateway',
    timestamp: new Date().toISOString()
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
