import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET single assignment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const assignment = await db.assignment.findUnique({
      where: { id },
      include: {
        patient: true,
        caregiver: true,
        careRequest: true,
        incidents: true,
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(assignment, { status: 200 });
  } catch (error) {
    console.error("Error fetching assignment:", error);
    return NextResponse.json(
      { error: "Failed to fetch assignment" },
      { status: 500 }
    );
  }
}

// PUT update assignment
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Convert date strings to Date objects if provided
    if (body.startDate) {
      body.startDate = new Date(body.startDate);
    }
    if (body.endDate) {
      body.endDate = new Date(body.endDate);
    }
    if (body.shiftStartTime) {
      body.shiftStartTime = new Date(`2000-01-01T${body.shiftStartTime}`);
    }
    if (body.shiftEndTime) {
      body.shiftEndTime = new Date(`2000-01-01T${body.shiftEndTime}`);
    }

    const assignment = await db.assignment.update({
      where: { id },
      data: body,
      include: {
        patient: true,
        caregiver: true,
        careRequest: true,
      },
    });

    return NextResponse.json(assignment, { status: 200 });
  } catch (error) {
    console.error("Error updating assignment:", error);
    return NextResponse.json(
      { error: "Failed to update assignment" },
      { status: 500 }
    );
  }
}

// DELETE assignment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.assignment.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Assignment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting assignment:", error);
    return NextResponse.json(
      { error: "Failed to delete assignment" },
      { status: 500 }
    );
  }
}
