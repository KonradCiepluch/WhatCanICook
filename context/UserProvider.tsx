import React, { useState, useCallback, useContext, createContext } from 'react';
import { User } from 'firebase/auth';

interface IUserContext {
  authenticatedUser: User;
  handleSignInUser: (user: User) => void;
  handleSignOutUser: () => void;
}

const UserContext = createContext<IUserContext | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null);

  const handleSignInUser = useCallback((user: User) => setAuthenticatedUser(user), []);

  const handleSignOutUser = useCallback(() => setAuthenticatedUser(null), []);

  return <UserContext.Provider value={{ authenticatedUser, handleSignInUser, handleSignOutUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;

export const useUser = () => {
  const ctx = useContext(UserContext);

  if (!ctx) throw new Error('useUsers needs to be used inside UserProvider');

  return ctx;
};
