// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url("/images/landing-bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <section style={{ background: 'rgba(255,255,255,0.9)', padding: 24, borderRadius: 8, maxWidth: 700 }}>
        <h1>GreenSprout — Houseplants for Modern Homes</h1>
        <p>
          GreenSprout is a curated marketplace offering beautiful, easy-care houseplants for every space.
          We make it simple to find the right plant and bring nature into your home.
        </p>
        <Link to="/products">
          <button style={{ marginTop: 12, padding: '10px 18px', cursor: 'pointer' }}>
            Get Started
          </button>
        </Link>
      </section>
    </main>
  );
}
