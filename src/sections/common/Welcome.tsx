"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// =========================================
// ICONS
// =========================================

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconFileCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m9 15 2 2 4-4" />
  </svg>
);

const IconAward = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// =========================================
// HIGHLIGHT ITEM
// =========================================

const HighlightItem = ({ icon, title, delay }: { icon: React.ReactNode; title: string; delay: number }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="trust-item"
  >
    <div className="trust-icon">{icon}</div>
    <span className="trust-title">{title}</span>
  </motion.div>
);

// =========================================
// MAIN COMPONENT
// =========================================

const WelcomeSection: React.FC = () => {
  return (
    <>
      <section className="welcome-section">
        <div className="container">
          <div className="welcome-inner">
            
            {/* Header Block */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="welcome-header"
            >
              <h2 className="welcome-title">
                About  <span style={{ color: "#F5B818" }}>UKA Japan Motors</span>
              </h2>
              <h3 className="welcome-subtitle">
                Your Trusted Source for Japanese Cars in Australia
              </h3>
              <div className="welcome-divider">
                <div className="welcome-divider-line" />
                <div className="welcome-divider-dot" />
                <div className="welcome-divider-line" />
              </div>
            </motion.div>

            {/* Trust Bar */}
            <div className="trust-bar">
              <HighlightItem icon={<IconShield />} title="36+ Years Experience" delay={0.1} />
              <div className="trust-divider" />
              <HighlightItem icon={<IconFileCheck />} title="Export Certified" delay={0.2} />
              <div className="trust-divider" />
              <HighlightItem icon={<IconAward />} title="Auction Sheet Verified" delay={0.3} />
            </div>

            {/* Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="welcome-content"
            >
              <div className="welcome-text">
              <p>
  UKA Japan Motors is a trusted name for Japanese cars in Australia, helping customers across{" "}
  <strong>
    <a href="https://www.ukajapan.com.au/inner/products?city=Melbourne">Melbourne</a>
    ,{" "}
    <a href="https://www.ukajapan.com.au/inner/products?city=Brisbane">Brisbane</a>
  </strong>
  , and surrounding areas find quality vehicles at competitive prices.
  With years of experience in the automotive industry, we specialise in sourcing and supplying
  reliable <strong>Japanese import cars Australia</strong> drivers can depend on. As direct importers,
  we work closely with trusted Japanese auctions, dealerships, and suppliers to provide access to
  a wide range of vehicles. Whether you are looking for <strong>Japanese cars for sale</strong>,
  fuel-efficient Japanese small cars, family SUVs, commercial vehicles, or performance models,
  our team is committed to helping you find the right vehicle for your needs and budget. We make
  the process of importing cars to Australia simple and hassle free. From vehicle sourcing and
  inspections to shipping, compliance, and delivery, our experienced team manages every stage of
  the import process.
</p>

                <p>
                  Customer satisfaction is at the heart of everything we do. Every vehicle is carefully selected
                  and inspected to maintain our high standards of quality and reliability. We also provide
                  guidance regarding Japanese import car insurance Australia options and other important ownership
                  requirements.
                </p>

               <p>
  At UKA Japan Motors, we are proud to help Australian drivers access quality Japanese import
  cars at affordable prices. Whether you're buying your first imported vehicle or expanding your
  collection, our team is ready to help you every step of the way.

  <br />
  <br />

  In addition to vehicle sourcing, We provide flexible{" "}
  <strong>
    <a href="https://www.ukajapan.com.au/inner/finance/finance-information">finance options</a>
  </strong>{" "}
  for easy car ownership, helping customers easily secure affordable payment options. We also support with{" "}
  <strong>
    <a href="https://www.ukajapan.com.au/inner/warranty">warranty options</a>
    , after-sales service, insurance guidance
  </strong>
  , and{" "}
  <strong>
    <a href="https://www.ukajapan.com.au/inner/products">test drive facility</a>
  </strong>{" "}
  to ensure a smooth and stress-free buying experience.
</p>

                <p>
                  At UKA Japan, we make Japanese import cars in Australia more accessible through simple and
                  flexible financing solutions.
                </p>
              </div>

              {/* CTA */}
              <div className="welcome-cta">
                <div className="welcome-cta-text">
                  <p className="welcome-cta-label">Ready to find your car?</p>
                  <p className="welcome-cta-heading">Browse Our Latest Stock</p>
                </div>
                <Link
                  href="/inner/products"
                  className="welcome-cta-btn"
                >
                  View Stock
                  <IconArrowRight />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .welcome-section {
          background: #f8f7f4;
          padding: 80px 0;
        }
        .welcome-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 16px;
        }
        .welcome-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .welcome-title {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 800;
          color: #1a1a2e;
          text-transform: uppercase;
          letter-spacing: -0.5px;
          margin-bottom: 12px;
          margin-top: 0;
          line-height: 1.2;
        }
        .welcome-subtitle {
          font-size: 14px;
          font-weight: 600;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .welcome-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }
        .welcome-divider-line {
          width: 60px;
          height: 2px;
          background: #ddd;
        }
        .welcome-divider-dot {
          width: 8px;
          height: 8px;
          background: #F5B818;
          border-radius: 50%;
          transform: rotate(45deg);
        }

        /* ─── Trust Bar ─── */
        .trust-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #eee;
          border-radius: 16px;
          padding: 24px 32px;
          margin-bottom: 40px;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
          justify-content: center;
        }
        .trust-icon {
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 50%;
          background: #fff8e1;
          color: #F5B818;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .trust-title {
          font-size: 15px;
          font-weight: 700;
          color: #1a1a2e;
          letter-spacing: -0.2px;
          white-space: nowrap;
        }
        .trust-divider {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, #e0e0e0, transparent);
          flex-shrink: 0;
        }

        .welcome-content {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          border: 1px solid #eee;
          box-shadow: 0 4px 24px rgba(0,0,0,0.03);
        }
        .welcome-text {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .welcome-text p {
          font-size: 14px;
          line-height: 1.8;
          color: #555;
          margin: 0;
        }
        .welcome-cta {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .welcome-cta-label {
          font-size: 13px;
          color: #888;
          margin: 0 0 4px;
        }
        .welcome-cta-heading {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }
        .welcome-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #F5B818;
          color: #1a1a2e;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s;
        }
        .welcome-cta-btn:hover {
          background: #1a1a2e;
          color: #F5B818;
        }

        /* Tablet */
        @media (max-width: 991px) {
          .trust-bar {
            padding: 20px 24px;
          }
          .trust-title {
            font-size: 14px;
          }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .welcome-section {
            padding: 40px 0;
          }
          .welcome-header {
            margin-bottom: 24px;
          }
          .trust-bar {
            flex-direction: column;
            align-items: stretch;
            padding: 16px 20px;
            gap: 0;
            margin-bottom: 24px;
          }
          .trust-item {
            justify-content: flex-start;
            padding: 14px 4px;
          }
          .trust-divider {
            width: 100%;
            height: 1px;
            background: linear-gradient(to right, transparent, #e0e0e0, transparent);
          }
          .welcome-content {
            padding: 24px;
            border-radius: 16px;
          }
          .welcome-cta {
            flex-direction: column;
            align-items: flex-start;
          }
          .welcome-divider-line {
            width: 40px;
          }
        }
      `}</style>
    </>
  );
};

export default WelcomeSection;
