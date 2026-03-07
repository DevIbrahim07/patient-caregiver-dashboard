import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all incidents
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const severity = searchParams.get("severity");
    const patientId = searchParams.get("patientId");
    const caregiverId = searchParams.get("caregiverId");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = {};
    if (status) where.status = status;
    if (severity) where.severity = severity;
    if (patientId) where.patientId = patientId;
    if (caregiverId) where.caregiverId = caregiverId;

    const [incidents, total] = await Promise.all([
      db.incident.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          patient: true,
          caregiver: true,
          assignment: true,
        },
        orderBy: { reportedAt: "desc" },
      }),
      db.incident.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: incidents,
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
    console.error("Error fetching incidents:", error);
    return NextResponse.json(
      { error: "Failed to fetch incidents" },
      { status: 500 }
    );
  }
}

// POST create new incident
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      patientId,
      caregiverId,
      assignmentId,
      incidentType,
      severity = "medium",
      description,
      actionsTaken,
      reportedAt,
      incidentDate,
      status = "open",
      notes,
    } = body;

    if (!patientId || !incidentType || !description || !incidentDate) {
      return NextResponse.json(
        {
          error:
            "Patient ID, incident type, description, and incident date are required",
        },
        { status: 400 }
      );
    }

    const incident = await db.incident.create({
      data: {
        patientId,
        caregiverId,
        assignmentId,
        incidentType,
        severity,
        description,
        actionsTaken,
        reportedAt: reportedAt ? new Date(reportedAt) : new Date(),
        incidentDate: new Date(incidentDate),
        status,
        notes,
      },
      include: {
        patient: true,
        caregiver: true,
        assignment: true,
      },
    });

    return NextResponse.json(incident, { status: 201 });
  } catch (error) {
    console.error("Error creating incident:", error);
    return NextResponse.json(
      { error: "Failed to create incident" },
      { status: 500 }
    );
  }
}
