"use client"
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from 'swiper';   
import { productsList } from "@/all-content/products/productData";
import Image from "next/image";
 
const NavForSlider: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null); 
    
    return (
        <div className="slider-container">
            <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                onSwiper={setSwiperInstance}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                speed={600}
                loop={true}
                spaceBetween={10}
                className="main-swiper"
            >
                {productsList.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="product-details__img">
<Image src={product?.image || '/assets/images/brand/brand-1-1.png'} width={548} height={566} alt={product?.title || "Car"} />
                        </div>
                    </SwiperSlide>
                ))}
                <button className="custom-arrow next" onClick={() => swiperInstance?.slideNext()}> <span className="fas fa-angle-right"></span> </button>
                <button className="custom-arrow prev" onClick={() => swiperInstance?.slidePrev()}> <span className="fas fa-angle-left"></span> </button>

            </Swiper>

            <div style={{ width: "80%", margin: "0 auto" }}>
                <Swiper
                    modules={[Thumbs, Autoplay,]}
                    slidesPerView={2}
                    spaceBetween={10}
                    watchSlidesProgress={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    speed={600}
                    loop={true}
                    className="thumb-swiper"
                    breakpoints={{
                        540: {
                            slidesPerView: 3, spaceBetween: 10,
                        }
                    }}
                >
                    {productsList.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="product-details__thumb-img">
                                <Image src={product?.image || '/assets/images/brand/brand-1-1.png'} width={138} height={143} alt={product?.title || "Car Thumbnail"} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default NavForSlider;
