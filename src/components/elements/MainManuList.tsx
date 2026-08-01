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
                <Link href="/">Home</Link>
            </li>

            {/* VIEW STOCK - With Nested Dropdown */}
            <li className={`dropdown ${currentPath.startsWith("/inner/view-stock") ? "current" : ""}`}>
                <a href="/inner/products">View Stock</a>
                <ul className="shadow-box">
                    {/* Melbourne Sub-dropdown */}
                    <li className={`dropdown ${currentPath.startsWith("/inner/view-stock/melbourne") ? "current" : ""}`}>
                        <a href="/inner/products?city=Melbourne">Melbourne</a>
                        <ul className="shadow-box">
                            <li className={currentPath === "/inner/view-stock/melbourne/all-melbourne-stock" ? "current" : ""}>
                                <Link href="/inner/products?city=Melbourne">All Melbourne Stock</Link>
                            </li>
                            <li className={currentPath === "/inner/view-stock/melbourne/maidstone-yard" ? "current" : ""}>
                                <Link href="/inner/products?yard=Maidstone">Maidstone Yard</Link>
                            </li>
                            <li className={currentPath === "/inner/view-stock/melbourne/mordialloc-yard" ? "current" : ""}>
                                <Link href="/inner/products?yard=Mordialloc">Mordialloc Yard</Link>
                            </li>
                        </ul>
                    </li>

                    {/* Brisbane Sub-dropdown */}
                    <li className={`dropdown ${currentPath.startsWith("/inner/view-stock/brisbane") ? "current" : ""}`}>
                        <a href="/inner/products?city=Brisbane">Brisbane</a>
                        <ul className="shadow-box">
                            <li className={currentPath === "/inner/view-stock/brisbane/slack-creek" ? "current" : ""}>
                                <Link href="/inner/products?yard=Slack%20Creek">Slack Creek</Link>
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
                        <Link href="/inner/finance/finance-calculator">Finance Calculator</Link>
                    </li>
                    <li className={currentPath === "/inner/finance/apply-for-finance" ? "current" : ""}>
                        <Link href="/inner/finance/apply-for-finance">Apply for Finance</Link>
                    </li>
                    <li className={currentPath === "/inner/finance/finance-information" ? "current" : ""}>
                        <Link href="/inner/finance/finance-information">Finance Information</Link>
                    </li>
                </ul>
            </li>

            {/* ON SALE CARS - Single */}
            <li className={currentPath === "/inner/on-sale-cars" ? "current" : ""}>
                <Link href="/inner/cars?sale=true">On Sale Cars</Link>
            </li>



            {/* WHOLESALE - Single */}
            <li className={currentPath === "/inner/wholesale" ? "current" : ""}>
                <Link href="/inner/wholesale">Wholesale</Link>
            </li>

            {/* WARRANTY - Single */}
            <li className={currentPath === "/inner/warranty" ? "current" : ""}>
                <Link href="/inner/warranty">Warranty</Link>
            </li>

            {/* CONTACT US - Single */}
            <li className={currentPath === "/inner/contact" ? "current" : ""}>
                <Link href="/inner/contact">Contact</Link>
            </li>

            {/* ABOUT US - Single */}
            <li className={currentPath === "/inner/about" ? "current" : ""}>
                <Link href="/inner/about">About</Link>
            </li>

            {/* MORE - With Dropdown */}
            <li className={`dropdown ${currentPath.startsWith("/inner/more") ? "current" : ""}`}>
                <a href="#">More</a>
                <ul className="shadow-box">
                    <li className={currentPath === "/inner/blog" ? "current" : ""}>
                        <Link href="/inner/blog">Blog</Link>
                    </li>
                     <li className={currentPath === "/inner/TradeIn" ? "current" : ""}>
                <Link href="/inner/TradeIn">TradeIn</Link>
            </li>
                    <li className={currentPath === "/inner/faqs" ? "current" : ""}>
                        <Link href="/inner/faq">FAQs</Link>
                      
                    </li>
                </ul>
            </li>
        </ul>
    );
};

export default MainManuList;
