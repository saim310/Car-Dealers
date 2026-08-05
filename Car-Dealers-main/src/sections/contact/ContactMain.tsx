"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';

interface LocationData {
    id: string;
    name: string;
    phone: string;
    mobile: string;
    email: string;
    address: string;
    mapUrl: string;
    directionsUrl: string;
    license: string;
    abn: string;
}

const locations: LocationData[] = [
    {
        id: "maidstone",
        name: "MAIDSTONE",
        phone: "03 4329 0786",
        mobile: "1800 006 256",
        email: "sales.maidstone@ukajapan.com.au",
        address: "205 Ballarat Rd, Maidstone, VIC 3012",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25226.597478793476!2d144.866819!3d-37.78243!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65f483d70ac55%3A0xe1aaed36e5020905!2sNJ%20Japan%20Motors%20-%20Maidstone%20-%20Melbourne!5e0!3m2!1sen!2sau!4v1767938640908!5m2!1sen!2sau",
        directionsUrl: "https://maps.app.goo.gl/mro1EoXZtAkH1udS8",
        license: "LMCT0012708",
        abn: "89 671 445 248"
    },
    {
        id: "mordialloc",
        name: "MORDIALLOC",
        phone: "03 7065 6403",
        mobile: "1800 006 256",
        email: "sales.mordialloc@ukajapan.com.au",
        address: "247 Boundary Road, Mordialloc, VIC 3195",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.348351864389!2d145.1067597!3d-37.9923344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66d0ed73e94c1%3A0x67c4c303bc9a70fb!2sNJ%20Japan%20Motors%20-%20Mordialloc!5e0!3m2!1sen!2sau!4v1767833115720!5m2!1sen!2sau",
        directionsUrl: "https://maps.app.goo.gl/QQzx2J9NpfAKKuQA8",
        license: "LMCT0012708",
        abn: "89 671 445 248"
    },
    {
        id: "brisbane",
        name: "BRISBANE",
        phone: "07 2147 6999",
        mobile: "1800 006 256",
        email: "sales.brisbane@ukajapan.com.au",
        address: "33 Randall St, Slacks Creek, QLD 4127",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.965720758846!2d153.1211416!3d-27.625578299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b914319f0539a1d%3A0xe2164c4f045509cb!2sNJ%20Japan%20Motors%20-%20Brisbane!5e0!3m2!1sen!2sau!4v1770075890792!5m2!1sen!2sau",
        directionsUrl: "https://maps.app.goo.gl/5YbyzyC7zCd3hr2s8",
        license: "LMCT4933717",
        abn: "89 671 445 248"
    }
];

const socialLinks = [
    {
        name: "Facebook",
        href: "https://www.facebook.com/people/UKA-Japan-Motors-Australia/61578428242170/",
        icon: "fab fa-facebook"
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/uka_japanmotors_australia/",
        icon: "fab fa-instagram"
    }
];

const ContactMain: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Enquiry submitted successfully!');
        setFormData({ name: '', phone: '', email: '', message: '' });
    };

    const fadeInUp: any =  {
        initial: { y: 40, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" },
        viewport: { once: true }
    };

    return (
        <section className="contact-page" style={{ padding: '100px 0', backgroundColor: '#faf8f5' }}>
            <div className="container">
                {/* Page Title */}
                <motion.div 
                    className="section-title text-center"
                    {...fadeInUp}
                    style={{ marginBottom: '60px' }}
                >
                    <span style={{ 
                        color: '#f5b93c', 
                        fontWeight: 600, 
                        textTransform: 'uppercase', 
                        fontSize: '14px', 
                        letterSpacing: '3px',
                        display: 'block',
                        marginBottom: '10px'
                    }}>
                        Get in Touch
                    </span>
                    <h1 style={{ 
                        fontSize: 'clamp(32px, 5vw, 48px)', 
                        fontWeight: 800, 
                        color: '#1a1a1a',
                        textTransform: 'uppercase',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        Contact <span style={{ color: '#f5b93c' }}>Us</span>
                    </h1>
                </motion.div>

                {/* Location Cards Grid */}
                <div className="row" style={{ marginBottom: '80px' }}>
                    {locations.map((loc, index) => (
                        <motion.div 
                            key={loc.id}
                            className="col-lg-4 col-md-6"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
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
                                flexDirection: 'column'
                            }}>
                                {/* Location Header */}
                                <div style={{
                                    background: '#1a1a1a',
                                    padding: '25px 30px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: '-20px',
                                        right: '-20px',
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        background: '#f5b93c',
                                        opacity: 0.15
                                    }} />
                                    <h2 style={{
                                        margin: 0,
                                        fontSize: '22px',
                                        fontWeight: 700,
                                        color: '#ffffff',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        position: 'relative',
                                        zIndex: 1
                                    }}>
                                        {loc.name}
                                    </h2>
                                </div>

                                {/* Location Details */}
                                <div style={{ padding: '30px', flex: 1 }}>
                                    {/* Phone */}
                                    <div style={{ marginBottom: '18px' }}>
                                        <h3 style={{
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            color: '#f5b93c',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            marginBottom: '6px'
                                        }}>
                                            Phone
                                        </h3>
                                        <a href={`tel:${loc.phone}`} style={{
                                            color: '#555',
                                            textDecoration: 'none',
                                            fontSize: '15px',
                                            transition: 'color 0.3s',
                                            fontWeight: 500
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#f5b93c'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                                        >
                                            {loc.phone}
                                        </a>
                                    </div>

                                    {/* Mobile */}
                                    <div style={{ marginBottom: '18px' }}>
                                        <h3 style={{
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            color: '#f5b93c',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            marginBottom: '6px'
                                        }}>
                                            Mobile
                                        </h3>
                                        <a href={`tel:${loc.mobile}`} style={{
                                            color: '#555',
                                            textDecoration: 'none',
                                            fontSize: '15px',
                                            transition: 'color 0.3s',
                                            fontWeight: 500
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#f5b93c'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                                        >
                                            {loc.mobile}
                                        </a>
                                    </div>

                                    {/* Email */}
                                    <div style={{ marginBottom: '18px' }}>
                                        <h3 style={{
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            color: '#f5b93c',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            marginBottom: '6px'
                                        }}>
                                            Email
                                        </h3>
                                        <a href={`mailto:${loc.email}`} style={{
                                            color: '#555',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            transition: 'color 0.3s',
                                            wordBreak: 'break-all',
                                            fontWeight: 500
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#f5b93c'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                                        >
                                            {loc.email}
                                        </a>
                                    </div>

                                    {/* Opening Hours */}
                                    <div style={{ marginBottom: '18px' }}>
                                        <h3 style={{
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            color: '#f5b93c',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            marginBottom: '6px'
                                        }}>
                                            Opening Hours
                                        </h3>
                                        <p style={{ margin: '0 0 4px', color: '#555', fontSize: '14px' }}>
                                            Monday - Saturday: 9:00 AM - 5:30 PM
                                        </p>
                                        <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
                                            Sunday: 10:00 AM - 3:00 PM
                                        </p>
                                    </div>

                                    {/* Address */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <h3 style={{
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            color: '#f5b93c',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            marginBottom: '6px'
                                        }}>
                                            Address
                                        </h3>
                                        <a 
                                            href={loc.directionsUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{
                                                color: '#555',
                                                textDecoration: 'none',
                                                fontSize: '14px',
                                                transition: 'color 0.3s',
                                                fontWeight: 500
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = '#f5b93c'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                                        >
                                            {loc.address}
                                        </a>
                                    </div>

                                    {/* Map */}
                                    <div style={{
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        marginBottom: '20px',
                                        position: 'relative',
                                        paddingTop: '56.25%'
                                    }}>
                                        <iframe
                                            src={loc.mapUrl}
                                            title={`Map for ${loc.name}`}
                                            width="100%"
                                            height="100%"
                                            style={{
                                                border: 'none',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0
                                            }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                    </div>

                                    {/* Social Links */}
                                    <div style={{ marginBottom: '18px' }}>
                                        <h3 style={{
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            color: '#f5b93c',
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            marginBottom: '10px'
                                        }}>
                                            Connect With Us
                                        </h3>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            {socialLinks.map((social) => (
                                                <a
                                                    key={social.name}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        width: '42px',
                                                        height: '42px',
                                                        borderRadius: '10px',
                                                        background: '#f5f5f5',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#1a1a1a',
                                                        textDecoration: 'none',
                                                        fontSize: '18px',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = '#f5b93c';
                                                        e.currentTarget.style.color = '#ffffff';
                                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = '#f5f5f5';
                                                        e.currentTarget.style.color = '#1a1a1a';
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                    }}
                                                >
                                                    <span className={social.icon}></span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    {/* License & ABN */}
                                    <div style={{
                                        borderTop: '1px solid #f0f0f0',
                                        paddingTop: '15px'
                                    }}>
                                        <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#999' }}>
                                            <strong style={{ color: '#1a1a1a' }}>Dealer Licence:</strong> {loc.license}
                                        </p>
                                        <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>
                                            <strong style={{ color: '#1a1a1a' }}>ABN:</strong> {loc.abn}
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div style={{ padding: '0 30px 30px' }}>
                                    <a
                                        href={`tel:${loc.phone}`}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            width: '100%',
                                            padding: '14px',
                                            background: '#f5b93c',
                                            color: '#1a1a1a',
                                            borderRadius: '10px',
                                            textDecoration: 'none',
                                            fontWeight: 700,
                                            fontSize: '13px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1.5px',
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
                                        <span className="icon-call"></span>
                                        Call {loc.name}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Enquiry Form Section */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div style={{
                        background: '#ffffff',
                        borderRadius: '20px',
                        padding: '50px',
                        boxShadow: '0 10px 50px rgba(0,0,0,0.08)'
                    }}>
                        <div className="row">
                            <div className="col-lg-5" style={{ marginBottom: '40px' }}>
                                <h2 style={{
                                    fontSize: '32px',
                                    fontWeight: 800,
                                    color: '#1a1a1a',
                                    textTransform: 'uppercase',
                                    marginBottom: '20px',
                                    lineHeight: 1.2
                                }}>
                                    Send Us an <span style={{ color: '#f5b93c' }}>Enquiry</span>
                                </h2>
                                <p style={{
                                    fontSize: '16px',
                                    color: '#555',
                                    lineHeight: '1.8',
                                    marginBottom: '30px'
                                }}>
                                    Have a question about our vehicles, warranty, or services? Fill out the form and our team will get back to you within 24 hours.
                                </p>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
                                            <span className="icon-envelope" style={{ color: '#1a1a1a', fontSize: '20px' }}></span>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Us</p>
                                            <a href="mailto:info@ukajapan.com.au" style={{ color: '#1a1a1a', textDecoration: 'none', fontWeight: 600 }}>info@ukajapan.com.au</a>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
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
                                            <span className="icon-call" style={{ color: '#1a1a1a', fontSize: '20px' }}></span>
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: '13px', color: '#999', textTransform: 'uppercase', letterSpacing: '1px' }}>Call Us</p>
                                            <a href="tel:1800006256" style={{ color: '#1a1a1a', textDecoration: 'none', fontWeight: 600 }}>1800 006 256</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7">
                                <form onSubmit={handleSubmit}>
                                    <div className="row" style={{ marginBottom: '20px' }}>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                color: '#1a1a1a',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '8px'
                                            }}>
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name *"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 18px',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '10px',
                                                    fontSize: '14px',
                                                    outline: 'none',
                                                    transition: 'border-color 0.3s',
                                                    background: '#fafafa'
                                                }}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                color: '#1a1a1a',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '8px'
                                            }}>
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone *"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 18px',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '10px',
                                                    fontSize: '14px',
                                                    outline: 'none',
                                                    transition: 'border-color 0.3s',
                                                    background: '#fafafa'
                                                }}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={{
                                                display: 'block',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                color: '#1a1a1a',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                marginBottom: '8px'
                                            }}>
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email *"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 18px',
                                                    border: '2px solid #e0e0e0',
                                                    borderRadius: '10px',
                                                    fontSize: '14px',
                                                    outline: 'none',
                                                    transition: 'border-color 0.3s',
                                                    background: '#fafafa'
                                                }}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '25px' }}>
                                        <label style={{
                                            display: 'block',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            color: '#1a1a1a',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            marginBottom: '8px'
                                        }}>
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            placeholder="Your Message *"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            style={{
                                                width: '100%',
                                                padding: '14px 18px',
                                                border: '2px solid #e0e0e0',
                                                borderRadius: '10px',
                                                fontSize: '14px',
                                                outline: 'none',
                                                transition: 'border-color 0.3s',
                                                background: '#fafafa',
                                                resize: 'vertical',
                                                fontFamily: 'inherit'
                                            }}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                        />
                                    </div>

                                    {/* reCAPTCHA Placeholder */}
                                    <div style={{ 
                                        marginBottom: '25px',
                                        padding: '15px',
                                        background: '#f5f5f5',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                        fontSize: '12px',
                                        color: '#888'
                                    }}>
                                        reCAPTCHA verification required
                                    </div>

                                    <button
                                        type="submit"
                                        style={{
                                            padding: '16px 40px',
                                            background: '#f5b93c',
                                            color: '#1a1a1a',
                                            border: 'none',
                                            borderRadius: '10px',
                                            fontSize: '14px',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '2px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '10px'
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
                                        Send Enquiry
                                        <span className="icon-right-arrow" style={{ fontSize: '12px' }}></span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactMain;
