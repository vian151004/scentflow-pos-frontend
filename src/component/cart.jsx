import React from 'react';
import { ShoppingBag, Trash2, UserPlus, Banknote, QrCode, Building2, Printer } from 'lucide-react';

export default function Cart() {
  return (
    <div style={{ width: '360px', borderLeft: '1px solid #e5e7eb', padding: '20px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      <div>
        {/* Header Keranjang */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#4f46e5" />
            <h3 style={{ margin: 0, fontSize: '16px' }}>Keranjang Belanja</h3>
          </div>
          <span style={{ fontSize: '11px', backgroundColor: '#111827', color: '#fff', padding: '2px 8px', borderRadius: '10px' }}>3 ITEMS</span>
        </div>

        {/* List Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          <CartItem name="Baccarat Rouge" detail="50ml - Premium 2:1" price="Rp 625.000" qty={1} />
          <CartItem name="Sauvage Dior" detail="30ml - Standard 1:1" price="Rp 180.000" qty={1} />
        </div>

        {/* Assign Customer */}
        <div style={{ border: '1px dashed #d1d5db', borderRadius: '12px', padding: '16px', textAlign: 'center', cursor: 'pointer', marginBottom: '20px' }}>
          <UserPlus size={20} color="#9ca3af" style={{ marginBottom: '4px' }} />
          <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Assign Customer</p>
        </div>
      </div>

      {/* Bagian Bawah: Checkout */}
      <div>
        {/* Voucher Input */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input type="text" placeholder="Promo / Voucher Code" style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '12px' }} />
          <button style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', color: '#4f46e5', fontWeight: 'bold', fontSize: '11px', padding: '0 12px', borderRadius: '8px', cursor: 'pointer' }}>APPLY</button>
        </div>

        {/* Subtotal & Pajak */}
        <div style={{ fontSize: '13px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal</span>
            <span>Rp 805.000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Pajak (11%)</span>
            <span>Rp 88.550</span>
          </div>
        </div>

        {/* Total Tagihan */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Total Tagihan</span>
          <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#111827' }}>Rp 893.550</span>
        </div>

        {/* Payment Methods */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
          <PaymentBtn icon={<Banknote size={16} />} label="CASH" active />
          <PaymentBtn icon={<QrCode size={16} />} label="QRIS" />
          <PaymentBtn icon={<Building2 size={16} />} label="TRANSFER" />
        </div>

        {/* Submit Button */}
        <button style={{
          width: '100%',
          backgroundColor: '#4f46e5',
          color: '#fff',
          border: 'none',
          padding: '14px',
          borderRadius: '12px',
          fontWeight: 'bold',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <Printer size={16} /> PROSES TRANSAKSI & CETAK STRUK
        </button>
      </div>

    </div>
  );
}

function CartItem({ name, detail, price, qty }) {
  return (
    <div style={{ border: '1px solid #f3f4f6', padding: '12px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
      <div style={{ width: '48px', height: '48px', backgroundColor: '#f3f4f6', borderRadius: '8px' }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5 style={{ margin: 0, fontSize: '13px' }}>{name}</h5>
          <Trash2 size={14} color="#9ca3af" style={{ cursor: 'pointer' }} />
        </div>
        <p style={{ margin: '2px 0 8px 0', fontSize: '11px', color: '#9ca3af' }}>{detail}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '2px 6px' }}>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>-</button>
            <span style={{ fontSize: '12px' }}>{qty}</span>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>+</button>
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '12px' }}>{price}</span>
        </div>
      </div>
    </div>
  );
}

function PaymentBtn({ icon, label, active = false }) {
  return (
    <button style={{
      border: active ? '2px solid #4f46e5' : '1px solid #e5e7eb',
      backgroundColor: active ? '#f5f3ff' : '#fff',
      color: active ? '#4f46e5' : '#6b7280',
      padding: '8px 4px',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      fontSize: '10px',
      fontWeight: 'bold',
      cursor: 'pointer'
    }}>
      {icon}
      {label}
    </button>
  );
}