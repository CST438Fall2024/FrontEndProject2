import React, { useEffect, useState } from 'react';
import '../css/List.css';

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

    return (
        <div className="items-list-container">
            <div className="header">
                <button onClick={() => alert('Home button clicked!')}>Home</button>
                <button onClick={() => alert('Settings button clicked!')}>Settings</button>
            </div>
            <div className="item-list">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} className="item">
                            {item}
                            <button onClick={() => alert('Edit clicked!')}>Edit</button>
                            <button onClick={() => alert('Remove clicked')}>Add</button>
                        </div>
                    ))
                ) : (
                    <p>No items available</p>
                )}
                <button onClick={() => alert('Add button Clicked')}>Add</button>
            </div>
        </div>

    
    );
};

export default List;
