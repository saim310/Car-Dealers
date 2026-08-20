"use client";
import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            {/* Title */}
            <h2 className="fw-bold text-dark mb-4" style={{ fontSize: "28px" }}>
              About UKA Japan Motors
            </h2>

            {/* Paragraph 1 */}
            <p className="text-secondary mb-4" style={{ fontSize: "15px", lineHeight: "1.7" }}>
              At UKA Japan Motors, we specialize in bringing the most reliable Japanese cars to discerning customers across the United Kingdom. With a passion for quality and a commitment to excellence, we ensure that every import car for sale meets our high standards of performance, reliability, and value.
            </p>

            {/* Paragraph 2 */}
            <p className="text-secondary mb-4" style={{ fontSize: "15px", lineHeight: "1.7" }}>
              With over 36 years' experience in the automotive industry, our Japanese import car dealership was established with a vision to make affordable Japanese vehicles accessible to UK enthusiasts and everyday drivers alike. Over the years, we have built a reputation for trust and integrity, consistently delivering quality vehicles for sale and exceptional customer service.
            </p>

            {/* Gradient Badge */}
            <div 
              className="rounded-4 p-4 text-center text-white shadow-sm mt-4"
              style={{ 
                background: "linear-gradient(90deg, #f36c00 0%, #155bb5 100%)",
                maxWidth: "380px",
                borderRadius: "16px"
              }}
            >
              <div className="fw-bold" style={{ fontSize: "28px", lineHeight: "1.1" }}>
                36+
              </div>
              <div className="small opacity-90 mt-1" style={{ fontSize: "12px", fontWeight: "500" }}>
                Years of Excellence
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
