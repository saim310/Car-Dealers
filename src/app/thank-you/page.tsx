'use client';

import React from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        background: '#ffffff',
        padding: '40px 32px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        border: '1px solid #eef2f6'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          backgroundColor: '#dcfce7',
          color: '#16a34a',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto'
        }}>
          <i className="fas fa-check" style={{ fontSize: '32px' }}></i>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#1a1a2e', marginBottom: '12px' }}>
          Enquiry Sent!
        </h1>
        
        <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', marginBottom: '28px' }}>
          Thank you for reaching out to UKA Japan Motors. Our team has received your enquiry and will get back to you shortly.
        </p>

        <Link 
          href="/inner/products" 
          style={{
            display: 'inline-block',
            backgroundColor: '#ffc107',
            color: '#1a1a2e',
            padding: '12px 30px',
            borderRadius: '30px',
            fontWeight: 800,
            fontSize: '14px',
            textDecoration: 'none'
          }}
        >
          Explore More Vehicles &rarr;
        </Link>
      </div>
    </div>
  );
}