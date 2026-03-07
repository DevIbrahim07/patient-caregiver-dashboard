import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all caregivers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const availabilityStatus = searchParams.get("availabilityStatus");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = {};
    if (status) where.status = status;
    if (availabilityStatus) where.availabilityStatus = availabilityStatus;

    const [caregivers, total] = await Promise.all([
      db.caregiver.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: "desc" },
      }),
      db.caregiver.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: caregivers,
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
    console.error("Error fetching caregivers:", error);
    return NextResponse.json(
      { error: "Failed to fetch caregivers" },
      { status: 500 }
    );
  }
}

// POST create new caregiver
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      specialty,
      licenseNumber,
      certificationExpiry,
      availabilityStatus = "available",
      hourlyRate,
      address,
      city,
      state,
      zipCode,
      status = "active",
      notes,
    } = body;

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }

    const caregiver = await db.caregiver.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        specialty,
        licenseNumber,
        certificationExpiry: certificationExpiry
          ? new Date(certificationExpiry)
          : null,
        availabilityStatus,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        address,
        city,
        state,
        zipCode,
        status,
        notes,
      },
    });

    return NextResponse.json(caregiver, { status: 201 });
  } catch (error) {
    console.error("Error creating caregiver:", error);
    return NextResponse.json(
      { error: "Failed to create caregiver" },
      { status: 500 }
    );
  }
}
