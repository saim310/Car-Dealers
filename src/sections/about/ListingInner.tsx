"use client";
import React from "react";

const AboutInner: React.FC = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        <div 
          className="rounded-4 overflow-hidden p-4 p-md-5"
          style={{ 
            backgroundColor: "#ee9e09", 
            borderRadius: "24px" 
          }}
        >
          <div className="row align-items-center g-4">
            
            {/* Left Content Side */}
            <div className="col-lg-7 text-white">
              <h2 
                className="fw-extrabold mb-3 text-white" 
                style={{ 
                  fontSize: "32px", 
                  letterSpacing: "-0.5px", 
                  fontWeight: "800" 
                }}
              >
                A Trusted Global Brand
              </h2>

              <p 
                className="mb-4 text-white opacity-95" 
                style={{ 
                  fontSize: "15px", 
                  lineHeight: "1.6", 
                  fontWeight: "400" 
                }}
              >
                With over two decades of experience in the automotive export industry, UKA Group has built a reputation based on integrity, expertise, and excellence. Whether you are searching for fuel-efficient hybrid cars, family SUVs, reliable sedans, or commercial vehicles, UKA Japan Motors remains a trusted name in the global used car market. We proudly continue our mission of connecting UK customers with dependable, high-quality Japanese vehicles at competitive prices.
              </p>

              {/* Stats Counters */}
              <div className="d-flex align-items-center gap-5 pt-2">
                <div>
                  <div className="fw-black text-white" style={{ fontSize: "36px", fontWeight: "900", lineHeight: "1" }}>
                    36+
                  </div>
                  <div className="text-white small fw-bold" style={{ fontSize: "12px", opacity: 0.9 }}>
                    Years in Business
                  </div>
                </div>

                <div>
                  <div className="fw-black text-white" style={{ fontSize: "36px", fontWeight: "900", lineHeight: "1" }}>
                    100K+
                  </div>
                  <div className="text-white small fw-bold" style={{ fontSize: "12px", opacity: 0.9 }}>
                    Cars Exported
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: White Logo Box */}
            <div className="col-lg-5 d-flex justify-content-center justify-content-lg-end">
              <div 
                className="bg-white rounded-3 d-flex flex-column align-items-center justify-content-center p-4 text-center w-100"
                style={{ 
                  maxWidth: "380px", 
                  minHeight: "300px",
                  borderRadius: "16px" 
                }}
              >
                {/* 5 Stars Header */}
                <div className="d-flex justify-content-center align-items-center gap-1 mb-2">
                  <span style={{ color: "#d4af37", fontSize: "16px" }}>★</span>
                  <span style={{ color: "#d4af37", fontSize: "20px" }}>★</span>
                  <span style={{ color: "#d4af37", fontSize: "28px", transform: "translateY(-4px)" }}>★</span>
                  <span style={{ color: "#d4af37", fontSize: "20px" }}>★</span>
                  <span style={{ color: "#d4af37", fontSize: "16px" }}>★</span>
                </div>

                {/* UKA Main Brand Name */}
                <h1 
                  className="fw-black text-dark m-0" 
                  style={{ 
                    fontSize: "52px", 
                    letterSpacing: "-1px", 
                    fontWeight: "900", 
                    lineHeight: "0.9" 
                  }}
                >
                  UKA
                </h1>

                {/* Subtitle Line */}
                <div 
                  className="d-flex align-items-center justify-content-between w-100 mt-2 pt-2 border-top border-dark border-2"
                  style={{ maxWidth: "220px" }}
                >
                  <span className="fw-bold text-dark" style={{ fontSize: "10px", letterSpacing: "1px" }}>SINCE</span>
                  <span className="fw-black text-dark" style={{ fontSize: "14px", letterSpacing: "2px" }}>GROUP</span>
                  <span className="fw-bold text-dark" style={{ fontSize: "10px", letterSpacing: "1px" }}>1990</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInner;
