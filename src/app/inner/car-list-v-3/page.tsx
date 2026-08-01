import CarListVThreeMain from '@/sections/cars/CarListVThreeMain';
import Banner from '@/sections/common/Banner';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Car List V-3' />
            <CarListVThreeMain />
        </>
    );
};

export default page;