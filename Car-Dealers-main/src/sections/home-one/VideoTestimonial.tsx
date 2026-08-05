"use client"
import 'swiper/css';
import 'swiper/css/navigation';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import TextAnimation from '@/components/elements/TextAnimation';

const videoTestimonials = [
    {
        id: 1,
        videoId: "LXb3EKWsInQ",
        name: "Marco Janson",
        role: "Customer",
        text: "UKA Japan Motors made the entire import process seamless. The vehicle arrived in pristine condition and their customer service was exceptional from start to finish.",
        rating: 5,
        location: "Sydney, NSW"
    },
    {
        id: 2,
        videoId: "dQw4w9WgXcQ",
        name: "Sarah Mitchell",
        role: "Fleet Manager",
        text: "We have purchased over 15 vehicles for our company fleet. Every single car has exceeded our expectations. UKA Japan is our trusted partner for Japanese imports.",
        rating: 5,
        location: "Melbourne, VIC"
    },
    {
        id: 3,
        videoId: "M7lc1UVf-VE",
        name: "David Chen",
        role: "Car Enthusiast",
        text: "After months of research, I chose UKA Japan Motors for my dream JDM car. The transparency, pricing, and quality of service were absolutely outstanding.",
        rating: 5,
        location: "Brisbane, QLD"
    },
    {
        id: 4,
        videoId: "LXb3EKWsInQ",
        name: "Emily Thompson",
        role: "Business Owner",
        text: "Exceptional service and quality vehicles. The team went above and beyond to ensure I got exactly what I needed. Highly recommend to anyone looking for Japanese imports.",
        rating: 5,
        location: "Perth, WA"
    },
    {
        id: 5,
        videoId: "dQw4w9WgXcQ",
        name: "James Wilson",
        role: "Mechanic",
        text: "As a mechanic, I am very particular about the condition of vehicles. UKA Japan Motors consistently delivers cars that are mechanically sound and well-maintained.",
        rating: 5,
        location: "Adelaide, SA"
    },
    {
        id: 6,
        videoId: "M7lc1UVf-VE",
        name: "Lisa Park",
        role: "First-Time Buyer",
        text: "I was nervous about importing my first car, but the team at UKA Japan walked me through every step. The process was transparent and stress-free.",
        rating: 5,
        location: "Gold Coast, QLD"
    }
];

const VideoTestimonial: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    return (
        <section className="video-testimonial-one" id="video-testimonial" style={{ padding: '100px 0', backgroundColor: '#faf8f5' }}>
            <div className="container">
                {/* Section Header */}
                <div className="section-title text-left sec-title-animation animation-style2" style={{ marginBottom: '50px' }}>
                    <span className="section-title__tagline" style={{ 
                        color: '#f5b93c', 
                        fontWeight: 600, 
                        textTransform: 'uppercase', 
                        fontSize: '14px', 
                        letterSpacing: '2px',
                        display: 'block',
                        marginBottom: '10px'
                    }}>
                        Video Testimonials
                    </span>
                    <h2 className="section-title__title title-animation">
                        <TextAnimation text='See What Our Clients' />
                        <TextAnimation text=' Say About Us' />
                    </h2>
                </div>

                {/* Carousel - 3 Per Row */}
                <div className="video-testimonial__carousel">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        onSwiper={setSwiperInstance}
                        speed={1000}
                        modules={[Navigation, Autoplay]}
                        breakpoints={{
                            640: { slidesPerView: 1, spaceBetween: 20 },
                            768: { slidesPerView: 2, spaceBetween: 25 },
                            1200: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                    >
                        {videoTestimonials.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="video-testimonial__single" style={{
                                    background: '#ffffff',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 50px rgba(0,0,0,0.06)',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {/* Video Thumbnail with Play Overlay */}
                                    <div className="video-testimonial__media" style={{
                                        position: 'relative',
                                        paddingTop: '56.25%', /* 16:9 Aspect Ratio */
                                        background: '#1a1a1a',
                                        overflow: 'hidden'
                                    }}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${item.videoId}?rel=0&modestbranding=1&controls=1`}
                                            title={`Video testimonial by ${item.name}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{ 
                                                position: 'absolute', 
                                                top: 0, 
                                                left: 0, 
                                                width: '100%', 
                                                height: '100%', 
                                                border: 'none' 
                                            }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="video-testimonial__content" style={{
                                        padding: '30px 25px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flex: 1,
                                        position: 'relative'
                                    }}>
                                        {/* Quote Icon */}
                                        <div style={{ marginBottom: '15px' }}>
                                            <span className="icon-quote" style={{ 
                                                fontSize: '36px', 
                                                color: '#f5b93c',
                                                opacity: 0.9
                                            }}></span>
                                        </div>

                                        {/* Testimonial Text */}
                                        <p style={{
                                            fontSize: '15px',
                                            lineHeight: '1.7',
                                            color: '#555',
                                            marginBottom: '20px',
                                            fontStyle: 'italic',
                                            flex: 1
                                        }}>
                                            &ldquo;{item.text}&rdquo;
                                        </p>

                                        {/* Client Info */}
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'space-between',
                                            marginTop: 'auto'
                                        }}>
                                            <div>
                                                <h4 style={{ 
                                                    margin: 0, 
                                                    fontSize: '17px', 
                                                    color: '#1a1a1a', 
                                                    fontWeight: 700 
                                                }}>
                                                    {item.name}
                                                </h4>
                                                <p style={{ 
                                                    margin: '3px 0 0', 
                                                    color: '#f5b93c', 
                                                    fontWeight: 600,
                                                    fontSize: '12px',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}>
                                                    {item.role}
                                                </p>
                                                <p style={{ 
                                                    margin: '3px 0 0', 
                                                    color: '#999', 
                                                    fontSize: '12px' 
                                                }}>
                                                    {item.location}
                                                </p>
                                            </div>

                                            {/* Star Rating */}
                                            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                                                {Array.from({ length: item.rating }).map((_, i) => (
                                                    <span key={i} className="icon-star" style={{ 
                                                        color: '#f5b93c', 
                                                        fontSize: '14px' 
                                                    }}></span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Buttons - Positioned Top Right */}
                    <div className="owl-nav" style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        gap: '12px', 
                        marginTop: '40px' 
                    }}>
                        <button 
                            type="button" 
                            className="owl-prev"
                            onClick={() => swiperInstance?.slidePrev()}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: '2px solid #f5b93c',
                                background: '#ffffff',
                                color: '#f5b93c',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f5b93c';
                                e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#ffffff';
                                e.currentTarget.style.color = '#f5b93c';
                            }}
                        >
                            <span className="far fa-long-arrow-left"></span>
                        </button>
                        <button 
                            type="button" 
                            className="owl-next"
                            onClick={() => swiperInstance?.slideNext()}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                border: '2px solid #f5b93c',
                                background: '#f5b93c',
                                color: '#ffffff',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#ffffff';
                                e.currentTarget.style.color = '#f5b93c';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#f5b93c';
                                e.currentTarget.style.color = '#ffffff';
                            }}
                        >
                            <span className="far fa-long-arrow-right"></span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoTestimonial;