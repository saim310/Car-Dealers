"use client";
import Banner from '@/sections/common/Banner';

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// =========================================
// SVG ICONS (Thin Stroke, Consistent)
// =========================================

const IconCheck = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconCar = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M2 12h12" />
  </svg>
);

const IconFile = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const IconGauge = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4" />
    <path d="m16.2 7.8 2.9-2.9" />
    <path d="M18 12h4" />
    <path d="m16.2 16.2 2.9 2.9" />
    <path d="M12 18v4" />
    <path d="m4.9 19.1 2.9-2.9" />
    <path d="M2 12h4" />
    <path d="m4.9 4.9 2.9 2.9" />
    <circle cx="12" cy="12" r="10" />
    <path d="M12 12 7.5 16.5" />
  </svg>
);

const IconAward = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const IconWallet = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const IconArrowRight = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// =========================================
// ANIMATION WRAPPER
// =========================================

const UkaFadeIn = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
    },
  }as any ;

  return (
     
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// =========================================
// SECTION TITLE COMPONENT
// =========================================

const UkaSectionTitle = ({
  tagline,
  title,
  align = "left",
  light = false,
}: {
  tagline: string;
  title: string;
  align?: "left" | "center";
  light?: boolean;
}) => (
  <div className={`uka-section-title uka-section-title--${align}`}>
    <div className="uka-section-title__tagline-wrapper">
      <span className="uka-section-title__line" />
      <span className="uka-section-title__tagline">{tagline}</span>
      {align === "center" && <span className="uka-section-title__line" />}
    </div>
    <h2 className={`uka-section-title__heading ${light ? "uka-section-title__heading--light" : ""}`}>
      {title}
    </h2>
  </div>
);

// =========================================
// FEATURE CARD COMPONENT
// =========================================

const UkaFeatureCard = ({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    initial={{ x: 30, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    viewport={{ once: true }}
    className="uka-feature-card"
  >
    <div className="uka-feature-card__icon">{icon}</div>
    <div className="uka-feature-card__content">
      <h4 className="uka-feature-card__title">{title}</h4>
      <p className="uka-feature-card__text">{description}</p>
    </div>
  </motion.div>
);

// =========================================
// FORM INPUT COMPONENT
// =========================================

const UkaFormInput = ({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  isTextarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  isTextarea?: boolean;
}) => (
  <div className="uka-form__group">
    <label className="uka-form__label">
      {label}
      {required && <span className="uka-form__required">*</span>}
    </label>
    {isTextarea ? (
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="uka-form__input uka-form__input--textarea"
      />
    ) : (
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="uka-form__input"
      />
    )}
  </div>
);

// =========================================
// MAIN PAGE
// =========================================

const WholesalePage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dealership: "",
    legalEntity: "",
    lcmt: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const features = [
    { icon: <IconCar className="uka-icon uka-icon--md" />, title: "High Quality Japanese Imports", desc: "Premium vehicles sourced directly from Japan with full inspection reports" },
    { icon: <IconWallet className="uka-icon uka-icon--md" />, title: "Custom Financing", desc: "Easy and flexible financing options tailored for wholesale dealers" },
    { icon: <IconGauge className="uka-icon uka-icon--md" />, title: "Auction Sheet Verified", desc: "Japanese auction sheet for guaranteed odometer accuracy and condition" },
    { icon: <IconFile className="uka-icon uka-icon--md" />, title: "Export Certificate", desc: "Complete documentation and export certificates for every vehicle" },
    { icon: <IconAward className="uka-icon uka-icon--md" />, title: "Industry Leader", desc: "25+ years of wholesale experience importing quality vehicles to Australia" },
  ];

  const formFields = [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "dealership", label: "Dealership Name", required: true },
    { name: "legalEntity", label: "Legal Entity Name" },
    { name: "lcmt", label: "LCMT Number" },
  ];

  return (
    
    <main className="uka-wholesale">
      
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="uka-hero">
        
        <div className="uka-hero__glow uka-hero__glow--left" />
        <div className="uka-hero__glow uka-hero__glow--right" />

        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-7 col-lg-8">
              <UkaFadeIn direction="left">
                <div className="uka-hero__badge">
                  <IconAward className="uka-icon uka-icon--sm" />
                  <span>Wholesale Division</span>
                </div>

                <h1 className="uka-hero__title">
                  Wholesale <span className="uka-hero__title-accent">Used Cars</span>
                </h1>

                <p className="uka-hero__desc">
                  Buy wholesale Japanese used cars in Melbourne at competitive prices.
                  Over 25 years of experience in importing quality vehicles to Australia.
                </p>

                <Link href="#enquiry" className="uka-btn uka-btn--primary">
                  Register Interest
                  <IconArrowRight className="uka-icon uka-icon--xs" />
                </Link>
              </UkaFadeIn>
            </div>

            <div className="col-xl-5 col-lg-4 d-none d-lg-block">
              <UkaFadeIn direction="right" delay={0.3}>
                <div className="uka-hero__stat">
                  <div className="uka-hero__stat-value">25+</div>
                  <div className="uka-hero__stat-label">Years Experience</div>
                </div>
              </UkaFadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FORM + WHY CHOOSE US
          ========================================= */}
      <section className="uka-content" id="enquiry">
        <div className="container">
          <div className="row g-5">
            {/* Left — Form */}
            <div className="col-xl-5 col-lg-6">
              <UkaFadeIn direction="left">
                <div className="uka-form-card">
                  <UkaSectionTitle tagline="Get Started" title="Wholesale Enquiry" />

                  <form onSubmit={handleSubmit} className="uka-form">
                    {formFields.map((field) => (
                      <UkaFormInput
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        required={field.required}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(val) => updateField(field.name, val)}
                      />
                    ))}

                    <UkaFormInput
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={(val) => updateField("message", val)}
                      isTextarea
                    />

                    <button type="submit" className="uka-btn uka-btn--submit">
                      Submit Enquiry
                    </button>
                  </form>
                </div>
              </UkaFadeIn>
            </div>

            {/* Right — Why Choose Us */}
            <div className="col-xl-7 col-lg-6 ps-xl-5">
              <UkaFadeIn direction="right" delay={0.2}>
                <UkaSectionTitle
                  tagline="Why Us"
                  title="Why Choose Us for Wholesale Used Cars?"
                />

                <p className="uka-content__intro">
                  A lot of dealers charge hidden fees and provide compromised quality.
                  We keep transparent prices and communication so you can confirm
                  the quality and price of every Japanese import.
                </p>

                <div className="uka-features">
                  {features.map((f, i) => (
                    <UkaFeatureCard
                      key={i}
                      icon={f.icon}
                      title={f.title}
                      description={f.desc}
                      index={i}
                    />
                  ))}
                </div>
              </UkaFadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          CTA SECTION
          ========================================= */}
      <section className="uka-cta">
        <div className="container text-center">
          <UkaFadeIn>
            <h2 className="uka-cta__title">
              Register <span className="uka-cta__title-accent">Now!</span>
            </h2>

            <p className="uka-cta__desc">
              Have exclusive access to wholesale used car sales in Melbourne.
              Join our network of trusted dealers.
            </p>

            <Link href="#enquiry" className="uka-btn uka-btn--primary">
              Get Started
              <IconArrowRight className="uka-icon uka-icon--sm" />
            </Link>
          </UkaFadeIn>
        </div>
      </section>

      {/* =========================================
          STYLES
          ========================================= */}
      <style jsx global>{`
        /* =========================================
           BASE VARIABLES
           ========================================= */
        .uka-wholesale {
          --uka-gold: #F5B818;
          --uka-gold-light: rgba(245, 184, 24, 0.08);
          --uka-gold-medium: rgba(245, 184, 24, 0.15);
          --uka-navy: #0F0F1B;
          --uka-navy-light: #16162A;
          --uka-cream: #F5F0E6;
          --uka-cream-dark: #E8E4DB;
          --uka-white: #FFFFFF;
          --uka-text-primary: #111111;
          --uka-text-secondary: #555555;
          --uka-text-muted: #8B8FA3;
          --uka-text-light: #A1A1AA;
          --uka-border: #E5E0D5;
          --uka-border-gold: rgba(245, 184, 24, 0.15);
          --uka-radius-sm: 10px;
          --uka-radius-md: 12px;
          --uka-radius-lg: 16px;
          --uka-radius-xl: 20px;
          --uka-radius-2xl: 24px;
          --uka-space-xs: 8px;
          --uka-space-sm: 16px;
          --uka-space-md: 24px;
          --uka-space-lg: 32px;
          --uka-space-xl: 40px;
          --uka-space-2xl: 48px;
          --uka-space-3xl: 64px;
          --uka-space-4xl: 80px;
          --uka-space-5xl: 100px;
        }

        /* =========================================
           ICONS
           ========================================= */
        .uka-icon {
          display: inline-block;
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }
        .uka-icon--xs { width: 16px; height: 16px; }
        .uka-icon--sm { width: 20px; height: 20px; }
        .uka-icon--md { width: 28px; height: 28px; }
        .uka-icon--lg { width: 36px; height: 36px; }

        /* =========================================
           BUTTONS
           ========================================= */
        .uka-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: var(--uka-radius-md);
          font-weight: 600;
          font-size: 15px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        .uka-btn--primary {
          background: var(--uka-gold);
          color: var(--uka-navy);
          border: 2px solid var(--uka-gold);
        }
        .uka-btn--primary:hover {
          background: var(--uka-navy);
          color: var(--uka-gold);
        }
        .uka-btn--submit {
          width: 100%;
          padding: 18px;
          background: var(--uka-gold);
          color: var(--uka-navy);
          font-weight: 700;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: var(--uka-space-sm);
        }
        .uka-btn--submit:hover {
          background: var(--uka-navy);
          color: var(--uka-gold);
        }

        /* =========================================
           SECTION TITLE
           ========================================= */
        .uka-section-title {
          margin-bottom: var(--uka-space-lg);
        }
        .uka-section-title--left {
          text-align: left;
        }
        .uka-section-title--center {
          text-align: center;
        }
        .uka-section-title__tagline-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: var(--uka-space-sm);
        }
        .uka-section-title--center .uka-section-title__tagline-wrapper {
          justify-content: center;
        }
        .uka-section-title__line {
          width: 40px;
          height: 2px;
          background: var(--uka-gold);
          border-radius: 2px;
        }
        .uka-section-title__tagline {
          color: var(--uka-gold);
          text-transform: uppercase;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2.5px;
        }
        .uka-section-title__heading {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          text-transform: uppercase;
          color: var(--uka-text-primary);
          line-height: 1.2;
          letter-spacing: -0.5px;
          margin: 0;
        }
        .uka-section-title__heading--light {
          color: var(--uka-white);
        }

        /* =========================================
           HERO SECTION
           ========================================= */
        .uka-hero {
          position: relative;
          background: var(--uka-navy);
          padding: 140px 0 100px;
          overflow: hidden;
        }
        .uka-hero__glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .uka-hero__glow--left {
          top: 5%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(245, 184, 24, 0.06) 0%, transparent 70%);
        }
        .uka-hero__glow--right {
          bottom: 0%;
          right: 5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(245, 184, 24, 0.04) 0%, transparent 70%);
        }
        .uka-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: var(--uka-space-lg);
          padding: 10px 20px;
          background: var(--uka-gold-light);
          border-radius: var(--uka-radius-sm);
          border: 1px solid var(--uka-border-gold);
          color: var(--uka-gold);
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .uka-hero__badge .uka-icon {
          color: var(--uka-gold);
        }
        .uka-hero__title {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 800;
          color: var(--uka-white);
          line-height: 1.05;
          text-transform: uppercase;
          margin-bottom: var(--uka-space-lg);
          letter-spacing: -2px;
          margin-top: 0;
        }
        .uka-hero__title-accent {
          color: var(--uka-gold);
        }
        .uka-hero__desc {
          font-size: 18px;
          color: var(--uka-text-light);
          line-height: 1.8;
          max-width: 540px;
          margin-bottom: var(--uka-space-xl);
          margin-top: 0;
        }
        .uka-hero__stat {
          background: linear-gradient(135deg, rgba(245, 184, 24, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
          border-radius: var(--uka-radius-2xl);
          border: 1px solid rgba(255, 255, 255, 0.06);
          height: 400px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .uka-hero__stat-value {
          font-size: 80px;
          font-weight: 800;
          color: var(--uka-gold);
          line-height: 1;
          margin-bottom: 12px;
        }
        .uka-hero__stat-label {
          font-size: 16px;
          color: var(--uka-text-light);
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        /* =========================================
           CONTENT SECTION
           ========================================= */
        .uka-content {
          background: var(--uka-cream);
          padding: var(--uka-space-5xl) 0;
        }
        .uka-content__intro {
          font-size: 17px;
          color: var(--uka-text-secondary);
          line-height: 1.8;
          margin-bottom: var(--uka-space-xl);
          margin-top: 0;
        }

        /* =========================================
           FORM CARD
           ========================================= */
        .uka-form-card {
          background: var(--uka-white);
          border-radius: var(--uka-radius-2xl);
          padding: var(--uka-space-2xl);
          border: 1px solid var(--uka-cream-dark);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
        }

        /* =========================================
           FORM
           ========================================= */
        .uka-form {
          display: flex;
          flex-direction: column;
          gap: var(--uka-space-md);
        }
        .uka-form__group {
          display: flex;
          flex-direction: column;
          gap: var(--uka-space-xs);
        }
        .uka-form__label {
          font-size: 13px;
          font-weight: 600;
          color: var(--uka-text-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .uka-form__required {
          color: var(--uka-gold);
          margin-left: 4px;
        }
        .uka-form__input {
          width: 100%;
          padding: 14px 18px;
          border-radius: var(--uka-radius-sm);
          border: 1px solid var(--uka-border);
          font-size: 15px;
          color: var(--uka-text-primary);
          background: #FAFAFA;
          outline: none;
          transition: all 0.3s ease;
        }
        .uka-form__input:focus {
          border-color: var(--uka-gold);
          background: var(--uka-white);
        }
        .uka-form__input--textarea {
          resize: vertical;
          min-height: 100px;
        }

        /* =========================================
           FEATURES
           ========================================= */
        .uka-features {
          display: flex;
          flex-direction: column;
          gap: var(--uka-space-md);
        }
        .uka-feature-card {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: var(--uka-space-md) var(--uka-space-lg);
          background: var(--uka-white);
          border-radius: var(--uka-radius-lg);
          border: 1px solid var(--uka-cream-dark);
          transition: all 0.3s ease;
          cursor: default;
        }
        .uka-feature-card:hover {
          border-color: var(--uka-gold);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
          transform: translateX(4px);
        }
        .uka-feature-card__icon {
          width: 52px;
          height: 52px;
          background: var(--uka-gold-light);
          border-radius: var(--uka-radius-md);
          color: var(--uka-gold);
          border: 1px solid var(--uka-border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .uka-feature-card__content {
          flex: 1;
        }
        .uka-feature-card__title {
          font-size: 17px;
          font-weight: 600;
          color: var(--uka-text-primary);
          margin-bottom: 6px;
          margin-top: 0;
        }
        .uka-feature-card__text {
          font-size: 15px;
          color: var(--uka-text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* =========================================
           CTA SECTION
           ========================================= */
        .uka-cta {
          background: var(--uka-navy);
          padding: var(--uka-space-4xl) 0;
          text-align: center;
        }
        .uka-cta__title {
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 700;
          color: var(--uka-white);
          text-transform: uppercase;
          margin-bottom: var(--uka-space-md);
          letter-spacing: -0.5px;
          margin-top: 0;
        }
        .uka-cta__title-accent {
          color: var(--uka-gold);
        }
        .uka-cta__desc {
          font-size: 17px;
          color: var(--uka-text-muted);
          max-width: 500px;
          margin: 0 auto var(--uka-space-xl);
          line-height: 1.7;
        }

        /* =========================================
           RESPONSIVE
           ========================================= */
        @media (max-width: 991px) {
          .uka-hero {
            padding: 100px 0 80px;
          }
          .uka-hero__title {
            font-size: 36px;
          }
          .uka-hero__stat {
            height: 300px;
            margin-top: var(--uka-space-xl);
          }
          .uka-content {
            padding: 60px 0;
          }
          .uka-form-card {
            padding: var(--uka-space-lg);
          }
        }

        @media (max-width: 767px) {
          .uka-hero__title {
            font-size: 32px;
            letter-spacing: -1px;
          }
          .uka-hero__stat-value {
            font-size: 60px;
          }
          .uka-form-card {
            padding: var(--uka-space-md);
          }
          .uka-feature-card {
            padding: var(--uka-space-md);
          }
          .uka-section-title__heading {
            font-size: 24px;
          }
        }
      `}</style>
    </main>
  );
};

export default WholesalePage;
