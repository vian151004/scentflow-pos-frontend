import React, { useState, useEffect } from 'react';
import { Clock, FileText, AlertCircle, AlertTriangle } from 'lucide-react';
import Topbar from '../component/Topbar';
import LockedOverlay from '../component/LockedOverlay';

const REQUIRED_WORK_MS = 8 * 60 * 60 * 1000; // 8 jam wajib kerja

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function AbsensiPage({ isClockedIn, currentShift, shiftHistory, onClockIn, onClockOut }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const [cashPhysical, setCashPhysical] = useState('');
  const [notes, setNotes] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const reportFilled = cashPhysical.trim() !== '';

  const wallClock = new Date(now).toLocaleTimeString('id-ID', { hour12: false });

  // GUARD: cek `currentShift` langsung, bukan `isClockedIn`.
  // Ini satu-satunya tempat yang boleh baca currentShift.clockInTimestamp untuk workDuration.
  const workDuration = currentShift ? formatDuration(now - currentShift.clockInTimestamp) : null;

  const dateLabel = new Date(now).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const handleClockOutClick = () => {
    if (!currentShift) return; // guard: kalau somehow currentShift null, jangan lanjut
    const durationMs = now - currentShift.clockInTimestamp;
    if (durationMs < REQUIRED_WORK_MS) {
      setShowWarning(true);
    } else {
      finalizeClockOut(false);
    }
  };

  const finalizeClockOut = (isEarly) => {
    onClockOut({
      cashPhysical: Number(cashPhysical),
      notes,
      isEarly,
    });
    setCashPhysical('');
    setNotes('');
    setShowWarning(false);
  };

  return (
    <div style={{ flex: 1, padding: '32px', backgroundColor: '#f8fafc', overflowY: 'auto', height: '100vh', boxSizing: 'border-box' }}>

      <Topbar />

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
          Absensi & Penutupan Shift
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
          Kelola kehadiran harian dan laporan serah terima kasir.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

        <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>Presensi Kerja</span>
              <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: '#f1f5f9', color: '#64748b', padding: '4px 8px', borderRadius: '6px' }}>PEKERJA 1</span>
            </div>

            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              {currentShift ? (
                <>
                  <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', fontFamily: 'monospace' }}>
                    {workDuration}
                  </h2>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0', fontFamily: 'monospace' }}>
                    Jam sekarang: {wallClock}
                  </p>
                </>
              ) : (
                <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'monospace' }}>
                  {wallClock}
                </h2>
              )}
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', fontWeight: '500' }}>
                {dateLabel}
              </p>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#f1f5f9',
                padding: '6px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', color: '#334155'
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  backgroundColor: currentShift ? '#10b981' : '#cbd5e1'
                }} />
                {currentShift ? 'STATUS: SUDAH ABSEN MASUK' : 'STATUS: BELUM ABSEN MASUK'}
              </div>
            </div>

            {!currentShift ? (
              <button
                onClick={onClockIn}
                style={{
                  width: '100%', backgroundColor: '#10b981', color: '#fff', border: 'none',
                  padding: '16px', borderRadius: '12px', fontWeight: '700', fontSize: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  cursor: 'pointer', marginTop: '24px'
                }}
              >
                <Clock size={18} /> CLOCK IN
              </button>
            ) : (
              <button
                onClick={handleClockOutClick}
                disabled={!reportFilled}
                style={{
                  width: '100%',
                  backgroundColor: reportFilled ? '#f97316' : '#fed7aa',
                  color: '#fff', border: 'none',
                  padding: '16px', borderRadius: '12px', fontWeight: '700', fontSize: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  cursor: reportFilled ? 'pointer' : 'not-allowed', marginTop: '24px'
                }}
              >
                <Clock size={18} /> CLOCK OUT
              </button>
            )}
            {currentShift && !reportFilled && (
              <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '8px' }}>
                Isi laporan kas di sebelah kanan dulu untuk bisa Clock Out.
              </p>
            )}
          </div>

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
                {shiftHistory.slice(0, 5).map((shift) => (
                  <tr key={shift.id} style={{ borderTop: '1px solid #f8fafc', color: '#334155' }}>
                    <td style={{ padding: '10px 0' }}>
                      {new Date(shift.clockInTimestamp).toLocaleDateString('id-ID')}
                    </td>
                    <td style={{ padding: '10px 0' }}>
                      {new Date(shift.clockInTimestamp).toLocaleTimeString('id-ID', { hour12: false })}
                    </td>
                    <td style={{ padding: '10px 0' }}>
                      {new Date(shift.clockOutTimestamp).toLocaleTimeString('id-ID', { hour12: false })}
                    </td>
                    <td style={{ padding: '10px 0', color: shift.isEarly ? '#f97316' : '#4f46e5', fontWeight: '600' }}>
                      {formatDuration(shift.durationMs)} {shift.isEarly && '(early)'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <LockedOverlay
          locked={!currentShift}
          message="Laporan kas terbuka setelah kamu Clock In"
          outerStyle={{ borderRadius: '16px' }}
        >
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
              Laporan Kas Akhir Shift
            </h3>

            <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.5px' }}>
                TOTAL PENJUALAN SISTEM
              </span>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', marginTop: '6px' }}>
                Rp 750.000
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>
                TOTAL UANG FISIK <span style={{ color: '#f43f5e' }}>*wajib</span>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 16px', backgroundColor: '#fff' }}>
                <span style={{ fontSize: '13px', color: '#64748b', marginRight: '8px' }}>Rp</span>
                <input
                  type="number"
                  value={cashPhysical}
                  onChange={(e) => setCashPhysical(e.target.value)}
                  style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', fontWeight: '700', textAlign: 'right' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '8px' }}>
                CATATAN CLOSING (opsional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tambahkan catatan jika ada selisih..."
                rows={4}
                style={{
                  width: '100%', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px',
                  fontSize: '13px', outline: 'none', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', padding: '12px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <AlertCircle size={16} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>
                Isi Total Uang Fisik untuk mengaktifkan tombol Clock Out di sebelah kiri.
              </p>
            </div>
          </div>
        </LockedOverlay>
      </div>

      {/* GUARD: hanya render modal kalau showWarning true DAN currentShift ada isinya */}
      {showWarning && currentShift && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
        }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', width: '380px', padding: '24px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: '#fff7ed', color: '#f97316', padding: '10px', borderRadius: '10px', display: 'flex', height: 'fit-content' }}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                  Belum Sesuai Jam Kerja
                </h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>
                  Kamu baru bekerja {formatDuration(now - currentShift.clockInTimestamp)} dari target 8 jam.
                  Tetap lanjutkan Clock Out? Ini akan tercatat di riwayat.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowWarning(false)}
                style={{
                  flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0',
                  backgroundColor: '#fff', color: '#64748b', fontWeight: '700', fontSize: '13px', cursor: 'pointer'
                }}
              >
                Batal
              </button>
              <button
                onClick={() => finalizeClockOut(true)}
                style={{
                  flex: 1, padding: '12px', borderRadius: '10px', border: 'none',
                  backgroundColor: '#f97316', color: '#fff', fontWeight: '700', fontSize: '13px', cursor: 'pointer'
                }}
              >
                Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}