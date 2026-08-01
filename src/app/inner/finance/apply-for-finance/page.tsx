"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import {
    CheckCircle2,
    FileText,
    Phone,
    Mail,
    ShieldCheck,
    Banknote,
    ClipboardList,
    Calculator,
    ArrowRight,
    Send,
    Car
} from 'lucide-react';

const benefits = [
    "Budget-friendly monthly payments",
    "Access to high quality Japanese import cars",
    "Financial flexibility customized to your needs",
    "Regular payment improves Credit History",
    "Combined with warranties & insurance provides great value"
];

const documents = [
    "Proof of Income",
    "Employment Status",
    "Credit History",
    "Regular payment improves Credit History",
    "Combined with warranties & insurance provides great value"
];

const featureCards = [
    {
        Icon: Banknote,
        title: "Quick Finance Enquiry",
        description: "Provide your name, contact number, email, and the used car finance amount you're looking for. This helps us quickly understand your needs and reach out with the next steps.",
        link: "/finance-information/#financeenquiry",
        buttonText: "Apply Now"
    },
    {
        Icon: ClipboardList,
        title: "Detailed Application Form",
        description: "Fill out the full used car finance application, including your income, employment details, and any additional information. This allows us to perform an accurate financial assessment.",
        link: "/finance-information/#financeenquiry",
        buttonText: "Apply Now"
    },
    {
        Icon: Calculator,
        title: "Finance Calculator",
        description: "Use our simple used car finance repayment calculator to quickly estimate your weekly, fortnightly, or monthly repayments with ease, accuracy, and complete confidence.",
        link: "/#finance-calc",
        buttonText: "Calculate Now"
    }
];

const FinancePage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        financeAmount: '',
        employmentType: '',
        income: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Finance enquiry submitted successfully! Our team will contact you shortly.');
        setFormData({
            name: '',
            phone: '',
            email: '',
            financeAmount: '',
            employmentType: '',
            income: '',
            message: ''
        });
    };

    const fadeInUp = {
        initial: { y: 40, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" } as any,
        viewport: { once: true }
    };

    return (
        <div className="finance-page">
            {/* ===== HERO SECTION ===== */}
            <section style={{
                background: '#0F0F1B',
                padding: '100px 0 80px',
                position: 'relative',
                overflow: 'hidden'
            }}>
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
                    <motion.div
                        className="text-center"
                        {...fadeInUp}
                    >
                        <span style={{
                            color: '#f5b93c',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            fontSize: '13px',
                            letterSpacing: '3px',
                            display: 'block',
                            marginBottom: '15px'
                        }}>
                            Simple & Stress-Free
                        </span>
                        <h1 style={{
                            fontSize: 'clamp(28px, 5vw, 48px)',
                            fontWeight: 800,
                            color: '#ffffff',
                            textTransform: 'uppercase',
                            lineHeight: 1.2,
                            marginBottom: '20px',
                            maxWidth: '800px',
                            margin: '0 auto 20px'
                        }}>
                            Apply For Used Car <span style={{ color: '#f5b93c' }}>Finance Online</span>
                        </h1>
                        <p style={{
                            fontSize: '18px',
                            color: '#888',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: 1.8
                        }}>
                            At UKA Japan Motors, we make car financing simple and stress-free. Our easy used car finance process ensures quick approvals, competitive interest rates, and tailored plans to suit your budget.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ===== CONTENT SECTION ===== */}
            <section style={{ background: '#faf8f5', padding: '80px 0' }}>
                <div className="container">
                    <div className="row">
                        {/* Left Content */}
                        <motion.div
                            className="col-lg-8"
                            initial={{ x: -40, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div style={{
                                background: '#ffffff',
                                borderRadius: '20px',
                                padding: '45px',
                                boxShadow: '0 10px 50px rgba(0,0,0,0.06)',
                                marginBottom: '30px'
                            }}>
                                <h2 style={{
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    marginBottom: '20px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    Why Choose Used Car Financing with UKA Japan Motors
                                </h2>
                                <p style={{
                                    fontSize: '16px',
                                    color: '#555',
                                    lineHeight: '1.8',
                                    marginBottom: '25px'
                                }}>
                                    Used car finance options make it easier for you to buy your dream car sooner than expected. You can easily pay used car finance fees per month and have your dream car in the garage instead of saving money and waiting around to get a new vehicle. Here are some of the reasons why you should choose used car financing with us:
                                </p>

                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {benefits.map((benefit, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ x: -20, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '15px',
                                                padding: '15px 0',
                                                borderBottom: i < benefits.length - 1 ? '1px solid #f0f0f0' : 'none'
                                            }}
                                        >
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: '#f5b93c',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0,
                                                marginTop: '2px'
                                            }}>
                                                <CheckCircle2 size={16} color="#1a1a1a" strokeWidth={3} />
                                            </div>
                                            <span style={{
                                                color: '#555',
                                                fontSize: '15px',
                                                lineHeight: '1.6',
                                                fontWeight: 500
                                            }}>
                                                {benefit === "Access to high quality Japanese import cars" ? (
                                                    <>
                                                        Access to <Link href="/" style={{ color: '#f5b93c', textDecoration: 'none', fontWeight: 700 }}>high quality Japanese import cars</Link>
                                                    </>
                                                ) : (
                                                    benefit
                                                )}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Documents Required */}
                            <div style={{
                                background: '#1a1a1a',
                                borderRadius: '20px',
                                padding: '45px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '5px',
                                    height: '100%',
                                    background: '#f5b93c'
                                }} />
                                <h2 style={{
                                    fontSize: '24px',
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    marginBottom: '20px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    Documents Required
                                </h2>
                                <p style={{
                                    fontSize: '15px',
                                    color: '#aaa',
                                    lineHeight: '1.8',
                                    marginBottom: '25px'
                                }}>
                                    The requirement of documents varies based on lenders, but here is some general list of documents and conditions that need to be met to apply for the best used car finance in Melbourne:
                                </p>

                                <div className="row">
                                    {documents.map((doc, i) => (
                                        <motion.div
                                            key={i}
                                            className="col-md-6"
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.4, delay: i * 0.08 }}
                                            viewport={{ once: true }}
                                            style={{ marginBottom: '15px' }}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '15px 20px',
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: '12px',
                                                border: '1px solid rgba(255,255,255,0.08)'
                                            }}>
                                                <div style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: '50%',
                                                    background: 'rgba(245,185,56,0.2)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    flexShrink: 0
                                                }}>
                                                    <FileText size={12} color="#f5b93c" strokeWidth={2.5} />
                                                </div>
                                                <span style={{ color: '#ccc', fontSize: '14px', fontWeight: 500 }}>{doc}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Right — Quick Contact */}
                        <motion.div
                            className="col-lg-4"
                            initial={{ x: 40, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div style={{ position: 'sticky', top: '100px' }}>
                                <div style={{
                                    background: '#ffffff',
                                    borderRadius: '20px',
                                    padding: '35px',
                                    boxShadow: '0 10px 50px rgba(0,0,0,0.08)',
                                    marginBottom: '25px'
                                }}>
                                    <h3 style={{
                                        fontSize: '20px',
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        marginBottom: '20px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        Need Help?
                                    </h3>
                                    <p style={{
                                        color: '#555',
                                        fontSize: '15px',
                                        lineHeight: '1.7',
                                        marginBottom: '25px'
                                    }}>
                                        Our finance specialists are ready to assist you with your application. Call us or send an enquiry.
                                    </p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <a
                                            href="tel:1800006256"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '16px 20px',
                                                background: '#f5b93c',
                                                color: '#1a1a1a',
                                                borderRadius: '12px',
                                                textDecoration: 'none',
                                                fontWeight: 700,
                                                fontSize: '14px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
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
                                            <Phone size={18} strokeWidth={2.5} />
                                            1800 006 256
                                        </a>
                                        <a
                                            href="mailto:info@ukajapan.com.au"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '16px 20px',
                                                background: '#fafafa',
                                                color: '#1a1a1a',
                                                borderRadius: '12px',
                                                textDecoration: 'none',
                                                fontWeight: 700,
                                                fontSize: '14px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                border: '2px solid #e0e0e0',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = '#f5b93c';
                                                e.currentTarget.style.color = '#f5b93c';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = '#e0e0e0';
                                                e.currentTarget.style.color = '#1a1a1a';
                                            }}
                                        >
                                            <Mail size={18} strokeWidth={2.5} />
                                            Email Us
                                        </a>
                                    </div>
                                </div>

                                {/* Trust Badge */}
                                <div style={{
                                    background: '#ffffff',
                                    borderRadius: '20px',
                                    padding: '30px',
                                    boxShadow: '0 10px 50px rgba(0,0,0,0.08)',
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        background: '#f5b93c',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 15px'
                                    }}>
                                        <ShieldCheck size={28} color="#1a1a1a" strokeWidth={2} />
                                    </div>
                                    <h4 style={{
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        marginBottom: '8px',
                                        textTransform: 'uppercase'
                                    }}>
                                        Trusted Finance Partner
                                    </h4>
                                    <p style={{
                                        color: '#888',
                                        fontSize: '13px',
                                        margin: 0
                                    }}>
                                        Licensed & regulated under Australian Consumer Law
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURE CARDS ===== */}
            <section style={{ background: '#0F0F1B', padding: '80px 0' }}>
                <div className="container">
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
                            Get Started
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 42px)',
                            fontWeight: 800,
                            color: '#ffffff',
                            textTransform: 'uppercase',
                            lineHeight: 1.2
                        }}>
                            Choose Your <span style={{ color: '#f5b93c' }}>Path</span>
                        </h2>
                    </motion.div>

                    <div className="row">
                        {featureCards.map((card, i) => {
                            const IconComponent = card.Icon;
                            return (
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
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: '20px',
                                        padding: '40px 35px',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        textAlign: 'center',
                                        transition: 'all 0.3s ease',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(245,185,56,0.3)';
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    >
                                        <div style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '20px',
                                            background: 'rgba(245,185,56,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 25px',
                                            border: '2px solid rgba(245,185,56,0.2)'
                                        }}>
                                            <IconComponent size={32} color="#f5b93c" strokeWidth={1.5} />
                                        </div>
                                        <h3 style={{
                                            fontSize: '20px',
                                            fontWeight: 700,
                                            color: '#ffffff',
                                            marginBottom: '15px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            {card.title}
                                        </h3>
                                        <p style={{
                                            color: '#888',
                                            fontSize: '15px',
                                            lineHeight: '1.7',
                                            marginBottom: '25px',
                                            flex: 1
                                        }}>
                                            {card.description}
                                        </p>
                                        <Link
                                            href={card.link}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
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
                                                margin: '0 auto'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#ffffff';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = '#f5b93c';
                                                e.currentTarget.style.transform = 'translateY(0)';
                                            }}
                                        >
                                            {card.buttonText}
                                            <ArrowRight size={14} strokeWidth={3} />
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== FINANCE ENQUIRY FORM ===== */}
            <section id="financeenquiry" style={{ background: '#faf8f5', padding: '100px 0' }}>
                <div className="container">
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
                            Start Your Application
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 42px)',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            textTransform: 'uppercase',
                            lineHeight: 1.2,
                            marginBottom: '12px'
                        }}>
                            Finance <span style={{ color: '#f5b93c' }}>Enquiry Form</span>
                        </h2>
                        <p style={{
                            color: '#888',
                            fontSize: '16px',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            Fill out the form below and our finance team will get back to you within 24 hours.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div style={{
                            maxWidth: '900px',
                            margin: '0 auto',
                            background: '#ffffff',
                            borderRadius: '24px',
                            padding: '50px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
                        }}>
                            <form onSubmit={handleSubmit}>
                                <div className="row" style={{ marginBottom: '8px' }}>
                                    <div className="col-md-6" style={{ marginBottom: '24px' }}>
                                        <label style={formLabelStyle}>Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="John Smith"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={formInputStyle}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                        />
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: '24px' }}>
                                        <label style={formLabelStyle}>Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="04XX XXX XXX"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            style={formInputStyle}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                        />
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: '24px' }}>
                                        <label style={formLabelStyle}>Email Address *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            style={formInputStyle}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                        />
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: '24px' }}>
                                        <label style={formLabelStyle}>Desired Finance Amount</label>
                                        <input
                                            type="text"
                                            name="financeAmount"
                                            placeholder="$20,000"
                                            value={formData.financeAmount}
                                            onChange={handleChange}
                                            style={formInputStyle}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                        />
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: '24px' }}>
                                        <label style={formLabelStyle}>Employment Type</label>
                                        <select
                                            name="employmentType"
                                            value={formData.employmentType}
                                            onChange={handleChange}
                                            style={formSelectStyle}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                        >
                                            <option value="">Select Employment Type</option>
                                            <option value="Full-time">Full-time Employed</option>
                                            <option value="Part-time">Part-time Employed</option>
                                            <option value="Self-employed">Self-employed</option>
                                            <option value="Casual">Casual</option>
                                            <option value="Retired">Retired</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6" style={{ marginBottom: '24px' }}>
                                        <label style={formLabelStyle}>Annual Income</label>
                                        <select
                                            name="income"
                                            value={formData.income}
                                            onChange={handleChange}
                                            style={formSelectStyle}
                                            onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                            onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                        >
                                            <option value="">Select Income Range</option>
                                            <option value="under30k">Under $30,000</option>
                                            <option value="30k-50k">$30,000 - $50,000</option>
                                            <option value="50k-75k">$50,000 - $75,000</option>
                                            <option value="75k-100k">$75,000 - $100,000</option>
                                            <option value="over100k">Over $100,000</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '30px' }}>
                                    <label style={formLabelStyle}>Additional Message</label>
                                    <textarea
                                        name="message"
                                        placeholder="Tell us about the car you're interested in or any specific requirements..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        style={{ ...formInputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                    />
                                </div>

                                <div style={{
                                    marginBottom: '30px',
                                    padding: '20px',
                                    background: '#f5f5f5',
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                    fontSize: '13px',
                                    color: '#888'
                                }}>
                                    reCAPTCHA verification required
                                </div>

                                <div style={{ textAlign: 'center' }}>
                                    <button
                                        type="submit"
                                        style={{
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
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            boxShadow: '0 10px 30px rgba(245,185,56,0.3)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#1a1a1a';
                                            e.currentTarget.style.color = '#f5b93c';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = '#f5b93c';
                                            e.currentTarget.style.color = '#1a1a1a';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <Send size={18} strokeWidth={2.5} />
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

const formLabelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 700,
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    marginBottom: '10px'
};

const formInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px 20px',
    border: '2px solid #e8e8e8',
    borderRadius: '12px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    background: '#fafafa',
    color: '#1a1a1a'
};

const formSelectStyle: React.CSSProperties = {
    ...formInputStyle,
    appearance: 'none',
    WebkitAppearance: 'none',
    cursor: 'pointer'
};

export default FinancePage;
