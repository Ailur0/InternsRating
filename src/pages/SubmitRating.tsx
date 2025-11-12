import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ArrowLeft, Save } from "lucide-react";
import { mockInterns, mockRatingPeriods } from "@/lib/mockData";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { saveDraft, getDraft } from "@/lib/draftStorage";
import { addAuditLog } from "@/lib/auditLog";
import { getCurrentUser } from "@/lib/auth";
import { FileUpload } from "@/components/FileUpload";
import { getFile, AttachedFile } from "@/lib/fileStorage";

const ratingCategories = [
  { key: 'technicalSkills', label: 'Technical Skills', description: 'Proficiency in required technical competencies' },
  { key: 'communication', label: 'Communication', description: 'Written and verbal communication effectiveness' },
  { key: 'teamwork', label: 'Teamwork & Collaboration', description: 'Ability to work effectively with others' },
  { key: 'initiative', label: 'Initiative & Proactivity', description: 'Self-motivation and taking ownership' },
  { key: 'problemSolving', label: 'Problem Solving', description: 'Analytical thinking and solution development' },
  { key: 'attendance', label: 'Attendance & Punctuality', description: 'Reliability and time management' },
  { key: 'qualityOfWork', label: 'Quality of Work', description: 'Accuracy, thoroughness, and attention to detail' },
  { key: 'learningAgility', label: 'Learning Agility', description: 'Speed and effectiveness of learning new skills' },
];

const SubmitRating = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [selectedIntern, setSelectedIntern] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [comments, setComments] = useState("");
  const [hoveredRating, setHoveredRating] = useState<{ [key: string]: number }>({});
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);

  const activeInterns = mockInterns.filter(i => i.status === 'active');
  const activePeriods = mockRatingPeriods.filter(p => p.status === 'active' || p.status === 'upcoming');

  // Load draft when intern and period are selected
  useEffect(() => {
    if (selectedIntern && selectedPeriod) {
      const draft = getDraft(selectedIntern, selectedPeriod);
      if (draft) {
        setRatings(draft.ratings);
        setStrengths(draft.strengths);
        setImprovements(draft.improvements);
        setComments(draft.comments);
        
        // Load attached files
        if (draft.attachments) {
          const files = draft.attachments
            .map(id => getFile(id))
            .filter((f): f is AttachedFile => f !== undefined);
          setAttachedFiles(files);
        }
        
        toast.info("Draft loaded");
      }
    }
  }, [selectedIntern, selectedPeriod]);

  const calculateProgress = () => {
    let completed = 0;
    let total = 10; // 2 selects + 8 categories
    
    if (selectedIntern) completed++;
    if (selectedPeriod) completed++;
    
    ratingCategories.forEach(cat => {
      if (ratings[cat.key]) completed++;
    });
    
    return (completed / total) * 100;
  };

  const calculateOverallScore = () => {
    const ratingValues = Object.values(ratings);
    if (ratingValues.length === 0) return 0;
    return (ratingValues.reduce((sum, val) => sum + val, 0) / ratingValues.length).toFixed(1);
  };

  const handleRatingClick = (category: string, score: number) => {
    setRatings({ ...ratings, [category]: score });
  };

  const handleSubmit = (isDraft: boolean) => {
    if (!selectedIntern || !selectedPeriod) {
      toast.error("Please select an intern and rating period");
      return;
    }

    const missingRatings = ratingCategories.filter(cat => !ratings[cat.key]);
    if (missingRatings.length > 0 && !isDraft) {
      toast.error(`Please rate all categories before submitting`);
      return;
    }

    if (isDraft) {
      saveDraft({
        internId: selectedIntern,
        periodId: selectedPeriod,
        ratings,
        strengths,
        improvements,
        comments,
        attachments: attachedFiles.map(f => f.id)
      });
      
      if (user) {
        addAuditLog({
          userId: user.id,
          userName: user.name,
          action: 'saved_draft',
          entityType: 'rating',
          entityId: selectedIntern,
          details: `Draft rating saved for ${mockInterns.find(i => i.id === selectedIntern)?.name}`
        });
      }
      
      toast.success("Draft saved successfully!");
    } else {
      if (user) {
        addAuditLog({
          userId: user.id,
          userName: user.name,
          action: 'submitted_rating',
          entityType: 'rating',
          entityId: selectedIntern,
          details: `Rating submitted for ${mockInterns.find(i => i.id === selectedIntern)?.name}`
        });
      }
      
      toast.success("Rating submitted successfully!");
      setTimeout(() => navigate('/dashboard/ratings'), 1500);
    }
  };

  const renderStars = (category: string) => {
    const currentRating = ratings[category] || 0;
    const hovered = hoveredRating[category] || 0;

    return (
      <div className="flex gap-1 sm:gap-2 flex-wrap">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => handleRatingClick(category, score)}
            onMouseEnter={() => setHoveredRating({ ...hoveredRating, [category]: score })}
            onMouseLeave={() => setHoveredRating({ ...hoveredRating, [category]: 0 })}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors ${
                score <= (hovered || currentRating)
                  ? 'text-accent fill-accent'
                  : 'text-muted-foreground'
              }`}
            />
          </button>
        ))}
        <span className="ml-2 sm:ml-3 text-base sm:text-lg font-semibold text-foreground min-w-[2rem]">
          {currentRating > 0 ? currentRating : '-'}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/dashboard/ratings')}
          className="shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Submit Rating</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Evaluate intern performance</p>
        </div>
      </div>

      {/* Progress Bar */}
      <Card className="shadow-soft border-border">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completion Progress</span>
              <span className="font-semibold text-foreground">{Math.round(calculateProgress())}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Intern & Period Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle>Select Intern</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedIntern} onValueChange={setSelectedIntern}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an intern..." />
              </SelectTrigger>
              <SelectContent>
                {activeInterns.map((intern) => (
                  <SelectItem key={intern.id} value={intern.id}>
                    {intern.name} - {intern.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle>Rating Period</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a period..." />
              </SelectTrigger>
              <SelectContent>
                {activePeriods.map((period) => (
                  <SelectItem key={period.id} value={period.id}>
                    {period.name} ({period.status})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Rating Categories */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle>Performance Categories</CardTitle>
          <CardDescription>Rate each category on a scale of 1-5 stars</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {ratingCategories.map((category) => (
            <div key={category.key} className="space-y-3 pb-6 border-b border-border last:border-0">
              <div>
                <Label className="text-base font-semibold">{category.label}</Label>
                <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
              </div>
              {renderStars(category.key)}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Overall Score Display */}
      {Object.keys(ratings).length > 0 && (
        <Card className="shadow-soft border-border bg-gradient-primary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium">Overall Score</p>
                <p className="text-primary-foreground text-lg">
                  Calculated average across all categories
                </p>
              </div>
              <div className="text-5xl font-bold text-primary-foreground">
                {calculateOverallScore()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Written Feedback */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle>Written Feedback</CardTitle>
          <CardDescription>Provide detailed comments and recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="strengths">Key Strengths</Label>
            <Textarea
              id="strengths"
              placeholder="What does this intern do exceptionally well?"
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="improvements">Areas for Improvement</Label>
            <Textarea
              id="improvements"
              placeholder="Where can this intern grow and develop?"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comments">Additional Comments</Label>
            <Textarea
              id="comments"
              placeholder="Any other feedback or observations..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* File Attachments */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle>Supporting Documents</CardTitle>
          <CardDescription>Attach resumes, portfolios, or other relevant files</CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload
            files={attachedFiles}
            onFilesChange={setAttachedFiles}
            maxFiles={5}
            maxSizeMB={10}
          />
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pb-8">
        <Button
          variant="outline"
          size="lg"
          onClick={() => handleSubmit(true)}
          className="gap-2"
        >
          <Save className="w-5 h-5" />
          Save as Draft
        </Button>
        <Button
          size="lg"
          onClick={() => handleSubmit(false)}
          className="gap-2 flex-1"
        >
          Submit Rating
        </Button>
      </div>
    </div>
  );
};

export default SubmitRating;
