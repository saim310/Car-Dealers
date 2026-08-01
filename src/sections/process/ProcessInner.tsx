"use client";
import React from "react";
import { motion } from "framer-motion"
import Image from "next/image";
import TextAnimation from "@/components/elements/TextAnimation";
import { processSteps } from "@/all-content/process/prosessdata";
import { ProcessStep } from "@/all-content/process/prosessType";

interface ProcessProps {
    sectionClass?: string;
}
const ProcessInner: React.FC<ProcessProps> = ({ sectionClass = "" }) => {

    return (
        <section className={`process-one ${sectionClass}`}>
            <div className="container">
                <div className="section-title text-center sec-title-animation animation-style2">
                  
                    <h2 className="section-title__title title-animation">
                        <TextAnimation text="Car Rental Process" />
                    </h2>
                </div>

                <div className="row">
                    {processSteps.map((step: ProcessStep, i) => (
                        <motion.div
                            initial={{ y: 80, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.3 * i,
                                ease: "easeOut"
                            }}
                            viewport={{ amount: 0.01, once: true }}
                            key={step.id}
                            className={`col-xl-3 col-lg-6 col-md-6 wow `}
                        >
                            <div className="process-one__single">
                                <div className={`process-one__single-bg bgImage-${step?.id}`}></div>

                                <div className="process-one__icon-box">
                                    <div className="process-one__icon-shape"></div>
                                    <div className="process-one__icon">
                                        <span className={step.icon}></span>
                                    </div>
                                    <div className="process-one__count"></div>
                                </div>

                                <h3 className="process-one__title">{step.title}</h3>
                                <p className="process-one__text">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessInner;
