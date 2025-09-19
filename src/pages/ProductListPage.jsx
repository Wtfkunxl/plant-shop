import React from 'react';
import { products } from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

function ProductListingPage() {
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div style={{ padding: '20px' }}>
      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {products.filter(p => p.category === category).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductListingPage;
