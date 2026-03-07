import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET single care request
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const careRequest = await db.careRequest.findUnique({
      where: { id },
      include: {
        patient: true,
        guardian: true,
        assignments: {
          include: {
            caregiver: true,
          },
        },
      },
    });

    if (!careRequest) {
      return NextResponse.json(
        { error: "Care request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(careRequest, { status: 200 });
  } catch (error) {
    console.error("Error fetching care request:", error);
    return NextResponse.json(
      { error: "Failed to fetch care request" },
      { status: 500 }
    );
  }
}

// PUT update care request
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

    const careRequest = await db.careRequest.update({
      where: { id },
      data: body,
      include: {
        patient: true,
        guardian: true,
      },
    });

    return NextResponse.json(careRequest, { status: 200 });
  } catch (error) {
    console.error("Error updating care request:", error);
    return NextResponse.json(
      { error: "Failed to update care request" },
      { status: 500 }
    );
  }
}

// DELETE care request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.careRequest.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Care request deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting care request:", error);
    return NextResponse.json(
      { error: "Failed to delete care request" },
      { status: 500 }
    );
  }
}
