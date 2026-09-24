import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CATEGORY_OPTIONS = ['Men', 'Women', 'Unisex', 'Exclusive'];

export default function ItemFormModal({ isOpen, type, initialData, onClose, onSubmit }) {
  const isEdit = initialData !== null;

  const [name, setName] = useState('');
  const [pricePerMl, setPricePerMl] = useState('');
  const [stockMl, setStockMl] = useState('');
  const [stockPcs, setStockPcs] = useState('');
  const [status, setStatus] = useState('Aman');
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [unitLabel, setUnitLabel] = useState('ML');
  const [image, setImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [catalogStatus, setCatalogStatus] = useState('available');
  const [stockAmount, setStockAmount] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setName(initialData?.name || '');
    setPricePerMl(initialData?.pricePerMl ?? '');
    setStockMl(initialData?.stockMl ?? '');
    setStockPcs(initialData?.stockPcs ?? '');
    setStatus(initialData?.status || 'Aman');
    setPricePerUnit(initialData?.pricePerUnit ?? '');
    setUnitLabel(initialData?.unitLabel || 'ML');
    setImage(initialData?.image || '');
    setCategories(initialData?.categories || []);
    setCatalogStatus(initialData?.status || 'available');
    setStockAmount(initialData?.stockAmount ?? '');
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const toggleCategory = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    let payload = { name };

    if (type === 'bibit') {
      payload = { ...payload, pricePerMl: Number(pricePerMl), stockMl: Number(stockMl), status };
    } else if (type === 'botol') {
      payload = { ...payload, stockPcs: Number(stockPcs), status };
    } else if (type === 'campuran') {
      payload = { ...payload, stockMl: Number(stockMl), status };
    } else if (type === 'produk_jadi') {
      payload = {
        ...payload,
        pricePerUnit: Number(pricePerUnit),
        unitLabel,
        image,
        categories,
        status: catalogStatus,
        stockAmount: Number(stockAmount),
      };
    }

    onSubmit(payload);
    onClose();
  };

  const titleMap = {
    bibit: 'Bibit Parfum',
    botol: 'Botol Kosong',
    campuran: 'Cairan Campuran',
    produk_jadi: 'Produk Jadi (Katalog)',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '16px', width: '440px', padding: '24px',
        boxSizing: 'border-box', maxHeight: '85vh', overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>
            {isEdit ? 'Edit' : 'Tambah'} {titleMap[type]}
          </h3>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <Field label="Nama Item">
            <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          </Field>

          {type === 'bibit' && (
            <>
              <Field label="Harga per ML">
                <input type="number" value={pricePerMl} onChange={(e) => setPricePerMl(e.target.value)} style={inputStyle} />
              </Field>
              <Field label="Stok (ML)">
                <input type="number" value={stockMl} onChange={(e) => setStockMl(e.target.value)} style={inputStyle} />
              </Field>
              <StatusField status={status} setStatus={setStatus} />
            </>
          )}

          {type === 'botol' && (
            <>
              <Field label="Stok (Pcs)">
                <input type="number" value={stockPcs} onChange={(e) => setStockPcs(e.target.value)} style={inputStyle} />
              </Field>
              <StatusField status={status} setStatus={setStatus} />
            </>
          )}

          {type === 'campuran' && (
            <>
              <Field label="Stok (ML)">
                <input type="number" value={stockMl} onChange={(e) => setStockMl(e.target.value)} style={inputStyle} />
              </Field>
              <StatusField status={status} setStatus={setStatus} />
            </>
          )}

          {type === 'produk_jadi' && (
            <>
              <Field label="Harga per Unit (Rp)">
                <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} style={inputStyle} />
              </Field>
              <Field label="Satuan (contoh: ML, PCS)">
                <input value={unitLabel} onChange={(e) => setUnitLabel(e.target.value)} style={inputStyle} />
              </Field>
              <Field label="Jumlah Stok">
                <input type="number" value={stockAmount} onChange={(e) => setStockAmount(e.target.value)} style={inputStyle} />
              </Field>
              <Field label="URL Gambar">
                <input value={image} onChange={(e) => setImage(e.target.value)} style={inputStyle} placeholder="https://..." />
              </Field>
              <Field label="Kategori (bisa pilih lebih dari 1)">
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      style={{
                        padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                        border: categories.includes(cat) ? 'none' : '1px solid #e2e8f0',
                        backgroundColor: categories.includes(cat) ? '#4f46e5' : '#fff',
                        color: categories.includes(cat) ? '#fff' : '#64748b',
                        cursor: 'pointer'
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Status Stok Katalog">
                <select value={catalogStatus} onChange={(e) => setCatalogStatus(e.target.value)} style={inputStyle}>
                  <option value="available">Tersedia</option>
                  <option value="warning">Hampir Habis</option>
                </select>
              </Field>
            </>
          )}

        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
            Batal
          </button>
          <button onClick={handleSubmit} style={{ flex: 2, padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#4f46e5', color: '#fff', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
            {isEdit ? 'Simpan Perubahan' : 'Tambah Item'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function StatusField({ status, setStatus }) {
  return (
    <Field label="Status Stok">
      <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
        <option value="Aman">Aman</option>
        <option value="Menipis">Menipis</option>
        <option value="Habis">Habis</option>
      </select>
    </Field>
  );
}

const inputStyle = {
  width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #e2e8f0',
  fontSize: '13px', outline: 'none', boxSizing: 'border-box'
};