import CarListVTwoMain from '@/sections/cars/CarListVTwoMain';
import Banner from '@/sections/common/Banner';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Car List V-2' />
            <CarListVTwoMain />
        </>
    );
};

export default page;