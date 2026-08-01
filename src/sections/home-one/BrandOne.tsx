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
};
const brandData: BrandItem[] = [
    {
        id: 1,
        image: brand1,
        link: "/inner/products?category=Sedan",
    },
    {
        id: 2,
        image: brand2,
	link: "/inner/products?category=SUV",
    },
    {
        id: 3,
        image: brand3,
        link: "/inner/products?category=Hatchback",
    },
    {
        id: 4,
        image: brand4,
        link: "/inner/products?category=van",
    },
    {
        id: 5,
        image: brand5,
        link: "/inner/products?category=Hybrid",
    },
   
    {
        id: 7,
        image: brand3,
        link: "#",
    },
    {
        id: 8,
        image: brand2,
        link: "#",
    },
];

const BrandOne: React.FC = () => {
    return (
        <section className="brand-one">
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
                            <SwiperSlide key={brand.id}>
                                <div className="item" >
                                    <div className="brand-one__single">
                                        <div className="brand-one__img">
                                            <Link href={brand.link}>
                                                <Image src={brand.image} width={130} height={130} alt={`brand-${brand.id}`} />
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
