// src/pages/CartPage.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItemsArray,
  selectTotalCount,
  selectTotalPrice,
  increaseItem,
  decreaseItem,
  removeItem
} from '../store/cartSlice';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const items = useSelector(selectCartItemsArray);
  const totalCount = useSelector(selectTotalCount);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 24 }}>
      <h2>Your Cart</h2>
      <p>Total plants: {totalCount}</p>
      <p>Total cost: ₹{totalPrice}</p>

      <div>
        {items.length === 0 && <p>Your cart is empty. <Link to="/products">Continue shopping</Link></p>}
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #eee', padding: 12 }}>
            <img src={item.thumbnail} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <h4>{item.name}</h4>
              <p>Unit price: ₹{item.price}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => dispatch(decreaseItem(item.id))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(increaseItem(item.id))}>+</button>
            </div>
            <div>
              <button onClick={() => dispatch(removeItem(item.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <button onClick={() => alert('Coming Soon')}>Checkout</button>
        <Link to="/products"><button style={{ marginLeft: 8 }}>Continue shopping</button></Link>
      </div>
    </div>
  );
}
