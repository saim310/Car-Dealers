"use client"
import React from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules'; 
import { productsList } from '@/all-content/products/productData';
import TextAnimation from '@/components/elements/TextAnimation';
import Link from 'next/link';

interface ListingOneProps {
    filteredData?: any[];
}

const ListingOne: React.FC<ListingOneProps> = ({ filteredData }) => {
    const dataToDisplay = filteredData || productsList;

    const validCars = dataToDisplay.filter((item: any) => {
        return item.image && item.price && item.price !== "Contact for Price" && item.price !== "";
    });

    const formatPrice = (price: string | number) => {
        const num = typeof price === 'string' ? parseInt(price.replace(/,/g, '')) : price;
        if (isNaN(num)) return price;
        return num.toLocaleString('en-US');
    };

    const formatNumber = (num: string | number) => {
        const cleaned = String(num).replace(/[^0-9]/g, '');
        return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const getStatusBadge = (item: any) => {
        if (item.fuel === 'Hybrid') return { label: 'HYBRID', icon: 'fa-leaf' };
        if (item.price && parseInt(String(item.price).replace(/,/g, '')) < 16000) return { label: 'HOT DEAL', icon: 'fa-fire' };
        if (item.bodyType?.toLowerCase().includes('hatch')) return { label: 'FUEL SAVER', icon: 'fa-gas-pump' };
        return { label: 'POPULAR', icon: 'fa-star' };
    };

    return (
        <section className="listing-one" id='cars' style={{ padding: '50px 0 40px', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative dot pattern — top-left */}
            <div style={{ position: 'absolute', top: '30px', left: '30px', display: 'grid', gridTemplateColumns: 'repeat(5, 6px)', gap: '6px', opacity: 0.3 }}>
                {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} style={{ width: '6px', height: '6px', background: '#ffc107', borderRadius: '50%' }}></div>
                ))}
            </div>

            {/* Decorative diagonal lines — top-right */}
            <div style={{ position: 'absolute', top: '30px', right: '30px', opacity: 0.15 }}>
                <svg width="50" height="50" viewBox="0 0 60 60">
                    <line x1="0" y1="0" x2="60" y2="60" stroke="#ffc107" strokeWidth="2" />
                    <line x1="10" y1="0" x2="60" y2="50" stroke="#ffc107" strokeWidth="2" />
                    <line x1="20" y1="0" x2="60" y2="40" stroke="#ffc107" strokeWidth="2" />
                    <line x1="30" y1="0" x2="60" y2="30" stroke="#ffc107" strokeWidth="2" />
                </svg>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <div className="text-center" style={{ marginBottom: '28px' }}>
                    <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '6px', 
                        background: '#ffc107', 
                        color: '#1a1a2e', 
                        padding: '6px 14px', 
                        borderRadius: '20px', 
                        fontSize: '11px', 
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '12px'
                    }}>
                        <i className="fas fa-star" style={{ fontSize: '10px' }}></i>
                        BEST SELLERS
                    </div>
                    <h2 className="section-title__title" style={{ fontSize: '34px', fontWeight: '900', color: '#1a1a2e', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <TextAnimation text='Explore Our Most Popular Cars' />
                    </h2>
                    <p style={{ color: '#6c757d', fontSize: '15px', marginBottom: '12px', fontWeight: '500' }}>
                        High quality Japanese imports • Trusted by 1000+ Aussie customers • Warranty included
                    </p>
                    <div style={{ width: '50px', height: '3px', background: '#ffc107', margin: '0 auto' }}></div>
                </div>

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
                            pagination={false}
                            speed={1000}
                            modules={[Navigation, Autoplay]}
                            breakpoints={{ 
                                792: { slidesPerView: 2, spaceBetween: 20 },
                                1024: { slidesPerView: 3, spaceBetween: 20 },
                                1324: { slidesPerView: 4, spaceBetween: 20 },
                            }}
                        >
                            {validCars.map((item: any) => {
                                const status = getStatusBadge(item);

                                return (
                                    <SwiperSlide key={item.id}> 
                                        <div style={{ 
                                            background: '#fff', 
                                            borderRadius: '14px', 
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                                            border: '1px solid #f0f0f0',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}>
                                            {/* Image Area */}
                                            <div style={{ 
                                                height: '190px', 
                                                position: 'relative',
                                                background: '#f5f5f5'
                                            }}>
                                                <Link href={`/inner/listing-single/${item.id}`}>                                            
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.title} 
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                                    />
                                                </Link>

                                                {/* Status Badge — top-left */}
                                                <div style={{ 
                                                    position: 'absolute', 
                                                    top: '10px', 
                                                    left: '10px', 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    background: '#ffc107', 
                                                    color: '#1a1a2e', 
                                                    padding: '4px 8px', 
                                                    borderRadius: '4px', 
                                                    fontSize: '10px', 
                                                    fontWeight: '800',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.3px'
                                                }}>
                                                    <i className={`fas ${status.icon}`} style={{ fontSize: '9px' }}></i>
                                                    {status.label}
                                                </div>

                                                {/* Heart — top-right */}
                                                <button style={{ 
                                                    position: 'absolute', 
                                                    top: '10px', 
                                                    right: '10px', 
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '50%',
                                                    background: '#fff',
                                                    border: '1px solid #e0e0e0',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                                                }}>
                                                    <i className="far fa-heart" style={{ color: '#666', fontSize: '13px' }}></i>
                                                </button>
                                            </div>

                                            {/* Brand Badge */}
                                            <div style={{ padding: '0 16px', marginTop: '-10px', position: 'relative', zIndex: 2 }}>
                                                <span style={{ 
                                                    display: 'inline-block',
                                                    background: '#ffc107', 
                                                    color: '#1a1a2e', 
                                                    padding: '3px 10px', 
                                                    borderRadius: '4px', 
                                                    fontSize: '11px', 
                                                    fontWeight: '800',
                                                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                                                }}>
                                                    {item.brand || item.model || 'Toyota'}
                                                </span>
                                            </div>

                                            {/* Card Body */}
                                            <div style={{ padding: '10px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                {/* Title */}
                                                <h4 style={{ 
                                                    fontSize: '16px', 
                                                    fontWeight: '800', 
                                                    color: '#1a1a2e', 
                                                    marginBottom: '4px',
                                                    lineHeight: 1.3
                                                }}>
                                                    <Link href={`/inner/listing-single/${item?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                                        {item?.title}
                                                    </Link>
                                                </h4>

                                                {/* Yard / City */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                                                    <i className="fas fa-map-marker-alt" style={{ color: '#ffc107', fontSize: '12px' }}></i>
                                                    <span style={{ fontSize: '13px', color: '#666', fontWeight: '600' }}>
                                                        Yard: {item?.city || "N/A"}
                                                    </span>
                                                </div>

                                                {/* Price */}
                                                <div style={{ 
                                                    fontSize: '22px', 
                                                    fontWeight: '900', 
                                                    color: '#1a1a2e', 
                                                    marginBottom: '14px' 
                                                }}>
                                                    ${formatPrice(item?.price)}
                                                </div>

                                                {/* Specs Grid */}
                                                <div style={{ 
                                                    display: 'grid', 
                                                    gridTemplateColumns: '1fr 1fr', 
                                                    gap: '8px',
                                                    marginBottom: '14px',
                                                    paddingBottom: '14px',
                                                    borderBottom: '1px solid #f0f0f0'
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#555', fontWeight: '600' }}>
                                                        <i className="fas fa-tachometer-alt" style={{ color: '#888', fontSize: '12px', width: '14px' }}></i>
                                                        <span>{item?.mileage ? `${formatNumber(item.mileage)} km` : "N/A"}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#555', fontWeight: '600' }}>
                                                        <i className="fas fa-cogs" style={{ color: '#888', fontSize: '12px', width: '14px' }}></i>
                                                        <span>{item?.transmission || "Auto"}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#555', fontWeight: '600' }}>
                                                        <i className="fas fa-gas-pump" style={{ color: '#888', fontSize: '12px', width: '14px' }}></i>
                                                        <span>{item?.fuel || "Petrol"}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#555', fontWeight: '600' }}>
                                                        <i className="fas fa-car-side" style={{ color: '#888', fontSize: '12px', width: '14px' }}></i>
                                                        <span>{item?.bodyType || "Car"}</span>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                    <Link 
                                                        href={`/inner/listing-single/${item?.id}`} 
                                                        style={{ 
                                                            width: "100%", 
                                                            textAlign: "center", 
                                                            padding: "11px", 
                                                            background: "#ffc107", 
                                                            color: "#1a1a2e", 
                                                            fontWeight: "800", 
                                                            borderRadius: "8px", 
                                                            textDecoration: "none", 
                                                            display: "flex",
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '6px',
                                                            fontSize: '13px',
                                                            transition: "all 0.3s ease",
                                                            border: 'none'
                                                        }}
                                                        onMouseEnter={(e) => { 
                                                            e.currentTarget.style.color = "#ffffff"; 
                                                            e.currentTarget.style.background = "#1a1a2e"; 
                                                        }}
                                                        onMouseLeave={(e) => { 
                                                            e.currentTarget.style.color = "#1a1a2e"; 
                                                            e.currentTarget.style.background = "#ffc107"; 
                                                        }}
                                                    >
                                                        View Details <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}></i>
                                                    </Link>

                                                    <Link 
                                                        href={`/inner/listing-single/${item?.id}`} 
                                                        style={{ 
                                                            width: "100%", 
                                                            textAlign: "center", 
                                                            padding: "11px", 
                                                            background: "#fff", 
                                                            color: "#555", 
                                                            fontWeight: "700", 
                                                            borderRadius: "8px", 
                                                            textDecoration: "none", 
                                                            display: "flex",
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '6px',
                                                            fontSize: '13px',
                                                            transition: "all 0.3s ease",
                                                            border: '1px solid #e0e0e0'
                                                        }}
                                                        onMouseEnter={(e) => { 
                                                            e.currentTarget.style.color = "#1a1a2e"; 
                                                            e.currentTarget.style.borderColor = "#1a1a2e"; 
                                                        }}
                                                        onMouseLeave={(e) => { 
                                                            e.currentTarget.style.color = "#555"; 
                                                            e.currentTarget.style.borderColor = "#e0e0e0"; 
                                                        }}
                                                    >
                                                        <i className="far fa-file-alt" style={{ fontSize: '12px' }}></i> View More Info
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

                {/* View All Vehicles */}
                <div className="text-center" style={{ marginTop: '20px' }}>
                    <Link 
                        href="/inner/listing" 
                        style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '11px 28px',
                            background: '#fff',
                            color: '#ffc107',
                            fontWeight: '800',
                            fontSize: '13px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            border: '2px solid #ffc107',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#ffc107';
                            e.currentTarget.style.color = '#1a1a2e';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fff';
                            e.currentTarget.style.color = '#ffc107';
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