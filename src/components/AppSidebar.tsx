import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Star,
  BarChart3,
  Settings,
  LogOut,
  Calendar,
  FileText,
  Bell,
  GitCompare,
  Upload,
  Clock,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { getCurrentUser, logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const baseMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
];

const adminMenu = [
  {
    title: "Interns",
    url: "/dashboard/interns",
    icon: Users,
  },
  {
    title: "Ratings",
    url: "/dashboard/ratings",
    icon: Star,
  },
  {
    title: "Periods",
    url: "/dashboard/periods",
    icon: Calendar,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Audit Log",
    url: "/dashboard/audit-log",
    icon: FileText,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Compare",
    url: "/dashboard/compare",
    icon: GitCompare,
  },
  {
    title: "Import",
    url: "/dashboard/import",
    icon: Upload,
  },
  {
    title: "Reminders",
    url: "/dashboard/reminders",
    icon: Clock,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

const directorMenu = [
  {
    title: "Interns",
    url: "/dashboard/interns",
    icon: Users,
  },
  {
    title: "Ratings",
    url: "/dashboard/ratings",
    icon: Star,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Reminders",
    url: "/dashboard/reminders",
    icon: Clock,
  },
];

const managerMenu = [
  {
    title: "Interns",
    url: "/dashboard/interns",
    icon: Users,
  },
  {
    title: "Ratings",
    url: "/dashboard/ratings",
    icon: Star,
  },
  {
    title: "Submit Rating",
    url: "/dashboard/ratings/submit",
    icon: Star,
  },
  {
    title: "Reminders",
    url: "/dashboard/reminders",
    icon: Clock,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const menuItems = (() => {
    if (!user) return baseMenu;

    switch (user.role) {
      case "admin":
        return [...baseMenu, ...adminMenu];
      case "director":
        return [...baseMenu, ...directorMenu];
      case "manager":
        return [...baseMenu, ...managerMenu];
      default:
        return baseMenu;
    }
  })();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">InternRate</span>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end={item.url === "/dashboard"}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-sidebar-accent/50"
                        }
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="space-y-3">
          <div className="px-2">
            <p className="text-sm font-medium text-sidebar-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-primary font-medium capitalize mt-1">{user?.role}</p>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
