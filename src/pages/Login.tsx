import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShieldCheck, Building2, ClipboardList } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { login } from "@/lib/auth";
import { toast } from "sonner";

type LoginRoleOption = {
  key: "admin" | "director" | "manager";
  label: string;
  description: string;
  email: string;
  password: string;
  icon: LucideIcon;
  accentText: string;
  badgeBg: string;
  ringClass: string;
  activeBg: string;
};

const roleOptions: LoginRoleOption[] = [
  {
    key: "admin",
    label: "Administrator",
    description: "Configure the platform and view organization-wide performance.",
    email: "admin@company.com",
    password: "admin123",
    icon: ShieldCheck,
    accentText: "text-sky-600",
    badgeBg: "bg-sky-500/10",
    ringClass: "ring-sky-400/70",
    activeBg: "bg-sky-500/10",
  },
  {
    key: "director",
    label: "Director",
    description: "Oversee departments, managers, and cross-team intern metrics.",
    email: "director@company.com",
    password: "director123",
    icon: Building2,
    accentText: "text-violet-600",
    badgeBg: "bg-violet-500/10",
    ringClass: "ring-violet-400/70",
    activeBg: "bg-violet-500/10",
  },
  {
    key: "manager",
    label: "Manager",
    description: "Review intern progress, add feedback, and manage daily workflows.",
    email: "manager@company.com",
    password: "manager123",
    icon: ClipboardList,
    accentText: "text-emerald-600",
    badgeBg: "bg-emerald-500/10",
    ringClass: "ring-emerald-400/70",
    activeBg: "bg-emerald-500/10",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<LoginRoleOption | null>(null);

  const handleRoleSelect = (role: LoginRoleOption) => {
    setSelectedRole(role);
    setEmail(role.email);
    setPassword(role.password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = login(email, password);
      
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        navigate('/dashboard');
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back to home</span>
        </Button>

        <Card className="shadow-medium border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>
              {selectedRole
                ? `Quick-filled with the ${selectedRole.label} account. You can still edit the details below.`
                : "Enter your credentials or choose a role card to autofill demo details."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Login as</Label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {roleOptions.map((role) => {
                    const Icon = role.icon;
                    const isActive = selectedRole?.key === role.key;
                    const buttonClasses = `group rounded-xl border p-4 text-left transition-all ${
                      isActive
                        ? `${role.activeBg} border-transparent ring-2 ring-offset-2 ring-offset-background ${role.ringClass}`
                        : "border-border/60 hover:border-foreground/40"
                    }`;

                    return (
                      <button
                        type="button"
                        key={role.key}
                        onClick={() => handleRoleSelect(role)}
                        className={buttonClasses}
                      >
                        <div className={`flex items-center gap-2 text-sm font-semibold ${role.accentText}`}>
                          <Icon className="h-4 w-4" />
                          <span>{role.label}</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground leading-snug">
                          {role.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                          <span className={`${role.badgeBg} ${role.accentText} px-2 py-1 rounded-full`}>Quick fill</span>
                          {isActive && <span>Selected</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
