'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <>
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px', background: '#fee2e2', color: '#dc2626',
              border: 'none', borderRadius: '8px', fontSize: '13px',
              fontWeight: 600, cursor: 'pointer'
            }}
          >
            🔓 Logout
          </button>
        </div>
      </div>
      {children}
    </>
  );
}