export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: 'rating' | 'intern' | 'period' | 'user';
  entityId: string;
  details: string;
  timestamp: string;
}

const AUDIT_LOG_KEY = 'auditLogs';

export const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
  const logs = getAuditLogs();
  const newLog: AuditLog = {
    ...log,
    id: String(Date.now()),
    timestamp: new Date().toISOString()
  };
  logs.unshift(newLog);
  
  // Keep only last 100 entries
  const trimmedLogs = logs.slice(0, 100);
  localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(trimmedLogs));
  
  return newLog;
};

export const getAuditLogs = (): AuditLog[] => {
  try {
    const logs = localStorage.getItem(AUDIT_LOG_KEY);
    return logs ? JSON.parse(logs) : [];
  } catch {
    return [];
  }
};

export const clearAuditLogs = () => {
  localStorage.removeItem(AUDIT_LOG_KEY);
};
