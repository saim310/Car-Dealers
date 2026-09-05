"use client";
import React from 'react';
import Link from 'next/link';

export interface CarProduct {
    id: string | number;
    title?: string;
    name?: string;
    yard?: string;
    location?: string;
    city?: string;
    price?: number | string;
    originalPrice?: number | string;
    salePrice?: number | string;
    status?: string;
    stockStatus?: string;
    tag?: string;
    badge?: string;
    isSale?: boolean;
    isHotDeal?: boolean;
    image?: string;
    images?: string[];
    mileage?: string | number;
    transmission?: string;
    fuelType?: string;
    fuel?: string;
    bodyType?: string;
    bodyStyle?: string;
    slug?: string;
}

interface HotDealsSectionProps {
    allProducts?: CarProduct[];
    limit?: number;
}

// Fallback data if no matched items are provided
const fallbackDeals: CarProduct[] = [
    {
        id: "1",
        title: "Nissan Note E-Power 2022",
        yard: "Melbourne",
        originalPrice: 20995,
        salePrice: 18995,
        badge: "SAVE $2,000",
        image: "https://placehold.co/600x400/1e293b/ffffff?text=Nissan+Note",
        mileage: "57,112 km",
        transmission: "Auto",
        fuelType: "Hybrid",
        bodyType: "Hatchback",
        slug: "nissan-note-e-power-2022"
    },
    {
        id: "2",
        title: "Honda Grace 2017",
        yard: "Melbourne",
        originalPrice: 17500,
        salePrice: 15995,
        badge: "SAVE $1,505",
        image: "https://placehold.co/600x400/1e293b/ffffff?text=Honda+Grace+2017",
        mileage: "42,187 km",
        transmission: "Auto",
        fuelType: "Hybrid",
        bodyType: "Sedan",
        slug: "honda-grace-2017"
    },
    {
        id: "3",
        title: "Honda Grace 2015",
        yard: "Melbourne",
        originalPrice: 15995,
        salePrice: 14495,
        badge: "SAVE $1,500",
        image: "https://placehold.co/600x400/1e293b/ffffff?text=Honda+Grace+2015",
        mileage: "98,642 km",
        transmission: "Auto",
        fuelType: "Hybrid",
        bodyType: "Sedan",
        slug: "honda-grace-2015"
    },
    {
        id: "4",
        title: "Toyota Corolla Fielder 2021",
        yard: "Melbourne",
        originalPrice: 20495,
        salePrice: 18995,
        badge: "SAVE $1,500",
        image: "https://placehold.co/600x400/1e293b/ffffff?text=Corolla+Fielder",
        mileage: "112,238 km",
        transmission: "Auto",
        fuelType: "Hybrid",
        bodyType: "Wagon",
        slug: "toyota-corolla-fielder-2021"
    }
];

const formatPrice = (val?: number | string) => {
    if (!val) return '';
    if (typeof val === 'number') return `$${val.toLocaleString()}`;
    if (val.startsWith('$')) return val;
    const num = parseFloat(val.replace(/[^0-9.-]+/g, ''));
    return isNaN(num) ? val : `$${num.toLocaleString()}`;
};

const HotDealsSection: React.FC<HotDealsSectionProps> = ({ allProducts = [], limit = 4 }) => {

    // Filter deals based on hot/sale badges, discount prices, or hot deal flags
    const filteredHotDeals = allProducts.filter((car: any) => {
        const statusVal = String(car.status || car.stockStatus || '').toLowerCase();
        const tagVal = String(car.tag || '').toLowerCase();
        const badgeVal = String(car.badge || car.badgeTitle || '').toLowerCase();
        const isHot = car.isSale === true || car.isHotDeal === true || car.hotDeal === true;
        const hasDiscount = Boolean(car.originalPrice && (car.salePrice || car.price));

        return (
            statusVal.includes("sale") ||
            statusVal.includes("hot") ||
            tagVal.includes("sale") ||
            badgeVal.includes("sale") ||
            badgeVal.includes("hot") ||
            isHot ||
            hasDiscount
        );
    });

    const dealsToDisplay = (filteredHotDeals.length > 0 ? filteredHotDeals : fallbackDeals).slice(0, limit);

    return (
        <section className="hot-deals-section py-5" style={{ background: '#f8f9fa' }}>
            <div className="container">
                {/* SECTION HEADER */}
                <div className="text-center mb-5">
                    <div className="d-inline-block px-3 py-1 bg-warning text-dark fw-bold text-uppercase fs-7 rounded-pill mb-2 shadow-sm">
                        🔥 LIMITED TIME OFFERS
                    </div>
                    <h2 className="section-title fw-bold text-uppercase text-dark mb-2">
                        EXPLORE OUR HOT DEALS
                    </h2>
                    <p className="text-muted small mb-0">
                        High quality Japanese Imports — Discounted prices for a limited time
                    </p>
                </div>

                {/* CARS GRID */}
                <div className="row g-4">
                    {dealsToDisplay.map((car: any) => {
                        const carTitle = car.title || car.name || "Japanese Vehicle";
                        const carImg = car.image || car.images?.[0] || car.img || "https://placehold.co/600x400/1e293b/ffffff?text=UKA+Motors";
                        const displayPrice = car.salePrice || car.price;
                        const originalPrice = car.originalPrice;
                        const badgeText = car.badge || car.badgeTitle || "ON SALE";
                        const yardLocation = car.yard || car.location || car.city || 'Melbourne';

                        return (
                            <div key={car.id} className="col-12 col-sm-6 col-lg-3">
                                <div className="car-card h-100 shadow-sm rounded-3 overflow-hidden border bg-white d-flex flex-column position-relative transition-all">
                                    
                                    {/* Image Container */}
                                    <div className="position-relative w-100 bg-light" style={{ height: "190px" }}>
                                        <img 
                                            src={carImg} 
                                            alt={carTitle} 
                                            className="w-100 h-100" 
                                            style={{ objectFit: 'cover' }}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://placehold.co/600x400/1e293b/ffffff?text=UKA+Motors";
                                            }}
                                        />
                                        <span className="position-absolute top-0 start-0 m-2 px-2 py-1 bg-danger text-white fw-bold rounded fs-8 text-uppercase shadow-sm z-2">
                                            🔥 {badgeText}
                                        </span>
                                    </div>

                                    {/* Content Details */}
                                    <div className="p-3 d-flex flex-column flex-grow-1">
                                        <span className="badge bg-light text-dark align-self-start mb-2 border text-uppercase">
                                            {carTitle.split(' ')[0]}
                                        </span>
                                        <h5 className="fw-bold fs-6 mb-1 text-truncate text-dark" title={carTitle}>
                                            {carTitle}
                                        </h5>
                                        <p className="text-muted small mb-2">📍 Yard: {yardLocation}</p>

                                        {/* Pricing */}
                                        <div className="d-flex align-items-baseline gap-2 mb-3">
                                            <span className="fw-bold text-danger fs-5">
                                                {formatPrice(displayPrice)}
                                            </span>
                                            {originalPrice && (
                                                <span className="text-muted text-decoration-line-through small">
                                                    {formatPrice(originalPrice)}
                                                </span>
                                            )}
                                        </div>

                                        {/* Specs Grid */}
                                        <div className="mt-auto border-top pt-2 text-muted small">
                                            <div className="d-flex justify-content-between mb-1">
                                                <span>KM: {car.mileage || 'N/A'}</span>
                                                <span>⚙️ {car.transmission || 'Auto'}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>⚡ {car.fuelType || car.fuel || 'Hybrid'}</span>
                                                <span>🚗 {car.bodyType || car.bodyStyle || 'Car'}</span>
                                            </div>
                                        </div>

                                        {/* CTA Button */}
                                        <div className="mt-3">
                                            <Link 
                                                href={`/inner/products/${car.slug || car.id}`} 
                                                className="btn btn-warning w-100 fw-bold py-2 shadow-sm text-dark"
                                            >
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* BOTTOM CTA */}
                <div className="text-center mt-5">
                    <Link 
                        href="/inner/products?stockStatus=Sale" 
                        className="btn btn-outline-dark fw-bold px-4 py-2 rounded-pill shadow-sm"
                    >
                        View All Hot Deals →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HotDealsSection;