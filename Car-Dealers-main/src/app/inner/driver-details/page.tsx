import Banner from '@/sections/common/Banner';
import DriverDetailsMain from '@/sections/driver/DriverDetailsMain';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Driver Details' />
            <DriverDetailsMain />
        </>
    );
};

export default page;