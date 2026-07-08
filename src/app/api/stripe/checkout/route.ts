import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: "Stripe integration is disabled in the free tier version. Upgrade to the paid version for subscription features.",
      message: "Payment processing is not available in this version. All features are available for free with account limits."
    },
    { status: 503 }
  );
}
