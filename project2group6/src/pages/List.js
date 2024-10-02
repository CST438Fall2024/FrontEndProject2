import React, { useEffect, useState } from 'react';
import '../css/List.css';
import {useNavigate, Routes, Route} from 'react-router-dom';
import AddItem from './AddItem';
import Layout from "../Layout"

const List = () => {
    const [items, setItems] = useState([]);

// ----------------- INTEGRATE LATER --------------------
     useEffect(() => {
         const fetchItems = async () => {
            //const data = await response.json();
            const data = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
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
            <h1>Wishlist / Item List</h1>
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
                <button onClick={() => handleNavigation('/add-item')}>Add</button>
            </div>
            </Layout>
        </div>
    );
};

export default List;
