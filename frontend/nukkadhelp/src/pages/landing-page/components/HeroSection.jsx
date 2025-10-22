import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery?.trim()) {
      navigate(`/customer-dashboard?search=${encodeURIComponent(searchQuery?.trim())}`);
    } else {
      navigate('/customer-dashboard');
    }
  };

  const handleGetStarted = () => {
    navigate('/login-signup');
  };

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-16 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 right-1/3 w-36 h-36 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-md transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Trusted Local
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block mt-2">
              Service Providers
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with verified electricians, plumbers, maids, and cleaners in your area. 
            Quality service providers within 10km radius, ready to help with your home needs.
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-100 hover:shadow-2xl transition-all duration-300">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search for services (e.g., electrician, plumber, cleaner)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="border-0 shadow-none focus:ring-0 bg-transparent text-lg"
                  onKeyPress={(e) => e?.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button
                variant="default"
                size="lg"
                onClick={handleSearch}
                iconName="Search"
                iconPosition="left"
                iconSize={20}
                className="sm:px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Enhanced CTA Button */}
          <div className="mb-12">
            <Button
              variant="default"
              size="xl"
              onClick={handleGetStarted}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={20}
              className="px-12 py-5 text-xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:from-pink-600 hover:via-red-600 hover:to-orange-600 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-2xl"
            >
              Get Started Today
            </Button>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-emerald-100">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-white" />
              </div>
              <span className="font-semibold text-gray-700">Verified Providers</span>
            </div>
            
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-indigo-100">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-white" />
              </div>
              <span className="font-semibold text-gray-700">Quick Response</span>
            </div>
            
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-orange-100">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Icon name="Star" size={20} className="text-white" />
              </div>
              <span className="font-semibold text-gray-700">Rated Services</span>
            </div>
            
            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-cyan-100">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                <Icon name="MapPin" size={20} className="text-white" />
              </div>
              <span className="font-semibold text-gray-700">Local Coverage</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;