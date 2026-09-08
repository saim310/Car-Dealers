"use client"
import React from 'react';
import footerLogo from "../../../public/assets/images/resources/footer-logo1.png";
import useGorentContext from '../context/useGorentContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MobileManuList from './MobileManuList';
import MobileManuListSingle from './MobileManuListSingle';
import { onePageManuListOne, onePageManuListThree, onePageManuListTwo } from '../link-content/NavLink';

const MobileNav: React.FC = () => {
    const { isMobileManu, setIsMobileManu } = useGorentContext();
    const currentPath = usePathname();
    const isOnePage = currentPath.includes("one-page");

    return (
        <div className={`mobile-nav__wrapper ${isMobileManu ? "expanded" : ""}`}>
            <div className="mobile-nav__overlay mobile-nav__toggler" onClick={() => setIsMobileManu((pre) => (!pre))}></div>
            <div className="mobile-nav__content">
                <span className="mobile-nav__close mobile-nav__toggler" onClick={() => setIsMobileManu((pre) => (!pre))}><i className="fa fa-times"></i></span>

                <div className="logo-box">
                    <Link href="/" aria-label="logo image" onClick={() => setIsMobileManu((pre) => (!pre))}>
                        <Image 
                            src={footerLogo} 
                            alt="UKA Group Logo" 
                            width={160}
                            height={50}
                            style={{ 
                                height: "auto", 
                                width: "100px", 
                                objectFit: "contain",
                                display: "block"
                            }} 
                        />
                    </Link>
                </div>
                <div className="mobile-nav__container">
                    {
                        isOnePage ? <MobileManuListSingle onePageManuListProp={
                            currentPath === "/index-one-page" ? onePageManuListOne : currentPath === "/index-two-one-page" ? onePageManuListTwo : onePageManuListThree} />
                            : <MobileManuList />
                    }
                </div>
                <ul className="mobile-nav__contact list-unstyled">
                    <li>
                        <i className="fa fa-envelope"></i>
                        <a href="mailto:info@ukajapan.com.au">info@ukajapan.com.au</a>
                    </li>
                    <li>
                        <i className="fas fa-phone"></i>
                        <a href="tel:+61485889402">+61 485 889 402</a>
                    </li>
                </ul>
                <div className="mobile-nav__top">
                    <div className="mobile-nav__social">
                        <a 
                            href="https://www.instagram.com/uka_japanmotors_australia/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="fab fa-instagram"
                            aria-label="Instagram"
                        ></a>
                        <a 
                            href="https://www.facebook.com/profile.php?id=61593809579972" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="fab fa-facebook-square"
                            aria-label="Facebook"
                        ></a>
                        <a 
                            href="https://www.tiktok.com/@ukajapanaustralia" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                            aria-label="TikTok"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 448 512" 
                                width="14" 
                                height="14" 
                                fill="currentColor"
                            >
                                <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V258.2a90.08 90.08 0 1 0 57.83 84.71V0h72.23a137.81 137.81 0 0 0 132.94 132.85v77.06z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;