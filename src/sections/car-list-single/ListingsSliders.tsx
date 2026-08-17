"use client";
import React, { useState } from 'react';

interface ListingsSlidersProps {
    car?: any;
}

const FALLBACK_IMAGE = "/assets/images/shop/shop-product-1-1.jpg";

export default function ListingsSliders({ car }: ListingsSlidersProps) {
    // Use the car's real images[] array (whatever length it is) instead of guessing 5 filenames from the stock number.
    const images: string[] = (car?.images && car.images.length > 0)
        ? car.images
        : (car?.image ? [car.image] : [FALLBACK_IMAGE]);

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
                    fontSize: '12px',
                    fontWeight: 700
                }}>
                    {activeIndex + 1} / {images.length}
                </div>

                {/* Nav Arrows — only shown when there's more than one image */}
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

            {/* Thumbnails — scrollable row so any number of images (5, 10, 15...) stays readable instead of getting squished */}
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
        </div>
    );
}
