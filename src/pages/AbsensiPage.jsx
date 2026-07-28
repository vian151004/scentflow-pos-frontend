import React from 'react';
import { Bell, User, Clock, FileText, AlertCircle } from 'lucide-react';

export default function AbsensiPage() {
  return (
    <div style={{ flex: 1, padding: '32px', backgroundColor: '#f8fafc', overflowY: 'auto', height: '100vh' }}>
      
      {/* Topbar Info & Profile */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>Flagship Store (Jakarta)</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Bell size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={16} color="#64748b" />
            </div>
            <span style={{ fontWeight: '700', fontSize: '13px', color: '#1e293b' }}>Budi Santoso</span>
          </div>
        </div>
      </div>

      {/* Header Halaman */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
          Absensi & Penutupan Shift
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Kelola kehadiran harian dan laporan serah terima kasir.
        </p>
      </div>

      {/* Grid Layout 2 Kolom */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* KOLOM KIRI: PRESENSI KERJA */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>Presensi Kerja</span>
              <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#f1f5f9', color: '#64748b', padding: '4px 8px', borderRadius: '6px' }}>PEKERJA 1</span>
            </div>

            {/* Jam Digital Big Display */}
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'monospace' }}>
                01:31:40
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', fontWeight: '500' }}>
                Kamis, 2 Juli 2026
              </p>

              {/* Status Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#f1f5f9', padding: '6px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', color: '#334155' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                STATUS: SUDAH ABSEN MASUK
              </div>
            </div>

            {/* Tombol Clock Out */}
            <button style={{
              width: '100%',
              backgroundColor: '#f97316',
              color: '#fff',
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              marginTop: '24px'
            }}>
              <Clock size={18} /> CLOCK OUT
            </button>
          </div>

          {/* Tabel Log Kehadiran */}
          <div style={{ borderTop: '1px solid #f1f5f9', padding: '20px 24px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.5px' }}>LOG KEHADIRAN</span>
            
            <table style={{ width: '100%', marginTop: '12px', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ textTransform: 'capitalize', color: '#64748b', textAlign: 'left' }}>
                  <th style={{ paddingBottom: '10px', fontWeight: '600' }}>Tanggal</th>
                  <th style={{ paddingBottom: '10px', fontWeight: '600' }}>Masuk</th>
                  <th style={{ paddingBottom: '10px', fontWeight: '600' }}>Keluar</th>
                  <th style={{ paddingBottom: '10px', fontWeight: '600' }}>Durasi</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: '1px solid #f8fafc', color: '#334155' }}>
                  <td style={{ padding: '10px 0' }}>01/07/2026</td>
                  <td style={{ padding: '10px 0' }}>08:00:12</td>
                  <td style={{ padding: '10px 0' }}>17:05:44</td>
                  <td style={{ padding: '10px 0', color: '#6366f1', fontWeight: '600' }}>9h 05m</td>
                </tr>
                <tr style={{ borderTop: '1px solid #f8fafc', color: '#334155' }}>
                  <td style={{ padding: '10px 0' }}>30/06/2026</td>
                  <td style={{ padding: '10px 0' }}>07:55:30</td>
                  <td style={{ padding: '10px 0' }}>17:15:20</td>
                  <td style={{ padding: '10px 0', color: '#6366f1', fontWeight: '600' }}>9h 20m</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* KOLOM KANAN: LAPORAN KAS AKHIR SHIFT */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
            Laporan Kas Akhir Shift
          </h3>

          {/* Display Total Penjualan Sistem */}
          <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>
              TOTAL PENJUALAN SISTEM
            </span>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginTop: '6px' }}>
              Rp 750.000
            </div>
          </div>

          {/* Form Input Uang Fisik */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>
              TOTAL UANG FISIK
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', backgroundColor: '#fff' }}>
              <span style={{ fontSize: '13px', color: '#64748b', marginRight: '8px' }}>Rp</span>
              <input 
                type="number" 
                defaultValue={0}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', fontWeight: '700', textAlign: 'right' }} 
              />
            </div>
          </div>

          {/* Form Catatan Closing */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>
              CATATAN CLOSING
            </label>
            <textarea 
              placeholder="Tambahkan catatan jika ada selisih..."
              rows={4}
              style={{
                width: '100%',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '12px',
                fontSize: '13px',
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Tombol Simpan & Serah Terima */}
          <button style={{
            width: '100%',
            backgroundColor: '#0f172a',
            color: '#fff',
            border: 'none',
            padding: '14px',
            borderRadius: '12px',
            fontWeight: '700',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginBottom: '16px'
          }}>
            <FileText size={16} /> SIMPAN & SERAH TERIMA
          </button>

          {/* Alert Warning Box */}
          <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <AlertCircle size={16} color="#64748b" style={{ shrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, fontSize: '11px', color: '#64748b', leading: '1.4' }}>
              Pastikan jumlah uang fisik di laci sesuai dengan catatan sistem sebelum melakukan penutupan shift.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}