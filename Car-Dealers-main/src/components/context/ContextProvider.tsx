"use client"
import React, { useState } from 'react';
import { contextType } from './contextType';
import GorentContext from './GorentContext';
const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMobileManu, setIsMobileManu] = useState<boolean>(false);
    const [isSidebar, setIsSidebar] = useState(false);
    const [isSearch, setIsSearch] = useState(false)
    const [showVideoPopup, setShowVideoPopup] = useState<boolean>(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");
    const [activeSection, setActiveSection] = useState<string>("home");

    const handleVideoClick = (
        e: React.MouseEvent<HTMLAnchorElement>, videoUrl: string = "https://www.youtube.com/embed/MLpWrANjFbI?autoplay=1"
    ): void => {
        e.preventDefault();
        setCurrentVideoUrl(videoUrl);
        setShowVideoPopup(true);
    };

    const info: contextType = {
        isMobileManu, setIsMobileManu,
        isSidebar, setIsSidebar,
        isSearch, setIsSearch,
        showVideoPopup, setShowVideoPopup,
        currentVideoUrl, setCurrentVideoUrl,
        handleVideoClick,
        activeSection, setActiveSection
    }
    return (
        <GorentContext.Provider value={info}>
            {children}
        </GorentContext.Provider>
    );
};

export default ContextProvider;