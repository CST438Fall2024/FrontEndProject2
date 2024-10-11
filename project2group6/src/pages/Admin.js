import React, { useEffect, useState } from 'react';
import '../css/List.css'; // uses same style
import {useNavigate, Routes, Route} from 'react-router-dom';
import AddItem from './AddItem';
import Layout from "../Layout"

function Admin(){
    const [items, setItems] = useState([]);

    // ----------------- INTEGRATE LATER --------------------
         useEffect(() => {
             const fetchItems = async () => {
                //const data = await response.json();
                const data = ["User1", "User2", "User3", "User4", "User5"];
                 setItems(data);
             };
    
             fetchItems();
         }, []);
    
         // NAVIGATION
         const navigate = useNavigate();
    
         const handleNavigation = (path) => {
         navigate(path);
        };
    
        return (
    
            <div className="container">
                <Layout>          
                    <h1> All Users </h1>    
                <div className="item-list">
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <div key={index} className="item">
                                {item}
                                <button onClick={() => alert('Edit clicked!')}>Edit</button>
                                <button onClick={() => alert('Remove clicked')}>Remove</button>
                            </div>
                        ))
                    ) : (
                        <p>No items available</p>
                    )}
                    
                </div>
                </Layout>
            </div>
        );
}
export default Admin;