"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

interface LocationData {
    id: string;
    name: string;
    address: string[];
    phone: string;
    mobile: string;
    email: string;
    mapUrl: string;
    directionsUrl: string;
    license: string;
}

const locations: LocationData[] = [
    {
        id: "maidstone",
        name: "MAIDSTONE",
        address: ["205 Ballarat Rd", "Maidstone", "VIC 3012"],
        phone: "03 4329 0786",
        mobile: "1800 006 256",
        email: "sales.maidstone@ukajapan.com.au",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25226.597478793476!2d144.866819!3d-37.78243!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65f483d70ac55%3A0xe1aaed36e5020905!2sNJ%20Japan%20Motors%20-%20Maidstone%20-%20Melbourne!5e0!3m2!1sen!2sau!4v1770591489289!5m2!1sen!2sau",
        directionsUrl: "https://maps.app.goo.gl/mro1EoXZtAkH1udS8",
        license: "LMCT0012708"
    },
    {
        id: "mordialloc",
        name: "MORDIALLOC",
        address: ["247 Boundary Road", "Mordialloc", "VIC 3195"],
        phone: "03 7065 6403",
        mobile: "1800 006 256",
        email: "sales.mordialloc@ukajapan.com.au",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3144.348351864389!2d145.1067597!3d-37.9923344!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66d0ed73e94c1%3A0x67c4c303bc9a70fb!2sNJ%20Japan%20Motors%20-%20Mordialloc!5e0!3m2!1sen!2sau!4v1770594719358!5m2!1sen!2sau",
        directionsUrl: "https://maps.app.goo.gl/wFoZDb18PjQybViK8",
        license: "LMCT0012708"
    },
    {
        id: "brisbane",
        name: "BRISBANE",
        address: ["33 Randall St", "Slacks Creek", "QLD 4127"],
        phone: "07 2147 6999",
        mobile: "1800 006 256",
        email: "sales.brisbane@ukajapan.com.au",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.965720758846!2d153.1211416!3d-27.625578299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b914319f0539a1d%3A0xe2164c4f045509cb!2sNJ%20Japan%20Motors%20-%20Brisbane!5e0!3m2!1sen!2sau!4v1770594957636!5m2!1sen!2sau",
        directionsUrl: "https://maps.app.goo.gl/5YbyzyC7zCd3hr2s8",
        license: "LMCT4933717"
    }
];

const LocationTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("maidstone");

    const activeLocation = locations.find(loc => loc.id === activeTab) || locations[0];

    return (
        <section className="location-tabs-section" style={{ 
            padding: '80px 0 0', 
            backgroundColor: '#faf8f5' 
        }}>
            <div className="container">
                {/* Section Header */}
                <motion.div 
                    className="section-title text-center"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '40px' }}
                >
                  
                    <h2 style={{ 
                        fontSize: '42px', 
                        fontWeight: 700, 
                        color: '#1a1a1a',
                        margin: 0 
                    }}>
                        Our Locations
                    </h2>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div 
                    className="location-tabs-nav"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '40px' }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        flexWrap: 'wrap',
                        borderBottom: '2px solid #e0e0e0',
                        paddingBottom: '20px'
                    }}>
                        {locations.map((loc) => (
                            <button
                                key={loc.id}
                                onClick={() => setActiveTab(loc.id)}
                                style={{
                                    padding: '14px 36px',
                                    borderRadius: '50px',
                                    border: '2px solid',
                                    borderColor: activeTab === loc.id ? '#f5b93c' : '#e0e0e0',
                                    background: activeTab === loc.id ? '#f5b93c' : '#ffffff',
                                    color: activeTab === loc.id ? '#ffffff' : '#1a1a1a',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.5px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    outline: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeTab !== loc.id) {
                                        e.currentTarget.style.borderColor = '#f5b93c';
                                        e.currentTarget.style.color = '#f5b93c';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeTab !== loc.id) {
                                        e.currentTarget.style.borderColor = '#e0e0e0';
                                        e.currentTarget.style.color = '#1a1a1a';
                                    }
                                }}
                            >
                                {loc.name}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <div className="location-content" style={{
                            background: '#ffffff',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            boxShadow: '0 10px 60px rgba(0,0,0,0.08)'
                        }}>
                            {/* Location Title */}
                            <div style={{
                                padding: '30px 40px 20px',
                                borderBottom: '1px solid #f0f0f0'
                            }}>
                                <h3 style={{
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    margin: 0,
                                    letterSpacing: '2px'
                                }}>
                                    {activeLocation.name}
                                </h3>
                            </div>

                            <div className="row" style={{ margin: 0 }}>
                                {/* Left Column - Contact Info */}
                                <div className="col-lg-5" style={{ padding: '40px' }}>
                                    {/* Address */}
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                        style={{ marginBottom: '30px' }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '15px'
                                        }}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '12px',
                                                background: '#f5b93c',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <span className="icon-pin" style={{
                                                    color: '#ffffff',
                                                    fontSize: '20px'
                                                }}></span>
                                            </div>
                                            <div>
                                                <h4 style={{
                                                    margin: '0 0 8px',
                                                    fontSize: '16px',
                                                    fontWeight: 700,
                                                    color: '#1a1a1a',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}>
                                                    Address
                                                </h4>
                                                <p style={{
                                                    margin: 0,
                                                    color: '#555',
                                                    lineHeight: '1.7',
                                                    fontSize: '15px'
                                                }}>
                                                    {activeLocation.address.map((line, i) => (
                                                        <React.Fragment key={i}>
                                                            {line}
                                                            {i < activeLocation.address.length - 1 && <br />}
                                                        </React.Fragment>
                                                    ))}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Phone */}
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                        style={{ marginBottom: '25px' }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px'
                                        }}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '12px',
                                                background: '#f5b93c',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <span className="icon-call" style={{
                                                    color: '#ffffff',
                                                    fontSize: '20px'
                                                }}></span>
                                            </div>
                                            <div>
                                                <h4 style={{
                                                    margin: '0 0 5px',
                                                    fontSize: '16px',
                                                    fontWeight: 700,
                                                    color: '#1a1a1a',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}>
                                                    Call
                                                </h4>
                                                <a href={`tel:${activeLocation.phone}`} style={{
                                                    color: '#555',
                                                    textDecoration: 'none',
                                                    fontSize: '15px',
                                                    transition: 'color 0.3s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = '#f5b93c'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                                                >
                                                    {activeLocation.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Mobile */}
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.3 }}
                                        style={{ marginBottom: '25px' }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px'
                                        }}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '12px',
                                                background: '#f5b93c',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <span className="icon-mobile" style={{
                                                    color: '#ffffff',
                                                    fontSize: '20px'
                                                }}></span>
                                            </div>
                                            <div>
                                                <h4 style={{
                                                    margin: '0 0 5px',
                                                    fontSize: '16px',
                                                    fontWeight: 700,
                                                    color: '#1a1a1a',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}>
                                                    Mobile
                                                </h4>
                                                <a href={`tel:${activeLocation.mobile}`} style={{
                                                    color: '#555',
                                                    textDecoration: 'none',
                                                    fontSize: '15px',
                                                    transition: 'color 0.3s'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = '#f5b93c'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                                                >
                                                    {activeLocation.mobile}
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Email */}
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.4, delay: 0.4 }}
                                        style={{ marginBottom: '30px' }}
                                    >
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px'
                                        }}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '12px',
                                                background: '#f5b93c',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <span className="icon-envelope" style={{
                                                    color: '#ffffff',
                                                    fontSize: '20px'
                                                }}></span>
                                            </div>
                                            <div>
                                                <h4 style={{
                                                    margin: '0 0 5px',
                                                    fontSize: '16px',
                                                    fontWeight: 700,
                                                    color: '#1a1a1a',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}>
                                                    Email
                                                </h4>
                                                <a href={`mailto:${activeLocation.email}`} style={{
                                                    color: '#555',
                                                    textDecoration: 'none',
                                                    fontSize: '15px',
                                                    transition: 'color 0.3s',
                                                    wordBreak: 'break-all'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = '#f5b93c'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                                                >
                                                    {activeLocation.email}
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Divider */}
                                    <div style={{
                                        borderTop: '1px solid #f0f0f0',
                                        margin: '30px 0',
                                        paddingTop: '30px'
                                    }}>
                                        <h4 style={{
                                            margin: '0 0 15px',
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            Trading Hours
                                        </h4>
                                        <p style={{
                                            margin: '0 0 5px',
                                            color: '#555',
                                            fontSize: '15px'
                                        }}>
                                            Monday - Saturday: 9:00 AM - 5:30 PM
                                        </p>
                                        <p style={{
                                            margin: '0 0 20px',
                                            color: '#555',
                                            fontSize: '15px'
                                        }}>
                                            Sunday: 10:00 AM - 3:00 PM
                                        </p>
                                        <p style={{
                                            margin: 0,
                                            color: '#999',
                                            fontSize: '13px',
                                            fontWeight: 600
                                        }}>
                                            {activeLocation.license}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Column - Map */}
                                <div className="col-lg-7" style={{ padding: 0 }}>
                                    <div style={{
                                        position: 'relative',
                                        height: '100%',
                                        minHeight: '400px'
                                    }}>
                                        <iframe
                                            src={activeLocation.mapUrl}
                                            title={`Map for ${activeLocation.name}`}
                                            width="100%"
                                            height="100%"
                                            style={{
                                                border: 'none',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                minHeight: '400px'
                                            }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Action Bar */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '15px',
                                padding: '25px 40px',
                                borderTop: '1px solid #f0f0f0',
                                background: '#faf8f5'
                            }}>
                                <Link 
                                    href={`tel:${activeLocation.phone}`}
                                    style={{
                                        flex: '1 1 auto',
                                        minWidth: '200px',
                                        padding: '16px 30px',
                                        borderRadius: '50px',
                                        background: '#f5b93c',
                                        color: '#ffffff',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#1a1a1a';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#f5b93c';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <span className="icon-call"></span>
                                    Call {activeLocation.name}
                                    <span className="icon-right-arrow" style={{ fontSize: '12px' }}></span>
                                </Link>

                                <Link 
                                    href={activeLocation.directionsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        flex: '1 1 auto',
                                        minWidth: '200px',
                                        padding: '16px 30px',
                                        borderRadius: '50px',
                                        background: '#ffffff',
                                        color: '#1a1a1a',
                                        border: '2px solid #1a1a1a',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#1a1a1a';
                                        e.currentTarget.style.color = '#ffffff';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#ffffff';
                                        e.currentTarget.style.color = '#1a1a1a';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <span className="icon-pin"></span>
                                    Get Directions
                                    <span className="icon-right-arrow" style={{ fontSize: '12px' }}></span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default LocationTabs;