import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, portfolio, message } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Name, email, and company are required" },
        { status: 400 }
      );
    }

    const inquiry = await db.designerInquiry.create({
      data: {
        name,
        email,
        company,
        phone: phone || "",
        portfolio: portfolio || "",
        message: message || "",
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
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
