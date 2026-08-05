import Banner from '@/sections/common/Banner';
import WishlistMain from '@/sections/wishlist/WishlistMain';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Wishlist' />
            <WishlistMain />
        </>
    );
};

export default page;