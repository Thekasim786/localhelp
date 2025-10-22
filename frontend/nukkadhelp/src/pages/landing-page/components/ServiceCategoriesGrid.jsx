import React from 'react';
import ServiceCategoryCard from './ServiceCategoryCard';
import Icon from '../../../components/AppIcon';

const ServiceCategoriesGrid = () => {
  const serviceCategories = [
    {
      id: 1,
      name: "Electricians",
      slug: "electricians",
      icon: "Zap",
      description: "Professional electrical services for installations, repairs, and maintenance. Licensed and insured electricians available 24/7.",
      providerCount: 45,
      averageRating: 4.8
    },
    {
      id: 2,
      name: "Plumbers",
      slug: "plumbers",
      icon: "Wrench",
      description: "Expert plumbing solutions for leaks, installations, and emergency repairs. Fast response for urgent plumbing issues.",
      providerCount: 38,
      averageRating: 4.7
    },
    {
      id: 3,
      name: "House Maids",
      slug: "maids",
      icon: "Home",
      description: "Reliable house cleaning and maid services. Thorough cleaning, organizing, and maintenance for your home.",
      providerCount: 62,
      averageRating: 4.9
    },
    {
      id: 4,
      name: "Cleaners",
      slug: "cleaners",
      icon: "Sparkles",
      description: "Professional cleaning services for deep cleaning, carpet cleaning, and specialized cleaning needs.",
      providerCount: 29,
      averageRating: 4.6
    },
    {
      id: 5,
      name: "Gardeners",
      slug: "gardeners",
      icon: "TreePine",
      description: "Garden maintenance, landscaping, and plant care services. Keep your outdoor spaces beautiful year-round.",
      providerCount: 21,
      averageRating: 4.5
    },
    {
      id: 6,
      name: "Painters",
      slug: "painters",
      icon: "Paintbrush",
      description: "Interior and exterior painting services. Professional painters with quality materials and attention to detail.",
      providerCount: 33,
      averageRating: 4.7
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-sm uppercase tracking-wide">
              Popular Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Service Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Browse our most requested services and find the perfect provider for your needs. 
            All providers are verified and rated by real customers.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {serviceCategories?.map((category) => (
            <ServiceCategoryCard key={category?.id} category={category} />
          ))}
        </div>

        {/* Enhanced View All Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => window.location.href = '/customer-dashboard'}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="text-lg">View All Services</span>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
              <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoriesGrid;