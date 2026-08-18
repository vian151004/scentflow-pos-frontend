import React from 'react';
import { ShoppingBag, Trash2, UserPlus, Banknote, QrCode, Building2, Printer } from 'lucide-react';

export default function Cart() {
  return (
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
      
      {/* Bagian Atas: Header, Daftar Item, & Assign Customer */}
      <div>
        {/* Header Keranjang */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#4f46e5" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Keranjang Belanja</h3>
          </div>
          <span style={{ fontSize: '10px', backgroundColor: '#0f172a', color: '#fff', padding: '3px 8px', borderRadius: '10px', fontWeight: '800' }}>3 ITEMS</span>
        </div>

        {/* List Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          <CartItem name="Baccarat Rouge" detail="50ml - Premium 2:1" price="Rp 625.000" qty={1} />
          <CartItem name="Sauvage Dior" detail="30ml - Standard 1:1" price="Rp 180.000" qty={1} />
        </div>

        {/* Assign Customer */}
        <div style={{ border: '1px dashed #cbd5e1', borderRadius: '12px', padding: '16px', textAlign: 'center', cursor: 'pointer' }}>
          <UserPlus size={20} color="#94a3b8" style={{ marginBottom: '4px' }} />
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Assign Customer</p>
        </div>
      </div>

      {/* Bagian Bawah: Ringkasan Tagihan, Metode Pembayaran & Tombol Proses */}
      <div>
        {/* Rincian Subtotal & Pajak */}
        <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Subtotal</span>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>Rp 805.000</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Pajak (11%)</span>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>Rp 88.550</span>
          </div>
        </div>

        {/* Total Tagihan */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>Total Tagihan</span>
          <span style={{ fontWeight: '800', fontSize: '22px', color: '#0f172a', letterSpacing: '-0.5px' }}>Rp 893.550</span>
        </div>

        {/* Pilihan Metode Bayar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
          <PaymentBtn icon={<Banknote size={16} />} label="CASH" active />
          <PaymentBtn icon={<QrCode size={16} />} label="QRIS" />
          <PaymentBtn icon={<Building2 size={16} />} label="TRANSFER" />
        </div>

        {/* Tombol Cetak Struk */}
        <button style={{
          width: '100%',
          backgroundColor: '#4f46e5',
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
    <div style={{ border: '1px solid #f1f5f9', padding: '12px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
      <div style={{ width: '48px', height: '48px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>{name}</h5>
          <Trash2 size={14} color="#94a3b8" style={{ cursor: 'pointer' }} />
        </div>
        <p style={{ margin: '2px 0 8px 0', fontSize: '11px', color: '#94a3b8' }}>{detail}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '2px 6px' }}>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>-</button>
            <span style={{ fontSize: '12px', fontWeight: '700' }}>{qty}</span>
            <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}>+</button>
          </div>
          <span style={{ fontWeight: '700', fontSize: '12px', color: '#0f172a' }}>{price}</span>
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