"use client";
import React from 'react';
import Link from 'next/link';
import { productsList } from '@/all-content/products/productData';

const formatNumber = (num: string | number) => {
    const cleaned = String(num).replace(/[^0-9]/g, '');
    return cleaned ? cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
};

const getRating = (id: string | number) => {
    const hash = String(id).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return (4.5 + (hash % 5) / 10).toFixed(1);
};

const getReviews = (id: string | number) => {
    const hash = String(id).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return 50 + (hash % 150);
};

export default function ListingBottomLeft({ car }: { car?: any }) {
    const featuresList = car?.StandardFeatures
        ? car.StandardFeatures.split(',').map((f: string) => f.trim()).filter(Boolean)
        : ['Power Steering', 'Air Conditioning', 'ABS Brakes', 'Bluetooth', 'Reverse Camera', 'Keyless Entry', 'Alloy Wheels', 'Navigation', 'Cruise Control', 'Power Windows', 'Central Locking', 'Immobilizer'];

    // Categorize features into 4 columns
    const categories = ['COMFORT', 'SAFETY', 'TECHNOLOGY', 'EXTERIOR'];
    const perCol = Math.ceil(featuresList.length / 4);
    const featureCols = Array.from({ length: 4 }, (_, i) => featuresList.slice(i * perCol, (i + 1) * perCol));

    const similarCars = productsList
        .filter((p: any) => String(p.id) !== String(car?.id || car?.StockNumber))
        .slice(0, 4);

    const overviewItems = [
        { icon: 'fa-calendar-alt', label: 'Year', value: car?.Year || car?.year || 'N/A' },
        { icon: 'fa-cogs', label: 'Transmission', value: car?.GearType || car?.transmission || 'Auto' },
        { icon: 'fa-tachometer-alt', label: 'Mileage', value: car?.Odometer ? `${formatNumber(car.Odometer)} km` : 'N/A' },
        { icon: 'fa-car-side', label: 'Body Type', value: car?.Body || car?.bodyType || 'Van' },
        { icon: 'fa-gas-pump', label: 'Fuel Type', value: car?.FuelType || car?.fuel || 'Hybrid' },
        { icon: 'fa-engine', label: 'Engine Size', value: car?.EngineSize || '2,500 cc' },
        { icon: 'fa-road', label: 'Drive Type', value: car?.Drive || '2WD' },
        { icon: 'fa-door-open', label: 'Doors', value: `${car?.DoorNum || car?.doors || '5'} Doors` },
        { icon: 'fa-paint-brush', label: 'Exterior Color', value: car?.Color || car?.color || 'Pearl White' },
        { icon: 'fa-hashtag', label: 'Stock Number', value: car?.StockNumber || car?.id || 'N/A' },
    ];

    return (
        <div>
            {/* Vehicle Overview - Exact match to reference image */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', marginBottom: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Vehicle Overview
                </h3>
                <div className="row" style={{ rowGap: '20px' }}>
                    {overviewItems.map((item, i) => (
                        <div className="col-6" key={i}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <i className={`fas ${item.icon}`} style={{ color: '#888', fontSize: '15px', width: '16px', textAlign: 'center', flexShrink: 0 }}></i>
                                <div>
                                    <div style={{ fontSize: '11px', color: '#999', marginBottom: '2px', fontWeight: 500, letterSpacing: '0.3px' }}>{item.label}</div>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e', lineHeight: 1.3 }}>{item.value}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Vehicle Highlights - Exact match to reference image */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', marginBottom: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1a1a2e', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Vehicle Highlights
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                    {[
                        { icon: 'fa-gavel', label: 'Auction Grade', value: '3.5 & Above' },
                        { icon: 'fa-check-circle', label: 'Odometer', value: 'Certified' },
                        { icon: 'fa-user', label: 'One Owner', value: 'From Japan' },
                    ].map((h, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            background: '#f8f9fa',
                            borderRadius: '10px',
                            border: '1px solid #f0f0f0',
                            flex: '1 1 160px'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                                flexShrink: 0
                            }}>
                                <i className={`fas ${h.icon}`} style={{ color: '#ffc107', fontSize: '15px' }}></i>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#999', marginBottom: '1px' }}>{h.label}</div>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a2e' }}>{h.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', marginBottom: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1a1a2e', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Description
                </h3>
                <div style={{ color: '#555', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}
                    dangerouslySetInnerHTML={{
                        __html: car?.AdvDescription || car?.ShortDescription || 'This 2022 Toyota Alphard X is a premium 7-seater luxury MPV that combines comfort, space and advanced technology. Imported directly from Japan with verified auction sheet and compliance certificate for your peace of mind.'
                    }}
                />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                        'High quality Japanese import in a reliable, fuel-efficient condition',
                        'Imported directly from Japan with verified auction sheet',
                        'Smooth automatic transmission',
                        'Spacious 8 passenger interior',
                        'Ideal for family or business use'
                    ].map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px', fontSize: '14px', color: '#555' }}>
                            <i className="fas fa-check" style={{ color: '#ffc107', marginTop: '5px', fontSize: '12px', flexShrink: 0 }}></i>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Features - Exact match to reference image */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', marginBottom: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1a1a2e', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Features
                </h3>
                <div className="row g-4">
                    {featureCols.map((col, ci) => (
                        <div className="col-6 col-md-3" key={ci}>
                            <h6 style={{ fontSize: '12px', fontWeight: 800, color: '#1a1a2e', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {categories[ci]}
                            </h6>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {col.map((feat: any, fi: any) => (
                                    <li key={fi} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '13px', color: '#555' }}>
                                        <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '12px', flexShrink: 0 }}></i>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* You May Also Like - Full width proper grid */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '28px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1a1a2e', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        You May Also Like
                    </h3>
                    <Link href="/inner/listing" style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', textDecoration: 'none' }}>
                        View All Cars →
                    </Link>
                </div>
                <div className="row g-3">
                    {similarCars.map((item: any) => {
                        const price = item.price || item.Price || 0;
                        const hasPrice = price > 0;
                        const rating = getRating(item.id);
                        const reviews = getReviews(item.id);
                        return (
                            <div className="col-12 col-sm-6 col-lg-3" key={item.id}>
                                <Link href={`/inner/listing-single/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0', background: '#fff' }}>
                                        <div style={{ height: '140px', overflow: 'hidden', background: '#f5f5f5', position: 'relative' }}>
                                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                            <button style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                background: '#fff',
                                                border: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                                            }}>
                                                <i className="far fa-heart" style={{ color: '#666', fontSize: '11px' }}></i>
                                            </button>
                                        </div>
                                        <div style={{ padding: '12px' }}>
                                            <h6 style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a2e', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.title}
                                            </h6>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                                                {[1,2,3,4,5].map(i => (
                                                    <i key={i} className={`${i <= Math.floor(parseFloat(rating)) ? 'fas' : 'far'} fa-star`} style={{ color: '#ffc107', fontSize: '9px' }}></i>
                                                ))}
                                                <span style={{ fontSize: '11px', color: '#999' }}>({reviews})</span>
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>
                                                {hasPrice ? `$${formatNumber(price)}` : 'Contact for Price'}
                                                {hasPrice && <span style={{ fontSize: '10px', color: '#999', marginLeft: '3px' }}>AUD</span>}
                                            </div>
                                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                                {[item.year, item.transmission || 'Auto', item.fuel || 'Petrol'].filter(Boolean).map((tag, ti) => (
                                                    <span key={ti} style={{
                                                        fontSize: '10px',
                                                        fontWeight: 600,
                                                        color: '#666',
                                                        background: '#f5f5f5',
                                                        padding: '3px 10px',
                                                        borderRadius: '20px'
                                                    }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
