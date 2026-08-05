import Footer from '@/sections/common/Footer';
import Gallery from '@/sections/common/Gallery';
import Header from '@/sections/common/Header';
import StrickyHeader from '@/sections/common/StrickyHeader';
import React from 'react';

export default function InnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='page-wrapper'>
      <Header />
      {children}
      <Gallery />
      <Footer />
      <StrickyHeader />
    </div>
  );
}