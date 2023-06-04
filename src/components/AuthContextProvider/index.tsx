'use client';
import AuthContext from '@/contexts/AuthContext';
import { ReactNode, useEffect, useState } from 'react';
import { registerResetAuthMethod } from '@/libs/axios';

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const getUser = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  // call get user once on mount
  useEffect(() => {
    getUser();

    registerResetAuthMethod(() => {
      setUser(null);
    });
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
