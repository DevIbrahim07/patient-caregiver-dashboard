import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET single guardian
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const guardian = await db.guardian.findUnique({
      where: { id },
      include: {
        patients: true,
        careRequests: true,
      },
    });

    if (!guardian) {
      return NextResponse.json(
        { error: "Guardian not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(guardian, { status: 200 });
  } catch (error) {
    console.error("Error fetching guardian:", error);
    return NextResponse.json(
      { error: "Failed to fetch guardian" },
      { status: 500 }
    );
  }
}

// PUT update guardian
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const guardian = await db.guardian.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(guardian, { status: 200 });
  } catch (error) {
    console.error("Error updating guardian:", error);
    return NextResponse.json(
      { error: "Failed to update guardian" },
      { status: 500 }
    );
  }
}

// DELETE guardian
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.guardian.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Guardian deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting guardian:", error);
    return NextResponse.json(
      { error: "Failed to delete guardian" },
      { status: 500 }
    );
  }
}
