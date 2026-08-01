"use client";
import useGorentContext from '@/components/context/useGorentContext';
import DownloadApp from '@/sections/common/DownloadApp';
import Footer from '@/sections/common/Footer';
import Gallery from '@/sections/common/Gallery';
import LetsTalk from '@/sections/common/LetsTalk';
import OurBlog from '@/sections/common/OurBlog';
import SlidingText from '@/sections/common/SlidingText';
import AboutTwo from '@/sections/home-two/AboutTwo';
import BannerTwo from '@/sections/home-two/BannerTwo';
import BookingTwo from '@/sections/home-two/BookingTwo';
import BrandTwo from '@/sections/home-two/BrandTwo';
import ContactTwo from '@/sections/home-two/ContactTwo';
import CounterTwo from '@/sections/home-two/CounterTwo';
import FaqTwo from '@/sections/home-two/FaqTwo';
import FeatureTwo from '@/sections/home-two/FeatureTwo';
import HeaderTwo from '@/sections/home-two/HeaderTwo';
import ListingTwo from '@/sections/home-two/ListingTwo';
import PopularTwo from '@/sections/home-two/PopularTwo';
import ProcessTwo from '@/sections/home-two/ProcessTwo';
import ServiceTwo from '@/sections/home-two/ServiceTwo';
import StrickyHeaderTwo from '@/sections/home-two/StrickyHeaderTwo';
import TeamTwo from '@/sections/home-two/TeamTwo';
import TestimonialTwo from '@/sections/home-two/TestimonialTwo';
import VideoTwo from '@/sections/home-two/VideoTwo';
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
            <HeaderTwo />
            <BannerTwo />
            <BookingTwo />
            <AboutTwo />
            <ServiceTwo />
            <SlidingText />
            <ProcessTwo />
            <LetsTalk />
            <CounterTwo />
            <ListingTwo />
            <VideoTwo />
            <FaqTwo />
            <ContactTwo />
            <TeamTwo />
            <TestimonialTwo />
            <DownloadApp />
            <FeatureTwo />
            <PopularTwo />
            <BrandTwo />
            <OurBlog />
            <Gallery />
            <Footer />
            <StrickyHeaderTwo />
        </div>
    );
};

export default Page;