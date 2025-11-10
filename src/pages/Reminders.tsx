import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Plus, Trash2, Check, Calendar } from "lucide-react";
import { getReminders, addReminder, completeReminder, deleteReminder, Reminder } from "@/lib/reminders";
import { mockInterns, mockRatingPeriods } from "@/lib/mockData";
import { toast } from "sonner";
import { EmptyState } from "@/components/ui/empty-state";
import { format, formatDistanceToNow } from "date-fns";

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>(getReminders());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: 'custom' as const,
    title: '',
    message: '',
    dueDate: '',
    internId: '',
    periodId: '',
  });

  const handleAddReminder = () => {
    if (!formData.title || !formData.message || !formData.dueDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    addReminder(formData);
    setReminders(getReminders());
    setIsDialogOpen(false);
    setFormData({
      type: 'custom',
      title: '',
      message: '',
      dueDate: '',
      internId: '',
      periodId: '',
    });
    toast.success("Reminder created");
  };

  const handleComplete = (id: string) => {
    completeReminder(id);
    setReminders(getReminders());
    toast.success("Reminder completed");
  };

  const handleDelete = (id: string) => {
    deleteReminder(id);
    setReminders(getReminders());
    toast.success("Reminder deleted");
  };

  const activeReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Rating Reminders</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage automated reminders and notifications
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Add Reminder
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Reminder</DialogTitle>
              <DialogDescription>Set up a new rating reminder</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating_due">Rating Due</SelectItem>
                    <SelectItem value="period_ending">Period Ending</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Rating Due for Emily Johnson"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Complete performance review"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Intern (Optional)</Label>
                  <Select
                    value={formData.internId}
                    onValueChange={(value) => setFormData({ ...formData, internId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockInterns.map((intern) => (
                        <SelectItem key={intern.id} value={intern.id}>
                          {intern.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Period (Optional)</Label>
                  <Select
                    value={formData.periodId}
                    onValueChange={(value) => setFormData({ ...formData, periodId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockRatingPeriods.map((period) => (
                        <SelectItem key={period.id} value={period.id}>
                          {period.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddReminder} className="w-full">
                Create Reminder
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Reminders */}
      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Active Reminders ({activeReminders.length})
          </CardTitle>
          <CardDescription>Upcoming rating reminders and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          {activeReminders.length === 0 ? (
            <EmptyState
              icon={Bell}
              title="No active reminders"
              description="Create reminders to stay on top of rating deadlines"
            />
          ) : (
            <div className="space-y-3">
              {activeReminders.map((reminder) => {
                const daysUntilDue = Math.ceil(
                  (new Date(reminder.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                const isOverdue = daysUntilDue < 0;

                return (
                  <Card key={reminder.id} className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold truncate">{reminder.title}</h3>
                          <Badge variant={isOverdue ? "destructive" : "secondary"}>
                            {isOverdue ? "Overdue" : `${daysUntilDue}d`}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{reminder.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          Due {format(new Date(reminder.dueDate), 'MMM d, yyyy')}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleComplete(reminder.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(reminder.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <Card className="shadow-soft border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Completed ({completedReminders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {completedReminders.slice(0, 5).map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg opacity-60"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{reminder.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Completed {formatDistanceToNow(new Date(reminder.createdAt))} ago
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(reminder.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reminders;
