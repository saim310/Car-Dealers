"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// =========================================
// ICONS
// =========================================

const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const IconCar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const IconDollar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconCalendar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const IconMapPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconFuel = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" x2="15" y1="22" y2="22" />
    <line x1="4" x2="14" y1="9" y2="9" />
    <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
    <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
  </svg>
);

const IconSettings = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const IconSliders = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="4" y1="21" y2="14" />
    <line x1="4" x2="4" y1="10" y2="3" />
    <line x1="12" x2="12" y1="21" y2="12" />
    <line x1="12" x2="12" y1="8" y2="3" />
    <line x1="20" x2="20" y1="21" y2="16" />
    <line x1="20" x2="20" y1="12" y2="3" />
    <line x1="1" x2="7" y1="14" y2="14" />
    <line x1="9" x2="15" y1="8" y2="8" />
    <line x1="17" x2="23" y1="16" y2="16" />
  </svg>
);

// =========================================
// SELECT COMPONENT
// =========================================

const SearchSelect = ({
  value,
  options,
  icon,
  onChange,
}: {
  value: string;
  options: string[];
  icon: React.ReactNode;
  onChange: (val: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "12px 16px",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "50px",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 500,
          color: "#333",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#F5B818"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ddd"; }}
      >
        <span style={{ color: "#999", display: "flex" }}>{icon}</span>
        <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {value}
        </span>
        <span style={{ color: "#999", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
          <IconChevronDown />
        </span>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #eee",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            zIndex: 100,
            maxHeight: "240px",
            overflowY: "auto",
            padding: "6px",
          }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                fontSize: "13px",
                color: opt === value ? "#1a1a2e" : "#555",
                background: opt === value ? "#F5B818" : "transparent",
                fontWeight: opt === value ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (opt !== value) e.currentTarget.style.background = "#f5f0e6";
              }}
              onMouseLeave={(e) => {
                if (opt !== value) e.currentTarget.style.background = "transparent";
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// =========================================
// MAIN COMPONENT
// =========================================

interface SearchSectionProps {
  onSearch?: (filters: any) => void;
  resultCount?: number;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, resultCount = 19 }) => {
  const router = useRouter();
  const [bodyStyle, setBodyStyle] = useState("All Body Styles");
  const [make, setMake] = useState("All Makes");
  const [model, setModel] = useState("All Models");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minYear, setMinYear] = useState("Any Year");
  const [maxYear, setMaxYear] = useState("Any Year");
  const [location, setLocation] = useState("All locations");
  const [fuelType, setFuelType] = useState("All Fuel Types");
  const [transmission, setTransmission] = useState("All Transmissions");
  const [showMore, setShowMore] = useState(false);

  const bodyStyles = ["All Body Styles", "Sedan", "SUV", "Hatchback", "Wagon", "Ute", "Coupe", "Convertible", "Van"];
  const makes = ["All Makes", "Toyota", "Honda", "Nissan", "Mazda", "Subaru", "Mitsubishi", "Lexus", "Suzuki", "Daihatsu"];
  const models = ["All Models", "Corolla", "Camry", "RAV4", "Prado", "HiLux", "Civic", "CR-V", "X-Trail", "Outback"];
  const years = ["Any Year", "2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"];
  const locations = ["All locations", "Melbourne, VIC", "Brisbane, QLD", "Sydney, NSW", "Perth, WA"];
  const fuelTypes = ["All Fuel Types", "Petrol", "Diesel", "Hybrid", "Electric"];
  const transmissions = ["All Transmissions", "Automatic", "Manual", "CVT"];

const handleSearch = () => {
    const filters = {
      bodyStyle: bodyStyle !== "All Body Styles" ? bodyStyle : "",
      make: make !== "All Makes" ? make : "",
      model: model !== "All Models" ? model : "",
      minPrice,
      maxPrice,
      minYear: minYear !== "Any Year" ? minYear : "",
      maxYear: maxYear !== "Any Year" ? maxYear : "",
      location: location !== "All locations" ? location : "",
      fuelType: fuelType !== "All Fuel Types" ? fuelType : "",
      transmission: transmission !== "All Transmissions" ? transmission : "",
    };

    if (onSearch) {
      onSearch(filters);
      // Smooth scroll to listing cars section
      const carsSection = document.getElementById('cars');
      if (carsSection) {
        carsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const rowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "14px",
    marginBottom: "14px",
  };

  const row2Style: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1.2fr",
    gap: "14px",
    marginBottom: "14px",
    alignItems: "end",
  };

  const priceInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px 12px 32px",
    border: "1px solid #ddd",
    borderRadius: "50px",
    fontSize: "13px",
    fontWeight: 500,
    color: "#333",
    outline: "none",
    background: "#fff",
    transition: "border-color 0.2s",
  };

  return (
    <section style={{ background: "#f0f0f0", padding: "48px 0" }}>
      <div className="container">
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#1a1a2e",
              textAlign: "center",
              marginBottom: "28px",
              marginTop: 0,
            }}
          >
            Find <span style={{ color: "#F5B818" }}>{resultCount}</span> Used Cars for Sale
          </h2>

          {/* Row 1 */}
          <div style={rowStyle}>
            <SearchSelect value={bodyStyle} options={bodyStyles} icon={<IconCar />} onChange={setBodyStyle} />
            <SearchSelect value={make} options={makes} icon={<IconCar />} onChange={setMake} />
            <SearchSelect value={model} options={models} icon={<IconCar />} onChange={setModel} />
          </div>

          {/* Row 2 */}
          <div style={row2Style}>
            {/* Price Range */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative", flex: 1 }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#999" }}>
                  <IconDollar />
                </span>
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={priceInputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#F5B818"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#ddd"}
                />
              </div>
              <span style={{ color: "#999", fontSize: "14px" }}>-</span>
              <div style={{ position: "relative", flex: 1 }}>
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#999" }}>
                  <IconDollar />
                </span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={priceInputStyle}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#F5B818"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#ddd"}
                />
              </div>
            </div>

            {/* Year Range */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <SearchSelect value={minYear} options={years} icon={<IconCalendar />} onChange={setMinYear} />
              </div>
              <span style={{ color: "#999", fontSize: "14px", paddingBottom: "2px" }}>-</span>
              <div style={{ flex: 1 }}>
                <SearchSelect value={maxYear} options={years} icon={<IconCalendar />} onChange={setMaxYear} />
              </div>
            </div>

            {/* Location */}
            <SearchSelect value={location} options={locations} icon={<IconMapPin />} onChange={setLocation} />
          </div>

          {/* Expandable Row */}
          <div
            style={{
              maxHeight: showMore ? "80px" : "0",
              overflow: "hidden",
              opacity: showMore ? 1 : 0,
              transition: "all 0.3s ease",
              marginBottom: showMore ? "14px" : "0",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <SearchSelect value={fuelType} options={fuelTypes} icon={<IconFuel />} onChange={setFuelType} />
              <SearchSelect value={transmission} options={transmissions} icon={<IconSettings />} onChange={setTransmission} />
            </div>
          </div>

          {/* More Options */}
          <div style={{ textAlign: "center", margin: "12px 0" }}>
            <button
              onClick={() => setShowMore(!showMore)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                background: "transparent",
                border: "none",
                color: "#F5B818",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <IconSliders />
              {showMore ? "Less Options" : "More Options"}
              <span style={{ transition: "transform 0.2s", transform: showMore ? "rotate(180deg)" : "rotate(0)" }}>
                <IconChevronDown />
              </span>
            </button>
          </div>

          {/* Search Button */}
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <button
              onClick={handleSearch}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "14px 56px",
                background: "#2DA44E",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 700,
                border: "none",
                borderRadius: "50px",
                cursor: "pointer",
                transition: "all 0.25s",
                minWidth: "220px",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1a2e";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2DA44E";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <IconSearch />
              Search ({resultCount})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
