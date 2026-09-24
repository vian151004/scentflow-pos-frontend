import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Clock,
  Printer,
  RotateCcw,
  QrCode,
  Banknote
} from 'lucide-react';
import Topbar from '../component/Topbar';

const TAX_RATE = 0.11; // konsisten sama Dashboard, bukan 0%

// Helper hitung subtotal dari items — supaya subtotal/tax/total SELALU konsisten
// dengan isi items, bukan angka manual yang bisa nyasar dari itemnya
function calculateTotals(items) {
  const subtotal = items.reduce((sum, item) => sum + item.pricePerUnit * item.qty, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  return { subtotal, tax, total };
}

function buildTransaction({ id, customerName, timestamp, items, paymentMethod, status, cashier }) {
  const { subtotal, tax, total } = calculateTotals(items);
  return { id, customerName, timestamp, items, paymentMethod, status, cashier, subtotal, tax, total };
}

const INITIAL_TRANSACTIONS = [
  buildTransaction({
    id: '#TRX-20260702-001',
    customerName: 'Ibu Sarah',
    timestamp: new Date('2026-07-02T14:20:00').getTime(),
    items: [
      { name: 'Baccarat Rouge', pricePerUnit: 150000, qty: 1, isCustom: true, customDetail: '50ml - Premium 2:1' },
      { name: 'Botol Spray 50ml', pricePerUnit: 35000, qty: 1, isCustom: false },
    ],
    paymentMethod: 'QRIS',
    status: 'LUNAS',
    cashier: 'RETAIL ASSOCIATE #01',
  }),
  buildTransaction({
    id: '#TRX-20260702-002',
    customerName: '',
    timestamp: new Date('2026-07-02T14:55:00').getTime(),
    items: [
      { name: 'Santal 33', pricePerUnit: 450000, qty: 1, isCustom: true, customDetail: '100ml - Standard 1:1' },
    ],
    paymentMethod: 'CASH',
    status: 'LUNAS',
    cashier: 'RETAIL ASSOCIATE #01',
  }),
  buildTransaction({
    id: '#TRX-20260702-003',
    customerName: 'Pak Andi',
    timestamp: new Date('2026-07-02T15:10:00').getTime(),
    items: [
      { name: 'Sauvage Dior', pricePerUnit: 6000, qty: 30, isCustom: false },
    ],
    paymentMethod: 'QRIS',
    status: 'LUNAS',
    cashier: 'RETAIL ASSOCIATE #01',
  }),
  buildTransaction({
    id: '#TRX-20260702-004',
    customerName: '',
    timestamp: new Date('2026-07-02T15:45:00').getTime(),
    items: [
      { name: "J'Adore", pricePerUnit: 9200, qty: 10, isCustom: false },
    ],
    paymentMethod: 'CASH',
    status: 'REFUND',
    cashier: 'RETAIL ASSOCIATE #01',
  }),
];

function formatRupiah(num) {
  return 'Rp ' + Math.round(num).toLocaleString('id-ID');
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
}

function formatFullDate(timestamp) {
  return new Date(timestamp).toLocaleString('id-ID', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

export default function RiwayatPage() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(INITIAL_TRANSACTIONS[0].id);

  const filteredTransactions = transactions.filter((trx) =>
    trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trx.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // GUARD: kalau hasil search berubah dan transaksi yang lagi dipilih ga ada di hasil filter,
  // fallback ke transaksi pertama yang ADA di hasil filter, bukan biarin selectedTrx jadi null.
  const selectedTrx = transactions.find((t) => t.id === selectedId)
    && filteredTransactions.find((t) => t.id === selectedId)
    ? transactions.find((t) => t.id === selectedId)
    : filteredTransactions[0];

  const handleRefund = () => {
    if (!selectedTrx || selectedTrx.status === 'REFUND') return;
    if (window.confirm(`Yakin ingin membatalkan transaksi ${selectedTrx.id}? Status akan berubah jadi REFUND.`)) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === selectedTrx.id ? { ...t, status: 'REFUND' } : t))
      );
    }
  };

  const handleReprint = () => {
    window.print(); // placeholder sederhana — cetak PDF generator sungguhan di luar scope sekarang
  };

  const getItemsSummary = (items) => {
    if (items.length === 1) return items[0].name;
    return `${items[0].name} & ${items.length - 1} item lainnya`;
  };

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

        <Topbar />

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

        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari ID transaksi, nama customer, atau produk..."
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

        <div style={{ flex: 1, overflowY: 'auto', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#fff' }}>
          {filteredTransactions.length === 0 ? (
            <p style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
              Tidak ada transaksi yang cocok.
            </p>
          ) : (
            filteredTransactions.map((trx) => {
              const isSelected = selectedTrx?.id === trx.id;
              const isRefund = trx.status === 'REFUND';

              return (
                <div
                  key={trx.id}
                  onClick={() => setSelectedId(trx.id)}
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #f1f5f9',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? '#f8fafc' : '#fff',
                    borderLeft: isSelected ? '4px solid #4f46e5' : '4px solid transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
                      {trx.id}
                    </span>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '700', color: isRefund ? '#94a3b8' : '#0f172a' }}>
                      {getItemsSummary(trx.items)}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>{formatTime(trx.timestamp)}</span>
                      <span style={{
                        fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px',
                        backgroundColor: trx.paymentMethod === 'QRIS' ? '#e0e7ff' : '#f1f5f9',
                        color: trx.paymentMethod === 'QRIS' ? '#4f46e5' : '#475569'
                      }}>
                        {trx.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '15px', fontWeight: '700', color: isRefund ? '#94a3b8' : '#0f172a',
                      textDecoration: isRefund ? 'line-through' : 'none', fontFamily: 'monospace', marginBottom: '4px'
                    }}>
                      {formatRupiah(trx.total)}
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '800', color: isRefund ? '#ef4444' : '#10b981', letterSpacing: '0.5px' }}>
                      {trx.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* ================= KOLOM KANAN (STRUK RESI) ================= */}
      <div style={{ width: '420px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#f8fafc', height: '100%', boxSizing: 'border-box' }}>

        {!selectedTrx ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontSize: '13px' }}>
            Pilih transaksi untuk melihat struk.
          </div>
        ) : (
          <>
            <div style={{
              backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', fontFamily: 'sans-serif'
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
                  <span>{formatFullDate(selectedTrx.timestamp)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <span style={{ color: '#64748b', fontSize: '10px' }}>KASIR: {selectedTrx.cashier}</span>
                  <span style={{ color: selectedTrx.status === 'REFUND' ? '#ef4444' : '#10b981', fontWeight: '700', fontSize: '10px' }}>
                    [ {selectedTrx.status} ]
                  </span>
                </div>
                {selectedTrx.customerName && (
                  <div style={{ marginTop: '6px', fontSize: '10px', color: '#64748b' }}>
                    CUSTOMER: {selectedTrx.customerName}
                  </div>
                )}
              </div>

              <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '12px', marginBottom: '12px' }}>
                {selectedTrx.items.map((item, idx) => (
                  <div key={idx} style={{ marginBottom: idx !== selectedTrx.items.length - 1 ? '10px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                      <span>{item.name}{item.isCustom ? ` (${item.customDetail})` : ''}</span>
                      <span style={{ fontFamily: 'monospace' }}>{formatRupiah(item.pricePerUnit * item.qty)}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                      {item.qty} {item.isCustom ? 'Pcs' : 'unit'} x {formatRupiah(item.pricePerUnit)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderBottom: '1px dashed #cbd5e1', paddingBottom: '12px', marginBottom: '12px', fontSize: '12px', color: '#64748b' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Subtotal</span>
                  <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>{formatRupiah(selectedTrx.subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Pajak (11%)</span>
                  <span style={{ fontFamily: 'monospace', color: '#0f172a' }}>{formatRupiah(selectedTrx.tax)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px dashed #cbd5e1', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>TOTAL AKHIR</span>
                <span style={{ fontSize: '16px', fontWeight: '900', color: '#0f172a', fontFamily: 'monospace' }}>
                  {formatRupiah(selectedTrx.total)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>METODE BAYAR</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                  {selectedTrx.paymentMethod === 'QRIS' ? <QrCode size={16} /> : <Banknote size={16} />}
                  <span>{selectedTrx.paymentMethod}</span>
                </div>
              </div>

              <div style={{ textAlign: 'center', fontSize: '10px', color: '#94a3b8', lineHeight: '1.4' }}>
                Terima kasih telah berkunjung ke ScentFlow.<br />
                Simpan struk ini sebagai bukti pembelian sah.
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleReprint}
                style={{
                  width: '100%', backgroundColor: '#fff', border: '1.5px solid #0f172a', color: '#0f172a',
                  padding: '12px', borderRadius: '12px', fontWeight: '700', fontSize: '13px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
                }}
              >
                <Printer size={16} /> Cetak Ulang Struk
              </button>

              <button
                onClick={handleRefund}
                disabled={selectedTrx.status === 'REFUND'}
                style={{
                  width: '100%',
                  backgroundColor: selectedTrx.status === 'REFUND' ? '#f8fafc' : '#fff5f5',
                  border: selectedTrx.status === 'REFUND' ? '1px solid #e2e8f0' : '1px solid #fed7d7',
                  color: selectedTrx.status === 'REFUND' ? '#94a3b8' : '#e53e3e',
                  padding: '12px', borderRadius: '12px', fontWeight: '700', fontSize: '13px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  cursor: selectedTrx.status === 'REFUND' ? 'not-allowed' : 'pointer'
                }}
              >
                <RotateCcw size={16} />
                {selectedTrx.status === 'REFUND' ? 'Sudah Direfund' : 'Batalkan Transaksi (Refund)'}
              </button>
            </div>
          </>
        )}

      </div>

    </div>
  );
}