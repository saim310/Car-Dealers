import CheckoutMain from '@/sections/checkout/CheckoutMain';
import Banner from '@/sections/common/Banner';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Checkout' />
            <CheckoutMain />
        </>
    );
};

export default page;