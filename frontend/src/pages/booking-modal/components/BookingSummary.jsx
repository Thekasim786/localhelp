import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BookingSummary = ({ 
  selectedService, 
  selectedDate, 
  selectedTime, 
  customerInfo, 
  provider,
  onConfirm, 
  onBack,
  isLoading = false
}) => {
  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotal = () => {
    const servicePrice = parseFloat(selectedService?.price);
    const tax = servicePrice * 0.08; // 8% tax
    const total = servicePrice + tax;
    return { servicePrice, tax, total };
  };

  const { servicePrice, tax, total } = calculateTotal();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Booking Summary</h3>
        <p className="text-muted-foreground">Please review your booking details</p>
      </div>
      {/* Service Provider Info */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={provider?.avatar}
              alt={provider?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{provider?.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} color="var(--color-warning)" />
                <span className="text-sm font-medium text-foreground">{provider?.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{provider?.experience} years exp</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="Phone" size={14} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground">{provider?.phone}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Service Details */}
      <div className="space-y-4">
        <div className="border border-border rounded-lg p-4">
          <h5 className="font-medium text-foreground mb-3">Service Details</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium text-foreground">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="text-foreground">{selectedService?.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="text-foreground">{formatDate(selectedDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="text-foreground">{selectedTime?.time}</span>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="border border-border rounded-lg p-4">
          <h5 className="font-medium text-foreground mb-3">Contact Information</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="text-foreground">{customerInfo?.firstName} {customerInfo?.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="text-foreground">{customerInfo?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="text-foreground">{customerInfo?.phone}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground">Address:</span>
              <span className="text-foreground text-sm">
                {customerInfo?.address}, {customerInfo?.city}, {customerInfo?.state} {customerInfo?.zipCode}
              </span>
            </div>
            {customerInfo?.instructions && (
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground">Instructions:</span>
                <span className="text-foreground text-sm">{customerInfo?.instructions}</span>
              </div>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="border border-border rounded-lg p-4">
          <h5 className="font-medium text-foreground mb-3">Pricing</h5>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Fee:</span>
              <span className="text-foreground">${servicePrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (8%):</span>
              <span className="text-foreground">${tax?.toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="font-semibold text-primary text-lg">${total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} iconName="ArrowLeft" iconPosition="left">
          Back
        </Button>
        <Button
          variant="default"
          onClick={onConfirm}
          loading={isLoading}
          iconName="Check"
          iconPosition="right"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;