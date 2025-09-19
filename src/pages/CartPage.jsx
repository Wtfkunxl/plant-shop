import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem } from '../store/cartSlice.js';
import { Link } from 'react-router-dom';

function CartPage() {
  const { items, totalQuantity, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Shopping Cart</h1>
      <p>Total Items: {totalQuantity}</p>
      <p>Total Price: ${totalPrice}</p>

      {items.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img src={item.image} alt={item.name} style={{ width: '80px', marginRight: '10px' }} />
          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>${item.price} x {item.quantity}</p>
          </div>
          <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
          <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
          <button onClick={() => dispatch(removeItem(item.id))}>Delete</button>
        </div>
      ))}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => alert('Coming Soon')}>Checkout</button>
        <Link to="/products">
          <button style={{ marginLeft: '10px' }}>Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
