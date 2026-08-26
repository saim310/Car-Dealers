"use client";
import React, { useState } from 'react';

interface ListingsSlidersProps {
    car?: any;
}

const FALLBACK_IMAGE = "/assets/images/shop/shop-product-1-1.jpg";

export default function ListingsSliders({ car }: ListingsSlidersProps) {
    const images: string[] = (car?.images && car.images.length > 0)
        ? car.images
        : (car?.image ? [car.image] : [FALLBACK_IMAGE]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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
                    onError={(e: any) => { e.target.src = FALLBACK_IMAGE; }}
                />

                {/* Badge */}
                <div style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: badge.bg,
                    color: badge.color,
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {badge.label}
                </div>

                {/* Top Right Expand Button */}
                <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '8px' }}>
                    <button 
                        onClick={() => setIsLightboxOpen(true)}
                        title="View Fullscreen"
                        style={{
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
                        }}
                    >
                        <i className="fas fa-expand" style={{ color: '#666', fontSize: '14px' }}></i>
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
                    fontSize: '12px',
                    fontWeight: 700
                }}>
                    {activeIndex + 1} / {images.length}
                </div>

                {/* Nav Arrows */}
                {images.length > 1 && (
                    <>
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
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '12px',
                    width: '100%',
                    overflowX: 'auto',
                    paddingBottom: '4px'
                }}>
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            style={{
                                flex: '0 0 90px',
                                height: '85px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                border: activeIndex === idx ? '3px solid #ffc107' : '3px solid transparent',
                                padding: 0,
                                cursor: 'pointer',
                                opacity: activeIndex === idx ? 1 : 0.65,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <img
                                src={img}
                                alt={`Thumb ${idx + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                onError={(e: any) => { e.target.src = FALLBACK_IMAGE; }}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Lightbox Modal with Navigation */}
            {isLightboxOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.95)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}>
                    {/* Close Button */}
                    <button 
                        onClick={() => setIsLightboxOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '30px',
                            background: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '45px',
                            height: '45px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            zIndex: 10000,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}
                    >
                        &times;
                    </button>

                    {/* Image Counter inside Lightbox */}
                    <div style={{
                        position: 'absolute',
                        top: '25px',
                        left: '30px',
                        color: '#fff',
                        background: 'rgba(255,255,255,0.15)',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: 600,
                        zIndex: 10000
                    }}>
                        {activeIndex + 1} / {images.length}
                    </div>

                    {/* Lightbox Prev Arrow */}
                    {images.length > 1 && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
                            }} 
                            style={{
                                position: 'absolute',
                                left: '25px',
                                top: '50%',
                                transform: 'translateY(-25px)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: '#fff',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10000,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }}
                        >
                            <i className="fas fa-chevron-left" style={{ color: '#1a1a2e', fontSize: '16px' }}></i>
                        </button>
                    )}

                    {/* Active Image */}
                    <img
                        src={images[activeIndex]}
                        alt="Fullscreen View"
                        style={{
                            maxWidth: '85%',
                            maxHeight: '85vh',
                            objectFit: 'contain',
                            borderRadius: '8px'
                        }}
                    />

                    {/* Lightbox Next Arrow */}
                    {images.length > 1 && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveIndex((prev) => (prev + 1) % images.length);
                            }} 
                            style={{
                                position: 'absolute',
                                right: '25px',
                                top: '50%',
                                transform: 'translateY(-25px)',
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: '#fff',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 10000,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                            }}
                        >
                            <i className="fas fa-chevron-right" style={{ color: '#1a1a2e', fontSize: '16px' }}></i>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
