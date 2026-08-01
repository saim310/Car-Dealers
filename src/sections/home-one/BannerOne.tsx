"use client"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import Link from 'next/link';

interface SliderItem {
    id: number;
    bgClass: string;
}

const sliderData: SliderItem[] = [
    { id: 1, bgClass: "bgImage-1" },
    { id: 2, bgClass: "bgImage-2" },
    { id: 3, bgClass: "bgImage-3" },
];

const BannerOne: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    return (
        <section className="main-slider" id='home'>
            <div className="main-slider__carousel owl-carousel owl-theme">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    onSwiper={setSwiperInstance}
                >
                    {sliderData.map((item) => (
                        <SwiperSlide key={item.id}>
                            {/* Explicit height ensures the slide is visible even without content */}
                            <div 
                                className={`item ${item.bgClass}`} 
                                style={{ 
                                    height: '100vh', 
                                    minHeight: '600px', 
                                    position: 'relative' 
                                }}
                            >
                                {/* Background image layer - restored */}
                                <div className="main-slider__bg" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Arrows */}
                <div className="owl-nav">
                    <button
                        onClick={() => swiperInstance?.slidePrev()}
                        type="button"
                        role="presentation"
                        className="owl-prev"
                    >
                        <span className="icon-right-arrow-1"></span>
                    </button>
                    <button
                        onClick={() => swiperInstance?.slideNext()}
                        type="button"
                        role="presentation"
                        className="owl-next"
                    >
                        <span className="icon-right-arrow-1"></span>
                    </button>
                </div>
            </div>

            {/* Bottom CTA Section - Unchanged */}
           <section style={{ background: "#0F0F1B", padding: "80px 0" }}>
    <div className="container">
        <div className="row">
            <div className="col-xl-12">
                {/* Heading */}
                <h1 style={{
                    fontSize: "clamp(28px, 4vw, 42px)",
                    fontWeight: 800,
                    color: "#fff",
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                    marginBottom: "20px"
                }}>
                    Premium Japanese Car for Sale in Australia
                </h1>

                {/* Paragraph */}
                <p style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    color: "#A1A1AA",
                    maxWidth: "800px",
                    marginBottom: "35px"
                }}>
                    At UKA Japan Motors, we offer a wide selection of premium Japanese cars for sale in Australia, including reliable used cars, fuel efficient vehicles, automatic cars, and compact Japanese small cars. Whether you're looking for a family SUV or an everyday city car, we help you find the perfect Japanese car to match your lifestyle and budget.
                </p>

                {/* Horizontal Buttons */}
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px"
                }}>
                    {[
                        { text: "Apply for Finance", href: "/inner/finance/apply-for-finance", primary: true },
                        { text: "Give Us a Call", href: "tel:1800006256", primary: false },
                        { text: "Book a Test Drive", href: "/inner/contact", primary: false }
                    ].map((btn, i) => (
                        <Link
                            key={i}
                            href={btn.href}
                            style={{
                                padding: "16px 36px",
                                background: btn.primary ? "#F5B818" : "transparent",
                                color: btn.primary ? "#0F0F1B" : "#fff",
                                border: "2px solid #F5B818",
                                borderRadius: "10px",
                                fontSize: "14px",
                                fontWeight: 700,
                                textDecoration: "none",
                                textAlign: "center",
                                textTransform: "uppercase",
                                transition: "all 0.3s",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                whiteSpace: "nowrap"
                            }}
                            onMouseEnter={(e) => {
                                if (!btn.primary) {
                                    e.currentTarget.style.background = "#F5B818";
                                    e.currentTarget.style.color = "#0F0F1B";
                                } else {
                                    e.currentTarget.style.background = "#fff";
                                    e.currentTarget.style.borderColor = "#fff";
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = btn.primary ? "#F5B818" : "transparent";
                                e.currentTarget.style.color = btn.primary ? "#0F0F1B" : "#fff";
                                e.currentTarget.style.borderColor = "#F5B818";
                            }}
                        >
                            {btn.primary && <span className="icon-right-arrow" style={{ fontSize: "12px" }}></span>}
                            {btn.text}
                            {!btn.primary && <span className="icon-right-arrow" style={{ fontSize: "12px" }}></span>}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
</section>
        </section>
    );
};

export default BannerOne;
