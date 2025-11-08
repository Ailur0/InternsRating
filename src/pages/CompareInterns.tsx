import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitCompare, Mail, Phone, Calendar, GraduationCap, Building } from "lucide-react";
import { mockInterns, mockRatings } from "@/lib/mockData";
import { Intern, Rating } from "@/lib/mockData";

const CompareInterns = () => {
  const [selectedIntern1, setSelectedIntern1] = useState<string>("");
  const [selectedIntern2, setSelectedIntern2] = useState<string>("");

  const intern1 = mockInterns.find(i => i.id === selectedIntern1);
  const intern2 = mockInterns.find(i => i.id === selectedIntern2);

  const ratings1 = mockRatings.filter(r => r.internId === selectedIntern1);
  const ratings2 = mockRatings.filter(r => r.internId === selectedIntern2);

  const avgRating1 = ratings1.length > 0 
    ? (ratings1.reduce((sum, r) => sum + r.overallScore, 0) / ratings1.length).toFixed(1)
    : 'N/A';
  
  const avgRating2 = ratings2.length > 0 
    ? (ratings2.reduce((sum, r) => sum + r.overallScore, 0) / ratings2.length).toFixed(1)
    : 'N/A';

  const ComparisonField = ({ 
    label, 
    value1, 
    value2, 
    icon: Icon 
  }: { 
    label: string; 
    value1: string; 
    value2: string; 
    icon: any;
  }) => (
    <div className="grid grid-cols-3 gap-4 items-center py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-sm text-foreground">{value1}</div>
      <div className="text-sm text-foreground">{value2}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <GitCompare className="w-8 h-8" />
          Compare Interns
        </h1>
        <p className="text-muted-foreground mt-1">Compare two interns side-by-side</p>
      </div>

      {/* Intern Selection */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle>Select Interns to Compare</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">First Intern</label>
              <Select value={selectedIntern1} onValueChange={setSelectedIntern1}>
                <SelectTrigger>
                  <SelectValue placeholder="Select intern..." />
                </SelectTrigger>
                <SelectContent>
                  {mockInterns
                    .filter(i => i.id !== selectedIntern2)
                    .map(intern => (
                      <SelectItem key={intern.id} value={intern.id}>
                        {intern.name} - {intern.employeeId}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Second Intern</label>
              <Select value={selectedIntern2} onValueChange={setSelectedIntern2}>
                <SelectTrigger>
                  <SelectValue placeholder="Select intern..." />
                </SelectTrigger>
                <SelectContent>
                  {mockInterns
                    .filter(i => i.id !== selectedIntern1)
                    .map(intern => (
                      <SelectItem key={intern.id} value={intern.id}>
                        {intern.name} - {intern.employeeId}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {intern1 && intern2 && (
        <>
          {/* Basic Information */}
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ComparisonField label="Name" value1={intern1.name} value2={intern2.name} icon={Mail} />
              <ComparisonField label="Email" value1={intern1.email} value2={intern2.email} icon={Mail} />
              <ComparisonField label="Phone" value1={intern1.phone} value2={intern2.phone} icon={Phone} />
              <ComparisonField label="Employee ID" value1={intern1.employeeId} value2={intern2.employeeId} icon={Building} />
            </CardContent>
          </Card>

          {/* Academic & Professional */}
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle>Academic & Professional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ComparisonField label="University" value1={intern1.university} value2={intern2.university} icon={GraduationCap} />
              <ComparisonField label="Major" value1={intern1.major} value2={intern2.major} icon={GraduationCap} />
              <ComparisonField label="Department" value1={intern1.department} value2={intern2.department} icon={Building} />
              <ComparisonField 
                label="Start Date" 
                value1={new Date(intern1.startDate).toLocaleDateString()} 
                value2={new Date(intern2.startDate).toLocaleDateString()} 
                icon={Calendar} 
              />
              <ComparisonField 
                label="End Date" 
                value1={new Date(intern1.endDate).toLocaleDateString()} 
                value2={new Date(intern2.endDate).toLocaleDateString()} 
                icon={Calendar} 
              />
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-sm font-medium text-muted-foreground">Metric</div>
                <div className="text-sm font-medium text-foreground text-center">{intern1.name}</div>
                <div className="text-sm font-medium text-foreground text-center">{intern2.name}</div>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Average Rating</span>
                  <div className="text-center">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {avgRating1}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {avgRating2}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Total Ratings</span>
                  <div className="text-center text-sm font-medium">{ratings1.length}</div>
                  <div className="text-center text-sm font-medium">{ratings2.length}</div>
                </div>

                {ratings1.length > 0 && ratings2.length > 0 && (
                  <>
                    <div className="grid grid-cols-3 gap-4 items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Technical Skills</span>
                      <div className="text-center text-sm font-medium">
                        {(ratings1.reduce((s, r) => s + r.technicalSkills, 0) / ratings1.length).toFixed(1)}
                      </div>
                      <div className="text-center text-sm font-medium">
                        {(ratings2.reduce((s, r) => s + r.technicalSkills, 0) / ratings2.length).toFixed(1)}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Communication</span>
                      <div className="text-center text-sm font-medium">
                        {(ratings1.reduce((s, r) => s + r.communication, 0) / ratings1.length).toFixed(1)}
                      </div>
                      <div className="text-center text-sm font-medium">
                        {(ratings2.reduce((s, r) => s + r.communication, 0) / ratings2.length).toFixed(1)}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 items-center py-2">
                      <span className="text-sm text-muted-foreground">Problem Solving</span>
                      <div className="text-center text-sm font-medium">
                        {(ratings1.reduce((s, r) => s + r.problemSolving, 0) / ratings1.length).toFixed(1)}
                      </div>
                      <div className="text-center text-sm font-medium">
                        {(ratings2.reduce((s, r) => s + r.problemSolving, 0) / ratings2.length).toFixed(1)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {(!intern1 || !intern2) && (
        <Card className="shadow-soft border-border">
          <CardContent className="pt-16 pb-16 text-center">
            <GitCompare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Select two interns to compare</h3>
            <p className="text-muted-foreground">Choose interns from the dropdowns above to see a detailed comparison</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompareInterns;
