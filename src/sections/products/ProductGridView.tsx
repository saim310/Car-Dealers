"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const formatNumber = (num: string | number) => {
    const cleaned = String(num).replace(/[^0-9]/g, '');
    return cleaned ? cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
};

const formatPrice = (price: number | string) => {
    if (!price || price === 'Contact for Price') return 'Contact for Price';
   
    const rawNum = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    if (isNaN(rawNum) || rawNum <= 0) return 'Contact for Price';

    const actualPrice = rawNum > 1000000 ? rawNum / 100 : rawNum;
    return '$' + Math.round(actualPrice).toLocaleString('en-US');
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

    return { label: 'IN STOCK', bg: '#28a745', color: '#fff', icon: 'fa-check-circle' };
};

export default function ProductGridView({ product }: { product: any }) {
    const carId = product.id || product.stockNumber || product.vin || '1';
    const badge = getStatusBadge(product);

    // Sale & Price logic
    const originalPrice = product.previousPrice || product.price || product.Price || 0;
    const salePrice = product.salePrice;
    const hasSale = Boolean(salePrice && Number(salePrice) < Number(originalPrice));
    
    const displayPriceVal = hasSale ? salePrice : originalPrice;
    const formattedPrice = formatPrice(displayPriceVal);
    const formattedOriginalPrice = formatPrice(originalPrice);
    const hasPrice = formattedPrice !== 'Contact for Price';

    const [cityOverride, setCityOverride] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setCityOverride(params.get('city'));
        }
    }, []);

    const getYardLocation = () => {
        if (cityOverride === 'Melbourne') return 'Melbourne';
        if (cityOverride === 'Brisbane') return 'Brisbane';
       
        const yardStr = String(product.yard || product.Yard || '');
        if (yardStr === '1') return 'Maidstone';
        if (yardStr === '2') return 'Mordialloc';
        if (yardStr === '4') return 'Slacks Creek';
       
        return product.city || 'N/A';
    };

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
                {/* Image Container */}
                <div style={{ position: 'relative', height: '210px', background: '#f5f5f5' }}>
                    <Link href={`/inner/listing-single/${carId}`}>
                        <img
                            src={product.image || "/assets/images/shop/shop-product-1-1.jpg"}
                            alt={product.title || "Car"}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </Link>

                    {/* Left Availability Badge (e.g. IN STOCK) */}
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
                        letterSpacing: '0.4px',
                        zIndex: 2
                    }}>
                        <i className={`fas ${badge.icon}`} style={{ fontSize: '10px' }}></i>
                        {badge.label}
                    </div>

                    {/* Right HOT SALE Badge */}
                    {hasSale && (
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: '#dc3545',
                            color: '#fff',
                            padding: '5px 10px',
                            borderRadius: '6px',
                            fontSize: '10px',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.4px',
                            zIndex: 2,
                            boxShadow: '0 2px 8px rgba(220, 53, 69, 0.35)'
                        }}>
                            <i className="fas fa-fire" style={{ fontSize: '10px' }}></i>
                            HOT SALE
                        </div>
                    )}
                </div>

                {/* Card Body */}
                <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                   
                    {/* Title */}
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px', lineHeight: 1.3 }}>
                        <Link href={`/inner/listing-single/${carId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {product.title || ((product.brand || '') + " " + (product.model || ''))}
                        </Link>
                    </h4>

                    {/* Location & Stock Pill Row */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                        flexWrap: 'wrap',
                        gap: '6px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <i className="fas fa-map-marker-alt" style={{ color: '#dc3545', fontSize: '13px' }}></i>
                            <span style={{ fontSize: '13px', color: '#555', fontWeight: 600 }}>
                                Yard {product.yard || product.Yard || 'N/A'}: {getYardLocation()}
                            </span>
                        </div>

                        {/* Styled Stock Number Pill */}
                        <span style={{
                            background: '#f1f5f9',
                            color: '#475569',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: '1px solid #e2e8f0',
                            letterSpacing: '0.2px'
                        }}>
                            #{product.stockNumber || product.id}
                        </span>
                    </div>

                    {/* Price Section */}
                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            
                            {/* Struck-through original price if on sale */}
                            {hasSale && formattedOriginalPrice !== 'Contact for Price' && (
                                <span style={{
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    color: '#888',
                                    textDecoration: 'line-through'
                                }}>
                                    {formattedOriginalPrice}
                                </span>
                            )}

                            {/* Discounted / Main Price */}
                            <span style={{ fontSize: '22px', fontWeight: 900, color: '#1a1a2e' }}>
                                {formattedPrice}
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

                        {/* Small Excl. Govt. Charges line */}
                        {hasPrice && (
                            <span style={{
                                display: 'block',
                                fontSize: '10.5px',
                                color: '#777',
                                fontWeight: 500,
                                marginTop: '2px'
                            }}>
                                Excl. Govt. Charges
                            </span>
                        )}
                    </div>

                    {/* Key Specs */}
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

                    {/* CTA Button */}
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