import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BookingModal = ({ provider, isOpen, onClose, onConfirm }) => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: '1',
    notes: '',
    contactPhone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' }
  ];

  const durationOptions = [
    { value: '1', label: '1 hour' },
    { value: '2', label: '2 hours' },
    { value: '3', label: '3 hours' },
    { value: '4', label: '4 hours' },
    { value: '6', label: '6 hours' },
    { value: '8', label: 'Full day (8 hours)' }
  ];

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!bookingData?.date) newErrors.date = 'Please select a date';
    if (!bookingData?.time) newErrors.time = 'Please select a time';
    if (!bookingData?.contactPhone) newErrors.contactPhone = 'Phone number is required';
    if (!bookingData?.address) newErrors.address = 'Service address is required';
    
    // Validate date is not in the past
    const selectedDate = new Date(bookingData.date);
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      newErrors.date = 'Please select a future date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      const totalCost = provider?.hourlyRate * parseInt(bookingData?.duration);
      onConfirm({
        ...bookingData,
        provider,
        totalCost,
        bookingId: `BK${Date.now()}`,
        status: 'pending'
      });
    }
  };

  const calculateTotal = () => {
    return provider?.hourlyRate * parseInt(bookingData?.duration);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    return tomorrow?.toISOString()?.split('T')?.[0];
  };

  if (!isOpen || !provider) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative bg-card rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Book Service</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Provider Info */}
          <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <Image
              src={provider?.image}
              alt={provider?.imageAlt}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{provider?.name}</h3>
              <p className="text-sm text-muted-foreground">{provider?.category}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm text-muted-foreground">{provider?.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm font-medium text-foreground">
                  ${provider?.hourlyRate}/hour
                </span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Service Date"
              value={bookingData?.date}
              onChange={(e) => handleInputChange('date', e?.target?.value)}
              min={getTomorrowDate()}
              error={errors?.date}
              required
            />

            <Select
              label="Preferred Time"
              options={timeSlots}
              value={bookingData?.time}
              onChange={(value) => handleInputChange('time', value)}
              placeholder="Select time"
              error={errors?.time}
              required
            />

            <Select
              label="Duration"
              options={durationOptions}
              value={bookingData?.duration}
              onChange={(value) => handleInputChange('duration', value)}
              placeholder="Select duration"
            />

            <Input
              type="tel"
              label="Contact Phone"
              placeholder="Your phone number"
              value={bookingData?.contactPhone}
              onChange={(e) => handleInputChange('contactPhone', e?.target?.value)}
              error={errors?.contactPhone}
              required
            />
          </div>

          <Input
            type="text"
            label="Service Address"
            placeholder="Enter the address where service is needed"
            value={bookingData?.address}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            error={errors?.address}
            required
          />

          <Input
            type="text"
            label="Additional Notes"
            placeholder="Any specific requirements or instructions..."
            value={bookingData?.notes}
            onChange={(e) => handleInputChange('notes', e?.target?.value)}
            description="Optional: Describe the work needed, access instructions, etc."
          />

          {/* Cost Summary */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">Cost Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hourly Rate:</span>
                <span className="text-foreground">${provider?.hourlyRate}/hour</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="text-foreground">{bookingData?.duration} hour(s)</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-foreground">Total Cost:</span>
                  <span className="text-foreground">${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            iconName="Calendar"
            iconPosition="left"
            iconSize={16}
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;