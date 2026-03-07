import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all guardians
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = status ? { status } : {};

    const [guardians, total] = await Promise.all([
      db.guardian.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: "desc" },
      }),
      db.guardian.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: guardians,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching guardians:", error);
    return NextResponse.json(
      { error: "Failed to fetch guardians" },
      { status: 500 }
    );
  }
}

// POST create new guardian
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      relationship,
      status = "active",
      notes,
    } = body;

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }

    const guardian = await db.guardian.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        city,
        state,
        zipCode,
        relationship,
        status,
        notes,
      },
    });

    return NextResponse.json(guardian, { status: 201 });
  } catch (error) {
    console.error("Error creating guardian:", error);
    return NextResponse.json(
      { error: "Failed to create guardian" },
      { status: 500 }
    );
  }
}
