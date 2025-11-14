import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";
import {
  mockInterns,
  mockRatings,
  mockRatingPeriods,
  mockUsers,
} from "@/lib/mockData";
import type { LucideIcon } from "lucide-react";
import {
  Users,
  Star,
  TrendingUp,
  Clock,
  UserCheck,
  AlertCircle,
  ClipboardList,
  Building2,
  CheckCircle2,
} from "lucide-react";

type StatCard = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
};

const formatAverageScore = (ratings: { overallScore: number }[]): string => {
  if (!ratings.length) {
    return "—";
  }

  const total = ratings.reduce((sum, rating) => sum + rating.overallScore, 0);
  return (total / ratings.length).toFixed(1);
};

const Dashboard = () => {
  const user = getCurrentUser();

  const activeInterns = mockInterns.filter((intern) => intern.status === "active");
  const submittedRatings = mockRatings.filter((rating) => rating.status === "submitted");

  const isAdmin = user?.role === "admin";
  const isDirector = user?.role === "director";
  const isManager = user?.role === "manager";

  const totalDirectors = mockUsers.filter((u) => u.role === "director").length;
  const totalManagers = mockUsers.filter((u) => u.role === "manager").length;

  const managerInterns = isManager
    ? mockInterns.filter((intern) => intern.managerId === user?.id)
    : [];
  const managerRatings = isManager
    ? mockRatings.filter((rating) => rating.managerId === user?.id)
    : [];
  const managerPendingReviews = isManager
    ? Math.max(managerInterns.length - managerRatings.length, 0)
    : 0;
  const managerCompletion = isManager && managerInterns.length
    ? Math.round((managerRatings.length / managerInterns.length) * 100)
    : 0;

  const directorInterns = isDirector
    ? mockInterns.filter((intern) => intern.directorId === user?.id)
    : [];
  const directorInternIds = directorInterns.map((intern) => intern.id);
  const directorRatings = isDirector
    ? mockRatings.filter((rating) => directorInternIds.includes(rating.internId))
    : [];
  const directorManagers = isDirector
    ? Array.from(new Set(directorInterns.map((intern) => intern.managerId)))
    : [];

  const stats: StatCard[] = (() => {
    if (isAdmin) {
      return [
        {
          title: "Active Interns",
          value: activeInterns.length,
          icon: Users,
          color: "text-primary",
          bgColor: "bg-primary/10",
        },
        {
          title: "Program Directors",
          value: totalDirectors,
          icon: Building2,
          color: "text-violet-600",
          bgColor: "bg-violet-500/10",
        },
        {
          title: "People Managers",
          value: totalManagers,
          icon: ClipboardList,
          color: "text-emerald-600",
          bgColor: "bg-emerald-500/10",
        },
        {
          title: "Pending Reviews",
          value: Math.max(activeInterns.length - submittedRatings.length, 0),
          icon: Clock,
          color: "text-warning",
          bgColor: "bg-warning/10",
        },
      ];
    }

    if (isDirector) {
      return [
        {
          title: "Interns Overseen",
          value: directorInterns.length,
          icon: Users,
          color: "text-primary",
          bgColor: "bg-primary/10",
        },
        {
          title: "Managers Reporting",
          value: directorManagers.length,
          icon: UserCheck,
          color: "text-amber-600",
          bgColor: "bg-amber-500/10",
        },
        {
          title: "Avg Intern Score",
          value: formatAverageScore(directorRatings),
          icon: TrendingUp,
          color: "text-success",
          bgColor: "bg-success/10",
        },
        {
          title: "Pending Feedback",
          value: Math.max(directorInterns.length - directorRatings.length, 0),
          icon: Clock,
          color: "text-warning",
          bgColor: "bg-warning/10",
        },
      ];
    }

    if (isManager) {
      return [
        {
          title: "Assigned Interns",
          value: managerInterns.length,
          icon: Users,
          color: "text-primary",
          bgColor: "bg-primary/10",
        },
        {
          title: "Reviews Submitted",
          value: managerRatings.length,
          icon: Star,
          color: "text-accent",
          bgColor: "bg-accent/10",
        },
        {
          title: "Avg Score Given",
          value: formatAverageScore(managerRatings),
          icon: TrendingUp,
          color: "text-success",
          bgColor: "bg-success/10",
        },
        {
          title: "Pending Reviews",
          value: managerPendingReviews,
          icon: Clock,
          color: "text-warning",
          bgColor: "bg-warning/10",
        },
      ];
    }

    return [
      {
        title: "Active Interns",
        value: activeInterns.length,
        icon: Users,
        color: "text-primary",
        bgColor: "bg-primary/10",
      },
      {
        title: "Ratings Submitted",
        value: submittedRatings.length,
        icon: Star,
        color: "text-accent",
        bgColor: "bg-accent/10",
      },
      {
        title: "Average Rating",
        value: formatAverageScore(submittedRatings),
        icon: TrendingUp,
        color: "text-success",
        bgColor: "bg-success/10",
      },
      {
        title: "Pending Ratings",
        value: Math.max(activeInterns.length - submittedRatings.length, 0),
        icon: Clock,
        color: "text-warning",
        bgColor: "bg-warning/10",
      },
    ];
  })();

  const activePeriod = mockRatingPeriods.find(p => p.status === 'active');

  const directorManagerDetails = isDirector
    ? directorManagers.map((managerId) => {
        const manager = mockUsers.find((u) => u.id === managerId);
        const internCount = directorInterns.filter(
          (intern) => intern.managerId === managerId
        ).length;

        return {
          id: managerId,
          name: manager?.name ?? "Manager",
          email: manager?.email,
          internCount,
          department: manager?.department,
        };
      })
    : [];

  const managerPendingInterns = isManager
    ? managerInterns.filter(
        (intern) => !managerRatings.some((rating) => rating.internId === intern.id)
      )
    : [];

  const renderRoleSections = () => {
    if (isManager) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Assigned Interns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {managerInterns.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    You don't have interns assigned yet.
                  </p>
                ) : (
                  managerInterns.map((intern) => {
                    const rating = managerRatings.find(
                      (item) => item.internId === intern.id
                    );

                    return (
                      <div
                        key={intern.id}
                        className="flex justify-between items-center pb-3 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="font-medium text-foreground">{intern.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {intern.department}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            rating
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          {rating ? `Rated ${rating.overallScore}` : "Pending review"}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
                Feedback Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Completion</span>
                <span>
                  {managerInterns.length
                    ? `${managerCompletion}%`
                    : "—"}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${managerCompletion}%` }}
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  {managerRatings.length} reviews submitted
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Clock className="w-4 h-4 text-warning" />
                  {managerPendingReviews} pending reviews
                </div>
              </div>
              {managerPendingInterns.length > 0 && (
                <div className="space-y-2 border-t border-border pt-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Next up
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {managerPendingInterns.map((intern) => (
                      <li key={intern.id}>{intern.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    if (isDirector) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-violet-600" />
                Manager Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {directorManagerDetails.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No managers reporting yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {directorManagerDetails.map((manager) => (
                    <div
                      key={manager.id}
                      className="flex justify-between items-start pb-3 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">{manager.name}</p>
                        {manager.email && (
                          <p className="text-xs text-muted-foreground">{manager.email}</p>
                        )}
                        {manager.department && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {manager.department}
                          </p>
                        )}
                      </div>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full font-medium text-muted-foreground">
                        {manager.internCount} interns
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Intern Status Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent>
              {directorInterns.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  You don't have interns assigned yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {directorInterns.map((intern) => {
                    const rating = directorRatings.find(
                      (item) => item.internId === intern.id
                    );

                    return (
                      <div
                        key={intern.id}
                        className="flex justify-between items-center pb-3 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="font-medium text-foreground">{intern.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {intern.department}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-muted-foreground">
                            Manager ID: {intern.managerId}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {rating ? `Latest score ${rating.overallScore}` : "Awaiting feedback"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
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
    );
  };

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

      {renderRoleSections()}
    </div>
  );
};

export default Dashboard;
