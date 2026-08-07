"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
    const searchParams = useSearchParams();
    const cityParam = searchParams.get('city');

    const carId = product.id || product.stockNumber || product.vin || '1';
    const badge = getStatusBadge(product);
    const priceNum = product.salePrice || product.price || product.Price || 0;
    const hasPrice = priceNum > 0 && priceNum !== 'Contact for Price';

    // Location label resolution
    const getLocationLabel = () => {
        if (cityParam === 'Melbourne') return 'Melbourne';
        if (cityParam === 'Brisbane') return 'Brisbane';
        
        const yardVal = String(product.yard || product.Yard);
        if (yardVal === '1') return 'Maidstone';
        if (yardVal === '2') return 'Mordialloc';
        if (yardVal === '4') return 'Slacks Creek';
        
        return product.city || 'N/A';
    };

    return (
        <div className="col-xl-6 col-lg-6 mb-4">
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
                <div className="row g-0" style={{ height: '100%' }}>
                    <div className="col-md-5" style={{ position: 'relative', minHeight: '200px' }}>
                        <Link href={`/inner/listing-single/${carId}`}>
                            <Image 
                                src={product?.image || '/assets/images/shop/shop-product-1-1.jpg'} 
                                width={400} 
                                height={300} 
                                alt={product.title || "Car"} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        </Link>
                        
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: badge.bg,
                            color: badge.color,
                            padding: '4px 8px',
                            borderRadius: '5px',
                            fontSize: '9px',
                            fontWeight: 800,
                            textTransform: 'uppercase'
                        }}>
                            <i className={`fas ${badge.icon}`} style={{ fontSize: '9px' }}></i>
                            {badge.label}
                        </div>

                        <button style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#fff',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                        }}>
                            <i className="far fa-heart" style={{ color: '#666', fontSize: '12px' }}></i>
                        </button>
                    </div>

                    <div className="col-md-7" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1a1a2e', marginBottom: '6px', lineHeight: 1.3 }}>
                            <Link href={`/inner/listing-single/${carId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                {product?.title || (product.brand + " " + product.model)}
                            </Link>
                        </h4>

                        {/* Location / Yard Info */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                            <i className="fas fa-map-marker-alt" style={{ color: '#dc3545', fontSize: '13px' }}></i>
                            <span style={{ fontSize: '13px', color: '#555', fontWeight: 600 }}>
                                Yard {product.yard || product.Yard || 'N/A'}: {getLocationLabel()}
                            </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 900, color: '#1a1a2e' }}>
                                {hasPrice ? formatPrice(priceNum) : 'Contact for Price'}
                            </span>
                            {hasPrice && (
                                <span style={{ background: '#ffc107', color: '#1a1a2e', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                                    AUD
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '12px', color: '#555', fontWeight: 600 }}>
                                <i className="fas fa-cogs" style={{ color: '#888', marginRight: '4px' }}></i>
                                {product.transmission || 'Auto'}
                            </span>
                            <span style={{ fontSize: '12px', color: '#555', fontWeight: 600 }}>
                                <i className={`fas ${product.fuel === 'Hybrid' ? 'fa-leaf' : 'fa-gas-pump'}`} style={{ color: product.fuel === 'Hybrid' ? '#28a745' : '#888', marginRight: '4px' }}></i>
                                {product.fuel || 'Petrol'}
                            </span>
                            <span style={{ fontSize: '12px', color: '#555', fontWeight: 600 }}>
                                <i className="fas fa-tachometer-alt" style={{ color: '#888', marginRight: '4px' }}></i>
                                {product.mileage ? `${formatNumber(product.mileage)} km` : 'N/A'}
                            </span>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            <Link 
                                href={`/inner/listing-single/${carId}`}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '10px 24px',
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
        </div>
    );
}