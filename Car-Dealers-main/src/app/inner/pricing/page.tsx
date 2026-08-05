import Banner from '@/sections/common/Banner';
import PricingMain from '@/sections/pricing/PricingMain';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Pricing' />
            <PricingMain />
        </>
    );
};

export default page;