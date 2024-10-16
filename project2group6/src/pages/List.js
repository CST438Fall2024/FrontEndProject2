import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/List.css';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

const List = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

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
                  <button onClick={() => alert(`Edit wishlistID:${wishlist.wishlistID} with userID:${userID} clicked!`)}>Edit</button>
                  <button onClick={() => alert(`Remove ${wishlist.wishlistID} clicked!`)}>Remove</button>
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
