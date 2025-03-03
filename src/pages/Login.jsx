import React, { useEffect } from 'react';
import Login from '../component/auth/login/Login';

const LoginPage = () => {
  useEffect(()=> {
    if(sessionStorage.getItem("accessToke") && sessionStorage.getItem("refreshToken"))
    window.location.href = "/login";
  }, []);
  
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
