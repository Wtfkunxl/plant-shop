// src/pages/ProductListPage.jsx
import React from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {
  // group categories
  const categories = [...new Set(products.map(p => p.category))];
  return (
    <div style={{ padding: 24 }}>
      <h2>Products</h2>
      {categories.map(cat => (
        <section key={cat} style={{ marginBottom: 24 }}>
          <h3>{cat}</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {products.filter(p => p.category === cat).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
