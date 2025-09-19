import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', background: '#d4f1f4' }}>
      <h1><Link to="/">Plant Shop</Link></h1>
      <nav>
        <Link to="/products" style={{ marginRight: '20px' }}>Products</Link>
        <Link to="/cart">
          Cart ({totalQuantity})
        </Link>
      </nav>
    </header>
  );
}

export default Header;
