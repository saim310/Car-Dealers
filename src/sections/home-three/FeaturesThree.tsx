"use client";
import React from 'react';
import { motion } from "framer-motion"
import Link from 'next/link';

interface FeatureItem {
    id: number;
    title: string;
    description: string;
    buttonText: string;
    link: string;
}

const featureItems: FeatureItem[] = [
    {
        id: 1,
        title: "Are You Looking \nFor a Car ?",
        description: "Lorem ipsum is simply ipun txns mane so dummy text of free available in market the printing and typesetting industry",
        buttonText: "Get Started",
        link: "/inner/contact",
    },
    {
        id: 2,
        title: "Do You Want to \nRent a Car ?",
        description: "Lorem ipsum is simply ipun txns mane so dummy text of free available in market the printing and typesetting industry",
        buttonText: " Get Started",
        link: "/inner/car-list-v-1",
    },
];


const FeaturesThree: React.FC = () => {
    return (
        <section className="feature-one feature-two">
            <div className="container">
                <div className="feature-one__inner">
                    <div className="row">
                        {featureItems.map((item) => (
                            <motion.div
                                initial={{ x: item?.id % 2 === 0 ? 90 : -90, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 1,
                                    ease: "easeOut"
                                }}
                                viewport={{ amount: 0.1, once: true }}
                                className="col-xl-6 col-lg-6" key={item?.id}>
                                <div className={`feature-one__inner-single ${item?.id === 2 ? "feature-one__inner-single--two" : ""}`} >
                                    <div className={`feature-one__inner-single-bg bgImage-${item?.id}`}></div>
                                    <h3 className="feature-one__inner-title">
                                        {item?.title.split("\n").map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </h3>
                                    <p className="feature-one__inner-text">
                                        {item?.description}
                                    </p>
                                    <div className="feature-one__inner-btn-box">
                                        <Link href={item?.link} className="thm-btn">
                                            {item?.buttonText}
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesThree;
