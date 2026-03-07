import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all care requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const patientId = searchParams.get("patientId");
    const priority = searchParams.get("priority");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = {};
    if (status) where.status = status;
    if (patientId) where.patientId = patientId;
    if (priority) where.priority = priority;

    const [careRequests, total] = await Promise.all([
      db.careRequest.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          patient: true,
          guardian: true,
          assignments: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      db.careRequest.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: careRequests,
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
    console.error("Error fetching care requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch care requests" },
      { status: 500 }
    );
  }
}

// POST create new care request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      patientId,
      guardianId,
      careType,
      priority = "normal",
      startDate,
      endDate,
      hoursPerWeek,
      description,
      specialRequirements,
      status = "pending",
      notes,
    } = body;

    if (!patientId || !guardianId || !startDate) {
      return NextResponse.json(
        {
          error: "Patient ID, Guardian ID, and start date are required",
        },
        { status: 400 }
      );
    }

    const careRequest = await db.careRequest.create({
      data: {
        patientId,
        guardianId,
        careType,
        priority,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        hoursPerWeek,
        description,
        specialRequirements,
        status,
        notes,
      },
      include: {
        patient: true,
        guardian: true,
      },
    });

    return NextResponse.json(careRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating care request:", error);
    return NextResponse.json(
      { error: "Failed to create care request" },
      { status: 500 }
    );
  }
}
