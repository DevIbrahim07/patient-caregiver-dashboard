-- Seed data for Patient Caregiver Management System

-- Insert guardians
INSERT INTO guardians (first_name, last_name, email, phone_number, relationship, status) VALUES
('John', 'Smith', 'john.smith@email.com', '555-0101', 'Son', 'active'),
('Sarah', 'Johnson', 'sarah.johnson@email.com', '555-0102', 'Daughter', 'active'),
('Michael', 'Williams', 'michael.williams@email.com', '555-0103', 'Spouse', 'active'),
('Emily', 'Brown', 'emily.brown@email.com', '555-0104', 'Daughter', 'active'),
('David', 'Davis', 'david.davis@email.com', '555-0105', 'Son', 'active');

-- Insert caregivers
INSERT INTO caregivers (first_name, last_name, email, phone_number, specialty, availability_status, hourly_rate, status) VALUES
('Lisa', 'Martinez', 'lisa.martinez@email.com', '555-0201', 'RN', 'available', 45.00, 'active'),
('James', 'Wilson', 'james.wilson@email.com', '555-0202', 'CNA', 'available', 25.00, 'active'),
('Angela', 'Moore', 'angela.moore@email.com', '555-0203', 'LPN', 'unavailable', 35.00, 'active'),
('Robert', 'Taylor', 'robert.taylor@email.com', '555-0204', 'CNA', 'available', 25.00, 'active'),
('Jennifer', 'Anderson', 'jennifer.anderson@email.com', '555-0205', 'RN', 'on-leave', 45.00, 'active'),
('Christopher', 'Thomas', 'chris.thomas@email.com', '555-0206', 'CNA', 'available', 25.00, 'active'),
('Michelle', 'Jackson', 'michelle.jackson@email.com', '555-0207', 'LPN', 'available', 35.00, 'active'),
('Daniel', 'White', 'daniel.white@email.com', '555-0208', 'CNA', 'available', 25.00, 'active');

-- Insert patients
INSERT INTO patients (first_name, last_name, date_of_birth, email, phone_number, medical_conditions, guardian_id, status) VALUES
('Margaret', 'Smith', '1942-05-15', 'margaret.smith@email.com', '555-0301', 'Diabetes, Arthritis', (SELECT id FROM guardians WHERE email='john.smith@email.com'), 'active'),
('Robert', 'Johnson', '1938-08-22', 'robert.johnson@email.com', '555-0302', 'Heart Disease, Hypertension', (SELECT id FROM guardians WHERE email='sarah.johnson@email.com'), 'active'),
('Dorothy', 'Williams', '1945-02-10', 'dorothy.williams@email.com', '555-0303', 'Alzheimer''s Disease', (SELECT id FROM guardians WHERE email='michael.williams@email.com'), 'active'),
('Charles', 'Brown', '1940-11-30', 'charles.brown@email.com', '555-0304', 'COPD, Diabetes', (SELECT id FROM guardians WHERE email='emily.brown@email.com'), 'active'),
('Patricia', 'Davis', '1948-07-18', 'patricia.davis@email.com', '555-0305', 'Joint Pain, Mobility Issues', (SELECT id FROM guardians WHERE email='david.davis@email.com'), 'active');

-- Insert care requests
INSERT INTO care_requests (patient_id, guardian_id, care_type, priority, start_date, end_date, hours_per_week, status) VALUES
((SELECT id FROM patients WHERE email='margaret.smith@email.com'), (SELECT id FROM guardians WHERE email='john.smith@email.com'), 'Personal Care', 'normal', '2026-03-01', '2026-06-01', 40, 'approved'),
((SELECT id FROM patients WHERE email='robert.johnson@email.com'), (SELECT id FROM guardians WHERE email='sarah.johnson@email.com'), 'Medical Care', 'high', '2026-03-05', NULL, 56, 'active'),
((SELECT id FROM patients WHERE email='dorothy.williams@email.com'), (SELECT id FROM guardians WHERE email='michael.williams@email.com'), 'Companion Care', 'normal', '2026-03-01', NULL, 30, 'active'),
((SELECT id FROM patients WHERE email='charles.brown@email.com'), (SELECT id FROM guardians WHERE email='emily.brown@email.com'), 'Personal Care', 'high', '2026-02-28', NULL, 50, 'pending'),
((SELECT id FROM patients WHERE email='patricia.davis@email.com'), (SELECT id FROM guardians WHERE email='david.davis@email.com'), 'Medical Care', 'normal', '2026-03-10', '2026-05-10', 35, 'approved');

-- Insert assignments
INSERT INTO assignments (patient_id, caregiver_id, care_request_id, start_date, end_date, shift_start_time, shift_end_time, status) VALUES
((SELECT id FROM patients WHERE email='margaret.smith@email.com'), (SELECT id FROM caregivers WHERE email='lisa.martinez@email.com'), NULL, '2026-03-01', '2026-06-01', '08:00:00', '16:00:00', 'active'),
((SELECT id FROM patients WHERE email='robert.johnson@email.com'), (SELECT id FROM caregivers WHERE email='james.wilson@email.com'), NULL, '2026-03-05', NULL, '09:00:00', '17:00:00', 'active'),
((SELECT id FROM patients WHERE email='dorothy.williams@email.com'), (SELECT id FROM caregivers WHERE email='michelle.jackson@email.com'), NULL, '2026-03-01', NULL, '10:00:00', '14:00:00', 'active'),
((SELECT id FROM patients WHERE email='patricia.davis@email.com'), (SELECT id FROM caregivers WHERE email='robert.taylor@email.com'), NULL, '2026-03-10', '2026-05-10', '08:00:00', '16:00:00', 'pending');

-- Insert leave requests
INSERT INTO leave_requests (caregiver_id, start_date, end_date, leave_type, reason, status) VALUES
((SELECT id FROM caregivers WHERE email='jennifer.anderson@email.com'), '2026-03-15', '2026-03-22', 'vacation', 'Family vacation', 'approved'),
((SELECT id FROM caregivers WHERE email='james.wilson@email.com'), '2026-03-20', '2026-03-21', 'sick', 'Flu', 'pending'),
((SELECT id FROM caregivers WHERE email='lisa.martinez@email.com'), '2026-04-01', '2026-04-05', 'personal', 'Personal matters', 'approved');

-- Insert incidents
INSERT INTO incidents (patient_id, caregiver_id, incident_type, severity, description, incident_date, status) VALUES
((SELECT id FROM patients WHERE email='margaret.smith@email.com'), (SELECT id FROM caregivers WHERE email='lisa.martinez@email.com'), 'Fall', 'medium', 'Patient fell in bathroom', '2026-03-05', 'resolved'),
((SELECT id FROM patients WHERE email='robert.johnson@email.com'), (SELECT id FROM caregivers WHERE email='james.wilson@email.com'), 'Medication Error', 'high', 'Wrong dosage given', '2026-03-04', 'investigating'),
((SELECT id FROM patients WHERE email='patricia.davis@email.com'), (SELECT id FROM caregivers WHERE email='robert.taylor@email.com'), 'Behavioral', 'low', 'Patient refused medication', '2026-03-06', 'open');
