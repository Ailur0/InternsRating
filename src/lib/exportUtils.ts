import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Rating, Intern, RatingPeriod } from './mockData';

export const exportRatingsToPDF = (
  ratings: Rating[],
  interns: Intern[],
  periods: RatingPeriod[]
) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('Intern Ratings Report', 14, 20);
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
  
  // Prepare table data
  const tableData = ratings.map(rating => {
    const intern = interns.find(i => i.id === rating.internId);
    const period = periods.find(p => p.id === rating.periodId);
    
    return [
      intern?.name || 'Unknown',
      period?.name || 'Unknown',
      rating.overallScore.toString(),
      rating.technicalSkills.toString(),
      rating.communication.toString(),
      rating.teamwork.toString(),
      rating.initiative.toString(),
      rating.status
    ];
  });
  
  // Add table
  autoTable(doc, {
    startY: 35,
    head: [['Intern', 'Period', 'Overall', 'Technical', 'Comm.', 'Team', 'Initiative', 'Status']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [59, 130, 246] },
  });
  
  // Save the PDF
  doc.save('intern-ratings-report.pdf');
};

export const exportRatingsToCSV = (
  ratings: Rating[],
  interns: Intern[],
  periods: RatingPeriod[]
) => {
  const headers = [
    'Intern Name',
    'Period',
    'Overall Score',
    'Technical Skills',
    'Communication',
    'Teamwork',
    'Initiative',
    'Problem Solving',
    'Attendance',
    'Quality of Work',
    'Learning Agility',
    'Strengths',
    'Areas for Improvement',
    'Comments',
    'Status',
    'Date'
  ];
  
  const rows = ratings.map(rating => {
    const intern = interns.find(i => i.id === rating.internId);
    const period = periods.find(p => p.id === rating.periodId);
    
    return [
      intern?.name || 'Unknown',
      period?.name || 'Unknown',
      rating.overallScore,
      rating.technicalSkills,
      rating.communication,
      rating.teamwork,
      rating.initiative,
      rating.problemSolving,
      rating.attendance,
      rating.qualityOfWork,
      rating.learningAgility,
      `"${rating.strengths}"`,
      `"${rating.improvements}"`,
      `"${rating.comments}"`,
      rating.status,
      rating.submittedAt
    ];
  });
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `intern-ratings-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportInternProfileToPDF = (
  intern: Intern,
  ratings: Rating[],
  periods: RatingPeriod[]
) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('Intern Performance Profile', 14, 20);
  
  // Intern Details
  doc.setFontSize(12);
  doc.text(`Name: ${intern.name}`, 14, 35);
  doc.text(`Email: ${intern.email}`, 14, 42);
  doc.text(`Department: ${intern.department}`, 14, 49);
  doc.text(`University: ${intern.university}`, 14, 56);
  doc.text(`Status: ${intern.status}`, 14, 63);
  
  // Ratings History
  if (ratings.length > 0) {
    const tableData = ratings.map(rating => {
      const period = periods.find(p => p.id === rating.periodId);
      return [
        period?.name || 'Unknown',
        rating.overallScore.toString(),
        rating.technicalSkills.toString(),
        rating.communication.toString(),
        rating.teamwork.toString(),
        rating.initiative.toString()
      ];
    });
    
    autoTable(doc, {
      startY: 75,
      head: [['Period', 'Overall', 'Technical', 'Comm.', 'Team', 'Initiative']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] },
    });
  }
  
  doc.save(`${intern.name.replace(/\s+/g, '-')}-profile.pdf`);
};
