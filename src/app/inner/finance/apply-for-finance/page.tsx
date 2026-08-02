"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// =========================================
// ICONS
// =========================================

const IconArrowRight = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const IconUpload = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
  </svg>
);

const IconCheck = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconExternal = ({ className = "uka-icon" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

// =========================================
// ANIMATION
// =========================================

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    viewport={{ once: true, amount: 0.15 }}
  >
    {children}
  </motion.div>
);

// =========================================
// MAIN PAGE
// =========================================

const FinancePage: React.FC = () => {
  const [formData, setFormData] = useState({
    loanAmount: "", loanDuration: "", loanType: "", employmentStatus: "",
    residencyStatus: "", propertyOwner: "", financeBefore: "", creditHistory: "",
    name: "", phone: "", email: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const partners = [
    { name: "Magpie Finance", url: "https://www.magpiefinance.com.au/" },
    { name: "Better Finance", url: "https://betterfinance.com.au/" },
    { name: "Credit One", url: "https://www.creditone.com.au/" },
  ];

  return (
    <main className="uka-finance">
      <style jsx global>{`
        .uka-finance {
          --gold: #F5B818;
          --navy: #0F0F1B;
          --cream: #F5F0E6;
          --white: #FFFFFF;
          --text: #111111;
          --text-secondary: #555555;
          --text-muted: #8B8FA3;
          --radius: 14px;
        }

        .uka-icon { width: 20px; height: 20px; display: block; flex-shrink: 0; }

        /* HERO */
        .uka-finance-hero {
          background: var(--navy);
          padding: 120px 0 80px;
          text-align: center;
        }
        .uka-finance-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(245, 184, 24, 0.1);
          border-radius: 30px;
          border: 1px solid rgba(245, 184, 24, 0.2);
          margin-bottom: 24px;
        }
        .uka-finance-hero__badge span {
          font-size: 12px;
          font-weight: 600;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }
        .uka-finance-hero__title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          color: var(--white);
          text-transform: uppercase;
          line-height: 1.1;
          margin: 0 0 20px;
          letter-spacing: -1.5px;
        }
        .uka-finance-hero__title span { color: var(--gold); }
        .uka-finance-hero__desc {
          font-size: 17px;
          color: #A1A1AA;
          line-height: 1.8;
          max-width: 600px;
          margin: 0 auto 16px;
        }
        .uka-finance-hero__note {
          font-size: 14px;
          color: var(--text-muted);
          max-width: 700px;
          margin: 0 auto 32px;
          line-height: 1.7;
        }

        /* PARTNERS */
        .uka-finance-partners {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 8px;
        }
        .uka-finance-partner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius);
          color: var(--white);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .uka-finance-partner:hover {
          border-color: var(--gold);
          background: rgba(245, 184, 24, 0.05);
        }
        .uka-finance-partner svg { color: var(--gold); }

        /* FORM SECTION */
        .uka-finance-form-wrap {
          background: var(--cream);
          padding: 60px 0 100px;
        }
        .uka-finance-form {
          background: var(--white);
          border-radius: var(--radius);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .uka-finance-form__header {
          background: var(--navy);
          padding: 32px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .uka-finance-form__header h2 {
          font-size: 22px;
          font-weight: 700;
          color: var(--white);
          text-transform: uppercase;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .uka-finance-form__header p {
          font-size: 13px;
          color: var(--text-muted);
          margin: 4px 0 0;
        }
        .uka-finance-form__body {
          padding: 40px;
        }
        .uka-finance-form__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .uka-finance-form__group { display: flex; flex-direction: column; gap: 6px; }
        .uka-finance-form__group--full { grid-column: 1 / -1; }
        .uka-finance-form__label {
          font-size: 12px;
          font-weight: 600;
          color: var(--text);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .uka-finance-form__input,
        .uka-finance-form__select,
        .uka-finance-form__textarea {
          padding: 12px 16px;
          border: 1px solid #E8E4DB;
          border-radius: 10px;
          font-size: 14px;
          color: var(--text);
          background: #FAFAF8;
          outline: none;
          transition: all 0.2s ease;
          width: 100%;
        }
        .uka-finance-form__input:focus,
        .uka-finance-form__select:focus,
        .uka-finance-form__textarea:focus {
          border-color: var(--gold);
          background: var(--white);
          box-shadow: 0 0 0 3px rgba(245, 184, 24, 0.1);
        }
        .uka-finance-form__select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;
          padding-right: 40px;
        }
        .uka-finance-form__textarea { min-height: 100px; resize: vertical; }
        .uka-finance-form__note {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 4px 0 0;
        }
        .uka-finance-form__note strong { color: var(--gold); }

        .uka-finance-form__upload {
          border: 2px dashed #E0DDD6;
          border-radius: 10px;
          padding: 28px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .uka-finance-form__upload:hover {
          border-color: var(--gold);
          background: rgba(245, 184, 24, 0.02);
        }
        .uka-finance-form__upload-icon {
          width: 44px;
          height: 44px;
          background: rgba(245, 184, 24, 0.08);
          border-radius: 50%;
          color: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
        }
        .uka-finance-form__upload-icon svg { width: 20px; height: 20px; }
        .uka-finance-form__upload p { font-size: 14px; color: var(--text); font-weight: 500; margin: 0 0 4px; }
        .uka-finance-form__upload span { font-size: 12px; color: #999; }

        .uka-finance-form__details {
          background: #FAFAF8;
          border-radius: 10px;
          padding: 24px 28px;
          border: 1px solid #F0EDE6;
        }
        .uka-finance-form__details h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          text-transform: uppercase;
          margin: 0 0 14px;
        }
        .uka-finance-form__details ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .uka-finance-form__details li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .uka-finance-form__details li svg {
          width: 16px;
          height: 16px;
          color: var(--gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .uka-finance-form__submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px;
          background: var(--gold);
          color: var(--navy);
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .uka-finance-form__submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(245, 184, 24, 0.25);
        }

        @media (max-width: 767px) {
          .uka-finance-hero { padding: 80px 0 60px; }
          .uka-finance-hero__title { font-size: 28px; }
          .uka-finance-form__grid { grid-template-columns: 1fr; }
          .uka-finance-form__header { flex-direction: column; gap: 8px; text-align: center; }
          .uka-finance-form__body { padding: 28px 20px; }
          .uka-finance-partners { flex-direction: column; align-items: center; }
        }
      `}</style>

      {/* =========================================
          HERO — Content Only
          ========================================= */}
      <section className="uka-finance-hero">
        <div className="container">
          <FadeIn>
            <div className="uka-finance-hero__badge">
              <span>Vehicle Finance</span>
            </div>

            <h1 className="uka-finance-hero__title">
              Quick & Easy <span>Vehicle Finance</span>
            </h1>

            <p className="uka-finance-hero__desc">
              At UKA Group, we make vehicle financing simple and stress-free. Whether you are 
              self-employed or work 9-5, we will tailor a finance package that fits your budget 
              and lifestyle.
            </p>

            <p className="uka-finance-hero__note">
              We partner with trusted finance providers and are committed to responsible lending. 
              Our goal is to help you make an informed choice that you are confident with. 
              Each vehicle may show example repayment info including interest rate, deposit, and term 
              so you can see how it all adds up.
            </p>

            <div className="uka-finance-partners">
              {partners.map((p) => (
                <Link key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="uka-finance-partner">
                  {p.name}
                  <IconExternal className="uka-icon" />
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* =========================================
          FORM
          ========================================= */}
      <section className="uka-finance-form-wrap">
        <div className="container">
          <FadeIn delay={0.1}>
            <div className="uka-finance-form">
              <div className="uka-finance-form__header">
                <div>
                  <h2>Finance Enquiry</h2>
                  <p>Complete all fields for faster approval</p>
                </div>
              </div>

              <div className="uka-finance-form__body">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="uka-finance-form__grid">
                    {/* Row 1 */}
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Loan Amount</label>
                      <input type="text" name="loanAmount" placeholder="How much to borrow?" value={formData.loanAmount} onChange={handleChange} className="uka-finance-form__input" />
                    </div>
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Duration</label>
                      <select name="loanDuration" value={formData.loanDuration} onChange={handleChange} className="uka-finance-form__select" required>
                        <option value="">Years</option>
                        {[1,2,3,4,5,6].map(y => <option key={y} value={y}>{y} year{y>1?"s":""}</option>)}
                      </select>
                    </div>

                    {/* Row 2 */}
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Loan Type</label>
                      <select name="loanType" value={formData.loanType} onChange={handleChange} className="uka-finance-form__select" required>
                        <option value="">Personal or Business?</option>
                        <option value="Personal">Personal</option>
                        <option value="Business">Business</option>
                      </select>
                    </div>
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Employment</label>
                      <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} className="uka-finance-form__select" required>
                        <option value="">Employment status</option>
                        <option value="Employed">Employed</option>
                        <option value="Self employed">Self employed</option>
                        <option value="Financially supported by partner">Supported by partner</option>
                        <option value="Centrelink - Family Tax Benefits/Other">Centrelink - Family Tax</option>
                        <option value="Centrelink - Newstart only">Centrelink - Newstart</option>
                        <option value="Unemployed">Unemployed</option>
                      </select>
                    </div>

                    {/* Row 3 */}
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Residency</label>
                      <select name="residencyStatus" value={formData.residencyStatus} onChange={handleChange} className="uka-finance-form__select" required>
                        <option value="">Residency status</option>
                        <option value="Australian Citizen">Australian Citizen</option>
                        <option value="Permanent Resident">Permanent Resident</option>
                        <option value="Working Visa">Working Visa</option>
                        <option value="Bridging Visa">Bridging Visa</option>
                        <option value="Spouse Visa">Spouse Visa</option>
                        <option value="Temporary Visa">Temporary Visa</option>
                        <option value="Student Visa">Student Visa</option>
                      </select>
                    </div>
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Property Owner</label>
                      <select name="propertyOwner" value={formData.propertyOwner} onChange={handleChange} className="uka-finance-form__select" required>
                        <option value="">Property owner?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    {/* Row 4 */}
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Previous Finance</label>
                      <select name="financeBefore" value={formData.financeBefore} onChange={handleChange} className="uka-finance-form__select" required>
                        <option value="">Had finance before?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Credit History</label>
                      <select name="creditHistory" value={formData.creditHistory} onChange={handleChange} className="uka-finance-form__select" required>
                        <option value="">Credit history</option>
                        <option value="Excellent - No issues">Excellent</option>
                        <option value="Average - Defaults under $1000">Average</option>
                        <option value="Poor - Multiple defaults">Poor</option>
                        <option value="Current/Discharged Bankrupt (Part 10)">Bankrupt (Part 10)</option>
                        <option value="Current/Discharged Debt Agreement (Part 9)">Debt Agreement (Part 9)</option>
                        <option value="Not sure">Not sure</option>
                      </select>
                      <p className="uka-finance-form__note">
                        <strong>No credit score impact</strong> — this quote is obligation-free
                      </p>
                    </div>

                    {/* Contact */}
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Full Name</label>
                      <input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} className="uka-finance-form__input" required />
                    </div>
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Phone</label>
                      <input type="tel" name="phone" placeholder="Phone number" value={formData.phone} onChange={handleChange} className="uka-finance-form__input" required />
                    </div>
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Email</label>
                      <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} className="uka-finance-form__input" required />
                    </div>
                    <div className="uka-finance-form__group">
                      <label className="uka-finance-form__label">Message</label>
                      <textarea name="message" placeholder="Additional info..." value={formData.message} onChange={handleChange} className="uka-finance-form__textarea" />
                    </div>

                    {/* Upload */}
                    <div className="uka-finance-form__group uka-finance-form__group--full">
                      <label className="uka-finance-form__label">Documents</label>
                      <div className="uka-finance-form__upload">
                        <div className="uka-finance-form__upload-icon"><IconUpload /></div>
                        <p>Upload Driving License, Payslips, Visa / ID</p>
                        <span>PNG, JPEG, HEIC, PDF, GIF</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="uka-finance-form__group uka-finance-form__group--full">
                      <div className="uka-finance-form__details">
                        <h4>Required Documents</h4>
                        <ul>
                          <li><IconCheck /><span>Driving License (Front & Back)</span></li>
                          <li><IconCheck /><span>Last 3 months payslips</span></li>
                          <li><IconCheck /><span>Visa approval / Proof of ID</span></li>
                          <li><IconCheck /><span>Down payment calculated after profile review (0 deposit may be available, T&Cs apply)</span></li>
                          <li><IconCheck /><span>Finance broker will contact you after document review</span></li>
                          <li><IconCheck /><span>Select a vehicle from our stock before applying</span></li>
                        </ul>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="uka-finance-form__group uka-finance-form__group--full">
                      <button type="submit" className="uka-finance-form__submit">
                        Submit Application
                        <IconArrowRight />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
};

export default FinancePage;