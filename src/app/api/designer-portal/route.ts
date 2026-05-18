import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, portfolio, message } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!company || typeof company !== "string" || company.trim().length === 0) {
      return NextResponse.json({ error: "Company is required" }, { status: 400 });
    }

    const inquiry = await db.designerInquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company.trim(),
        phone: (phone && typeof phone === "string") ? phone.trim() : "",
        portfolio: (portfolio && typeof portfolio === "string") ? portfolio.trim() : "",
        message: (message && typeof message === "string") ? message.trim() : "",
      },
    });

    return NextResponse.json(
      {
        success: true,
        inquiry: {
          id: inquiry.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Designer inquiry error:", error);
    return NextResponse.json(
      { error: "Unable to process your request. Please try again later." },
      { status: 500 }
    );
  }
}
