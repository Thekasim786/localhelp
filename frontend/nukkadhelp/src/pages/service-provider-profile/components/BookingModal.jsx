import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookingModal = ({ isOpen, onClose, provider, onConfirmBooking }) => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const bookingData = {
      providerId: provider?.id,
      providerName: provider?.name,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      description,
      contactInfo,
      totalAmount: provider?.services?.find(s => s?.name === selectedService)?.price || 0
    };
    
    onConfirmBooking(bookingData);
  };

  const handleInputChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Book Service</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-micro"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Provider Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-2">Service Provider</h3>
            <p className="text-sm text-muted-foreground">{provider?.name}</p>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm text-muted-foreground">{provider?.rating} ({provider?.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Service Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Service *
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e?.target?.value)}
              required
              className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Choose a service...</option>
              {provider?.services?.map((service) => (
                <option key={service?.id} value={service?.name}>
                  {service?.name} - ${service?.price} {service?.unit}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Preferred Date *"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e?.target?.value)}
              min={new Date()?.toISOString()?.split('T')?.[0]}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Preferred Time *
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e?.target?.value)}
                required
                className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select time...</option>
                {availableTimes?.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Contact Information</h3>
            
            <Input
              type="text"
              label="Full Name *"
              placeholder="Enter your full name"
              value={contactInfo?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              required
            />
            
            <Input
              type="tel"
              label="Phone Number *"
              placeholder="Enter your phone number"
              value={contactInfo?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              required
            />
            
            <Input
              type="text"
              label="Service Address *"
              placeholder="Enter the address where service is needed"
              value={contactInfo?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Service Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e?.target?.value)}
              placeholder="Describe the work needed, any specific requirements, or additional details..."
              rows={4}
              className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Pricing Summary */}
          {selectedService && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-2">Pricing Summary</h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{selectedService}</span>
                <span className="font-medium text-foreground">
                  ${provider?.services?.find(s => s?.name === selectedService)?.price}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Final pricing may vary based on actual work required
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              fullWidth
              disabled={!selectedService || !selectedDate || !selectedTime || !contactInfo?.name || !contactInfo?.phone || !contactInfo?.address}
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;