import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import LandingPage from './pages/landing-page/index.jsx';
import LoginSignup from './pages/login-signup/index.jsx';
import ServiceProviderProfile from './pages/service-provider-profile/index.jsx';
import BookingModal from './pages/booking-modal/index.jsx';
import CustomerDashboard from './pages/customer-dashboard/index.jsx';

const Routes = () => {
  return (
    
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/service-provider-profile" element={
          <ProtectedRoute>
            <ServiceProviderProfile />
          </ProtectedRoute>
        } />
        <Route path="/booking-modal" element={
          <ProtectedRoute>
            <BookingModal />
          </ProtectedRoute>
        } />
        <Route path="/customer-dashboard" element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    
  );
};

export default Routes;
