"use client"
import React from 'react';  
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ManuItemOnePage } from '../link-content/LinkType';
import MobileManuListSingle from './MobileManuListSingle';

interface ComponentProps {
    onePageManuList: ManuItemOnePage[]
}

const MainManuList: React.FC<ComponentProps> = ({ onePageManuList }) => {
    const currentPath = usePathname();
    const isOnePage = currentPath.includes("one-page")

    if (isOnePage) {
        return <MobileManuListSingle onePageManuListProp={onePageManuList} />
    } 
    
    return (
        <ul className="main-menu__list">
            {/* HOME - Single */}
            <li className={currentPath === "/" ? "current" : ""}>
                <a href="/">Home</a>
            </li>

            {/* VIEW STOCK - With Nested Dropdown */}
            <li className={`dropdown ${currentPath.startsWith("/inner/view-stock") ? "current" : ""}`}>
                <a href="/inner/products">View Stock</a>
                <ul className="shadow-box">
                    {/* Melbourne Sub-dropdown */}
                    <li className={`dropdown ${currentPath.startsWith("/inner/view-stock/melbourne") ? "current" : ""}`}>
                        <a href="/inner/products?city=Melbourne">Melbourne Stock</a>
                        <ul className="shadow-box">
                            <li className={currentPath === "/inner/view-stock/melbourne/all-melbourne-stock" ? "current" : ""}>
                                <a href="/inner/products?city=Melbourne">All Melbourne Stock</a>
                            </li>
                            <li className={currentPath === "/inner/view-stock/melbourne/maidstone-yard" ? "current" : ""}>
                                <a href="/inner/products?yard=Maidstone">Maidstone Yard</a>
                            </li>
                            <li className={currentPath === "/inner/view-stock/melbourne/mordialloc-yard" ? "current" : ""}>
                                <a href="/inner/products?yard=Mordialloc">Mordialloc Yard</a>
                            </li>
                        </ul>
                    </li>

                    {/* Brisbane Sub-dropdown */}
                    <li className={`dropdown ${currentPath.startsWith("/inner/view-stock/brisbane") ? "current" : ""}`}>
                        <a href="/inner/products?city=Brisbane">Brisbane Stock</a>
                        <ul className="shadow-box">
                            <li className={currentPath === "/inner/view-stock/brisbane/slack-creek" ? "current" : ""}>
                                <a href="/inner/products?yard=Slack%20Creek">Slack Creek</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>

            {/* FINANCE - With Dropdown */}
            <li className={`dropdown ${currentPath.startsWith("/inner/finance") ? "current" : ""}`}>
                <a href="#">Finance</a>
                <ul className="shadow-box">
                    <li className={currentPath === "/inner/finance/finance-calculator" ? "current" : ""}>
                        <a href="/inner/finance/finance-calculator">Finance Calculator</a>
                    </li>
                    <li className={currentPath === "/inner/finance/apply-for-finance" ? "current" : ""}>
                        <a href="/inner/finance/apply-for-finance">Apply for Finance</a>
                    </li>
                    <li className={currentPath === "/inner/finance/finance-information" ? "current" : ""}>
                        <a href="/inner/finance/finance-information">Finance Information</a>
                    </li>
                </ul>
            </li>

            {/* ON SALE CARS - Single */}
            <li className={currentPath === "/inner/on-sale-cars" ? "current" : ""}>
                <a href="/inner/cars?sale=true">On Sale Cars</a>
            </li>



            {/* WHOLESALE - Single */}
            <li className={currentPath === "/inner/wholesale" ? "current" : ""}>
                <a href="/inner/wholesale">Wholesale</a>
            </li>

            {/* WARRANTY - Single */}
            <li className={currentPath === "/inner/warranty" ? "current" : ""}>
                <a href="/inner/warranty">Warranty</a>
            </li>

            {/* CONTACT US - Single */}
            <li className={currentPath === "/inner/contact" ? "current" : ""}>
                <a href="/inner/contact">Contact</a>
            </li>

            {/* ABOUT US - Single */}
            <li className={currentPath === "/inner/about" ? "current" : ""}>
                <a href="/inner/about">About</a>
            </li>

            {/* MORE - With Dropdown */}
            <li className={`dropdown ${currentPath.startsWith("/inner/more") ? "current" : ""}`}>
                <a href="#">More</a>
                <ul className="shadow-box">
                    <li className={currentPath === "/inner/blog" ? "current" : ""}>
                        <a href="/inner/blog">Blog</a>
                    </li>
                 
                    <li className={currentPath === "/inner/faqs" ? "current" : ""}>
                        <a href="/inner/faq">FAQs</a>
                      
                    </li>
                </ul>
            </li>
        </ul>
    );
};

export default MainManuList;
