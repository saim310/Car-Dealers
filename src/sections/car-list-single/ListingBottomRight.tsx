"use client";
import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

// ─── Responsive Hook ───
const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, [breakpoint]);
    return isMobile;
};

const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseInt(price.replace(/,/g, '')) : price;
    if (!num || isNaN(num)) return '0';
    return num.toLocaleString('en-US');
};

// ─── Reusable Modal Shell with Portal ───
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    const modalContent = (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            padding: isMobile ? '0' : '16px'
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
                borderRadius: isMobile ? '16px 16px 0 0' : '16px',
                width: '100%',
                maxWidth: '980px',
                maxHeight: isMobile ? '92vh' : '92vh',
                overflowY: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                animation: isMobile ? 'slideUp 0.3s ease' : 'fadeIn 0.2s ease'
            }}>
                <style>{`
                    @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
                    @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
                `}</style>
                {children}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

// ─── Car Image with Fallbacks ───
const CarImage = ({ car }: { car?: any }) => {
    const [error, setError] = useState(false);
    const isMobile = useIsMobile();

    const imageSrc = useMemo(() => {
        if (!car) return "/assets/images/shop/shop-product-1-1.jpg";
        return car.image || car.Image || car.mainImage || car.images?.[0] || car.thumbnail || "/assets/images/shop/shop-product-1-1.jpg";
    }, [car]);

    if (error) {
        return (
            <div style={{
                width: '100%',
                height: isMobile ? '140px' : '160px',
                background: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px 8px 0 0',
                color: '#999',
                fontSize: '13px',
                fontWeight: 600
            }}>
                <i className="fas fa-image" style={{ marginRight: '6px', fontSize: '16px' }}></i>
                No Image Available
            </div>
        );
    }

    return (
        <img
            src={imageSrc}
            alt={car?.Title || car?.title || 'Car'}
            style={{ width: '100%', height: isMobile ? '140px' : '160px', objectFit: 'cover', display: 'block' }}
            onError={() => setError(true)}
        />
    );
};

// ─── Right Sidebar: Car Details + Contact ───
const ModalSidebar = ({ car }: { car?: any }) => {
    const isMobile = useIsMobile();
    const price = car?.Price || car?.price || car?.SpecialPrice || 45995;
    const hasPrice = price > 0;
    const title = car?.Title || car?.title || 'Toyota Alphard X 2022';
    const fuel = car?.FuelType || car?.fuel || 'Hybrid';
    const engine = car?.EngineSize || '2,500 cc';
    const transmission = car?.GearType || car?.transmission || 'Automatic';
    const color = car?.Color || car?.color || 'Pearl White';

    return (
        <div style={{
            background: '#fafafa',
            borderLeft: isMobile ? 'none' : '1px solid #f0f0f0',
            borderTop: isMobile ? '1px solid #f0f0f0' : 'none',
            padding: isMobile ? '20px' : '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            height: '100%',
            minWidth: isMobile ? 'auto' : '320px'
        }}>
            {/* Car Card */}
            <div style={{
                background: '#fff',
                borderRadius: '12px',
                border: '1px solid #f0f0f0',
                overflow: 'hidden'
            }}>
                <CarImage car={car} />
                <div style={{ padding: '16px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 10px 0' }}>{title}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#666', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-leaf" style={{ color: '#28a745', width: '14px', fontSize: '12px' }}></i>
                            <span>{fuel}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-cogs" style={{ color: '#888', width: '14px', fontSize: '12px' }}></i>
                            <span>{engine}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-car" style={{ color: '#888', width: '14px', fontSize: '12px' }}></i>
                            <span>{transmission}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <i className="fas fa-paint-brush" style={{ color: '#888', width: '14px', fontSize: '12px' }}></i>
                            <span>{color}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '20px', fontWeight: 900, color: '#1a1a2e' }}>
                            ${formatPrice(price)} <span style={{ fontSize: '12px', fontWeight: 600, color: '#888' }}>AUD</span>
                        </span>
                        <span style={{
                            background: '#ffc107',
                            color: '#1a1a2e',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '4px 10px',
                            borderRadius: '20px'
                        }}>
                            In Stock
                        </span>
                    </div>
                </div>
            </div>

            {/* Trust Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                    { icon: 'fa-user-check', title: 'No Obligation', desc: 'Test drive with no pressure' },
                    { icon: 'fa-headset', title: 'Expert Support', desc: 'Our team is here to help you' },
                    { icon: 'fa-clipboard-check', title: 'Hassle Free', desc: 'Quick, easy & convenient' },
                ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: '#fff',
                            border: '1px solid #f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}>
                            <i className={`fas ${item.icon}`} style={{ color: '#1a1a2e', fontSize: '12px' }}></i>
                        </div>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#1a1a2e', marginBottom: '1px' }}>{item.title}</div>
                            <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.3 }}>{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Need Help */}
            <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Need Help?
                </h4>
                <p style={{ fontSize: '13px', color: '#666', marginBottom: '14px', lineHeight: 1.5 }}>
                    Our friendly team is here to help you find your perfect car.
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                        { icon: 'fa-phone-alt', text: '+61 485 889 402' },
                        { icon: 'fa-comments', text: '+61 485 889 402' },
                        { icon: 'fa-envelope', text: 'info@ukajapan.com.au' },
                        { icon: 'fa-clock', text: 'Mon - Sun: 9:00 AM - 6:00 PM' },
                    ].map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#555', fontWeight: 600 }}>
                            <i className={`fas ${item.icon}`} style={{ color: '#1a1a2e', fontSize: '14px', width: '16px' }}></i>
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1, padding: '10px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#999', marginBottom: '3px', fontWeight: 700 }}>Google</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', marginBottom: '2px' }}>
                            {[1,2,3,4].map(i => <i key={i} className="fas fa-star" style={{ color: '#ffc107', fontSize: '9px' }}></i>)}
                            <i className="fas fa-star-half-alt" style={{ color: '#ffc107', fontSize: '9px' }}></i>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#1a1a2e' }}>4.9</div>
                    </div>
                    <div style={{ flex: 1, padding: '10px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#999', marginBottom: '3px', fontWeight: 700 }}>Facebook</div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', marginBottom: '2px' }}>
                            {[1,2,3,4].map(i => <i key={i} className="fas fa-star" style={{ color: '#ffc107', fontSize: '9px' }}></i>)}
                            <i className="fas fa-star-half-alt" style={{ color: '#ffc107', fontSize: '9px' }}></i>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#1a1a2e' }}>4.8</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #e5e5e5',
    fontSize: '14px',
    outline: 'none',
    color: '#1a1a2e',
    background: '#fff'
};

const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: '6px',
    display: 'block'
};

const sectionTitleStyle: React.CSSProperties = {
    fontSize: '15px',
    fontWeight: 800,
    color: '#1a1a2e',
    marginBottom: '12px',
    marginTop: '4px'
};

// ─── Shared Submit Handler Factory ───
const useEmailSubmit = (formType: string, onClose: () => void, car?: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const sendEmail = async (payload: Record<string, any>) => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formType,
                    carTitle: car?.Title || car?.title || 'N/A',
                    ...payload,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to send');
            }

            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                onClose();
            }, 2500);
        } catch (err: any) {
            setError(err.message || 'Email send nahi hui. Dobara try karein.');
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, error, submitted, sendEmail };
};

// ─── 1. Schedule Test Drive Modal ───
const TestDriveModal = ({ isOpen, onClose, car }: { isOpen: boolean; onClose: () => void; car?: any }) => {
    const isMobile = useIsMobile();
    const [form, setForm] = useState({ name: '', email: '', phone: '', contact: '', date: '', time: '', location: '', message: '', agreed: false });
    const { isLoading, error, submitted, sendEmail } = useEmailSubmit('testdrive', onClose, car);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.agreed) {
            return;
        }
        sendEmail({
            name: form.name,
            email: form.email,
            phone: form.phone,
            contactMethod: form.contact,
            message: form.message,
            date: form.date,
            time: form.time,
            location: form.location,
        });
    };

    const gridStyle: React.CSSProperties = isMobile
        ? { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }
        : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: isMobile ? 'auto' : '600px' }}>
                <div style={{ flex: 1, padding: isMobile ? '20px' : '28px', minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: '#fff8e1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <i className="far fa-calendar-check" style={{ color: '#ffc107', fontSize: '20px' }}></i>
                            </div>
                            <div>
                                <h3 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 4px 0' }}>Book a Test Drive</h3>
                                <p style={{ fontSize: '14px', color: '#888', margin: 0, lineHeight: 1.4 }}>
                                    Fill in the details below and we'll confirm your test drive.
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
                            color: '#666',
                            flexShrink: 0
                        }}>✕</button>
                    </div>

                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '48px', marginBottom: '16px' }}></i>
                            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>Request Submitted!</h4>
                            <p style={{ fontSize: '15px', color: '#666' }}>We will contact you shortly to confirm.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div style={sectionTitleStyle}>Your Details</div>

                            <div style={gridStyle}>
                                <div>
                                    <label style={labelStyle}>Full Name *</label>
                                    <input style={inputStyle} placeholder="Enter your full name" required
                                        value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Email Address *</label>
                                    <input style={inputStyle} placeholder="Enter your email" type="email" required
                                        value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                                </div>
                            </div>

                            <div style={gridStyle}>
                                <div>
                                    <label style={labelStyle}>Phone Number *</label>
                                    <div style={{ display: 'flex', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
                                        <span style={{ padding: '10px 8px', background: '#f8f9fa', borderRight: '1px solid #e5e5e5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            🇦🇺 <i className="fas fa-chevron-down" style={{ fontSize: '8px', color: '#999' }}></i>
                                        </span>
                                        <input style={{ ...inputStyle, border: 'none', borderRadius: 0 }} placeholder="04XX XXX XXX" required
                                            value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Preferred Contact *</label>
                                    <select style={inputStyle} required value={form.contact} onChange={e => setForm({...form, contact: e.target.value})}>
                                        <option value="">Select preferred contact</option>
                                        <option value="phone">Phone</option>
                                        <option value="email">Email</option>
                                        <option value="whatsapp">WhatsApp</option>
                                    </select>
                                </div>
                            </div>

                            <div style={sectionTitleStyle}>Preferred Date & Time</div>

                            <div style={gridStyle}>
                                <div>
                                    <label style={labelStyle}>Preferred Date *</label>
                                    <div style={{ position: 'relative' }}>
                                        <input style={{ ...inputStyle, paddingRight: '40px' }} type="date" required
                                            value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                                        <i className="far fa-calendar" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '14px', pointerEvents: 'none' }}></i>
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>Preferred Time *</label>
                                    <select style={inputStyle} required value={form.time} onChange={e => setForm({...form, time: e.target.value})}>
                                        <option value="">Select time</option>
                                        <option value="morning">Morning (9AM - 12PM)</option>
                                        <option value="afternoon">Afternoon (12PM - 5PM)</option>
                                        <option value="evening">Evening (5PM - 7PM)</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={labelStyle}>Test Drive Location *</label>
                                <select style={inputStyle} required value={form.location} onChange={e => setForm({...form, location: e.target.value})}>
                                    <option value="">Select location</option>
                                    <option value="maidstone">Maidstone Yard</option>
                                    <option value="mordialloc">Mordialloc Yard</option>
                                    <option value="brisbane">Brisbane Yard</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <label style={labelStyle}>Your Message (Optional)</label>
                                <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Anything specific you'd like us to know?"
                                    value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px' }}>
                                <input
                                    type="checkbox"
                                    id="td-agree"
                                    checked={form.agreed}
                                    onChange={e => setForm({...form, agreed: e.target.checked})}
                                    style={{ marginTop: '3px', accentColor: '#ffc107' }}
                                />
                                <label htmlFor="td-agree" style={{ fontSize: '13px', color: '#666', lineHeight: 1.4, cursor: 'pointer' }}>
                                    I agree to the <a href="#" style={{ color: '#ffc107', fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a> and <a href="#" style={{ color: '#ffc107', fontWeight: 700, textDecoration: 'none' }}>Terms & Conditions</a>.
                                </label>
                            </div>

                            {error && (
                                <div style={{ marginBottom: '12px', padding: '10px 12px', background: '#fff2f2', borderRadius: '8px', color: '#d32f2f', fontSize: '13px', fontWeight: 600 }}>
                                    <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i>
                                    {error}
                                </div>
                            )}

                            <button type="submit" disabled={isLoading} style={{
                                width: '100%',
                                padding: '14px',
                                background: isLoading ? '#e0e0e0' : '#ffc107',
                                color: '#1a1a2e',
                                fontWeight: 800,
                                fontSize: '15px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginBottom: '12px'
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
                <ModalSidebar car={car} />
            </div>
        </Modal>
    );
};

// ─── 2. Apply for Finance Modal ───
const FinanceModal = ({ isOpen, onClose, car }: { isOpen: boolean; onClose: () => void; car?: any }) => {
    const isMobile = useIsMobile();
    const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', employment: '', income: '', term: '', deposit: '' });
    const { isLoading, error, submitted, sendEmail } = useEmailSubmit('finance', onClose, car);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            name: form.name,
            email: form.email,
            phone: form.phone,
            dob: form.dob,
            employment: form.employment,
            income: form.income,
            term: form.term,
            deposit: form.deposit,
        });
    };

    const gridStyle: React.CSSProperties = isMobile
        ? { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }
        : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: isMobile ? 'auto' : '600px' }}>
                <div style={{ flex: 1, padding: isMobile ? '20px' : '28px', minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: '#fff8e1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <i className="fas fa-dollar-sign" style={{ color: '#ffc107', fontSize: '20px' }}></i>
                            </div>
                            <div>
                                <h3 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 4px 0' }}>Apply for Finance</h3>
                                <p style={{ fontSize: '14px', color: '#888', margin: 0, lineHeight: 1.4 }}>
                                    Quick and easy finance application. Get pre-approved in minutes.
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
                            color: '#666',
                            flexShrink: 0
                        }}>✕</button>
                    </div>

                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '48px', marginBottom: '16px' }}></i>
                            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>Application Submitted!</h4>
                            <p style={{ fontSize: '15px', color: '#666' }}>Our finance team will contact you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div style={sectionTitleStyle}>Personal Details</div>

                            <div style={{ marginBottom: '12px' }}>
                                <label style={labelStyle}>Full Name *</label>
                                <input style={inputStyle} placeholder="Enter your full name" required
                                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                            </div>

                            <div style={gridStyle}>
                                <div>
                                    <label style={labelStyle}>Phone Number *</label>
                                    <div style={{ display: 'flex', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
                                        <span style={{ padding: '10px 8px', background: '#f8f9fa', borderRight: '1px solid #e5e5e5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
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

                            <div style={gridStyle}>
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

                            <div style={sectionTitleStyle}>Finance Details</div>

                            <div style={gridStyle}>
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
                                <label style={labelStyle}>Deposit Amount (Optional)</label>
                                <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#999', fontSize: '14px', fontWeight: 600 }}>$</span>
                                    <input style={{ ...inputStyle, paddingLeft: '28px' }} placeholder="Enter deposit amount"
                                        value={form.deposit} onChange={e => setForm({...form, deposit: e.target.value})} />
                                </div>
                            </div>

                            <div style={{ marginBottom: '16px', padding: '14px', background: '#f8f9fa', borderRadius: '10px' }}>
                                <h6 style={{ fontSize: '13px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 10px 0' }}>Why choose finance with us?</h6>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {[
                                        'Competitive interest rates',
                                        'Fast pre-approval',
                                        'Flexible repayment options',
                                        'Trusted by 1000+ customers'
                                    ].map((item, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#555' }}>
                                            <i className="fas fa-check" style={{ color: '#28a745', fontSize: '10px' }}></i>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {error && (
                                <div style={{ marginBottom: '12px', padding: '10px 12px', background: '#fff2f2', borderRadius: '8px', color: '#d32f2f', fontSize: '13px', fontWeight: 600 }}>
                                    <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i>
                                    {error}
                                </div>
                            )}

                            <button type="submit" disabled={isLoading} style={{
                                width: '100%',
                                padding: '14px',
                                background: isLoading ? '#e0e0e0' : '#ffc107',
                                color: '#1a1a2e',
                                fontWeight: 800,
                                fontSize: '15px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                                <i className={isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-dollar-sign'}></i>
                                {isLoading ? 'Sending...' : 'Submit Finance Application'}
                            </button>
                        </form>
                    )}
                </div>
                <ModalSidebar car={car} />
            </div>
        </Modal>
    );
};

// ─── 3. Enquire Now Modal ───
const EnquiryModal = ({ isOpen, onClose, car }: { isOpen: boolean; onClose: () => void; car?: any }) => {
    const isMobile = useIsMobile();
    const [form, setForm] = useState({ name: '', phone: '', email: '', interest: '', message: '' });
    const [contactMethod, setContactMethod] = useState<'phone' | 'email' | 'whatsapp'>('phone');
    const { isLoading, error, submitted, sendEmail } = useEmailSubmit('enquiry', onClose, car);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendEmail({
            name: form.name,
            email: form.email,
            phone: form.phone,
            contactMethod,
            message: form.message,
            interest: form.interest,
        });
    };

    const gridStyle: React.CSSProperties = isMobile
        ? { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }
        : { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: isMobile ? 'auto' : '600px' }}>
                <div style={{ flex: 1, padding: isMobile ? '20px' : '28px', minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <div style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '12px',
                                background: '#fff8e1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <i className="far fa-comment-dots" style={{ color: '#ffc107', fontSize: '20px' }}></i>
                            </div>
                            <div>
                                <h3 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 4px 0' }}>Enquire Now</h3>
                                <p style={{ fontSize: '14px', color: '#888', margin: 0, lineHeight: 1.4 }}>
                                    Have questions? We're here to help. Get in touch with our team.
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
                            color: '#666',
                            flexShrink: 0
                        }}>✕</button>
                    </div>

                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <i className="fas fa-check-circle" style={{ color: '#28a745', fontSize: '48px', marginBottom: '16px' }}></i>
                            <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#1a1a2e', marginBottom: '8px' }}>Enquiry Sent!</h4>
                            <p style={{ fontSize: '15px', color: '#666' }}>Our team will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div style={sectionTitleStyle}>Your Details</div>

                            <div style={{ marginBottom: '12px' }}>
                                <label style={labelStyle}>Full Name *</label>
                                <input style={inputStyle} placeholder="Enter your full name" required
                                    value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                            </div>

                            <div style={gridStyle}>
                                <div>
                                    <label style={labelStyle}>Phone Number *</label>
                                    <div style={{ display: 'flex', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
                                        <span style={{ padding: '10px 8px', background: '#f8f9fa', borderRight: '1px solid #e5e5e5', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
                                                minWidth: '90px',
                                                padding: '10px 6px',
                                                borderRadius: '8px',
                                                border: contactMethod === m.key ? '1.5px solid #ffc107' : '1.5px solid #e5e5e5',
                                                background: contactMethod === m.key ? '#fff8e1' : '#fff',
                                                color: contactMethod === m.key ? '#1a1a2e' : '#888',
                                                fontSize: '13px',
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
                                <span style={{ fontSize: '12px', color: '#887744', lineHeight: 1.4 }}>
                                    We respect your privacy and will never spam you.
                                </span>
                            </div>

                            {error && (
                                <div style={{ marginBottom: '12px', padding: '10px 12px', background: '#fff2f2', borderRadius: '8px', color: '#d32f2f', fontSize: '13px', fontWeight: 600 }}>
                                    <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i>
                                    {error}
                                </div>
                            )}

                            <button type="submit" disabled={isLoading} style={{
                                width: '100%',
                                padding: '14px',
                                background: isLoading ? '#333344' : '#1a1a2e',
                                color: '#fff',
                                fontWeight: 800,
                                fontSize: '15px',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}>
                                <i className={isLoading ? 'fas fa-spinner fa-spin' : 'far fa-envelope'}></i>
                                {isLoading ? 'Sending...' : 'Send Enquiry'}
                            </button>
                        </form>
                    )}
                </div>
                <ModalSidebar car={car} />
            </div>
        </Modal>
    );
};

// ─── Main Sidebar Component ───
export default function ListingBottomRight({ car }: { car?: any }) {
    const isMobile = useIsMobile();
    const price = car?.Price || car?.price || car?.SpecialPrice || 0;
    const hasPrice = price > 0;

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
        fontSize: '14px',
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
                <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                    <div style={{ fontSize: '12px', color: '#999', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Our Price
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '30px', fontWeight: 900, color: '#1a1a2e' }}>
                            {hasPrice ? `$${formatPrice(price)}` : 'Contact for Price'}
                        </span>
                        {hasPrice && (
                            <span style={{ background: '#ffc107', color: '#1a1a2e', fontSize: '10px', fontWeight: 800, padding: '3px 6px', borderRadius: '4px' }}>
                                AUD
                            </span>
                        )}
                    </div>
                    <div style={{ marginBottom: '14px', fontSize: '12px', color: '#888', fontWeight: 500 }}>
                        Excluding Government Charges
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                            { icon: 'fa-dollar-sign', text: 'Finance from $165/week*' },
                            { icon: 'fa-shield-alt', text: '1-5 Year Warranty Options' },
                            { icon: 'fa-file-alt', text: 'Auction Sheet Verified' },
                            { icon: 'fa-truck', text: 'Australia Wide Delivery' },
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#555', fontWeight: 600 }}>
                                <i className={`fas ${item.icon}`} style={{ color: '#1a1a2e', fontSize: '14px', width: '16px' }}></i>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button onClick={() => setModal('testdrive')} style={{ ...btnBase, background: '#ffc107', color: '#1a1a2e' }}>
                            <i className="far fa-calendar-check" style={{ fontSize: '14px' }}></i>
                            Schedule Test Drive
                        </button>
                        <button onClick={() => setModal('finance')} style={{ ...btnBase, background: '#fff', color: '#1a1a2e', border: '1.5px solid #e5e5e5' }}>
                            <i className="far fa-file-alt" style={{ fontSize: '14px' }}></i>
                            Apply for Finance
                        </button>
                        <button onClick={() => setModal('enquiry')} style={{ ...btnBase, background: '#1a1a2e', color: '#fff' }}>
                            <i className="far fa-envelope" style={{ fontSize: '14px' }}></i>
                            Enquire Now
                        </button>
                    </div>
                </div>

                {/* Finance Calculator */}
                <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Finance Calculator
                    </h4>

                    <div style={{ marginBottom: '10px' }}>
                        <div style={{ fontSize: '11px', color: '#999', fontWeight: 700, marginBottom: '3px', textTransform: 'uppercase' }}>Vehicle Price</div>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#1a1a2e' }}>${hasPrice ? formatPrice(price) : '45,995'}</div>
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#999', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>
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

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
                        <div>
                            <div style={{ fontSize: '11px', color: '#999', fontWeight: 700, marginBottom: '3px', textTransform: 'uppercase' }}>Loan Term</div>
                            <select
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '9px',
                                    borderRadius: '6px',
                                    border: '1px solid #e5e5e5',
                                    fontSize: '13px',
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
                            <div style={{ fontSize: '11px', color: '#999', fontWeight: 700, marginBottom: '3px', textTransform: 'uppercase' }}>Interest Rate</div>
                            <select
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '9px',
                                    borderRadius: '6px',
                                    border: '1px solid #e5e5e5',
                                    fontSize: '13px',
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
                        <div style={{ fontSize: '11px', color: '#999', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>
                            Estimated Repayment
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: '#1a1a2e' }}>
                            ${weeklyRepayment}<span style={{ fontSize: '13px', fontWeight: 600 }}> weekly*</span>
                        </div>
                    </div>

                    <button onClick={() => setModal('finance')} style={{ ...btnBase, background: '#ffc107', color: '#1a1a2e' }}>
                        Apply for Finance
                    </button>
                </div>

                {/* Need Help */}
                <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #eee' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1a1a2e', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Need Help?
                    </h4>
                    <p style={{ fontSize: '13px', color: '#666', marginBottom: '14px', lineHeight: 1.5 }}>
                        Our friendly team is here to help you find your perfect car.
                    </p>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            { icon: 'fa-phone-alt', text: '+61 485 889 402' },
                            { icon: 'fa-comments', text: '+61 485 889 402' },
                            { icon: 'fa-envelope', text: 'info@ukajapan.com.au' },
                            { icon: 'fa-clock', text: 'Mon - Sun: 9:00 AM - 6:00 PM' },
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#555', fontWeight: 600 }}>
                                <i className={`fas ${item.icon}`} style={{ color: '#1a1a2e', fontSize: '14px', width: '16px' }}></i>
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ flex: 1, padding: '10px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: '#999', marginBottom: '3px', fontWeight: 700 }}>Google</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', marginBottom: '2px' }}>
                                {[1,2,3,4].map(i => <i key={i} className="fas fa-star" style={{ color: '#ffc107', fontSize: '9px' }}></i>)}
                                <i className="fas fa-star-half-alt" style={{ color: '#ffc107', fontSize: '9px' }}></i>
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: 800, color: '#1a1a2e' }}>4.9</div>
                        </div>
                        <div style={{ flex: 1, padding: '10px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                            <div style={{ fontSize: '11px', color: '#999', marginBottom: '3px', fontWeight: 700 }}>Facebook</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', marginBottom: '2px' }}>
                                {[1,2,3,4].map(i => <i key={i} className="fas fa-star" style={{ color: '#ffc107', fontSize: '9px' }}></i>)}
                                <i className="fas fa-star-half-alt" style={{ color: '#ffc107', fontSize: '9px' }}></i>
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: 800, color: '#1a1a2e' }}>4.8</div>
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