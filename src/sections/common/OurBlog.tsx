"use client"
import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from "next/image";
import TextAnimation from "../../components/elements/TextAnimation";
import { blogData } from "../../all-content/blog/blogData";
import { BlogItem } from "../../all-content/blog/blogType";
import Link from "next/link";

const OurBlog: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    return (
        <section className="blog-one" id="blog">
            <div className="blog-one__shape-1"></div>
            <div className="blog-one__shape-2"></div>
            <div className="container">
                {/* Section Title */}
                <div className="section-title text-left sec-title-animation animation-style2">
                   
                    <h2 className="section-title__title title-animation">
                        <TextAnimation text="Our Latest Blog" />
                    </h2>
                </div>
                {/* Blog Carousel */}
                <div className="blog-one__carousel owl-carousel owl-theme owl-loaded owl-drag">
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
                        {blogData.map((blog: BlogItem) => (
                            <SwiperSlide key={blog.id}>
                                <div className="item">
                                    <div className="blog-one__single">
                                        <div className="blog-one__img-box">
                                            <div className="blog-one__img">
                                                {
                                                    blog.image && (<Image src={blog.image} width={370} height={250} alt={blog.title} />) 
                                                }
                                                <div className="blog-one__tags">
                                                    <span>{blog?.tag}</span>
                                                </div>
                                            </div>
                                            <div className="blog-one__date">
                                                <p>{blog.day}</p>
                                                <span>{blog.month}</span>
                                            </div>
                                        </div>
                                        <div className="blog-one__content">
                                            <ul className="blog-one__meta list-unstyled">
                                                <li>
                                                    <Link href={blog.link}>
                                                        <span className="fas fa-user"></span>
                                                        {blog.author}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={blog.link}>
                                                        <span className="fas fa-comments"></span>
                                                        {blog.commentsText}
                                                    </Link>
                                                </li>
                                            </ul>
                                            <h3 className="blog-one__title">
                                                <Link href={blog.link}>{blog.title}</Link>
                                            </h3>
                                            <p className="blog-one__text">{blog.description}</p>
                                            <Link href={blog.link} className="blog-one__read-more">
                                                Read More <span className="fas fa-arrow-right"></span>
                                            </Link>
                                        </div>
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
        </section>
    );
};

export default OurBlog;
