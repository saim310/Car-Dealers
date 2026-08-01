"use client"
import React from 'react';
import { motion } from "framer-motion"
import Link from 'next/link';
import footerLogo from "../../../public/assets/images/resources/footer-logo1.png"

import Image from 'next/image';
import LocationTabs from './LocationTabs';
interface LinkItem {
    id: number;
    link: string;
    title: string;
}
const linkOne: LinkItem[] = [
    { id: 1, link: "/inner/drivers", title: "View Stock" },
    { id: 2, link: "/inner/services", title: "Finance" },
    { id: 3, link: "/inner/car-list-v-1", title: "Trade In" },
    { id: 4, link: "/inner/services", title: "Warranty" },
    { id: 5, link: "/inner/blog", title: "Blog" },
    { id: 6, link: "/inner/about", title: "Reviews" }
];

const linkTwo: LinkItem[] = [
    { id: 1, link: "tel:+1234567890", title: "Phone" },
    { id: 2, link: "https://linkedin.com", title: "LinkedIn" },
    { id: 3, link: "https://facebook.com", title: "Facebook" },
    { id: 4, link: "https://instagram.com", title: "Instagram" },
    { id: 5, link: "https://youtube.com", title: "YouTube" }
];

const Footer: React.FC = () => {

    const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert('Subscribed successfully!');
        e.currentTarget.reset();
    }
    return (

        
        <footer className="site-footer">
            <LocationTabs />
            <div className="site-footer__bg"></div>
            <div className="site-footer__top">
                <div className="container">
                    <div className="site-footer__top-inner">
                        <div className="row">
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                                <div className="footer-widget__about">
                                    <div className="footer-widget__about-logo">
                                        <Link href="/"><Image src={footerLogo} width={140} height={140} alt="logo" /></Link>
                                    </div>
                                    <p className="footer-widget__about-text">Car Is Where Early Adopters And Innovation
                                        Seekers Find Lively
                                        Imaginative Tech.</p>
                                    <form className="footer-widget__form" onSubmit={handlSubmit}>
                                        <div className="footer-widget__input">
                                            <input type="email" name='email' placeholder="Your Email" />
                                        </div>
                                        <button type="submit" className="footer-widget__btn"><i
                                            className="icon-right-arrow"></i></button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                                <div className="footer-widget__links">
                                    <h4 className="footer-widget__title">Quick links</h4>
                                    <ul className="footer-widget__links-list list-unstyled">
                                        {
                                            linkOne.map((item: LinkItem) => <motion.li
                                                initial={{ x: 40, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 0.2 * item.id,
                                                    ease: "easeOut"
                                                }}
                                                viewport={{ amount: 0.5, once: true }}
                                                key={item.id}><Link href={item.link}>{item.title}</Link></motion.li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                                <div className="footer-widget__services">
                                    <h4 className="footer-widget__title">Services</h4>
                                    <ul className="footer-widget__links-list list-unstyled">
                                        {
                                            linkTwo.map((item: LinkItem) => <motion.li
                                                initial={{ x: 40, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 0.2 * item.id,
                                                    ease: "easeOut"
                                                }}
                                                viewport={{ amount: 0.5, once: true }}
                                                key={item.id}><Link href={item.link}>{item.title}</Link></motion.li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                                <div className="footer-widget__contact">
                                    <h3 className="footer-widget__title">Contact Us</h3>
                                    <ul className="footer-widget__contact-list list-unstyled">
                                        <motion.li
                                            initial={{ x: 40, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.2,
                                                ease: "easeOut"
                                            }}
                                            viewport={{ amount: 0.5, once: true }}
                                        >
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <p>Our Locations </p>
                                        </motion.li>
                                        <motion.li
                                            initial={{ x: 40, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                ease: "easeOut"
                                            }}
                                            viewport={{ amount: 0.5, once: true }}
                                        >
                                            <div className="icon">
                                                <span className="icon-call"></span>
                                            </div>
                                            <p><a href="tel:2195550114">+1800 006 265</a></p>
                                        </motion.li>
                                        <motion.li
                                            initial={{ x: 40, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{
                                                duration: 0.9,
                                                ease: "easeOut"
                                            }}
                                            viewport={{ amount: 0.5, once: true }}
                                        >
                                            <div className="icon">
                                                <span className="icon-envelope"></span>
                                            </div>
                                            <p><a href="mailto:sales.maidstone@ukajapan.com.au">info@ukajapan.com.au</a></p>
                                        </motion.li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="site-footer__bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="site-footer__bottom-inner">
                                <div className="site-footer__copyright">
                                    <p className="site-footer__copyright-text">
                                        © 2026 UKA Japan By
                                        <a href="https://themeforest.net/user/dreamlayout"> Dreamlayout. </a>
                                        All
                                        Rights
                                        Reserved.
                                    </p>
                                </div>
                                <div className="site-footer__bottom-menu-box">
                                    <ul className="list-unstyled site-footer__bottom-menu">
                                        <li><a href="/inner/about">Terms of Service</a></li>
                                        <li><a href="/inner/about">Privacy policy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;