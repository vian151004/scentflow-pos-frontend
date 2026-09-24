import React, { useState } from 'react';
import { X, Sparkles, Plus } from 'lucide-react';
import { RAW_MATERIALS, BOTTLE_SIZES, RATIO_OPTIONS, formatRupiah } from '../data/inventoryData';

export default function NewSaleModal({ isOpen, onClose, addToCart }) {
  const [selectedPerfumeId, setSelectedPerfumeId] = useState(RAW_MATERIALS[0].id);
  const [bottleSize, setBottleSize] = useState('50ml');
  const [ratioLabel, setRatioLabel] = useState('Premium 2:1');

  if (!isOpen) return null;

  const selectedPerfume = RAW_MATERIALS.find((m) => m.id === selectedPerfumeId);
  const selectedRatio = RATIO_OPTIONS.find((r) => r.label === ratioLabel);
  const mlAmount = parseInt(bottleSize, 10);

  const calculatedPrice = selectedPerfume.pricePerMl * mlAmount * selectedRatio.multiplier;

  const handleSubmit = () => {
    const customItem = {
      id: `custom-${Date.now()}`,
      name: selectedPerfume.name,
      pricePerUnit: calculatedPrice,
      unitLabel: 'pcs',
      image: null,
      isCustom: true,
      customDetail: `${bottleSize} - ${ratioLabel}`,
      qty: 1,
    };
    addToCart(customItem);
    onClose();
  };

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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
              PILIH BIBIT UTAMA
            </label>
            <select
              value={selectedPerfumeId}
              onChange={(e) => setSelectedPerfumeId(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' }}
            >
              {RAW_MATERIALS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({formatRupiah(m.pricePerMl)} / ml) — stok {m.stockMl}ml
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
              UKURAN BOTOL
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {BOTTLE_SIZES.map((size) => (
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

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
              KONSENTRASI RACIKAN
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {RATIO_OPTIONS.map((r) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => setRatioLabel(r.label)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: ratioLabel === r.label ? '1.5px solid #4f46e5' : '1px solid #e2e8f0',
                    backgroundColor: ratioLabel === r.label ? '#eef2ff' : '#fff',
                    color: ratioLabel === r.label ? '#4f46e5' : '#475569',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div style={{
          backgroundColor: '#f8fafc',
          borderRadius: '10px',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Estimasi Harga</span>
          <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>{formatRupiah(calculatedPrice)}</span>
        </div>

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
            onClick={handleSubmit}
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