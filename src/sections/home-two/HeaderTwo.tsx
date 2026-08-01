"use client"
import React from 'react';
import logo from "../../../public/assets/images/resources/logo-2.png"
import useGorentContext from '@/components/context/useGorentContext';
import Link from 'next/link';
import MainManuList from '@/components/elements/MainManuList';
import { onePageManuListTwo } from '@/components/link-content/NavLink';
import Image from 'next/image';
const HeaderTwo: React.FC = () => {
    const { setIsMobileManu, setIsSearch, setIsSidebar } = useGorentContext();
    return (
        <header className="main-header-two">
            <div className="main-menu-two__top">
                <div className="main-menu-two__top-inner">
                    <ul className="list-unstyled main-menu-two__contact-list">
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
                                <p><a href="mailto:sales.maidstone@ukajapan.com.au">sales.maidstone@ukajapan.com.au</a>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <i className="icon-pin-2"></i>
                            </div>
                            <div className="text">
                                <p>205 Ballarat Rd, Maidstone, VIC 3012</p>
                            </div>
                        </li>
                    </ul>
                    <div className="main-menu-two__top-right">
                        <div className="main-menu-two__top-login-reg-box">
                            <Link href="/inner/login">Login</Link>
                            <p>or</p>
                            <Link href="/inner/sign-up">Register</Link>
                        </div>
                        <div className="main-menu-two__social">
                            <a href="#"><i className="icon-facebook"></i></a>
                            <a href="#"><i className="icon-twitter"></i></a>
                            <a href="#"><i className="icon-instagram"></i></a>
                            <a href="#"><i className="icon-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="main-menu main-menu-two">
                <div className="main-menu-two__wrapper">
                    <div className="main-menu-two__wrapper-inner">
                        <div className="main-menu-two__left">
                            <div className="main-menu-two__logo">
                                <Link href="/"><Image src={logo} width={130} height={50} alt="Logo" /></Link>
                            </div>
                        </div>
                        <div className="main-menu-two__middle-box">
                            <div className="main-menu-two__main-menu-box">
                                <a href="#" className="mobile-nav__toggler" onClick={() => setIsMobileManu((pre) => (!pre))}><i className="fa fa-bars"></i></a>
                                <MainManuList onePageManuList={onePageManuListTwo} />
                            </div>
                            <div className="main-menu-two__search-cart-box">
                                <div className="main-menu-two__search-box" onClick={() => setIsSearch((pre) => !pre)}>
                                    <a href="#" className="main-menu-two__search search-toggler icon-search"></a>
                                </div>
                                <div className="main-menu-two__cart-box">
                                    <Link href="/inner/cart" className="main-menu-two__cart">
                                        <span className="far fa-shopping-cart"></span>
                                        <span className="main-menu-two__cart-count">02</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="main-menu-two__right">
                            <div className="main-menu-two__call">
                                <div className="main-menu-two__call-icon">
                                    <i className="icon-call-3"></i>
                                </div>
                                <div className="main-menu-two__call-content">
                                    <p className="main-menu-two__call-sub-title">Call Anytime</p>
                                    <h5 className="main-menu-two__call-number"><a href="tel:23645689622">+236 (456) 896
                                        22</a>
                                    </h5>
                                </div>
                            </div>
                            <div className="main-menu-two__nav-sidebar-icon" onClick={() => setIsSidebar((pre) => !pre)}>
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

export default HeaderTwo;