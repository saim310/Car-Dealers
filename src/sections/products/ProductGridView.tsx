"use client";
import React from 'react';
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
    const rawStatus = (
        item.stockStatus || 
        item.stock_status || 
        item.availability || 
        item.stock ||
        item.tag ||
        item.badge ||
        (typeof item.status === 'string' && !['new', 'used'].includes(item.status.toLowerCase()) ? item.status : '') || 
        ''
    );
    const statusVal = String(rawStatus).toLowerCase().trim();

    if (statusVal.includes('offer') || item.onOffer) {
        return { label: 'ON OFFER', bg: '#0284c7', color: '#fff', icon: 'fa-tags' };
    }
    if (statusVal.includes('order') || item.onOrder) {
        return { label: 'ON ORDER', bg: '#0284c7', color: '#fff', icon: 'fa-truck-moving' };
    }
    if (statusVal.includes('reserved') || statusVal.includes('deposit') || item.isReserved) {
        return { label: 'RESERVED', bg: '#f59e0b', color: '#fff', icon: 'fa-clock' };
    }
    if (statusVal.includes('sold') || item.isSold) {
        return { label: 'SOLD OUT', bg: '#dc3545', color: '#fff', icon: 'fa-ban' };
    }

    // Default to In Stock
    return { label: 'IN STOCK', bg: '#28a745', color: '#fff', icon: 'fa-check-circle' };
};

export default function ProductGridView({ product }: { product: any }) {
    const carId = product.id || product.stockNumber || product.vin || '1';
    const badge = getStatusBadge(product);
    const priceNum = product.salePrice || product.price || product.Price || 0;
    const hasPrice = priceNum > 0 && priceNum !== 'Contact for Price';
    const yardValue = product.yard || product.Yard;
    // Specific yard name (Maidstone/Mordialloc/Brisbane) takes priority over the
    // generic city field, since "city" alone can't distinguish Maidstone from Mordialloc.
    const derivedYardCity = getYardCity(yardValue);
    const cityLabel = derivedYardCity !== 'N/A' ? derivedYardCity : (product.city || product.City || 'N/A');

    return (
        <div className="col-xl-4 col-lg-6 col-md-6 mb-4">
            <div style={{
                background: '#fff',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                border: '1px solid #f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <div style={{ position: 'relative', height: '210px', background: '#f5f5f5' }}>
                    <Link href={`/inner/listing-single/${carId}`}>
                        <img 
                            src={product.image || "/assets/images/shop/shop-product-1-1.jpg"} 
                            alt={product.title || "Car"} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </Link>

                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: badge.bg,
                        color: badge.color,
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px'
                    }}>
                        <i className={`fas ${badge.icon}`} style={{ fontSize: '10px' }}></i>
                        {badge.label}
                    </div>

                    <button style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '32px',
                        height: '32px',
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

                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1a1a2e', marginBottom: '6px', lineHeight: 1.3 }}>
                        <Link href={`/inner/listing-single/${carId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {product.title || (product.brand + " " + product.model)}
                        </Link>
                    </h4>

                    {/* Location / Yard Info — driven by the product's own data now */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#dc3545', fontSize: '13px' }}></i>
                        <span style={{ fontSize: '13px', color: '#555', fontWeight: 600 }}>
                            Yard {yardValue || 'N/A'}: {cityLabel}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '22px', fontWeight: 900, color: '#1a1a2e' }}>
                            {hasPrice ? formatPrice(priceNum) : 'Contact for Price'}
                        </span>
                        {hasPrice && (
                            <span style={{
                                background: '#ffc107',
                                color: '#1a1a2e',
                                fontSize: '10px',
                                fontWeight: 800,
                                padding: '3px 8px',
                                borderRadius: '4px',
                                letterSpacing: '0.3px'
                            }}>
                                AUD
                            </span>
                        )}
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        marginBottom: '14px',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#555', fontWeight: 600 }}>
                            <i className="fas fa-cogs" style={{ color: '#888', fontSize: '12px' }}></i>
                            <span>{product.transmission || 'Auto'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#555', fontWeight: 600 }}>
                            <i className={`fas ${product.fuel === 'Hybrid' ? 'fa-leaf' : 'fa-gas-pump'}`} style={{ color: product.fuel === 'Hybrid' ? '#28a745' : '#888', fontSize: '12px' }}></i>
                            <span>{product.fuel || 'Petrol'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#555', fontWeight: 600 }}>
                            <i className="fas fa-tachometer-alt" style={{ color: '#888', fontSize: '12px' }}></i>
                            <span>{product.mileage ? `${formatNumber(product.mileage)} km` : 'N/A'}</span>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <Link 
                            href={`/inner/listing-single/${carId}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                width: '100%',
                                padding: '12px',
                                background: '#ffc107',
                                color: '#1a1a2e',
                                fontWeight: 800,
                                fontSize: '13px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#1a1a2e';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#ffc107';
                                e.currentTarget.style.color = '#1a1a2e';
                            }}
                        >
                            View Details <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
