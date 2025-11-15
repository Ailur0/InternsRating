import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AccessPolicy = () => {
  const navigate = useNavigate();

  const policies = [
    {
      title: "Audience",
      description:
        "InternRate is restricted to Program Managers, Directors, and approved People Operations staff. External sharing is prohibited.",
    },
    {
      title: "Authentication",
      description:
        "Single Sign-On (SSO) via the enterprise identity provider is mandatory. Credentials must never be shared or stored outside the password manager.",
    },
    {
      title: "Data Handling",
      description:
        "Exported intern data must be stored in encrypted company locations and deleted when no longer required for program reporting.",
    },
    {
      title: "Usage",
      description:
        "Activity is monitored. Use of InternRate must align with HR, Privacy, and Security policies. Report suspected misuse immediately to the Program Management Office.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle className="text-3xl">InternRate Access Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              This policy outlines the minimum requirements for gaining and retaining access to InternRate. All users must review these
              rules before logging into the console.
            </p>
            <ul className="space-y-4">
              {policies.map((policy) => (
                <li key={policy.title}>
                  <p className="text-lg font-semibold text-foreground">{policy.title}</p>
                  <p>{policy.description}</p>
                </li>
              ))}
            </ul>
            <p>
              By signing in, you acknowledge that you have read, understood, and will comply with the InternRate Access Policy. Questions can be directed to the Program
              Management Office at pmo@company.com.
            </p>
            <Button className="mt-4" onClick={() => navigate(-1)}>
              Return to previous page
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccessPolicy;
