import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, Star, Shield, TrendingUp, Mail } from "lucide-react";
import { mockInterns, mockRatings, mockUsers, mockRatingPeriods } from "@/lib/mockData";

const Landing = () => {
  const navigate = useNavigate();

  const activeInterns = mockInterns.filter((intern) => intern.status === "active");
  const totalInterns = mockInterns.length;
  const submittedRatings = mockRatings.filter((rating) => rating.status === "submitted");
  const pendingReviews = Math.max(activeInterns.length - submittedRatings.length, 0);
  const completionRate = totalInterns
    ? Math.round((submittedRatings.length / totalInterns) * 100)
    : 0;
  const managerCount = mockUsers.filter((user) => user.role === "manager").length;
  const directorCount = mockUsers.filter((user) => user.role === "director").length;
  const activePeriod = mockRatingPeriods.find((period) => period.status === "active");
  const upcomingPeriods = mockRatingPeriods.filter((period) => period.status === "upcoming").length;

  const stats = [
    {
      title: "Active Interns",
      value: activeInterns.length,
      accent: "text-primary",
      description: `${totalInterns} interns in the program`,
    },
    {
      title: "Reviews Submitted",
      value: submittedRatings.length,
      accent: "text-accent",
      description: activePeriod ? `Current period: ${activePeriod.name}` : "Current rating cycle",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      accent: "text-info",
      description: pendingReviews ? `${pendingReviews} reviews pending` : "All reviews in",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Intern Management",
      description: "Centralize all intern profiles, assignments, and academic information in one platform.",
    },
    {
      icon: Star,
      title: "Performance Ratings",
      description: "Comprehensive evaluation system with customizable categories and rating scales.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Gain insights with real-time dashboards, filtering, and export capabilities.",
    },
    {
      icon: Mail,
      title: "Automated Reminders",
      description: "Never miss a deadline with intelligent email notification workflows.",
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Secure RBAC system for admins, directors, managers, and interns.",
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Track intern progress over time with historical data and trend analysis.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">InternRate</span>
          </div>
          <Button onClick={() => navigate('/login')} size="lg">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            Streamline Your Intern
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Evaluation Process</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform for managing {totalInterns}+ intern records, {managerCount} managers, and {directorCount} program directors with real performance data.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate('/login')} className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-card rounded-xl p-6 shadow-soft border border-border">
              <div className={`text-4xl font-bold ${stat.accent}`}>{stat.value}</div>
              <div className="text-muted-foreground mt-2">{stat.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage intern evaluations efficiently and effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-8 shadow-soft border border-border hover:shadow-medium transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="bg-gradient-primary rounded-2xl p-12 text-center shadow-strong">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Evaluation Process?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join dozens of teams already tracking {totalInterns}+ interns, {managerCount} managers, and {upcomingPeriods} upcoming review cycles with InternRate.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/login')}
            className="text-lg px-10"
          >
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>&copy; 2025 InternRate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
