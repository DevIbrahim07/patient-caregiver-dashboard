import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET all patients
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const guardianId = searchParams.get("guardianId");
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = {};
    if (status) where.status = status;
    if (guardianId) where.guardianId = guardianId;

    const [patients, total] = await Promise.all([
      db.patient.findMany({
        where,
        skip,
        take: parseInt(limit),
        include: { guardian: true },
        orderBy: { createdAt: "desc" },
      }),
      db.patient.count({ where }),
    ]);

    return NextResponse.json(
      {
        data: patients,
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
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

// POST create new patient
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      phoneNumber,
      address,
      city,
      state,
      zipCode,
      medicalConditions,
      medications,
      emergencyContactName,
      emergencyContactPhone,
      guardianId,
      status = "active",
      notes,
    } = body;

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }

    const patient = await db.patient.create({
      data: {
        firstName,
        lastName,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        email,
        phoneNumber,
        address,
        city,
        state,
        zipCode,
        medicalConditions,
        medications,
        emergencyContactName,
        emergencyContactPhone,
        guardianId,
        status,
        notes,
      },
      include: { guardian: true },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}
