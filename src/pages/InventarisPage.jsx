import React, { useState } from 'react';
import { AlertTriangle, MoreVertical } from 'lucide-react';
import Topbar from '../component/Topbar';

const INVENTORY_DATA = [
  {
    id: 'BIB-001',
    name: 'Sauvage Dior',
    category: 'Bibit Parfum',
    stock: '780 ml',
    status: 'Aman',
  },
  {
    id: 'BIB-002',
    name: 'Black Opium',
    category: 'Bibit Parfum',
    stock: '15 ml',
    status: 'Menipis',
  },
  {
    id: 'BTL-030',
    name: 'Botol Spray 30ml',
    category: 'Botol Kosong',
    stock: '0 Pcs',
    status: 'Habis',
  },
];

export default function InventarisPage() {
  const [activeTab, setActiveTab] = useState('bibit');

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

      {/* Header Judul & Tombol Laporkan */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
            Stok Inventaris Toko
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Terakhir diperbarui: Hari ini, 12:30 WIB
          </p>
        </div>

        <button style={{
          backgroundColor: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          color: '#1e293b',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
        }}>
          <AlertTriangle size={16} color="#ef4444" />
          <span>Laporkan Kerusakan Barang</span>
        </button>
      </div>

      {/* Tab Filter Kategori */}
      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
        {['bibit', 'botol', 'campuran'].map((tab) => {
          const label = tab === 'bibit' ? 'Bibit Parfum (ml)' : tab === 'botol' ? 'Botol Kosong' : 'Cairan Campuran';
          const active = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                border: 'none',
                background: 'none',
                padding: '0 4px 12px 4px',
                fontSize: '13px',
                fontWeight: active ? '700' : '500',
                color: active ? '#4f46e5' : '#64748b',
                cursor: 'pointer',
                borderBottom: active ? '2px solid #4f46e5' : 'none',
                marginBottom: '-1px'
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Tabel Stok Inventaris */}
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '16px 24px', fontWeight: '700', fontSize: '12px' }}>ID & NAMA ITEM</th>
              <th style={{ padding: '16px 24px', fontWeight: '700', fontSize: '12px' }}>KATEGORI</th>
              <th style={{ padding: '16px 24px', fontWeight: '700', fontSize: '12px' }}>SISA STOK FISIK</th>
              <th style={{ padding: '16px 24px', fontWeight: '700', fontSize: '12px' }}>STATUS</th>
              <th style={{ padding: '16px 24px', fontWeight: '700', fontSize: '12px', textAlign: 'center' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {INVENTORY_DATA.map((item, index) => (
              <tr 
                key={item.id} 
                style={{ 
                  borderBottom: index !== INVENTORY_DATA.length - 1 ? '1px solid #f1f5f9' : 'none',
                  color: '#1e293b'
                }}
              >
                <td style={{ padding: '18px 24px', fontWeight: '600' }}>
                  {item.id} - {item.name}
                </td>
                <td style={{ padding: '18px 24px', color: '#475569' }}>
                  {item.category}
                </td>
                <td style={{ padding: '18px 24px', fontFamily: 'monospace', fontSize: '14px', fontWeight: '600' }}>
                  {item.stock}
                </td>
                <td style={{ padding: '18px 24px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    backgroundColor: item.status === 'Aman' ? '#ecfdf5' : item.status === 'Menipis' ? '#fffbeb' : '#fff1f2',
                    color: item.status === 'Aman' ? '#10b981' : item.status === 'Menipis' ? '#f59e0b' : '#f43f5e',
                    display: 'inline-block'
                  }}>
                    {item.status}
                  </span>
                </td>
                <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                  <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}