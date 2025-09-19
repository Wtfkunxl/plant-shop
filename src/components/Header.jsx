// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalCount } from '../store/cartSlice';

export default function Header() {
  const count = useSelector(selectTotalCount);
  const location = useLocation();
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #ddd' }}>
      <div>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/products">Products</Link>
      </div>
      <div>
        <Link to="/cart" style={{ textDecoration: 'none', position: 'relative' }}>
          🛒
          <span style={{
            marginLeft: 6,
            background: '#2b6cb0',
            color: 'white',
            fontWeight: 'bold',
            padding: '2px 6px',
            borderRadius: '12px'
          }}>
            {count}
          </span>
        </Link>
      </div>
    </header>
  );
}
