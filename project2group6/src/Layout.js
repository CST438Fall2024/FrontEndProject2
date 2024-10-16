import React from 'react';
import {useNavigate, Routes, Route} from 'react-router-dom';
import "./css/Layout.css";
import PropTypes from 'prop-types';

const Layout = ({ admin, children }) => {
     // NAVIGATION
    const navigate = useNavigate();

    const handleNavigation = (path) => {
    navigate(path);
    }
  return (
    <div className="container">
      <div className="header">
                <button className="btn btn-primary" onClick={() => handleNavigation('/list')}>Home</button>
                <button className="btn btn-primary" onClick={() => {
                  handleNavigation('/');
                  localStorage.removeItem("sessionToken")}}>Logout</button>
                <p className="fs-1">WEBSITE NAME</p>
                { admin &&
                  <button className="btn btn-primary"onClick={() => handleNavigation('/admin')}>Admin</button>
                }
                <button className="btn btn-primary"onClick={() => handleNavigation('/profile')}>Profile</button>
            </div>
      <main>{children}</main>
    </div>
  );
};
  Layout.propTypes =
  { admin: PropTypes.bool.isRequired,
  children: PropTypes.node,
  }

export default Layout;
