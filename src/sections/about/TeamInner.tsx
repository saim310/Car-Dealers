"use client";
import React from "react";

const GlobalExporterSection: React.FC = () => {
  const categories = [
    { name: "Hybrid Cars" },
    { name: "SUVs & 4x4s" },
    { name: "Executive Sedans" },
    { name: "Hatchbacks" },
    { name: "MPVs & Vans" },
    { name: "Commercial Vehicles" },
  ];

  const countries = [
    { code: "JP", name: "Japan (HQ)" },
    { code: "GB", name: "United Kingdom" },
    { code: "NZ", name: "New Zealand" },
    { code: "AU", name: "Australia" },
    { code: "KE", name: "Kenya" },
    { code: "UG", name: "Uganda" },
    { code: "JM", name: "Jamaica" },
    { code: "TZ", name: "Tanzania" },
    { code: "PK", name: "Pakistan" },
    { code: "AE", name: "UAE" },
  ];

  return (
    <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
      <div className="container py-lg-3">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark mb-2" style={{ fontSize: "28px" }}>
            Global Used Japanese Car Exporter Since 1999
          </h2>
          <p className="text-muted" style={{ fontSize: "15px" }}>
            Founded in Japan in 1999, UKA Group has grown into a trusted global supplier of high-quality used Japanese cars.
          </p>
        </div>

        <div className="row g-4 align-items-center">
          
          {/* Left Column: Domestic Network & Features */}
          <div className="col-lg-7">
            <h3 className="fw-bold text-dark mb-2" style={{ fontSize: "22px" }}>
              Strong Domestic Network in Japan
            </h3>
            <p className="text-muted mb-4" style={{ fontSize: "14px", lineHeight: "1.6" }}>
              Our foundation is built on a powerful domestic network within Japan. We operate multiple strategically located automotive yards that serve as sourcing and inspection hubs.
            </p>

            {/* Checkmark List Grid */}
            <div className="row g-3 mb-4">
              {categories.map((cat, idx) => (
                <div key={idx} className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                      style={{ width: "20px", height: "20px", backgroundColor: "#198754", fontSize: "11px" }}
                    >
                      ✓
                    </div>
                    <span className="fw-medium text-secondary" style={{ fontSize: "14px" }}>
                      {cat.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-muted small m-0" style={{ fontSize: "13px", lineHeight: "1.6" }}>
              Every vehicle is carefully selected under strict Japanese grading standards, verified auction sheets, and detailed inspection reports to ensure quality, performance, and long-term reliability for British roads.
            </p>
          </div>

          {/* Right Column: Country Grid Box */}
          <div className="col-lg-5">
            <div 
              className="p-4 rounded-4"
              style={{ 
                backgroundColor: "#f4f6f8", 
                border: "1px dashed #cfd8dc" 
              }}
            >
              <div className="row g-3">
                {countries.map((country, idx) => (
                  <div key={idx} className="col-6">
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-semibold text-secondary" style={{ fontSize: "12px", minWidth: "22px" }}>
                        {country.code}
                      </span>
                      <span className="fw-normal text-dark" style={{ fontSize: "13px" }}>
                        {country.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GlobalExporterSection;
