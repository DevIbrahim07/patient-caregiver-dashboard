import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET single caregiver
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const caregiver = await db.caregiver.findUnique({
      where: { id },
      include: {
        assignments: {
          include: {
            patient: true,
            careRequest: true,
          },
        },
        leaveRequests: true,
        incidents: true,
      },
    });

    if (!caregiver) {
      return NextResponse.json(
        { error: "Caregiver not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(caregiver, { status: 200 });
  } catch (error) {
    console.error("Error fetching caregiver:", error);
    return NextResponse.json(
      { error: "Failed to fetch caregiver" },
      { status: 500 }
    );
  }
}

// PUT update caregiver
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Convert certificationExpiry string to Date if provided
    if (body.certificationExpiry) {
      body.certificationExpiry = new Date(body.certificationExpiry);
    }

    // Convert hourlyRate to Decimal if provided
    if (body.hourlyRate) {
      body.hourlyRate = parseFloat(body.hourlyRate);
    }

    const caregiver = await db.caregiver.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(caregiver, { status: 200 });
  } catch (error) {
    console.error("Error updating caregiver:", error);
    return NextResponse.json(
      { error: "Failed to update caregiver" },
      { status: 500 }
    );
  }
}

// DELETE caregiver
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.caregiver.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Caregiver deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting caregiver:", error);
    return NextResponse.json(
      { error: "Failed to delete caregiver" },
      { status: 500 }
    );
  }
}
