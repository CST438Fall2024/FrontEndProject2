import React from 'react';
import '../css/AddItem.css';
import Layout from '../Layout';

function AddItem() {
  return (
    <Layout>
      <div className="formContainer">
        {/* Add a list */}
        <div className="addList">
          <h2>Add a List</h2>
          <form>
            <div className="formField">
              <label htmlFor="listTitle">Title:</label>
              <input type="text" id="listTitle" name="listTitle" placeholder="Enter list title" />
            </div>
            <div className="formField">
              <label htmlFor="listDescription">Description:</label>
              <textarea id="listDescription" name="listDescription" placeholder="Enter list description"></textarea>
            </div>
            <button type="submit">Add List</button>
          </form>
        </div>

        {/* Add an item */}
        <div className="addItem">
          <h2>Add an Item</h2>
          <form>
            <div className="formField">
              <label htmlFor="itemName">Item Name:</label>
              <input type="text" id="itemName" name="itemName" placeholder="Enter item name" />
            </div>
            <div className="formField">
              <label htmlFor="itemLink">Link:</label>
              <input type="text" id="itemLink" name="itemLink" placeholder="Enter item link" />
            </div>
            <div className="formField">
              <label htmlFor="itemDate">Desired Date:</label>
              <input type="date" id="itemDate" name="itemDate" />
            </div>
            <button type="submit">Add Item</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default AddItem;
