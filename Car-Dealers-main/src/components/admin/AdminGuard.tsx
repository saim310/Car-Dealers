'use client';

import React, { useState, useEffect } from 'react';

const ADMIN_PIN = '1234'; // Change this to your PIN
const SESSION_KEY = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check existing session
    const session = localStorage.getItem(SESSION_KEY);
    if (session) {
      try {
        const { timestamp } = JSON.parse(session);
        if (Date.now() - timestamp < SESSION_DURATION) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ timestamp: Date.now() }));
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setPin('');
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8fafc'
      }}>
        <p style={{ color: '#64748b' }}>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8fafc',
        padding: '20px'
      }}>
        <div style={{ 
          width: '100%',
          maxWidth: '400px',
          background: '#fff',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: '#fef3c7', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <span style={{ fontSize: '28px' }}>🔒</span>
          </div>
          
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Admin Access
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>
            Enter PIN to access blog management
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={pin}
              onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '24px',
                letterSpacing: '8px',
                textAlign: 'center',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                outline: 'none',
                marginBottom: '16px',
                fontWeight: 700,
                color: '#0f172a'
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#f5a623'; }}
              onBlur={e => { e.currentTarget.style.borderColor = '#e2e8f0'; }}
              autoFocus
            />
            
            {error && (
              <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '12px', fontWeight: 500 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                background: '#f5a623',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e6951a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f5a623'; }}
            >
              Access Admin Panel
            </button>
          </form>

          <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '20px' }}>
            Session expires after 24 hours
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Logout button */}
      <div style={{ 
        background: '#fff', 
        borderBottom: '1px solid #e2e8f0',
        padding: '12px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              background: '#fee2e2',
              color: '#dc2626',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
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