"use client"
import React from "react"; 
import { motion } from "framer-motion" 
import counterImg1 from "../../../public/assets/images/resources/counter-one-img-1.jpg";
import counterImg2 from "../../../public/assets/images/resources/counter-one-img-2.jpg";
import counterDot1 from "../../../public/assets/images/shapes/counter-one-dot-1.png";
import counterDot2 from "../../../public/assets/images/shapes/counter-one-dot-2.png"; 
import Image from "next/image";
import Link from "next/link";
import TextAnimation from "@/components/elements/TextAnimation";
import { counterData, whyChooseData } from "@/all-content/why-choose/chooseData";
import { CounterItem, WhyChooseItem } from "@/all-content/why-choose/chooseType";
import AdvanceCountUp from "@/components/elements/AdvanceCountUp";

const WhychooseOne: React.FC = () => {
    return (
        <>
            <section className="why-choose-one">
                <div className="why-choose-one__shape-1"></div>
                <div className="why-choose-one__shape-2"></div>
                <div className="container">
                    <div className="section-title text-center sec-title-animation animation-style2">
                      
                        <h2 className="section-title__title title-animation">
                            <TextAnimation text="Delivering Quality Japanese " />
                            <TextAnimation text="Cars with Confidence" />
                        </h2>
                    </div>
                    <div className="row">
                        {
                            whyChooseData.map((item: WhyChooseItem, i) => <motion.div key={i} className="col-xl-4 col-lg-6 col-md-6 "
                                initial={{ y: item?.id % 2 === 0 ? 20 : -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.2 * (i + 1),
                                    ease: "easeOut"
                                }}
                                viewport={{ amount: 0.5, once: true }}
                            >
                                <div className="why-choose-one__single">
                                    <div className="why-choose-one__icon">
                                        <span className={item?.icon}></span>
                                    </div>
                                    <div className="why-choose-one__single-inner">
                                        <h3 className="why-choose-one__title">{item?.title}</h3>
                                        <p className="why-choose-one__text">{item?.text} </p>
                                    </div>
                                    <div className="why-choose-one__btn-box">
				<Link href={item.link || "#"} className="thm-btn">                                     
			 Get Started<span className="fas fa-arrow-right"></span> </Link>
                                    </div>
                                </div>
                            </motion.div>)
                        }
                    </div>
                </div>
            </section>
            {/* <section className="counter-one">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="counter-one__left">
                                <div className="section-title text-left sec-title-animation animation-style1">
                                    <div className="section-title__tagline-box">
                                        <div className="section-title__tagline-shape">
                                            <Image src={sectionTitleShape} width={70} height={21} loading="eager" alt="" />
                                        </div>
                                        <span className="section-title__tagline">fun facts</span>
                                    </div>
                                    <h2 className="section-title__title title-animation">
                                        <TextAnimation text="experience freedom on" />
                                        <TextAnimation text="our car booking service" />
                                    </h2>
                                </div>
                                <p className="counter-one__text">Dominion fowe there light she does lights begining subdue
                                    without run saying <br /> moving winger Open multipy a green form lesser</p>
                                <div className="counter-one__main-content">
                                    <ul className="list-unstyled counter-one__list">
                                        {
                                            counterData.map((item: CounterItem, i) => <motion.li
                                                initial={{ x: item?.id % 2 === 0 ? 30 : -30, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 0.2 * i + 1,
                                                    ease: "easeOut"
                                                }}
                                                viewport={{ amount: 0.01, once: true }}
                                                key={i}>
                                                <div className="counter-one__single">
                                                    <div className="counter-one__shape-1"></div>
                                                    <div className="counter-one__shape-2"></div>
                                                    <div className="counter-one__single-inner">
                                                        <div className="counter-one__icon">
                                                            <span className={item.icon}></span>
                                                        </div>
                                                        <div className="counter-one__count-box">
                                                            <h3 className="odometer"><AdvanceCountUp ending={item?.count} /></h3>
                                                            <span>{item?.suffix}</span>
                                                        </div>
                                                        <p className="counter-one__count-text">{item?.text}</p>
                                                    </div>
                                                </div>
                                            </motion.li>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <motion.div
                                initial={{ x: 70, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut"
                                }}
                                viewport={{ amount: 0.01, once: true }}
                                className="counter-one__right">
                                <div className="counter-one__img-box">
                                    <div className="counter-one__img ">
                                        <Image src={counterImg1} width={570} height={600} loading="eager" alt="" />
                                    </div>
                                    <div className="counter-one__img-two ">
                                        <Image src={counterImg2} width={570} height={600} loading="eager" alt="" />
                                    </div>
                                    <div className="counter-one__dot-1">
                                        <Image src={counterDot1} width={68} height={236} loading="eager" alt="" />
                                    </div>
                                    <div className="counter-one__dot-2 float-bob-y">
                                        <Image src={counterDot2} width={68} height={236} loading="eager" alt="" />
                                    </div> 
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
};

export default WhychooseOne;
