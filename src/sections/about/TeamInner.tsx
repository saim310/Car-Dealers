import React from 'react';

export default function GlobalExporterSection() {
  const categories = [
    {
      title: 'Hybrid Cars',
      desc: 'Fuel-efficient & eco-friendly options',
      icon: '🚗',
    },
    {
      title: 'SUVs & 4x4s',
      desc: 'For every adventure',
      icon: '🚙',
    },
    {
      title: 'Executive Sedans',
      desc: 'Comfort, luxury & performance',
      icon: '🚘',
    },
    {
      title: 'Hatchbacks',
      desc: 'Compact, practical & economical',
      icon: '🚗',
    },
    {
      title: 'MPVs & Vans',
      desc: 'Spacious and family-friendly',
      icon: '🚐',
    },
    {
      title: 'Commercial Vehicles',
      desc: 'Built for your business needs',
      icon: '🚚',
    },
  ];

  const destinations = [
    { name: 'Japan (HQ)', code: 'jp' },
    { name: 'United Kingdom', code: 'gb' },
    { name: 'New Zealand', code: 'nz' },
    { name: 'Australia', code: 'au' },
    { name: 'Kenya', code: 'ke' },
    { name: 'Uganda', code: 'ug' },
    { name: 'Jamaica', code: 'jm' },
    { name: 'Tanzania', code: 'tz' },
    { name: 'Pakistan', code: 'pk' },
    { name: 'UAE', code: 'ae' },
  ];

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{ height: '2px', width: '40px', backgroundColor: '#F59E0B' }}></div>
          <span style={{ fontSize: '20px' }}>🌐</span>
          <div style={{ height: '2px', width: '40px', backgroundColor: '#F59E0B' }}></div>
        </div>
        
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0B132B', margin: '0 0 10px 0' }}>
          Global Used Japanese Car Exporter <span style={{ color: '#F59E0B' }}>Since 1999</span>
        </h2>
        
        <p style={{ fontSize: '14px', color: '#6B7280', margin: '0', lineHeight: '1.6' }}>
          Founded in Japan in 1999, UKA Group has grown into a trusted global supplier of high-quality used Japanese cars.<br />
          We export vehicles to customers all over the world, delivering quality, reliability and peace of mind.
        </p>
      </div>

      {/* Main Container */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-start' }}>
        
        {/* Left Side (Categories) */}
        <div style={{ flex: '1 1 550px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '1px' }}>
            OUR STRENGTH
          </span>
          
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0B132B', margin: '5px 0 10px 0' }}>
            Strong Domestic Network in Japan
          </h3>
          
          <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.6', marginBottom: '25px' }}>
            Our foundation is built on a powerful domestic network within Japan. We operate multiple strategically located automotive yards that serve as sourcing and inspection hubs.
          </p>

          {/* 6 Grid Items */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '25px' }}>
            {categories.map((cat, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '50%', 
                  backgroundColor: '#FEF3C7', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '20px',
                  flexShrink: 0 
                }}>
                  {cat.icon}
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{cat.title}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#6B7280' }}>{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div style={{ paddingTop: '15px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ color: '#10B981', fontSize: '16px', fontWeight: 'bold' }}>✓</span>
            <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', lineHeight: '1.5' }}>
              Every vehicle is carefully selected under strict Japanese grading standards, verified auction sheets, and detailed inspection reports to ensure quality, performance, and long-term reliability for Australian roads.
            </p>
          </div>
        </div>

        {/* Right Side Box (Export Destinations) */}
        <div style={{ 
          flex: '1 1 380px', 
          backgroundColor: '#F4F7FB', 
          borderRadius: '16px', 
          padding: '25px', 
          border: '1px solid #E5E7EB',
          boxSizing: 'border-box'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', alignItems: 'flex-start' }}>
            <span style={{ color: '#F59E0B', fontSize: '18px' }}>📍</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#0B132B' }}>Our Export Destinations</h4>
              <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#6B7280' }}>
                We proudly supply vehicles to customers around the world, including:
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 10px', marginTop: '20px' }}>
            {destinations.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={`https://flagcdn.com/w40/${item.code}.png`}
                  alt={`${item.name} flag`}
                  style={{ width: '20px', height: '14px', borderRadius: '2px', objectFit: 'cover', flexShrink: 0 }}
                />
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}