"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import brand1 from "../../../public/assets/images/brand/brand-1-1.png";
import brand2 from "../../../public/assets/images/brand/brand-1-2.png";
import brand3 from "../../../public/assets/images/brand/brand-1-3.png";
import brand4 from "../../../public/assets/images/brand/brand-1-4.png";
import brand5 from "../../../public/assets/images/brand/brand-1-5.png";
import brand6 from "../../../public/assets/images/brand/brand-1-6.png";
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

type BrandItem = {
    id: number;
    image: string | StaticImageData;
    link: string;
};
const brandData: BrandItem[] = [
    {
        id: 1,
        image: "/assets/images/brand/brand-1-1.png",
        link: "/inner/products?category=SUV",
    },
    {
        id: 2,
        image: "/assets/images/brand/brand-1-2.png",
        link: "/inner/products?category=Sedan",
    },
    {
        id: 3,
        image: "/assets/images/brand/brand-1-3.png",
        link: "/inner/products?category=Hatchback",
    },
    {
        id: 4,
        image: "/assets/images/brand/brand-1-4.png",
        link: "/inner/products?category=Van",
    },
    {
        id: 5,
        image: "/assets/images/brand/brand-1-5.png",
        link: "/inner/products?category=Hybrid",
    },
    {
        id: 6,
        image: "/assets/images/brand/brand-1-6.png",
        link: "/inner/products?category=Car",
    },
];

const BrandThree: React.FC = () => {
    return (
        <section className="brand-one brand-three">
            <div className="container">
                <div className="brand-one__carousel owl-theme  ">
                    <Swiper modules={[Autoplay]}
                        spaceBetween={30}
                        slidesPerView={6}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: false,
                        }}
                        speed={1000}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            492: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1000: {
                                slidesPerView: 5,
                            },
                            1200: {
                                slidesPerView: 6,
                            },
                        }}>
                        {brandData.map((brand) => (
                            <SwiperSlide key={brand?.id}>
                                <div className="item" >
                                    <div className="brand-one__single">
                                        <div className="brand-one__img">
                                            <Link href={brand?.link}>
                                                <Image src={brand?.image} width={155} height={30} alt={`brand-${brand?.id}`} />
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

export default BrandThree;
