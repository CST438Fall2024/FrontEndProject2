import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../css/List.css';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

const List = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistDescription, setWishlistDescription] = useState('');
  const [wishlistName, setWishlistName] = useState('');
  const [currentWishlistID, setCurrentWishlistID] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const bottomReference = useRef(null);

  // temporary hardcoded until sessions
  const userID = 2;

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await axios.get(`/wishlists/by/${userID}`); // hardcoded
        setWishlists(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wishlists:', error);
        setError('Failed to fetch wishlists');
        setLoading(false);
      }
    };

    fetchWishlists();
  }, [userID]);

  // NAVIGATION
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Navigate to the specific wishlist page
  const goToWishlist = (wishlistID) => {
    navigate(`/wishlist/${wishlistID}`);
  };

  // Delete a wishlist
  const handleDelete = async (wishlistID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this wishlist?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/wishlists/delete/${wishlistID}`);
      setWishlists((prevWishlists) => prevWishlists.filter(wishlist => wishlist.wishlistID !== wishlistID));
    } catch (error) {
      console.error('Error deleting wishlist:', error);
      setError('Failed to delete wishlist');
    }
  };

  //Opens the edit Form
  const openEdit = (wishlistID) => {
    const currentWishlist = wishlists.find(wishlist => wishlist.wishlistID === wishlistID);
    setWishlistName(currentWishlist.wishlistName);
    setWishlistDescription(currentWishlist.description);
    setCurrentWishlistID(wishlistID);
  };

  //Implementing a Button to go to the bottom of the Page
  const ScrollToBottom = () => {
    bottomReference.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handles the edits for the wishlist
  const handleEdit = async (wishlistID) => {
    try {
      await axios.put(`/wishlists/edit`, {
        wishlistID: currentWishlistID,
        wishlistName: wishlistName,
        description: wishlistDescription,
      });
      setWishlists((prevWishlists) =>
        prevWishlists.map(wishlist =>
          wishlist.wishlistID === currentWishlistID
            ? { ...wishlist, wishlistName, description: wishlistDescription }
            : wishlist
        )
      );
      alert("Wishlist updated successfully.");
      setCurrentWishlistID(null);
      setWishlistName('');
      setWishlistDescription('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Layout>
        <h1>
          Wishlist / Item List{' '}
          <button onClick={() => handleNavigation('/add-item')}>Add</button>
        </h1>
        <div className="container mb-3">
          <input
            type="text"
            placeholder="Search for a Wishlist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control mb-3" />
          <button onClick={ScrollToBottom} className="btn btn-primary">Scroll to Bottom</button>
        </div>
        <div className="item-list">
          {loading ? (
            <p>Loading wishlists...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            (() => {
              const filteredWishlists = wishlists.filter(wishlist =>
                wishlist.wishlistName.toLowerCase().includes(searchQuery.toLowerCase())
              );
              return filteredWishlists.length > 0 ? (
                filteredWishlists.map((wishlist) => (
                  <div key={wishlist.wishlistID} className="item">
                    <strong
                      onClick={() => goToWishlist(wishlist.wishlistID)}
                      style={{ cursor: 'pointer', color: 'blue' }}
                    >
                      {wishlist.wishlistName}
                    </strong>
                    <div className="button-container">
                      <button onClick={() => openEdit(wishlist.wishlistID)}>Edit</button>
                      <button onClick={() => handleDelete(wishlist.wishlistID)}>Remove</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No wishlists available</p>
              );
            })())}
        </div>
        {/* The form for editing the Wishlist */}
        {currentWishlistID && (
          <div className="edit-form">
            <h2>Edit Wishlist</h2>
            <input
              type="text"
              className="form-control"
              value={wishlistName}
              onChange={(e) => setWishlistName(e.target.value)}
              placeholder="Enter Wishlist Name"
            />
            <textarea
              className="form-control"
              value={wishlistDescription}
              onChange={(e) => setWishlistDescription(e.target.value)}
              placeholder="Enter Description"
            />
            <div ref= {bottomReference}></div>
            <div className="button-group">
              <button className="btn btn-primary" onClick={handleEdit}>
                Save Changes
              </button>
              <button className="btn btn-secondary" onClick={() => setCurrentWishlistID(null)}>
                Cancel
              </button>
            </div>
            {successMessage && <p>{successMessage}</p>}
          </div>
        )}
      </Layout>
    </div>
  );
};

export default List;
