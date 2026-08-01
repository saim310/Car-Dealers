import Banner from '@/sections/common/Banner';
import ContactMain from '@/sections/contact/ContactMain';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Contact' />
            <ContactMain />
        </>
    );
};

export default page;