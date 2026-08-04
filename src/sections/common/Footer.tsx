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
    external?: boolean;
}

/* ─── Quick Links synced with MainManuList ─── */
const quickLinks: LinkItem[] = [
    { id: 2, link: "/inner/products", title: "View Stock" },
    { id: 4, link: "/inner/cars?sale=true", title: "On Sale Cars" },
    { id: 7, link: "/inner/contact", title: "Contact" },
    { id: 8, link: "/inner/about", title: "About" },
    { id: 9, link: "/inner/blog", title: "Blog" },
    { id: 11, link: "/inner/faq", title: "FAQs" },
];

/* ─── Services ─── */
const serviceLinks: LinkItem[] = [
    { id: 1, link: "/inner/finance/finance-calculator", title: "Finance Calculator" },
    { id: 2, link: "/inner/finance/apply-for-finance", title: "Apply for Finance" },
    { id: 3, link: "/inner/finance/finance-information", title: "Finance Information" },
    { id: 4, link: "/inner/services", title: "Car Servicing" },
    { id: 5, link: "/inner/warranty", title: "Warranty" },
    { id: 6, link: "/inner/TradeIn", title: "Trade-In Valuation" },
];

/* ─── Social Media ─── */
const socialLinks: LinkItem[] = [
    { id: 1, link: "https://facebook.com", title: "Facebook", external: true },
    { id: 2, link: "https://instagram.com", title: "Instagram", external: true },
    { id: 3, link: "https://linkedin.com", title: "LinkedIn", external: true },
    { id: 4, link: "https://youtube.com", title: "YouTube", external: true },
];

const Footer: React.FC = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
                            {/* Column 1: Brand & Newsletter */}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                                <div className="footer-widget__about">
                                    <div className="footer-widget__about-logo">
                                        <Link href="/">
                                            <Image src={footerLogo} width={140} height={140} alt="UKA Japan Logo" />
                                        </Link>
                                    </div>
                                    <p className="footer-widget__about-text">
                                        Premium imported vehicles direct from Japan. Quality guaranteed, 
                                        competitively priced, and backed by industry-leading warranty & service.
                                    </p>
                                    <form className="footer-widget__form" onSubmit={handleSubmit}>
                                        <div className="footer-widget__input">
                                            <input type="email" name='email' placeholder="Your Email Address" required />
                                        </div>
                                        <button type="submit" className="footer-widget__btn" aria-label="Subscribe">
                                            <i className="icon-right-arrow"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Column 2: Quick Links */}
                            <div className="col-xl-2 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                                <div className="footer-widget__links">
                                    <h4 className="footer-widget__title">Quick Links</h4>
                                    <ul className="footer-widget__links-list list-unstyled">
                                        {quickLinks.map((item: LinkItem) => (
                                            <motion.li
                                                initial={{ x: 40, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.2 * item.id, ease: "easeOut" }}
                                                viewport={{ amount: 0.5, once: true }}
                                                key={item.id}
                                            >
                                                <Link href={item.link}>{item.title}</Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Column 3: Services */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                                <div className="footer-widget__services">
                                    <h4 className="footer-widget__title">Our Services</h4>
                                    <ul className="footer-widget__links-list list-unstyled">
                                        {serviceLinks.map((item: LinkItem) => (
                                            <motion.li
                                                initial={{ x: 40, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.2 * item.id, ease: "easeOut" }}
                                                viewport={{ amount: 0.5, once: true }}
                                                key={item.id}
                                            >
                                                <Link href={item.link}>{item.title}</Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Column 4: Contact */}
                            <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                                <div className="footer-widget__contact">
                                    <h4 className="footer-widget__title">Contact Us</h4>
                                    <ul className="footer-widget__contact-list list-unstyled">
                                        <motion.li
                                            initial={{ x: 40, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            viewport={{ amount: 0.5, once: true }}
                                        >
                                            <div className="icon">
                                                <span className="icon-pin"></span>
                                            </div>
                                            <p>
                                                <Link href="/inner/contact">Our Locations</Link>
                                            </p>
                                        </motion.li>
                                        <motion.li
                                            initial={{ x: 40, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            viewport={{ amount: 0.5, once: true }}
                                        >
                                            <div className="icon">
                                                <span className="icon-call"></span>
                                            </div>
                                            <p>
                                                <a href="tel:+1800006265">+1800 006 265</a>
                                            </p>
                                        </motion.li>
                                        <motion.li
                                            initial={{ x: 40, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.9, ease: "easeOut" }}
                                            viewport={{ amount: 0.5, once: true }}
                                        >
                                            <div className="icon">
                                                <span className="icon-envelope"></span>
                                            </div>
                                            <p>
                                                <a href="mailto:info@ukajapan.com.au">info@ukajapan.com.au</a>
                                            </p>
                                        </motion.li>
                                    </ul>

                                    {/* Social Icons */}
                                    <div style={{ 
                                        display: 'flex', 
                                        gap: '10px', 
                                        marginTop: '20px' 
                                    }}>
                                        {socialLinks.map((social) => (
                                            <a
                                                key={social.id}
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={social.title}
                                                style={{
                                                    width: '36px',
                                                    height: '36px',
                                                    borderRadius: '50%',
                                                    background: '#1a1a2e',
                                                    color: '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '14px',
                                                    transition: 'all 0.3s ease',
                                                    textDecoration: 'none'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#ffc107';
                                                    e.currentTarget.style.color = '#1a1a2e';
                                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#1a1a2e';
                                                    e.currentTarget.style.color = '#fff';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                <i className={`fab fa-${social.title.toLowerCase()}`}></i>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="site-footer__bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="site-footer__bottom-inner">
                                <div className="site-footer__copyright">
                                    <p className="site-footer__copyright-text">
                                        © 2026 UKA Japan. All Rights Reserved.
                                    </p>
                                </div>
                                <div className="site-footer__bottom-menu-box">
                                    <ul className="list-unstyled site-footer__bottom-menu">
                                        <li>
                                            <Link href="/inner/about">Terms of Service</Link>
                                        </li>
                                        <li>
                                            <Link href="/inner/about">Privacy Policy</Link>
                                        </li>
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