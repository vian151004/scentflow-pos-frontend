import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  Printer, 
  RotateCcw, 
  QrCode 
} from 'lucide-react';
import Topbar from '../component/Topbar';

const TRANSACTIONS = [
  {
    id: '#TRX-20260702-001',
    name: 'Baccarat Rouge & Botol...',
    time: '14:20 WIB',
    method: 'QRIS',
    total: 185000,
    status: 'LUNAS',
    date: '02/07/2026 14:20',
    cashier: 'RETAIL ASSOCIATE #01',
    items: [
      { name: 'Baccarat Rouge (50 ml - Premium 2:1)', qty: '1 Pcs', price: 150000 },
      { name: 'Botol Spray 50ml', qty: '1 Pcs', price: 35000 }
    ],
    subtotal: 185000,
    tax: 0
  },
  {
    id: '#TRX-20260702-002',
    name: 'Santal 33 (100ml)',
    time: '14:55 WIB',
    method: 'TUNAI',
    total: 450000,
    status: 'LUNAS',
    date: '02/07/2026 14:55',
    cashier: 'RETAIL ASSOCIATE #01',
    items: [
      { name: 'Santal 33 (100ml)', qty: '1 Pcs', price: 450000 }
    ],
    subtotal: 450000,
    tax: 0
  },
  {
    id: '#TRX-20260702-003',
    name: 'Custom Blend - Floral...',
    time: '15:10 WIB',
    method: 'DEBIT',
    total: 225000,
    status: 'LUNAS',
    date: '02/07/2026 15:10',
    cashier: 'RETAIL ASSOCIATE #01',
    items: [
      { name: 'Custom Blend - Floral (30ml)', qty: '1 Pcs', price: 225000 }
    ],
    subtotal: 225000,
    tax: 0
  },
  {
    id: '#TRX-20260702-004',
    name: 'Sample Pack (Small)',
    time: '15:45 WIB',
    method: 'DIBATALKAN',
    total: 85000,
    status: 'REFUND',
    date: '02/07/2026 15:45',
    cashier: 'RETAIL ASSOCIATE #01',
    items: [
      { name: 'Sample Pack (Small)', qty: '1 Pcs', price: 85000 }
    ],
    subtotal: 85000,
    tax: 0
  }
];

export default function RiwayatPage() {
  const [selectedTrx, setSelectedTrx] = useState(TRANSACTIONS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ flex: 1, display: 'flex', backgroundColor: '#f8fafc', height: '100vh', overflow: 'hidden' }}>
      
      {/* ================= KOLOM KIRI (LIST TRANSAKSI) ================= */}
      <div style={{ 
        flex: 1, 
        borderRight: '1px solid #e2e8f0', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        overflowY: 'auto',
        padding: '32px',
        boxSizing: 'border-box'
      }}>
        
        {/* Topbar Standar */}
        <Topbar />

        {/* Filter Bar (Date Picker & Shift Dropdown) */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', backgroundColor: '#fff', fontSize: '13px', color: '#334155', fontWeight: '500' }}>
            <Calendar size={16} color="#64748b" />
            <span>02 Juli 2026</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', backgroundColor: '#fff', fontSize: '13px', color: '#334155', fontWeight: '500' }}>
            <Clock size={16} color="#64748b" />
            <span>Semua Shift</span>
          </div>
        </div>

        {/* Search Box */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Cari ID transaksi atau nama..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 42px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              outline: 'none',
              fontSize: '13px',
              backgroundColor: '#fff',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* List Transaksi Cards */}
        <div style={{ flex: 1, overflowY: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
          {TRANSACTIONS.filter(t => t.id.toLowerCase().includes(searchQuery.toLowerCase()) || t.name.toLowerCase().includes(searchQuery.toLowerCase())).map((trx) => {
            const isSelected = selectedTrx?.id === trx.id;
            const isRefund = trx.status === 'REFUND';

            return (
              <div 
                key={trx.id}
                onClick={() => setSelectedTrx(trx)}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#f8fafc' : '#fff',
                  borderLeft: isSelected ? '4px solid #4f46e5' : '4px solid transparent',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background-color 0.2s'
                }}
              >
                <div>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                    {trx.id}
                  </span>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '700', color: isRefund ? '#94a3b8' : '#0f172a' }}>
                    {trx.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>{trx.time}</span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: trx.method === 'QRIS' ? '#e0e7ff' : trx.method === 'TUNAI' ? '#f1f5f9' : trx.method === 'DEBIT' ? '#e0e7ff' : '#fee2e2',
                      color: trx.method === 'QRIS' || trx.method === 'DEBIT' ? '#4f46e5' : trx.method === 'TUNAI' ? '#475569' : '#ef4444'
                    }}>
                      {trx.method}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontSize: '15px', 
                    fontWeight: '700', 
                    color: isRefund ? '#94a3b8' : '#0f172a',
                    textDecoration: isRefund ? 'line-through' : 'none',
                    fontFamily: 'monospace',
                    marginBottom: '4px'
                  }}>
                    Rp {trx.total.toLocaleString('id-ID')}
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '800',
                    color: isRefund ? '#ef4444' : '#10b981',
                    letterSpacing: '0.5px'
                  }}>
                    {trx.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ================= KOLOM KANAN (STRUK RESI) ================= */}
      <div style={{ width: '420px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#f8fafc', height: '100%', boxSizing: 'border-box' }}>
        
        {/* Kertas Struk */}
        <div style={{ 
          backgroundColor: '#fff', 
          border: '1px solid #e2e8f0', 
          borderRadius: '16px', 
          padding: '24px', 
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
          fontFamily: 'sans-serif'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '2px', margin: '0 0 6px 0', color: '#0f172a' }}>
              SCENTFLOW
            </h2>
            <p style={{ margin: '0 0 2px 0', fontSize: '11px', color: '#64748b' }}>Jl. Senopati No. 88, Jakarta Selatan</p>
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontWeight: '500' }}>Luxury Perfumery & Fragrance Lab</p>
          </div>

          <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '12px', marginBottom: '12px', fontSize: '11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginBottom: '4px' }}>
              <span>STRUK PENJUALAN</span>
              <span>WAKTU</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a', fontFamily: 'monospace' }}>
              <span>{selectedTrx.id}</span>
              <span>{selectedTrx.date}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ color: '#64748b', fontSize: '10px' }}>KASIR: {selectedTrx.cashier}</span>
              <span style={{ color: '#10b981', fontWeight: '700', fontSize: '10px' }}>[ {selectedTrx.status} ]</span>
            </div>
          </div>

          <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '12px', marginBottom: '12px' }}>
            {selectedTrx.items.map((item, idx) => (
              <div key={idx} style={{ marginBottom: idx !== selectedTrx.items.length - 1 ? '10px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                  <span>{item.name}</span>
                  <span style={{ fontFamily: 'monospace' }}>Rp {item.price.toLocaleString('id-ID')}</span>
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  {item.qty} x Rp {item.price.toLocaleString('id-ID')}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '12px', marginBottom: '12px', fontSize: '12px', color: '#64748b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span>Subtotal</span>
              <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>Rp {selectedTrx.subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Pajak (0%)</span>
              <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>Rp {selectedTrx.tax.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px dashed #cbd5e1', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>TOTAL AKHIR</span>
            <span style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', fontFamily: 'monospace' }}>
              Rp {selectedTrx.total.toLocaleString('id-ID')}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>METODE BAYAR</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
              <QrCode size={16} />
              <span>{selectedTrx.method}</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', fontSize: '10px', color: '#94a3b8', lineHeight: '1.4' }}>
            Terima kasih telah berkunjung ke ScentFlow.<br />
            Simpan struk ini sebagai bukti pembelian sah.
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button style={{
            width: '100%',
            backgroundColor: '#fff',
            border: '1.5px solid #0f172a',
            color: '#0f172a',
            padding: '12px',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}>
            <Printer size={16} /> Cetak Ulang Struk
          </button>

          <button style={{
            width: '100%',
            backgroundColor: '#fff5f5',
            border: '1px solid #fed7d7',
            color: '#e53e3e',
            padding: '12px',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}>
            <RotateCcw size={16} /> Batalkan Transaksi (Refund)
          </button>
        </div>

      </div>

    </div>
  );
}