import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ServiceSelection from './components/ServiceSelection';
import DateTimeSelection from './components/DateTimeSelection';
import CustomerInformation from './components/CustomerInformation';
import BookingSummary from './components/BookingSummary';
import BookingConfirmation from './components/BookingConfirmation';

const BookingModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Booking state
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    instructions: ''
  });
  const [bookingReference, setBookingReference] = useState('');
  const [errors, setErrors] = useState({});

  // Mock data - would come from props or API in real app
  const provider = {
    id: 1,
    name: "Mike Johnson",
    avatar: "https://images.unsplash.com/photo-1734434570358-21badf4ba1c6",
    avatarAlt: "Professional headshot of middle-aged man with brown hair and friendly smile wearing blue shirt",
    rating: 4.8,
    experience: 8,
    phone: "+1 (555) 123-4567"
  };

  const services = [
  {
    id: 1,
    name: "Basic Electrical Repair",
    description: "Fix outlets, switches, and basic wiring issues",
    price: "75.00",
    duration: "1-2 hours"
  },
  {
    id: 2,
    name: "Ceiling Fan Installation",
    description: "Install new ceiling fan with existing wiring",
    price: "120.00",
    duration: "2-3 hours"
  },
  {
    id: 3,
    name: "Light Fixture Installation",
    description: "Install new light fixtures and switches",
    price: "95.00",
    duration: "1-2 hours"
  },
  {
    id: 4,
    name: "Electrical Panel Inspection",
    description: "Complete electrical panel safety inspection",
    price: "150.00",
    duration: "2-3 hours"
  }];


  const steps = [
  { number: 1, title: "Service", completed: currentStep > 1 },
  { number: 2, title: "Date & Time", completed: currentStep > 2 },
  { number: 3, title: "Information", completed: currentStep > 3 },
  { number: 4, title: "Summary", completed: currentStep > 4 },
  { number: 5, title: "Confirmation", completed: false }];


  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleCustomerInfoChange = (info) => {
    setCustomerInfo(info);
    // Clear errors for changed fields
    const newErrors = { ...errors };
    Object.keys(info)?.forEach((key) => {
      if (info?.[key] && newErrors?.[key]) {
        delete newErrors?.[key];
      }
    });
    setErrors(newErrors);
  };

  const validateCustomerInfo = () => {
    const newErrors = {};

    if (!customerInfo?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!customerInfo?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!customerInfo?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(customerInfo?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!customerInfo?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(customerInfo?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!customerInfo?.address?.trim()) newErrors.address = 'Service address is required';
    if (!customerInfo?.city?.trim()) newErrors.city = 'City is required';
    if (!customerInfo?.state?.trim()) newErrors.state = 'State is required';
    if (!customerInfo?.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/?.test(customerInfo?.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (currentStep === 3 && !validateCustomerInfo()) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate booking reference
    const reference = `BK${Date.now()?.toString()?.slice(-6)}`;
    setBookingReference(reference);

    setIsLoading(false);
    setCurrentStep(5);
  };

  const handleAddToCalendar = () => {
    // Create calendar event URL (Google Calendar format)
    const startDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime?.id?.split(':');
    startDate?.setHours(parseInt(hours), parseInt(minutes));

    const endDate = new Date(startDate);
    endDate?.setHours(startDate?.getHours() + 2); // Assume 2-hour duration

    const formatDate = (date) => {
      return date?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0] + 'Z';
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(selectedService?.name)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(`Service: ${selectedService?.name}\nProvider: ${provider?.name}\nPhone: ${provider?.phone}\nReference: ${bookingReference}`)}&location=${encodeURIComponent(customerInfo?.address)}`;

    window.open(calendarUrl, '_blank');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            services={services}
            selectedService={selectedService}
            onServiceSelect={handleServiceSelect}
            onNext={handleNext} />);


      case 2:
        return (
          <DateTimeSelection
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={handleDateSelect}
            onTimeSelect={handleTimeSelect}
            onNext={handleNext}
            onBack={handleBack} />);


      case 3:
        return (
          <CustomerInformation
            customerInfo={customerInfo}
            onCustomerInfoChange={handleCustomerInfoChange}
            onNext={handleNext}
            onBack={handleBack}
            errors={errors} />);


      case 4:
        return (
          <BookingSummary
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            customerInfo={customerInfo}
            provider={provider}
            onConfirm={handleConfirmBooking}
            onBack={handleBack}
            isLoading={isLoading} />);


      case 5:
        return (
          <BookingConfirmation
            bookingReference={bookingReference}
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            provider={provider}
            onClose={handleClose}
            onAddToCalendar={handleAddToCalendar} />);


      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-200 bg-background">
      {/* Mobile-first full screen overlay */}
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 bg-card border-b border-border">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                iconName="X"
                iconPosition="left"
                className="lg:hidden">

                Close
              </Button>
              <div className="hidden lg:block">
                <h2 className="text-lg font-semibold text-foreground">Book Appointment</h2>
                <p className="text-sm text-muted-foreground">with {provider?.name}</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              iconName="X"
              className="hidden lg:flex" />

          </div>

          {/* Progress Steps - Desktop */}
          {currentStep < 5 &&
          <div className="hidden lg:block px-6 pb-4">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {steps?.slice(0, 4)?.map((step, index) =>
              <React.Fragment key={step?.number}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step?.completed ?
                  'bg-success text-success-foreground' :
                  currentStep === step?.number ?
                  'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'}`
                  }>
                        {step?.completed ?
                    <Icon name="Check" size={16} /> :

                    step?.number
                    }
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                  currentStep === step?.number ? 'text-foreground' : 'text-muted-foreground'}`
                  }>
                        {step?.title}
                      </span>
                    </div>
                    {index < 3 &&
                <div className={`flex-1 h-0.5 mx-4 ${
                step?.completed ? 'bg-success' : 'bg-border'}`
                } />
                }
                  </React.Fragment>
              )}
              </div>
            </div>
          }

          {/* Progress Steps - Mobile */}
          {currentStep < 5 &&
          <div className="lg:hidden px-4 pb-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  Step {currentStep} of 4
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4]?.map((step) =>
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${
                  step <= currentStep ? 'bg-primary' : 'bg-border'}`
                  } />

                )}
                </div>
              </div>
            </div>
          }
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-4 lg:p-6">
            {renderStepContent()}
          </div>
        </div>
      </div>
      {/* Desktop Modal Overlay */}
      <div className="hidden lg:block fixed inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      {/* Desktop Modal Content */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none">
        <div className="flex items-center justify-center min-h-full p-4">
          <div className="bg-card rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto">
            {/* Desktop Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Book Appointment</h2>
                <p className="text-muted-foreground">with {provider?.name}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                iconName="X" />

            </div>

            {/* Desktop Progress */}
            {currentStep < 5 &&
            <div className="px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between">
                  {steps?.slice(0, 4)?.map((step, index) =>
                <React.Fragment key={step?.number}>
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step?.completed ?
                    'bg-success text-success-foreground' :
                    currentStep === step?.number ?
                    'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'}`
                    }>
                          {step?.completed ?
                      <Icon name="Check" size={16} /> :

                      step?.number
                      }
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                    currentStep === step?.number ? 'text-foreground' : 'text-muted-foreground'}`
                    }>
                          {step?.title}
                        </span>
                      </div>
                      {index < 3 &&
                  <div className={`flex-1 h-0.5 mx-4 ${
                  step?.completed ? 'bg-success' : 'bg-border'}`
                  } />
                  }
                    </React.Fragment>
                )}
                </div>
              </div>
            }

            {/* Desktop Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default BookingModal;