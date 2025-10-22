import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import LandingPage from './pages/landing-page';
import LoginSignup from './pages/login-signup';
import ServiceProviderProfile from './pages/service-provider-profile';
import BookingModal from './pages/booking-modal';
import CustomerDashboard from './pages/customer-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/login-signup" element={<LoginSignup />} />
        <Route path="/service-provider-profile" element={<ServiceProviderProfile />} />
        <Route path="/booking-modal" element={<BookingModal />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
