"use client"
import React from "react";
import logo from "../../../public/assets/images/resources/footer-logo1.png"
import useGorentContext from "../context/useGorentContext";
import Link from "next/link";
import Image from "next/image";

const SideBar: React.FC = () => {
    const { isSidebar, setIsSidebar } = useGorentContext();
    const handleCloceSideBar = () => {
        setIsSidebar((pre) => !pre)
    }
    return (
        <div className={`xs-sidebar-group info-group info-sidebar ${isSidebar ? 'isActive' : ''}`}>
            <div className="xs-overlay xs-bg-black" onClick={handleCloceSideBar}></div>

            <div className="xs-sidebar-widget">
                <div className="sidebar-widget-container">
                    <div className="widget-heading">
                        <a href="#" className="close-side-widget" onClick={handleCloceSideBar}>X</a>
                    </div>

                    <div className="sidebar-textwidget">
                        <div className="sidebar-info-contents">
                            <div className="content-inner">

                                <div className="logo">
                                    <Link href="/">
                                        <Image src={logo} width={130} height={130} alt="Logo" />
                                    </Link>
                                </div>

                                <div className="content-box">
                                    <h4>About Us</h4>
                                    <div className="inner-text">
                                        <p>
                                            UKA Japan Motors is a trusted importer of premium Japanese vehicles since 1990. 
                                            We deliver quality, reliability, and exceptional customer service across Australia.
                                        </p>
                                    </div>
                                </div>

                                {/* Form */}
                                <div className="form-inner">
                                    <h4>Get a free quote</h4>

                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                placeholder="Message..."
                                            ></textarea>
                                        </div>

                                        <div className="form-group message-btn">
                                            <button
                                                type="submit"
                                                className="thm-btn form-inner__btn"
                                            >
                                                Submit Now
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Contact Info */}
                                <div className="sidebar-contact-info">
                                    <h4>Contact Info</h4>
                                    <ul className="list-unstyled">
                                        <li>
                                            <span className="icon-pin"></span>
                                            <a href="https://maps.app.goo.gl/mro1EoXZtAkH1udS8" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>MAIDSTONE</a>
                                            <span style={{ margin: '0 6px', opacity: 0.5 }}>|</span>
                                            <a href="https://maps.app.goo.gl/akeweSjyWMvCT9ji8" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>MORDIALLOC</a>
                                            <span style={{ margin: '0 6px', opacity: 0.5 }}>|</span>
                                            <a href="https://maps.app.goo.gl/JoZUKq7tq9RQTGiF6" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>BRISBANE</a>
                                        </li>
                                        <li>
                                            <span className="icon-call"></span>
                                            <a href="tel:1800006256">
                                                +1800 006 256
                                            </a>
                                        </li>
                                        <li>
                                            <span className="icon-envelope"></span>
                                            <a href="mailto:info@ukajapan.com.au">
                                                info@ukajapan.com.au
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                {/* Social */}
                                <div className="thm-social-link1">
                                    <ul className="social-box list-unstyled">
                                        <li>
                                            <a href="#"><i className="icon-facebook" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="icon-twitter" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="icon-linkedin" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="icon-instagram" /></a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;