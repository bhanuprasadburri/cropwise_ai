import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { TopHeader } from '../components/common/TopHeader';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const AuthenticatedLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f8faf8]">
      {/* Navigation Sidebar */}
      <Sidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <TopHeader onMobileMenuToggle={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 space-y-6">
          <Outlet />
          <DisclaimerBanner />
        </main>
      </div>
    </div>
  );
};
