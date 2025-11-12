import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Star, TrendingUp, Clock, UserCheck, AlertCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { mockInterns, mockRatings, mockRatingPeriods } from "@/lib/mockData";

const Dashboard = () => {
  const user = getCurrentUser();

  const stats = [
    {
      title: "Total Interns",
      value: mockInterns.filter(i => i.status === 'active').length,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Ratings Submitted",
      value: mockRatings.filter(r => r.status === 'submitted').length,
      icon: Star,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Average Rating",
      value: "4.5",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Pending Ratings",
      value: mockInterns.filter(i => i.status === 'active').length - mockRatings.length,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  const activePeriod = mockRatingPeriods.find(p => p.status === 'active');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">Here's your performance overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-soft border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bgColor} p-1.5 sm:p-2 rounded-lg`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Period */}
      {activePeriod && (
        <Card className="shadow-soft border-border bg-gradient-primary">
          <CardHeader>
            <CardTitle className="text-primary-foreground flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Active Rating Period
            </CardTitle>
          </CardHeader>
          <CardContent className="text-primary-foreground/90">
            <p className="text-lg font-semibold">{activePeriod.name}</p>
            <p className="text-sm mt-1">
              {new Date(activePeriod.startDate).toLocaleDateString()} - {new Date(activePeriod.endDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary" />
              Recent Ratings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRatings.slice(0, 3).map((rating) => {
                const intern = mockInterns.find(i => i.id === rating.internId);
                return (
                  <div key={rating.id} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{intern?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(rating.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-accent fill-accent" />
                      <span className="font-semibold text-foreground">{rating.overallScore}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Active Interns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInterns.filter(i => i.status === 'active').slice(0, 3).map((intern) => (
                <div key={intern.id} className="flex justify-between items-center pb-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{intern.name}</p>
                    <p className="text-sm text-muted-foreground">{intern.department}</p>
                  </div>
                  <div className="text-xs bg-success/10 text-success px-3 py-1 rounded-full font-medium">
                    Active
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
