import BlogLeftSidebarMain from '@/sections/blog/BlogLeftSidebarMain';
import Banner from '@/sections/common/Banner';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Blog Left Sidebar' />
            <BlogLeftSidebarMain />
        </>
    );
};

export default page;