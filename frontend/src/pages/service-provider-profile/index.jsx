import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProviderHeader from './components/ProviderHeader';
import ServiceCategories from './components/ServiceCategories';
import CustomerReviews from './components/CustomerReviews';
import ContactInfo from './components/ContactInfo';
import PortfolioGallery from './components/PortfolioGallery';
import CertificationsInsurance from './components/CertificationsInsurance';
import BookingModal from './components/BookingModal';
import { useAuth } from '../../contexts/AuthContext';

const ServiceProviderProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Mock provider data
  const providerData = {
    id: 1,
    name: "Michael Rodriguez",
    title: "Licensed Electrician & Home Repair Specialist",
    image: "https://images.unsplash.com/photo-1596717951382-a3cbbdd4b8fd",
    imageAlt: "Professional headshot of Hispanic man with short black hair wearing navy blue work shirt",
    rating: 4.8,
    reviewCount: 127,
    experience: 8,
    distance: "2.3 km",
    isVerified: true,
    isAvailable: true,
    phone: "+1 (555) 123-4567",
    email: "michael.rodriguez@email.com",
    serviceArea: "Downtown, Midtown, Westside (10km radius)",
    workingHours: "Monday - Saturday, 8:00 AM - 6:00 PM",
    services: [
    {
      id: 1,
      name: "Electrical Repair",
      icon: "Zap",
      description: "Complete electrical troubleshooting and repair services for residential properties",
      price: 85,
      unit: "per hour",
      features: [
      "Circuit breaker repairs",
      "Outlet installation",
      "Light fixture installation",
      "Electrical safety inspection"]

    },
    {
      id: 2,
      name: "Wiring Installation",
      icon: "Cable",
      description: "Professional electrical wiring for new installations and upgrades",
      price: 120,
      unit: "per hour",
      features: [
      "New circuit installation",
      "Panel upgrades",
      "Smart home wiring",
      "Code compliance guarantee"]

    },
    {
      id: 3,
      name: "Emergency Service",
      icon: "AlertTriangle",
      description: "24/7 emergency electrical services for urgent repairs",
      price: 150,
      unit: "per call",
      features: [
      "Same-day service",
      "Power restoration",
      "Safety hazard resolution",
      "Emergency diagnostics"]

    },
    {
      id: 4,
      name: "Home Maintenance",
      icon: "Home",
      description: "General home repair and maintenance services",
      price: 65,
      unit: "per hour",
      features: [
      "Plumbing repairs",
      "Drywall patching",
      "Door and window fixes",
      "General handyman work"]

    }],

    portfolio: [
    {
      src: "https://images.unsplash.com/photo-1721396186184-bcc522ab27a8",
      alt: "Modern kitchen with newly installed under-cabinet LED lighting and electrical outlets",
      caption: "Kitchen electrical upgrade with LED lighting"
    },
    {
      src: "https://images.unsplash.com/photo-1620937963496-8aaf018ded6f",
      alt: "Electrical panel box with organized circuit breakers and proper labeling",
      caption: "Electrical panel upgrade and organization"
    },
    {
      src: "https://images.unsplash.com/photo-1646304027440-139f4c70f6c2",
      alt: "Living room with ceiling fan installation and recessed lighting",
      caption: "Living room lighting and ceiling fan installation"
    },
    {
      src: "https://images.unsplash.com/photo-1640611585570-7919520bdbe9",
      alt: "Bathroom with GFCI outlets and proper electrical safety features",
      caption: "Bathroom electrical safety upgrade"
    },
    {
      src: "https://images.unsplash.com/photo-1708610295194-85e3e9387002",
      alt: "Home office with multiple electrical outlets and USB charging stations",
      caption: "Home office electrical setup"
    },
    {
      src: "https://images.unsplash.com/photo-1621286587309-c80063944200",
      alt: "Outdoor patio with weather-resistant electrical outlets and lighting",
      caption: "Outdoor electrical installation"
    }],

    certifications: [
    {
      name: "Licensed Electrician",
      issuer: "State Electrical Board",
      issueDate: "2018-03-15"
    },
    {
      name: "OSHA Safety Certification",
      issuer: "Occupational Safety and Health Administration",
      issueDate: "2023-01-20"
    },
    {
      name: "Smart Home Technology Specialist",
      issuer: "Home Automation Institute",
      issueDate: "2022-08-10"
    }],

    insurance: [
    {
      type: "General Liability Insurance",
      coverage: "$2,000,000",
      expiryDate: "2024-12-31"
    },
    {
      type: "Professional Indemnity",
      coverage: "$1,000,000",
      expiryDate: "2024-12-31"
    }]

  };

  const reviewsData = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1587403655231-b1734312903f",
    avatarAlt: "Professional headshot of blonde woman in white blouse smiling at camera",
    rating: 5,
    date: "2024-10-15",
    serviceType: "Electrical Repair",
    comment: `Michael was absolutely fantastic! He arrived on time, quickly diagnosed the electrical issue in our kitchen, and fixed it efficiently. Very professional and explained everything clearly. The pricing was fair and transparent. Highly recommend!`,
    images: [
    {
      src: "https://images.unsplash.com/photo-1728071547957-b04e4c1cb80c",
      alt: "Before and after photos of kitchen electrical repair work"
    }]

  },
  {
    id: 2,
    customerName: "David Chen",
    avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
    avatarAlt: "Professional headshot of Asian man with glasses wearing dark suit",
    rating: 5,
    date: "2024-10-10",
    serviceType: "Wiring Installation",
    comment: `Excellent work on our home office wiring project. Michael installed multiple outlets and USB charging stations exactly where we needed them. Clean work, no mess left behind, and everything works perfectly. Will definitely call him again for future electrical needs.`
  },
  {
    id: 3,
    customerName: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1563220599-bc8cb877de5d",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair in business attire",
    rating: 4,
    date: "2024-10-05",
    serviceType: "Emergency Service",
    comment: `Had a power outage emergency on Sunday evening. Michael responded quickly and restored power within 2 hours. Very grateful for his prompt service, though the emergency rate was a bit high. Overall satisfied with the quality of work.`
  },
  {
    id: 4,
    customerName: "Robert Thompson",
    avatar: "https://images.unsplash.com/photo-1735181094336-7fa757df9622",
    avatarAlt: "Professional headshot of middle-aged Caucasian man with beard in casual shirt",
    rating: 5,
    date: "2024-09-28",
    serviceType: "Home Maintenance",
    comment: `Michael helped with several small repairs around the house - fixed a leaky faucet, patched some drywall, and adjusted a sticky door. He's very skilled and efficient. Great to have someone reliable for various home maintenance tasks.`
  },
  {
    id: 5,
    customerName: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1684303243725-8e23818a281c",
    avatarAlt: "Professional headshot of Asian woman with short black hair wearing glasses",
    rating: 5,
    date: "2024-09-20",
    serviceType: "Electrical Repair",
    comment: `Outstanding service! Michael upgraded our electrical panel and installed GFCI outlets in the bathrooms. He explained all the safety benefits and made sure everything was up to code. Professional, knowledgeable, and trustworthy.`
  }];


  const ratingBreakdown = [
  { stars: 5, count: 98, percentage: 77 },
  { stars: 4, count: 23, percentage: 18 },
  { stars: 3, count: 4, percentage: 3 },
  { stars: 2, count: 2, percentage: 2 },
  { stars: 1, count: 0, percentage: 0 }];


  const handleBookService = () => {
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = (bookingData) => {
    // Mock booking confirmation
    console.log('Booking confirmed:', bookingData);
    setIsBookingModalOpen(false);

    // Show success message and redirect
    alert(`Booking confirmed! You will receive a confirmation email shortly.\n\nService: ${bookingData?.service}\nDate: ${bookingData?.date}\nTime: ${bookingData?.time}`);
    navigate('/customer-dashboard');
  };

  const handleBackToDashboard = () => {
    navigate('/customer-dashboard');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBackToDashboard}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}>

              Back to Providers
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <ProviderHeader provider={providerData} />
              <ServiceCategories services={providerData?.services} />
              <CustomerReviews
                reviews={reviewsData}
                overallRating={providerData?.rating}
                ratingBreakdown={ratingBreakdown} />

              <PortfolioGallery portfolio={providerData?.portfolio} />
              <CertificationsInsurance
                certifications={providerData?.certifications}
                insurance={providerData?.insurance} />

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <ContactInfo
                  provider={providerData}
                  onBookService={handleBookService} />

                
                {/* Quick Stats */}
                <div className="bg-card rounded-lg shadow-card p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Response Time</span>
                      <span className="text-sm font-medium text-foreground">&lt; 2 hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Completion Rate</span>
                      <span className="text-sm font-medium text-foreground">98%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Repeat Customers</span>
                      <span className="text-sm font-medium text-foreground">85%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">On-Time Rate</span>
                      <span className="text-sm font-medium text-foreground">96%</span>
                    </div>
                  </div>
                </div>

                {/* Service Area Map */}
                <div className="bg-card rounded-lg shadow-card p-6">
                  <h3 className="font-semibold text-foreground mb-4">Service Area</h3>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      width="100%"
                      height="100%"
                      loading="lazy"
                      title="Service Area Map"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
                      className="border-0" />

                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Serving within 10km radius of downtown area
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        provider={providerData}
        onConfirmBooking={handleConfirmBooking} />

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Home" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">NukkadHelp</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Connecting you with trusted local service providers for all your home needs.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Electrical Services</li>
                <li>Plumbing</li>
                <li>Cleaning</li>
                <li>Home Maintenance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Safety Guidelines</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} NukkadHelp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>);

};

export default ServiceProviderProfile;