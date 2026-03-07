import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET single leave request
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const leaveRequest = await db.leaveRequest.findUnique({
      where: { id },
      include: {
        caregiver: true,
        approvedBy: true,
      },
    });

    if (!leaveRequest) {
      return NextResponse.json(
        { error: "Leave request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(leaveRequest, { status: 200 });
  } catch (error) {
    console.error("Error fetching leave request:", error);
    return NextResponse.json(
      { error: "Failed to fetch leave request" },
      { status: 500 }
    );
  }
}

// PUT update leave request
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

    const leaveRequest = await db.leaveRequest.update({
      where: { id },
      data: body,
      include: {
        caregiver: true,
        approvedBy: true,
      },
    });

    return NextResponse.json(leaveRequest, { status: 200 });
  } catch (error) {
    console.error("Error updating leave request:", error);
    return NextResponse.json(
      { error: "Failed to update leave request" },
      { status: 500 }
    );
  }
}

// DELETE leave request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.leaveRequest.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Leave request deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting leave request:", error);
    return NextResponse.json(
      { error: "Failed to delete leave request" },
      { status: 500 }
    );
  }
}
