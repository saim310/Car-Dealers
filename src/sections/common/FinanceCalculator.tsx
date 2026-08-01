"use client"
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

    return (
        <section style={{ background: '#0F0F1B', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative elements */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(245,185,56,0.03) 0%, transparent 60%)',
                pointerEvents: 'none'
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                    style={{ marginBottom: '60px' }}
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
                        Plan Your Purchase
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(28px, 4vw, 42px)',
                        fontWeight: 800,
                        color: '#ffffff',
                        textTransform: 'uppercase',
                        marginBottom: '12px',
                        lineHeight: 1.2
                    }}>
                        Finance <span style={{ color: '#f5b93c' }}>Calculator</span>
                    </h2>
                    <p style={{
                        color: '#888',
                        fontSize: '16px',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        Adjust the sliders below to estimate your weekly and monthly repayments.
                    </p>
                </motion.div>

                <div className="row align-items-center">
                    {/* Left — Controls */}
                    <motion.div
                        className="col-lg-7"
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div style={{
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '24px',
                            padding: '40px',
                            border: '1px solid rgba(255,255,255,0.06)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            {/* Loan Term */}
                            <div style={{ marginBottom: '35px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <label style={controlLabelStyle}>
                                        <span className="icon-calendar" style={{ marginRight: '8px', color: '#f5b93c' }}></span>
                                        Loan Term
                                    </label>
                                    <div style={{
                                        padding: '8px 20px',
                                        background: '#f5b93c',
                                        borderRadius: '8px',
                                        color: '#1a1a1a',
                                        fontWeight: 700,
                                        fontSize: '14px'
                                    }}>
                                        {loanTerm} Months
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {[12, 24, 36, 48, 60, 72, 84].map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => setLoanTerm(term)}
                                            style={{
                                                padding: '10px 20px',
                                                borderRadius: '10px',
                                                border: '2px solid',
                                                borderColor: loanTerm === term ? '#f5b93c' : 'rgba(255,255,255,0.1)',
                                                background: loanTerm === term ? '#f5b93c' : 'transparent',
                                                color: loanTerm === term ? '#1a1a1a' : '#888',
                                                fontWeight: 700,
                                                fontSize: '13px',
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
                            <div style={{ marginBottom: '35px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <label style={controlLabelStyle}>
                                        <span className="icon-money" style={{ marginRight: '8px', color: '#f5b93c' }}></span>
                                        Loan Amount
                                    </label>
                                    <span style={{
                                        color: '#f5b93c',
                                        fontWeight: 800,
                                        fontSize: '20px'
                                    }}>
                                        ${loanAmount.toLocaleString()}
                                    </span>
                                </div>
                                <div style={{ position: 'relative', padding: '10px 0' }}>
                                    <div style={{
                                        height: '6px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '3px',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${getSliderProgress(loanAmount, 1000, 200000)}%`,
                                            background: '#f5b93c',
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
                                    {/* Custom thumb */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: `${getSliderProgress(loanAmount, 1000, 200000)}%`,
                                        transform: 'translate(-50%, -50%)',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: '#f5b93c',
                                        border: '4px solid #ffffff',
                                        boxShadow: '0 2px 10px rgba(245,185,56,0.4)',
                                        pointerEvents: 'none',
                                        transition: isDraggingAmount ? 'none' : 'left 0.3s ease'
                                    }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                    <span style={{ fontSize: '12px', color: '#555' }}>$1,000</span>
                                    <span style={{ fontSize: '12px', color: '#555' }}>$200,000</span>
                                </div>
                            </div>

                            {/* Interest Rate Slider */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <label style={controlLabelStyle}>
                                        <span className="icon-percentage" style={{ marginRight: '8px', color: '#f5b93c' }}></span>
                                        Interest Rate
                                    </label>
                                    <span style={{
                                        color: '#f5b93c',
                                        fontWeight: 800,
                                        fontSize: '20px'
                                    }}>
                                        {interestRate.toFixed(2)}%
                                    </span>
                                </div>
                                <div style={{ position: 'relative', padding: '10px 0' }}>
                                    <div style={{
                                        height: '6px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '3px',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${getSliderProgress(interestRate, 2.5, 5)}%`,
                                            background: '#f5b93c',
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
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: '#f5b93c',
                                        border: '4px solid #ffffff',
                                        boxShadow: '0 2px 10px rgba(245,185,56,0.4)',
                                        pointerEvents: 'none',
                                        transition: isDraggingRate ? 'none' : 'left 0.3s ease'
                                    }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                    <span style={{ fontSize: '12px', color: '#555' }}>2.5%</span>
                                    <span style={{ fontSize: '12px', color: '#555' }}>5.0%</span>
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
                            background: '#ffffff',
                            borderRadius: '24px',
                            padding: '40px',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            {/* Decorative top bar */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '5px',
                                background: '#f5b93c'
                            }} />

                            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                                <p style={{
                                    color: '#888',
                                    fontSize: '12px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '3px',
                                    fontWeight: 600,
                                    marginBottom: '8px'
                                }}>
                                    Estimated Repayment
                                </p>
                                <h3 style={{
                                    fontSize: '14px',
                                    color: '#1a1a1a',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px'
                                }}>
                                    Based on your selections
                                </h3>
                            </div>

                            {/* Weekly Repayment — Primary */}
                            <div style={{
                                background: '#f5b93c',
                                borderRadius: '16px',
                                padding: '30px',
                                textAlign: 'center',
                                marginBottom: '20px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.15)'
                                }} />
                                <p style={{
                                    color: 'rgba(26,26,26,0.7)',
                                    fontSize: '13px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: 700,
                                    marginBottom: '8px',
                                    position: 'relative'
                                }}>
                                    Per Week
                                </p>
                                <p style={{
                                    color: '#1a1a1a',
                                    fontSize: '48px',
                                    fontWeight: 800,
                                    margin: 0,
                                    lineHeight: 1,
                                    position: 'relative'
                                }}>
                                    ${weeklyRepayment.toFixed(2)}
                                </p>
                            </div>

                            {/* Monthly Repayment — Secondary */}
                            <div style={{
                                background: '#1a1a1a',
                                borderRadius: '16px',
                                padding: '25px',
                                textAlign: 'center',
                                marginBottom: '30px'
                            }}>
                                <p style={{
                                    color: '#888',
                                    fontSize: '12px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: 600,
                                    marginBottom: '6px'
                                }}>
                                    Per Month
                                </p>
                                <p style={{
                                    color: '#ffffff',
                                    fontSize: '32px',
                                    fontWeight: 700,
                                    margin: 0
                                }}>
                                    ${monthlyRepayment.toFixed(2)}
                                </p>
                            </div>

                            {/* Summary Details */}
                            <div style={{
                                borderTop: '1px solid #f0f0f0',
                                paddingTop: '25px'
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
                                        <span style={{ color: '#888', fontSize: '14px' }}>{item.label}</span>
                                        <span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: '14px' }}>{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div style={{ marginTop: '30px' }}>
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
                                        padding: '18px',
                                        background: '#f5b93c',
                                        color: '#1a1a1a',
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        fontWeight: 800,
                                        fontSize: '14px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        transition: 'all 0.3s ease',
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
                                    Apply for Finance
                                    <span className="icon-right-arrow" style={{ fontSize: '12px' }}></span>
                                </Link>
                                <p style={{
                                    textAlign: 'center',
                                    margin: '15px 0 0',
                                    fontSize: '12px',
                                    color: '#aaa'
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

const controlLabelStyle: React.CSSProperties = {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    display: 'flex',
    alignItems: 'center'
};

export default FinanceCalculatorSection;