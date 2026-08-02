"use client"
import React from 'react'; 
import logoOne from "../../../public/assets/images/resources/logo-1.png"; 
import { onePageManuListOne } from '../../components/link-content/NavLink';
import useGorentContext from '@/components/context/useGorentContext';
import Link from 'next/link';
import Image from 'next/image';
import MainManuList from '@/components/elements/MainManuList';

const Header: React.FC = () => {
    const { setIsSearch, setIsSidebar, setIsMobileManu } = useGorentContext();
    return (
        <header className="main-header">
            <div className="main-menu__top">
                <div className="main-menu__top-inner">
                    <ul className="list-unstyled main-menu__contact-list">
                        <li>
                            <div className="icon">
                                <i className="icon-call-2"></i>
                            </div>
                            <div className="text">
                                <p><a href="tel:9288006780">+1800 006 256</a>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <i className="icon-envelope-2"></i>
                            </div>
                            <div className="text">
                                <p><a href="mailto:info@ukajapan.com.au">info@ukajapan.com.au</a>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <i className="icon-pin-2"></i>
                            </div>
                            <div className="text">
                                <p style={{ fontSize: "11px" }}>
                                    <a href="https://maps.app.goo.gl/mro1EoXZtAkH1udS8" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>MAIDSTONE</a>
                                    <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span>
                                    <a href="https://maps.app.goo.gl/akeweSjyWMvCT9ji8" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>MORDIALLOC</a>
                                    <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span>
                                    <a href="https://maps.app.goo.gl/JoZUKq7tq9RQTGiF6" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>BRISBANE</a>
                                </p>
                            </div>
                        </li>
                    </ul>

                        <div className="main-menu__social">
                            <a href="#"><i className="icon-facebook"></i></a>
                            <a href="#"><i className="icon-twitter"></i></a>
                            <a href="#"><i className="icon-instagram"></i></a>
                            <a href="#"><i className="icon-youtube"></i></a>
                        </div>
                    </div>
                </div>
            <nav className="main-menu" >
                <div className="main-menu__wrapper" >
                    <div className="main-menu__wrapper-inner" >
                        <div className="main-menu__left">
                            <div className="main-menu__logo">
                                <Link href="/"><Image src={logoOne}  height={80} alt="" /></Link>
                            </div>
                        </div>
                        <div className="main-menu__middle-box">
                            <div className="main-menu__main-menu-box">
                                <a href="#" className="mobile-nav__toggler" onClick={() => setIsMobileManu((pre) => (!pre))}><i className="fa fa-bars"></i></a>
                                <MainManuList onePageManuList={onePageManuListOne} />
                            </div>
                            <div className="main-menu__search-cart-box">
                                <div className="main-menu__search-box" onClick={() => setIsSearch((pre) => !pre)}>
                                    <a href="#" className="main-menu__search search-toggler icon-search"></a>
                                </div>
                            </div>
                        </div>
                        <div className="main-menu__right">
                            <div className="main-menu__call">
                                <div className="main-menu__call-icon">
                                    <i className="icon-call-3"></i>
                                </div>
                                <div className="main-menu__call-content">
                                    <p className="main-menu__call-sub-title">Call Anytime</p>
                                    <h5 className="main-menu__call-number"><a href="tel:23645689622">+1800 006 256</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="main-menu__nav-sidebar-icon" onClick={() => setIsSidebar((pre) => !pre)}>
                                <a className="navSidebar-button" href="#">
                                    <span className="icon-dots-menu-one"></span>
                                    <span className="icon-dots-menu-two"></span>
                                    <span className="icon-dots-menu-three"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;