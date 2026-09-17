"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  FileText,
  MapPin,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Header from "@/sections/common/Header";
import StrickyHeader from "@/sections/common/StrickyHeader";

const locationData = {
  queensland: {
    state: "QUEENSLAND",
    locationName: "Brisbane & Surrounds",
    badge: "QLD Compliant",
    insuranceNote:
      "The dealership confirms that the vehicle is insured in accordance with Queensland requirements. This agreement does not limit any rights under Australian Consumer Law.",
    points: [
      "I confirm that I hold a current and valid driver licence and I am legally permitted to drive in Queensland, Australia.",
      "I confirm that all details provided by me are true and correct.",
      "I understand that this vehicle remains the property of UKA Japan Motors during the test drive period.",
      "I agree to operate the vehicle safely and comply with all applicable road rules and laws during the test drive.",
      "I will not allow any other person to drive the vehicle unless authorised in writing by dealership staff.",
      "I confirm that I am not under the influence of alcohol, illegal drugs, or any medication that may affect my ability to drive safely.",
      "I agree to immediately report any accident, damage, mechanical issue, infringement, or incident occurring during the test drive.",
      "I understand that I am responsible for any traffic fines, tolls, parking infringements, or penalties incurred during the test drive period.",
      "I agree not to use the vehicle for racing, off-road driving, commercial use, towing, reckless driving, or any unlawful purpose.",
      "I understand that the dealership may stop or cancel the test drive at any time for safety reasons.",
    ],
  },
  victoria: {
    state: "VICTORIA",
    locationName: "Melbourne (Maidstone / Mordialloc)",
    badge: "VIC Compliant",
    insuranceNote:
      "The dealership confirms that the vehicle is insured in accordance with Victorian requirements. This agreement does not limit any rights under Australian Consumer Law.",
    points: [
      "I hold a current and valid driver's licence and am legally permitted to drive in Victoria, Australia.",
      "I will drive safely and responsibly at all times and obey all road rules, traffic laws, and speed limit.",
      "I will not allow any other person to drive the vehicle unless authorised by the dealership.",
      "I will not drive under the influence of alcohol, drugs, or medication that may impair my ability to drive.",
      "I agree to return the vehicle on or before the agreed return time and in the same condition as received subject to fair wear and tear.",
      "I agree to immediately notify the dealership of any accident, damage, theft, or mechanical issue during the test drive.",
      "I understand that I may be liable for any damage, fines, tolls, or infringements incurred during the test drive period, to the extent permitted.",
      "I authorise the dealership to record and retain my personal details for the purpose of this test drive and related business records, in accordance with privacy law.",
    ],
  },
};

export default function TermsAndConditionsPage() {
  const [activeTab, setActiveTab] = useState<"queensland" | "victoria">("queensland");
  const currentData = locationData[activeTab];

  return (
    <div className="page-wrapper" style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Navigation Headers (White Theme Container) */}
      <div style={{ backgroundColor: "#ffffff" }}>
        <Header />
        <StrickyHeader />
      </div>

      {/* Main Container */}
      <div style={{ color: "#0f172a", paddingBottom: "80px" }}>
        
        {/* White Hero Section */}
        <div
          style={{
            position: "relative",
            backgroundColor: "#ffffff",
            padding: "60px 20px 70px",
            textAlign: "center",
            borderBottom: "1px solid #e2e8f0",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "relative", zIndex: 1 }}
          >
            {/* Updated Badge Text */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                padding: "6px 18px",
                borderRadius: "20px",
                color: "#d97706",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "20px",
              }}
            >
              <Sparkles size={14} /> UKA JAPAN MOTORS
            </div>

            <h1
              style={{
                fontSize: "40px",
                fontWeight: "800",
                color: "#0f172a",
                letterSpacing: "-0.5px",
                margin: "0 0 12px 0",
              }}
            >
              Customer Declaration &amp; Policy
            </h1>

            {/* Breadcrumb */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#64748b",
                marginBottom: "35px",
              }}
            >
              <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>
                Home
              </Link>
              <ChevronRight size={14} />
              <span style={{ color: "#d97706", fontWeight: "600" }}>Terms &amp; Conditions</span>
            </div>

            {/* Pill Slider Toggle */}
            <div
              style={{
                display: "inline-flex",
                backgroundColor: "#f1f5f9",
                padding: "6px",
                borderRadius: "50px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                position: "relative",
              }}
            >
              {(["queensland", "victoria"] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      position: "relative",
                      padding: "12px 36px",
                      borderRadius: "40px",
                      fontWeight: "700",
                      fontSize: "13px",
                      letterSpacing: "1px",
                      cursor: "pointer",
                      border: "none",
                      outline: "none",
                      color: isActive ? "#ffffff" : "#64748b",
                      backgroundColor: "transparent",
                      transition: "color 0.3s ease",
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <MapPin size={15} color={isActive ? "#ffffff" : "#64748b"} />
                    {tab.toUpperCase()}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabGlow"
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: "#f59e0b",
                          borderRadius: "40px",
                          zIndex: -1,
                          boxShadow: "0 4px 15px rgba(245, 158, 11, 0.4)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Dynamic Content Card Area */}
        <div style={{ maxWidth: "950px", margin: "40px auto 0", padding: "0 20px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "40px",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Card Header Info */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "15px",
                  paddingBottom: "25px",
                  borderBottom: "1px solid #f1f5f9",
                  marginBottom: "30px",
                }}
              >
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px 0" }}>
                    Test Drive Customer Agreement
                  </h2>
                  <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>
                    Location: <strong style={{ color: "#d97706" }}>{currentData.locationName}</strong>
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    color: "#059669",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  <ShieldCheck size={18} />
                  {currentData.badge}
                </div>
              </div>

              {/* Sub-Heading */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "25px",
                  color: "#d97706",
                  fontSize: "14px",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                }}
              >
                <FileText size={18} />
                THE UNDERSIGNED CONFIRMS THAT:
              </div>

              {/* Agreement List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "35px" }}>
                {currentData.points.map((point, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    style={{
                      display: "flex",
                      gap: "15px",
                      alignItems: "flex-start",
                      backgroundColor: "#f8fafc",
                      border: "1px solid #f1f5f9",
                      borderRadius: "12px",
                      padding: "16px",
                    }}
                  >
                    <div
                      style={{
                        minWidth: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(245, 158, 11, 0.15)",
                        color: "#d97706",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "800",
                        marginTop: "2px",
                      }}
                    >
                      {idx + 1}
                    </div>
                    <p style={{ margin: 0, color: "#334155", fontSize: "15px", lineHeight: "1.6" }}>
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Legal & Insurance Warning Box */}
              <div
                style={{
                  backgroundColor: "#fffbe8",
                  border: "1px solid #fde68a",
                  borderRadius: "14px",
                  padding: "24px",
                  display: "flex",
                  gap: "18px",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ padding: "8px", borderRadius: "10px", backgroundColor: "rgba(245, 158, 11, 0.2)", color: "#d97706" }}>
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <h4 style={{ color: "#b45309", margin: "0 0 6px 0", fontSize: "15px", fontWeight: "700" }}>
                    Insurance &amp; Liability Details
                  </h4>
                  <p style={{ color: "#451a03", fontSize: "14px", lineHeight: "1.6", margin: "0 0 8px 0" }}>
                    {currentData.insuranceNote}
                  </p>
                  <p style={{ color: "#78350f", fontSize: "13px", lineHeight: "1.5", margin: 0 }}>
                    The customer acknowledges that, where permitted by law, they may be responsible for any insurance excess or costs arising from damage or loss during the test drive.
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
