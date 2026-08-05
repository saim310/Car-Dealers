"use client"
import React from 'react';
import useGorentContext from '../context/useGorentContext';
import CustomCursor from '../elements/CustomCursor';
import SearchProp from '../elements/SearchProp';
import SideBar from '../elements/SideBar';
import MobileNav from '../elements/MobileNav';
import ScrollToTop from '../elements/ScrollToTop';
import VideoPopup from '../elements/VideoPopup'; 
const CustomLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isMobileManu, isSearch } = useGorentContext();
    return (
        <div className={`custom-cursor ${isMobileManu || isSearch ? 'locked' : ''}`}>
            <CustomCursor />
            {children}
            <SearchProp />
            <SideBar />
            <MobileNav />
            <ScrollToTop />
            <VideoPopup />
        </div>
    );
};

export default CustomLayout;