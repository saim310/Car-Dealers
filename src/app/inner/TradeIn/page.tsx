"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import {
    Car,
    User,
    Phone,
    Mail,
    MapPin,
    Gauge,
    Settings,
    Palette,
    Hash,
    FileText,
    Upload,
    Send,
    CheckCircle2,
    ShieldCheck,
    ArrowRight,
    Camera,
    DollarSign,
    Calendar,
    ClipboardList
} from 'lucide-react';

const valueFactors = [
    "The age of the used car",
    "Kilometres travelled",
    "Make and model",
    "Current market demand",
    "Service and maintenance history"
];

const requiredDocuments = [
    "Identification",
    "Vehicle Registration Certificate",
    "Service History",
    "Roadworthy Certificate (RWC)",
    "Proof of Purchase",
    "Finance Payout Letter"
];

const TradeInPage: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        daytimePhone: '',
        mobilePhone: '',
        address: '',
        suburb: '',
        state: '',
        postcode: '',
        year: '',
        make: '',
        model: '',
        variant: '',
        odometer: '',
        transmission: '',
        engineSize: '',
        colour: '',
        registration: '',
        comments: ''
    });

    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).map(f => f.name);
            setUploadedFiles(prev => [...prev, ...files].slice(0, 4));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Trade-in enquiry submitted successfully! We will contact you with a valuation soon.');
    };

    const fadeInUp = {
        initial: { y: 40, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" } as any, 
        viewport: { once: true }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '14px 18px',
        border: '2px solid #e8e8e8',
        borderRadius: '12px',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.3s ease',
        background: '#fafafa',
        color: '#1a1a1a'
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '11px',
        fontWeight: 700,
        color: '#1a1a1a',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        marginBottom: '8px'
    };

    return (
        <div className="trade-in-page">
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
                            Get the Best Value
                        </span>
                        <h1 style={{
                            fontSize: 'clamp(28px, 5vw, 48px)',
                            fontWeight: 800,
                            color: '#ffffff',
                            textTransform: 'uppercase',
                            lineHeight: 1.2,
                            marginBottom: '20px',
                            maxWidth: '900px',
                            margin: '0 auto 20px'
                        }}>
                            Get The Best Used Car <span style={{ color: '#f5b93c' }}>Trade-In Value</span>
                        </h1>
                        <p style={{
                            fontSize: '18px',
                            color: '#888',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: 1.8
                        }}>
                            Whether you're looking to trade in a used car or sell it outright, we're committed to giving our customers the fairest price possible for their existing vehicle.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ===== TRADE-IN FORM ===== */}
            <section style={{ background: '#faf8f5', padding: '80px 0' }}>
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
                            Start Your Valuation
                        </span>
                        <h2 style={{
                            fontSize: 'clamp(28px, 4vw, 42px)',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            textTransform: 'uppercase',
                            lineHeight: 1.2,
                            marginBottom: '12px'
                        }}>
                            Trade-In <span style={{ color: '#f5b93c' }}>Enquiry Form</span>
                        </h2>
                        <p style={{
                            color: '#888',
                            fontSize: '16px',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}>
                            Complete the form below and we'll get back to you with a price for your vehicle as soon as possible.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div style={{
                            maxWidth: '1000px',
                            margin: '0 auto',
                            background: '#ffffff',
                            borderRadius: '24px',
                            padding: '50px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
                        }}>
                            <form onSubmit={handleSubmit}>
                                {/* Your Details */}
                                <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px',
                                        marginBottom: '25px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        paddingBottom: '15px',
                                        borderBottom: '2px solid #f5b93c'
                                    }}>
                                        <User size={20} color="#f5b93c" strokeWidth={2.5} />
                                        Your Details
                                    </h3>
                                    <div className="row" style={{ marginBottom: '8px' }}>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Smith"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Email Address *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Daytime Phone *</label>
                                            <input
                                                type="tel"
                                                name="daytimePhone"
                                                placeholder="03 XXXX XXXX"
                                                value={formData.daytimePhone}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Mobile Phone *</label>
                                            <input
                                                type="tel"
                                                name="mobilePhone"
                                                placeholder="04XX XXX XXX"
                                                value={formData.mobilePhone}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Home Address *</label>
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="123 Main Street"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Suburb *</label>
                                            <input
                                                type="text"
                                                name="suburb"
                                                placeholder="Maidstone"
                                                value={formData.suburb}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>State *</label>
                                            <input
                                                type="text"
                                                name="state"
                                                placeholder="VIC"
                                                value={formData.state}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Postcode *</label>
                                            <input
                                                type="text"
                                                name="postcode"
                                                placeholder="3012"
                                                value={formData.postcode}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle Details */}
                                <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px',
                                        marginBottom: '25px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        paddingBottom: '15px',
                                        borderBottom: '2px solid #f5b93c'
                                    }}>
                                        <Car size={20} color="#f5b93c" strokeWidth={2.5} />
                                        Trade-In Vehicle Details
                                    </h3>
                                    <div className="row" style={{ marginBottom: '8px' }}>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Year *</label>
                                            <input
                                                type="text"
                                                name="year"
                                                placeholder="2019"
                                                value={formData.year}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Make *</label>
                                            <input
                                                type="text"
                                                name="make"
                                                placeholder="Toyota"
                                                value={formData.make}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Model *</label>
                                            <input
                                                type="text"
                                                name="model"
                                                placeholder="Corolla"
                                                value={formData.model}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Variant *</label>
                                            <input
                                                type="text"
                                                name="variant"
                                                placeholder="Ascent Sport"
                                                value={formData.variant}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Odometer *</label>
                                            <input
                                                type="text"
                                                name="odometer"
                                                placeholder="85,000 km"
                                                value={formData.odometer}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Transmission *</label>
                                            <select
                                                name="transmission"
                                                value={formData.transmission}
                                                onChange={handleChange}
                                                required
                                                style={{
                                                    ...inputStyle,
                                                    appearance: 'none',
                                                    WebkitAppearance: 'none',
                                                    cursor: 'pointer'
                                                }}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            >
                                                <option value="">Select Transmission</option>
                                                <option value="Automatic">Automatic</option>
                                                <option value="Manual">Manual</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Engine Size (cc) *</label>
                                            <input
                                                type="text"
                                                name="engineSize"
                                                placeholder="1800"
                                                value={formData.engineSize}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Colour *</label>
                                            <input
                                                type="text"
                                                name="colour"
                                                placeholder="Silver"
                                                value={formData.colour}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                        <div className="col-md-4" style={{ marginBottom: '20px' }}>
                                            <label style={labelStyle}>Registration *</label>
                                            <input
                                                type="text"
                                                name="registration"
                                                placeholder="ABC123"
                                                value={formData.registration}
                                                onChange={handleChange}
                                                required
                                                style={inputStyle}
                                                onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                                onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Photo Upload */}
                                <div style={{ marginBottom: '40px' }}>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        color: '#1a1a1a',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px',
                                        marginBottom: '25px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        paddingBottom: '15px',
                                        borderBottom: '2px solid #f5b93c'
                                    }}>
                                        <Camera size={20} color="#f5b93c" strokeWidth={2.5} />
                                        Trade-In Vehicle Photos
                                    </h3>
                                    <p style={{ color: '#555', fontSize: '15px', marginBottom: '8px' }}>
                                        Please upload up to four images of your vehicle.
                                    </p>
                                    <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px', fontStyle: 'italic' }}>
                                        File Formats accepted: PNG, JPEG, HEIC, PDF, and GIF.
                                    </p>

                                    <div style={{
                                        border: '2px dashed #e0e0e0',
                                        borderRadius: '16px',
                                        padding: '40px',
                                        textAlign: 'center',
                                        background: '#fafafa',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e0e0e0'}
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                    >
                                        <input
                                            type="file"
                                            id="file-upload"
                                            multiple
                                            accept=".jpg,.jpeg,.png,.heic,.pdf,.gif"
                                            onChange={handleFileUpload}
                                            style={{ display: 'none' }}
                                        />
                                        <Upload size={40} color="#f5b93c" strokeWidth={1.5} style={{ marginBottom: '15px' }} />
                                        <p style={{ color: '#1a1a1a', fontWeight: 600, marginBottom: '8px' }}>
                                            Click to upload or drag files here
                                        </p>
                                        <p style={{ color: '#888', fontSize: '13px' }}>
                                            Maximum 4 files
                                        </p>
                                    </div>

                                    {uploadedFiles.length > 0 && (
                                        <div style={{ marginTop: '20px' }}>
                                            <p style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a', marginBottom: '10px' }}>
                                                Uploaded Files ({uploadedFiles.length}/4):
                                            </p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                                {uploadedFiles.map((file, i) => (
                                                    <div key={i} style={{
                                                        padding: '8px 16px',
                                                        background: '#f5b93c',
                                                        borderRadius: '8px',
                                                        color: '#1a1a1a',
                                                        fontSize: '13px',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    }}>
                                                        <FileText size={14} strokeWidth={2.5} />
                                                        {file}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Comments */}
                                <div style={{ marginBottom: '30px' }}>
                                    <label style={labelStyle}>Comments *</label>
                                    <textarea
                                        name="comments"
                                        placeholder="Tell us about the condition of your vehicle, any recent repairs, or additional details..."
                                        value={formData.comments}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        style={{
                                            ...inputStyle,
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                        onFocus={(e) => e.currentTarget.style.borderColor = '#f5b93c'}
                                        onBlur={(e) => e.currentTarget.style.borderColor = '#e8e8e8'}
                                    />
                                </div>

                                {/* reCAPTCHA Placeholder */}
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

                                {/* Submit */}
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
                                        Submit Enquiry
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== VALUE ESTIMATION INFO ===== */}
            <section style={{ background: '#ffffff', padding: '80px 0' }}>
                <div className="container">
                    <div className="row">
                        {/* Value Factors */}
                        <motion.div
                            className="col-lg-6"
                            initial={{ x: -40, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            style={{ marginBottom: '40px' }}
                        >
                            <div style={{
                                background: '#faf8f5',
                                borderRadius: '20px',
                                padding: '40px',
                                height: '100%'
                            }}>
                                <h2 style={{
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    color: '#1a1a1a',
                                    marginBottom: '20px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <DollarSign size={24} color="#f5b93c" strokeWidth={2.5} />
                                    Used Car Trade-in Value Estimation
                                </h2>
                                <p style={{
                                    color: '#555',
                                    fontSize: '15px',
                                    lineHeight: '1.8',
                                    marginBottom: '25px'
                                }}>
                                    If you're wondering about the <Link href="/" style={{ color: '#f5b93c', textDecoration: 'none', fontWeight: 700 }}>used car trade-in value</Link>, it depends on several factors. We determined the sale price of your used car based on the following factors:
                                </p>

                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {valueFactors.map((factor, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ x: -20, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                            viewport={{ once: true }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '12px 0',
                                                borderBottom: i < valueFactors.length - 1 ? '1px solid #e0e0e0' : 'none'
                                            }}
                                        >
                                            <div style={{
                                                width: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                background: '#f5b93c',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <CheckCircle2 size={14} color="#1a1a1a" strokeWidth={3} />
                                            </div>
                                            <span style={{ color: '#555', fontSize: '15px', fontWeight: 500 }}>{factor}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Required Documents */}
                        <motion.div
                            className="col-lg-6"
                            initial={{ x: 40, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            style={{ marginBottom: '40px' }}
                        >
                            <div style={{
                                background: '#1a1a1a',
                                borderRadius: '20px',
                                padding: '40px',
                                height: '100%',
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
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    color: '#ffffff',
                                    marginBottom: '20px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}>
                                    <ClipboardList size={24} color="#f5b93c" strokeWidth={2.5} />
                                    Paperwork Required
                                </h2>
                                <p style={{
                                    color: '#aaa',
                                    fontSize: '15px',
                                    lineHeight: '1.8',
                                    marginBottom: '25px'
                                }}>
                                    When you decide to trade in a <Link href="/used-cars-in-maidstone/" style={{ color: '#f5b93c', textDecoration: 'none', fontWeight: 700 }}>used car in Melbourne</Link>, make sure to have these documents ready, as they are necessary for trade-in or selling the vehicle:
                                </p>

                                <div className="row">
                                    {requiredDocuments.map((doc, i) => (
                                        <motion.div
                                            key={i}
                                            className="col-md-6"
                                            initial={{ y: 15, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.4, delay: i * 0.08 }}
                                            viewport={{ once: true }}
                                            style={{ marginBottom: '12px' }}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                padding: '12px 16px',
                                                background: 'rgba(255,255,255,0.05)',
                                                borderRadius: '10px',
                                                border: '1px solid rgba(255,255,255,0.08)'
                                            }}>
                                                <FileText size={14} color="#f5b93c" strokeWidth={2.5} />
                                                <span style={{ color: '#ccc', fontSize: '13px', fontWeight: 500 }}>{doc}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA Banner */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        style={{ marginTop: '40px' }}
                    >
                        <div style={{
                            background: '#f5b93c',
                            borderRadius: '20px',
                            padding: '40px',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-30px',
                                right: '-30px',
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.2)'
                            }} />
                            <div style={{
                                position: 'absolute',
                                bottom: '-20px',
                                left: '-20px',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.15)'
                            }} />
                            <h3 style={{
                                fontSize: '24px',
                                fontWeight: 800,
                                color: '#1a1a1a',
                                textTransform: 'uppercase',
                                marginBottom: '12px',
                                position: 'relative'
                            }}>
                                Ready to Trade In?
                            </h3>
                            <p style={{
                                color: '#1a1a1a',
                                fontSize: '16px',
                                marginBottom: '25px',
                                maxWidth: '500px',
                                margin: '0 auto 25px',
                                position: 'relative'
                            }}>
                                Simply complete the form above and we'll get back to you with a price for your vehicle as soon as possible.
                            </p>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '16px 36px',
                                    background: '#1a1a1a',
                                    color: '#f5b93c',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.5px',
                                    transition: 'all 0.3s ease',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = '#ffffff';
                                    e.currentTarget.style.color = '#1a1a1a';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = '#1a1a1a';
                                    e.currentTarget.style.color = '#f5b93c';
                                }}
                            >
                                Fill Out Form
                                <ArrowRight size={16} strokeWidth={2.5} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default TradeInPage;
