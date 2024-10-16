import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListPage from '../pages/List';
import ProfilePage from '../pages/Profile';
import AdminPage from '../pages/Admin';

const NavigationLayout = ({ admin }) => {
    return (
            <Routes path="*" element={
                <>
                    <Route path="/" element={<ListPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    {admin && <Route path="/admin" element={<AdminPage />} />}
                </>
            } />
    )
}

export default NavigationLayout;
