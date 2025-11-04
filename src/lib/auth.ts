import { mockUsers, User } from './mockData';

export const login = (email: string, password: string): User | null => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return userWithoutPassword as User;
  }
  
  return null;
};

export const logout = (): void => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
