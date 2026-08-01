"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// =========================================
// ICONS
// =========================================

const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconFileCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="m9 15 2 2 4-4" />
  </svg>
);

const IconAward = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
// HIGHLIGHT CARD
// =========================================

const HighlightCard = ({ icon, title, delay }: { icon: React.ReactNode; title: string; delay: number }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "16px 20px",
      background: "#fff",
      borderRadius: "12px",
      border: "1px solid #eee",
      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    }}
  >
    <span style={{ color: "#F5B818" }}>{icon}</span>
    <span style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a2e" }}>{title}</span>
  </motion.div>
);

// =========================================
// MAIN COMPONENT
// =========================================

const WelcomeSection: React.FC = () => {
  return (
    <section style={{ background: "#f8f7f4", padding: "80px 0" }}>
      <div className="container">
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          
          {/* Header Block */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            {/* Tagline */}
          

            {/* Main Heading */}
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                color: "#1a1a2e",
                textTransform: "uppercase",
                letterSpacing: "-0.5px",
                marginBottom: "12px",
                marginTop: 0,
                lineHeight: 1.2,
              }}
            >
              About  <span style={{ color: "#F5B818" }}>UKA Japan Motors</span>
            </h2>

            {/* Subheading */}
            <h2
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "20px",
                lineHeight: 1.5,
              }}
            >
             Your Trusted Source for Japanese Cars in Australia
            </h2>

            {/* Decorative Line */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
              <div style={{ width: "60px", height: "2px", background: "#ddd" }} />
              <div style={{ width: "8px", height: "8px", background: "#F5B818", borderRadius: "50%", transform: "rotate(45deg)" }} />
              <div style={{ width: "60px", height: "2px", background: "#ddd" }} />
            </div>
          </motion.div>

          {/* Highlight Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <HighlightCard icon={<IconShield />} title="25+ Years Experience" delay={0.1} />
            <HighlightCard icon={<IconFileCheck />} title="Export Certified" delay={0.2} />
            <HighlightCard icon={<IconAward />} title="Auction Sheet Verified" delay={0.3} />
          </div>

          {/* Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "40px",
              border: "1px solid #eee",
              boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
            }}
          >
<div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
  <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#555", margin: 0 }}>
    UKA Japan Motors is a trusted name for Japanese cars in Australia, helping customers across{" "}
    <strong>Melbourne, Brisbane</strong>, and surrounding areas find quality vehicles at competitive prices.
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

  <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#555", margin: 0 }}>
    Customer satisfaction is at the heart of everything we do. Every vehicle is carefully selected
    and inspected to maintain our high standards of quality and reliability. We also provide
    guidance regarding Japanese import car insurance Australia options and other important ownership
    requirements.
  </p>

  <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#555", margin: 0 }}>
    At UKA Japan Motors, we are proud to help Australian drivers access quality Japanese import
    cars at affordable prices. Whether you're buying your first imported vehicle or expanding your
    collection, our team is ready to help you every step of the way.

    <br />
    <br />

    In addition to vehicle sourcing, We provide flexible <strong>finance options</strong> for easy
    car ownership, helping customers easily secure affordable payment options. We also support with{" "}
    <strong>warranty options, after-sales service, insurance guidance</strong>, and{" "}
    <strong>test drive facility</strong> to ensure a smooth and stress-free buying experience.
  </p>

  <p style={{ fontSize: "14px", lineHeight: 1.8, color: "#555", margin: 0 }}>
    At UKA Japan, we make Japanese import cars in Australia more accessible through simple and
    flexible financing solutions.
  </p>
</div>
            {/* CTA */}
            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #eee" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <p style={{ fontSize: "13px", color: "#888", margin: "0 0 4px" }}>Ready to find your car?</p>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Browse Our Latest Stock</p>
                </div>
		<Link href="/inner/products"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    background: "#F5B818",
                    color: "#1a1a2e",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                    borderRadius: "10px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#1a1a2e";
                    e.currentTarget.style.color = "#F5B818";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#F5B818";
                    e.currentTarget.style.color = "#1a1a2e";
                  }}
                >
                  View Stock
                  <IconArrowRight />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
