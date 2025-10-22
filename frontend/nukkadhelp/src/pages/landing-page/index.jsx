import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ServiceCategoriesGrid from './components/ServiceCategoriesGrid';
import TrustSignalsSection from './components/TrustSignalsSection';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>NukkadHelp - Find Trusted Local Service Providers</title>
        <meta 
          name="description" 
          content="Connect with verified electricians, plumbers, maids, and cleaners in your area. Quality service providers within 10km radius, ready to help with your home needs." 
        />
        <meta name="keywords" content="local services, electrician, plumber, maid, cleaner, home services, trusted providers" />
        <meta property="og:title" content="NukkadHelp - Find Trusted Local Service Providers" />
        <meta property="og:description" content="Connect with verified local service providers for all your home needs." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/20 to-purple-50/20">
        <Header />
        
        <main className="relative overflow-hidden">
          <HeroSection />
          <ServiceCategoriesGrid />
          <TrustSignalsSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;