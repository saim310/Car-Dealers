
import Banner from '@/sections/common/Banner';
import CarListingsSingleMain from '@/sections/car-list-single/CarListingSingleMain';
import React from 'react';

interface PageProps {
    params: Promise<{ id: string }>;
}

const ListingsSinglePage = async ({ params }: PageProps) => {
    const { id } = await params;

    return (
        <>
         
            <CarListingsSingleMain carId={id} />
        </>
    );
};

export default ListingsSinglePage;
