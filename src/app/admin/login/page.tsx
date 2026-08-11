'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('Invalid email ya password.');
      return;
    }
    router.push('/admin/blog');
    router.refresh();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', background: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <span style={{ fontSize: '28px' }}>🔒</span>
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Admin Access</h2>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Login to manage blogs</p>

        <form onSubmit={handleLogin}>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email" required autoFocus
            style={{ width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '10px', marginBottom: '12px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
          <input
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" required
            style={{ width: '100%', padding: '14px 16px', border: '2px solid #e2e8f0', borderRadius: '10px', marginBottom: '16px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
          {error && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px', fontWeight: 500 }}>{error}</p>}
          <button
            type="submit" disabled={loading}
            style={{ width: '100%', padding: '14px', background: '#f5a623', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}