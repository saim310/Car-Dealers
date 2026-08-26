"use client"
import 'swiper/css';
import 'swiper/css/navigation';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import TextAnimation from '@/components/elements/TextAnimation';

// Yahan apni images ke path dal dein
const testimonialImages = [
    { id: 1, image: "/assets/images/testimonial/test1.jpeg", alt: "Testimonial 1" },
    { id: 2, image: "/assets/images/testimonial/test2.jpeg", alt: "Testimonial 2" },
    { id: 3, image: "/assets/images/testimonial/test3.jpeg", alt: "Testimonial 3" },
    { id: 4, image: "/assets/images/testimonial/test4.jpeg", alt: "Testimonial 4" },
    { id: 5, image: "/assets/images/testimonial/test5.jpeg", alt: "Testimonial 5" },
    { id: 6, image: "/assets/images/testimonial/test6.jpeg", alt: "Testimonial 6" },
    { id: 7, image: "/assets/images/testimonial/test7.jpeg", alt: "Testimonial 7" },
    { id: 8, image: "/assets/images/testimonial/test8.jpeg", alt: "Testimonial 8" },
    { id: 9, image: "/assets/images/testimonial/test9.jpeg", alt: "Testimonial 9" },
    { id: 10, image: "/assets/images/testimonial/test10.jpeg", alt: "Testimonial 10" },
    { id: 11, image: "/assets/images/testimonial/test11.jpeg", alt: "Testimonial 11" },
    { id: 12, image: "/assets/images/testimonial/test12.jpeg", alt: "Testimonial 12" },
    { id: 13, image: "/assets/images/testimonial/test13.jpeg", alt: "Testimonial 13" },
    { id: 14, image: "/assets/images/testimonial/test14.jpeg", alt: "Testimonial 14" },
    { id: 15, image: "/assets/images/testimonial/test15.jpeg", alt: "Testimonial 15" },



];


const PureImageTestimonial: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    return (
        <section className="pure-image-testimonial" style={{ padding: '80px 0', backgroundColor: '#faf8f5' }}>
            <div className="container">
                {/* Section Header */}
                <div className="section-title text-left" style={{ marginBottom: '40px' }}>
                    <span style={{ color: '#f5b93c', fontWeight: 600, textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px', display: 'block', marginBottom: '10px' }}>
                        Client Highlights
                    </span>
                    <h2 className="section-title__title">
                        <TextAnimation text='See What Our Clients' />
                        <TextAnimation text=' Say About Us' />
                    </h2>
                </div>

                {/* Swiper Carousel for Clean Images */}
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
                    {testimonialImages.map((item) => (
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
            borderRadius: '15px', // Yeh direct image ke corners ko bhi round kar dega
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

export default PureImageTestimonial;
