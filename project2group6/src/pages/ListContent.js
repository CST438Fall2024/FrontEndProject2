import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/List.css';
import Layout from '../Layout';

const ListContent = () => {
  const { wishlistID } = useParams(); 
  const [wishlist, setWishlist] = useState({}); 
  const [items, setItems] = useState([]); 
  const [itemName, setItemName] = useState('');
  const [itemLink, setItemLink] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchWishlistInfo = async () => {
      try {
        // get name and desc
        const wishlistResponse = await axios.get(`/wishlists/info/${wishlistID}`);
        setWishlist(wishlistResponse.data); 
        

        // get items
        const itemsResponse = await axios.get(`/wishlists/${wishlistID}/items`);
        setItems(itemsResponse.data); 
        setItemName(itemsResponse.data.itemName);
        setItemLink(itemsResponse.data.itemLink);
        setItemQuantity(itemsResponse.data.itemQuantity);
        console.log(itemLink);

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

  //Normalizing the Link
  const normalize = (link) => {
    if(!link.startsWith('http://') && !link.startsWith('https://'))
    {
      return `http://${link}`;
    }
    return link;
  }

  // delete function
  const handleDelete = async (itemID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/items/delete/${itemID}`);
      
      // update
      setItems((prevItems) => prevItems.filter(item => item.itemID !== itemID));
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete the item. Please try again.');
    }
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
                  Link: <a href= {normalize(item.itemLink)} target="_blank" rel="noopener noreferrer">{item.itemLink}</a>
                </p>
                <p>Quantity: {item.itemQuantity}</p>
                <div className="button-container">
                  <button onClick={() => alert('edit clicked')}>Edit</button>
                  <button onClick={() => handleDelete(item.itemID)}>Remove</button>
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
