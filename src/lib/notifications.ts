export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const NOTIFICATIONS_KEY = 'notifications';

export const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Notification => {
  const notifications = getNotifications();
  const newNotification: Notification = {
    ...notification,
    id: String(Date.now()),
    timestamp: new Date().toISOString(),
    read: false,
  };
  
  notifications.unshift(newNotification);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications.slice(0, 50))); // Keep last 50
  
  return newNotification;
};

export const getNotifications = (): Notification[] => {
  try {
    const notifications = localStorage.getItem(NOTIFICATIONS_KEY);
    return notifications ? JSON.parse(notifications) : [];
  } catch {
    return [];
  }
};

export const markAsRead = (id: string) => {
  const notifications = getNotifications();
  const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
};

export const markAllAsRead = () => {
  const notifications = getNotifications();
  const updated = notifications.map(n => ({ ...n, read: true }));
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
};

export const deleteNotification = (id: string) => {
  const notifications = getNotifications().filter(n => n.id !== id);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
};

export const clearAllNotifications = () => {
  localStorage.removeItem(NOTIFICATIONS_KEY);
};
