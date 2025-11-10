import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Eye, Download, Filter, Trash2 } from "lucide-react";
import { mockRatings, mockInterns, mockRatingPeriods } from "@/lib/mockData";
import { exportRatingsToPDF, exportRatingsToCSV } from "@/lib/exportUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { addAuditLog } from "@/lib/auditLog";
import { getCurrentUser } from "@/lib/auth";
import { toast } from "sonner";

const Ratings = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  const getInternName = (internId: string) => {
    return mockInterns.find(i => i.id === internId)?.name || 'Unknown';
  };

  const getPeriodName = (periodId: string) => {
    return mockRatingPeriods.find(p => p.id === periodId)?.name || 'Unknown';
  };

  // Filter ratings
  const filteredRatings = mockRatings.filter(rating => {
    const internName = getInternName(rating.internId).toLowerCase();
    const matchesSearch = internName.includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rating.status === statusFilter;
    const matchesPeriod = periodFilter === 'all' || rating.periodId === periodFilter;
    
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const handleExportPDF = () => {
    const toExport = selectedRatings.length > 0 
      ? filteredRatings.filter(r => selectedRatings.includes(r.id))
      : filteredRatings;
    exportRatingsToPDF(toExport, mockInterns, mockRatingPeriods);
    toast.success(`${toExport.length} rating(s) exported to PDF`);
  };

  const handleExportCSV = () => {
    const toExport = selectedRatings.length > 0 
      ? filteredRatings.filter(r => selectedRatings.includes(r.id))
      : filteredRatings;
    exportRatingsToCSV(toExport, mockInterns, mockRatingPeriods);
    toast.success(`${toExport.length} rating(s) exported to CSV`);
  };

  const handleBulkDelete = () => {
    if (selectedRatings.length === 0) {
      toast.error("No ratings selected");
      return;
    }
    
    if (user) {
      addAuditLog({
        userId: user.id,
        userName: user.name,
        action: 'bulk_delete',
        entityType: 'rating',
        entityId: 'multiple',
        details: `Deleted ${selectedRatings.length} rating(s)`
      });
    }
    
    toast.success(`${selectedRatings.length} rating(s) deleted`);
    setSelectedRatings([]);
  };

  const toggleSelectAll = () => {
    if (selectedRatings.length === filteredRatings.length) {
      setSelectedRatings([]);
    } else {
      setSelectedRatings(filteredRatings.map(r => r.id));
    }
  };

  const toggleSelectRating = (id: string) => {
    setSelectedRatings(prev => 
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const renderStars = (score: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= score
                ? 'text-accent fill-accent'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ratings</h1>
          <p className="text-muted-foreground mt-1">View and manage intern performance ratings</p>
        </div>
        <div className="flex gap-2">
          {selectedRatings.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete} className="gap-2">
              <Trash2 className="w-4 h-4" />
              Delete ({selectedRatings.length})
            </Button>
          )}
          <Button variant="outline" className="gap-2" onClick={handleExportPDF}>
            <Download className="w-4 h-4" />
            {selectedRatings.length > 0 ? `Export (${selectedRatings.length})` : 'Export PDF'}
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
            <Download className="w-4 h-4" />
            CSV
          </Button>
          <Button className="gap-2" onClick={() => navigate('/dashboard/ratings/submit')}>
            <Plus className="w-4 h-4" />
            Submit Rating
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-soft border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by intern name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Periods</SelectItem>
                {mockRatingPeriods.map(period => (
                  <SelectItem key={period.id} value={period.id}>{period.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rating Categories Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Technical Skills', key: 'technicalSkills' },
          { label: 'Communication', key: 'communication' },
          { label: 'Teamwork', key: 'teamwork' },
          { label: 'Initiative', key: 'initiative' },
        ].map((category) => {
          const avg = mockRatings.reduce((sum, r) => sum + (r as any)[category.key], 0) / mockRatings.length;
          return (
            <Card key={category.key} className="shadow-soft border-border">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">{category.label}</p>
                <div className="flex items-center gap-2">
                  {renderStars(Math.round(avg))}
                  <span className="text-lg font-bold text-foreground">{avg.toFixed(1)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Ratings List */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Ratings</CardTitle>
            {filteredRatings.length > 0 && (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedRatings.length === filteredRatings.length}
                  onCheckedChange={toggleSelectAll}
                />
                <span className="text-sm text-muted-foreground">Select All</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRatings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No ratings found matching your filters.</p>
            ) : (
              filteredRatings.map((rating) => {
                const isSelected = selectedRatings.includes(rating.id);
                return (
              <div
                key={rating.id}
                className={`p-4 rounded-lg border transition-all ${isSelected ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleSelectRating(rating.id)}
                      className="mt-1"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{getInternName(rating.internId)}</h3>
                      <p className="text-sm text-muted-foreground">{getPeriodName(rating.periodId)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">{rating.overallScore}</div>
                      <div className="text-xs text-muted-foreground">Overall</div>
                    </div>
                    <Badge className="bg-success/10 text-success border-success/20" variant="outline">
                      {rating.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Technical Skills</p>
                    {renderStars(rating.technicalSkills)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Communication</p>
                    {renderStars(rating.communication)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Teamwork</p>
                    {renderStars(rating.teamwork)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Initiative</p>
                    {renderStars(rating.initiative)}
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Strengths: </span>
                    <span className="text-muted-foreground">{rating.strengths}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Areas for Improvement: </span>
                    <span className="text-muted-foreground">{rating.improvements}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                </div>
              </div>
              );
            })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Ratings;
