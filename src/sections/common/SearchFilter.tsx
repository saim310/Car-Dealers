"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from 'next/link';

interface BodyType {
    name: string;
    slug: string;
    image: string;
}

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
const yards = ["All Yards", "UKA Japan Motors - Maidstone", "UKA Japan Motors - Mordialloc", "UKA Japan Motors - Brisbane", "UKA Japan Motors"];

const SearchFilter: React.FC = () => {
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedYearMin, setSelectedYearMin] = useState("");
    const [selectedYearMax, setSelectedYearMax] = useState("");
    const [selectedPriceMin, setSelectedPriceMin] = useState("");
    const [selectedPriceMax, setSelectedPriceMax] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedYard, setSelectedYard] = useState("All Yards");
    const [activeBodyType, setActiveBodyType] = useState<string | null>(null);

    const fadeInUp:any =  {
        initial: { y: 40, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
        viewport: { once: true }
    };

    return (
        <section style={{ background: '#0F0F1B', padding: '100px 0 80px', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative background elements */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245,185,56,0.08) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-150px',
                left: '-150px',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245,185,56,0.05) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <motion.div
                    className="text-center"
                    {...fadeInUp}
                    style={{ marginBottom: '50px' }}
                >
                    <span style={{
                        color: '#f5b93c',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '13px',
                        letterSpacing: '3px',
                        display: 'block',
                        marginBottom: '12px'
                    }}>
                        Start Your Journey
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(28px, 4vw, 42px)',
                        fontWeight: 800,
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        marginBottom: '12px',
                        lineHeight: 1.2
                    }}>
                        Find Your <span style={{ color: '#f5b93c' }}>Dream Car</span>
                    </h2>
                    <p style={{
                        color: '#888',
                        fontSize: '16px',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        Browse by body type or use our advanced filters to find the perfect Japanese import.
                    </p>
                </motion.div>

                {/* Body Type Quick Select */}
                <motion.div
                    {...fadeInUp}
                    style={{ marginBottom: '50px' }}
                >
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '16px'
                    }}>
                        {bodyTypes.map((type, i) => (
                            <motion.div
                                key={type.slug}
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/all-cars/${type.slug}/`}
                                    onMouseEnter={() => setActiveBodyType(type.slug)}
                                    onMouseLeave={() => setActiveBodyType(null)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textDecoration: 'none',
                                        padding: '24px 28px',
                                        background: activeBodyType === type.slug ? '#f5b93c' : 'rgba(255,255,255,0.05)',
                                        borderRadius: '16px',
                                        border: `2px solid ${activeBodyType === type.slug ? '#f5b93c' : 'rgba(255,255,255,0.1)'}`,
                                        transition: 'all 0.3s ease',
                                        minWidth: '120px',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                >
                                    <div style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '14px',
                                        background: activeBodyType === type.slug ? '#1a1a1a' : 'rgba(245,185,56,0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '12px',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <Image
                                            src={type.image}
                                            alt={type.name}
                                            width={36}
                                            height={28}
                                            style={{ 
                                                objectFit: 'contain',
                                                filter: activeBodyType === type.slug ? 'none' : 'brightness(0) invert(1)'
                                            }}
                                        />
                                    </div>
                                    <span style={{
                                        color: activeBodyType === type.slug ? '#1a1a1a' : '#ffffff',
                                        fontWeight: 700,
                                        fontSize: '13px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px',
                                        transition: 'color 0.3s ease'
                                    }}>
                                        {type.name}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Advanced Search Filter Card */}
                <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.3)'
                    }}>
                        {/* Filter Header */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '30px',
                            flexWrap: 'wrap',
                            gap: '15px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: '#f5b93c',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span className="icon-search" style={{ color: '#1a1a1a', fontSize: '18px' }}></span>
                                </div>
                                <div>
                                    <h3 style={{
                                        margin: 0,
                                        fontSize: '20px',
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        Advanced Search
                                    </h3>
                                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#888' }}>
                                        {makes.reduce((acc, m) => acc + m.count, 0)}+ vehicles available
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedMake("");
                                    setSelectedModel("");
                                    setSelectedYearMin("");
                                    setSelectedYearMax("");
                                    setSelectedPriceMin("");
                                    setSelectedPriceMax("");
                                    setSelectedStatus("All");
                                    setSelectedYard("All Yards");
                                }}
                                style={{
                                    padding: '10px 20px',
                                    background: 'transparent',
                                    color: '#888',
                                    border: '1.5px solid #e0e0e0',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#f5b93c';
                                    e.currentTarget.style.color = '#f5b93c';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#e0e0e0';
                                    e.currentTarget.style.color = '#888';
                                }}
                            >
                                <span className="icon-refresh" style={{ fontSize: '10px' }}></span>
                                Reset Filters
                            </button>
                        </div>

                        {/* Filter Grid */}
                        <div className="row" style={{ marginBottom: '8px' }}>
                            {/* Yard */}
                            <div className="col-lg-4 col-md-6" style={{ marginBottom: '24px' }}>
                                <label style={filterLabelStyle}>Location</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={selectedYard}
                                        onChange={(e) => setSelectedYard(e.target.value)}
                                        style={selectStyle}
                                    >
                                        {yards.map((y) => (
                                            <option key={y} value={y}>{y}</option>
                                        ))}
                                    </select>
                                    <span className="icon-down-arrow" style={selectIconStyle}></span>
                                </div>
                            </div>

                            {/* Make */}
                            <div className="col-lg-4 col-md-6" style={{ marginBottom: '24px' }}>
                                <label style={filterLabelStyle}>Make</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={selectedMake}
                                        onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel(""); }}
                                        style={selectStyle}
                                    >
                                        <option value="">All Makes</option>
                                        {makes.map((make) => (
                                            <option key={make.name} value={make.name}>
                                                {make.name} ({make.count})
                                            </option>
                                        ))}
                                    </select>
                                    <span className="icon-down-arrow" style={selectIconStyle}></span>
                                </div>
                            </div>

                            {/* Model */}
                            <div className="col-lg-4 col-md-6" style={{ marginBottom: '24px' }}>
                                <label style={filterLabelStyle}>Model</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={selectedModel}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                        style={{
                                            ...selectStyle,
                                            background: !selectedMake ? '#f5f5f5' : '#ffffff',
                                            cursor: !selectedMake ? 'not-allowed' : 'pointer',
                                            color: !selectedMake ? '#aaa' : '#1a1a1a'
                                        }}
                                        disabled={!selectedMake}
                                    >
                                        <option value="">
                                            {selectedMake ? 'All Models' : 'Select Make First'}
                                        </option>
                                    </select>
                                    <span className="icon-down-arrow" style={selectIconStyle}></span>
                                </div>
                            </div>

                            {/* Year Range */}
                            <div className="col-lg-4 col-md-6" style={{ marginBottom: '24px' }}>
                                <label style={filterLabelStyle}>Year Range</label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <div style={{ position: 'relative', flex: 1 }}>
                                        <select
                                            value={selectedYearMin}
                                            onChange={(e) => setSelectedYearMin(e.target.value)}
                                            style={selectStyle}
                                        >
                                            <option value="">From</option>
                                            {years.map((y) => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                        <span className="icon-down-arrow" style={selectIconStyle}></span>
                                    </div>
                                    <span style={{ color: '#ccc', fontWeight: 700 }}>—</span>
                                    <div style={{ position: 'relative', flex: 1 }}>
                                        <select
                                            value={selectedYearMax}
                                            onChange={(e) => setSelectedYearMax(e.target.value)}
                                            style={selectStyle}
                                        >
                                            <option value="">To</option>
                                            {years.map((y) => (
                                                <option key={y} value={y}>{y}</option>
                                            ))}
                                        </select>
                                        <span className="icon-down-arrow" style={selectIconStyle}></span>
                                    </div>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="col-lg-4 col-md-6" style={{ marginBottom: '24px' }}>
                                <label style={filterLabelStyle}>Price Range</label>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <div style={{ position: 'relative', flex: 1 }}>
                                        <select
                                            value={selectedPriceMin}
                                            onChange={(e) => setSelectedPriceMin(e.target.value)}
                                            style={selectStyle}
                                        >
                                            <option value="">Min $</option>
                                            {prices.map((p) => (
                                                <option key={p} value={p}>${Number(p).toLocaleString()}</option>
                                            ))}
                                        </select>
                                        <span className="icon-down-arrow" style={selectIconStyle}></span>
                                    </div>
                                    <span style={{ color: '#ccc', fontWeight: 700 }}>—</span>
                                    <div style={{ position: 'relative', flex: 1 }}>
                                        <select
                                            value={selectedPriceMax}
                                            onChange={(e) => setSelectedPriceMax(e.target.value)}
                                            style={selectStyle}
                                        >
                                            <option value="">Max $</option>
                                            {prices.map((p) => (
                                                <option key={p} value={p}>${Number(p).toLocaleString()}</option>
                                            ))}
                                        </select>
                                        <span className="icon-down-arrow" style={selectIconStyle}></span>
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="col-lg-4 col-md-6" style={{ marginBottom: '24px' }}>
                                <label style={filterLabelStyle}>Stock Status</label>
                                <div style={{ position: 'relative' }}>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        style={selectStyle}
                                    >
                                        {stockStatuses.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                    <span className="icon-down-arrow" style={selectIconStyle}></span>
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: '10px',
                            borderTop: '1px solid #f0f0f0'
                        }}>
                            <button style={{
                                padding: '18px 60px',
                                background: '#f5b93c',
                                color: '#1a1a1a',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '15px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                boxShadow: '0 10px 30px rgba(245,185,56,0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#1a1a1a';
                                e.currentTarget.style.color = '#f5b93c';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#f5b93c';
                                e.currentTarget.style.color = '#1a1a1a';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(245,185,56,0.3)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                            >
                                <span className="icon-search" style={{ fontSize: '16px' }}></span>
                                Search Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Shared styles
const filterLabelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '10px'
};

const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 40px 14px 18px',
    border: '2px solid #e8e8e8',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: 500,
    background: '#ffffff',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    color: '#1a1a1a',
    transition: 'border-color 0.3s ease'
};

const selectIconStyle: React.CSSProperties = {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#f5b93c',
    fontSize: '10px',
    pointerEvents: 'none'
};

export default SearchFilter;
