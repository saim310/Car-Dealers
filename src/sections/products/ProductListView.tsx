"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getYardCity } from '@/config/yards';

const formatNumber = (num: string | number) => {
    const cleaned = String(num).replace(/[^0-9]/g, '');
    return cleaned ? cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
};

const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseInt(price.replace(/,/g, '')) : price;
    if (!num || isNaN(num)) return 'Contact for Price';
    return '$' + num.toLocaleString('en-US');
};

const getStatusBadge = (item: any) => {
    if (item.isNew || item.status === 'new') return { label: 'JUST ARRIVED', bg: '#ffc107', color: '#1a1a2e', icon: 'fa-bolt' };
    if (item.fuel === 'Hybrid') return { label: 'HYBRID', bg: '#28a745', color: '#fff', icon: 'fa-leaf' };
    if (item.salePrice && item.previousPrice && item.salePrice < item.previousPrice) return { label: 'PRICE DROP', bg: '#dc3545', color: '#fff', icon: 'fa-tag' };
    if (item.mileage && parseInt(String(item.mileage).replace(/,/g, '')) < 50000) return { label: 'LOW KM', bg: '#007bff', color: '#fff', icon: 'fa-tachometer-alt' };
    if (item.bodyType?.toLowerCase().includes('sedan') || item.Body?.toLowerCase().includes('sedan')) return { label: 'PREMIUM SEDAN', bg: '#6f42c1', color: '#fff', icon: 'fa-gem' };
    return { label: 'BEST SELLER', bg: '#ffc107', color: '#1a1a2e', icon: 'fa-star' };
};

export default function ProductListView({ product }: { product: any }) {
    const carId = product.id || product.stockNumber || product.vin || '1';
    const badge = getStatusBadge(product);
    const priceNum = product.salePrice || product.price || product.Price || 0;
    const hasPrice = priceNum > 0 && priceNum !== 'Contact for Price';
    const yardValue = product.yard || product.Yard;
    const derivedYardCity = getYardCity(yardValue);
    const cityLabel = derivedYardCity !== 'N/A' ? derivedYardCity : (product.city || product.City || 'N/A');

    const [imgSrc, setImgSrc] = useState(
        product?.image || '/assets/images/shop/shop-product-1-1.jpg'
    );

    const handleImageError = () => {
        setImgSrc('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e9ecef"/%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="24" fill="%236c757d" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E');
    };

    // ✅ Now each card takes full width (1 per row) – no extra comment inside return
    return (
        <div className="col-12 mb-4">
            <div style={{
                background: '#fff',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                border: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
            }}
            >
                <div className="row g-0" style={{ height: '100%' }}>
                    {/* Image Column – full visibility with object-fit: contain */}
                    <div
                        className="col-md-5"
                        style={{
                            position: 'relative',
                            minHeight: '280px',
                            backgroundColor: '#f8f9fa',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        <Link
                            href={`/inner/listing-single/${carId}`}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                minHeight: '280px',
                            }}
                        >
                            <Image
                                src={imgSrc}
                                alt={product.title || 'Car'}
                                fill
                                sizes="(max-width: 768px) 100vw, 40vw"
                                style={{
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                    background: '#f8f9fa',
                                }}
                                onError={handleImageError}
                                priority={false}
                                quality={85}
                                unoptimized
                            />
                        </Link>

                        {/* Badge */}
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            left: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: badge.bg,
                            color: badge.color,
                            padding: '5px 10px',
                            borderRadius: '6px',
                            fontSize: '9px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            zIndex: 2,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}>
                            <i className={`fas ${badge.icon}`} style={{ fontSize: '9px' }}></i>
                            {badge.label}
                        </div>

                        {/* Wishlist Button */}
                        <button style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.92)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 2,
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fff';
                            e.currentTarget.style.transform = 'scale(1.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.92)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        >
                            <i className="far fa-heart" style={{ color: '#666', fontSize: '14px' }}></i>
                        </button>
                    </div>

                    {/* Details Column */}
                    <div className="col-md-7" style={{
                        padding: '24px 24px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <h4 style={{
                            fontSize: '18px',
                            fontWeight: 800,
                            color: '#1a1a2e',
                            marginBottom: '4px',
                            lineHeight: 1.3,
                        }}>
                            <Link
                                href={`/inner/listing-single/${carId}`}
                                style={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                {product?.title || (product.brand + ' ' + product.model)}
                            </Link>
                        </h4>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            marginBottom: '10px',
                        }}>
                            <i className="fas fa-map-marker-alt" style={{ color: '#dc3545', fontSize: '13px' }}></i>
                            <span style={{ fontSize: '14px', color: '#555', fontWeight: 600 }}>
                                Yard {yardValue || 'N/A'}: {cityLabel}
                            </span>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '14px',
                            flexWrap: 'wrap',
                        }}>
                            <span style={{
                                fontSize: '26px',
                                fontWeight: 900,
                                color: '#1a1a2e',
                                letterSpacing: '-0.5px',
                            }}>
                                {hasPrice ? formatPrice(priceNum) : 'Contact for Price'}
                            </span>
                            {hasPrice && (
                                <span style={{
                                    background: '#ffc107',
                                    color: '#1a1a2e',
                                    fontSize: '11px',
                                    fontWeight: 800,
                                    padding: '3px 10px',
                                    borderRadius: '4px',
                                }}>
                                    AUD
                                </span>
                            )}
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '18px',
                            marginBottom: '16px',
                            flexWrap: 'wrap',
                        }}>
                            <span style={{
                                fontSize: '13px',
                                color: '#555',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}>
                                <i className="fas fa-cogs" style={{ color: '#888', fontSize: '13px' }}></i>
                                {product.transmission || 'Auto'}
                            </span>
                            <span style={{
                                fontSize: '13px',
                                color: '#555',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}>
                                <i className={`fas ${product.fuel === 'Hybrid' ? 'fa-leaf' : 'fa-gas-pump'}`}
                                    style={{
                                        color: product.fuel === 'Hybrid' ? '#28a745' : '#888',
                                        fontSize: '13px',
                                    }}></i>
                                {product.fuel || 'Petrol'}
                            </span>
                            <span style={{
                                fontSize: '13px',
                                color: '#555',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}>
                                <i className="fas fa-tachometer-alt" style={{ color: '#888', fontSize: '13px' }}></i>
                                {product.mileage ? `${formatNumber(product.mileage)} km` : 'N/A'}
                            </span>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <Link
                                href={`/inner/listing-single/${carId}`}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 32px',
                                    background: '#ffc107',
                                    color: '#1a1a2e',
                                    fontWeight: 800,
                                    fontSize: '14px',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    transition: 'all 0.25s ease',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#1a1a2e';
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#ffc107';
                                    e.currentTarget.style.color = '#1a1a2e';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                View Details
                                <i className="fas fa-arrow-right" style={{ fontSize: '12px', transition: 'transform 0.25s ease' }}></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
