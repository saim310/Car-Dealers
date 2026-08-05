import Banner from '@/sections/common/Banner';
import ProductCarousel from '@/sections/product-details/ProductCarousel';
import ProductDescription from '@/sections/product-details/ProductDescription';
import ProductDetailsMain from '@/sections/product-details/ProductDetailsMain';
import { productsList } from "@/all-content/products/productData";
// URL ya query se product find karke real title, price aur image render karein
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='Product Details' />
            <ProductDetailsMain />
            <ProductDescription />
            <ProductCarousel />
        </>
    );
};

export default page;
