"use client";

import React, { useState } from 'react';
import Footer from '../sections/common/Footer';
import Gallery from '../sections/common/Gallery';
import Header from '../sections/common/Header';
import OurBlog from '../sections/common/OurBlog';
import StrickyHeader from '../sections/common/StrickyHeader';
import AboutOne from '../sections/home-one/AboutOne';
import BannerOne from '../sections/home-one/BannerOne';
import BrandOne from '../sections/home-one/BrandOne';
import FaqOne from '../sections/home-one/FaqOne';
import ListingOne from '../sections/home-one/ListingOne';
import WelcomeSection from '../sections/common/Welcome';
import VideoTestimonial from '../sections/home-one/VideoTestimonial';
import WhychooseOne from '../sections/home-one/WhychooseOne';
import SearchSection from '../sections/common/Search';
import { productsList } from '@/all-content/products/productData';

const Page: React.FC = () => {
  const [filteredData, setFilteredData] = useState<any[]>(productsList);

const handleSearch = (filters: any) => {
    const results = productsList.filter((car: any) => {
      // Make / Brand match
      const matchMake = !filters.make || 
        car.brand?.toLowerCase().includes(filters.make.toLowerCase()) || 
        car.model?.toLowerCase().includes(filters.make.toLowerCase()) ||
        car.title?.toLowerCase().includes(filters.make.toLowerCase());

      // Model match if specified
      const matchModel = !filters.model || 
        car.model?.toLowerCase().includes(filters.model.toLowerCase()) ||
        car.title?.toLowerCase().includes(filters.model.toLowerCase());

      // Fuel match
      const matchFuel = !filters.fuelType || car.fuel?.toLowerCase() === filters.fuelType.toLowerCase();

      // Transmission match
      const matchTrans = !filters.transmission || car.transmission?.toLowerCase() === filters.transmission.toLowerCase();
      
      // Price range match
      const carPrice = car.price || 100;
      const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const max = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      const matchPrice = carPrice >= min && carPrice <= max;

      return matchMake && matchModel && matchFuel && matchTrans && matchPrice;
    });

    setFilteredData(results);
  };

  return (
    <div className='page-wrapper'>
      <Header />
      <BannerOne />
      <BrandOne />
      <SearchSection onSearch={handleSearch} resultCount={filteredData.length} />
      <ListingOne filteredData={filteredData} />
      <WelcomeSection />
      <AboutOne />
      <WhychooseOne />
      <VideoTestimonial />
      <Gallery />
      <FaqOne />
      <OurBlog />
      <Footer />
      <StrickyHeader />
    </div>
  );
};

export default Page;
