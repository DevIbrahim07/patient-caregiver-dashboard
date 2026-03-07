import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all leave requests
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const caregiverId = searchParams.get("caregiverId");
    const leaveType = searchParams.get("leaveType");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = {};
    if (status) where.status = status;
    if (caregiverId) where.caregiverId = caregiverId;
    if (leaveType) where.leaveType = leaveType;

    const [leaveRequests, total] = await Promise.all([
      db.leaveRequest.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: {
          caregiver: true,
          approvedBy: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      db.leaveRequest.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: leaveRequests,
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
    console.error("Error fetching leave requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch leave requests" },
      { status: 500 }
    );
  }
}

// POST create new leave request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      caregiverId,
      startDate,
      endDate,
      leaveType,
      reason,
      status = "pending",
      approvedById,
      notes,
    } = body;

    if (!caregiverId || !startDate || !endDate || !leaveType) {
      return NextResponse.json(
        {
          error:
            "Caregiver ID, start date, end date, and leave type are required",
        },
        { status: 400 }
      );
    }

    const leaveRequest = await db.leaveRequest.create({
      data: {
        caregiverId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        leaveType,
        reason,
        status,
        approvedById,
        notes,
      },
      include: {
        caregiver: true,
        approvedBy: true,
      },
    });

    return NextResponse.json(leaveRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating leave request:", error);
    return NextResponse.json(
      { error: "Failed to create leave request" },
      { status: 500 }
    );
  }
}
