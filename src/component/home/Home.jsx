import React, { useEffect } from "react";
import { useAuth } from '../../hooks/useAuth';

import "./Home.css";

const Home = () => {
    const { logout } = useAuth();

    // Deconnection
    useEffect(() => {
        if(!sessionStorage.getItem("accessToken")) {
            window.location.href="/login";        
        }
        
    }, []);

    return (
        <div className="home-container">
            <span onClick={logout}>Log out</span>
            <h1>Home</h1>    
        </div>
    );
};

export default Home;