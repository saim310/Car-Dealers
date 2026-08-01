"use client";

import React from "react";
import titleImg from "../../../public/assets/images/shapes/section-title-tagline-shape-1.png";
import { motion } from "framer-motion";
import Image from "next/image";
import TextAnimation from "@/components/elements/TextAnimation";
import Link from "next/link";

// =========================================
// WARRANTY-SPECIFIC SERVICE DATA
// =========================================

interface WarrantyServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const warrantyServicesData: WarrantyServiceItem[] = [
  {
    id: 1,
    icon: "icon-car",
    title: "Authorised Workshops",
    description:
      "All inspections, assessments, and repairs are carried out at our authorised workshop locations in Victoria and Brisbane.",
  },
  {
    id: 2,
    icon: "icon-taxi",
    title: "Authorised Repairs",
    description:
      "All warranty repairs conducted at our Melbourne and Brisbane workshops by certified technicians using genuine parts.",
  },
  {
    id: 3,
    icon: "icon-sport-car-1",
    title: "Extended Options",
    description:
      "Optional extended warranty plans provide access to a wider network of approved repairers for broader coverage.",
  },
  {
    id: 4,
    icon: "icon-car-insurance",
    title: "Consumer Law Rights",
    description:
      "Nothing in our policy excludes or limits your rights under the Australian Consumer Law. Your guarantees cannot be excluded.",
  },
];

// =========================================
// WARRANTY SERVICES COMPONENT
// =========================================

interface WarrantyServicesProps {
  sectionClass?: string;
}

const WarrantyServices: React.FC<WarrantyServicesProps> = ({
  sectionClass = "services-one",
}) => {
  return (
    <section className={sectionClass} id="warranty-services">
      <div className="services-one__shape-1"></div>
      <div className="services-one__shape-2"></div>

      <div className="container">
        {/* Section Title */}
        <div className="section-title text-center sec-title-animation animation-style1">
          <div className="section-title__tagline-box justify-content-center">
            <div className="section-title__tagline-shape">
              <Image src={titleImg} width={70} height={21} alt="shape" />
            </div>
            <span className="section-title__tagline">Warranty Coverage</span>
          </div>

          <h2 className="section-title__title title-animation">
            <TextAnimation text={`Protection Plans`} />
            <TextAnimation text={`& Guarantees`} />
          </h2>
        </div>

        {/* Service Cards */}
        <div className="row">
          {warrantyServicesData.map((service: WarrantyServiceItem, i: number) => (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.3 * (i + 1),
                ease: "easeOut",
              }}
              viewport={{ amount: 0.01, once: true }}
              key={service.id}
              className="col-xl-3 col-lg-6 col-md-6 wow"
            >
              <div className="services-one__single">
                <div className="services-one__single-shape-1"></div>
                <div className="services-one__single-shape-2"></div>
                <div className="services-one__single-shape-3"></div>
                <div className="services-one__count"></div>

                <div className="services-one__icon">
                  <span className={service.icon}></span>
                </div>

                <h3 className="services-one__title">
                  <Link href="/warranty-details">{service.title}</Link>
                </h3>

                <p className="services-one__text">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WarrantyServices;