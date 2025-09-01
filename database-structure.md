# Database Structure for Teacher-Student Management System

## Overview
This document outlines the database structure that supports both the student panel and teacher panel, where teachers control student data without affecting the student interface.

## Core Tables

### 1. Users Table
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student', 'teacher', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Teachers Table
```sql
CREATE TABLE teachers (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    department VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    experience_years INT,
    education VARCHAR(255),
    office_location VARCHAR(100),
    office_hours TEXT,
    phone VARCHAR(20),
    specialization TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. Students Table
```sql
CREATE TABLE students (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE NOT NULL,
    student_id VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    phone VARCHAR(20),
    address TEXT,
    enrollment_date DATE,
    graduation_date DATE,
    status ENUM('active', 'inactive', 'graduated', 'suspended') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 4. Courses Table
```sql
CREATE TABLE courses (
    id VARCHAR(36) PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    description TEXT,
    credits INT NOT NULL,
    department VARCHAR(100) NOT NULL,
    semester VARCHAR(20),
    academic_year VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE
);
```

### 5. Subjects Table
```sql
CREATE TABLE subjects (
    id VARCHAR(36) PRIMARY KEY,
    subject_code VARCHAR(20) UNIQUE NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    description TEXT,
    course_id VARCHAR(36),
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);
```

### 6. Enrollments Table
```sql
CREATE TABLE enrollments (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    course_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    enrollment_date DATE NOT NULL,
    status ENUM('enrolled', 'dropped', 'completed') DEFAULT 'enrolled',
    grade VARCHAR(5),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);
```

## Teacher-Controlled Data Tables

### 7. Timetables Table
```sql
CREATE TABLE timetables (
    id VARCHAR(36) PRIMARY KEY,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room VARCHAR(50),
    academic_year VARCHAR(10),
    semester VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);
```

### 8. StudyMaterials Table
```sql
CREATE TABLE study_materials (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(500),
    file_type VARCHAR(20),
    file_size BIGINT,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    tags TEXT,
    download_count INT DEFAULT 0,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);
```

### 9. PerformanceRecords Table
```sql
CREATE TABLE performance_records (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    assignment_name VARCHAR(255) NOT NULL,
    assignment_type ENUM('assignment', 'quiz', 'exam', 'project') NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    max_score DECIMAL(5,2) NOT NULL,
    percentage DECIMAL(5,2) GENERATED ALWAYS AS ((score / max_score) * 100) STORED,
    grade VARCHAR(5),
    feedback TEXT,
    submission_date DATE,
    graded_date DATE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);
```

### 10. Results Table
```sql
CREATE TABLE results (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    exam_type ENUM('midterm', 'final', 'quiz', 'assignment', 'project') NOT NULL,
    total_marks DECIMAL(5,2) NOT NULL,
    obtained_marks DECIMAL(5,2) NOT NULL,
    percentage DECIMAL(5,2) GENERATED ALWAYS AS ((obtained_marks / total_marks) * 100) STORED,
    grade VARCHAR(5),
    status ENUM('pass', 'fail') GENERATED ALWAYS AS (CASE WHEN (obtained_marks / total_marks) * 100 >= 60 THEN 'pass' ELSE 'fail' END) STORED,
    exam_date DATE,
    remarks TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);
```

### 11. AttendanceRecords Table
```sql
CREATE TABLE attendance_records (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    date DATE NOT NULL,
    status ENUM('present', 'absent', 'late', 'excused') NOT NULL,
    remarks TEXT,
    recorded_by VARCHAR(36) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES teachers(id) ON DELETE CASCADE
);
```

### 12. FeeRecords Table
```sql
CREATE TABLE fee_records (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    course_id VARCHAR(36) NOT NULL,
    fee_type ENUM('tuition', 'lab', 'library', 'examination', 'other') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_amount DECIMAL(10,2) DEFAULT 0,
    paid_date DATE,
    status ENUM('pending', 'partial', 'paid', 'overdue') GENERATED ALWAYS AS (
        CASE 
            WHEN paid_amount = 0 THEN 'pending'
            WHEN paid_amount < amount THEN 'partial'
            WHEN paid_amount >= amount THEN 'paid'
            WHEN due_date < CURDATE() AND paid_amount < amount THEN 'overdue'
            ELSE 'pending'
        END
    ) STORED,
    payment_method VARCHAR(50),
    remarks TEXT,
    created_by VARCHAR(36) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES teachers(id) ON DELETE CASCADE
);
```

### 13. StudentAdvice Table
```sql
CREATE TABLE student_advice (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    teacher_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36),
    advice_type ENUM('academic', 'personal', 'career', 'behavioral', 'other') NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('draft', 'sent', 'read', 'acknowledged') DEFAULT 'draft',
    follow_up_date DATE,
    tags TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE SET NULL
);
```

### 14. Notifications Table
```sql
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    recipient_id VARCHAR(36) NOT NULL,
    recipient_type ENUM('student', 'teacher') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'error') DEFAULT 'info',
    category ENUM('academic', 'administrative', 'student', 'system') NOT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    is_read BOOLEAN DEFAULT FALSE,
    action_required BOOLEAN DEFAULT FALSE,
    related_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Key Features

### Data Isolation
- Teachers can only access data related to their subjects and enrolled students
- Students can only see their own data
- Role-based access control ensures proper data segregation

### Real-time Updates
- When teachers update data (timetables, grades, attendance), students see changes immediately
- No need for manual synchronization between panels

### Audit Trail
- All changes are timestamped and tracked
- Teachers can see who made changes and when

### Scalability
- Database structure supports multiple teachers, students, and courses
- Efficient indexing for quick data retrieval

## Sample Queries

### Get Student Performance for a Teacher
```sql
SELECT 
    s.first_name, s.last_name, s.student_id,
    pr.assignment_name, pr.score, pr.max_score, pr.percentage, pr.grade
FROM performance_records pr
JOIN students s ON pr.student_id = s.id
WHERE pr.teacher_id = ? AND pr.subject_id = ?
ORDER BY pr.submission_date DESC;
```

### Get Student Attendance Summary
```sql
SELECT 
    s.first_name, s.last_name,
    COUNT(CASE WHEN ar.status = 'present' THEN 1 END) as present_count,
    COUNT(CASE WHEN ar.status = 'absent' THEN 1 END) as absent_count,
    COUNT(CASE WHEN ar.status = 'late' THEN 1 END) as late_count,
    ROUND((COUNT(CASE WHEN ar.status = 'present' THEN 1 END) / COUNT(*)) * 100, 2) as attendance_percentage
FROM attendance_records ar
JOIN students s ON ar.student_id = s.id
WHERE ar.teacher_id = ? AND ar.subject_id = ?
GROUP BY s.id, s.first_name, s.last_name;
```

### Get Overdue Fees
```sql
SELECT 
    s.first_name, s.last_name, s.student_id,
    fr.fee_type, fr.amount, fr.due_date,
    DATEDIFF(CURDATE(), fr.due_date) as days_overdue
FROM fee_records fr
JOIN students s ON fr.student_id = s.id
WHERE fr.status = 'overdue' AND fr.created_by = ?
ORDER BY fr.due_date;
```

This database structure ensures that:
1. Teachers have full control over student data
2. Students see only their own information
3. Data is consistent across both panels
4. The system is scalable and maintainable
5. All changes are tracked and auditable
