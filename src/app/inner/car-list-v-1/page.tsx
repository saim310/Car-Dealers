import CarListVOneMain from '@/sections/cars/CarListVOneMain';
import Banner from '@/sections/common/Banner';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Car List V-1' />
            <CarListVOneMain />
        </>
    );
};

export default page;