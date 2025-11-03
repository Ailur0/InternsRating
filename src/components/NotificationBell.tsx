import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getNotifications } from "@/lib/notifications";
import { useNavigate } from "react-router-dom";

export const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCount = () => {
      const notifications = getNotifications();
      setUnreadCount(notifications.filter(n => !n.read).length);
    };

    updateCount();
    const interval = setInterval(updateCount, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => navigate('/dashboard/notifications')}
    >
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
};
