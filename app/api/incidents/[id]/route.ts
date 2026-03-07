import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET single incident
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const incident = await db.incident.findUnique({
      where: { id },
      include: {
        patient: true,
        caregiver: true,
        assignment: true,
      },
    });

    if (!incident) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(incident, { status: 200 });
  } catch (error) {
    console.error("Error fetching incident:", error);
    return NextResponse.json(
      { error: "Failed to fetch incident" },
      { status: 500 }
    );
  }
}

// PUT update incident
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Convert date strings to Date objects if provided
    if (body.reportedAt) {
      body.reportedAt = new Date(body.reportedAt);
    }
    if (body.incidentDate) {
      body.incidentDate = new Date(body.incidentDate);
    }

    const incident = await db.incident.update({
      where: { id },
      data: body,
      include: {
        patient: true,
        caregiver: true,
        assignment: true,
      },
    });

    return NextResponse.json(incident, { status: 200 });
  } catch (error) {
    console.error("Error updating incident:", error);
    return NextResponse.json(
      { error: "Failed to update incident" },
      { status: 500 }
    );
  }
}

// DELETE incident
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.incident.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Incident deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting incident:", error);
    return NextResponse.json(
      { error: "Failed to delete incident" },
      { status: 500 }
    );
  }
}
