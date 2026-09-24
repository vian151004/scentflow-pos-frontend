import React, { useState } from 'react';
import { AlertTriangle, Plus, Pencil, Trash2 } from 'lucide-react';
import Topbar from '../component/Topbar';
import ItemFormModal from '../component/ItemFormModal';
import {
  INITIAL_INV_RAW_MATERIALS,
  INITIAL_INV_PACKAGING,
  INITIAL_INV_MIXED_LIQUID,
  INITIAL_INV_FINISHED_PRODUCTS,
} from '../data/inventoryData';

const TABS = [
  { key: 'bibit', label: 'Bibit Parfum (ml)' },
  { key: 'botol', label: 'Botol Kosong' },
  { key: 'campuran', label: 'Cairan Campuran' },
  { key: 'produk_jadi', label: 'Produk Jadi (Katalog)' },
];

export default function InventarisPage() {
  // Semua state LOKAL di sini — sengaja ga connect ke Dashboard/App.jsx
  const [rawMaterials, setRawMaterials] = useState(INITIAL_INV_RAW_MATERIALS);
  const [packaging, setPackaging] = useState(INITIAL_INV_PACKAGING);
  const [mixedLiquid, setMixedLiquid] = useState(INITIAL_INV_MIXED_LIQUID);
  const [finishedProducts, setFinishedProducts] = useState(INITIAL_INV_FINISHED_PRODUCTS);

  const [activeTab, setActiveTab] = useState('bibit');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const tabConfig = {
    bibit: { data: rawMaterials, setData: setRawMaterials, idPrefix: 'BIB' },
    botol: { data: packaging, setData: setPackaging, idPrefix: 'BTL' },
    campuran: { data: mixedLiquid, setData: setMixedLiquid, idPrefix: 'MIX' },
    produk_jadi: { data: finishedProducts, setData: setFinishedProducts, idPrefix: 'PRD' },
  };
  const current = tabConfig[activeTab];

  const openAddModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus item ini?')) {
      current.setData((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const handleSubmit = (payload) => {
    if (editingItem) {
      current.setData((prev) => prev.map((i) => (i.id === editingItem.id ? { ...i, ...payload } : i)));
    } else {
      const newId = activeTab === 'produk_jadi' ? Date.now() : `${current.idPrefix}-${Date.now()}`;
      current.setData((prev) => [...prev, { id: newId, ...payload }]);
    }
  };

  const renderStatusBadge = (status) => {
    const colorMap = {
      Aman: { bg: '#ecfdf5', text: '#10b981' },
      Menipis: { bg: '#fffbeb', text: '#f59e0b' },
      Habis: { bg: '#fff1f2', text: '#f43f5e' },
      available: { bg: '#ecfdf5', text: '#10b981' },
      warning: { bg: '#fff1f2', text: '#f43f5e' },
    };
    const c = colorMap[status] || colorMap.Aman;
    const labelMap = { available: 'Tersedia', warning: 'Hampir Habis' };
    return (
      <span style={{
        fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px',
        backgroundColor: c.bg, color: c.text, display: 'inline-block'
      }}>
        {labelMap[status] || status}
      </span>
    );
  };

  return (
    <div style={{ flex: 1, padding: '32px', backgroundColor: '#f8fafc', overflowY: 'auto', height: '100vh', boxSizing: 'border-box' }}>

      <Topbar />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
            Stok Inventaris Toko
          </h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Kelola bahan baku, kemasan, dan produk katalog.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{
            backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px',
            display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600',
            color: '#1e293b', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', boxSizing: 'border-box'
          }}>
            <AlertTriangle size={16} color="#ef4444" />
            <span>Laporkan Kerusakan Barang</span>
          </button>

          <button
            onClick={openAddModal}
            style={{
              backgroundColor: '#4f46e5', border: 'none', borderRadius: '8px', padding: '10px 16px',
              display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700',
              color: '#fff'
            }}
          >
            <Plus size={16} />
            <span>Tambah {activeTab === 'produk_jadi' ? 'Produk Katalog' : 'Item'}</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
        {TABS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                border: 'none', background: 'none', padding: '0 4px 12px 4px', fontSize: '13px',
                fontWeight: active ? '700' : '500', color: active ? '#4f46e5' : '#64748b', cursor: 'pointer',
                borderBottom: active ? '2px solid #4f46e5' : 'none', marginBottom: '-1px'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '16px 24px', fontWeight: '700', fontSize: '12px' }}>ID & NAMA ITEM</th>
              <th style={{ padding: '16px 24px', fontWeight: '700', fontSize: '12px' }}>
                {activeTab === 'produk_jadi' ? 'HARGA' : 'STOK'}
              </th>
              <th style={{ padding: '16px 24px', fontWeight: '700', fontSize: '12px' }}>STATUS</th>
              <th style={{ padding: '16px 24px', fontWeight: '700', fontSize: '12px', textAlign: 'center' }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {current.data.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#94a3b8' }}>
                  Belum ada item di kategori ini.
                </td>
              </tr>
            ) : (
              current.data.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: index !== current.data.length - 1 ? '1px solid #f1f5f9' : 'none', color: '#1e293b' }}>
                  <td style={{ padding: '18px 24px', fontWeight: '600' }}>
                    {item.id} - {item.name}
                  </td>
                  <td style={{ padding: '18px 24px', fontFamily: 'monospace', fontSize: '14px', fontWeight: '600' }}>
                    {activeTab === 'produk_jadi'
                      ? `Rp ${item.pricePerUnit?.toLocaleString('id-ID')} / ${item.unitLabel} (stok: ${item.stockAmount})`
                      : activeTab === 'bibit' ? `${item.stockMl} ml`
                      : activeTab === 'botol' ? `${item.stockPcs} Pcs`
                      : `${item.stockMl} ml`}
                  </td>
                  <td style={{ padding: '18px 24px' }}>
                    {renderStatusBadge(item.status)}
                  </td>
                  <td style={{ padding: '18px 24px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => openEditModal(item)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#4f46e5' }}>
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#f43f5e' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ItemFormModal
        isOpen={modalOpen}
        type={activeTab}
        initialData={editingItem}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />

    </div>
  );
}