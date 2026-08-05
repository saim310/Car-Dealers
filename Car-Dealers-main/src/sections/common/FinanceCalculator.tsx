"use client";
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';

const FinanceCalculatorSection: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState<number>(5000);
    const [interestRate, setInterestRate] = useState<number>(2.50);
    const [loanTerm, setLoanTerm] = useState<number>(12);
    const [weeklyRepayment, setWeeklyRepayment] = useState<number>(97.38);
    const [monthlyRepayment, setMonthlyRepayment] = useState<number>(422.33);
    const [isDraggingAmount, setIsDraggingAmount] = useState(false);
    const [isDraggingRate, setIsDraggingRate] = useState(false);

    const calculateRepayments = () => {
        const r = interestRate / 100 / 12;
        const n = loanTerm;
        const p = loanAmount;

        if (r === 0 || p === 0) {
            const monthly = p / (n || 1);
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

    const formatCurrency = (val: number) => {
        return val.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const getSliderProgress = (value: number, min: number, max: number) => {
        return ((value - min) / (max - min)) * 100;
    };

    const termOptions = [12, 24, 36, 48, 60, 72, 84];

    return (
        <section style={{ background: '#f8f9fa', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                    style={{ marginBottom: '50px' }}
                >
                    <span style={{
                        color: '#ffc107',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        fontSize: '12px',
                        letterSpacing: '2px',
                        display: 'block',
                        marginBottom: '10px'
                    }}>
                        Plan Your Purchase
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(26px, 3.5vw, 38px)',
                        fontWeight: 900,
                        color: '#1a1a2e',
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                        lineHeight: 1.2
                    }}>
                        Finance <span style={{ color: '#ffc107' }}>Calculator</span>
                    </h2>
                    <p style={{
                        color: '#888',
                        fontSize: '15px',
                        maxWidth: '480px',
                        margin: '0 auto'
                    }}>
                        Adjust the sliders below to estimate your weekly and monthly repayments.
                    </p>
                </motion.div>

                <div className="row g-4 align-items-start">
                    {/* Left — Controls */}
                    <motion.div
                        className="col-lg-7"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div style={{
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '36px',
                            border: '1px solid #eee',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                        }}>
                            {/* Loan Term */}
                            <div style={{ marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                    <label style={{
                                        color: '#1a1a2e',
                                        fontSize: '13px',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <i className="far fa-calendar-alt" style={{ color: '#ffc107', fontSize: '14px' }}></i>
                                        Loan Term
                                    </label>
                                    <div style={{
                                        padding: '6px 16px',
                                        background: '#ffc107',
                                        borderRadius: '8px',
                                        color: '#1a1a2e',
                                        fontWeight: 800,
                                        fontSize: '13px'
                                    }}>
                                        {loanTerm} Months
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {termOptions.map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => setLoanTerm(term)}
                                            style={{
                                                padding: '10px 18px',
                                                borderRadius: '10px',
                                                border: '2px solid',
                                                borderColor: loanTerm === term ? '#ffc107' : '#f0f0f0',
                                                background: loanTerm === term ? '#ffc107' : '#fff',
                                                color: loanTerm === term ? '#1a1a2e' : '#888',
                                                fontWeight: 800,
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Loan Amount Slider */}
                            <div style={{ marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                    <label style={{
                                        color: '#1a1a2e',
                                        fontSize: '13px',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <i className="fas fa-dollar-sign" style={{ color: '#ffc107', fontSize: '14px' }}></i>
                                        Loan Amount
                                    </label>
                                    <span style={{
                                        color: '#1a1a2e',
                                        fontWeight: 900,
                                        fontSize: '20px'
                                    }}>
                                        ${loanAmount.toLocaleString()}
                                    </span>
                                </div>
                                <div style={{ position: 'relative', padding: '10px 0' }}>
                                    <div style={{
                                        height: '6px',
                                        background: '#f0f0f0',
                                        borderRadius: '3px',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${getSliderProgress(loanAmount, 1000, 200000)}%`,
                                            background: '#ffc107',
                                            borderRadius: '3px',
                                            transition: isDraggingAmount ? 'none' : 'width 0.3s ease'
                                        }} />
                                    </div>
                                    <input
                                        type="range"
                                        min="1000"
                                        max="200000"
                                        step="500"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        onMouseDown={() => setIsDraggingAmount(true)}
                                        onMouseUp={() => setIsDraggingAmount(false)}
                                        onTouchStart={() => setIsDraggingAmount(true)}
                                        onTouchEnd={() => setIsDraggingAmount(false)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: 0,
                                            transform: 'translateY(-50%)',
                                            width: '100%',
                                            height: '30px',
                                            opacity: 0,
                                            cursor: 'pointer',
                                            zIndex: 2
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: `${getSliderProgress(loanAmount, 1000, 200000)}%`,
                                        transform: 'translate(-50%, -50%)',
                                        width: '22px',
                                        height: '22px',
                                        borderRadius: '50%',
                                        background: '#ffc107',
                                        border: '3px solid #fff',
                                        boxShadow: '0 2px 8px rgba(255,193,7,0.4)',
                                        pointerEvents: 'none',
                                        transition: isDraggingAmount ? 'none' : 'left 0.3s ease'
                                    }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                    <span style={{ fontSize: '12px', color: '#aaa', fontWeight: 600 }}>$1,000</span>
                                    <span style={{ fontSize: '12px', color: '#aaa', fontWeight: 600 }}>$200,000</span>
                                </div>
                            </div>

                            {/* Interest Rate Slider */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                                    <label style={{
                                        color: '#1a1a2e',
                                        fontSize: '13px',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <i className="fas fa-percentage" style={{ color: '#ffc107', fontSize: '14px' }}></i>
                                        Interest Rate
                                    </label>
                                    <span style={{
                                        color: '#1a1a2e',
                                        fontWeight: 900,
                                        fontSize: '20px'
                                    }}>
                                        {interestRate.toFixed(2)}%
                                    </span>
                                </div>
                                <div style={{ position: 'relative', padding: '10px 0' }}>
                                    <div style={{
                                        height: '6px',
                                        background: '#f0f0f0',
                                        borderRadius: '3px',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${getSliderProgress(interestRate, 2.5, 5)}%`,
                                            background: '#ffc107',
                                            borderRadius: '3px',
                                            transition: isDraggingRate ? 'none' : 'width 0.3s ease'
                                        }} />
                                    </div>
                                    <input
                                        type="range"
                                        min="2.5"
                                        max="5"
                                        step="0.05"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        onMouseDown={() => setIsDraggingRate(true)}
                                        onMouseUp={() => setIsDraggingRate(false)}
                                        onTouchStart={() => setIsDraggingRate(true)}
                                        onTouchEnd={() => setIsDraggingRate(false)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: 0,
                                            transform: 'translateY(-50%)',
                                            width: '100%',
                                            height: '30px',
                                            opacity: 0,
                                            cursor: 'pointer',
                                            zIndex: 2
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: `${getSliderProgress(interestRate, 2.5, 5)}%`,
                                        transform: 'translate(-50%, -50%)',
                                        width: '22px',
                                        height: '22px',
                                        borderRadius: '50%',
                                        background: '#ffc107',
                                        border: '3px solid #fff',
                                        boxShadow: '0 2px 8px rgba(255,193,7,0.4)',
                                        pointerEvents: 'none',
                                        transition: isDraggingRate ? 'none' : 'left 0.3s ease'
                                    }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                    <span style={{ fontSize: '12px', color: '#aaa', fontWeight: 600 }}>2.5%</span>
                                    <span style={{ fontSize: '12px', color: '#aaa', fontWeight: 600 }}>5.0%</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Results Card */}
                    <motion.div
                        className="col-lg-5"
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div style={{
                            background: '#fff',
                            borderRadius: '16px',
                            padding: '36px',
                            border: '1px solid #eee',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Decorative top bar */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: '#ffc107'
                            }} />

                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <p style={{
                                    color: '#999',
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: 700,
                                    marginBottom: '6px'
                                }}>
                                    Estimated Repayment
                                </p>
                                <h3 style={{
                                    fontSize: '13px',
                                    color: '#1a1a2e',
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1.5px',
                                    margin: 0
                                }}>
                                    Based on your selections
                                </h3>
                            </div>

                            {/* Weekly Repayment — Primary */}
                            <div style={{
                                background: '#ffc107',
                                borderRadius: '14px',
                                padding: '28px',
                                textAlign: 'center',
                                marginBottom: '16px',
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
                                    background: 'rgba(255,255,255,0.2)'
                                }} />
                                <p style={{
                                    color: 'rgba(26,26,46,0.7)',
                                    fontSize: '12px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: 800,
                                    marginBottom: '6px',
                                    position: 'relative'
                                }}>
                                    Per Week
                                </p>
                                <p style={{
                                    color: '#1a1a2e',
                                    fontSize: '42px',
                                    fontWeight: 900,
                                    margin: 0,
                                    lineHeight: 1,
                                    position: 'relative'
                                }}>
                                    ${weeklyRepayment.toFixed(2)}
                                </p>
                            </div>

                            {/* Monthly Repayment — Secondary */}
                            <div style={{
                                background: '#1a1a2e',
                                borderRadius: '14px',
                                padding: '22px',
                                textAlign: 'center',
                                marginBottom: '28px'
                            }}>
                                <p style={{
                                    color: '#888',
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: 700,
                                    marginBottom: '4px'
                                }}>
                                    Per Month
                                </p>
                                <p style={{
                                    color: '#fff',
                                    fontSize: '28px',
                                    fontWeight: 800,
                                    margin: 0
                                }}>
                                    ${monthlyRepayment.toFixed(2)}
                                </p>
                            </div>

                            {/* Summary Details */}
                            <div style={{
                                borderTop: '1px solid #f0f0f0',
                                paddingTop: '22px'
                            }}>
                                {[
                                    { label: 'Loan Amount', value: `$${formatCurrency(loanAmount)}` },
                                    { label: 'Interest Rate', value: `${interestRate.toFixed(2)}%` },
                                    { label: 'Loan Term', value: `${loanTerm} Months` },
                                    { label: 'Total Interest', value: `$${formatCurrency(monthlyRepayment * loanTerm - loanAmount)}` }
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '10px 0',
                                        borderBottom: i < 3 ? '1px solid #f5f5f5' : 'none'
                                    }}>
                                        <span style={{ color: '#888', fontSize: '13px', fontWeight: 600 }}>{item.label}</span>
                                        <span style={{ color: '#1a1a2e', fontWeight: 800, fontSize: '13px' }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div style={{ marginTop: '28px' }}>
                                <Link
                                    href="/finance/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        width: '100%',
                                        padding: '16px',
                                        background: '#ffc107',
                                        color: '#1a1a2e',
                                        borderRadius: '10px',
                                        textDecoration: 'none',
                                        fontWeight: 800,
                                        fontSize: '13px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px',
                                        transition: 'all 0.3s ease',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#1a1a2e';
                                        e.currentTarget.style.color = '#ffc107';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#ffc107';
                                        e.currentTarget.style.color = '#1a1a2e';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Apply for Finance
                                    <i className="fas fa-arrow-right" style={{ fontSize: '11px' }}></i>
                                </Link>
                                <p style={{
                                    textAlign: 'center',
                                    margin: '14px 0 0',
                                    fontSize: '11px',
                                    color: '#aaa',
                                    fontWeight: 500
                                }}>
                                    *This is an estimate only. Actual rates may vary.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FinanceCalculatorSection;