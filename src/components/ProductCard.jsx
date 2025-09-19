// src/components/ProductCard.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItemsArray } from '../store/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const inCart = !!cartItems[product.id]; // if present -> disable Add

  const handleAdd = () => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail
    }));
  };

  return (
    <div style={{ width: 200, border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <img src={product.thumbnail} alt={product.name} style={{ width: '100%', height: 120, objectFit: 'cover' }} />
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <button
        onClick={handleAdd}
        disabled={inCart}
        style={{ padding: '8px 12px', cursor: inCart ? 'not-allowed' : 'pointer' }}
      >
        {inCart ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  );
}
