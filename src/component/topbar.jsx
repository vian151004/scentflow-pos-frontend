import React from 'react';
import { Bell, User } from 'lucide-react';

export default function Topbar() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '24px',
      height: '36px'
    }}>
      <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>
        Flagship Store (Jakarta)
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Bell size={18} color="#94a3b8" style={{ cursor: 'pointer' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            backgroundColor: '#e2e8f0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <User size={16} color="#64748b" />
          </div>
          <span style={{ fontWeight: '700', fontSize: '13px', color: '#1e293b' }}>
            Budi Santoso
          </span>
        </div>
      </div>
    </div>
  );
}