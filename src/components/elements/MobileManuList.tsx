"use client"
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useGorentContext from '../context/useGorentContext';

const MobileManuList: React.FC = () => {
    const { setIsMobileManu } = useGorentContext();
    const pathName = usePathname();
    const router = useRouter();

    const [isViewStock, setIsViewStock] = useState<boolean>(false);
    const [isMelbourne, setIsMelbourne] = useState<boolean>(false);
    const [isBrisbane, setIsBrisbane] = useState<boolean>(false);
    const [isFinance, setIsFinance] = useState<boolean>(false);
    const [isMore, setIsMore] = useState<boolean>(false);

    // Handles mobile navigation and drawer closing
    const handleMobileNav = (e: React.MouseEvent, href: string) => {
        e.preventDefault();

        // Close mobile drawer and reset dropdown states
        setIsMobileManu(false);
        setIsViewStock(false);
        setIsMelbourne(false);
        setIsBrisbane(false);
        setIsFinance(false);
        setIsMore(false);

        // Client-side routing
        router.push(href);
    };

    return (
        <ul className="main-menu__list mobileManulist">
            {/* HOME */}
            <li className={`${pathName === "/" ? "current" : ""}`}>
                <a href="/" onClick={(e) => handleMobileNav(e, "/")}>Home</a>
            </li>

            {/* VIEW STOCK */}
            <li className="dropdown">
                <a href="#" className={`${isViewStock || pathName.startsWith("/inner/view-stock") || pathName === "/inner/products" ? "expanded" : ""}`}>
                    View Stock
                    <button className={`${isViewStock ? "expanded" : ""}`} onClick={(e) => { e.preventDefault(); setIsViewStock((pre) => (!pre)); }}>
                        <i className="fa fa-angle-down"></i>
                    </button>
                </a>
                <ul className="shadow-box" style={{ display: `${isViewStock ? "block" : "none"}` }}>
                    
                    {/* ALL CARS */}
                    <li className={`${pathName === "/inner/products" ? "current" : ""}`}>
                        <a href="/inner/products" onClick={(e) => handleMobileNav(e, "/inner/products")}>All Cars</a>
                    </li>

                    {/* Melbourne Sub-dropdown */}
                    <li className="dropdown">
                        <a href="#" className={`${isMelbourne || pathName.startsWith("/inner/view-stock/melbourne") ? "expanded" : ""}`}>
                            Melbourne Stock
                            <button className={`${isMelbourne ? "expanded" : ""}`} onClick={(e) => { e.preventDefault(); setIsMelbourne((pre) => (!pre)); }}>
                                <i className="fa fa-angle-down"></i>
                            </button>
                        </a>
                        <ul className="shadow-box" style={{ display: `${isMelbourne ? "block" : "none"}` }}>
                            <li className={`${pathName === "/inner/view-stock/melbourne/all-melbourne-stock" ? "current" : ""}`}>
                                <a href="/inner/products?city=Melbourne" onClick={(e) => handleMobileNav(e, "/inner/products?city=Melbourne")}>
                                    All Melbourne Stock
                                </a>
                            </li>
                            <li className={`${pathName === "/inner/view-stock/melbourne/maidstone-yard" ? "current" : ""}`}>
                                <a href="/inner/products?yard=Maidstone" onClick={(e) => handleMobileNav(e, "/inner/products?yard=Maidstone")}>
                                    Maidstone Yard
                                </a>
                            </li>
                            <li className={`${pathName === "/inner/view-stock/melbourne/mordialloc-yard" ? "current" : ""}`}>
                                <a href="/inner/products?yard=Mordialloc" onClick={(e) => handleMobileNav(e, "/inner/products?yard=Mordialloc")}>
                                    Mordialloc Yard
                                </a>
                            </li>
                        </ul>
                    </li>

                    {/* Brisbane Sub-dropdown */}
                    <li className="dropdown">
                        <a href="#" className={`${isBrisbane || pathName.startsWith("/inner/view-stock/brisbane") ? "expanded" : ""}`}>
                            Brisbane Stock
                            <button className={`${isBrisbane ? "expanded" : ""}`} onClick={(e) => { e.preventDefault(); setIsBrisbane((pre) => (!pre)); }}>
                                <i className="fa fa-angle-down"></i>
                            </button>
                        </a>
                        <ul className="shadow-box" style={{ display: `${isBrisbane ? "block" : "none"}` }}>
                            <li className={`${pathName === "/inner/view-stock/brisbane/slack-creek" ? "current" : ""}`}>
                                <a href="/inner/products?yard=Slack%20Creek" onClick={(e) => handleMobileNav(e, "/inner/products?yard=Slack%20Creek")}>
                                    Slack Creek
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>

            {/* FINANCE */}
            <li className="dropdown">
                <a href="#" className={`${isFinance || pathName.startsWith("/inner/finance") ? "expanded" : ""}`}>
                    Finance
                    <button className={`${isFinance ? "expanded" : ""}`} onClick={(e) => { e.preventDefault(); setIsFinance((pre) => (!pre)); }}>
                        <i className="fa fa-angle-down"></i>
                    </button>
                </a>
                <ul className="shadow-box" style={{ display: `${isFinance ? "block" : "none"}` }}>
                    <li className={`${pathName === "/inner/finance/finance-calculator" ? "current" : ""}`}>
                        <a href="/inner/finance/finance-calculator" onClick={(e) => handleMobileNav(e, "/inner/finance/finance-calculator")}>Finance Calculator</a>
                    </li>
                    <li className={`${pathName === "/inner/finance/apply-for-finance" ? "current" : ""}`}>
                        <a href="/inner/finance/apply-for-finance" onClick={(e) => handleMobileNav(e, "/inner/finance/apply-for-finance")}>Apply for Finance</a>
                    </li>
                    <li className={`${pathName === "/inner/finance/finance-information" ? "current" : ""}`}>
                        <a href="/inner/finance/finance-information" onClick={(e) => handleMobileNav(e, "/inner/finance/finance-information")}>Finance Information</a>
                    </li>
                </ul>
            </li>

            {/* HOT DEALS */}
            <li className={`${pathName === "/inner/hot-deals" ? "current" : ""}`}>
                <a href="/inner/hot-deals" onClick={(e) => handleMobileNav(e, "/inner/hot-deals")} className="mobile-hot-deals-item">
                    <span>Hot Deals</span>
                    <span className="mobile-hot-badge">% Discounts</span>
                </a>
            </li>

            {/* WHOLESALE */}
            <li className={`${pathName === "/inner/wholesale" ? "current" : ""}`}>
                <a href="/inner/wholesale" onClick={(e) => handleMobileNav(e, "/inner/wholesale")}>Wholesale</a>
            </li>

            {/* WARRANTY */}
            <li className={`${pathName === "/inner/warranty" ? "current" : ""}`}>
                <a href="/inner/warranty" onClick={(e) => handleMobileNav(e, "/inner/warranty")}>Warranty</a>
            </li>

            {/* CONTACT */}
            <li className={`${pathName === "/inner/contact" ? "current" : ""}`}>
                <a href="/inner/contact" onClick={(e) => handleMobileNav(e, "/inner/contact")}>Contact</a>
            </li>

            {/* ABOUT */}
            <li className={`${pathName === "/inner/about" ? "current" : ""}`}>
                <a href="/inner/about" onClick={(e) => handleMobileNav(e, "/inner/about")}>About</a>
            </li>

            {/* MORE */}
            <li className="dropdown">
                <a href="#" className={`${isMore || pathName.startsWith("/inner/more") || pathName === "/inner/blog" || pathName === "/inner/TradeIn" || pathName === "/inner/faq" ? "expanded" : ""}`}>
                    More
                    <button className={`${isMore ? "expanded" : ""}`} onClick={(e) => { e.preventDefault(); setIsMore((pre) => (!pre)); }}>
                        <i className="fa fa-angle-down"></i>
                    </button>
                </a>
                <ul className="shadow-box" style={{ display: `${isMore ? "block" : "none"}` }}>
                    <li className={`${pathName === "/inner/blog" ? "current" : ""}`}>
                        <a href="/inner/blog" onClick={(e) => handleMobileNav(e, "/inner/blog")}>Blog</a>
                    </li>
                    <li className={`${pathName === "/inner/TradeIn" ? "current" : ""}`}>
                        <a href="/inner/TradeIn" onClick={(e) => handleMobileNav(e, "/inner/TradeIn")}>TradeIn</a>
                    </li>
                    <li className={`${pathName === "/inner/faq" ? "current" : ""}`}>
                        <a href="/inner/faq" onClick={(e) => handleMobileNav(e, "/inner/faq")}>FAQs</a>
                    </li>
                </ul>
            </li>
        </ul>
    );
};

export default MobileManuList;