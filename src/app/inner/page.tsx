import AboutInner from '@/sections/about/AboutInner';
import ListingInner from '@/sections/about/ListingInner';
import TeamInner from '@/sections/about/TeamInner';
import TestimonianInner from '@/sections/about/TestimonianInner';
import BookingInner from '@/sections/booking/BookingInner';
import Banner from '@/sections/common/Banner';
import LetsTalk from '@/sections/common/LetsTalk';
import OurBlog from '@/sections/common/OurBlog';
import ServiceInner from '@/sections/service/ServiceInner';
import React from 'react';

const page: React.FC = () => {
    return (
        <>
            <Banner breadcrumb='About Us' />
            <AboutInner />
            <ServiceInner sectionClass='services-one' />
            <BookingInner />
            <ListingInner />
            <TeamInner />
            <TestimonianInner />
            <LetsTalk />
            <OurBlog />
        </>
    );
};

export default page;