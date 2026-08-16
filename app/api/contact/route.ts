import { NextResponse } from "next/server";

type ContactBody = {
  fullName?: string;
  email?: string;
  message?: string;
  phone?: string;
  company?: string;
  website?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (body.website) {
      // Honeypot field for basic spam filtering.
      return NextResponse.json({ ok: true });
    }

    if (
      !body.fullName?.trim() ||
      !body.email?.trim() ||
      !body.message?.trim() ||
      !emailPattern.test(body.email)
    ) {
      return NextResponse.json(
        { message: "Please submit valid name, email, and message." },
        { status: 400 },
      );
    }

    // TODO: integrate with an email provider/CRM here.
    // Example: Resend, SendGrid, SES, HubSpot, etc.
    // Do not fake delivery; return explicit implementation status.
    return NextResponse.json({
      ok: true,
      message:
        "Form accepted by API. Configure provider integration in app/api/contact/route.ts for delivery.",
    });
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 },
    );
  }
}
