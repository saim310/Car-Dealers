"use client";
import React from 'react';
import { motion } from "framer-motion" 
import imageOne from "../../../public/assets/images/resources/banner-one-img-1.png" 
import TypingEffect from '@/components/elements/TypingEffect';
import Link from 'next/link';
import Image from 'next/image';
const BannerThree: React.FC = () => { 
    return (
        <section className="banner-one" id='home'>
            <div className="banner-one__shape-bg" ></div>
            <div className="banner-one__shape-1">
                <div className="banner-one__shape-1-bg" ></div>
            </div>
            <div className="banner-one__shape-2"></div>
            <div className="container">
                <div className="banner-one__inner">
                    <div className="banner-one__content">
                        <p className="banner-one__sub-title">100% Trusted car rental platform in the World</p>
                        <h2 className="banner-one__title">
                            Find Your Best Dream
                            <br />
                            <span> Car for </span> 
                            <span className="typed-effect" >
                                <TypingEffect stringArray={['Rental', 'Booking']} />
                            </span>
                        </h2>
                        <p className="banner-one__text">Lorem ipsum is simply ipun txns mane so dummy text of free
                            available in market <br /> the printing and typesetting industry has been the industrys
                            standard dummy <br /> text ever. Open multipy a green form lesser their from in made herb
                            multiply.</p>
                        <div className="banner-one__btn-box">
                            <Link href="/inner/about" className="thm-btn">Read More<span className="fas fa-arrow-right"></span></Link>
                        </div>
                    </div>
                    <motion.div className="banner-one__img-one"
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{
                            duration: 1.5,
                            ease: "easeOut"
                        }}
                        viewport={{ amount: 0.1, once: true }}
                    >
                        <Image src={imageOne} width={600} height={400} alt="Image" className="float-bob-y" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BannerThree;