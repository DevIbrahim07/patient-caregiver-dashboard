import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Clear existing data in correct order (respecting foreign keys)
  await prisma.auditLog.deleteMany();
  await prisma.incident.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.careRequest.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.caregiver.deleteMany();
  await prisma.guardian.deleteMany();

  console.log("Cleared existing data");

  // Create guardians
  const guardians = await Promise.all([
    prisma.guardian.create({
      data: {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@email.com",
        phoneNumber: "555-0101",
        relationship: "Son",
        status: "active",
      },
    }),
    prisma.guardian.create({
      data: {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@email.com",
        phoneNumber: "555-0102",
        relationship: "Daughter",
        status: "active",
      },
    }),
    prisma.guardian.create({
      data: {
        firstName: "Michael",
        lastName: "Williams",
        email: "michael.williams@email.com",
        phoneNumber: "555-0103",
        relationship: "Spouse",
        status: "active",
      },
    }),
    prisma.guardian.create({
      data: {
        firstName: "Emily",
        lastName: "Brown",
        email: "emily.brown@email.com",
        phoneNumber: "555-0104",
        relationship: "Daughter",
        status: "active",
      },
    }),
    prisma.guardian.create({
      data: {
        firstName: "David",
        lastName: "Davis",
        email: "david.davis@email.com",
        phoneNumber: "555-0105",
        relationship: "Son",
        status: "active",
      },
    }),
  ]);

  console.log("Created 5 guardians");

  // Create caregivers
  const caregivers = await Promise.all([
    prisma.caregiver.create({
      data: {
        firstName: "Lisa",
        lastName: "Martinez",
        email: "lisa.martinez@email.com",
        phoneNumber: "555-0201",
        specialty: "RN",
        availabilityStatus: "available",
        hourlyRate: 45.0,
        status: "active",
      },
    }),
    prisma.caregiver.create({
      data: {
        firstName: "James",
        lastName: "Wilson",
        email: "james.wilson@email.com",
        phoneNumber: "555-0202",
        specialty: "CNA",
        availabilityStatus: "available",
        hourlyRate: 25.0,
        status: "active",
      },
    }),
    prisma.caregiver.create({
      data: {
        firstName: "Angela",
        lastName: "Moore",
        email: "angela.moore@email.com",
        phoneNumber: "555-0203",
        specialty: "LPN",
        availabilityStatus: "unavailable",
        hourlyRate: 35.0,
        status: "active",
      },
    }),
    prisma.caregiver.create({
      data: {
        firstName: "Robert",
        lastName: "Taylor",
        email: "robert.taylor@email.com",
        phoneNumber: "555-0204",
        specialty: "CNA",
        availabilityStatus: "available",
        hourlyRate: 25.0,
        status: "active",
      },
    }),
    prisma.caregiver.create({
      data: {
        firstName: "Jennifer",
        lastName: "Anderson",
        email: "jennifer.anderson@email.com",
        phoneNumber: "555-0205",
        specialty: "RN",
        availabilityStatus: "on-leave",
        hourlyRate: 45.0,
        status: "active",
      },
    }),
    prisma.caregiver.create({
      data: {
        firstName: "Christopher",
        lastName: "Thomas",
        email: "chris.thomas@email.com",
        phoneNumber: "555-0206",
        specialty: "CNA",
        availabilityStatus: "available",
        hourlyRate: 25.0,
        status: "active",
      },
    }),
    prisma.caregiver.create({
      data: {
        firstName: "Michelle",
        lastName: "Jackson",
        email: "michelle.jackson@email.com",
        phoneNumber: "555-0207",
        specialty: "LPN",
        availabilityStatus: "available",
        hourlyRate: 35.0,
        status: "active",
      },
    }),
    prisma.caregiver.create({
      data: {
        firstName: "Daniel",
        lastName: "White",
        email: "daniel.white@email.com",
        phoneNumber: "555-0208",
        specialty: "CNA",
        availabilityStatus: "available",
        hourlyRate: 25.0,
        status: "active",
      },
    }),
  ]);

  console.log("Created 8 caregivers");

  // Create patients
  const patients = await Promise.all([
    prisma.patient.create({
      data: {
        firstName: "Margaret",
        lastName: "Smith",
        dateOfBirth: new Date("1942-05-15"),
        email: "margaret.smith@email.com",
        phoneNumber: "555-0301",
        medicalConditions: "Diabetes, Arthritis",
        guardianId: guardians[0].id,
        status: "active",
      },
    }),
    prisma.patient.create({
      data: {
        firstName: "Robert",
        lastName: "Johnson",
        dateOfBirth: new Date("1938-08-22"),
        email: "robert.johnson@email.com",
        phoneNumber: "555-0302",
        medicalConditions: "Heart Disease, Hypertension",
        guardianId: guardians[1].id,
        status: "active",
      },
    }),
    prisma.patient.create({
      data: {
        firstName: "Dorothy",
        lastName: "Williams",
        dateOfBirth: new Date("1945-02-10"),
        email: "dorothy.williams@email.com",
        phoneNumber: "555-0303",
        medicalConditions: "Alzheimer's Disease",
        guardianId: guardians[2].id,
        status: "active",
      },
    }),
    prisma.patient.create({
      data: {
        firstName: "Charles",
        lastName: "Brown",
        dateOfBirth: new Date("1940-11-30"),
        email: "charles.brown@email.com",
        phoneNumber: "555-0304",
        medicalConditions: "COPD, Diabetes",
        guardianId: guardians[3].id,
        status: "active",
      },
    }),
    prisma.patient.create({
      data: {
        firstName: "Patricia",
        lastName: "Davis",
        dateOfBirth: new Date("1948-07-18"),
        email: "patricia.davis@email.com",
        phoneNumber: "555-0305",
        medicalConditions: "Joint Pain, Mobility Issues",
        guardianId: guardians[4].id,
        status: "active",
      },
    }),
  ]);

  console.log("Created 5 patients");

  // Create care requests
  const careRequests = await Promise.all([
    prisma.careRequest.create({
      data: {
        patientId: patients[0].id,
        guardianId: guardians[0].id,
        careType: "Personal Care",
        priority: "normal",
        startDate: new Date("2026-03-01"),
        endDate: new Date("2026-06-01"),
        hoursPerWeek: 40,
        status: "approved",
      },
    }),
    prisma.careRequest.create({
      data: {
        patientId: patients[1].id,
        guardianId: guardians[1].id,
        careType: "Medical Care",
        priority: "high",
        startDate: new Date("2026-03-05"),
        hoursPerWeek: 56,
        status: "active",
      },
    }),
    prisma.careRequest.create({
      data: {
        patientId: patients[2].id,
        guardianId: guardians[2].id,
        careType: "Companion Care",
        priority: "normal",
        startDate: new Date("2026-03-01"),
        hoursPerWeek: 30,
        status: "active",
      },
    }),
    prisma.careRequest.create({
      data: {
        patientId: patients[3].id,
        guardianId: guardians[3].id,
        careType: "Personal Care",
        priority: "high",
        startDate: new Date("2026-02-28"),
        hoursPerWeek: 50,
        status: "pending",
      },
    }),
    prisma.careRequest.create({
      data: {
        patientId: patients[4].id,
        guardianId: guardians[4].id,
        careType: "Medical Care",
        priority: "normal",
        startDate: new Date("2026-03-10"),
        endDate: new Date("2026-05-10"),
        hoursPerWeek: 35,
        status: "approved",
      },
    }),
  ]);

  console.log("Created 5 care requests");

  // Create assignments
  const assignments = await Promise.all([
    prisma.assignment.create({
      data: {
        patientId: patients[0].id,
        caregiverId: caregivers[0].id,
        startDate: new Date("2026-03-01"),
        endDate: new Date("2026-06-01"),
        shiftStartTime: new Date("2000-01-01T08:00:00"),
        shiftEndTime: new Date("2000-01-01T16:00:00"),
        status: "active",
      },
    }),
    prisma.assignment.create({
      data: {
        patientId: patients[1].id,
        caregiverId: caregivers[1].id,
        startDate: new Date("2026-03-05"),
        shiftStartTime: new Date("2000-01-01T09:00:00"),
        shiftEndTime: new Date("2000-01-01T17:00:00"),
        status: "active",
      },
    }),
    prisma.assignment.create({
      data: {
        patientId: patients[2].id,
        caregiverId: caregivers[6].id,
        startDate: new Date("2026-03-01"),
        shiftStartTime: new Date("2000-01-01T10:00:00"),
        shiftEndTime: new Date("2000-01-01T14:00:00"),
        status: "active",
      },
    }),
    prisma.assignment.create({
      data: {
        patientId: patients[4].id,
        caregiverId: caregivers[3].id,
        startDate: new Date("2026-03-10"),
        endDate: new Date("2026-05-10"),
        shiftStartTime: new Date("2000-01-01T08:00:00"),
        shiftEndTime: new Date("2000-01-01T16:00:00"),
        status: "pending",
      },
    }),
  ]);

  console.log("Created 4 assignments");

  // Create leave requests
  await Promise.all([
    prisma.leaveRequest.create({
      data: {
        caregiverId: caregivers[4].id,
        startDate: new Date("2026-03-15"),
        endDate: new Date("2026-03-22"),
        leaveType: "vacation",
        reason: "Family vacation",
        status: "approved",
      },
    }),
    prisma.leaveRequest.create({
      data: {
        caregiverId: caregivers[1].id,
        startDate: new Date("2026-03-20"),
        endDate: new Date("2026-03-21"),
        leaveType: "sick",
        reason: "Flu",
        status: "pending",
      },
    }),
    prisma.leaveRequest.create({
      data: {
        caregiverId: caregivers[0].id,
        startDate: new Date("2026-04-01"),
        endDate: new Date("2026-04-05"),
        leaveType: "personal",
        reason: "Personal matters",
        status: "approved",
      },
    }),
  ]);

  console.log("Created 3 leave requests");

  // Create incidents
  await Promise.all([
    prisma.incident.create({
      data: {
        patientId: patients[0].id,
        caregiverId: caregivers[0].id,
        incidentType: "Fall",
        severity: "medium",
        description: "Patient fell in bathroom",
        incidentDate: new Date("2026-03-05"),
        status: "resolved",
      },
    }),
    prisma.incident.create({
      data: {
        patientId: patients[1].id,
        caregiverId: caregivers[1].id,
        incidentType: "Medication Error",
        severity: "high",
        description: "Wrong dosage given",
        incidentDate: new Date("2026-03-04"),
        status: "investigating",
      },
    }),
    prisma.incident.create({
      data: {
        patientId: patients[4].id,
        caregiverId: caregivers[3].id,
        incidentType: "Behavioral",
        severity: "low",
        description: "Patient refused medication",
        incidentDate: new Date("2026-03-06"),
        status: "open",
      },
    }),
  ]);

  console.log("Created 3 incidents");
  console.log("Database seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
