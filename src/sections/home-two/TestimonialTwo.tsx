"use client"
import 'swiper/css';
import 'swiper/css/navigation';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import TextAnimation from '@/components/elements/TextAnimation';
import { videoTestimonials } from '@/all-content/testimonials/testimonialsData';

const TestimonialTwo: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    return (
        <section className="pure-image-testimonial" style={{ padding: '80px 0', backgroundColor: '#faf8f5' }}>
            <div className="container">
                <div className="section-title text-left" style={{ marginBottom: '40px' }}>
                    <span style={{ color: '#f5b93c', fontWeight: 600, textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>
                        Client Highlights
                    </span>
                    <h2 className="section-title__title">
                        <TextAnimation text='See What Our Clients' />
                        <TextAnimation text=' Say About Us' />
                    </h2>
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    onSwiper={setSwiperInstance}
                    speed={800}
                    modules={[Navigation, Autoplay]}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 25 },
                        1200: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                >
                    {videoTestimonials.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div style={{
                                borderRadius: '15px',
                                overflow: 'hidden',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                background: '#1a1a2e',
                                width: '100%',
                                aspectRatio: '1 / 1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <img 
                                    src={item.image} 
                                    alt={item.alt} 
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        borderRadius: '15px',
                                        display: 'block'
                                    }} 
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TestimonialTwo;
