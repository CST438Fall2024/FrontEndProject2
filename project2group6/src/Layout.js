import React from 'react';
import {useNavigate, Routes, Route} from 'react-router-dom';
import "./css/Layout.css"

const Layout = ({ children }) => {
     // NAVIGATION
    const navigate = useNavigate();

    const handleNavigation = (path) => {
    navigate(path);
    }
  return (
    <div className="container">
      <div className="header">
                <button className="btn btn-primary" onClick={() => handleNavigation('/list')}>Home</button>
                <p className="fs-1">WEBSITE NAME</p>
                <button className="btn btn-primary"onClick={() => handleNavigation('/admin')}>Admin</button>
                <button className="btn btn-primary"onClick={() => handleNavigation('/profile')}>Profile</button>
            </div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
