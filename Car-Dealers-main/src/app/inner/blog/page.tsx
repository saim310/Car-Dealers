import BlogMain from '@/sections/blog/BlogMain';
import Banner from '@/sections/common/Banner';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Blog' />
            <BlogMain />
        </>
    );
};

export default page;