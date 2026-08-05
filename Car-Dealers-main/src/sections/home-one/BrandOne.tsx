"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image, { StaticImageData } from 'next/image';
import { Autoplay } from 'swiper/modules';
import brand1 from "../../../public/assets/images/brand/brand-1-1.jpeg";
import brand2 from "../../../public/assets/images/brand/brand-1-2.jpeg";
import brand3 from "../../../public/assets/images/brand/brand-1-3.jpeg";
import brand4 from "../../../public/assets/images/brand/brand-1-4.png";
import brand5 from "../../../public/assets/images/brand/brand-1-5.jpeg";
import Link from 'next/link';

type BrandItem = {
    id: number;
    image: string | StaticImageData;
    link: string;
    label: string;
};

const brandData: BrandItem[] = [
    { id: 1, image: brand1, link: "/inner/products?category=Hatchback", label: "Hatchback" },
    { id: 2, image: brand2, link: "/inner/products?category=Van", label: "Van / Minibus" },
    { id: 3, image: brand3, link: "/inner/products?category=Wagon", label: "Station Wagon" },
    { id: 4, image: brand4, link: "/inner/products?category=Sedan", label: "Sedan" },
    { id: 5, image: brand5, link: "/inner/products?category=SUV", label: "SUV / Crossover" },
    { id: 6, image: brand3, link: "/inner/products?category=Wagon", label: "Station Wagon" },
];

const BrandOne: React.FC = () => {
    return (
        <section className="brand-one" style={{ padding: '40px 0' }}>
            <div className="container">
                <div className="brand-one__carousel owl-theme">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={2}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        speed={1000}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 12,
                            },
                            480: {
                                slidesPerView: 3,
                                spaceBetween: 16,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 5,
                                spaceBetween: 24,
                            },
                            1200: {
                                slidesPerView: 6,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {brandData.map((brand) => (
                            <SwiperSlide key={brand.id}>
                                <div className="item" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div className="brand-one__single">
                                        <div className="brand-one__img" style={{ textAlign: 'center' }}>
                                            <Link href={brand.link} aria-label={brand.label}>
                                                <Image 
                                                    src={brand.image} 
                                                    width={130} 
                                                    height={130} 
                                                    alt={brand.label}
                                                    style={{ 
                                                        width: '100%', 
                                                        height: 'auto', 
                                                        maxWidth: 'clamp(80px, 12vw, 130px)',
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default BrandOne;    