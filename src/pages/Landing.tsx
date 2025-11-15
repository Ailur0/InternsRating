import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { mockInterns, mockUsers, mockRatingPeriods } from "@/lib/mockData";

const Landing = () => {
  const navigate = useNavigate();

  const activeInterns = mockInterns.filter((intern) => intern.status === "active");
  const totalInterns = mockInterns.length;
  const managerCount = mockUsers.filter((user) => user.role === "manager").length;
  const directorCount = mockUsers.filter((user) => user.role === "director").length;
  const activePeriod = mockRatingPeriods.find((period) => period.status === "active");
  const upcomingPeriods = mockRatingPeriods.filter((period) => period.status === "upcoming").length;

  const notices = [
    {
      title: "Program Snapshot",
      items: [
        `${activeInterns.length} active interns, ${totalInterns} total records`,
        `${managerCount} managers and ${directorCount} directors engaged`,
        activePeriod ? `Current rating period: ${activePeriod.name}` : "Rating period: pending",
      ],
    },
    {
      title: "Access Protocol",
      items: [
        "Single-sign-on required for all stakeholders",
        "Data is restricted to enterprise network/VPN",
        `${upcomingPeriods} upcoming periods already scheduled in the system`,
      ],
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
            InternRate is the internal control center for our internship program—securely connecting {managerCount} managers, {directorCount} directors, and {totalInterns}+ intern records under one workflow.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate('/login')} className="text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => navigate('/access-policy')}>
              View Access Policy
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-20 bg-card border border-border rounded-2xl p-10 shadow-soft">
          <div className="text-left space-y-4">
            <h2 className="text-3xl font-semibold text-foreground">Purpose-built for internal teams</h2>
            <p className="text-lg text-muted-foreground">
              This workspace surfaces exactly what program directors, managers, and coordinators need: upcoming rating periods, intern assignments, and reminder workflows—all behind the firewall.
            </p>
            {activePeriod && (
              <p className="text-sm text-muted-foreground">
                Current period: <span className="font-medium text-foreground">{activePeriod.name}</span> • {activeInterns.length} active interns • {upcomingPeriods} periods scheduled next
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Internal Notices */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {notices.map((notice) => (
            <div key={notice.title} className="bg-card border border-border rounded-2xl p-8 shadow-soft">
              <h3 className="text-2xl font-semibold text-foreground mb-4">{notice.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {notice.items.map((item) => (
                  <li key={item} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 text-center text-sm text-muted-foreground">
          <p>Need access or have a compliance question? Contact the Program Management Office.</p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" onClick={() => navigate('/login')}>
              Proceed to Console
            </Button>
            <Button variant="ghost" className="text-muted-foreground" onClick={() => navigate('/access-policy')}>
              View Access Policy
            </Button>
          </div>
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
