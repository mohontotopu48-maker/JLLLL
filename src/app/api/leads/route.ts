import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Basic email validation
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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

const VALID_PROJECT_TYPES = ["luxury-home", "commercial", "marine", "classic-auto"];
const VALID_SERVICE_TYPES = ["full-reupholstery", "custom-build", "repair"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, serviceType, photos, message, source } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!phone || typeof phone !== "string" || phone.trim().length < 7) {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 });
    }
    if (!projectType || !VALID_PROJECT_TYPES.includes(projectType)) {
      return NextResponse.json({ error: "Valid project type is required" }, { status: 400 });
    }
    if (!serviceType || !VALID_SERVICE_TYPES.includes(serviceType)) {
      return NextResponse.json({ error: "Valid service type is required" }, { status: 400 });
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
    // Returns only count metadata for public-facing site.
    // Full lead data should be accessed through an admin panel with auth.
    const count = await db.lead.count();

    return NextResponse.json({ totalLeads: count });
  } catch (error) {
    console.error("Leads fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
