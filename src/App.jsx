import React, { useState } from 'react';
import Sidebar from './component/sidebar';
import DashboardPage from './pages/DashboardPage';
import AbsensiPage from './pages/AbsensiPage';
import InventarisPage from './pages/InventarisPage';
import RiwayatPage from './pages/RiwayatPage';
import NewSaleModal from './component/NewSaleModal';
import LockedOverlay from './component/LockedOverlay';

export default function App() {
  const [activePage, setActivePage] = useState('absensi'); // start di Absensi
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false);

  // ===== CART =====
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const increaseQty = (id) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
  };
  const decreaseQty = (id) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item)).filter((item) => item.qty > 0));
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ===== ABSENSI — STATIS, cuma useState (ga nyimpen apa-apa, reset kalau refresh) =====
  const [currentShift, setCurrentShift] = useState(null); // null = belum clock-in, { clockInTimestamp } = lagi kerja
  const [shiftHistory, setShiftHistory] = useState([
    // dummy data awal, biar tabel Riwayat/Log ga kosong dari awal
    { id: 1, clockInTimestamp: new Date('2026-07-01T08:00:12').getTime(), clockOutTimestamp: new Date('2026-07-01T17:05:44').getTime(), durationMs: (9 * 60 + 5) * 60 * 1000, cashPhysical: 750000, notes: '', isEarly: false },
    { id: 2, clockInTimestamp: new Date('2026-06-30T07:55:30').getTime(), clockOutTimestamp: new Date('2026-06-30T17:15:20').getTime(), durationMs: (9 * 60 + 20) * 60 * 1000, cashPhysical: 680000, notes: '', isEarly: false },
  ]);
  const isClockedIn = currentShift !== null;

  const clockIn = () => {
    setCurrentShift({ clockInTimestamp: Date.now() });
  };

  const clockOut = ({ cashPhysical, notes, isEarly }) => {
    if (!currentShift) return;
    const clockOutTimestamp = Date.now();
    const record = {
      id: currentShift.clockInTimestamp,
      clockInTimestamp: currentShift.clockInTimestamp,
      clockOutTimestamp,
      durationMs: clockOutTimestamp - currentShift.clockInTimestamp,
      cashPhysical,
      notes,
      isEarly,
    };
    setShiftHistory((prev) => [record, ...prev]);
    setCurrentShift(null);
  };

  const handleOpenNewSale = () => {
    if (!isClockedIn) return; // ga bisa buka New Sale kalau belum clock-in
    setActivePage('dashboard');
    setIsNewSaleOpen(true);
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenNewSale={handleOpenNewSale}
      />

      {activePage === 'dashboard' && (
        <LockedOverlay
          locked={!isClockedIn}
          message="Clock In dulu di halaman Absensi untuk membuka Dashboard POS"
          outerStyle={{ flex: 1, height: '100%', minWidth: 0 }}
        >
          <DashboardPage
            cart={cart}
            addToCart={addToCart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            removeFromCart={removeFromCart}
          />
        </LockedOverlay>
      )}

      {activePage === 'absensi' && (
        <AbsensiPage
          isClockedIn={isClockedIn}
          currentShift={currentShift}
          shiftHistory={shiftHistory}
          onClockIn={clockIn}
          onClockOut={clockOut}
        />
      )}

      {activePage === 'inventaris' && (
        <LockedOverlay
          locked={!isClockedIn}
          message="Clock In dulu di halaman Absensi untuk membuka Inventaris"
          outerStyle={{ flex: 1, height: '100%', minWidth: 0 }}
        >
          <InventarisPage />
        </LockedOverlay>
      )}

      {activePage === 'riwayat' && (
        <LockedOverlay
          locked={!isClockedIn}
          message="Clock In dulu di halaman Absensi untuk membuka Riwayat"
          outerStyle={{ flex: 1, height: '100%', minWidth: 0 }}
        >
          <RiwayatPage shiftHistory={shiftHistory} />
        </LockedOverlay>
      )}

      <NewSaleModal
        isOpen={isNewSaleOpen}
        onClose={() => setIsNewSaleOpen(false)}
        addToCart={addToCart}
      />
    </div>
  );
}