import React, { useState } from 'react';
import Sidebar from './component/sidebar';
import DashboardPage from './pages/DashboardPage';
import AbsensiPage from './pages/AbsensiPage';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar selalu tampil di kiri */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Konten Halaman Berganti Sesuai State */}
      {activePage === 'dashboard' && <DashboardPage />}
      {activePage === 'absensi' && <AbsensiPage />}
      
      {activePage === 'inventaris' && (
        <div style={{ padding: '32px', flex: 1, backgroundColor: '#f8fafc' }}>
          <h2>Halaman Inventaris</h2>
        </div>
      )}
      {activePage === 'riwayat' && (
        <div style={{ padding: '32px', flex: 1, backgroundColor: '#f8fafc' }}>
          <h2>Halaman Riwayat</h2>
        </div>
      )}
    </div>
  );
}