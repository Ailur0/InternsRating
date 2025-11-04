import { Intern } from './mockData';

export const parseCSV = (csvText: string): Partial<Intern>[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
  const interns: Partial<Intern>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const intern: Partial<Intern> = {
      id: String(Date.now() + i),
      status: 'active',
    };

    headers.forEach((header, index) => {
      const value = values[index];
      switch (header) {
        case 'name':
          intern.name = value;
          break;
        case 'email':
          intern.email = value;
          break;
        case 'phone':
          intern.phone = value;
          break;
        case 'employeeid':
        case 'employee_id':
          intern.employeeId = value;
          break;
        case 'department':
          intern.department = value;
          break;
        case 'startdate':
        case 'start_date':
          intern.startDate = value;
          break;
        case 'enddate':
        case 'end_date':
          intern.endDate = value;
          break;
        case 'university':
          intern.university = value;
          break;
        case 'major':
          intern.major = value;
          break;
      }
    });

    if (intern.name && intern.email) {
      interns.push(intern);
    }
  }

  return interns;
};

export const generateCSVTemplate = (): string => {
  return `name,email,phone,employeeId,department,startDate,endDate,university,major
John Doe,john@example.com,(555) 123-4567,INT-001,Engineering,2025-01-15,2025-07-15,Stanford University,Computer Science
Jane Smith,jane@example.com,(555) 234-5678,INT-002,Marketing,2025-01-15,2025-07-15,UC Berkeley,Marketing`;
};

export const downloadCSVTemplate = () => {
  const template = generateCSVTemplate();
  const blob = new Blob([template], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'intern_template.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};
