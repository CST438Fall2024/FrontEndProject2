import React, { useState } from 'react';
import axios from 'axios';
import '../css/AddItem.css';
import Layout from '../Layout';

function AddItem() {
  const [listTitle, setListTitle] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [message, setMessage] = useState(''); // To show success or error messages

  // hardcoded until sessions
  const userID = 2; 

  // handle submission -- TO DO: test when List endpoints are finished
  const handleAddList = async (e) => {
    e.preventDefault();

    if (!listTitle || !listDescription) {
      setMessage('Please provide both title and description');
      return;
    }

    try {
      const response = await axios.post('/wishlists/add', {
        wishlistName: listTitle,
        description: listDescription,
        userID: userID,
      });

      if (response.status === 200) {
        setMessage('Wishlist added successfully');
        setListTitle('');
        setListDescription('');
      }
    } catch (error) {
      console.error('Error adding wishlist:', error);
      setMessage('Failed to add wishlist. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="formContainer">
        {/* Add a list */}
        <div className="addList">
          <h2>Add a List</h2>
          <form onSubmit={handleAddList}>
            <div className="formField">
              <label htmlFor="listTitle">Title:</label>
              <input
                type="text"
                id="listTitle"
                name="listTitle"
                placeholder="Enter list title"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
              />
            </div>
            <div className="formField">
              <label htmlFor="listDescription">Description:</label>
              <textarea
                id="listDescription"
                name="listDescription"
                placeholder="Enter list description"
                value={listDescription}
                onChange={(e) => setListDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit">Add List</button>
          </form>
          {message && <p>{message}</p>}
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
