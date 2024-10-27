import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './css/Layout.css';

const Layout = ({children }) => {
  // NAVIGATION
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin'));
  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="container">
      <div className="header">
        <button 
          className="btn btn-primary" 
          onClick={() => handleNavigation('/list')}
        >
          Home
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            handleNavigation('/');
            localStorage.removeItem('sessionToken');
          }}
        >
          Logout
        </button>
        <p className="fs-1">LIST OF WISHES</p>
        {admin && (
          <button 
            className="btn btn-primary" 
            onClick={() => handleNavigation('/admin')}
          >
            Admin
          </button>
        )}
        <button 
          className="btn btn-primary" 
          onClick={() => handleNavigation('/profile')}
        >
          Profile
        </button>
      </div>
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
