import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Stripe webhooks are disabled in the free tier version
  return NextResponse.json({ received: true });
}
