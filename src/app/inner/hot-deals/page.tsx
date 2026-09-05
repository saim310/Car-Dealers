import React, { Suspense } from 'react';
import AllProducts from '@/sections/products/AllProducts';

export default function Page() {
    return (
        <Suspense fallback={<div className="text-center py-5">Loading products...</div>}>
            <AllProducts badgeFilter="Hot Deal" />
        </Suspense>
    );
}