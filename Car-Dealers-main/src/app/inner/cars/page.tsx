"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const CarsContent = () => {
    const searchParams = useSearchParams();
    const isSale = searchParams.get('sale');
    
   const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/stock')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCars(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load stock data', err);
                setLoading(false);
            });
    }, []);

    const displayedCars = isSale
        ? cars.filter((car: any) => car.sale || car.isSale || car.discount)
        : cars;

    if (loading) {
        return <div className="text-center py-5">Loading dynamic stock...</div>;
    }

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <h2 className="mb-4">{isSale ? "On Sale Cars" : "All Cars Listing"}</h2>
            <div className="row">
                {displayedCars.map((item: any) => (
                    <div className="col-md-4 mb-4" key={item.id}>
                        <div className="card shadow-sm border-0 rounded overflow-hidden">
                            {/* Card content / image / title rendering */}
                            <img src={item.image} alt={item.title} className="card-img-top" style={{ height: '220px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="text-muted mb-1">Price: ${item.price}</p>
                                <p className="text-muted">Mileage: {item.mileage}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function CarsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CarsContent />
        </Suspense>
    );
}
