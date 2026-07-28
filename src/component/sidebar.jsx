import React from 'react';
import { Plus, BarChart2, Users, Package, History, HelpCircle, LogOut } from 'lucide-react';

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <aside style={{ 
      width: '240px', 
      borderRight: '1px solid #e5e7eb', 
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between', 
      backgroundColor: '#fff',
      height: '100vh',
      boxSizing: 'border-box'
    }}>
      <div>
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>
            ScentFlow <span style={{ color: '#4f46e5' }}>POS</span>
          </h2>
        </div>

        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4f46e5',
          color: '#fff',
          border: 'none',
          borderRadius: '12px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}>
          <Plus size={18} /> New Sale
        </button>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <NavItem 
            icon={<BarChart2 size={18} />} 
            label="Dashboard" 
            active={activePage === 'dashboard'} 
            onClick={() => setActivePage('dashboard')}
          />
          <NavItem 
            icon={<Users size={18} />} 
            label="Absensi" 
            active={activePage === 'absensi'} 
            onClick={() => setActivePage('absensi')}
          />
          <NavItem 
            icon={<Package size={18} />} 
            label="Inventaris" 
            active={activePage === 'inventaris'} 
            onClick={() => setActivePage('inventaris')}
          />
          <NavItem 
            icon={<History size={18} />} 
            label="Riwayat" 
            active={activePage === 'riwayat'} 
            onClick={() => setActivePage('riwayat')}
          />
        </nav>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavItem icon={<HelpCircle size={18} />} label="Help Center" />
        <NavItem icon={<LogOut size={18} />} label="Logout" />
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false, onClick }) {
  return (
    <div 
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 14px',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: active ? '#e0e7ff' : 'transparent',
        color: active ? '#4338ca' : '#4b5563',
        fontWeight: active ? '600' : 'normal'
      }}
    >
      {icon}
      <span style={{ fontSize: '14px' }}>{label}</span>
    </div>
  );
}