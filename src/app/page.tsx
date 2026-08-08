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

      // 1. Text Search match
      const matchSearch =
        !filters.search ||
        car.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.brand?.toLowerCase().includes(filters.search.toLowerCase()) ||
        car.model?.toLowerCase().includes(filters.search.toLowerCase());

      // 2. Body Style match
      const matchBody =
        !filters.bodyStyle ||
        filters.bodyStyle === 'All Body Styles' ||
        car.bodyStyle?.toLowerCase().trim() === filters.bodyStyle.toLowerCase().trim();

      // 3. Make / Brand match
      const matchMake =
        !filters.make ||
        filters.make === 'ALL MAKES' ||
        car.brand?.toLowerCase().includes(filters.make.toLowerCase());

      // 4. Model match
      const matchModel =
        !filters.model ||
        filters.model === 'All Models' ||
        car.model?.toLowerCase().includes(filters.model.toLowerCase());

      // 5. Fuel match
      const matchFuel =
        !filters.fuelType ||
        filters.fuelType === 'All Fuel Types' ||
        car.fuel?.toLowerCase().trim() === filters.fuelType.toLowerCase().trim();

      // 6. Transmission match
      const matchTrans =
        !filters.transmission ||
        filters.transmission === 'All Transmissions' ||
        car.transmission?.toLowerCase().trim() === filters.transmission.toLowerCase().trim();

      // 7. Stock Status match
      const matchStockStatus =
        !filters.stockStatus ||
        filters.stockStatus === 'All Stock Statuses' ||
        car.stockStatus?.replace(/_/g, ' ').toLowerCase().trim() ===
          filters.stockStatus?.replace(/_/g, ' ').toLowerCase().trim();

      // 8. Location match
      const matchLocation =
        !filters.location ||
        filters.location === 'All Locations' ||
        car.city?.toLowerCase().trim() === filters.location.toLowerCase().trim();

      // 9. Price range match
      const carPrice = Number(car.price) || 0;
      const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const max = filters.maxPrice && filters.maxPrice !== '100000' ? parseInt(filters.maxPrice) : Infinity;
      const matchPrice = carPrice >= min && carPrice <= max;

      // 10. Year range match
      const carYear = Number(car.year) || 0;
      const yearFrom = filters.yearFrom ? parseInt(filters.yearFrom) : 0;
      const yearTo = filters.yearTo ? parseInt(filters.yearTo) : Infinity;
      const matchYear = carYear >= yearFrom && carYear <= yearTo;

      return (
        matchSearch &&
        matchBody &&
        matchMake &&
        matchModel &&
        matchFuel &&
        matchTrans &&
        matchStockStatus &&
        matchLocation &&
        matchPrice &&
        matchYear
      );
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