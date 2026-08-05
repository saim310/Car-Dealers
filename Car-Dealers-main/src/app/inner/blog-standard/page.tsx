import BlogStandardMain from '@/sections/blog/BlogStandardMain';
import Banner from '@/sections/common/Banner';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Blog Standard' />
            <BlogStandardMain />
        </>
    );
};

export default page;