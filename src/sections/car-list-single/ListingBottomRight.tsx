"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseInt(price.replace(/,/g, '')) : price;
    if (!num || isNaN(num)) return '0';
    return num.toLocaleString('en-US');
};

const getRating = (id: string | number) => {
    const hash = String(id).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return (4.5 + (hash % 5) / 10).toFixed(1);
};

const getReviews = (id: string | number) => {
    const hash = String(id).split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return 50 + (hash % 150);
};

const StarRating = ({ id }: { id: string | number }) => {
    const rating = parseFloat(getRating(id));
    const reviews = getReviews(id);
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const stars = [];
    for (let i = 0; i < full; i++) stars.push(<i key={i} className="fas fa-star" style={{ color: '#ffc107', fontSize: '12px' }}></i>);
    if (half) stars.push(<i key="h" className="fas fa-star-half-alt" style={{ color: '#ffc107', fontSize: '12px' }}></i>);
    for (let i = full + (half ? 1 : 0); i < 5; i++) stars.push(<i key={`e${i}`} className="far fa-star" style={{ color: '#ffc107', fontSize: '12px' }}></i>);
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ display: 'flex', gap: '1px' }}>{stars}</div>
            <span style={{ fontSize: '12px', color: '#666', fontWeight: 600 }}>{rating} ({reviews} reviews)</span>
        </div>
    );
};

// ─── Reusable Modal Shell ───
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
        }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(2px)'
            }} onClick={onClose}></div>
            <div style={{
                position: 'relative',
                background: '#fff',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '520px',
                maxHeight: '92vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)'
            }}>
                {children}
            </div>
        </div>
    );
};

// ─── Car Preview Card (used inside modals) ───
const ModalCarCard = ({ car }: { car?: any }) => {
    const price = car?.Price || car?.price || car?.SpecialPrice || 0;
    return (
        <div style={{
            display: 'flex',
            gap: '14px',
            padding: '14px',
            background: '#f8f9fa',
            borderRadius: '10px',
            border: '1px solid #f0f0f0',
            marginBottom: '20px',
            alignItems: 'center'
        }}>
            <img 
                src={car?.image || "/assets/images/shop/shop-product-1-1.jpg"} 
                alt={car?.title} 
                style={{ width: '90px', height: '64px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
                <h5 style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 6px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {car?.Title || car?.title || 'Toyota Alphard X 2022'}
                </h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '11px', color: '#666' }}>
                    <span><i className="fas fa-leaf" style={{ color: '#28a745', marginRight: '3px' }}></i>{car?.FuelType || car?.fuel || 'Hybrid'}</span>
                    <span><i className="fas fa-cogs" style={{ color: '#888', marginRight: '3px' }}></i>{car?.GearType || car?.transmission || 'Auto'}</span>
                    <span><i className="fas fa-engine" style={{ color: '#888', marginRight: '3px' }}></i>{car?.EngineSize || '2,500 cc'}</span>
                    <span><i className="fas fa-paint-brush" style={{ color: '#888', marginRight: '3px' }}></i>{car?.Color || car?.color || 'Pearl White'}</span>
                </div>
            </div>
            {price > 0 && (
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e', whiteSpace: 'nowrap' }}>
                    ${formatPrice(price)} <span style={{ fontSize: '10px', color: '#888' }}>AUD</span>
                </div>
            )}
        </div>
    );
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '8px',
    border: '1px solid #e5e5e5',
    fontSize: '13px',
    outline: 'none',
    color: '#1a1a2e',
    background: '#fff'
};

const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    color: '#888',
    marginBottom: '5px',
    display: 'block',
    textTransform: 'uppercase',
    letterSpacing: '0.3px'
};

// ─── 1. Schedule Test Drive Modal ───
const TestDriveModal = ({ isOpen, onClose, car }: { isOpen: boolean; onClose: () => void; car?: any }) => {
    const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', time: '', location: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); onClose(); }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: '#fff8e1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <i className="far fa-calendar-check" style={{ color: '#ffc107', fontSize: '18px' }}></i>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 3px 0' }}>Schedule Test Drive</h3>
                            <p style={{ fontSize: '12px', color: '#888', margin: 0, lineHeight: 1.4 }}>
                                Book a test drive at your convenience.<br/>Our team will confirm your appointment.
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: 'none',
                        background: '#f5f5f5',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        color: '#666'
                    }}>✕</button>
                </div>

                <ModalCarCard car={car} />

                {submitted ? (
                    <div style={{ textAlign: 'center', padding: '30px 0' }}>
                        <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '40px', marginBottom: '12px' }}></i>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1a1a2e' }}>Request Submitted!</h4>
                        <p style={{ fontSize: '13px', color: '#666' }}>We will contact you shortly to confirm.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>Full Name *</label>
                            <input style={inputStyle} placeholder="Enter your full name" required 
                                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Phone Number *</label>
                                <div style={{ display: 'flex', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
                                    <span style={{ padding: '10px 8px', background: '#f8f9fa', borderRight: '1px solid #e5e5e5', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        🇦🇺 <i className="fas fa-chevron-down" style={{ fontSize: '8px', color: '#999' }}></i>
                                    </span>
                                    <input style={{ ...inputStyle, border: 'none', borderRadius: 0 }} placeholder="04XX XXX XXX" required 
                                        value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Email Address *</label>
                                <input style={inputStyle} placeholder="Enter your email" type="email" required 
                                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>Preferred Date *</label>
                            <div style={{ position: 'relative' }}>
                                <input style={{ ...inputStyle, paddingRight: '40px' }} type="date" required 
                                    value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                                <i className="far fa-calendar" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '14px', pointerEvents: 'none' }}></i>
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>Preferred Time *</label>
                            <select style={inputStyle} required value={form.time} onChange={e => setForm({...form, time: e.target.value})}>
                                <option value="">Select time</option>
                                <option value="morning">Morning (9AM - 12PM)</option>
                                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                                <option value="evening">Evening (5PM - 7PM)</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>Preferred Location *</label>
                            <select style={inputStyle} required value={form.location} onChange={e => setForm({...form, location: e.target.value})}>
                                <option value="">Select your location</option>
                                <option value="maidstone">Maidstone Yard</option>
                                <option value="mordialloc">Mordialloc Yard</option>
                                <option value="brisbane">Brisbane Yard</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={labelStyle}>Message (Optional)</label>
                            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Anything specific you would like us to know?" 
                                value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px', padding: '10px 12px', background: '#fff8e1', borderRadius: '8px' }}>
                            <i className="fas fa-shield-alt" style={{ color: '#ffc107', fontSize: '14px', marginTop: '2px' }}></i>
                            <span style={{ fontSize: '11px', color: '#887744', lineHeight: 1.4 }}>
                                Your information is safe with us. We will never share your details.
                            </span>
                        </div>

                        <button type="submit" style={{
                            width: '100%',
                            padding: '13px',
                            background: '#ffc107',
                            color: '#1a1a2e',
                            fontWeight: 800,
                            fontSize: '14px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            <i className="far fa-calendar-check"></i> Book Test Drive
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

// ─── 2. Apply for Finance Modal ───
const FinanceModal = ({ isOpen, onClose, car }: { isOpen: boolean; onClose: () => void; car?: any }) => {
    const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', employment: '', income: '', term: '', deposit: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); onClose(); }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: '#fff8e1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <i className="fas fa-dollar-sign" style={{ color: '#ffc107', fontSize: '18px' }}></i>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 3px 0' }}>Apply for Finance</h3>
                            <p style={{ fontSize: '12px', color: '#888', margin: 0, lineHeight: 1.4 }}>
                                Quick and easy finance application.<br/>Get pre-approved in minutes.
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: 'none',
                        background: '#f5f5f5',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        color: '#666'
                    }}>✕</button>
                </div>

                <ModalCarCard car={car} />

                {submitted ? (
                    <div style={{ textAlign: 'center', padding: '30px 0' }}>
                        <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '40px', marginBottom: '12px' }}></i>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1a1a2e' }}>Application Submitted!</h4>
                        <p style={{ fontSize: '13px', color: '#666' }}>Our finance team will contact you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>Full Name *</label>
                            <input style={inputStyle} placeholder="Enter your full name" required 
                                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Phone Number *</label>
                                <div style={{ display: 'flex', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
                                    <span style={{ padding: '10px 8px', background: '#f8f9fa', borderRight: '1px solid #e5e5e5', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        🇦🇺 <i className="fas fa-chevron-down" style={{ fontSize: '8px', color: '#999' }}></i>
                                    </span>
                                    <input style={{ ...inputStyle, border: 'none', borderRadius: 0 }} placeholder="04XX XXX XXX" required 
                                        value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Email Address *</label>
                                <input style={inputStyle} placeholder="Enter your email" type="email" required 
                                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Date of Birth *</label>
                                <div style={{ position: 'relative' }}>
                                    <input style={{ ...inputStyle, paddingRight: '40px' }} type="date" required 
                                        value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} />
                                    <i className="far fa-calendar" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '14px', pointerEvents: 'none' }}></i>
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Employment Status *</label>
                                <select style={inputStyle} required value={form.employment} onChange={e => setForm({...form, employment: e.target.value})}>
                                    <option value="">Select employment status</option>
                                    <option value="full-time">Full Time</option>
                                    <option value="part-time">Part Time</option>
                                    <option value="self-employed">Self Employed</option>
                                    <option value="contract">Contract</option>
                                    <option value="unemployed">Unemployed</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Approx. Annual Income *</label>
                                <select style={inputStyle} required value={form.income} onChange={e => setForm({...form, income: e.target.value})}>
                                    <option value="">Select income range</option>
                                    <option value="30-50">$30,000 - $50,000</option>
                                    <option value="50-70">$50,000 - $70,000</option>
                                    <option value="70-100">$70,000 - $100,000</option>
                                    <option value="100+">$100,000+</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Preferred Loan Term *</label>
                                <select style={inputStyle} required value={form.term} onChange={e => setForm({...form, term: e.target.value})}>
                                    <option value="">Select loan term</option>
                                    <option value="3">3 Years</option>
                                    <option value="4">4 Years</option>
                                    <option value="5">5 Years</option>
                                    <option value="6">6 Years</option>
                                    <option value="7">7 Years</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={labelStyle}>Deposit (Optional)</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '13px', fontWeight: 600 }}>$</span>
                                <input style={{ ...inputStyle, paddingLeft: '28px' }} placeholder="Enter deposit amount" 
                                    value={form.deposit} onChange={e => setForm({...form, deposit: e.target.value})} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px', padding: '14px', background: '#f8f9fa', borderRadius: '10px' }}>
                            <h6 style={{ fontSize: '12px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 10px 0' }}>Why choose finance with us?</h6>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    'Competitive interest rates',
                                    'Fast pre-approval',
                                    'Flexible repayment options',
                                    'Trusted by 1000+ customers'
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#555' }}>
                                        <i className="fas fa-check" style={{ color: '#28a745', fontSize: '10px' }}></i>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button type="submit" style={{
                            width: '100%',
                            padding: '13px',
                            background: '#ffc107',
                            color: '#1a1a2e',
                            fontWeight: 800,
                            fontSize: '14px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            <i className="fas fa-dollar-sign"></i> Submit Finance Application
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

// ─── 3. Enquire Now Modal ───
const EnquiryModal = ({ isOpen, onClose, car }: { isOpen: boolean; onClose: () => void; car?: any }) => {
    const [form, setForm] = useState({ name: '', phone: '', email: '', interest: '', message: '' });
    const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'whatsapp'>('phone');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); onClose(); }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: '#fff8e1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <i className="far fa-comment-dots" style={{ color: '#ffc107', fontSize: '18px' }}></i>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 3px 0' }}>Enquire Now</h3>
                            <p style={{ fontSize: '12px', color: '#888', margin: 0, lineHeight: 1.4 }}>
                                Have questions? We're here to help.<br/>Get in touch with our team.
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: 'none',
                        background: '#f5f5f5',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        color: '#666'
                    }}>✕</button>
                </div>

                <ModalCarCard car={car} />

                {submitted ? (
                    <div style={{ textAlign: 'center', padding: '30px 0' }}>
                        <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '40px', marginBottom: '12px' }}></i>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1a1a2e' }}>Enquiry Sent!</h4>
                        <p style={{ fontSize: '13px', color: '#666' }}>Our team will get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>Full Name *</label>
                            <input style={inputStyle} placeholder="Enter your full name" required 
                                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Phone Number *</label>
                                <div style={{ display: 'flex', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
                                    <span style={{ padding: '10px 8px', background: '#f8f9fa', borderRight: '1px solid #e5e5e5', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        🇦🇺 <i className="fas fa-chevron-down" style={{ fontSize: '8px', color: '#999' }}></i>
                                    </span>
                                    <input style={{ ...inputStyle, border: 'none', borderRadius: 0 }} placeholder="04XX XXX XXX" required 
                                        value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Email Address *</label>
                                <input style={inputStyle} placeholder="Enter your email" type="email" required 
                                    value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>I'm interested in *</label>
                            <select style={inputStyle} required value={form.interest} onChange={e => setForm({...form, interest: e.target.value})}>
                                <option value="">Select an option</option>
                                <option value="test-drive">Book a Test Drive</option>
                                <option value="finance">Finance Application</option>
                                <option value="trade-in">Trade-In Valuation</option>
                                <option value="general">General Enquiry</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '14px' }}>
                            <label style={labelStyle}>Message *</label>
                            <textarea style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }} placeholder="Type your message here..." required
                                value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
                        </div>

                        <div style={{ marginBottom: '14px' }}>
                            <label style={{ ...labelStyle, marginBottom: '8px' }}>Preferred Contact Method</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {([
                                    { key: 'phone', label: 'Phone Call', icon: 'fa-phone-alt' },
                                    { key: 'email', label: 'Email', icon: 'fa-envelope' },
                                    { key: 'whatsapp', label: 'WhatsApp', icon: 'fa-whatsapp' }
                                ] as const).map((m) => (
                                    <button
                                        key={m.key}
                                        type="button"
                                        onClick={() => setContactMethod(m.key)}
                                        style={{
                                            flex: 1,
                                            padding: '10px 6px',
                                            borderRadius: '8px',
                                            border: contactMethod === m.key ? '1.5px solid #ffc107' : '1.5px solid #e5e5e5',
                                            background: contactMethod === m.key ? '#fff8e1' : '#fff',
                                            color: contactMethod === m.key ? '#1a1a2e' : '#888',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '5px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <i className={`fas ${m.icon}`} style={{ fontSize: '12px' }}></i>
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px', padding: '10px 12px', background: '#fff8e1', borderRadius: '8px' }}>
                            <i className="fas fa-shield-alt" style={{ color: '#ffc107', fontSize: '14px', marginTop: '2px' }}></i>
                            <span style={{ fontSize: '11px', color: '#887744', lineHeight: 1.4 }}>
                                We respect your privacy and will never spam you.
                            </span>
                        </div>

                        <button type="submit" style={{
                            width: '100%',
                            padding: '13px',
                            background: '#1a1a2e',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '14px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}>
                            <i className="far fa-envelope"></i> Send Enquiry
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

// ─── Main Sidebar Component ───
export default function ListingBottomRight({ car }: { car?: any }) {
    const price = car?.Price || car?.price || car?.SpecialPrice || 0;
    const hasPrice = price > 0;
    const carId = car?.id || car?.StockNumber || '1';

    const [modal, setModal] = useState<'testdrive' | 'finance' | 'enquiry' | null>(null);

    const [deposit, setDeposit] = useState('10');
    const [loanTerm, setLoanTerm] = useState('5');
    const [interestRate, setInterestRate] = useState('9.5');

    const weeklyRepayment = useMemo(() => {
        const vehiclePrice = hasPrice ? Number(price) : 45995;
        const depositAmount = (Number(deposit) / 100) * vehiclePrice;
        const p = vehiclePrice - depositAmount;
        const r = (Number(interestRate) / 100) / 52;
        const n = Number(loanTerm) * 52;
        if (r === 0) return Math.round(p / n);
        const payment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return Math.round(payment);
    }, [price, deposit, loanTerm, interestRate, hasPrice]);

    const btnBase = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        padding: '12px',
        fontWeight: 800 as const,
        fontSize: '13px',
        borderRadius: '8px',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        border: 'none',
        cursor: 'pointer'
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* Price Box */}
                <div style={{ background: '#fff', borderRadius: '12px', padding: '22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                    <div style={{ fontSize: '11px', color: '#999', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Our Price
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '28px', fontWeight: 900, color: '#1a1a2e' }}>
                            {hasPrice ? `$${formatPrice(price)}` : 'Contact for Price'}
                        </span>
                        {hasPrice && (
                            <span style={{ background: '#ffc107', color: '#1a1a2e', fontSize: '9px', fontWeight: 800, padding: '3px 6px', borderRadius: '4px' }}>
                                AUD
                            </span>
                        )}
                    </div>
                    <div style={{ marginBottom: '14px' }}>
                        <StarRating id={carId} />
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                            { icon: 'fa-dollar-sign', text: 'Finance from $765/week*' },
                            { icon: 'fa-shield-alt', text: '1-5 Year Warranty Options' },
                            { icon: 'fa-file-alt', text: 'Auction Sheet Verified' },
                            { icon: 'fa-truck', text: 'Australia Wide Delivery' },
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#555', fontWeight: 600 }}>
                                <i className={`fas ${item.icon}`} style={{ color: '#ffc107', fontSize: '13px', width: '16px' }}></i>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button onClick={() => setModal('testdrive')} style={{ ...btnBase, background: '#ffc107', color: '#1a1a2e' }}>
                            <i className="far fa-calendar-check" style={{ fontSize: '13px' }}></i>
                            Schedule Test Drive
                        </button>
                        <button onClick={() => setModal('finance')} style={{ ...btnBase, background: '#fff', color: '#1a1a2e', border: '1.5px solid #e5e5e5' }}>
                            <i className="far fa-file-alt" style={{ fontSize: '13px' }}></i>
                            Apply for Finance
                        </button>
                        <button style={{ ...btnBase, background: '#fff', color: '#1a1a2e', border: '1.5px solid #e5e5e5' }}>
                            <i className="fas fa-exchange-alt" style={{ fontSize: '13px' }}></i>
                            Trade-In Valuation
                        </button>
                        <button onClick={() => setModal('enquiry')} style={{ ...btnBase, background: '#1a1a2e', color: '#fff' }}>
                            <i className="far fa-envelope" style={{ fontSize: '13px' }}></i>
                            Enquire Now
                        </button>
                    </div>
                </div>

                {/* Finance Calculator */}
                <div style={{ background: '#fff', borderRadius: '12px', padding: '22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1a1a2e', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Finance Calculator
                    </h4>
                    
                    <div style={{ marginBottom: '10px' }}>
                        <div style={{ fontSize: '10px', color: '#999', fontWeight: 700, marginBottom: '3px', textTransform: 'uppercase' }}>Vehicle Price</div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e' }}>${hasPrice ? formatPrice(price) : '45,995'}</div>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#999', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>
                            <span>Deposit ({deposit}%)</span>
                            <span>${Math.round((Number(deposit) / 100) * (hasPrice ? Number(price) : 45000)).toLocaleString()}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="50" 
                            value={deposit}
                            onChange={(e) => setDeposit(e.target.value)}
                            style={{ width: '100%', accentColor: '#ffc107', height: '4px' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                        <div>
                            <div style={{ fontSize: '10px', color: '#999', fontWeight: 700, marginBottom: '3px', textTransform: 'uppercase' }}>Loan Term</div>
                            <select 
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '9px',
                                    borderRadius: '6px',
                                    border: '1px solid #e5e5e5',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    outline: 'none',
                                    color: '#1a1a2e'
                                }}
                            >
                                <option value="3">3 Years</option>
                                <option value="4">4 Years</option>
                                <option value="5">5 Years</option>
                                <option value="6">6 Years</option>
                                <option value="7">7 Years</option>
                            </select>
                        </div>
                        <div>
                            <div style={{ fontSize: '10px', color: '#999', fontWeight: 700, marginBottom: '3px', textTransform: 'uppercase' }}>Interest Rate</div>
                            <select
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '9px',
                                    borderRadius: '6px',
                                    border: '1px solid #e5e5e5',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    outline: 'none',
                                    color: '#1a1a2e'
                                }}
                            >
                                <option value="7.5">7.50%</option>
                                <option value="8.5">8.50%</option>
                                <option value="9.5">9.50%</option>
                                <option value="10.5">10.50%</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ 
                        background: '#f8f9fa', 
                        borderRadius: '8px', 
                        padding: '14px', 
                        textAlign: 'center',
                        marginBottom: '14px'
                    }}>
                        <div style={{ fontSize: '10px', color: '#999', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>
                            Estimated Repayment
                        </div>
                        <div style={{ fontSize: '22px', fontWeight: 900, color: '#1a1a2e' }}>
                            ${weeklyRepayment}<span style={{ fontSize: '12px', fontWeight: 600 }}> weekly*</span>
                        </div>
                    </div>

                    <button onClick={() => setModal('finance')} style={{ ...btnBase, background: '#ffc107', color: '#1a1a2e' }}>
                        Apply for Finance
                    </button>
                </div>

                {/* Need Help */}
                <div style={{ background: '#fff', borderRadius: '12px', padding: '22px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1a1a2e', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Need Help?
                    </h4>
                    <p style={{ fontSize: '12px', color: '#666', marginBottom: '14px', lineHeight: 1.5 }}>
                        Our friendly team is here to help you find your perfect car.
                    </p>
                    
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            { icon: 'fa-phone-alt', text: '1800 006 256' },
                            { icon: 'fa-comments', text: 'WhatsApp Us' },
                            { icon: 'fa-envelope', text: 'info@uka.com.au' },
                            { icon: 'fa-clock', text: 'Mon - Sun: 9:00 AM - 6:00 PM' },
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#555', fontWeight: 600 }}>
                                <i className={`fas ${item.icon}`} style={{ color: '#1a1a2e', fontSize: '13px', width: '16px' }}></i>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ flex: 1, padding: '10px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: '#999', marginBottom: '3px', fontWeight: 700 }}>Google</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', marginBottom: '2px' }}>
                                {[1,2,3,4].map(i => <i key={i} className="fas fa-star" style={{ color: '#ffc107', fontSize: '9px' }}></i>)}
                                <i className="fas fa-star-half-alt" style={{ color: '#ffc107', fontSize: '9px' }}></i>
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#1a1a2e' }}>4.9</div>
                        </div>
                        <div style={{ flex: 1, padding: '10px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '10px', color: '#999', marginBottom: '3px', fontWeight: 700 }}>Facebook</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', marginBottom: '2px' }}>
                                {[1,2,3,4].map(i => <i key={i} className="fas fa-star" style={{ color: '#ffc107', fontSize: '9px' }}></i>)}
                                <i className="fas fa-star-half-alt" style={{ color: '#ffc107', fontSize: '9px' }}></i>
                            </div>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#1a1a2e' }}>4.8</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <TestDriveModal isOpen={modal === 'testdrive'} onClose={() => setModal(null)} car={car} />
            <FinanceModal isOpen={modal === 'finance'} onClose={() => setModal(null)} car={car} />
            <EnquiryModal isOpen={modal === 'enquiry'} onClose={() => setModal(null)} car={car} />
        </>
    );
}