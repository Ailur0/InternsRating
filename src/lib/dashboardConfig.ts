export interface DashboardWidget {
  id: string;
  type: 'stats' | 'recent-ratings' | 'active-interns' | 'active-period' | 'quick-actions';
  title: string;
  visible: boolean;
  order: number;
}

const DEFAULT_WIDGETS: DashboardWidget[] = [
  { id: 'stats', type: 'stats', title: 'Statistics', visible: true, order: 0 },
  { id: 'active-period', type: 'active-period', title: 'Active Period', visible: true, order: 1 },
  { id: 'recent-ratings', type: 'recent-ratings', title: 'Recent Ratings', visible: true, order: 2 },
  { id: 'active-interns', type: 'active-interns', title: 'Active Interns', visible: true, order: 3 },
];

const DASHBOARD_CONFIG_KEY = 'dashboardConfig';

export const getDashboardConfig = (): DashboardWidget[] => {
  try {
    const config = localStorage.getItem(DASHBOARD_CONFIG_KEY);
    return config ? JSON.parse(config) : DEFAULT_WIDGETS;
  } catch {
    return DEFAULT_WIDGETS;
  }
};

export const saveDashboardConfig = (widgets: DashboardWidget[]) => {
  localStorage.setItem(DASHBOARD_CONFIG_KEY, JSON.stringify(widgets));
};

export const resetDashboardConfig = () => {
  localStorage.removeItem(DASHBOARD_CONFIG_KEY);
  return DEFAULT_WIDGETS;
};
