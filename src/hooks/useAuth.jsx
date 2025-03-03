import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const { user, isLoading, error, login, logout } = useContext(AuthContext);

  return { user, isLoading, error, login, logout };
};
