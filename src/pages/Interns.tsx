import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Plus, Mail, Phone } from "lucide-react";
import { mockInterns } from "@/lib/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Interns = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Get unique departments
  const departments = Array.from(new Set(mockInterns.map(i => i.department)));

  // Filter interns
  const filteredInterns = mockInterns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         intern.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         intern.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || intern.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || intern.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      case 'upcoming':
        return 'bg-info/10 text-info border-info/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Interns</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage and view all intern profiles ({filteredInterns.length} total)
          </p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Intern
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-soft border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInterns.map((intern) => (
          <Card key={intern.id} className="shadow-soft border-border hover:shadow-medium transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{intern.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{intern.employeeId}</p>
                </div>
                <Badge className={getStatusColor(intern.status)} variant="outline">
                  {intern.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="truncate">{intern.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{intern.phone}</span>
              </div>
              <div className="pt-3 border-t border-border space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground">Department:</span>{" "}
                  <span className="font-medium text-foreground">{intern.department}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">University:</span>{" "}
                  <span className="font-medium text-foreground">{intern.university}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Major:</span>{" "}
                  <span className="font-medium text-foreground">{intern.major}</span>
                </p>
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate(`/dashboard/interns/${intern.id}`)}>
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Interns;
