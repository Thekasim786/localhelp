import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import ProviderCard from './components/ProviderCard';
import EmptyState from './components/EmptyState';
import LoadingState from './components/LoadingState';
import BookingModal from './components/BookingModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mock user data
  const [user] = useState({
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "customer"
  });

  // Filter and sort states
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    distance: '10',
    priceRange: '',
    search: ''
  });

  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');

  // Mock service providers data
  const [providers] = useState([
  {
    id: 1,
    name: "Mike Rodriguez",
    category: "electrician",
    image: "https://images.unsplash.com/photo-1595856898575-9d187bd32fd6",
    imageAlt: "Professional electrician Mike Rodriguez in work uniform with tool belt",
    rating: 4.8,
    reviewCount: 127,
    experience: 8,
    hourlyRate: 75,
    distance: 2.3,
    availability: "available",
    isVerified: true,
    description: "Licensed electrician specializing in residential wiring, panel upgrades, and smart home installations. Available for emergency calls."
  },
  {
    id: 2,
    name: "Jennifer Chen",
    category: "cleaner",
    image: "https://images.unsplash.com/photo-1680631626569-d163da98ff40",
    imageAlt: "Professional house cleaner Jennifer Chen smiling in uniform with cleaning supplies",
    rating: 4.9,
    reviewCount: 203,
    experience: 5,
    hourlyRate: 45,
    distance: 1.8,
    availability: "available",
    isVerified: true,
    description: "Experienced house cleaner offering deep cleaning, regular maintenance, and eco-friendly cleaning solutions for homes and offices."
  },
  {
    id: 3,
    name: "David Thompson",
    category: "plumber",
    image: "https://images.unsplash.com/photo-1732660513320-a6b489f3fece",
    imageAlt: "Licensed plumber David Thompson in work clothes holding plumbing tools",
    rating: 4.7,
    reviewCount: 89,
    experience: 12,
    hourlyRate: 85,
    distance: 3.5,
    availability: "busy",
    isVerified: true,
    description: "Master plumber with expertise in pipe repairs, fixture installations, and emergency plumbing services. Licensed and insured."
  },
  {
    id: 4,
    name: "Maria Santos",
    category: "maid",
    image: "https://images.unsplash.com/photo-1684607633138-6cc13613369b",
    imageAlt: "Professional maid service provider Maria Santos in uniform with cleaning equipment",
    rating: 4.6,
    reviewCount: 156,
    experience: 7,
    hourlyRate: 40,
    distance: 4.2,
    availability: "available",
    isVerified: false,
    description: "Reliable maid service with attention to detail. Specializes in weekly cleaning, move-in/out cleaning, and organizing services."
  },
  {
    id: 5,
    name: "Robert Kim",
    category: "carpenter",
    image: "https://images.unsplash.com/photo-1728722740555-9c523d21bccd",
    imageAlt: "Skilled carpenter Robert Kim in workshop with woodworking tools and materials",
    rating: 4.9,
    reviewCount: 94,
    experience: 15,
    hourlyRate: 95,
    distance: 5.1,
    availability: "available",
    isVerified: true,
    description: "Master carpenter specializing in custom furniture, kitchen cabinets, and home renovations. Quality craftsmanship guaranteed."
  },
  {
    id: 6,
    name: "Lisa Anderson",
    category: "painter",
    image: "https://images.unsplash.com/photo-1607189615999-d475ec94e96b",
    imageAlt: "Professional painter Lisa Anderson in paint-splattered apron holding brushes and color samples",
    rating: 4.5,
    reviewCount: 78,
    experience: 6,
    hourlyRate: 55,
    distance: 6.8,
    availability: "unavailable",
    isVerified: true,
    description: "Interior and exterior painting specialist. Expert in color consultation, wall preparation, and premium paint applications."
  },
  {
    id: 7,
    name: "Carlos Mendez",
    category: "gardener",
    image: "https://images.unsplash.com/photo-1733389033071-90c4f5996d0e",
    imageAlt: "Experienced gardener Carlos Mendez in outdoor work clothes with gardening tools and plants",
    rating: 4.4,
    reviewCount: 112,
    experience: 10,
    hourlyRate: 50,
    distance: 7.5,
    availability: "available",
    isVerified: false,
    description: "Professional landscaper and gardener offering lawn maintenance, plant care, and garden design services for residential properties."
  },
  {
    id: 8,
    name: "Amanda White",
    category: "cleaner",
    image: "https://images.unsplash.com/photo-1657778752180-53adc732cf9e",
    imageAlt: "Professional cleaning service provider Amanda White in uniform with modern cleaning equipment",
    rating: 4.8,
    reviewCount: 167,
    experience: 4,
    hourlyRate: 48,
    distance: 2.9,
    availability: "available",
    isVerified: true,
    description: "Detail-oriented cleaner specializing in residential and commercial spaces. Uses eco-friendly products and modern cleaning techniques."
  }]
  );

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort providers
  const filteredAndSortedProviders = useMemo(() => {
    let filtered = [...providers];

    // Apply filters
    if (filters?.category) {
      filtered = filtered?.filter((provider) => provider?.category === filters?.category);
    }

    if (filters?.rating) {
      const minRating = parseFloat(filters?.rating);
      filtered = filtered?.filter((provider) => provider?.rating >= minRating);
    }

    if (filters?.distance) {
      const maxDistance = parseFloat(filters?.distance);
      filtered = filtered?.filter((provider) => provider?.distance <= maxDistance);
    }

    if (filters?.priceRange) {
      const [min, max] = filters?.priceRange?.includes('+') ?
      [parseFloat(filters?.priceRange?.replace('+', '')), Infinity] :
      filters?.priceRange?.split('-')?.map(Number);

      filtered = filtered?.filter((provider) =>
      provider?.hourlyRate >= min && (max === undefined || provider?.hourlyRate <= max)
      );
    }

    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter((provider) =>
      provider?.name?.toLowerCase()?.includes(searchTerm) ||
      provider?.category?.toLowerCase()?.includes(searchTerm) ||
      provider?.description?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[sortBy];
      let bValue = b?.[sortBy];

      if (sortBy === 'availability') {
        const availabilityOrder = { available: 3, busy: 2, unavailable: 1 };
        aValue = availabilityOrder?.[a?.availability];
        bValue = availabilityOrder?.[b?.availability];
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [providers, filters, sortBy, sortOrder]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      rating: '',
      distance: '10',
      priceRange: '',
      search: ''
    });
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleBookNow = (provider) => {
    setSelectedProvider(provider);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirm = (bookingData) => {
    console.log('Booking confirmed:', bookingData);
    setIsBookingModalOpen(false);
    setSelectedProvider(null);
    setBookingSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setBookingSuccess(false);
    }, 3000);
  };

  const handleLogout = () => {
    navigate('/landing-page');
  };

  const hasActiveFilters = filters?.category || filters?.rating || filters?.priceRange || filters?.search;

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Find Service Providers
            </h1>
            <p className="text-muted-foreground">
              Discover trusted local service providers within 10km of your location
            </p>
          </div>

          {/* Success Message */}
          {bookingSuccess &&
          <div className="mb-6 p-4 bg-success text-success-foreground rounded-lg flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} />
              <span>Booking request sent successfully! The provider will contact you soon.</span>
            </div>
          }

          {/* Filters */}
          <div className="mb-6">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              resultsCount={filteredAndSortedProviders?.length}
              onClearFilters={handleClearFilters} />

          </div>

          {/* Sort Controls */}
          {!isLoading && filteredAndSortedProviders?.length > 0 &&
          <div className="mb-6">
              <SortControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode} />

            </div>
          }

          {/* Content */}
          {isLoading ?
          <LoadingState viewMode={viewMode} /> :
          filteredAndSortedProviders?.length === 0 ?
          <EmptyState
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters} /> :


          <div className={viewMode === 'grid' ?
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }>
              {filteredAndSortedProviders?.map((provider) =>
            <ProviderCard
              key={provider?.id}
              provider={provider}
              viewMode={viewMode}
              onBookNow={handleBookNow} />

            )}
            </div>
          }

          {/* Load More Button (for future pagination) */}
          {!isLoading && filteredAndSortedProviders?.length > 0 &&
          <div className="flex justify-center mt-12">
              <Button
              variant="outline"
              iconName="ChevronDown"
              iconPosition="right"
              iconSize={16}
              disabled>

                Load More Providers
              </Button>
            </div>
          }
        </div>
      </main>
      {/* Booking Modal */}
      <BookingModal
        provider={selectedProvider}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedProvider(null);
        }}
        onConfirm={handleBookingConfirm} />

    </div>);

};

export default CustomerDashboard;