import React, { createContext, useContext, useState } from 'react';
import authService from '../services/authService';
import api from "../services/api";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    api.post("/auth/logout", {
      access: sessionStorage.getItem("accessToken"),
      refresh: sessionStorage.getItem("refreshToken"),
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      setUser(null);
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      window.location.href = "/login";
    }).catch((error) => {
      alert(error);
    });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
