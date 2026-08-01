"use client"
import React from 'react';
import { motion } from "framer-motion"
import Icon1 from "../../../public/assets/images/icon/download-app-img1.png"
import Icon2 from "../../../public/assets/images/icon/download-app-img2.png"
import DownloadAppImg from "../../../public/assets/images/resources/download-app-img-1.png"
import DownloadAppImg2 from "../../../public/assets/images/resources/download-app-car-img-1.png" 
import Link from 'next/link';
import Image from 'next/image';
import TextAnimation from '@/components/elements/TextAnimation';

const DownloadApp: React.FC = () => {
    return (
        <section className="download-app-one">
            <div className="download-app-one__bg " ></div>
            <div className="container">
                <div className="download-app-one__inner">
                    <div className="row">
                        <div className="col-xl-7 col-lg-7">
                            <div className="download-app-one__content sec-title-animation animation-style2">
                                <p className="download-app-one__sub-title">Download Our App</p>
                                <h2 className="download-app-one__title title-animation">
                                    <TextAnimation text='UKA Japan User Friendly' />
                                    <TextAnimation text='App Available' />
                                </h2>
                                <p className="download-app-one__text">Get our mobile app for easy and convenient usage</p>
                                <div className="download-app-one__google-and-app-store">
                                    <Link href="/inner/contact"><Image src={Icon1} width={130} height={30} alt="Image" /></Link>
                                    <Link href="/inner/contact"><Image src={Icon2} width={130} height={30} alt="Image" /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5">
                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    ease: "easeOut"
                                }}
                                viewport={{ amount: 0.1, once: true }}
                                className="download-app-one__right">
                                <div className="download-app-one__img">
                                    <div className="download-app-one__img1">
                                        <Image src={DownloadAppImg} width={470} height={445} alt="Image" />
                                    </div>
                                </div>
                                <div className="download-app-one-car__img float-bob-x">
                                    <Image src={DownloadAppImg2} width={420} height={230} alt="Image" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadApp;