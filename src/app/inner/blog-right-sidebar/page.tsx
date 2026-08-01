import BlogRightSidebarMain from '@/sections/blog/BlogRightSidebarMain';
import Banner from '@/sections/common/Banner';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Blog Right Sidebar' />
            <BlogRightSidebarMain />
        </>
    );
};

export default page;