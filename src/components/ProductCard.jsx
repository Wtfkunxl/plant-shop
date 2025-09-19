import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/cartSlice.js';
import { products } from '../data/products.js';


function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const isAdded = cartItems.find(item => item.id === product.id);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%' }} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button
        onClick={() => dispatch(addItem(product))}
        disabled={isAdded}
      >
        {isAdded ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default ProductCard;
