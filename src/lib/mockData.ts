export type UserRole = 'admin' | 'director' | 'manager' | 'intern';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  department?: string;
}

export interface Intern {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  department: string;
  startDate: string;
  endDate: string;
  managerId: string;
  directorId: string;
  university: string;
  major: string;
  status: 'active' | 'completed' | 'upcoming';
  photoUrl?: string;
}

export interface Rating {
  id: string;
  internId: string;
  managerId: string;
  periodId: string;
  technicalSkills: number;
  communication: number;
  teamwork: number;
  initiative: number;
  problemSolving: number;
  attendance: number;
  qualityOfWork: number;
  learningAgility: number;
  overallScore: number;
  strengths: string;
  improvements: string;
  comments: string;
  submittedAt: string;
  status: 'draft' | 'submitted';
  attachments?: string[]; // Array of file IDs
}

export interface RatingPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'closed';
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'director@company.com',
    password: 'director123',
    name: 'Sarah Director',
    role: 'director',
    department: 'Engineering',
  },
  {
    id: '3',
    email: 'manager@company.com',
    password: 'manager123',
    name: 'John Manager',
    role: 'manager',
    department: 'Engineering',
  },
];

export const mockInterns: Intern[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily.j@company.com',
    phone: '(555) 123-4567',
    employeeId: 'INT-001',
    department: 'Engineering',
    startDate: '2025-01-15',
    endDate: '2025-07-15',
    managerId: '3',
    directorId: '2',
    university: 'Stanford University',
    major: 'Computer Science',
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@company.com',
    phone: '(555) 234-5678',
    employeeId: 'INT-002',
    department: 'Engineering',
    startDate: '2025-01-15',
    endDate: '2025-07-15',
    managerId: '3',
    directorId: '2',
    university: 'MIT',
    major: 'Software Engineering',
    status: 'active',
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah.w@company.com',
    phone: '(555) 345-6789',
    employeeId: 'INT-003',
    department: 'Marketing',
    startDate: '2024-09-01',
    endDate: '2025-03-01',
    managerId: '3',
    directorId: '2',
    university: 'UC Berkeley',
    major: 'Marketing',
    status: 'completed',
  },
];

export const mockRatingPeriods: RatingPeriod[] = [
  {
    id: '1',
    name: 'Q1 2025',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    status: 'active',
  },
  {
    id: '2',
    name: 'Q2 2025',
    startDate: '2025-04-01',
    endDate: '2025-06-30',
    status: 'upcoming',
  },
];

export const mockRatings: Rating[] = [
  {
    id: '1',
    internId: '1',
    managerId: '3',
    periodId: '1',
    technicalSkills: 4,
    communication: 5,
    teamwork: 4,
    initiative: 5,
    problemSolving: 4,
    attendance: 5,
    qualityOfWork: 4,
    learningAgility: 5,
    overallScore: 4.5,
    strengths: 'Excellent communication skills and quick learner',
    improvements: 'Continue building technical depth in backend systems',
    comments: 'Emily has been a fantastic addition to the team.',
    submittedAt: '2025-02-15T10:30:00Z',
    status: 'submitted',
  },
  {
    id: '2',
    internId: '2',
    managerId: '3',
    periodId: '1',
    technicalSkills: 5,
    communication: 4,
    teamwork: 4,
    initiative: 4,
    problemSolving: 5,
    attendance: 5,
    qualityOfWork: 5,
    learningAgility: 4,
    overallScore: 4.5,
    strengths: 'Outstanding technical skills and problem-solving ability',
    improvements: 'Work on presenting technical concepts to non-technical stakeholders',
    comments: 'Michael consistently delivers high-quality work.',
    submittedAt: '2025-02-15T11:00:00Z',
    status: 'submitted',
  },
];
