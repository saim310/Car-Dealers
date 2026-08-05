"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';

const WarrantyPage: React.FC = () => {
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
        alert('Warranty enquiry submitted successfully!');
        setFormData({ name: '', phone: '', email: '', message: '' });
    };

    const fadeInUp = {
        initial: { y: 40, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" } as any,
        viewport: { once: true }
    };

    return (
        <section className="warranty-page" style={{ padding: '100px 0', backgroundColor: '#faf8f5' }}>
            <div className="container">
                {/* Page Title */}
                <motion.div 
                    className="section-title text-center"
                    {...fadeInUp}
                    style={{ marginBottom: '60px' }}
                >
                  
                    <h1 style={{ 
                        fontSize: 'clamp(32px, 5vw, 48px)', 
                        fontWeight: 800, 
                        color: '#1a1a1a',
                        textTransform: 'uppercase',
                        margin: 0,
                        lineHeight: 1.2
                    }}>
                        Used Car <span style={{ color: '#f5b93c' }}>Warranty</span>
                    </h1>
                </motion.div>

                <div className="row">
                    {/* Left Column - Content */}
                    <div className="col-lg-7">
                        <motion.div
                            initial={{ x: -40, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            {/* Intro */}
                            <div style={{ marginBottom: '40px' }}>
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: '#1a1a1a',
                                    marginBottom: '20px',
                                    lineHeight: 1.6
                                }}>
                                    Guarantees on Japanese Imports with UKA Japan Motors.
                                </p>
                                <p style={{
                                    fontSize: '16px',
                                    color: '#555',
                                    lineHeight: 1.8,
                                    marginBottom: '20px'
                                }}>
                                    UKA Japan Motors is a reliable Japanese used car importer in <strong style={{ color: '#1a1a1a' }}>Melbourne VIC and Brisbane QLD</strong>, providing quality used car warranty options so you can buy with confidence. We care about our customers and are dedicated to delivering the best possible warranty coverage to help you save on unexpected repair costs in the long run.
                                </p>
                            </div>

                            {/* Service Location & Warranty Notice */}
                            <div style={{ 
                                background: '#ffffff', 
                                borderRadius: '16px', 
                                padding: '35px',
                                marginBottom: '30px',
                                boxShadow: '0 5px 30px rgba(0,0,0,0.05)'
                            }}>
                                <h2 style={{
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    marginBottom: '20px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    Service Location & Warranty Notice
                                </h2>
                                <div style={{ color: '#555', lineHeight: '1.8', fontSize: '15px' }}>
                                    <p style={{ marginBottom: '15px' }}>
                                        UKA Japan Motors operates from Victoria, with an additional branch in Brisbane, Queensland. All warranty inspections, assessments, and repairs are carried out at our authorised workshop locations in these states.
                                    </p>
                                    <p style={{ marginBottom: '15px' }}>
                                        Warranty support is available at our Victoria and Brisbane locations. Customers may bring their vehicle to the nearest authorised UKA Japan Motors location for assessment and repairs.
                                    </p>
                                    <p style={{ marginBottom: '15px' }}>
                                        If a vehicle is located outside Victoria or Brisbane, customers may be required to return the vehicle to one of our authorised locations for warranty inspection and repair, unless otherwise agreed in writing.
                                    </p>
                                    <p style={{ marginBottom: '15px' }}>
                                        In some cases, UKA Japan Motors may assist in arranging repairs through an approved third-party workshop; however, this must be authorised by us in advance.
                                    </p>
                                </div>
                            </div>

                            {/* Extended Warranty Recommendation */}
                            <div style={{ 
                                background: '#ffffff', 
                                borderRadius: '16px', 
                                padding: '35px',
                                marginBottom: '30px',
                                boxShadow: '0 5px 30px rgba(0,0,0,0.05)'
                            }}>
                                <h2 style={{
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    marginBottom: '20px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    Extended Warranty Recommendation
                                </h2>
                                <div style={{ color: '#555', lineHeight: '1.8', fontSize: '15px' }}>
                                    <p style={{ marginBottom: '15px' }}>
                                        If you plan to use or relocate your vehicle outside Victoria or Brisbane, we recommend considering our extended warranty options for added convenience and broader support.
                                    </p>
                                    <p style={{ marginBottom: '15px' }}>
                                        Extended warranty plans may provide access to a wider network of approved repairers, helping reduce the need to return the vehicle to our authorised locations.
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        Extended warranties are optional and are offered in addition to your rights under the Australian Consumer Law.
                                    </p>
                                </div>
                            </div>

                            {/* Consumer Law Notice */}
                            <div style={{ 
                                background: '#1a1a1a', 
                                borderRadius: '16px', 
                                padding: '35px',
                                marginBottom: '30px',
                                borderLeft: '4px solid #f5b93c'
                            }}>
                                <h2 style={{
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    color: '#f5b93c',
                                    marginBottom: '20px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    Consumer Law Notice
                                </h2>
                                <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: '15px' }}>
                                    <p style={{ marginBottom: '10px' }}>
                                        Our vehicles come with guarantees that cannot be excluded under the Australian Consumer Law.
                                    </p>
                                    <p style={{ margin: 0 }}>
                                        Nothing in this warranty policy excludes or limits your rights under the Australian Consumer Law.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="col-lg-5">
                        <motion.div
                            initial={{ x: 40, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                            style={{
                                position: 'sticky',
                                top: '100px'
                            }}
                        >
                            <div style={{
                                background: '#ffffff',
                                borderRadius: '20px',
                                padding: '40px',
                                boxShadow: '0 10px 50px rgba(0,0,0,0.08)'
                            }}>
                                <h2 style={{
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    textAlign: 'center',
                                    marginBottom: '30px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px'
                                }}>
                                    Warranty <span style={{ color: '#f5b93c' }}>Enquiry</span>
                                </h2>

                                <form onSubmit={handleSubmit}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="NAME *"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e0e0e0',
                                                borderRadius: '10px',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                outline: 'none',
                                                transition: 'border-color 0.3s',
                                                background: '#fafafa'
                                            }}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="PHONE *"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e0e0e0',
                                                borderRadius: '10px',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                outline: 'none',
                                                transition: 'border-color 0.3s',
                                                background: '#fafafa'
                                            }}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="EMAIL *"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e0e0e0',
                                                borderRadius: '10px',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                outline: 'none',
                                                transition: 'border-color 0.3s',
                                                background: '#fafafa'
                                            }}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                        />
                                    </div>

                                    <div style={{ marginBottom: '25px' }}>
                                        <textarea
                                            name="message"
                                            placeholder="YOUR MESSAGE *"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            style={{
                                                width: '100%',
                                                padding: '16px 20px',
                                                border: '2px solid #e0e0e0',
                                                borderRadius: '10px',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
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

                                    {/* Note: reCAPTCHA integration would go here */}
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
                                            width: '100%',
                                            padding: '18px',
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
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
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
                                        Submit Enquiry
                                        <span className="icon-right-arrow" style={{ fontSize: '12px' }}></span>
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WarrantyPage;
