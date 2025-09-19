import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{
      background: 'url(/images/landing-bg.jpg) no-repeat center center / cover',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center'
    }}>
      <h1>Welcome to Plant Shop</h1>
      <p>Your one-stop store for beautiful indoor plants.</p>
      <Link to="/products">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Get Started</button>
      </Link>
    </div>
  );
}

export default LandingPage;
