"use client"
import React from "react";
import aboutImgOne from "../../../public/assets/images/resources/about-one-img-1.jpeg";
import aboutImgTwo from "../../../public/assets/images/resources/about-one-img-2.jpeg";
import shapeOne from "../../../public/assets/images/shapes/about-one-shape-1.png"; 
import shapeTwo from "../../../public/assets/images/shapes/about-one-shape-2.png";
import shapeThree from "../../../public/assets/images/shapes/about-one-shape-3.png";
import shapeFour from "../../../public/assets/images/shapes/about-one-shape-4.png";
import { motion } from "framer-motion"; 
import Image from "next/image";
import TextAnimation from "@/components/elements/TextAnimation";
import Progresbar from "@/components/elements/Progressbar";
import Link from "next/link";
import AdvanceCountUp from "@/components/elements/AdvanceCountUp";

// Star Rating Component for Customer Satisfaction
const StarRating: React.FC<{ value: number; maxStars?: number }> = ({ 
  value, 
  maxStars = 5 
}) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  
  for (let i = 0; i < maxStars; i++) {
    if (i < fullStars) {
      // Full star
      stars.push(
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    } else if (i === fullStars && hasHalfStar) {
      // Half star
      stars.push(
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id={`halfStar-${i}`}>
              <stop offset="50%" stopColor="#FFB800"/>
              <stop offset="50%" stopColor="#E0E0E0"/>
            </linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={`url(#halfStar-${i})`}/>
        </svg>
      );
    } else {
      // Empty star
      stars.push(
        <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#E0E0E0" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      );
    }
  }

  return (
    <div className="star-rating" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {stars}
      <span style={{ marginLeft: '8px', fontWeight: 600, color: '#333' }}>{value}/5</span>
    </div>
  );
};

const AboutOne: React.FC = () => {
  return (
    <section className="about-one" id="about">
      <div className="container">
        <div className="row">
          {/* Left Side */}
          <div className="col-xl-6">
            <motion.div
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
              viewport={{ amount: 0.01, once: true }}
              className="about-one__left wow slideInLeft"
            >
              <div className="about-one__img-box">
                <div className="about-one__img">
                  <Image src={aboutImgOne} width={450} height={350} alt="About main" />
                </div>

                <div className="about-one__shape-2 float-bob-y">
                  <Image src={shapeTwo} width={115} height={115}  alt="shape" />
                </div>

                <div className="about-one__shape-1">
                  <Image src={shapeOne} width={315} height={382} alt="shape" />
                </div>

                <div className="about-one__shape-4 float-bob-x">
                  <Image src={shapeFour} width={372} height={114} alt="shape" />
                </div>

                <div className="about-one__shape-3 float-bob-x">
                  <Image src={shapeThree} width={332} height={186} alt="shape" />
                </div>

                <div className="about-one__img-2">
                  <Image src={aboutImgTwo} width={450} height={350} alt="About secondary" />
                </div>

                <div className="about-one__experience">
                  <div className="about-one__experience-count">
                    <h3 className="odometer" data-count="50">
                      <AdvanceCountUp ending={50} />
                    </h3>
                    <span>+</span>
                  </div>
                  <p className="about-one__experience-text">
                    Years of <br /> Experience
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="col-xl-6">
            <div className="about-one__right">
              <div className="section-title text-left sec-title-animation animation-style1">
                <h2 className="section-title__title title-animation">
                  <TextAnimation text="Welcome to UKA " />
                  <TextAnimation text="JAPAN MOTORS" />
                </h2>
              </div>

              <p className="about-one__text-1">
                Committed to providing our customers with
                <br />
                ultimate service.
              </p>

              <p className="about-one__text-2">
                Lorem ipsum is simply dummy text of the printing and
                typesetting industry and has been the industrys standard.
              </p>

              <ul className="about-one__progress-box list-unstyled">
                {/* Customer Satisfaction - Star Rating */}
                <li className="progress-item" style={{ marginBottom: '20px' }}>
                  <div className="progress-title" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '8px',
                    fontWeight: 600,
                    color: '#333'
                  }}>
                    <span>Customer Satisfaction</span>
                  </div>
                  <StarRating value={4.5} />
                </li>

                {/* Vehicle's Quality - Percentage Progress Bar */}
                <Progresbar title="Vehicle's Quality" value={70} />
              </ul>

              <div className="about-one__btn-box-and-call-box">
                <div className="about-one__btn-box">
                  <Link href="/inner/about" className="about-one__btn thm-btn">
                    All Stock 
                    <span className="fas fa-arrow-right"></span>
                  </Link>
                </div>

                <div className="about-one__call-box">
                  <div className="about-one__call-box-icon">
                    <span className="icon-call-2"></span>
                  </div>
                  <div className="about-one__call-box-content">
                    <p>Call to Anytime</p>
                    <h4>
                      <a href="tel:15502505260">
                        +1800 006 256
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Right */}
        </div>
      </div>
    </section>
  );
};

export default AboutOne;