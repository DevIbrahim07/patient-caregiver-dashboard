-- Patient Caregiver Management System Database Schema
-- Initial schema setup with all core tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create guardians table
CREATE TABLE IF NOT EXISTS guardians (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone_number VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  relationship VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, inactive
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  email VARCHAR(255) UNIQUE,
  phone_number VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  medical_conditions TEXT,
  medications TEXT,
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  guardian_id UUID REFERENCES guardians(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, inactive, discharged
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create caregivers table
CREATE TABLE IF NOT EXISTS caregivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone_number VARCHAR(20),
  specialty VARCHAR(100), -- RN, LPN, CNA, etc.
  license_number VARCHAR(100),
  certification_expiry DATE,
  availability_status VARCHAR(50) NOT NULL DEFAULT 'available', -- available, unavailable, on-leave
  hourly_rate DECIMAL(10, 2),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, inactive
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create care requests table
CREATE TABLE IF NOT EXISTS care_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  guardian_id UUID NOT NULL REFERENCES guardians(id) ON DELETE CASCADE,
  care_type VARCHAR(100), -- Personal Care, Medical, Companion Care, etc.
  priority VARCHAR(50) NOT NULL DEFAULT 'normal', -- low, normal, high, urgent
  start_date DATE NOT NULL,
  end_date DATE,
  hours_per_week INTEGER,
  description TEXT,
  special_requirements TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, approved, active, completed, cancelled
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  caregiver_id UUID NOT NULL REFERENCES caregivers(id) ON DELETE CASCADE,
  care_request_id UUID REFERENCES care_requests(id) ON DELETE SET NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  shift_start_time TIME,
  shift_end_time TIME,
  notes_for_caregiver TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'active', -- pending, active, completed, cancelled
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create leave requests table
CREATE TABLE IF NOT EXISTS leave_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caregiver_id UUID NOT NULL REFERENCES caregivers(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  leave_type VARCHAR(50) NOT NULL, -- vacation, sick, personal, emergency
  reason TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  approved_by UUID REFERENCES caregivers(id), -- for admin tracking
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  caregiver_id UUID REFERENCES caregivers(id) ON DELETE SET NULL,
  assignment_id UUID REFERENCES assignments(id) ON DELETE SET NULL,
  incident_type VARCHAR(100) NOT NULL, -- Fall, Medication Error, Behavioral, etc.
  severity VARCHAR(50) NOT NULL DEFAULT 'medium', -- low, medium, high, critical
  description TEXT NOT NULL,
  actions_taken TEXT,
  reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  incident_date DATE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'open', -- open, investigating, resolved, closed
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create audit logs table for tracking changes
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name VARCHAR(100),
  record_id UUID,
  action VARCHAR(50), -- INSERT, UPDATE, DELETE
  old_values JSONB,
  new_values JSONB,
  user_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_patients_guardian_id ON patients(guardian_id);
CREATE INDEX idx_care_requests_patient_id ON care_requests(patient_id);
CREATE INDEX idx_care_requests_status ON care_requests(status);
CREATE INDEX idx_assignments_patient_id ON assignments(patient_id);
CREATE INDEX idx_assignments_caregiver_id ON assignments(caregiver_id);
CREATE INDEX idx_assignments_status ON assignments(status);
CREATE INDEX idx_leave_requests_caregiver_id ON leave_requests(caregiver_id);
CREATE INDEX idx_leave_requests_status ON leave_requests(status);
CREATE INDEX idx_incidents_patient_id ON incidents(patient_id);
CREATE INDEX idx_incidents_caregiver_id ON incidents(caregiver_id);
CREATE INDEX idx_incidents_severity ON incidents(severity);
CREATE INDEX idx_caregivers_status ON caregivers(status);
CREATE INDEX idx_caregivers_availability ON caregivers(availability_status);
CREATE INDEX idx_guardians_status ON guardians(status);
