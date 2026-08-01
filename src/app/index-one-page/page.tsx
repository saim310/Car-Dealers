"use client";
import useGorentContext from '@/components/context/useGorentContext';
import Booking from '@/sections/common/Booking';
import DownloadApp from '@/sections/common/DownloadApp';
import Footer from '@/sections/common/Footer';
import Gallery from '@/sections/common/Gallery';
import Header from '@/sections/common/Header';
import LetsTalk from '@/sections/common/LetsTalk';
import OurBlog from '@/sections/common/OurBlog';
import SlidingText from '@/sections/common/SlidingText';
import StrickyHeader from '@/sections/common/StrickyHeader';
import AboutOne from '@/sections/home-one/AboutOne';
import BannerOne from '@/sections/home-one/BannerOne';
import BrandOne from '@/sections/home-one/BrandOne';
import FaqOne from '@/sections/home-one/FaqOne';
import ListingOne from '@/sections/home-one/ListingOne';
import PricingOne from '@/sections/home-one/PricingOne';
import ProcessOne from '@/sections/home-one/ProcessOne';
import ServiceOne from '@/sections/home-one/ServiceOne';
import TeamOne from '@/sections/home-one/TeamOne';
import TestimonialOne from '@/sections/home-one/TestimonialOne';
import VideoOne from '@/sections/home-one/VideoOne';
import WhychooseOne from '@/sections/home-one/WhychooseOne';
import React, { useEffect } from 'react';

const Page: React.FC = () => {
    const { setActiveSection } = useGorentContext();
    useEffect(() => {
        const sections = document.querySelectorAll<HTMLElement>("section");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.id) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.7,
            }
        );
        sections.forEach((section) => observer.observe(section));
        return () => {
            sections.forEach((section) => observer.unobserve(section));
            observer.disconnect();
        };
    }, [setActiveSection]);
    return (
        <div className='page-wrapper'>
            <Header />
            <BannerOne />
            <SlidingText />
            <ServiceOne />
            <AboutOne />
            <ProcessOne />
            <Booking />
            <WhychooseOne />
            <ListingOne />
            <VideoOne />
            <PricingOne />
            <TestimonialOne />
            <FaqOne />
            <LetsTalk />
            <TeamOne />
            <DownloadApp />
            <BrandOne />
            <OurBlog />
            <Gallery />
            <Footer />
            <StrickyHeader />
        </div>
    );
};

export default Page;