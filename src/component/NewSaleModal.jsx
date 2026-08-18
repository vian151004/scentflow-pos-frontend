import React, { useState } from 'react';
import { X, Sparkles, Plus } from 'lucide-react';

export default function NewSaleModal({ isOpen, onClose }) {
  const [selectedPerfume, setSelectedPerfume] = useState('Sauvage Dior');
  const [bottleSize, setBottleSize] = useState('50ml');
  const [ratio, setRatio] = useState('Premium 2:1');

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        width: '460px',
        padding: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        boxSizing: 'border-box'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ padding: '6px', borderRadius: '8px', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex' }}>
              <Sparkles size={18} />
            </div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
              Transaksi Racik Baru (Custom Blend)
            </h3>
          </div>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Racikan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          
          {/* Pilih Bibit */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
              PILIH BIBIT UTAMA
            </label>
            <select 
              value={selectedPerfume} 
              onChange={(e) => setSelectedPerfume(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }}
            >
              <option value="Sauvage Dior">Sauvage Dior (Rp 6.000 / ml)</option>
              <option value="Baccarat Rouge">Baccarat Rouge (Rp 12.500 / ml)</option>
              <option value="Black Opium YSL">Black Opium YSL (Rp 8.500 / ml)</option>
              <option value="Santal 33">Santal 33 (Rp 10.000 / ml)</option>
            </select>
          </div>

          {/* Pilih Ukuran Botol */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
              UKURAN BOTOL
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {['30ml', '50ml', '100ml'].map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setBottleSize(size)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: bottleSize === size ? '1.5px solid #4f46e5' : '1px solid #e2e8f0',
                    backgroundColor: bottleSize === size ? '#eef2ff' : '#fff',
                    color: bottleSize === size ? '#4f46e5' : '#475569',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Rasio Campuran */}
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
              KONSENTRASI RACIKAN
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {['Standard 1:1', 'Premium 2:1'].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRatio(r)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: ratio === r ? '1.5px solid #4f46e5' : '1px solid #e2e8f0',
                    backgroundColor: ratio === r ? '#eef2ff' : '#fff',
                    color: ratio === r ? '#4f46e5' : '#475569',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#fff',
              color: '#64748b',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Batal
          </button>
          <button 
            onClick={() => {
              // Menutup modal setelah klik submit
              onClose();
            }}
            style={{
              flex: 2,
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#4f46e5',
              color: '#fff',
              fontWeight: '700',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Plus size={16} /> Masukkan ke Keranjang
          </button>
        </div>

      </div>
    </div>
  );
}