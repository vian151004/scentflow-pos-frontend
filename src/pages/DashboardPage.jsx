import React from 'react';
import ProductCatalog from '../component/productcatalog';
import Cart from '../component/cart';

export default function DashboardPage() {
  return (
    <>
      <ProductCatalog />
      <Cart />
    </>
  );
}