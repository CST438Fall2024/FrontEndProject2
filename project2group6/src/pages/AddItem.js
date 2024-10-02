import React from 'react';
import '../css/AddItem.css'
import Layout from '../Layout'
function AddItem(){
    return(
        <div className="container">
        <Layout>
        {/* Add a list */}
        <div className="addList">
            <h2>Add a List</h2>
        </div>

        {/* Add an item */}
        <div className="addItem">
            <h2>Add an Item</h2>
        </div>
        </Layout>
        </div>
    );
}

export default AddItem;