import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import LoginForm from '../loginForm/LoginForm';

import "./Login.css";

const Login = () => {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Attendre un court délai pour déclencher l'animation d'apparition
    const timer = setTimeout(() => {
      const content = document.querySelector('.login-content');
      if (content) {
        content.classList.add('animate');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Login</h2>
        <LoginForm
          email={email} 
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Login;
