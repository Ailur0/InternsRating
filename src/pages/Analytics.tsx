import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Award } from "lucide-react";
import { mockRatings, mockInterns } from "@/lib/mockData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Analytics = () => {
  // Calculate analytics
  const totalRatings = mockRatings.length;
  const averageOverall = mockRatings.reduce((sum, r) => sum + r.overallScore, 0) / totalRatings;
  
  const categoryAverages = {
    technicalSkills: mockRatings.reduce((sum, r) => sum + r.technicalSkills, 0) / totalRatings,
    communication: mockRatings.reduce((sum, r) => sum + r.communication, 0) / totalRatings,
    teamwork: mockRatings.reduce((sum, r) => sum + r.teamwork, 0) / totalRatings,
    initiative: mockRatings.reduce((sum, r) => sum + r.initiative, 0) / totalRatings,
    problemSolving: mockRatings.reduce((sum, r) => sum + r.problemSolving, 0) / totalRatings,
    attendance: mockRatings.reduce((sum, r) => sum + r.attendance, 0) / totalRatings,
    qualityOfWork: mockRatings.reduce((sum, r) => sum + r.qualityOfWork, 0) / totalRatings,
    learningAgility: mockRatings.reduce((sum, r) => sum + r.learningAgility, 0) / totalRatings,
  };

  const activeInterns = mockInterns.filter(i => i.status === 'active').length;
  const completedInterns = mockInterns.filter(i => i.status === 'completed').length;

  // Performance trends data
  const performanceTrends = [
    { month: 'Jan', score: 3.8 },
    { month: 'Feb', score: 4.0 },
    { month: 'Mar', score: 4.2 },
    { month: 'Apr', score: 4.3 },
    { month: 'May', score: 4.4 },
    { month: 'Jun', score: 4.5 },
  ];

  // Skills comparison data
  const skillsData = [
    { category: 'Technical Skills', average: categoryAverages.technicalSkills },
    { category: 'Communication', average: categoryAverages.communication },
    { category: 'Teamwork', average: categoryAverages.teamwork },
    { category: 'Initiative', average: categoryAverages.initiative },
    { category: 'Problem Solving', average: categoryAverages.problemSolving },
    { category: 'Learning Agility', average: categoryAverages.learningAgility },
  ];

  // Department performance
  const departmentData = [
    { department: 'Engineering', average: 4.5 },
    { department: 'Marketing', average: 4.2 },
    { department: 'Design', average: 4.3 },
    { department: 'Sales', average: 4.1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">Performance insights and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Rating
            </CardTitle>
            <div className="bg-primary/10 p-2 rounded-lg">
              <Award className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{averageOverall.toFixed(2)}</div>
            <p className="text-xs text-success mt-1">↑ 0.3 from last period</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Ratings
            </CardTitle>
            <div className="bg-accent/10 p-2 rounded-lg">
              <BarChart3 className="w-5 h-5 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalRatings}</div>
            <p className="text-xs text-muted-foreground mt-1">Submitted this period</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Interns
            </CardTitle>
            <div className="bg-info/10 p-2 rounded-lg">
              <Users className="w-5 h-5 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{activeInterns}</div>
            <p className="text-xs text-muted-foreground mt-1">{completedInterns} completed</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
            <div className="bg-success/10 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">100%</div>
            <p className="text-xs text-success mt-1">All ratings submitted</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle>Performance by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(categoryAverages).map(([key, value]) => {
              const percentage = (value / 5) * 100;
              const label = key.replace(/([A-Z])/g, ' $1').trim();
              const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);
              
              return (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">{capitalizedLabel}</span>
                    <span className="text-sm font-semibold text-foreground">{value.toFixed(2)}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRatings
                .sort((a, b) => b.overallScore - a.overallScore)
                .slice(0, 5)
                .map((rating, index) => {
                  const intern = mockInterns.find(i => i.id === rating.internId);
                  return (
                    <div key={rating.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{intern?.name}</p>
                        <p className="text-sm text-muted-foreground">{intern?.department}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-foreground">{rating.overallScore}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((score) => {
                const count = mockRatings.filter(r => Math.round(r.overallScore) === score).length;
                const percentage = (count / totalRatings) * 100;
                
                return (
                  <div key={score} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium text-foreground">
                      {score} Stars
                    </div>
                    <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-accent transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="w-12 text-right text-sm font-semibold text-foreground">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis domain={[0, 5]} className="text-muted-foreground" />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Average Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle>Performance by Department</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="department" className="text-muted-foreground" />
                <YAxis domain={[0, 5]} className="text-muted-foreground" />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="average" 
                  fill="hsl(var(--primary))" 
                  name="Average Score"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Skills Radar Chart */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle>Skills Assessment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={skillsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis domain={[0, 5]} />
              <Radar 
                name="Average Rating" 
                dataKey="average" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.3} 
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
