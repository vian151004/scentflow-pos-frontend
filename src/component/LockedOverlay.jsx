import React from 'react';
import { Lock } from 'lucide-react';

export default function LockedOverlay({ locked, message, children, outerStyle = {} }) {
  if (!locked) return <>{children}</>;

  return (
    <div style={{ position: 'relative', ...outerStyle }}>
      <div style={{ filter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none', height: '100%' }}>
        {children}
      </div>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(248, 250, 252, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        textAlign: 'center',
        padding: '0 32px'
      }}>
        <div style={{ backgroundColor: '#0f172a', color: '#fff', padding: '14px', borderRadius: '50%', display: 'flex' }}>
          <Lock size={22} />
        </div>
        <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
          {message || 'Clock In terlebih dahulu untuk membuka halaman ini'}
        </p>
      </div>
    </div>
  );
}