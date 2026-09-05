"use client"
import React, { useState, useEffect } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules'; 

import 'swiper/css';
import 'swiper/css/navigation';

import { productsList } from '@/all-content/products/productData';
import TextAnimation from '@/components/elements/TextAnimation';
import Link from 'next/link';

interface ListingOneProps {
    filteredData?: any[];
}

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

const ListingOne: React.FC<ListingOneProps> = ({ filteredData }) => {
    const dataToDisplay = filteredData || productsList;

    const validCars = dataToDisplay.filter((item: any) => {
        return item?.image && item?.price && item?.price !== "Contact for Price" && item?.price !== "";
    });

    const [cityOverride, setCityOverride] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setCityOverride(params.get('city'));
        }
    }, []);

    const getYardLocation = (product: any) => {
        if (cityOverride === 'Melbourne') return 'Melbourne';
        if (cityOverride === 'Brisbane') return 'Brisbane';
        
        const yardStr = String(product.yard || product.Yard || '');
        if (yardStr === '1') return 'Maidstone';
        if (yardStr === '2') return 'Mordialloc';
        if (yardStr === '4') return 'Slacks Creek';
        
        return product.city || 'N/A';
    };

    return (
        <section className="listing-one" id="cars" style={{ padding: '50px 0 40px', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                
                {/* Header Section */}
                <div className="text-center" style={{ marginBottom: '28px' }}>
                    
                    {/* Glowing Red HOT DEALS Badge */}
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        background: '#dc3545', 
                        color: '#ffffff', 
                        padding: '6px 16px', 
                        borderRadius: '20px', 
                        fontSize: '11px', 
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.8px',
                        marginBottom: '12px',
                        boxShadow: '0 0 12px rgba(220, 53, 69, 0.6), 0 0 24px rgba(220, 53, 69, 0.3)'
                    }}>
                        <i className="fas fa-fire" style={{ fontSize: '11px' }}></i>
                        HOT DEALS
                    </div>

                    {/* Main Title Updated for Hot Deals */}
                    <h2 className="section-title__title" style={{ fontSize: '34px', fontWeight: '900', color: '#1a1a2e', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <TextAnimation text="Explore Our Hottest Deals" />
                    </h2>

                    {/* Subtitle Updated for Hot Deals */}
                    <p style={{ color: '#6c757d', fontSize: '15px', marginBottom: '12px', fontWeight: '500' }}>
                        Unbeatable prices on Japanese imports • Limited time special offers • Warranty included
                    </p>

                    <div style={{ width: '50px', height: '3px', background: '#dc3545', margin: '0 auto', borderRadius: '2px' }}></div>
                </div>

                {/* Swiper Slider Wrapper */}
                <div className="listing-one__carousel" style={{ marginBottom: '10px' }}>
                    {validCars.length === 0 ? (
                        <div className="text-center py-4">
                            <h4>No cars found matching your criteria.</h4>
                        </div>
                    ) : (
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={20}
                            loop={true}
                            autoplay={{ delay: 4000, disableOnInteraction: false }}
                            speed={1000}
                            modules={[Navigation, Autoplay]}
                            breakpoints={{ 
                                576: { slidesPerView: 2, spaceBetween: 16 },
                                992: { slidesPerView: 3, spaceBetween: 20 },
                                1200: { slidesPerView: 4, spaceBetween: 20 },
                            }}
                        >
                            {validCars.map((product: any) => {
                                const carId = product.id || product.stockNumber || product.vin || '1';
                                const badge = getStatusBadge(product);

                                const originalPrice = product.previousPrice || product.price || product.Price || 0;
                                const salePrice = product.salePrice;
                                const hasSale = Boolean(salePrice && Number(salePrice) < Number(originalPrice));
                                
                                const displayPriceVal = hasSale ? salePrice : originalPrice;
                                const formattedPrice = formatPrice(displayPriceVal);
                                const formattedOriginalPrice = formatPrice(originalPrice);
                                const hasPrice = formattedPrice !== 'Contact for Price';

                                return (
                                    <SwiperSlide key={carId}>
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
                                            {/* Image */}
                                            <div style={{ position: 'relative', height: '200px', background: '#f5f5f5' }}>
                                                <Link href={`/inner/listing-single/${carId}`}>
                                                    <img
                                                        src={product.image || "/assets/images/shop/shop-product-1-1.jpg"}
                                                        alt={product.title || "Car"}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                                    />
                                                </Link>

                                                {/* Status Badge */}
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
                                                    borderRadius: '6px',
                                                    fontSize: '9.5px',
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.4px',
                                                    zIndex: 2
                                                }}>
                                                    <i className={`fas ${badge.icon}`} style={{ fontSize: '9px' }}></i>
                                                    {badge.label}
                                                </div>

                                                {/* Hot Sale Badge */}
                                                {hasSale && (
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '10px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        background: '#dc3545',
                                                        color: '#fff',
                                                        padding: '4px 8px',
                                                        borderRadius: '6px',
                                                        fontSize: '9.5px',
                                                        fontWeight: 800,
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.4px',
                                                        zIndex: 2,
                                                        boxShadow: '0 2px 8px rgba(220, 53, 69, 0.35)'
                                                    }}>
                                                        <i className="fas fa-fire" style={{ fontSize: '9px' }}></i>
                                                        HOT SALE
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Body */}
                                            <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px', lineHeight: 1.3 }}>
                                                    <Link href={`/inner/listing-single/${carId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                        {product.title || ((product.brand || '') + " " + (product.model || ''))}
                                                    </Link>
                                                </h4>

                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginBottom: '10px',
                                                    flexWrap: 'wrap',
                                                    gap: '4px'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                        <i className="fas fa-map-marker-alt" style={{ color: '#dc3545', fontSize: '12px' }}></i>
                                                        <span style={{ fontSize: '12px', color: '#555', fontWeight: 600 }}>
                                                            Yard {product.yard || product.Yard || 'N/A'}: {getYardLocation(product)}
                                                        </span>
                                                    </div>

                                                    <span style={{
                                                        background: '#f1f5f9',
                                                        color: '#475569',
                                                        fontSize: '10px',
                                                        fontWeight: 700,
                                                        padding: '2px 6px',
                                                        borderRadius: '4px',
                                                        border: '1px solid #e2e8f0'
                                                    }}>
                                                        #{product.stockNumber || product.id}
                                                    </span>
                                                </div>

                                                {/* Price */}
                                                <div style={{ marginBottom: '10px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                                        {hasSale && formattedOriginalPrice !== 'Contact for Price' && (
                                                            <span style={{
                                                                fontSize: '13px',
                                                                fontWeight: 700,
                                                                color: '#888',
                                                                textDecoration: 'line-through'
                                                            }}>
                                                                {formattedOriginalPrice}
                                                            </span>
                                                        )}

                                                        <span style={{ fontSize: '20px', fontWeight: 900, color: '#1a1a2e' }}>
                                                            {formattedPrice}
                                                        </span>

                                                        {hasPrice && (
                                                            <span style={{
                                                                background: '#ffc107',
                                                                color: '#1a1a2e',
                                                                fontSize: '9.5px',
                                                                fontWeight: 800,
                                                                padding: '2px 6px',
                                                                borderRadius: '4px'
                                                            }}>
                                                                AUD
                                                            </span>
                                                        )}
                                                    </div>

                                                    {hasPrice && (
                                                        <span style={{ display: 'block', fontSize: '10px', color: '#777', fontWeight: 500, marginTop: '1px' }}>
                                                            Excl. Govt. Charges
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Specifications */}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    marginBottom: '12px',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#555', fontWeight: 600 }}>
                                                        <i className="fas fa-cogs" style={{ color: '#888', fontSize: '11px' }}></i>
                                                        <span>{product.transmission || 'Auto'}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#555', fontWeight: 600 }}>
                                                        <i className={`fas ${product.fuel === 'Hybrid' ? 'fa-leaf' : 'fa-gas-pump'}`} style={{ color: product.fuel === 'Hybrid' ? '#28a745' : '#888', fontSize: '11px' }}></i>
                                                        <span>{product.fuel || 'Petrol'}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#555', fontWeight: 600 }}>
                                                        <i className="fas fa-tachometer-alt" style={{ color: '#888', fontSize: '11px' }}></i>
                                                        <span>{product.mileage ? `${formatNumber(product.mileage)} km` : 'N/A'}</span>
                                                    </div>
                                                </div>

                                                {/* Button */}
                                                <div style={{ marginTop: 'auto' }}>
                                                    <Link
                                                        href={`/inner/listing-single/${carId}`}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '6px',
                                                            width: '100%',
                                                            padding: '10px',
                                                            background: '#ffc107',
                                                            color: '#1a1a2e',
                                                            fontWeight: 800,
                                                            fontSize: '12.5px',
                                                            borderRadius: '8px',
                                                            textDecoration: 'none',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        View Details <i className="fas fa-arrow-right" style={{ fontSize: '10px' }}></i>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    )}
                </div>

                {/* Bottom CTA Button */}
                <div className="text-center" style={{ marginTop: '20px' }}>
                    <Link 
                        href="/inner/hot-deals" 
                        style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 24px',
                            background: '#fff',
                            color: '#ffc107',
                            fontWeight: '800',
                            fontSize: '13px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            border: '2px solid #ffc107'
                        }}
                    >
                        View All Vehicles <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}></i>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ListingOne;