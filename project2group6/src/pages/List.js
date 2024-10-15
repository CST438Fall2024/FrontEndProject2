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
        const response = await axios.get(`/wishlists/info/${userID}`);
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
                <strong>{wishlist.wishlistName}</strong> {/* name */}
                <p>{wishlist.description}</p> {/* discription */}
                <button onClick={() => alert(`Edit ${wishlist.wishlistID} clicked!`)}>Edit</button>
                <button onClick={() => alert(`Remove ${wishlist.wishlistID} clicked!`)}>Remove</button>
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
