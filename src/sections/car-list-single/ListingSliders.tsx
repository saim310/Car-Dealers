"use client";
import React, { useState } from 'react';

interface ListingsSlidersProps {
    car?: any;
}

export default function ListingsSliders({ car }: ListingsSlidersProps) {
    const stockNo = car?.StockNumber || car?.id || '100322';
    const images = [
        `/assets/images/cars/${stockNo}_1.jpg`,
        `/assets/images/cars/${stockNo}_2.jpg`,
        `/assets/images/cars/${stockNo}_3.jpg`,
        `/assets/images/cars/${stockNo}_4.jpg`,
        `/assets/images/cars/${stockNo}_5.jpg`,
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const badge = car?.isNew || car?.status === 'new' 
        ? { label: 'JUST ARRIVED', bg: '#ffc107', color: '#1a1a2e' }
        : car?.fuel === 'Hybrid' 
        ? { label: 'HYBRID', bg: '#28a745', color: '#fff' }
        : { label: 'BEST SELLER', bg: '#ffc107', color: '#1a1a2e' };

    return (
        <div>
            {/* Main Image */}
            <div style={{ 
                position: 'relative', 
                width: '100%', 
                height: '460px', 
                borderRadius: '12px', 
                overflow: 'hidden',
                background: '#e9ecef'
            }}>
                <img
                    src={images[activeIndex]}
                    alt={car?.Title || 'Car'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e: any) => { e.target.src = "/assets/images/shop/shop-product-1-1.jpg"; }}
                />

                {/* Badge */}
                <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: badge.bg,
                    color: badge.color,
                    padding: '5px 12px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {badge.label}
                </div>

                {/* Top Right Icons */}
                <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '8px' }}>
                    <button style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#fff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                    }}>
                        <i className="fas fa-expand" style={{ color: '#666', fontSize: '14px' }}></i>
                    </button>
                    <button style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: '#fff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                    }}>
                        <i className="far fa-heart" style={{ color: '#666', fontSize: '14px' }}></i>
                    </button>
                </div>

                {/* Image Counter */}
                <div style={{
                    position: 'absolute',
                    bottom: '14px',
                    left: '14px',
                    background: 'rgba(0,0,0,0.65)',
                    color: '#fff',
                    padding: '5px 12px',
                    borderRadius: '16px',
                    fontSize: '11px',
                    fontWeight: 700
                }}>
                    {activeIndex + 1} / {images.length}
                </div>

                {/* Nav Arrows */}
                <button onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)} style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#fff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}>
                    <i className="fas fa-chevron-left" style={{ color: '#1a1a2e', fontSize: '13px' }}></i>
                </button>
                <button onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)} style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#fff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}>
                    <i className="fas fa-chevron-right" style={{ color: '#1a1a2e', fontSize: '13px' }}></i>
                </button>
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        style={{
                            width: '90px',
                            height: '64px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: activeIndex === idx ? '2px solid #ffc107' : '2px solid transparent',
                            padding: 0,
                            cursor: 'pointer',
                            flexShrink: 0,
                            opacity: activeIndex === idx ? 1 : 0.6,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <img 
                            src={img} 
                            alt={`Thumb ${idx + 1}`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e: any) => { e.target.src = "/assets/images/shop/shop-product-1-1.jpg"; }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}