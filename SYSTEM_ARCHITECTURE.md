# Patient Caregiver Management System - Architecture Documentation

## Overview

A modern, scalable web application for managing patient care, caregivers, and healthcare operations. Built with Next.js 16, TypeScript, Tailwind CSS, and Supabase for a production-ready healthcare management platform.

## Technology Stack

- **Frontend Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **State Management**: React hooks, SWR for data fetching
- **Authentication**: Supabase Auth (to be implemented)

## Database Schema

### Core Tables

1. **guardians** - Patient legal guardians/family members
   - Fields: id, first_name, last_name, email, phone_number, address, relationship, status, notes
   - Indexes: email (unique), status

2. **patients** - Patients requiring care
   - Fields: id, first_name, last_name, date_of_birth, email, medical_conditions, medications, emergency_contact, guardian_id, status, notes
   - Relationships: References guardians table
   - Indexes: email (unique), guardian_id, status

3. **caregivers** - Healthcare professionals and caregivers
   - Fields: id, first_name, last_name, email, specialty, license_number, certification_expiry, availability_status, hourly_rate, status, notes
   - Indexes: email (unique), status, availability_status

4. **care_requests** - Formal requests for care from guardians
   - Fields: id, patient_id, guardian_id, care_type, priority, start_date, end_date, hours_per_week, status, notes
   - Relationships: patient_id, guardian_id
   - Indexes: patient_id, status, priority

5. **assignments** - Assignments of caregivers to patients
   - Fields: id, patient_id, caregiver_id, care_request_id, start_date, end_date, shift_start_time, shift_end_time, status, notes
   - Relationships: patient_id, caregiver_id, care_request_id
   - Indexes: patient_id, caregiver_id, status

6. **leave_requests** - Caregiver leave requests
   - Fields: id, caregiver_id, start_date, end_date, leave_type, reason, status, approved_by, notes
   - Relationships: caregiver_id
   - Indexes: caregiver_id, status

7. **incidents** - Patient care incidents and adverse events
   - Fields: id, patient_id, caregiver_id, assignment_id, incident_type, severity, description, actions_taken, incident_date, status, notes
   - Relationships: patient_id, caregiver_id, assignment_id
   - Indexes: patient_id, caregiver_id, severity

8. **audit_logs** - Activity audit trail for compliance
   - Fields: id, table_name, record_id, action, old_values, new_values, user_id, created_at
   - Purpose: Track all data modifications for regulatory compliance

## Application Structure

```
app/
├── (dashboard)/              # Route group for authenticated dashboard
│   ├── layout.tsx           # Dashboard wrapper with sidebar & header
│   ├── dashboard/           # Home dashboard
│   │   └── page.tsx
│   ├── guardians/           # Guardian management
│   │   └── page.tsx
│   ├── caregivers/          # Caregiver management
│   │   └── page.tsx
│   ├── care-requests/       # Care request management
│   │   └── page.tsx
│   ├── assignments/         # Assignment management
│   │   └── page.tsx
│   ├── leave-requests/      # Leave request management
│   │   └── page.tsx
│   ├── incidents/           # Incident tracking
│   │   └── page.tsx
│   └── settings/            # System settings
│       └── page.tsx
├── layout.tsx               # Root layout
└── page.tsx                 # Home page (redirects to /dashboard)

components/
├── sidebar.tsx              # Navigation sidebar
├── header.tsx               # Top header bar
├── mobile-nav.tsx           # Mobile navigation
├── stat-card.tsx            # Reusable stat card component
├── theme-provider.tsx       # Theme configuration
└── ui/                      # shadcn/ui components
    ├── button.tsx
    ├── input.tsx
    ├── dropdown-menu.tsx
    └── ... (40+ additional components)
```

## Key Features

### Dashboard (Home)
- Overview statistics (patients, caregivers, requests, incidents)
- Recent assignments table
- Quick action buttons
- System status indicators
- Responsive layout for mobile and desktop

### Guardians Module
- List all guardians with search functionality
- View guardian details
- Add/edit/delete guardians
- Track patient associations
- Contact information management

### Caregivers Module
- Manage caregiver profiles and credentials
- Track availability status
- Monitor hourly rates
- View active assignments
- License and certification management
- Specialty tracking

### Care Requests Module
- Create and track care requests
- Priority-based filtering (low, normal, high, urgent)
- Status tracking (pending, approved, active, completed)
- Associate requests with patients and guardians
- Define care types and hour requirements

### Assignments Module
- Create caregiver-to-patient assignments
- Define shift times
- Track assignment status
- Link to care requests
- View assignment history

### Leave Requests Module
- Submit leave requests (vacation, sick, personal, emergency)
- Track request status
- Admin approval/rejection
- View caregiver availability impact

### Incidents Module
- Report care incidents and adverse events
- Categorize by severity (low, medium, high, critical)
- Track resolution status
- Document actions taken
- Maintain incident history

### Settings Module
- Organization information management
- Notification preferences
- User management
- Backup and security options
- Audit and compliance settings

## Design System

### Color Palette
- **Primary**: Blue (`oklch(0.526 0.205 262)`) - Trust and healthcare focus
- **Background**: White light mode, Dark gray dark mode
- **Accent**: Subtle grays for UI elements
- **Destructive**: Red for delete actions
- **Status Colors**:
  - Green: Active, Available, Approved
  - Yellow: Pending, On Leave
  - Orange: High Priority
  - Red: Critical, Urgent
  - Blue: Information

### Typography
- **Font**: Geist (sans-serif) - Modern, professional
- **Mono Font**: Geist Mono - Code and data
- **Line Height**: 1.4-1.6 for readability

### Responsive Design
- Mobile-first approach
- Desktop sidebar navigation (hidden on mobile)
- Mobile drawer navigation
- Responsive tables with horizontal scrolling
- Touch-friendly button sizes

## Component Architecture

### Layout Components
- **Dashboard Layout**: Provides sidebar + header + main content area
- **Sidebar**: Navigation menu with active route detection
- **Header**: Top bar with notifications and user menu
- **Stat Card**: Reusable metric display component

### Page Patterns
All module pages follow consistent patterns:
- Header with page title and description
- Action button (Add/Create/New)
- Search/filter bar
- Data table with columns
- Action buttons (View, Edit, Delete)
- Empty state messaging

### Table Features
- Responsive horizontal scrolling
- Hover effects for better UX
- Status badge indicators
- Quick action buttons
- Search functionality
- Sortable columns (ready for enhancement)

## Security Features (To Be Implemented)

- User authentication via Supabase Auth
- Row-Level Security (RLS) policies
- Role-based access control (Admin, Manager, Staff)
- Audit logging for all modifications
- Encrypted sensitive data (SSN, medical records)
- Two-factor authentication support
- HIPAA compliance considerations

## API Integration Points

The following APIs will be connected to Supabase:

```typescript
// Example fetch patterns to implement:
GET /api/guardians - List guardians
POST /api/guardians - Create guardian
PUT /api/guardians/[id] - Update guardian
DELETE /api/guardians/[id] - Delete guardian

// Similar patterns for all other modules:
- /api/patients
- /api/caregivers
- /api/care-requests
- /api/assignments
- /api/leave-requests
- /api/incidents
```

## Performance Considerations

- Server-side data fetching where possible
- Client-side caching with SWR
- Optimized database queries with proper indexes
- Pagination for large datasets (to implement)
- Image optimization for patient/caregiver photos
- CSS-in-JS optimization with Tailwind

## Development Workflow

1. **Local Development**: `npm run dev` or `pnpm dev`
2. **Database Setup**: Execute SQL migrations in Supabase console
3. **Component Development**: Build components in isolation
4. **Testing**: Add unit and integration tests
5. **Deployment**: Push to GitHub, deploy via Vercel

## Future Enhancements

- Real-time notifications (WebSockets)
- Document management (patient records, certifications)
- Payment processing for care services
- Mobile app (React Native)
- Advanced analytics and reporting
- Integration with EHR systems
- SMS/Email notifications
- Video call capabilities for remote consultations
- Scheduling and calendar features
- Expense tracking and billing

## Environment Variables Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Optional: Analytics, monitoring, etc.
```

## Database Migration Guide

1. Open Supabase console
2. Navigate to SQL Editor
3. Execute scripts in order:
   - `scripts/01_init_schema.sql` - Create all tables and indexes
   - `scripts/02_seed_data.sql` - Insert sample data for development

## Testing the Application

1. Start development server: `pnpm dev`
2. Navigate to `http://localhost:3000`
3. Auto-redirects to `/dashboard`
4. Explore all modules using sidebar navigation
5. Test responsive design by resizing browser window

## Compliance and Regulations

- **HIPAA**: Healthcare Privacy and Security Rule
- **GDPR**: Data protection and privacy
- **State Licensing**: Caregiver credential verification
- **Documentation**: Incident reporting and audit trails

---

**Created**: March 2024  
**Version**: 1.0.0  
**Status**: Foundation Complete - Ready for Backend Integration
