// /pages/api/message.ts

import { NextRequest, NextResponse } from 'next/server';

let message = '';
let timerEnd = 0;

export async function POST(req: NextRequest) {
  const { message: newMessage } = await req.json();

  if (newMessage === '') {
    // Clear the message and reset the timer to stop the announcement
    message = '';
    timerEnd = 0;
  } else {
    // Set the new message and start a 10-minute timer
    message = newMessage;
    timerEnd = Date.now() + 10 * 60 * 1000;
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  const timeRemaining = Math.max(0, timerEnd - Date.now());
  return NextResponse.json({ message, timeRemaining });
}
