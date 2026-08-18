import React, { useState } from 'react';
import Sidebar from './component/sidebar';
import DashboardPage from './pages/DashboardPage';
import AbsensiPage from './pages/AbsensiPage';
import InventarisPage from './pages/InventarisPage';
import RiwayatPage from './pages/RiwayatPage';
import NewSaleModal from './component/NewSaleModal'; 

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isNewSaleOpen, setIsNewSaleOpen] = useState(false); // State untuk pop-up modal

  const handleOpenNewSale = () => {
    // Jika sedang di halaman lain, arahkan ke dashboard dan buka modalnya
    setActivePage('dashboard');
    setIsNewSaleOpen(true);
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar menerima handler onOpenNewSale */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onOpenNewSale={handleOpenNewSale}
      />

      {/* Konten Halaman */}
      {activePage === 'dashboard' && <DashboardPage />}
      {activePage === 'absensi' && <AbsensiPage />}
      {activePage === 'inventaris' && <InventarisPage />}
      {activePage === 'riwayat' && <RiwayatPage />}

      {/* Pop-up Modal New Sale */}
      <NewSaleModal 
        isOpen={isNewSaleOpen} 
        onClose={() => setIsNewSaleOpen(false)} 
      />
    </div>
  );
}