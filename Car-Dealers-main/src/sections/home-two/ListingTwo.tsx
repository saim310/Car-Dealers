"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import titleImg from "../../../public/assets/images/shapes/section-title-tagline-shape-1.png";
import Image from 'next/image';
import TextAnimation from '@/components/elements/TextAnimation';
import { carListTwo } from '@/all-content/listing/Lictingdata';
import { CarItemTwo } from '@/all-content/listing/listType';
import Link from 'next/link';

const ListingTwo: React.FC = () => {
    return (
        <section className="listing-two" id='cars'>
            {/* <div className="container"> */}
            <div className="section-title text-center sec-title-animation animation-style1">
                
                <h2 className="section-title__title title-animation">
                    <TextAnimation text='Explore Most Popular Cars' />
                </h2>
            </div>

            <div className="listing-two__carousel owl-theme owl-carousel">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    loop={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    speed={1000}
                    modules={[Navigation, Autoplay, Pagination]}
                    breakpoints={{
                        668: { slidesPerView: 2, spaceBetween: 0 },
                        792: { slidesPerView: 3, spaceBetween: 0 },
                        1024: { slidesPerView: 4, spaceBetween: 0 },
                        1324: { slidesPerView: 5, spaceBetween: 0 },
                        1624: { slidesPerView: 6, spaceBetween: 0 },
                    }}
                >
                    {carListTwo.map((car: CarItemTwo) => (
                        <SwiperSlide key={car?.id}>
                            <div className="item">
                                <div className="listing-two__single mx-2 my-3">
                                    <div className="listing-two__img-box">
                                        <div className="listing-two__img">
                                            {
                                                car?.image && (<Image src={car?.image} width={302} height={251} alt={car.title} />)
                                            }
                                        </div>
                                    </div>

                                    <div className="listing-two__content">
                                        <p className="listing-two__sub-title">{car?.category}</p>

                                        <h3 className="listing-two__title">
                                            <Link href={car?.link}>{car?.title}</Link>
                                        </h3>

                                        <div className="listing-two__price-and-btn">
                                            <div className="listing-two__price-box">
                                                <span>From</span>
                                                <p>{car?.price}</p>
                                            </div>

                                            <div className="listing-two__btn-box">
                                                <Link href={car?.link} className="thm-btn">
                                                    Book Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* </div> */}
        </section>
    );
};

export default ListingTwo;
