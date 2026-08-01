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
                <ListingTop car={car} />
                
                <div className="row g-4">
                    <div className="col-lg-8">
                        <ListingsSliders car={car} />
                        <div className="mt-4">
                            <ListingBottomLeft car={car} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div style={{ position: 'sticky', top: '20px' }}>
                            <ListingBottomRight car={car} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}