import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all assignments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const patientId = searchParams.get("patientId");
    const caregiverId = searchParams.get("caregiverId");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = {};
    if (status) where.status = status;
    if (patientId) where.patientId = patientId;
    if (caregiverId) where.caregiverId = caregiverId;

    const [assignments, total] = await Promise.all([
      db.assignment.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          patient: true,
          caregiver: true,
          careRequest: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      db.assignment.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: assignments,
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
    console.error("Error fetching assignments:", error);
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    );
  }
}

// POST create new assignment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      patientId,
      caregiverId,
      careRequestId,
      startDate,
      endDate,
      shiftStartTime,
      shiftEndTime,
      notesForCaregiver,
      status = "active",
      notes,
    } = body;

    if (!patientId || !caregiverId || !startDate) {
      return NextResponse.json(
        { error: "Patient ID, Caregiver ID, and start date are required" },
        { status: 400 }
      );
    }

    const assignment = await db.assignment.create({
      data: {
        patientId,
        caregiverId,
        careRequestId,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        shiftStartTime: shiftStartTime ? new Date(`2000-01-01T${shiftStartTime}`) : null,
        shiftEndTime: shiftEndTime ? new Date(`2000-01-01T${shiftEndTime}`) : null,
        notesForCaregiver,
        status,
        notes,
      },
      include: {
        patient: true,
        caregiver: true,
        careRequest: true,
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return NextResponse.json(
      { error: "Failed to create assignment" },
      { status: 500 }
    );
  }
}
