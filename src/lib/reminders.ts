import { addNotification } from './notifications';

export interface Reminder {
  id: string;
  type: 'rating_due' | 'period_ending' | 'custom';
  title: string;
  message: string;
  dueDate: string;
  internId?: string;
  periodId?: string;
  completed: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'intern_reminders';

export const getReminders = (): Reminder[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addReminder = (reminder: Omit<Reminder, 'id' | 'createdAt' | 'completed'>): Reminder => {
  const reminders = getReminders();
  const newReminder: Reminder = {
    ...reminder,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    completed: false,
  };
  
  reminders.push(newReminder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  
  return newReminder;
};

export const completeReminder = (id: string): void => {
  const reminders = getReminders();
  const updated = reminders.map(r => 
    r.id === id ? { ...r, completed: true } : r
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const deleteReminder = (id: string): void => {
  const reminders = getReminders();
  const filtered = reminders.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const checkReminders = (): void => {
  const reminders = getReminders();
  const now = new Date();
  
  reminders.forEach(reminder => {
    if (reminder.completed) return;
    
    const dueDate = new Date(reminder.dueDate);
    const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    // Trigger notification for reminders due in 3 days or less
    if (diffDays <= 3 && diffDays >= 0) {
      const existingNotifications = localStorage.getItem('intern_notifications');
      const notifications = existingNotifications ? JSON.parse(existingNotifications) : [];
      
      // Check if notification already exists
      const notificationExists = notifications.some((n: any) => 
        n.title === reminder.title && n.message.includes(reminder.message)
      );
      
      if (!notificationExists) {
        addNotification({
          type: 'warning',
          title: reminder.title,
          message: `${reminder.message} - Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`,
          actionUrl: reminder.internId ? `/dashboard/interns/${reminder.internId}` : undefined,
        });
      }
    }
  });
};

// Auto-check reminders on app load
if (typeof window !== 'undefined') {
  checkReminders();
  // Check every hour
  setInterval(checkReminders, 60 * 60 * 1000);
}
