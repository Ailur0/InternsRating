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
  {
    id: '4',
    email: 'manager.marketing@company.com',
    password: 'manager123',
    name: 'Priya Patel',
    role: 'manager',
    department: 'Marketing',
  },
  {
    id: '5',
    email: 'director.operations@company.com',
    password: 'director123',
    name: 'Luis Rivera',
    role: 'director',
    department: 'Operations',
  },
  {
    id: '6',
    email: 'manager.design@company.com',
    password: 'manager123',
    name: 'Nina Park',
    role: 'manager',
    department: 'Design',
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
  {
    id: '4',
    name: 'Ava Thompson',
    email: 'ava.t@company.com',
    phone: '(555) 456-7890',
    employeeId: 'INT-004',
    department: 'Marketing',
    startDate: '2025-02-01',
    endDate: '2025-08-01',
    managerId: '4',
    directorId: '5',
    university: 'Northwestern University',
    major: 'Communications',
    status: 'active',
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.k@company.com',
    phone: '(555) 567-8901',
    employeeId: 'INT-005',
    department: 'Operations',
    startDate: '2025-01-05',
    endDate: '2025-07-05',
    managerId: '4',
    directorId: '5',
    university: 'Georgia Tech',
    major: 'Industrial Engineering',
    status: 'active',
  },
  {
    id: '6',
    name: 'Leo Martinez',
    email: 'leo.m@company.com',
    phone: '(555) 678-9012',
    employeeId: 'INT-006',
    department: 'Design',
    startDate: '2025-04-01',
    endDate: '2025-10-01',
    managerId: '6',
    directorId: '5',
    university: 'Parsons School of Design',
    major: 'Interaction Design',
    status: 'upcoming',
  },
  {
    id: '7',
    name: 'Rachel Adams',
    email: 'rachel.a@company.com',
    phone: '(555) 789-0123',
    employeeId: 'INT-007',
    department: 'Engineering',
    startDate: '2024-10-01',
    endDate: '2025-04-01',
    managerId: '3',
    directorId: '2',
    university: 'Carnegie Mellon University',
    major: 'Software Engineering',
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
  {
    id: '3',
    name: 'Q3 2025',
    startDate: '2025-07-01',
    endDate: '2025-09-30',
    status: 'upcoming',
  },
  {
    id: '4',
    name: 'Q4 2025',
    startDate: '2025-10-01',
    endDate: '2025-12-31',
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
  {
    id: '3',
    internId: '3',
    managerId: '3',
    periodId: '1',
    technicalSkills: 4,
    communication: 4,
    teamwork: 5,
    initiative: 4,
    problemSolving: 3,
    attendance: 4,
    qualityOfWork: 4,
    learningAgility: 4,
    overallScore: 4.1,
    strengths: 'Great collaborator who elevates team campaigns',
    improvements: 'Could benefit from deeper analytics tooling exposure',
    comments: 'Sarah adapts quickly to marketing deadlines.',
    submittedAt: '2025-02-16T09:15:00Z',
    status: 'submitted',
  },
  {
    id: '4',
    internId: '4',
    managerId: '4',
    periodId: '1',
    technicalSkills: 3,
    communication: 5,
    teamwork: 4,
    initiative: 4,
    problemSolving: 3,
    attendance: 5,
    qualityOfWork: 4,
    learningAgility: 5,
    overallScore: 4.0,
    strengths: 'Storytelling, client communications, and adaptability',
    improvements: 'Develop stronger analytical reporting',
    comments: 'Ava is a dependable point person for marketing stand-ups.',
    submittedAt: '2025-02-20T14:45:00Z',
    status: 'submitted',
  },
  {
    id: '5',
    internId: '5',
    managerId: '4',
    periodId: '1',
    technicalSkills: 4,
    communication: 3,
    teamwork: 4,
    initiative: 4,
    problemSolving: 4,
    attendance: 5,
    qualityOfWork: 4,
    learningAgility: 4,
    overallScore: 4.0,
    strengths: 'Process optimization mindset and strong ownership',
    improvements: 'Needs to articulate updates more proactively',
    comments: 'David keeps ops initiatives on track.',
    submittedAt: '2025-02-21T12:05:00Z',
    status: 'submitted',
  },
  {
    id: '6',
    internId: '6',
    managerId: '6',
    periodId: '2',
    technicalSkills: 0,
    communication: 0,
    teamwork: 0,
    initiative: 0,
    problemSolving: 0,
    attendance: 0,
    qualityOfWork: 0,
    learningAgility: 0,
    overallScore: 0,
    strengths: 'Design onboarding scheduled for next quarter',
    improvements: 'Pending start date',
    comments: 'Draft record for upcoming cohort.',
    submittedAt: '2025-03-01T00:00:00Z',
    status: 'draft',
  },
];
