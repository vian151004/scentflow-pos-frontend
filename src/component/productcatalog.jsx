import React from 'react';
import { Search } from 'lucide-react';
import Topbar from './Topbar';

const PRODUCTS = [
  { 
    id: 1, 
    name: 'Sauvage Dior', 
    stock: 'TERSEDIA: 780 ML', 
    status: 'available', 
    price: 'Rp 6.000 / ML', 
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    id: 2, 
    name: 'Baccarat Rouge', 
    stock: 'HAMPIR HABIS: 15 ML', 
    status: 'warning', 
    price: 'Rp 12.500 / ML', 
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    id: 3, 
    name: 'Black Opium YSL', 
    stock: 'TERSEDIA: 420 ML', 
    status: 'available', 
    price: 'Rp 8.500 / ML', 
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    id: 4, 
    name: "J'Adore", 
    stock: 'TERSEDIA: 1.2 L', 
    status: 'available', 
    price: 'Rp 9.200 / ML', 
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    id: 5, 
    name: 'Chanel No. 5', 
    stock: 'TERSEDIA: 250 ML', 
    status: 'available', 
    price: 'Rp 15.000 / ML', 
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&auto=format&fit=crop&q=80' 
  },
  { 
    id: 6, 
    name: 'Eros Versace', 
    stock: 'TERSEDIA: 900 ML', 
    status: 'available', 
    price: 'Rp 7.800 / ML', 
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=500&auto=format&fit=crop&q=80' 
  },
];

export default function ProductCatalog() {
  return (
    <div style={{ 
      flex: 1, 
      padding: '32px', 
      backgroundColor: '#f8fafc', 
      overflowY: 'auto', 
      height: '100vh',
      boxSizing: 'border-box' 
    }}>
      
      {/* Topbar Standar */}
      <Topbar />

      {/* Input Pencarian */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text" 
          placeholder="Cari varian parfum..." 
          style={{
            width: '100%',
            padding: '12px 12px 12px 48px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            outline: 'none',
            fontSize: '13px',
            backgroundColor: '#fff',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Filter Kategori */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['Semua', 'Men', 'Women', 'Unisex', 'Exclusive'].map((tab, idx) => (
          <button 
            key={tab} 
            style={{
              padding: '8px 20px',
              borderRadius: '20px',
              border: idx === 0 ? 'none' : '1px solid #e2e8f0',
              backgroundColor: idx === 0 ? '#4f46e5' : '#fff',
              color: idx === 0 ? '#fff' : '#64748b',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Produk */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {PRODUCTS.map((p) => (
          <div key={p.id} style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '12px', border: '1px solid #f1f5f9' }}>
            <img 
              src={p.image} 
              alt={p.name} 
              style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} 
            />
            <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{p.name}</h4>
            <span style={{
              fontSize: '10px',
              fontWeight: '800',
              padding: '3px 8px',
              borderRadius: '6px',
              backgroundColor: p.status === 'warning' ? '#fff1f2' : '#ecfdf5',
              color: p.status === 'warning' ? '#f43f5e' : '#10b981',
              display: 'inline-block',
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              {p.stock}
            </span>
            <p style={{ margin: 0, fontWeight: '700', fontSize: '13px', color: '#0f172a' }}>{p.price}</p>
          </div>
        ))}
      </div>

    </div>
  );
}