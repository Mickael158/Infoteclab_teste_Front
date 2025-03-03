import React from 'react';

import "./LoginForm.css";

// Definir le formulaire pour le login
const LoginForm = ({ email, setEmail, password, setPassword, onSubmit, isLoading, error }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="input-group-container">
        <label>Email:</label>
        <input 
          type="email" 
          placeholder='Entrer votre e-mail'
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="input-group-container">
        <label>Password:</label>
        <input 
          type="password" 
          placeholder='Entrer votre Password'
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="submit-container">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
