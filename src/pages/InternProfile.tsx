import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, GraduationCap, Star, Building } from "lucide-react";
import { mockInterns, mockRatings } from "@/lib/mockData";

const InternProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const intern = mockInterns.find(i => i.id === id);
  const internRatings = mockRatings.filter(r => r.internId === id);

  if (!intern) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Intern not found</p>
        <Button onClick={() => navigate('/dashboard/interns')} className="mt-4">
          Back to Interns
        </Button>
      </div>
    );
  }

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

  const averageRating = internRatings.length > 0
    ? (internRatings.reduce((sum, r) => sum + r.overallScore, 0) / internRatings.length).toFixed(1)
    : 'N/A';

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/dashboard/interns')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{intern.name}</h1>
          <p className="text-muted-foreground mt-1">{intern.employeeId}</p>
        </div>
        <Badge className={getStatusColor(intern.status)} variant="outline">
          {intern.status}
        </Badge>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-soft border-border lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{intern.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{intern.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Department</p>
                <p className="font-medium text-foreground">{intern.department}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium text-foreground">
                  {new Date(intern.startDate).toLocaleDateString()} - {new Date(intern.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">University</p>
                <p className="font-medium text-foreground">{intern.university}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Major</p>
                <p className="font-medium text-foreground">{intern.major}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 bg-gradient-primary rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
                <span className="text-4xl font-bold text-primary-foreground">{averageRating}</span>
              </div>
              <p className="text-primary-foreground/80 text-sm">Average Rating</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Ratings</span>
                <span className="font-semibold text-foreground">{internRatings.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={getStatusColor(intern.status)} variant="outline">
                  {intern.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rating History */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle>Rating History</CardTitle>
        </CardHeader>
        <CardContent>
          {internRatings.length > 0 ? (
            <div className="space-y-4">
              {internRatings.map((rating) => (
                <div
                  key={rating.id}
                  className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-foreground">
                        {new Date(rating.submittedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-accent fill-accent" />
                      <span className="text-2xl font-bold text-foreground">{rating.overallScore}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Technical:</span>{" "}
                      <span className="font-medium text-foreground">{rating.technicalSkills}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Communication:</span>{" "}
                      <span className="font-medium text-foreground">{rating.communication}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Teamwork:</span>{" "}
                      <span className="font-medium text-foreground">{rating.teamwork}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Initiative:</span>{" "}
                      <span className="font-medium text-foreground">{rating.initiative}</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-foreground">Strengths: </span>
                      <span className="text-muted-foreground">{rating.strengths}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Improvements: </span>
                      <span className="text-muted-foreground">{rating.improvements}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No ratings submitted yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 pb-8">
        <Button size="lg" onClick={() => navigate('/dashboard/ratings/submit')}>
          Submit New Rating
        </Button>
        <Button variant="outline" size="lg">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default InternProfile;
