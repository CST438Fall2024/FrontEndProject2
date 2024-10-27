import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AddItem.css';
import Layout from '../Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
function AddItem() {
  const [listTitle, setListTitle] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [wishlists, setWishlists] = useState([]);
  const [selectedList, setSelectedList] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemLink, setItemLink] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [message, setMessage] = useState('');
  // sessions
  const userID = localStorage.getItem('userID');
  useEffect(() => {
    const fetchWishlists = async () => {
      if (!userID) {
        setMessage('User is not logged in');
        return;
      }
      try {
        const response = await axios.get(`/wishlists/by/${userID}`);
        setWishlists(response.data);
      } catch (error) {
        console.error('Error fetching wishlists:', error);
        setMessage('Failed to fetch wishlists. Please try again.');
      }
    };
    fetchWishlists();
  }, [userID]);
  // NEW WISHLIST
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
        const updatedWishlists = await axios.get(`/wishlists/by/${userID}`);
        setWishlists(updatedWishlists.data);
      }
    } catch (error) {
      console.error('Error adding wishlist:', error);
      setMessage('Failed to add wishlist. Please try again.');
    }
  };
  // NEW ITEM
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!itemName || !selectedList) {
      setMessage('Please select a wishlist and enter an item name');
      return;
    }
    try {
      const response = await axios.post(`/items/add`, {
        itemName: itemName,
        itemLink: itemLink,
        itemQuantity: itemQuantity,
        wishlistID: selectedList,
      });
      if (response.status === 200) {
        setMessage('Item added successfully');
        setItemName('');
        setItemLink('');
        setItemQuantity(1);
      }
      console.log(response);
      console.log(`${itemName}, ${itemLink}, ${itemQuantity}, ${selectedList}`);
    } catch (error) {
      console.error('Error adding item:', error);
      setMessage('Failed to add item. Please try again.');
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
          <form onSubmit={handleAddItem}>
            <div className="formField">
              <label htmlFor="itemName">Item Name:</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                placeholder="Enter item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>
            <div className="formField">
              <label htmlFor="listDropdown">Add to Wishlist:</label>
              <select
                id="listDropdown"
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
              >
                <option value="">Select a wishlist</option>
                {wishlists.map((list) => (
                  <option key={list.wishlistID} value={list.wishlistID}>
                    {list.wishlistName}
                  </option>
                ))}
              </select>
            </div>
            <div className="formField">
              <label htmlFor="itemLink">Link:</label>
              <input
                type="text"
                id="itemLink"
                name="itemLink"
                placeholder="Enter item link"
                value={itemLink}
                onChange={(e) => setItemLink(e.target.value)}
              />
            </div>
            <div className="formField">
              <label htmlFor= "itemQuantity">Desired Quantity:</label>
              <input
                type="number"
                id="itemQuantity"
                name="itemQuantity"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
              />
            </div>
            <button type="submit">Add Item</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </Layout>
  );
}
export default AddItem;
