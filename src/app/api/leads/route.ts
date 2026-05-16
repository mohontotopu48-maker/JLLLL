import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Lead quality scoring based on project type
function calculateLeadScore(projectType: string, serviceType: string): number {
  const projectScores: Record<string, number> = {
    "luxury-home": 85,
    commercial: 90,
    marine: 75,
    "classic-auto": 80,
  };

  const serviceScores: Record<string, number> = {
    "full-reupholstery": 90,
    "custom-build": 95,
    repair: 60,
  };

  const projectScore = projectScores[projectType] || 50;
  const serviceScore = serviceScores[serviceType] || 50;

  // Weighted average: project type 40%, service type 60%
  return Math.round(projectScore * 0.4 + serviceScore * 0.6);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, serviceType, photos, message, source } = body;

    // Validation
    if (!name || !email || !phone || !projectType || !serviceType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const leadScore = calculateLeadScore(projectType, serviceType);

    const lead = await db.lead.create({
      data: {
        name,
        email,
        phone,
        projectType,
        serviceType,
        photos: JSON.stringify(photos || []),
        message: message || "",
        leadScore,
        source: source || "website",
      },
    });

    return NextResponse.json(
      {
        success: true,
        lead: {
          id: lead.id,
          leadScore: lead.leadScore,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Leads fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
