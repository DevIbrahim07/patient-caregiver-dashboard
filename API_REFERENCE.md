# API Reference - Patient Caregiver Management System

Complete API documentation for all endpoints in the Prisma-based backend.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, no authentication is implemented. Add auth middleware before production deployment.

## Response Format

### Success Response (List)
```json
{
  "data": [
    { /* resource object */ }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### Success Response (Single)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "field": "value"
}
```

### Error Response
```json
{
  "error": "Error message describing what went wrong"
}
```

## Guardians

### List Guardians
```http
GET /api/guardians?page=1&limit=10&status=active
```

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 10) - Items per page
- `status` (string, optional) - Filter by status: active, inactive

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john@example.com",
      "phoneNumber": "555-0101",
      "address": "123 Main St",
      "city": "Springfield",
      "state": "IL",
      "zipCode": "62701",
      "relationship": "Son",
      "status": "active",
      "notes": "Primary contact",
      "createdAt": "2026-03-07T00:00:00Z",
      "updatedAt": "2026-03-07T00:00:00Z"
    }
  ],
  "pagination": { "total": 5, "page": 1, "limit": 10, "pages": 1 }
}
```

### Create Guardian
```http
POST /api/guardians
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phoneNumber": "555-0101",
  "address": "123 Main St",
  "city": "Springfield",
  "state": "IL",
  "zipCode": "62701",
  "relationship": "Son",
  "status": "active",
  "notes": "Primary contact"
}
```

**Status: 201**

### Get Guardian
```http
GET /api/guardians/{id}
```

**Response:** Returns guardian with related patients and care requests

**Status: 200 | 404**

### Update Guardian
```http
PUT /api/guardians/{id}
Content-Type: application/json

{
  "firstName": "Jane",
  "status": "inactive"
}
```

**Status: 200 | 500**

### Delete Guardian
```http
DELETE /api/guardians/{id}
```

**Response:**
```json
{ "message": "Guardian deleted successfully" }
```

**Status: 200 | 500**

---

## Patients

### List Patients
```http
GET /api/patients?page=1&limit=10&status=active&guardianId={guardianId}
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `status` (string, optional) - active, inactive, discharged
- `guardianId` (string, optional) - Filter by guardian

**Response:** List of patients with guardian info

**Status: 200**

### Create Patient
```http
POST /api/patients
Content-Type: application/json

{
  "firstName": "Margaret",
  "lastName": "Smith",
  "dateOfBirth": "1942-05-15",
  "email": "margaret@example.com",
  "phoneNumber": "555-0301",
  "address": "123 Main St",
  "city": "Springfield",
  "state": "IL",
  "zipCode": "62701",
  "medicalConditions": "Diabetes, Arthritis",
  "medications": "Metformin, Ibuprofen",
  "emergencyContactName": "John Smith",
  "emergencyContactPhone": "555-0101",
  "guardianId": "{guardianId}",
  "status": "active",
  "notes": "Diabetic care required"
}
```

**Status: 201 | 400**

### Get Patient
```http
GET /api/patients/{id}
```

**Response:** Patient with guardian, assignments, care requests, incidents

**Status: 200 | 404**

### Update Patient
```http
PUT /api/patients/{id}
Content-Type: application/json

{
  "medicalConditions": "Diabetes, Arthritis, Hypertension",
  "status": "inactive"
}
```

**Status: 200 | 500**

### Delete Patient
```http
DELETE /api/patients/{id}
```

**Status: 200 | 500**

---

## Caregivers

### List Caregivers
```http
GET /api/caregivers?page=1&limit=10&status=active&availabilityStatus=available
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `status` (string, optional) - active, inactive
- `availabilityStatus` (string, optional) - available, unavailable, on-leave

**Status: 200**

### Create Caregiver
```http
POST /api/caregivers
Content-Type: application/json

{
  "firstName": "Lisa",
  "lastName": "Martinez",
  "email": "lisa@example.com",
  "phoneNumber": "555-0201",
  "specialty": "RN",
  "licenseNumber": "RN123456",
  "certificationExpiry": "2027-12-31",
  "availabilityStatus": "available",
  "hourlyRate": 45.00,
  "address": "456 Oak Ave",
  "city": "Springfield",
  "state": "IL",
  "zipCode": "62701",
  "status": "active",
  "notes": "Experienced RN"
}
```

**Status: 201 | 400**

### Get Caregiver
```http
GET /api/caregivers/{id}
```

**Response:** Caregiver with assignments, leave requests, incidents

**Status: 200 | 404**

### Update Caregiver
```http
PUT /api/caregivers/{id}
Content-Type: application/json

{
  "availabilityStatus": "on-leave",
  "hourlyRate": 50.00
}
```

**Status: 200 | 500**

### Delete Caregiver
```http
DELETE /api/caregivers/{id}
```

**Status: 200 | 500**

---

## Care Requests

### List Care Requests
```http
GET /api/care-requests?page=1&limit=10&status=active&priority=high&patientId={patientId}
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `status` (string, optional) - pending, approved, active, completed, cancelled
- `priority` (string, optional) - low, normal, high, urgent
- `patientId` (string, optional)

**Status: 200**

### Create Care Request
```http
POST /api/care-requests
Content-Type: application/json

{
  "patientId": "{patientId}",
  "guardianId": "{guardianId}",
  "careType": "Personal Care",
  "priority": "normal",
  "startDate": "2026-03-01",
  "endDate": "2026-06-01",
  "hoursPerWeek": 40,
  "description": "Assistance with daily activities",
  "specialRequirements": "Fluent in Spanish preferred",
  "status": "pending",
  "notes": "Patient lives alone"
}
```

**Status: 201 | 400**

### Get Care Request
```http
GET /api/care-requests/{id}
```

**Response:** Care request with patient, guardian, assignments

**Status: 200 | 404**

### Update Care Request
```http
PUT /api/care-requests/{id}
Content-Type: application/json

{
  "status": "approved",
  "priority": "high"
}
```

**Status: 200 | 500**

### Delete Care Request
```http
DELETE /api/care-requests/{id}
```

**Status: 200 | 500**

---

## Assignments

### List Assignments
```http
GET /api/assignments?page=1&limit=10&status=active&patientId={patientId}&caregiverId={caregiverId}
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `status` (string, optional) - pending, active, completed, cancelled
- `patientId` (string, optional)
- `caregiverId` (string, optional)

**Status: 200**

### Create Assignment
```http
POST /api/assignments
Content-Type: application/json

{
  "patientId": "{patientId}",
  "caregiverId": "{caregiverId}",
  "careRequestId": "{careRequestId}",
  "startDate": "2026-03-01",
  "endDate": "2026-06-01",
  "shiftStartTime": "08:00",
  "shiftEndTime": "16:00",
  "notesForCaregiver": "Patient prefers morning care",
  "status": "active",
  "notes": "Daily schedule fixed"
}
```

**Status: 201 | 400**

### Get Assignment
```http
GET /api/assignments/{id}
```

**Response:** Assignment with patient, caregiver, care request, incidents

**Status: 200 | 404**

### Update Assignment
```http
PUT /api/assignments/{id}
Content-Type: application/json

{
  "status": "completed",
  "endDate": "2026-05-31"
}
```

**Status: 200 | 500**

### Delete Assignment
```http
DELETE /api/assignments/{id}
```

**Status: 200 | 500**

---

## Leave Requests

### List Leave Requests
```http
GET /api/leave-requests?page=1&limit=10&status=pending&caregiverId={caregiverId}&leaveType=vacation
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `status` (string, optional) - pending, approved, rejected
- `caregiverId` (string, optional)
- `leaveType` (string, optional) - vacation, sick, personal, emergency

**Status: 200**

### Create Leave Request
```http
POST /api/leave-requests
Content-Type: application/json

{
  "caregiverId": "{caregiverId}",
  "startDate": "2026-03-15",
  "endDate": "2026-03-22",
  "leaveType": "vacation",
  "reason": "Family vacation",
  "status": "pending",
  "notes": "Requested approved cover"
}
```

**Status: 201 | 400**

### Get Leave Request
```http
GET /api/leave-requests/{id}
```

**Response:** Leave request with caregiver and approver info

**Status: 200 | 404**

### Update Leave Request
```http
PUT /api/leave-requests/{id}
Content-Type: application/json

{
  "status": "approved",
  "approvedById": "{caregiverId}"
}
```

**Status: 200 | 500**

### Delete Leave Request
```http
DELETE /api/leave-requests/{id}
```

**Status: 200 | 500**

---

## Incidents

### List Incidents
```http
GET /api/incidents?page=1&limit=10&status=open&severity=high&patientId={patientId}&caregiverId={caregiverId}
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `status` (string, optional) - open, investigating, resolved, closed
- `severity` (string, optional) - low, medium, high, critical
- `patientId` (string, optional)
- `caregiverId` (string, optional)

**Status: 200**

### Create Incident
```http
POST /api/incidents
Content-Type: application/json

{
  "patientId": "{patientId}",
  "caregiverId": "{caregiverId}",
  "assignmentId": "{assignmentId}",
  "incidentType": "Fall",
  "severity": "medium",
  "description": "Patient fell in bathroom while using walker",
  "actionsTaken": "Called 911, patient transported to ER",
  "incidentDate": "2026-03-05",
  "reportedAt": "2026-03-05T10:30:00Z",
  "status": "open",
  "notes": "Follow-up with orthopedics needed"
}
```

**Status: 201 | 400**

### Get Incident
```http
GET /api/incidents/{id}
```

**Response:** Incident with related patient, caregiver, assignment

**Status: 200 | 404**

### Update Incident
```http
PUT /api/incidents/{id}
Content-Type: application/json

{
  "status": "resolved",
  "actionsTaken": "Patient discharged with pain management plan"
}
```

**Status: 200 | 500**

### Delete Incident
```http
DELETE /api/incidents/{id}
```

**Status: 200 | 500**

---

## Example Requests

### Using cURL

```bash
# List guardians
curl "http://localhost:3000/api/guardians?page=1&limit=10"

# Create patient
curl -X POST "http://localhost:3000/api/patients" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Margaret",
    "lastName": "Smith",
    "email": "margaret@example.com",
    "guardianId": "guardian-uuid"
  }'

# Get specific caregiver
curl "http://localhost:3000/api/caregivers/caregiver-uuid"

# Update assignment
curl -X PUT "http://localhost:3000/api/assignments/assignment-uuid" \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Using JavaScript/Fetch

```javascript
// List guardians
const response = await fetch("/api/guardians?page=1&limit=10");
const { data, pagination } = await response.json();

// Create patient
const newPatient = await fetch("/api/patients", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firstName: "Margaret",
    lastName: "Smith",
    email: "margaret@example.com",
    guardianId: "guardian-uuid",
  }),
});

// Get caregiver
const caregiver = await fetch("/api/caregivers/caregiver-uuid")
  .then(r => r.json());

// Update incident
await fetch("/api/incidents/incident-uuid", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: "resolved" }),
});
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200  | OK - Request succeeded |
| 201  | Created - Resource created successfully |
| 400  | Bad Request - Invalid input |
| 404  | Not Found - Resource not found |
| 500  | Server Error - Internal server error |

## Rate Limiting

Not implemented. Add rate limiting middleware before production.

## Pagination

All list endpoints support pagination with:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- Returns: `total`, `page`, `limit`, `pages`

## Validation

Basic required field validation is implemented. Consider adding Zod/validation library for enhanced validation before production.

## Error Handling

All errors are returned in consistent format:
```json
{ "error": "Descriptive error message" }
```

Check HTTP status code and error message for debugging.
