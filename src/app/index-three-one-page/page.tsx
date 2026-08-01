"use client";
import useGorentContext from '@/components/context/useGorentContext';
import DownloadApp from '@/sections/common/DownloadApp';
import Footer from '@/sections/common/Footer';
import Gallery from '@/sections/common/Gallery';
import LetsTalk from '@/sections/common/LetsTalk';
import OurBlog from '@/sections/common/OurBlog';
import StrickyHeader from '@/sections/common/StrickyHeader';
import AboutThree from '@/sections/home-three/AboutThree';
import BannerThree from '@/sections/home-three/BannerThree';
import BrandThree from '@/sections/home-three/BrandThree';
import ContactThree from '@/sections/home-three/ContactThree';
import CounterThree from '@/sections/home-three/CounterThree';
import FeaturesThree from '@/sections/home-three/FeaturesThree';
import HeaderThree from '@/sections/home-three/HeaderThree';
import ListingThree from '@/sections/home-three/ListingThree';
import PricingThree from '@/sections/home-three/PricingThree';
import ProcessThree from '@/sections/home-three/ProcessThree';
import SearchCarThree from '@/sections/home-three/SearchCarThree';
import ServiceThree from '@/sections/home-three/ServiceThree';
import TeamThree from '@/sections/home-three/TeamThree';
import TestimonialsThree from '@/sections/home-three/TextimonialsThree';
import VideoThree from '@/sections/home-three/VideoThree';
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
            <HeaderThree />
            <BannerThree />
            <SearchCarThree />
            <AboutThree />
            <ServiceThree />
            <ProcessThree />
            <CounterThree />
            <ListingThree />
            <VideoThree />
            <PricingThree />
            <LetsTalk />
            <TestimonialsThree />
            <TeamThree />
            <ContactThree />
            <FeaturesThree />
            <BrandThree />
            <DownloadApp />
            <OurBlog />
            <Gallery />
            <Footer />
            <StrickyHeader />
        </div>
    );
};

export default Page;