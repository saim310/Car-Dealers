"use client"


import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import SearchFilter from '@/sections/common/SearchFilter';
import FinanceCalculatorSection from '@/sections/common/FinanceCalculator';

// --- Types ---
interface Vehicle {
    id: string;
    title: string;
    price: number;
    odometer: string;
    transmission: string;
    bodyType: string;
    fuelType: string;
    imageUrl: string;
    link: string;
    isSpecial?: boolean;
}

interface BodyType {
    name: string;
    slug: string;
    image: string;
}

// --- Data ---
const heroSlides = [
    {
        id: 1,
        image: "/media/19760/new-home-banner-2026.jpeg",
        alt: "View Our Cars",
        link: "/all-cars/"
    },
    {
        id: 2,
        image: "/media/18029/web-finance-banner.jpg",
        alt: "View Our Cars",
        link: "/finance-information/#financeenquiry"
    },
    {
        id: 3,
        image: "/media/19921/finance-banner-2026.jpg",
        alt: "Finance",
        link: "/finance-page/"
    }
];

const bodyTypes: BodyType[] = [
    { name: "Hatch", slug: "Hatch-body", image: "/media/19557/hatchback.png" },
    { name: "SUV", slug: "Suv-body", image: "/media/19556/suv.png" },
    { name: "Sedan", slug: "Sedan-body", image: "/media/19555/sedan.png" },
    { name: "Wagon", slug: "Wagon-body", image: "/media/19554/wagon.png" },
    { name: "Van", slug: "van-body", image: "/media/19553/van.png" },
];

const makes = [
    { name: "DAIHATSU", count: 2 },
    { name: "HONDA", count: 41 },
    { name: "LEXUS", count: 9 },
    { name: "MERCEDES-BENZ", count: 1 },
    { name: "NISSAN", count: 19 },
    { name: "SUBARU", count: 7 },
    { name: "SUZUKI", count: 8 },
    { name: "TOYOTA", count: 166 },
];

const years = ["2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "1999", "1998"];

const prices = ["2500", "5000", "10000", "15000", "20000", "25000", "30000", "35000", "40000", "45000", "50000", "75000", "100000"];

const stockStatuses = ["All", "In Stock", "On Hold", "Under Offer", "Sold"];

const latestVehicles: Vehicle[] = [
    {
        id: "584169",
        title: "2011 Toyota Crown GWS204",
        price: 14995,
        odometer: "105523 kms",
        transmission: "Auto",
        bodyType: "Sedan",
        fuelType: "Hybrid",
        imageUrl: "/images/LMCT0012708/Toyota/Crown/101075/1?t=639173925976612634",
        link: "/all-stock/2011-toyota-crown-sedan-lpackage-gws204-584169"
    },
    {
        id: "584167",
        title: "2022 Toyota Yaris MXPH15",
        price: 20995,
        odometer: "90318 kms",
        transmission: "Auto",
        bodyType: "Hatchback",
        fuelType: "Hybrid",
        imageUrl: "/images/LMCT0012708/Toyota/Yaris/101073/1?t=639173925993806018",
        link: "/all-stock/2022-toyota-yaris-hatchback-hybridx-mxph15-584167"
    },
    {
        id: "584094",
        title: "2022 Toyota Yaris MXPH15",
        price: 20995,
        odometer: "88420 kms",
        transmission: "Auto",
        bodyType: "Hatchback",
        fuelType: "Hybrid",
        imageUrl: "/images/LMCT0012708/Toyota/Yaris/101072/1?t=639173926012869419",
        link: "/all-stock/2022-toyota-yaris-hatchback-hybridx-mxph15-584094"
    },
    {
        id: "581429",
        title: "2022 Toyota Alphard AYH30",
        price: 45995,
        odometer: "80633 kms",
        transmission: "Auto",
        bodyType: "Van",
        fuelType: "Hybrid",
        imageUrl: "/images/LMCT0012708/Toyota/Alphard/101057/1?t=639173924192251746",
        link: "/all-stock/2022-toyota-alphard-van-x-ayh30-581429"
    },
    {
        id: "581426",
        title: "2019 Toyota Crown AZSH20",
        price: 32995,
        odometer: "119504 kms",
        transmission: "Auto",
        bodyType: "Sedan",
        fuelType: "Hybrid",
        imageUrl: "/images/LMCT0012708/Toyota/Crown/101056/1?t=639173926049854519",
        link: "/all-stock/2019-toyota-crown-sedan-rs-azsh20-581426"
    },
    {
        id: "581423",
        title: "2019 Toyota C-HR ZYX10",
        price: 22995,
        odometer: "111363 kms",
        transmission: "Auto",
        bodyType: "SUV",
        fuelType: "Hybrid",
        imageUrl: "/images/LMCT0012708/Toyota/C_HR/101053/1?t=639173926070296539",
        link: "/all-stock/2019-toyota-c_hr-suv-g-zyx10-581423"
    },
    {
        id: "581327",
        title: "2020 Honda Fit GR3",
        price: 19995,
        odometer: "50408 kms",
        transmission: "Auto",
        bodyType: "Hatchback",
        fuelType: "Hybrid",
        imageUrl: "/images/LMCT0012708/Honda/Fit/101052/1?t=639173926090950388",
        link: "/all-stock/2020-honda-fit-hatchback-hevbasic-gr3-581327"
    },
    {
        id: "581301",
        title: "2019 Honda STEPWGN RP5",
        price: 27995,
        odometer: "99034 kms",
        transmission: "Auto",
        bodyType: "Van",
        fuelType: "Hybrid",
        imageUrl: "/images/LMCT0012708/Honda/STEPWGN/101051/1?t=639173924227111719",
        link: "/all-stock/2019-honda-stepwgn-van-spadehybridghondasensing-rp5-581301"
    },
];

const featureCards = [
    {
        title: "OUR VEHICLES",
        image: "/media/19702/our-imported-vehicles.jpg",
        text: "We have vast range of quality Japanese imports priced competitively for sale. All used car imports come with an Export Certificate & Japanese Auction sheet to verify low Kilometres & condition.",
        link: "/all-cars/",
        buttonText: "VIEW OUR CARS"
    },
    {
        title: "$0 deposit Finance",
        image: "/media/15560/finance.jpg",
        text: "Our financial advisor can access some great deals, specials, and low interest finance options. We can also put together servicing packages and insurance cover, all under one roof, taking the hassle out of car paperwork and payments.",
        link: "/finance/",
        buttonText: "APPLY NOW"
    },
    {
        title: "5.0 Google Reviews",
        image: "/media/17982/google-5-star-img.png",
        text: "Not sure if we're the best? Take a look at our 5-star Google reviews and see why our customers love us!.",
        link: "https://www.google.com/search?sca_esv=25cf531ee370dd12&rlz=1C1CHZO_enAU1058AU1059&sxsrf=AHTn8zrnN4gHug_a8AQ01icVnVDhFDFAvg:1741586050634&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzcW-rJ2Q_KZZRyDxW3BjWrdDi1TipBfNQEppiFwdIptpR3DNm7RITBxdRK7_MVRX3OQ3KRlAmrucYhRWxmEx0ZXuZOp-hDAyyWguxYbjYZuOl7R1Eg%3D%3D&q=Jan+Japan+Motors+-+Point+Cook+Reviews&sa=X&ved=2ahUKEwit_ZLP6f6LAxVeoGMGHU_jN_kQ0bkNegQILRAE&biw=2327&bih=1186&dpr=1.65",
        buttonText: "TAKE A LOOK",
        external: true
    }
];

// --- Finance Calculator Component ---
const FinanceCalculator: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState(5000);
    const [interestRate, setInterestRate] = useState(2.50);
    const [loanTerm, setLoanTerm] = useState(12);
    const [weeklyRepayment, setWeeklyRepayment] = useState(97.38);
    const [monthlyRepayment, setMonthlyRepayment] = useState(422.33);

    const calculateRepayments = () => {
        const r = interestRate / 100 / 12;
        const n = loanTerm;
        const p = loanAmount;

        if (r === 0) {
            const monthly = p / n;
            setMonthlyRepayment(parseFloat(monthly.toFixed(2)));
            setWeeklyRepayment(parseFloat((monthly * 12 / 52).toFixed(2)));
            return;
        }

        const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setMonthlyRepayment(parseFloat(monthly.toFixed(2)));
        setWeeklyRepayment(parseFloat((monthly * 12 / 52).toFixed(2)));
    };

    useEffect(() => {
        calculateRepayments();
    }, [loanAmount, interestRate, loanTerm]);

    return (
        <div id="finance-calc" style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 10px 50px rgba(0,0,0,0.08)',
            margin: '60px 0'
        }}>
            <div style={{
                background: '#1a1a1a',
                margin: '-40px -40px 40px',
                padding: '25px 40px',
                borderRadius: '20px 20px 0 0'
            }}>
                <h3 style={{
                    margin: 0,
                    color: '#f5b93c',
                    fontSize: '20px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <span className="icon-calculator" style={{ fontSize: '24px' }}></span>
                    Finance Calculator
                </h3>
            </div>

            <div className="row">
                <div className="col-lg-6" style={{ marginBottom: '40px' }}>
                    {/* Loan Term */}
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: 700,
                            color: '#1a1a1a',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '12px'
                        }}>
                            Loan Term <span style={{ color: '#999', fontWeight: 400 }}>(Months)</span>
                        </label>
                        <select
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            style={{
                                width: '100%',
                                padding: '14px 18px',
                                border: '2px solid #e0e0e0',
                                borderRadius: '10px',
                                fontSize: '14px',
                                outline: 'none',
                                background: '#fafafa',
                                cursor: 'pointer'
                            }}
                        >
                            {[12, 24, 36, 48, 60, 72, 84].map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    {/* Loan Amount */}
                    <div style={{ marginBottom: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <label style={{
                                fontSize: '13px',
                                fontWeight: 700,
                                color: '#1a1a1a',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Loan Amount <span style={{ color: '#f5b93c' }}>($)</span>
                            </label>
                            <span style={{ fontWeight: 700, color: '#f5b93c' }}>
                                ${loanAmount.toLocaleString()}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="1000"
                            max="200000"
                            step="500"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#f5b93c' }}
                        />
                    </div>

                    {/* Interest Rate */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <label style={{
                                fontSize: '13px',
                                fontWeight: 700,
                                color: '#1a1a1a',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                Interest Rate <span style={{ color: '#f5b93c' }}>(%)</span>
                            </label>
                            <span style={{ fontWeight: 700, color: '#f5b93c' }}>
                                {interestRate.toFixed(2)}%
                            </span>
                        </div>
                        <input
                            type="range"
                            min="2.5"
                            max="5"
                            step="0.05"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#f5b93c' }}
                        />
                    </div>
                </div>

                <div className="col-lg-5 offset-lg-1">
                    <div style={{
                        background: '#1a1a1a',
                        borderRadius: '16px',
                        padding: '35px',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            color: '#999',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '10px'
                        }}>
                            Repayment Amount
                        </p>

                        <div style={{ marginBottom: '30px' }}>
                            <p style={{
                                color: '#999',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginBottom: '8px'
                            }}>
                                Per Week
                            </p>
                            <p style={{
                                color: '#f5b93c',
                                fontSize: '42px',
                                fontWeight: 800,
                                margin: 0
                            }}>
                                ${weeklyRepayment.toFixed(2)}
                            </p>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <p style={{
                                color: '#999',
                                fontSize: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                marginBottom: '8px'
                            }}>
                                Per Month
                            </p>
                            <p style={{
                                color: '#ffffff',
                                fontSize: '32px',
                                fontWeight: 700,
                                margin: 0
                            }}>
                                ${monthlyRepayment.toFixed(2)}
                            </p>
                        </div>

                        <div style={{
                            borderTop: '1px solid #333',
                            paddingTop: '25px',
                            textAlign: 'left'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: '#999', fontSize: '14px' }}>Loan Amount</span>
                                <span style={{ color: '#fff', fontWeight: 600 }}>${loanAmount.toLocaleString('en-AU', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ color: '#999', fontSize: '14px' }}>Interest Rate</span>
                                <span style={{ color: '#fff', fontWeight: 600 }}>{interestRate.toFixed(2)}%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#999', fontSize: '14px' }}>Loan Terms</span>
                                <span style={{ color: '#fff', fontWeight: 600 }}>{loanTerm} Months</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <Link
                    href="/finance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '16px 40px',
                        background: '#f5b93c',
                        color: '#1a1a1a',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#1a1a1a';
                        e.currentTarget.style.color = '#f5b93c';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f5b93c';
                        e.currentTarget.style.color = '#1a1a1a';
                    }}
                >
                    Apply Now
                    <span className="icon-right-arrow" style={{ fontSize: '12px' }}></span>
                </Link>
            </div>
        </div>
    );
};

// --- Main Home Page Component ---
const FinancePage: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<any>(null);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedYearMin, setSelectedYearMin] = useState("");
    const [selectedYearMax, setSelectedYearMax] = useState("");
    const [selectedPriceMin, setSelectedPriceMin] = useState("");
    const [selectedPriceMax, setSelectedPriceMax] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const fadeInUp = {
        initial: { y: 40, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" } as any,
        viewport: { once: true }
    };

    return (
        <div className="home-page">
         <SearchFilter/>

         

      

            {/* ===== LATEST VEHICLES ===== */}
            <section style={{ background: '#faf8f5', padding: '80px 0' }}>
                <div className="container">
                    <motion.div
                        className="text-center"
                        {...fadeInUp}
                        style={{ marginBottom: '50px' }}
                    >
                        <h2 style={{
                            fontSize: '36px',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            textTransform: 'uppercase',
                            marginBottom: '10px'
                        }}>
                            Used Cars For <span style={{ color: '#f5b93c' }}>Sale</span>
                        </h2>
                        <p style={{
                            fontSize: '18px',
                            color: '#555',
                            margin: 0
                        }}>
                            Find your next car from our latest arrivals
                        </p>
                        <div style={{
                            width: '80px',
                            height: '4px',
                            background: '#f5b93c',
                            margin: '20px auto 0',
                            borderRadius: '2px'
                        }} />
                    </motion.div>

                    <div className="row">
                        {latestVehicles.map((vehicle, i) => (
                            <motion.div
                                key={vehicle.id}
                                className="col-lg-3 col-md-4 col-sm-6"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                style={{ marginBottom: '30px' }}
                            >
                                <div style={{
                                    background: '#ffffff',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: '0 5px 25px rgba(0,0,0,0.06)',
                                    transition: 'all 0.3s ease',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 5px 25px rgba(0,0,0,0.06)';
                                }}
                                >
                                    {/* Vehicle Image */}
                                    <div style={{
                                        position: 'relative',
                                        height: '220px',
                                        overflow: 'hidden',
                                        background: '#f0f0f0'
                                    }}>
                                      
                                    </div>

                                    {/* Vehicle Info */}
                                    <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h3 style={{
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            marginBottom: '12px',
                                            lineHeight: 1.4
                                        }}>
                                            {vehicle.title}
                                        </h3>

                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'baseline',
                                            gap: '8px',
                                            marginBottom: '15px'
                                        }}>
                                            <span style={{ color: '#f5b93c', fontSize: '14px', fontWeight: 700 }}>$</span>
                                            <span style={{
                                                color: '#f5b93c',
                                                fontSize: '24px',
                                                fontWeight: 800
                                            }}>
                                                {vehicle.price.toLocaleString()}
                                            </span>
                                            <span style={{
                                                color: '#999',
                                                fontSize: '12px',
                                                fontWeight: 500
                                            }}>
                                                Excl Gov Charges
                                            </span>
                                        </div>

                                        {/* Vehicle Details */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '8px',
                                            marginBottom: '20px',
                                            fontSize: '13px',
                                            color: '#555'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span className="icon-dashboard" style={{ color: '#f5b93c', fontSize: '12px' }}></span>
                                                {vehicle.odometer}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span className="icon-gears" style={{ color: '#f5b93c', fontSize: '12px' }}></span>
                                                {vehicle.transmission}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span className="icon-car" style={{ color: '#f5b93c', fontSize: '12px' }}></span>
                                                {vehicle.bodyType}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span className="icon-fuel" style={{ color: '#f5b93c', fontSize: '12px' }}></span>
                                                {vehicle.fuelType}
                                            </div>
                                        </div>

                                        <Link
                                            href={vehicle.link}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                padding: '14px',
                                                background: '#1a1a1a',
                                                color: '#ffffff',
                                                borderRadius: '10px',
                                                textDecoration: 'none',
                                                fontWeight: 700,
                                                fontSize: '13px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginTop: 'auto',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#f5b93c';
                                                e.currentTarget.style.color = '#1a1a1a';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = '#1a1a1a';
                                                e.currentTarget.style.color = '#ffffff';
                                            }}
                                        >
                                            View Details
                                            <span className="icon-right-arrow" style={{ fontSize: '10px' }}></span>
                                            <span className="icon-right-arrow" style={{ fontSize: '10px', marginLeft: '-4px' }}></span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WELCOME CONTENT ===== */}
            <section id="aboutus" style={{ background: '#ffffff', padding: '80px 0' }}>
                <div className="container">
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h1 style={{
                            fontSize: 'clamp(28px, 4vw, 42px)',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            textTransform: 'uppercase',
                            marginBottom: '15px'
                        }}>
                            Welcome to <span style={{ color: '#f5b93c' }}>UKA Japan Motors</span>
                        </h1>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#555',
                            marginBottom: '40px'
                        }}>
                            Most Trusted Dealer for Japanese Import Cars in Melbourne, Australia
                        </h2>

                        <div style={{
                            maxWidth: '900px',
                            margin: '0 auto',
                            textAlign: 'left',
                            color: '#555',
                            lineHeight: '1.8',
                            fontSize: '16px'
                        }}>
                            <p style={{ marginBottom: '20px' }}>
                                Are you searching for reliable Japanese import cars in Australia? UKA Japan Motors has you sorted. With over 25 years in the industry, we specialise in importing high-quality JDM cars directly from Japan. As direct importers, we handle high-volume shipping from Japan and processing in Australia, which means no intermediate third party and more competitive prices.
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                Our used car dealership in Australia offers credible wholesale deals, easy trade-ins, and a trusted range of <Link href="/all-cars/" style={{ color: '#f5b93c', textDecoration: 'none', fontWeight: 600 }}>Japanese used cars Melbourne, Australia</Link> that suit every budget. You also get access to flexible used car finance options and solid warranty coverage, which provide you assurance for the long run. We sell both low and high budget imports. UKA Japan Motors has a range of used cars under $15,000. For drivers interested in premium used cars, we also have quality used cars under $50,000.
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                Our imports are compliant with Australian law and come with an Export Certificate as well as a Japanese Auction Sheet to verify maintenance records and kilometres travelled. To make buying and selling <Link href="/" style={{ color: '#f5b93c', textDecoration: 'none', fontWeight: 600 }}>Japanese import cars</Link> easier, we also offer a car trade-in option. For this, first we&apos;ll evaluate your used car and then offer the pricing for the vehicle. After that, you can decide to exchange your vehicle for a similarly priced Japanese used car Melbourne. When you visit our Japanese import car dealership in Melbourne, Australia, our team provides complete guidance and freedom to inspect the vehicle properly. We also provide assistance about arranging relevant documentation and car financing options to buy your dream car.
                            </p>
                            <p>
                                To explore current stock or discover our latest offers, visit our <Link href="/used-cars-in-brisbane/" style={{ color: '#f5b93c', textDecoration: 'none', fontWeight: 600 }}>Brisbane</Link> or <Link href="/used-cars-in-mordialloc/" style={{ color: '#f5b93c', textDecoration: 'none', fontWeight: 600 }}>Mordialloc used car</Link> dealership in Australia today.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== GOOGLE REVIEWS ===== */}
            <section id="googlereviews" style={{ background: '#faf8f5', padding: '80px 0' }}>
                <div className="container">
                    <motion.div
                        className="text-center"
                        {...fadeInUp}
                        style={{ marginBottom: '40px' }}
                    >
                        <h2 style={{
                            fontSize: '36px',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            textTransform: 'uppercase',
                            marginBottom: '10px'
                        }}>
                            UKA Japan Motors - <span style={{ color: '#f5b93c' }}>Reviews</span>
                        </h2>
                    </motion.div>
                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        textAlign: 'center'
                    }}>
                        <iframe
                            id="review-widget-9876543213011151831766046"
                            title="Customer reviews"
                            width="100%"
                            height="620px"
                            style={{
                                border: 'none',
                                maxWidth: '800px',
                                display: 'block',
                                margin: '0 auto'
                            }}
                            src="https://widgets-v7.birdeye.com/api/widgets?bid=177035970491479&wno=11&seoEnabled=false"
                            allow="payment"
                        />
                    </div>
                </div>
            </section>

         <FinanceCalculatorSection />

            {/* ===== FEATURE CARDS ===== */}
            <section style={{ background: '#faf8f5', padding: '80px 0' }}>
                <div className="container">
                    <div className="row">
                        {featureCards.map((card, i) => (
                            <motion.div
                                key={card.title}
                                className="col-lg-4 col-md-6"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                viewport={{ once: true }}
                                style={{ marginBottom: '30px' }}
                            >
                                <div style={{
                                    background: '#ffffff',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
                                }}
                                >
                                    <div style={{
                                        position: 'relative',
                                        height: '220px',
                                        overflow: 'hidden'
                                    }}>
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <h2 style={{
                                            fontSize: '20px',
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            textTransform: 'uppercase',
                                            marginBottom: '15px',
                                            letterSpacing: '1px'
                                        }}>
                                            {card.title}
                                        </h2>
                                        <p style={{
                                            color: '#555',
                                            lineHeight: '1.7',
                                            fontSize: '15px',
                                            marginBottom: '25px',
                                            flex: 1
                                        }}>
                                            {card.text}
                                        </p>
                                        <Link
                                            href={card.link}
                                            target={card.external ? '_blank' : undefined}
                                            rel={card.external ? 'noopener noreferrer' : undefined}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '14px 28px',
                                                background: '#f5b93c',
                                                color: '#1a1a1a',
                                                borderRadius: '10px',
                                                textDecoration: 'none',
                                                fontWeight: 700,
                                                fontSize: '13px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1.5px',
                                                transition: 'all 0.3s ease',
                                                alignSelf: 'flex-start'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#1a1a1a';
                                                e.currentTarget.style.color = '#f5b93c';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = '#f5b93c';
                                                e.currentTarget.style.color = '#1a1a1a';
                                            }}
                                        >
                                            {card.buttonText}
                                            <span className="icon-right-arrow" style={{ fontSize: '10px' }}></span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FinancePage;
