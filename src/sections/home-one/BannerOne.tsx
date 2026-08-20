"use client"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import ReactDOM from 'react-dom';

interface SliderItem {
    id: number;
    bgClass: string;
    mobileImage: string;
}

const sliderData: SliderItem[] = [
    { id: 1, bgClass: "bgImage-1", mobileImage: "/assets/images/backgrounds/mobiless.jpeg" },
    { id: 2, bgClass: "bgImage-2", mobileImage: "/assets/images/backgrounds/mobile3.jpg" },
    { id: 3, bgClass: "bgImage-3", mobileImage: "/assets/images/backgrounds/mobile2.jpeg" },
];

/* ─── Reusable Modal Shell with Portal ─── */
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);
    if (!mounted || !isOpen) return null;

    return ReactDOM.createPortal(
        <div style={{
            position: 'fixed', inset: 0, zIndex: 999999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '12px'
        }}>
            <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'
            }} onClick={onClose} />
            <div className="modal-panel" style={{
                position: 'relative', background: '#fff', borderRadius: '16px',
                width: '100%', maxWidth: '640px', maxHeight: '92vh',
                overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.35)'
            }}>
                {children}
            </div>
        </div>,
        document.body
    );
};

const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', borderRadius: '8px',
    border: '1px solid #e5e5e5', fontSize: '14px', outline: 'none',
    color: '#1a1a2e', background: '#fff'
};

const labelStyle: React.CSSProperties = {
    fontSize: '13px', fontWeight: 700, color: '#1a1a2e',
    marginBottom: '6px', display: 'block'
};

const sectionTitleStyle: React.CSSProperties = {
    fontSize: '15px', fontWeight: 800, color: '#1a1a2e',
    marginBottom: '12px', marginTop: '4px'
};

/* ─── 1. Schedule Test Drive Modal ─── */
const TestDriveModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [form, setForm] = useState({ 
        name: '', email: '', phone: '', contact: '', date: '', time: '', location: '', message: '', agreed: false,
        // ─── NEW FIELDS (OPTIONAL) ───
        licenseNumber: '', customTime: '', customerAddress: '', salesPerson: '', stockNumber: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.agreed) return;
        
        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formType: 'testdrive',
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    contactMethod: form.contact,
                    message: form.message,
                    date: form.date,
                    time: form.time,
                    location: form.location,
                    // ─── NEW FIELDS ───
                    licenseNumber: form.licenseNumber,
                    customTime: form.customTime,
                    customerAddress: form.customerAddress,
                    salesPerson: form.salesPerson,
                    stockNumber: form.stockNumber,
                }),
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.error || 'Failed to send');
            setSuccess(true);
            setTimeout(() => { setSuccess(false); onClose(); }, 2500);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-body" style={{ padding: '28px' }}>
                <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '12px',
                            background: '#fff8e1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                            <i className="far fa-calendar-check" style={{ color: '#ffc107', fontSize: '20px' }}></i>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 4px 0' }}>Book a Test Drive</h3>
                            <p style={{ fontSize: '14px', color: '#888', margin: 0, lineHeight: 1.4 }}>
                                Fill in the details below and we shall confirm your appointment.
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                        background: '#f5f5f5', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#666'
                    }}>✕</button>
                </div>

                {success ? (
                    <div style={{ textAlign: 'center', padding: '50px 0' }}>
                        <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '48px', marginBottom: '16px' }}></i>
                        <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>Request Submitted!</h4>
                        <p style={{ fontSize: '15px', color: '#666' }}>We shall contact you shortly to confirm.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* ─── YOUR DETAILS ─── */}
                        <div style={sectionTitleStyle}>Your Details</div>
                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Full Name *</label>
                                <input style={inputStyle} placeholder="Enter your full name" required
                                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div>
                                <label style={labelStyle}>Email Address *</label>
                                <input style={inputStyle} placeholder="Enter your email" type="email" required
                                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                        </div>

                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                            <div>
                                <label style={labelStyle}>Phone Number *</label>
                                <div style={{ display: 'flex', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
                                    <span style={{ padding: '10px 8px', background: '#f8f9fa', borderRight: '1px solid #e5e5e5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        🇦🇺 <i className="fas fa-chevron-down" style={{ fontSize: '8px', color: '#999' }}></i>
                                    </span>
                                    <input style={{ ...inputStyle, border: 'none', borderRadius: 0 }} placeholder="04XX XXX XXX" required
                                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Preferred Contact *</label>
                                <select style={inputStyle} required value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })}>
                                    <option value="">Select preferred contact</option>
                                    <option value="phone">Phone</option>
                                    <option value="email">Email</option>
                                    <option value="whatsapp">WhatsApp</option>
                                </select>
                            </div>
                        </div>

                        {/* ─── PREFERRED DATE & TIME ─── */}
                        <div style={sectionTitleStyle}>Preferred Date & Time</div>
                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Preferred Date *</label>
                                <div style={{ position: 'relative' }}>
                                    <input style={{ ...inputStyle, paddingRight: '40px' }} type="date" required
                                        value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                                    <i className="far fa-calendar" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '14px', pointerEvents: 'none' }}></i>
                                </div>
                            </div>
                            <div>
 
                            <label style={labelStyle}>Test Drive Location *</label>
                            <select style={inputStyle} required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}>
                                <option value="">Select location</option>
                                <option value="maidstone">Maidstone Yard</option>
                                <option value="mordialloc">Mordialloc Yard</option>
                                <option value="brisbane">Brisbane Yard</option>
                            </select>
                        </div>
                            </div>
                  

                        {/* ─── LOCATION (REQUIRED) ─── */}
                       

                        {/* ─── MESSAGE ─── */}
                        <div style={{ marginBottom: '16px' }}>
                            <label style={labelStyle}>Your Message (Optional)</label>
                            <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Anything specific you would like us to know?"
                                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}></textarea>
                        </div>

                        {/* ─── NEW FIELDS (ALL OPTIONAL) ─── */}
                        <div style={{ marginBottom: '16px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                            <p style={{ fontSize: '13px', color: '#999', marginBottom: '12px', fontWeight: 600 }}>Additional Information (Optional)</p>
                            
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={labelStyle}>License Number</label>
                                    <input style={inputStyle} placeholder="Enter license number"
                                        value={form.licenseNumber} onChange={e => setForm({ ...form, licenseNumber: e.target.value })} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Custom Time</label>
                                    <input style={inputStyle} type="time"
                                        value={form.customTime} onChange={e => setForm({ ...form, customTime: e.target.value })} />
                                </div>
                            </div>

                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                                <div>
                                    <label style={labelStyle}>Customer Address</label>
                                    <input style={inputStyle} placeholder="Enter customer address"
                                        value={form.customerAddress} onChange={e => setForm({ ...form, customerAddress: e.target.value })} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Sales Person Name</label>
                                    <input style={inputStyle} placeholder="Enter sales person name"
                                        value={form.salesPerson} onChange={e => setForm({ ...form, salesPerson: e.target.value })} />
                                </div>
                            </div>

                            <div style={{ marginTop: '12px' }}>
                                <label style={labelStyle}>Stock Number</label>
                                <input style={inputStyle} placeholder="Enter stock number"
                                    value={form.stockNumber} onChange={e => setForm({ ...form, stockNumber: e.target.value })} />
                            </div>
                        </div>

                        {/* ─── TERMS ─── */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px' }}>
                            <input type="checkbox" id="td-agree" checked={form.agreed}
                                onChange={e => setForm({ ...form, agreed: e.target.checked })}
                                style={{ marginTop: '3px', accentColor: '#ffc107', minWidth: '16px', minHeight: '16px' }} />
                            <label htmlFor="td-agree" style={{ fontSize: '13px', color: '#666', lineHeight: 1.4, cursor: 'pointer' }}>
                                I agree to the <a href="#" style={{ color: '#ffc107', fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a> and <a href="#" style={{ color: '#ffc107', fontWeight: 700, textDecoration: 'none' }}>Terms & Conditions</a>.
                            </label>
                        </div>

                        {error && (
                            <div style={{ marginBottom: '12px', padding: '10px 12px', background: '#fff2f2', borderRadius: '8px', color: '#d32f2f', fontSize: '13px', fontWeight: 600 }}>
                                <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i>{error}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading} className="btn-primary" style={{
                            width: '100%', padding: '14px', 
                            background: isLoading ? '#e0e0e0' : '#ffc107', 
                            color: '#1a1a2e',
                            fontWeight: 800, fontSize: '15px', borderRadius: '8px', border: 'none',
                            cursor: isLoading ? 'not-allowed' : 'pointer', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px',
                            opacity: isLoading ? 0.6 : 1
                        }}>
                            <i className={isLoading ? 'fas fa-spinner fa-spin' : 'far fa-calendar-check'}></i>
                            {isLoading ? 'Sending...' : 'Book Test Drive'}
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px', color: '#999' }}>
                            <i className="fas fa-lock" style={{ fontSize: '10px' }}></i>
                            <span>Your information is safe with us and will never be shared.</span>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
};

/* ─── 2. Apply for Finance Modal ─── */
const FinanceModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [form, setForm] = useState({ 
        name: '', phone: '', email: '', dob: '', employment: '', income: '', term: '', deposit: '', location: '',
        // ─── NEW FIELDS (OPTIONAL) ───
        licenseNumber: '', customTime: '', customerAddress: '', salesPerson: '', stockNumber: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formType: 'finance',
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    dob: form.dob,
                    employment: form.employment,
                    income: form.income,
                    term: form.term,
                    deposit: form.deposit,
                    location: form.location,
                    // ─── NEW FIELDS ───
                    licenseNumber: form.licenseNumber,
                    customTime: form.customTime,
                    customerAddress: form.customerAddress,
                    salesPerson: form.salesPerson,
                    stockNumber: form.stockNumber,
                }),
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.error || 'Failed to send');
            setSuccess(true);
            setTimeout(() => { setSuccess(false); onClose(); }, 2500);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-body" style={{ padding: '28px' }}>
                <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '12px',
                            background: '#fff8e1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                            <i className="fas fa-dollar-sign" style={{ color: '#ffc107', fontSize: '20px' }}></i>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 4px 0' }}>Apply for Finance</h3>
                            <p style={{ fontSize: '14px', color: '#888', margin: 0, lineHeight: 1.4 }}>
                                Quick and easy finance application. Get pre-approved in minutes.
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                        background: '#f5f5f5', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#666'
                    }}>✕</button>
                </div>

                {success ? (
                    <div style={{ textAlign: 'center', padding: '50px 0' }}>
                        <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '48px', marginBottom: '16px' }}></i>
                        <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>Application Submitted!</h4>
                        <p style={{ fontSize: '15px', color: '#666' }}>Our finance team will contact you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* ─── PERSONAL DETAILS ─── */}
                        <div style={sectionTitleStyle}>Personal Details</div>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>Full Name *</label>
                            <input style={inputStyle} placeholder="Enter your full name" required
                                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                        </div>

                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Phone Number *</label>
                                <div style={{ display: 'flex', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
                                    <span style={{ padding: '10px 8px', background: '#f8f9fa', borderRight: '1px solid #e5e5e5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        🇦🇺 <i className="fas fa-chevron-down" style={{ fontSize: '8px', color: '#999' }}></i>
                                    </span>
                                    <input style={{ ...inputStyle, border: 'none', borderRadius: 0 }} placeholder="04XX XXX XXX" required
                                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Email Address *</label>
                                <input style={inputStyle} placeholder="Enter your email" type="email" required
                                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                        </div>

                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Date of Birth *</label>
                                <div style={{ position: 'relative' }}>
                                    <input style={{ ...inputStyle, paddingRight: '40px' }} type="date" required
                                        value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} />
                                    <i className="far fa-calendar" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '14px', pointerEvents: 'none' }}></i>
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Employment Status *</label>
                                <select style={inputStyle} required value={form.employment} onChange={e => setForm({ ...form, employment: e.target.value })}>
                                    <option value="">Select employment status</option>
                                    <option value="full-time">Full Time</option>
                                    <option value="part-time">Part Time</option>
                                    <option value="self-employed">Self Employed</option>
                                    <option value="contract">Contract</option>
                                    <option value="unemployed">Unemployed</option>
                                </select>
                            </div>
                        </div>

                        {/* ─── LOCATION (REQUIRED) ─── */}
                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>Preferred Location *</label>
                            <select style={inputStyle} required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}>
                                <option value="">Select location</option>
                                <option value="maidstone">Maidstone Yard</option>
                                <option value="mordialloc">Mordialloc Yard</option>
                                <option value="brisbane">Brisbane Yard</option>
                            </select>
                        </div>

                        {/* ─── FINANCE DETAILS ─── */}
                        <div style={sectionTitleStyle}>Finance Details</div>
                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Approx. Annual Income *</label>
                                <select style={inputStyle} required value={form.income} onChange={e => setForm({ ...form, income: e.target.value })}>
                                    <option value="">Select income range</option>
                                    <option value="30-50">$30,000 - $50,000</option>
                                    <option value="50-70">$50,000 - $70,000</option>
                                    <option value="70-100">$70,000 - $100,000</option>
                                    <option value="100+">$100,000+</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Preferred Loan Term *</label>
                                <select style={inputStyle} required value={form.term} onChange={e => setForm({ ...form, term: e.target.value })}>
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
                            <label style={labelStyle}>Deposit Amount (Optional)</label>
                            <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '14px', fontWeight: 600 }}>$</span>
                                <input style={{ ...inputStyle, paddingLeft: '28px' }} placeholder="Enter deposit amount"
                                    value={form.deposit} onChange={e => setForm({ ...form, deposit: e.target.value })} />
                            </div>
                        </div>

                        {/* ─── NEW FIELDS (ALL OPTIONAL) ─── */}
                        <div style={{ marginBottom: '16px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                            <p style={{ fontSize: '13px', color: '#999', marginBottom: '12px', fontWeight: 600 }}>Additional Information (Optional)</p>
                            
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={labelStyle}>License Number</label>
                                    <input style={inputStyle} placeholder="Enter license number"
                                        value={form.licenseNumber} onChange={e => setForm({ ...form, licenseNumber: e.target.value })} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Custom Time</label>
                                    <input style={inputStyle} type="time"
                                        value={form.customTime} onChange={e => setForm({ ...form, customTime: e.target.value })} />
                                </div>
                            </div>

                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                                <div>
                                    <label style={labelStyle}>Customer Address</label>
                                    <input style={inputStyle} placeholder="Enter customer address"
                                        value={form.customerAddress} onChange={e => setForm({ ...form, customerAddress: e.target.value })} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Sales Person Name</label>
                                    <input style={inputStyle} placeholder="Enter sales person name"
                                        value={form.salesPerson} onChange={e => setForm({ ...form, salesPerson: e.target.value })} />
                                </div>
                            </div>

                            <div style={{ marginTop: '12px' }}>
                                <label style={labelStyle}>Stock Number</label>
                                <input style={inputStyle} placeholder="Enter stock number"
                                    value={form.stockNumber} onChange={e => setForm({ ...form, stockNumber: e.target.value })} />
                            </div>
                        </div>

                        {error && (
                            <div style={{ marginBottom: '12px', padding: '10px 12px', background: '#fff2f2', borderRadius: '8px', color: '#d32f2f', fontSize: '13px', fontWeight: 600 }}>
                                <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i>{error}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading} className="btn-primary" style={{
                            width: '100%', padding: '14px', 
                            background: isLoading ? '#e0e0e0' : '#ffc107', 
                            color: '#1a1a2e',
                            fontWeight: 800, fontSize: '15px', borderRadius: '8px', border: 'none',
                            cursor: isLoading ? 'not-allowed' : 'pointer', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            opacity: isLoading ? 0.6 : 1
                        }}>
                            <i className={isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-dollar-sign'}></i>
                            {isLoading ? 'Sending...' : 'Submit Finance Application'}
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

/* ─── 3. Enquire Now Modal ─── */
const EnquiryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [form, setForm] = useState({ 
        name: '', phone: '', email: '', interest: '', message: '', location: '',
        // ─── NEW FIELDS (OPTIONAL) ───
        licenseNumber: '', customTime: '', customerAddress: '', salesPerson: '', stockNumber: ''
    });
    const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'whatsapp'>('phone');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formType: 'enquiry',
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    contactMethod: contactMethod,
                    message: form.message,
                    interest: form.interest,
                    location: form.location,
                    // ─── NEW FIELDS ───
                    licenseNumber: form.licenseNumber,
                    customTime: form.customTime,
                    customerAddress: form.customerAddress,
                    salesPerson: form.salesPerson,
                    stockNumber: form.stockNumber,
                }),
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.error || 'Failed to send');
            setSuccess(true);
            setTimeout(() => { setSuccess(false); onClose(); }, 2500);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modal-body" style={{ padding: '28px' }}>
                <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '12px',
                            background: '#fff8e1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                        }}>
                            <i className="far fa-comment-dots" style={{ color: '#ffc107', fontSize: '20px' }}></i>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 4px 0' }}>Enquire Now</h3>
                            <p style={{ fontSize: '14px', color: '#888', margin: 0, lineHeight: 1.4 }}>
                                Have questions? We are here to help. Get in touch with our team.
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} style={{
                        width: '32px', height: '32px', borderRadius: '50%', border: 'none',
                        background: '#f5f5f5', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: '14px', color: '#666'
                    }}>✕</button>
                </div>

                {success ? (
                    <div style={{ textAlign: 'center', padding: '50px 0' }}>
                        <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '48px', marginBottom: '16px' }}></i>
                        <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>Enquiry Sent!</h4>
                        <p style={{ fontSize: '15px', color: '#666' }}>Our team will get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* ─── YOUR DETAILS ─── */}
                        <div style={sectionTitleStyle}>Your Details</div>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>Full Name *</label>
                            <input style={inputStyle} placeholder="Enter your full name" required
                                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                        </div>

                        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label style={labelStyle}>Phone Number *</label>
                                <div style={{ display: 'flex', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
                                    <span style={{ padding: '10px 8px', background: '#f8f9fa', borderRight: '1px solid #e5e5e5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        🇦🇺 <i className="fas fa-chevron-down" style={{ fontSize: '8px', color: '#999' }}></i>
                                    </span>
                                    <input style={{ ...inputStyle, border: 'none', borderRadius: 0 }} placeholder="04XX XXX XXX" required
                                        value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label style={labelStyle}>Email Address *</label>
                                <input style={inputStyle} placeholder="Enter your email" type="email" required
                                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>I am interested in *</label>
                            <select style={inputStyle} required value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}>
                                <option value="">Select an option</option>
                                <option value="test-drive">Book a Test Drive</option>
                                <option value="finance">Finance Application</option>
                                <option value="trade-in">Trade-In Valuation</option>
                                <option value="general">General Enquiry</option>
                            </select>
                        </div>

                        {/* ─── LOCATION (REQUIRED) ─── */}
                        <div style={{ marginBottom: '12px' }}>
                            <label style={labelStyle}>Preferred Location *</label>
                            <select style={inputStyle} required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}>
                                <option value="">Select location</option>
                                <option value="maidstone">Maidstone Yard</option>
                                <option value="mordialloc">Mordialloc Yard</option>
                                <option value="brisbane">Brisbane Yard</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '14px' }}>
                            <label style={labelStyle}>Message *</label>
                            <textarea style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }} placeholder="Type your message here..." required
                                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}></textarea>
                        </div>

                        {/* ─── CONTACT METHOD ─── */}
                        <div style={{ marginBottom: '14px' }}>
                            <label style={{ ...labelStyle, marginBottom: '8px' }}>Preferred Contact Method</label>
                            <div className="contact-method-row" style={{ display: 'flex', gap: '8px' }}>
                                {([
                                    { key: 'phone', label: 'Phone Call', icon: 'fa-phone-alt' },
                                    { key: 'email', label: 'Email', icon: 'fa-envelope' },
                                    { key: 'whatsapp', label: 'WhatsApp', icon: 'fa-whatsapp' }
                                ] as const).map((m) => (
                                    <button key={m.key} type="button" onClick={() => setContactMethod(m.key)} style={{
                                        flex: 1, padding: '10px 6px', borderRadius: '8px',
                                        border: contactMethod === m.key ? '1.5px solid #ffc107' : '1.5px solid #e5e5e5',
                                        background: contactMethod === m.key ? '#fff8e1' : '#fff',
                                        color: contactMethod === m.key ? '#1a1a2e' : '#888',
                                        fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                                        transition: 'all 0.2s ease'
                                    }}>
                                        <i className={`fas ${m.icon}`} style={{ fontSize: '12px' }}></i>{m.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ─── NEW FIELDS (ALL OPTIONAL) ─── */}
                        <div style={{ marginBottom: '16px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
                            <p style={{ fontSize: '13px', color: '#999', marginBottom: '12px', fontWeight: 600 }}>Additional Information (Optional)</p>
                            
                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div>
                                    <label style={labelStyle}>License Number</label>
                                    <input style={inputStyle} placeholder="Enter license number"
                                        value={form.licenseNumber} onChange={e => setForm({ ...form, licenseNumber: e.target.value })} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Custom Time</label>
                                    <input style={inputStyle} type="time"
                                        value={form.customTime} onChange={e => setForm({ ...form, customTime: e.target.value })} />
                                </div>
                            </div>

                            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
                                <div>
                                    <label style={labelStyle}>Customer Address</label>
                                    <input style={inputStyle} placeholder="Enter customer address"
                                        value={form.customerAddress} onChange={e => setForm({ ...form, customerAddress: e.target.value })} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Sales Person Name</label>
                                    <input style={inputStyle} placeholder="Enter sales person name"
                                        value={form.salesPerson} onChange={e => setForm({ ...form, salesPerson: e.target.value })} />
                                </div>
                            </div>

                            <div style={{ marginTop: '12px' }}>
                                <label style={labelStyle}>Stock Number</label>
                                <input style={inputStyle} placeholder="Enter stock number"
                                    value={form.stockNumber} onChange={e => setForm({ ...form, stockNumber: e.target.value })} />
                            </div>
                        </div>

                        {error && (
                            <div style={{ marginBottom: '12px', padding: '10px 12px', background: '#fff2f2', borderRadius: '8px', color: '#d32f2f', fontSize: '13px', fontWeight: 600 }}>
                                <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i>{error}
                            </div>
                        )}

                        <button type="submit" disabled={isLoading} className="btn-primary" style={{
                            width: '100%', padding: '14px', 
                            background: isLoading ? '#333344' : '#1a1a2e', 
                            color: '#fff',
                            fontWeight: 800, fontSize: '15px', borderRadius: '8px', border: 'none',
                            cursor: isLoading ? 'not-allowed' : 'pointer', 
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            opacity: isLoading ? 0.6 : 1
                        }}>
                            <i className={isLoading ? 'fas fa-spinner fa-spin' : 'far fa-envelope'}></i>
                            {isLoading ? 'Sending...' : 'Send Enquiry'}
                        </button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

/* ─── Main Hero Component ─── */
const BannerOne: React.FC = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [modal, setModal] = useState<'testdrive' | 'finance' | 'enquiry' | null>(null);

    return (
        <>
            <style>{`
                .main-slider__carousel .swiper-slide .item { 
                    height: 600px !important; 
                    min-height: 600px !important; 
                }
                .main-slider__bg { 
                    height: 100% !important; 
                    background-size: cover !important; 
                    background-position: center !important; 
                }
                /* Mobile background overrides */
                @media (max-width: 640px) {
                    .bgImage-1 .main-slider__bg { background-image: url('/assets/images/backgrounds/mobiless.jpeg') !important; }
                    .bgImage-2 .main-slider__bg { background-image: url('/assets/images/backgrounds/mobile3.jpg') !important; }
                    .bgImage-3 .main-slider__bg { background-image: url('/assets/images/backgrounds/mobile2.jpeg') !important; }
                }
                @media (max-width: 640px) {
                    .main-slider .owl-nav { display: none !important; }
                    .main-slider__carousel .swiper-slide .item { height: 400px !important; min-height: 400px !important; }
                    .cta-section { padding: 48px 16px !important; }
                    .cta-heading { font-size: clamp(22px, 6vw, 28px) !important; }
                    .cta-text { font-size: 14px !important; line-height: 1.7 !important; }
                    .cta-btn-row { flex-direction: column !important; gap: 12px !important; }
                    .cta-btn-row button { width: 100% !important; padding: 14px 20px !important; font-size: 13px !important; }
                    .modal-body { padding: 20px 16px !important; }
                    .modal-header h3 { font-size: 18px !important; }
                    .form-grid { grid-template-columns: 1fr !important; }
                    .contact-method-row { flex-direction: column !important; }
                    .contact-method-row button { width: 100% !important; padding: 12px !important; }
                    .btn-primary { padding: 14px !important; font-size: 14px !important; }
                }
                @media (max-width: 380px) {
                    .main-slider__carousel .swiper-slide .item { height: 320px !important; min-height: 320px !important; }
                    .cta-heading { font-size: 20px !important; }
                }
            `}</style>

            <section className="main-slider" id='home'>
                <div className="main-slider__carousel owl-carousel owl-theme">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={0}
                        slidesPerView={1}
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        speed={1000}
                        onSwiper={setSwiperInstance}
                    >
                        {sliderData.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div
                                    className={`item ${item.bgClass}`}
                                    style={{
                                        height: '600px',
                                        minHeight: '600px',
                                        position: 'relative'
                                    }}
                                >
                                    <div className="main-slider__bg" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Navigation Arrows */}
                    <div className="owl-nav">
                        <button
                            onClick={() => swiperInstance?.slidePrev()}
                            type="button"
                            role="presentation"
                            className="owl-prev"
                        >
                            <span className="icon-right-arrow-1"></span>
                        </button>
                        <button
                            onClick={() => swiperInstance?.slideNext()}
                            type="button"
                            role="presentation"
                            className="owl-next"
                        >
                            <span className="icon-right-arrow-1"></span>
                        </button>
                    </div>
                </div>

                {/* Bottom CTA Section */}
                <section className="cta-section" style={{ background: "#0F0F1B", padding: "80px 0" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <h1 className="cta-heading" style={{
                                    fontSize: "clamp(28px, 4vw, 42px)",
                                    fontWeight: 800,
                                    color: "#fff",
                                    textTransform: "uppercase",
                                    lineHeight: 1.2,
                                    marginBottom: "20px"
                                }}>
                                    Premium Japanese Car for Sale in Australia
                                </h1>

                                <p className="cta-text" style={{
                                    fontSize: "16px",
                                    lineHeight: 1.8,
                                    color: "#A1A1AA",
                                    maxWidth: "800px",
                                    marginBottom: "35px"
                                }}>
                                    At UKA Japan Motors, we offer a wide selection of premium Japanese cars for sale in Australia, including reliable used cars, fuel efficient vehicles, automatic cars, and compact Japanese small cars. Whether you are looking for a family SUV or an everyday city car, we help you find the perfect Japanese car to match your lifestyle and budget.
                                </p>

                                <div className="cta-btn-row" style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "15px"
                                }}>
                                    <button
                                        onClick={() => setModal('finance')}
                                        style={{
                                            padding: "16px 36px",
                                            background: "#F5B818",
                                            color: "#0F0F1B",
                                            border: "2px solid #F5B818",
                                            borderRadius: "10px",
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            textDecoration: "none",
                                            textAlign: "center",
                                            textTransform: "uppercase",
                                            transition: "all 0.3s",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "8px",
                                            whiteSpace: "nowrap",
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#fff";
                                            e.currentTarget.style.borderColor = "#fff";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "#F5B818";
                                            e.currentTarget.style.color = "#0F0F1B";
                                            e.currentTarget.style.borderColor = "#F5B818";
                                        }}
                                    >
                                        <span className="icon-right-arrow" style={{ fontSize: "12px" }}></span>
                                        Apply for Finance
                                    </button>

                                    <button
                                        onClick={() => setModal('enquiry')}
                                        style={{
                                            padding: "16px 36px",
                                            background: "transparent",
                                            color: "#fff",
                                            border: "2px solid #F5B818",
                                            borderRadius: "10px",
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            textDecoration: "none",
                                            textAlign: "center",
                                            textTransform: "uppercase",
                                            transition: "all 0.3s",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "8px",
                                            whiteSpace: "nowrap",
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#F5B818";
                                            e.currentTarget.style.color = "#0F0F1B";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "#fff";
                                            e.currentTarget.style.borderColor = "#F5B818";
                                        }}
                                    >
                                        Give Us a Call
                                    </button>

                                    <button
                                        onClick={() => setModal('testdrive')}
                                        style={{
                                            padding: "16px 36px",
                                            background: "transparent",
                                            color: "#fff",
                                            border: "2px solid #F5B818",
                                            borderRadius: "10px",
                                            fontSize: "14px",
                                            fontWeight: 700,
                                            textDecoration: "none",
                                            textAlign: "center",
                                            textTransform: "uppercase",
                                            transition: "all 0.3s",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "8px",
                                            whiteSpace: "nowrap",
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "#F5B818";
                                            e.currentTarget.style.color = "#0F0F1B";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "#fff";
                                            e.currentTarget.style.borderColor = "#F5B818";
                                        }}
                                    >
                                        Book a Test Drive
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>

            {/* ─── Modals ─── */}
            <TestDriveModal isOpen={modal === 'testdrive'} onClose={() => setModal(null)} />
            <FinanceModal isOpen={modal === 'finance'} onClose={() => setModal(null)} />
            <EnquiryModal isOpen={modal === 'enquiry'} onClose={() => setModal(null)} />
        </>
    );
};

export default BannerOne;
