'use client';
import React, { useEffect, useState } from 'react';
import ListingTop from './ListingTop';
import ListingsSliders from './ListingsSliders';
import ListingBottomLeft from './ListingBottomLeft';
import ListingBottomRight from './ListingBottomRight';

export default function CarListingSingleMain({ carId }: { carId: string }) {
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCarDetails() {
            try {
                const res = await fetch(`/api/stock?id=${carId}`);
                if (res.ok) {
                    const data = await res.json();
                    setCar(data);
                }
            } catch (error) {
                console.error('Error fetching car:', error);
            } finally {
                setLoading(false);
            }
        }
        if (carId) fetchCarDetails();
    }, [carId]);

    if (loading) return <div className="text-center py-5">Loading vehicle details...</div>;
    if (!car) return <div className="text-center py-5">Vehicle not found.</div>;

    return (
        <section style={{ padding: '20px 0 50px', background: '#f5f5f5' }}>
            <div className="container">
                {/* Desktop Title — full width above the row */}
                <div className="d-none d-lg-block">
                    <ListingTop car={car} />
                </div>

                <div className="row g-4">
                    {/* Left Column */}
                    <div className="col-lg-8">
                        {/* 1. Image Slider */}
                        <ListingsSliders car={car} />

                        {/* 2. Mobile Title — appears directly under the slider */}
                        <div className="d-lg-none mt-3">
                            <ListingTop car={car} />
                        </div>

                        {/* 3. Mobile Price & CTAs — appears after title */}
                        <div className="d-lg-none mt-4">
                            <ListingBottomRight car={car} />
                        </div>

                        {/* 4. Details — Overview, Highlights, Description, Features, etc. */}
                        <div className="mt-4">
                            <ListingBottomLeft car={car} />
                        </div>
                    </div>

                    {/* Right Column — Desktop Only, Sticky */}
                    <div className="col-lg-4 d-none d-lg-block">
                        <div style={{ position: 'sticky', top: '20px' }}>
                            <ListingBottomRight car={car} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}