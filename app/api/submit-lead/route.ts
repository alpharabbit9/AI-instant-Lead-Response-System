import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || "https://your-n8n-instance.com/webhook/real-estate-lead";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName, email, location, propertyType, budget, message } = body;

    if (!fullName || !email || !location || !propertyType || !budget) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const payload = {
      timestamp: new Date().toISOString(),
      name: fullName,
      email,
      location,
      property: propertyType,
      budget,
      message: message || "",
    };

    const webhookResponse = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      console.error("n8n webhook error:", webhookResponse.status, await webhookResponse.text());
      return NextResponse.json(
        { error: "Automation service temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully",
      steps: [
        { id: "received", label: "Request received", done: true },
        { id: "response", label: "Response sent to your email", done: true },
        { id: "followup", label: "Follow-up sequence scheduled", done: true },
      ],
    });
  } catch (err) {
    console.error("Submit lead error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
