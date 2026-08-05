"use client";
import React, { useState } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules'; 
import taglineShape from '../../../public/assets/images/shapes/section-title-tagline-shape-1.png';
import Image from 'next/image';
import TextAnimation from '@/components/elements/TextAnimation';
import Link from 'next/link';
import { testimonialsDataThree } from '@/all-content/testimonials/testimonialsData';
import { TestimonialThree } from '@/all-content/testimonials/testimonialsType';

const TestimonialsThree: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    return (
        <section className="testimonial-three">
            <div className="container">
                <div className="row">
                    {/* Left */}
                    <div className="col-xl-5 col-lg-5">
                        <div className="testimonial-three__left">
                            <div className="section-title text-left sec-title-animation animation-style2">
                                <div className="section-title__tagline-box">
                                    <div className="section-title__tagline-shape">
                                        <Image src={taglineShape} width={70} height={21} alt="Tagline Shape" />
                                    </div>
                                    <span className="section-title__tagline">
                                        Our Testimonial
                                    </span>
                                </div>
                                <h2 className="section-title__title title-animation">
                                    <TextAnimation text='What Peoples Say' />
                                    <TextAnimation text='about UKA Japan' />
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="col-xl-7 col-lg-7">
                        <div className="testimonial-three__right">
                            <div className="testimonial-three__carousel owl-theme owl-carousel">
                                <Swiper
                                    slidesPerView={2}
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
                                        0: { slidesPerView: 1, spaceBetween: 10 },
                                        770: { slidesPerView: 2, spaceBetween: 10 }, 
                                    }}
                                >
                                    {testimonialsDataThree.map((item:TestimonialThree) => (
                                        <SwiperSlide key={item?.id}>
                                            <div className="item" key={item?.id}>
                                                <div className="testimonial-three__single">
                                                    <div className="testimonial-three__img">
                                                        <Image src={item?.image} width={90} height={90} alt={item?.name} />
                                                        <div className="testimonial-three__rating">
                                                            {Array.from({
                                                                length: item?.rating,
                                                            }).map((_, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="fas fa-star"
                                                                ></span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="testimonial-three__client-info">
                                                        <div className="testimonial-three__client-content">
                                                            <h4 className="testimonial-three__client-name">
                                                                <Link href="/inner/testimonials">
                                                                    {item?.name}
                                                                </Link>
                                                            </h4>
                                                            <p className="testimonial-three__client-sub-title">
                                                                {item?.role}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="testimonial-three__text">
                                                        {item?.text}
                                                    </p>
                                                </div>

                                                <div className="testimonial-three__quote">
                                                    <span className="icon-quote"></span>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div className="owl-nav" style={{ zIndex: '105' }}>
                                    <button type="button"
                                        className="owl-prev"
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
                    </div>
                    {/* End Right */}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsThree;
