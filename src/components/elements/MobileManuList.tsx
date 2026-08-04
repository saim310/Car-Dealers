"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useGorentContext from '../context/useGorentContext';

const MobileManuList: React.FC = () => {
    const { setIsMobileManu } = useGorentContext();
    const [isViewStock, setIsViewStock] = useState<boolean>(false);
    const [isMelbourne, setIsMelbourne] = useState<boolean>(false);
    const [isBrisbane, setIsBrisbane] = useState<boolean>(false);
    const [isFinance, setIsFinance] = useState<boolean>(false);
    const [isMore, setIsMore] = useState<boolean>(false);
    const pathName = usePathname();

    const closeMobileManu = () => {
        setIsMobileManu(false)
        setIsViewStock(false)
        setIsMelbourne(false)
        setIsBrisbane(false)
        setIsFinance(false)
        setIsMore(false)
    }

    return (
        <ul className="main-menu__list mobileManulist">
            {/* HOME */}
            <li className={`${pathName === "/" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link href="/">Home</Link>
            </li>

            {/* VIEW STOCK */}
            <li className="dropdown">
                <a href="#" className={`${isViewStock || pathName.startsWith("/inner/view-stock") || pathName === "/inner/products" ? "expanded" : ""}`}>
                    View Stock
                    <button className={`${isViewStock ? "expanded" : ""}`} onClick={() => setIsViewStock((pre) => (!pre))}>
                        <i className="fa fa-angle-down"></i>
                    </button>
                </a>
                <ul className="shadow-box" style={{ display: `${isViewStock ? "block" : "none"}` }}>
                    {/* Melbourne Sub-dropdown */}
                    <li className="dropdown">
                        <a href="#" className={`${isMelbourne || pathName.startsWith("/inner/view-stock/melbourne") ? "expanded" : ""}`}>
                            Melbourne Stock
                            <button className={`${isMelbourne ? "expanded" : ""}`} onClick={() => setIsMelbourne((pre) => (!pre))}>
                                <i className="fa fa-angle-down"></i>
                            </button>
                        </a>
                        <ul className="shadow-box" style={{ display: `${isMelbourne ? "block" : "none"}` }}>
                            <motion.li
                                onClick={closeMobileManu}
                                initial={{ x: -70, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.1, ease: "easeOut" }}
                                viewport={{ amount: 0.01, once: true }}
                                className={`${pathName === "/inner/view-stock/melbourne/all-melbourne-stock" ? "current" : ""}`}
                            >
                                <Link href="/inner/products?city=Melbourne">All Melbourne Stock</Link>
                            </motion.li>
                            <motion.li
                                onClick={closeMobileManu}
                                initial={{ x: -70, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                viewport={{ amount: 0.01, once: true }}
                                className={`${pathName === "/inner/view-stock/melbourne/maidstone-yard" ? "current" : ""}`}
                            >
                                <Link href="/inner/products?yard=Maidstone">Maidstone Yard</Link>
                            </motion.li>
                            <motion.li
                                onClick={closeMobileManu}
                                initial={{ x: -70, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                viewport={{ amount: 0.01, once: true }}
                                className={`${pathName === "/inner/view-stock/melbourne/mordialloc-yard" ? "current" : ""}`}
                            >
                                <Link href="/inner/products?yard=Mordialloc">Mordialloc Yard</Link>
                            </motion.li>
                        </ul>
                    </li>

                    {/* Brisbane Sub-dropdown */}
                    <li className="dropdown">
                        <a href="#" className={`${isBrisbane || pathName.startsWith("/inner/view-stock/brisbane") ? "expanded" : ""}`}>
                            Brisbane Stock
                            <button className={`${isBrisbane ? "expanded" : ""}`} onClick={() => setIsBrisbane((pre) => (!pre))}>
                                <i className="fa fa-angle-down"></i>
                            </button>
                        </a>
                        <ul className="shadow-box" style={{ display: `${isBrisbane ? "block" : "none"}` }}>
                            <motion.li
                                onClick={closeMobileManu}
                                initial={{ x: -70, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.1, ease: "easeOut" }}
                                viewport={{ amount: 0.01, once: true }}
                                className={`${pathName === "/inner/view-stock/brisbane/slack-creek" ? "current" : ""}`}
                            >
                                <Link href="/inner/products?yard=Slack%20Creek">Slack Creek</Link>
                            </motion.li>
                        </ul>
                    </li>
                </ul>
            </li>

            {/* FINANCE */}
            <li className="dropdown">
                <a href="#" className={`${isFinance || pathName.startsWith("/inner/finance") ? "expanded" : ""}`}>
                    Finance
                    <button className={`${isFinance ? "expanded" : ""}`} onClick={() => setIsFinance((pre) => (!pre))}>
                        <i className="fa fa-angle-down"></i>
                    </button>
                </a>
                <ul className="shadow-box" style={{ display: `${isFinance ? "block" : "none"}` }}>
                    <motion.li
                        onClick={closeMobileManu}
                        initial={{ x: -70, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        viewport={{ amount: 0.01, once: true }}
                        className={`${pathName === "/inner/finance/finance-calculator" ? "current" : ""}`}
                    >
                        <Link href="/inner/finance/finance-calculator">Finance Calculator</Link>
                    </motion.li>
                    <motion.li
                        onClick={closeMobileManu}
                        initial={{ x: -70, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        viewport={{ amount: 0.01, once: true }}
                        className={`${pathName === "/inner/finance/apply-for-finance" ? "current" : ""}`}
                    >
                        <Link href="/inner/finance/apply-for-finance">Apply for Finance</Link>
                    </motion.li>
                    <motion.li
                        onClick={closeMobileManu}
                        initial={{ x: -70, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        viewport={{ amount: 0.01, once: true }}
                        className={`${pathName === "/inner/finance/finance-information" ? "current" : ""}`}
                    >
                        <Link href="/inner/finance/finance-information">Finance Information</Link>
                    </motion.li>
                </ul>
            </li>

            {/* ON SALE CARS */}
            <li className={`${pathName === "/inner/on-sale-cars" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link href="/inner/cars?sale=true">On Sale Cars</Link>
            </li>

            {/* WHOLESALE */}
            <li className={`${pathName === "/inner/wholesale" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link href="/inner/wholesale">Wholesale</Link>
            </li>

            {/* WARRANTY */}
            <li className={`${pathName === "/inner/warranty" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link href="/inner/warranty">Warranty</Link>
            </li>

            {/* CONTACT */}
            <li className={`${pathName === "/inner/contact" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link href="/inner/contact">Contact</Link>
            </li>

            {/* ABOUT */}
            <li className={`${pathName === "/inner/about" ? "current" : ""}`} onClick={closeMobileManu}>
                <Link href="/inner/about">About</Link>
            </li>

            {/* MORE */}
            <li className="dropdown">
                <a href="#" className={`${isMore || pathName.startsWith("/inner/more") || pathName === "/inner/blog" || pathName === "/inner/TradeIn" || pathName === "/inner/faqs" ? "expanded" : ""}`}>
                    More
                    <button className={`${isMore ? "expanded" : ""}`} onClick={() => setIsMore((pre) => (!pre))}>
                        <i className="fa fa-angle-down"></i>
                    </button>
                </a>
                <ul className="shadow-box" style={{ display: `${isMore ? "block" : "none"}` }}>
                    <motion.li
                        onClick={closeMobileManu}
                        initial={{ x: -70, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        viewport={{ amount: 0.01, once: true }}
                        className={`${pathName === "/inner/blog" ? "current" : ""}`}
                    >
                        <Link href="/inner/blog">Blog</Link>
                    </motion.li>
                    <motion.li
                        onClick={closeMobileManu}
                        initial={{ x: -70, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        viewport={{ amount: 0.01, once: true }}
                        className={`${pathName === "/inner/TradeIn" ? "current" : ""}`}
                    >
                        <Link href="/inner/TradeIn">TradeIn</Link>
                    </motion.li>
                    <motion.li
                        onClick={closeMobileManu}
                        initial={{ x: -70, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        viewport={{ amount: 0.01, once: true }}
                        className={`${pathName === "/inner/faqs" ? "current" : ""}`}
                    >
                        <Link href="/inner/faq">FAQs</Link>
                    </motion.li>
                </ul>
            </li>
        </ul>
    );
};

export default MobileManuList;