import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/List.css';
import Layout from '../Layout';

const ListContent = () => {
  const { wishlistID } = useParams(); 
  const [wishlist, setWishlist] = useState({}); 
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  useEffect(() => {
    const fetchWishlistInfo = async () => {
      try {
        // get name and desc
        const wishlistResponse = await axios.get(`/wishlists/info/${wishlistID}`);
        setWishlist(wishlistResponse.data); 

        // get items
        const itemsResponse = await axios.get(`/wishlists/${wishlistID}/items`);
        setItems(itemsResponse.data); 

        setLoading(false);
      } catch (err) {
        console.error('Error fetching wishlist and items:', err);
        setError('Failed to fetch wishlist and items. Please try again.');
        setLoading(false);
      }
    };

    fetchWishlistInfo();
  }, [wishlistID]);

  // NAVIGATION
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <div className="list-content-container">

        {loading && <p>Loading wishlist and items</p>}

        {error && <p>{error}</p>}

        {/* wishlist desc */}
        {wishlist && !loading && (
          <div className="wishlist-info">
            <h1>{wishlist.wishlistName}</h1>
            <p>{wishlist.description}</p>
          </div>
        )}

        {/* list items */}
        {items.length > 0 ? (
          <ul className="item-list">
            {items.map((item, index) => (
              <li key={index} className="item">
                <strong>{item.itemName}</strong>
                <p>
                  Link: <a href={item.itemLink}>{item.itemLink}</a>
                </p>
                <p>Quantity: {item.itemQuantity}</p>
                <div className="button-container">
                  <button onClick={() => alert(`edit clicked`)}>Edit</button>
                  <button onClick={() => alert(`remove clicked`)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No items found in this list.</p>
        )}
      </div>
    </Layout>
  );
};

export default ListContent;
