"use client";
import React from 'react';

interface ListingTopProps {
    car?: any;
}

export default function ListingTop({ car }: ListingTopProps) {
    const title = car?.Title || car?.title || `${car?.Make || ''} ${car?.Model || ''} ${car?.Badge || ''}`.trim();

    return (
        <div style={{ marginBottom: '16px' }}>
            <nav style={{ fontSize: '12px', color: '#999', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#ffc107', fontWeight: 600, cursor: 'pointer' }}>Home</span>
                <i className="fas fa-chevron-right" style={{ fontSize: '8px', color: '#ccc' }}></i>
                <span style={{ color: '#666' }}>Used Cars</span>
                <i className="fas fa-chevron-right" style={{ fontSize: '8px', color: '#ccc' }}></i>
                <span style={{ color: '#1a1a2e', fontWeight: 700 }}>{title}</span>
            </nav>
            <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1a1a2e', margin: 0, letterSpacing: '-0.5px' }}>
                {title}
            </h1>
        </div>
    );
}