import React from 'react';
import Banner from '@/sections/common/Banner';
import FaqMain from '@/sections/faqs/FaqMain';

const page: React.FC = () => {

    return (
        <>
            <Banner breadcrumb='Faq' />
            <FaqMain />
        </>
    );
};

export default page;