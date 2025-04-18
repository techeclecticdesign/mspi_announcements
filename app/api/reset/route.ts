import { NextRequest, NextResponse } from 'next/server';

let message = '';
let timerEnd = 0;

export async function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'OPTIONS, POST');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return new NextResponse(null, { status: 200, headers });
}

export async function POST(req: NextRequest) {
  message = '';
  timerEnd = 0;

  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers,
  });
}
