import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAuditLogs, clearAuditLogs } from "@/lib/auditLog";
import { FileText, Trash2, Clock, User } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const AuditLog = () => {
  const logs = getAuditLogs();

  const handleClearLogs = () => {
    clearAuditLogs();
    toast.success("Audit logs cleared");
    window.location.reload();
  };

  const getActionBadge = (action: string) => {
    const colors: { [key: string]: string } = {
      submitted_rating: "bg-success/10 text-success",
      saved_draft: "bg-primary/10 text-primary",
      bulk_delete: "bg-destructive/10 text-destructive",
      updated_intern: "bg-accent/10 text-accent",
      created_period: "bg-primary/10 text-primary"
    };
    return <Badge className={colors[action] || "bg-muted text-muted-foreground"}>
      {action.replace(/_/g, ' ')}
    </Badge>;
  };

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'rating':
        return '⭐';
      case 'intern':
        return '👤';
      case 'period':
        return '📅';
      default:
        return '📝';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Log</h1>
          <p className="text-muted-foreground mt-1">Track all system activities and changes</p>
        </div>
        {logs.length > 0 && (
          <Button variant="destructive" onClick={handleClearLogs} className="gap-2">
            <Trash2 className="w-4 h-4" />
            Clear All Logs
          </Button>
        )}
      </div>

      <Card className="shadow-soft border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Activity History
          </CardTitle>
          <CardDescription>
            {logs.length} total {logs.length === 1 ? 'entry' : 'entries'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No audit logs yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Activities will be tracked here automatically
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 border border-border rounded-lg hover:shadow-soft transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getEntityIcon(log.entityType)}</span>
                        {getActionBadge(log.action)}
                      </div>
                      <p className="text-foreground font-medium">{log.details}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {log.userName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(log.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLog;
