import React, { useState } from 'react';
import { Search, ShoppingBag, Trash2, UserPlus, Banknote, QrCode, Printer } from 'lucide-react';
import Topbar from '../component/Topbar';
import { FINISHED_PRODUCTS, TABS, TAX_RATE, formatRupiah } from '../data/inventoryData';

export default function DashboardPage({ cart, addToCart, increaseQty, decreaseQty, removeFromCart }) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [customerName, setCustomerName] = useState('');

  const filteredProducts = FINISHED_PRODUCTS
    .filter((product) =>
      activeCategory === 'Semua' ? true : product.categories.includes(activeCategory)
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const subtotal = cart.reduce((sum, item) => sum + item.pricePerUnit * item.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div style={{ display: 'flex', flex: 1, height: '100vh', minWidth: 0 }}>

      <div style={{
        flex: 1,
        padding: '32px',
        backgroundColor: '#f8fafc',
        overflowY: 'auto',
        height: '100vh',
        boxSizing: 'border-box'
      }}>

        <Topbar />

        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: tab === activeCategory ? 'none' : '1px solid #e2e8f0',
                backgroundColor: tab === activeCategory ? '#4f46e5' : '#fff',
                color: tab === activeCategory ? '#fff' : '#64748b',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>
            Tidak ada produk yang cocok.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  padding: '12px',
                  border: '1px solid #f1f5f9',
                  cursor: 'pointer'
                }}
              >
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
                <p style={{ margin: 0, fontWeight: '700', fontSize: '13px', color: '#0f172a' }}>
                  {formatRupiah(p.pricePerUnit)} / {p.unitLabel}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{
        width: '360px',
        borderLeft: '1px solid #e2e8f0',
        padding: '32px 24px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        boxSizing: 'border-box'
      }}>

        <div style={{ overflowY: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={20} color="#4f46e5" />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Keranjang Belanja</h3>
            </div>
            <span style={{ fontSize: '10px', backgroundColor: '#0f172a', color: '#fff', padding: '3px 8px', borderRadius: '10px', fontWeight: '800' }}>
              {totalItems} ITEMS
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cart.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '20px 0' }}>
                Cart masih kosong. Klik produk di katalog, atau pakai "New Sale" untuk racikan custom.
              </p>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={() => increaseQty(item.id)}
                  onDecrease={() => decreaseQty(item.id)}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))
            )}
          </div>
        </div>

        <div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
              <UserPlus size={14} color="#94a3b8" /> Nama Customer
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Masukkan nama customer..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                outline: 'none',
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{formatRupiah(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Pajak (11%)</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{formatRupiah(tax)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>Total Tagihan</span>
            <span style={{ fontWeight: '800', fontSize: '22px', color: '#0f172a', letterSpacing: '-0.5px' }}>
              {formatRupiah(total)}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
            <PaymentBtn icon={<Banknote size={16} />} label="CASH" active />
            <PaymentBtn icon={<QrCode size={16} />} label="QRIS" />
          </div>

          <button
            disabled={cart.length === 0}
            style={{
              width: '100%',
              backgroundColor: cart.length === 0 ? '#c7c9f5' : '#4f46e5',
              color: '#fff',
              border: 'none',
              padding: '14px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <Printer size={16} /> PROSES TRANSAKSI & CETAK STRUK
          </button>
        </div>

      </div>
    </div>
  );
}

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const lineTotal = item.pricePerUnit * item.qty;

  return (
    <div style={{ border: '1px solid #f1f5f9', padding: '12px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
      <img
        src={item.image}
        alt={item.name}
        style={{ width: '48px', height: '48px', objectFit: 'cover', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{item.name}</h5>
          <Trash2 size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={onRemove} />
        </div>
        <p style={{ margin: '2px 0 8px 0', fontSize: '11px', color: '#94a3b8' }}>
          {formatRupiah(item.pricePerUnit)} {item.isCustom ? '' : `/ ${item.unitLabel}`}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '2px 6px' }}>
            <button onClick={onDecrease} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>-</button>
            <span style={{ fontSize: '12px', fontWeight: '700' }}>{item.qty}</span>
            <button onClick={onIncrease} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>+</button>
          </div>
          <span style={{ fontWeight: '700', fontSize: '12px', color: '#0f172a' }}>{formatRupiah(lineTotal)}</span>
        </div>
      </div>
    </div>
  );
}

function PaymentBtn({ icon, label, active = false }) {
  return (
    <button style={{
      border: active ? '1.5px solid #4f46e5' : '1px solid #e2e8f0',
      backgroundColor: active ? '#eef2ff' : '#fff',
      color: active ? '#4f46e5' : '#64748b',
      padding: '10px 4px',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      fontSize: '10px',
      fontWeight: '700',
      cursor: 'pointer'
    }}>
      {icon}
      {label}
    </button>
  );
}