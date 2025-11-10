import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Plus, Edit, Trash2 } from "lucide-react";
import { mockRatingPeriods, RatingPeriod } from "@/lib/mockData";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const RatingPeriods = () => {
  const [periods, setPeriods] = useState<RatingPeriod[]>(mockRatingPeriods);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<RatingPeriod | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "upcoming" as RatingPeriod['status']
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all fields");
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.error("End date must be after start date");
      return;
    }

    if (editingPeriod) {
      setPeriods(periods.map(p => 
        p.id === editingPeriod.id 
          ? { ...p, ...formData }
          : p
      ));
      toast.success("Rating period updated successfully");
    } else {
      const newPeriod: RatingPeriod = {
        id: String(Date.now()),
        ...formData
      };
      setPeriods([...periods, newPeriod]);
      toast.success("Rating period created successfully");
    }

    resetForm();
  };

  const handleDelete = (id: string) => {
    setPeriods(periods.filter(p => p.id !== id));
    toast.success("Rating period deleted");
  };

  const handleEdit = (period: RatingPeriod) => {
    setEditingPeriod(period);
    setFormData({
      name: period.name,
      startDate: period.startDate,
      endDate: period.endDate,
      status: period.status
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      startDate: "",
      endDate: "",
      status: "upcoming"
    });
    setEditingPeriod(null);
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: RatingPeriod['status']) => {
    const variants = {
      active: "bg-success/10 text-success",
      upcoming: "bg-primary/10 text-primary",
      closed: "bg-muted text-muted-foreground"
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rating Periods</h1>
          <p className="text-muted-foreground mt-1">Manage evaluation timeframes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Period
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPeriod ? "Edit" : "Create"} Rating Period</DialogTitle>
              <DialogDescription>
                Define the timeframe for intern evaluations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Period Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Q1 2025"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: RatingPeriod['status']) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button onClick={handleSubmit}>
                {editingPeriod ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {periods.map((period) => (
          <Card key={period.id} className="shadow-soft border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <CardTitle>{period.name}</CardTitle>
                    {getStatusBadge(period.status)}
                  </div>
                  <CardDescription>
                    {new Date(period.startDate).toLocaleDateString()} - {new Date(period.endDate).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(period)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(period.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Duration: </span>
                  <span className="font-medium text-foreground">
                    {Math.ceil((new Date(period.endDate).getTime() - new Date(period.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RatingPeriods;
