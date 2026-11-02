import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf8]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        <DisclaimerBanner />
      </div>
      <Footer />
    </div>
  );
};
