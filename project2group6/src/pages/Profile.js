import React, { useState } from 'react';
import Layout from '../Layout';
//import '../css/Profile.css';

const Profile = () => {
    // State to store user details
    const [user, setUser] = useState({
        username: 'JohnDoe',
        email: 'johndoe@example.com'
    });

    return (
        <div className="container">
            <Layout>
                <h1>Profile Page</h1>
                <div className="profile-details">
                    <div className="profile-item">
                        <label>Username:</label>
                        <span>{user.username}</span>
                    </div>
                    <div className="profile-item">
                        <label>Email:</label>
                        <span>{user.email}</span>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Profile;
