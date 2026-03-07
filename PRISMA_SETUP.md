# Prisma ORM Integration Guide

This document provides instructions for setting up and using Prisma ORM with the Patient Caregiver Management System.

## Overview

The application has been refactored to use **Prisma ORM** with **PostgreSQL** as the database. This provides a clean, type-safe database abstraction layer with automatic migrations and seed data management.

## Architecture

### Database Layer
- **ORM**: Prisma Client
- **Database**: PostgreSQL
- **Connection Pool**: pg (native PostgreSQL driver)

### API Layer
- **Framework**: Next.js 16 App Router
- **Route Handlers**: RESTful API endpoints in `app/api/` directory
- **Response Format**: JSON with pagination support

### File Structure

```
/vercel/share/v0-project/
├── prisma/
│   ├── schema.prisma          # Prisma schema definition
│   ├── migrations/            # Auto-generated migrations (created after first migrate)
│   └── seed.ts                # Seed script for sample data
├── lib/
│   └── db.ts                  # Prisma Client singleton instance
├── app/api/
│   ├── guardians/             # Guardians CRUD endpoints
│   ├── patients/              # Patients CRUD endpoints
│   ├── caregivers/            # Caregivers CRUD endpoints
│   ├── care-requests/         # Care Requests CRUD endpoints
│   ├── assignments/           # Assignments CRUD endpoints
│   ├── leave-requests/        # Leave Requests CRUD endpoints
│   └── incidents/             # Incidents CRUD endpoints
├── .env.local                 # Local environment variables
├── .env.example               # Example environment file
└── package.json               # Project dependencies and scripts
```

## Setup Instructions

### 1. Install Dependencies

```bash
pnpm install
```

This will install all dependencies including Prisma and pg (PostgreSQL driver).

### 2. Configure Environment Variables

Create or update `.env.local` with your PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/patient_caregiver_db"
```

**Connection String Format:**
- PostgreSQL local: `postgresql://user:password@localhost:5432/dbname`
- PostgreSQL remote: `postgresql://user:password@host:port/dbname`
- With SSL: `postgresql://user:password@host:5432/dbname?sslmode=require`

### 3. Run Database Migration

Generate and apply the migration to your PostgreSQL database:

```bash
pnpm prisma:migrate
```

This will:
- Generate a new migration based on your schema changes
- Apply the migration to the database
- Create all tables and indexes

**For subsequent schema changes**, run the same command to generate incremental migrations.

### 4. Seed Sample Data (Optional)

Populate the database with sample data for testing:

```bash
pnpm prisma:seed
```

This will:
- Clear existing data (for development)
- Create 5 guardians
- Create 8 caregivers
- Create 5 patients
- Create 5 care requests
- Create 4 assignments
- Create 3 leave requests
- Create 3 incidents

### 5. View Database (Optional)

Open Prisma Studio to browse and edit data visually:

```bash
pnpm prisma:studio
```

## Database Schema

### Models

#### Guardian
```
- id (UUID, Primary Key)
- firstName, lastName
- email, phoneNumber
- address, city, state, zipCode
- relationship (e.g., "Son", "Daughter")
- status (active, inactive)
- notes
- Relations: patients, careRequests
```

#### Patient
```
- id (UUID, Primary Key)
- firstName, lastName
- dateOfBirth
- email, phoneNumber
- address, city, state, zipCode
- medicalConditions, medications
- emergencyContactName, emergencyContactPhone
- guardianId (Foreign Key)
- status (active, inactive, discharged)
- notes
- Relations: guardian, careRequests, assignments, incidents
```

#### Caregiver
```
- id (UUID, Primary Key)
- firstName, lastName
- email, phoneNumber
- specialty (RN, LPN, CNA, etc.)
- licenseNumber, certificationExpiry
- availabilityStatus (available, unavailable, on-leave)
- hourlyRate (Decimal)
- address, city, state, zipCode
- status (active, inactive)
- notes
- Relations: assignments, incidents, leaveRequests
```

#### CareRequest
```
- id (UUID, Primary Key)
- patientId (Foreign Key)
- guardianId (Foreign Key)
- careType (Personal Care, Medical, Companion Care, etc.)
- priority (low, normal, high, urgent)
- startDate, endDate
- hoursPerWeek
- description, specialRequirements
- status (pending, approved, active, completed, cancelled)
- notes
- Relations: patient, guardian, assignments
```

#### Assignment
```
- id (UUID, Primary Key)
- patientId (Foreign Key)
- caregiverId (Foreign Key)
- careRequestId (Foreign Key, nullable)
- startDate, endDate
- shiftStartTime, shiftEndTime
- notesForCaregiver
- status (pending, active, completed, cancelled)
- notes
- Relations: patient, caregiver, careRequest, incidents
```

#### LeaveRequest
```
- id (UUID, Primary Key)
- caregiverId (Foreign Key)
- approvedById (Foreign Key, nullable - references Caregiver)
- startDate, endDate
- leaveType (vacation, sick, personal, emergency)
- reason
- status (pending, approved, rejected)
- notes
- Relations: caregiver, approvedBy (Caregiver)
```

#### Incident
```
- id (UUID, Primary Key)
- patientId (Foreign Key)
- caregiverId (Foreign Key, nullable)
- assignmentId (Foreign Key, nullable)
- incidentType (Fall, Medication Error, Behavioral, etc.)
- severity (low, medium, high, critical)
- description
- actionsTaken
- reportedAt, incidentDate
- status (open, investigating, resolved, closed)
- notes
- Relations: patient, caregiver, assignment
```

#### AuditLog
```
- id (UUID, Primary Key)
- tableName
- recordId
- action (INSERT, UPDATE, DELETE)
- oldValues (JSON)
- newValues (JSON)
- userId
- createdAt
```

## API Endpoints

### Guardians
- `GET /api/guardians` - List all guardians (paginated)
- `POST /api/guardians` - Create new guardian
- `GET /api/guardians/[id]` - Get guardian details
- `PUT /api/guardians/[id]` - Update guardian
- `DELETE /api/guardians/[id]` - Delete guardian

**Query Parameters**: `?status=active&page=1&limit=10`

### Patients
- `GET /api/patients` - List all patients (paginated)
- `POST /api/patients` - Create new patient
- `GET /api/patients/[id]` - Get patient details
- `PUT /api/patients/[id]` - Update patient
- `DELETE /api/patients/[id]` - Delete patient

**Query Parameters**: `?status=active&guardianId=xxx&page=1&limit=10`

### Caregivers
- `GET /api/caregivers` - List all caregivers (paginated)
- `POST /api/caregivers` - Create new caregiver
- `GET /api/caregivers/[id]` - Get caregiver details
- `PUT /api/caregivers/[id]` - Update caregiver
- `DELETE /api/caregivers/[id]` - Delete caregiver

**Query Parameters**: `?status=active&availabilityStatus=available&page=1&limit=10`

### Care Requests
- `GET /api/care-requests` - List all care requests (paginated)
- `POST /api/care-requests` - Create new care request
- `GET /api/care-requests/[id]` - Get care request details
- `PUT /api/care-requests/[id]` - Update care request
- `DELETE /api/care-requests/[id]` - Delete care request

**Query Parameters**: `?status=active&priority=high&patientId=xxx&page=1&limit=10`

### Assignments
- `GET /api/assignments` - List all assignments (paginated)
- `POST /api/assignments` - Create new assignment
- `GET /api/assignments/[id]` - Get assignment details
- `PUT /api/assignments/[id]` - Update assignment
- `DELETE /api/assignments/[id]` - Delete assignment

**Query Parameters**: `?status=active&patientId=xxx&caregiverId=xxx&page=1&limit=10`

### Leave Requests
- `GET /api/leave-requests` - List all leave requests (paginated)
- `POST /api/leave-requests` - Create new leave request
- `GET /api/leave-requests/[id]` - Get leave request details
- `PUT /api/leave-requests/[id]` - Update leave request
- `DELETE /api/leave-requests/[id]` - Delete leave request

**Query Parameters**: `?status=pending&caregiverId=xxx&leaveType=vacation&page=1&limit=10`

### Incidents
- `GET /api/incidents` - List all incidents (paginated)
- `POST /api/incidents` - Create new incident
- `GET /api/incidents/[id]` - Get incident details
- `PUT /api/incidents/[id]` - Update incident
- `DELETE /api/incidents/[id]` - Delete incident

**Query Parameters**: `?status=open&severity=high&patientId=xxx&caregiverId=xxx&page=1&limit=10`

## API Response Format

### Success Response (List)
```json
{
  "data": [
    { "id": "...", "firstName": "John", ... }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

### Success Response (Single/Create)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "firstName": "John",
  "lastName": "Smith",
  ...
}
```

### Error Response
```json
{
  "error": "Failed to fetch guardian"
}
```

## Prisma Best Practices

### 1. Using the Database Client
```typescript
import { db } from "@/lib/db";

// Create
const guardian = await db.guardian.create({
  data: { firstName: "John", lastName: "Smith" },
});

// Read
const guardian = await db.guardian.findUnique({
  where: { id: guardianId },
  include: { patients: true },
});

// Update
const updated = await db.guardian.update({
  where: { id: guardianId },
  data: { firstName: "Jane" },
});

// Delete
await db.guardian.delete({ where: { id: guardianId } });

// List with pagination
const [guardians, total] = await Promise.all([
  db.guardian.findMany({
    skip: 0,
    take: 10,
    orderBy: { createdAt: "desc" },
  }),
  db.guardian.count(),
]);
```

### 2. Relationships
```typescript
// Include related data
const patient = await db.patient.findUnique({
  where: { id: patientId },
  include: {
    guardian: true,
    assignments: { include: { caregiver: true } },
  },
});

// Connect on creation
const patient = await db.patient.create({
  data: {
    firstName: "Margaret",
    guardianId: guardianId, // Direct foreign key
  },
});
```

### 3. Filtering
```typescript
// Single filter
const activeGuardians = await db.guardian.findMany({
  where: { status: "active" },
});

// Multiple filters
const results = await db.assignment.findMany({
  where: {
    status: "active",
    patientId: patientId,
    caregiver: { availabilityStatus: "available" },
  },
});
```

## Deployment Considerations

### Vercel
1. Add `DATABASE_URL` to environment variables in Vercel project settings
2. Run migrations in build script or manually before deployment
3. Ensure PostgreSQL instance is accessible from Vercel

### Environment Variables
- Development: `.env.local`
- Production: Set via hosting platform's environment variables UI

### Database Connection
- Ensure PostgreSQL allows connections from your deployment environment
- Use connection pooling for serverless functions (Prisma manages this automatically)

## Troubleshooting

### Migration Issues
```bash
# Reset database (development only!)
pnpm prisma migrate reset

# Show migration status
pnpm prisma migrate status

# Create empty migration
pnpm prisma migrate dev --name add_field
```

### Connection Issues
- Verify `DATABASE_URL` is correctly set
- Ensure PostgreSQL server is running
- Check firewall/network rules allow connections
- Test connection: `psql "postgresql://user:password@host:port/dbname"`

### Schema Issues
- Review `prisma/schema.prisma` for syntax errors
- Run `pnpm prisma validate` to check schema
- Check migration files in `prisma/migrations/`

## Next Steps

1. **Connect Frontend to API**: Update dashboard pages to fetch from `/api/` endpoints
2. **Add Authentication**: Implement authentication layer (auth.js, Clerk, etc.)
3. **Add Validation**: Use Zod/Validation library in API routes
4. **Error Handling**: Implement comprehensive error handling in routes
5. **Logging**: Add structured logging for debugging and monitoring
6. **Testing**: Write tests for API endpoints and business logic

## References

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma PostgreSQL Guide](https://www.prisma.io/docs/orm/overview/databases/postgresql)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
