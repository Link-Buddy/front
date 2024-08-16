// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getAccessKey, removeAccessKey } from '../utils/storage';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessKey, setAccessKey] = useState<string | null>(null);

  useEffect(() => {
    const key = getAccessKey();
    if (key) {
      setAccessKey(key);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logout = () => {
    removeAccessKey();
    setAccessKey(null);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, accessKey, logout };
};
