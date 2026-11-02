import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { PublicLayout } from './layouts/PublicLayout';
import { AuthenticatedLayout } from './layouts/AuthenticatedLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { CropGuidePage } from './pages/public/CropGuidePage';
import { CropDetailPage } from './pages/public/CropDetailPage';
import { AboutPage } from './pages/public/AboutPage';
import { ContactPage } from './pages/public/ContactPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Authenticated Pages
import { DashboardPage } from './pages/authenticated/DashboardPage';
import { ProfilePage } from './pages/authenticated/ProfilePage';
import { FarmsPage } from './pages/authenticated/FarmsPage';
import { DiseaseDetectionPage } from './pages/authenticated/DiseaseDetectionPage';
import { RecommendationsPage } from './pages/authenticated/RecommendationsPage';
import { WeatherPage } from './pages/authenticated/WeatherPage';
import { MarketPricesPage } from './pages/authenticated/MarketPricesPage';
import { PricePredictionPage } from './pages/authenticated/PricePredictionPage';
import { OrganicFarmingPage } from './pages/authenticated/OrganicFarmingPage';
import { PestManagementPage } from './pages/authenticated/PestManagementPage';
import { ReportsPage } from './pages/authenticated/ReportsPage';
import { AlertsPage } from './pages/authenticated/AlertsPage';
import { SettingsPage } from './pages/authenticated/SettingsPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Portal Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/crop-guide" element={<CropGuidePage />} />
            <Route path="/crop-guide/:id" element={<CropDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Authenticated SaaS Routes */}
          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/farms" element={<FarmsPage />} />
            <Route path="/disease-detection" element={<DiseaseDetectionPage />} />
            <Route path="/crop-recommendation" element={<RecommendationsPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/app-crop-guide" element={<CropGuidePage />} />
            <Route path="/market" element={<MarketPricesPage />} />
            <Route path="/price-prediction" element={<PricePredictionPage />} />
            <Route path="/organic-farming" element={<OrganicFarmingPage />} />
            <Route path="/pest-management" element={<PestManagementPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
