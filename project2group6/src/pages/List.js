import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/List.css';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

const List = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistInfo, setWishlistInfo] = useState('');

  // temporary hardcoded until sessions
  const userID = 2;

  useEffect(() => {
    const fetchWishlists = async () => {
      try {
        const response = await axios.get(`/wishlists/by/2`); // hardcoded
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

  // navigate to the specific wishlist page
  const goToWishlist = (wishlistID) => {
    navigate(`/wishlist/${wishlistID}`);
  };

  // delete a wishlist
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

  const handleEdit = async (wishlistID) => {
    try 
    {
      const response = await axios.get(`/wishlist/info/${wishlistID}`);
      setWishlistInfo(response.data);
      console.log(response.data);
    }
    catch(error)
    {
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

        <div className="item-list">
          {loading ? (
            <p>Loading wishlists...</p>
          ) : error ? (
            <p>{error}</p>
          ) : wishlists.length > 0 ? (
            wishlists.map((wishlist, index) => (
              <div key={index} className="item">
                {/* Navigate to wishlist page on name click */}
                <strong 
                  onClick={() => goToWishlist(wishlist.wishlistID)}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  {wishlist.wishlistName}
                </strong>
                <div className="button-container">
                  <button onClick={() => handleEdit(wishlist.wishlistID)}>Edit</button>
                  <button onClick={() => handleDelete(wishlist.wishlistID)}>Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p>No wishlists available</p>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default List;
