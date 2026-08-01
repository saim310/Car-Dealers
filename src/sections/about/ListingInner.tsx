"use client";
import React, { useState } from 'react'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'; 
import { ListingItem } from '@/all-content/listing/listType';
import { listingData } from '@/all-content/listing/Lictingdata';
import Image from 'next/image';
import TextAnimation from '@/components/elements/TextAnimation';
import Link from 'next/link';

const tabButtons = [
    { id: "tesla", title: "Tesla" },
    { id: "honda", title: "Honda" },
    { id: "audi", title: "Audi" },
    { id: "mazda", title: "Mazda" },
    { id: "toyota", title: "Toyota" },
    { id: "acura", title: "Acura" },
];

const ListingInner: React.FC = () => {
    const [isActiveTab, setIsActiveTab] = React.useState<string>("tesla");
    const [tabData, setTabData] = useState<ListingItem[]>(listingData || []);

    const handleTab = (tabId: string) => {
        setIsActiveTab((prev) => prev !== tabId ? tabId : prev);
        // Filter data based on tabId
        setTabData((previousData) => [...previousData].reverse());
    }
    return (
        <section className="listing-one">
            <div className="">
                <div className="section-title text-center sec-title-animation animation-style1">
                    
                    <h2 className="section-title__title title-animation"><TextAnimation text='Explore Most Popular Cars' /></h2>
                </div>
                <div className="listing-one__tab-box listing-one-tabs-box">
                    <ul className="listing-one-tab-buttons listing-one-tab-btns clearfix list-unstyled">
                        {
                            tabButtons.map((tab) => (
                                <li key={tab?.id} className={`p-tab-btn ${tab?.id === isActiveTab ? "active-btn" : ""}`} onClick={() => handleTab(tab?.id)}><span>{tab.title}</span></li>
                            ))
                        }
                    </ul>
                    <div className="p-tabs-content">
                        {/*--tab*/}
                        <div className="p-tab active-tab" id="tesla">
                            <div className="listing-one__inner">
                                <div className="listing-one__carousel owl-carousel owl-theme owl-loaded owl-drag">
                                    <Swiper
                                        slidesPerView={1}
                                        spaceBetween={30}
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
                                            792: { slidesPerView: 2, spaceBetween: 0 },
                                            1024: { slidesPerView: 3, spaceBetween: 0 },
                                            1324: { slidesPerView: 4, spaceBetween: 0 },
                                            1624: { slidesPerView: 5, spaceBetween: 0 },
                                        }}
                                    >

                                        {
                                            tabData.map((item, i) => <SwiperSlide key={i}> <div className="item">
                                                <div className="listing-one__single MX100">
                                                    <div className="listing-one__img">
                                                        {
                                                            item.image && (<Image src={item.image} width={361} height={220} alt="Image" />)
                                                        }
                                                        <div className="listing-one__brand-name">
                                                            <p>{item.brand}</p>
                                                        </div>
                                                    </div>
                                                    <div className="listing-one__content">
                                                        <h3 className="listing-one__title"><Link href={item?.link || "/inner/listing-single"}>{item?.title}</Link></h3>
                                                        <div className="listing-one__meta-box-info">
                                                            <ul className="list-unstyled listing-one__meta">
                                                                <li>
                                                                    <div className="icon">
                                                                        <span className="icon-manual"></span>
                                                                    </div>
                                                                    <div className="text">
                                                                        <p>{item?.transmission}</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="icon">
                                                                        <span className="icon-mileage"></span>
                                                                    </div>
                                                                    <div className="text">
                                                                        <p>{item?.mileage}</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="icon">
                                                                        <span className="icon-fuel-type"></span>
                                                                    </div>
                                                                    <div className="text">
                                                                        <p>{item?.fuel}</p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <ul className="list-unstyled listing-one__meta listing-one__meta--two">
                                                                <li>
                                                                    <div className="icon">
                                                                        <span className="icon-test-drive"></span>
                                                                    </div>
                                                                    <div className="text">
                                                                        <p>{item?.package}</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="icon">
                                                                        <span className="icon-avatar"></span>
                                                                    </div>
                                                                    <div className="text">
                                                                        <p>Age {item?.minAge}</p>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="icon">
                                                                        <span className="icon-in-person"></span>
                                                                    </div>
                                                                    <div className="text">
                                                                        <p>{item?.persons} Persons</p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="listing-one__car-rent-box">
                                                            <p className="listing-one__car-rent">Starting From
                                                                <span>${item?.pricePerDay || 100}/</span> Day</p>
                                                        </div>
                                                        <div className="listing-one__btn-box">
                                                            <Link href={item?.link || "/inner/listing-single"} className="thm-btn">
                                                                Details Now
                                                                <span className="fas fa-arrow-right"></span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            </SwiperSlide>)
                                        }
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ListingInner;