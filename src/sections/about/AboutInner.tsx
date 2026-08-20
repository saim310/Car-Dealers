"use client";
import React from "react";
import Link from "next/link";

const AboutInner: React.FC = () => {
  const flags = [
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "JM", name: "Jamaica", flag: "🇯🇲" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "KE", name: "Kenya", flag: "🇰🇪" },
    { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
    { code: "PK", name: "Pakistan", flag: "🇵🇰" },
    { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
    { code: "AE", name: "UAE", flag: "🇦🇪" },
    { code: "GB", name: "UK", flag: "🇬🇧" },
    { code: "UG", name: "Uganda", flag: "🇺🇬" },
  ];

  return (
    <section className="py-5 style-hatke" style={{ backgroundColor: "#0b0f19", color: "#ffffff", overflow: "hidden" }}>
      <div className="container py-lg-5 position-relative">
        
        {/* Background Decorative Glows */}
        <div 
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(255,193,7,0.15) 0%, rgba(0,0,0,0) 70%)",
            pointerEvents: "none"
          }}
        />
        <div 
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)",
            pointerEvents: "none"
          }}
        />

        <div className="row align-items-center g-5">
          
          {/* Left Column: Premium Glass Badge & Global Map Card */}
          <div className="col-lg-5">
            <div 
              className="p-4 rounded-4 position-relative"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
              }}
            >
              {/* Brand Header */}
              <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                <div>
                  <div className="text-warning mb-1" style={{ fontSize: "14px", letterSpacing: "2px" }}>
                    ★★★★★
                  </div>
                  <h2 className="fw-black m-0 text-white" style={{ fontSize: "32px", letterSpacing: "-1px" }}>
                    UKA <span className="text-warning" style={{ fontSize: "14px", letterSpacing: "3px" }}>GROUP</span>
                  </h2>
                  <small className="text-secondary text-uppercase fw-bold" style={{ fontSize: "9px", letterSpacing: "1px" }}>
                    Committed to Excellence
                  </small>
                </div>
                
                {/* 30+ Years Badge */}
                <div 
                  className="rounded-3 px-3 py-2 text-center"
                  style={{ backgroundColor: "#ffc107", color: "#0b0f19" }}
                >
                  <div className="fw-black lh-1" style={{ fontSize: "22px" }}>30+</div>
                  <div className="fw-bold text-uppercase" style={{ fontSize: "9px" }}>Years</div>
                </div>
              </div>

              {/* Global Auto Market Flags */}
              <div className="mb-4">
                <p className="text-uppercase fw-bold text-warning mb-2" style={{ fontSize: "11px", letterSpacing: "1px" }}>
                  Our Global Auto Market
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {flags.map((item, i) => (
                    <span 
                      key={i} 
                      title={item.name}
                      className="px-2 py-1 rounded-2 d-inline-flex align-items-center"
                      style={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.06)", 
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        fontSize: "18px" 
                      }}
                    >
                      {item.flag}
                    </span>
                  ))}
                </div>
              </div>

              {/* World Graphic Vector Placeholder */}
              <div 
                className="rounded-3 p-4 text-center d-flex align-items-center justify-content-center"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,193,7,0.05) 100%)", border: "1px dashed rgba(255,255,255,0.15)" }}
              >
                <div>
                  <i className="fas fa-globe-asia fa-3x text-warning mb-2 opacity-75"></i>
                  <p className="text-secondary small m-0 fw-semibold">Serving Asia, Africa, Middle East & Beyond</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: High-Impact Typography & Domain Link */}
          <div className="col-lg-7">
            <div className="ps-lg-3">
              
              <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill text-uppercase mb-3 fw-bold" style={{ letterSpacing: "1px", fontSize: "11px" }}>
                Worldwide Export Leader
              </span>

              <h1 className="fw-black text-uppercase text-white mb-4 display-5" style={{ letterSpacing: "-1px" }}>
                UKA JAPAN <span className="text-warning">MOTORS</span>
              </h1>

              <p className="lead text-light lh-lg mb-4 opacity-90" style={{ fontSize: "18px", fontWeight: "300" }}>
                For more than three decades, <strong className="text-white fw-bold">UKA Japan Motors</strong> has proudly served customers across Asia, Africa, the Caribbean, the Middle East and beyond.
              </p>

              <p className="text-secondary lh-lg mb-4" style={{ fontSize: "15px" }}>
                Our reputation is built on reliability, transparency, professional service and long-term customer satisfaction. Clients worldwide rely on UKA Japan Motors for dependable access to Japan’s best used vehicles.
              </p>

              {/* Bottom Interactive Strip */}
              <div className="pt-3 border-top border-secondary border-opacity-25 d-flex flex-wrap align-items-center justify-content-between gap-3">
                <a 
                  href="https://www.ukajapan.com.au" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-warning fw-bold text-decoration-none d-inline-flex align-items-center gap-2"
                  style={{ fontSize: "22px", letterSpacing: "-0.5px" }}
                >
                  <i className="fas fa-link fs-6"></i>
                  www.ukajapan.com.au
                </a>

                <Link 
                  href="/inner/products" 
                  className="btn btn-warning fw-bold px-4 py-3 rounded-3 d-inline-flex align-items-center gap-2"
                  style={{ color: "#0b0f19" }}
                >
                  Explore Stock <i className="fas fa-arrow-right"></i>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutInner;
