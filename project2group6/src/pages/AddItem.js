import React from 'react';
import '../css/AddItem.css'
function AddItem(){
    return(
        <div className="addSection">

        {/* Add a list */}
        <div className="addList">
            <h2>Add a List</h2>
        </div>

        {/* Add an item */}
        <div className="addItem">
            <h2>Add an Item</h2>
        </div>
        </div>
    );
}

export default AddItem;