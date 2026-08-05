"use client"
import React, { useState } from "react"; 
import shape1 from "../../../public/assets/images/shapes/testimonial-two-shape-1.png";
import shape2 from "../../../public/assets/images/shapes/testimonial-two-shape-2.png"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules'; 
import Image from "next/image";
import TextAnimation from "@/components/elements/TextAnimation";
import { testimonialsTwo } from "@/all-content/testimonials/testimonialsData";
import Link from "next/link";


const TestimonialTwo: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    return (
        <section className="testimonial-two">
            <div className="testimonial-two__shape-1 float-bob-y">
                <Image src={shape1} width={665} height={520} alt="" />
            </div>

            <div className="testimonial-two__shape-2 float-bob-x">
                <Image src={shape2} width={665} height={520} alt="" />
            </div>

            <div className="container">
                <div className="section-title text-left sec-title-animation animation-style2">
                  

                    <h2 className="section-title__title title-animation">
                        <TextAnimation text="What Peoples Say" />
                        <TextAnimation text="about UKA Japan" />
                    </h2>
                </div>
                <div className="testimonial-two__carousel owl-carousel owl-theme">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        onSwiper={setSwiperInstance}
                        speed={1000}
                        modules={[Navigation, Autoplay]}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 10 },
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                    >
                        {testimonialsTwo.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="item" >
                                    <div className="testimonial-two__single">
                                        <div className="testimonial-two__quote">
                                            <span className="icon-quote"></span>
                                        </div>

                                        <div className="testimonial-two__img">
                                            <Image src={item.image} alt={item.name} />
                                        </div>

                                        <p className="testimonial-two__text">{item.text}</p>

                                        <div className="testimonial-two__client-info">
                                            <div className="testimonial-two__client-content">
                                                <h4 className="testimonial-two__client-name">
                                                    <Link href={item.link}>{item.name}</Link>
                                                </h4>
                                                <p className="testimonial-two__client-sub-title">
                                                    {item.role}
                                                </p>
                                            </div>

                                            <div className="testimonial-two__rating">
                                                {[...Array(5)].map((_, i) => (
                                                    <span className="icon-star" key={i}></span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="owl-nav" style={{ zIndex: '105' }}>
                        <button type="button"
                            className="owl-prev rotate180"
                            onClick={() => swiperInstance?.slidePrev()}
                        >
                            <span className="far fa-long-arrow-left"></span>
                        </button>
                        <button type="button" className="owl-next"
                            onClick={() => swiperInstance?.slideNext()}
                        >
                            <span className="far fa-long-arrow-right"></span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialTwo;
