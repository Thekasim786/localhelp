import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BookingConfirmation = ({ 
  bookingReference, 
  selectedService, 
  selectedDate, 
  selectedTime, 
  provider,
  onClose,
  onAddToCalendar
}) => {
  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={48} color="var(--color-success)" />
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-foreground mb-2">Booking Confirmed!</h3>
        <p className="text-muted-foreground">Your appointment has been successfully scheduled</p>
      </div>
      {/* Booking Reference */}
      <div className="bg-success/5 border border-success/20 rounded-lg p-4">
        <div className="text-sm text-muted-foreground mb-1">Booking Reference</div>
        <div className="text-xl font-mono font-semibold text-success">{bookingReference}</div>
      </div>
      {/* Appointment Details */}
      <div className="bg-muted/30 rounded-lg p-6 text-left">
        <h4 className="font-semibold text-foreground mb-4 text-center">Appointment Details</h4>
        
        {/* Provider Info */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={provider?.avatar}
              alt={provider?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="font-medium text-foreground">{provider?.name}</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Phone" size={14} />
              <span>{provider?.phone}</span>
            </div>
          </div>
        </div>

        {/* Service & Time */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon name="Wrench" size={18} color="var(--color-primary)" />
            <div>
              <div className="font-medium text-foreground">{selectedService?.name}</div>
              <div className="text-sm text-muted-foreground">{selectedService?.duration}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Icon name="Calendar" size={18} color="var(--color-primary)" />
            <div>
              <div className="font-medium text-foreground">{formatDate(selectedDate)}</div>
              <div className="text-sm text-muted-foreground">{selectedTime?.time}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Important Notes */}
      <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 text-left">
        <div className="flex items-start gap-3">
          <Icon name="AlertCircle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
          <div className="space-y-2 text-sm">
            <div className="font-medium text-foreground">Important Notes:</div>
            <ul className="text-muted-foreground space-y-1">
              <li>• The service provider will contact you 30 minutes before the appointment</li>
              <li>• Please ensure someone is available at the service location</li>
              <li>• You can reschedule or cancel up to 2 hours before the appointment</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="outline"
          fullWidth
          onClick={onAddToCalendar}
          iconName="Calendar"
          iconPosition="left"
        >
          Add to Calendar
        </Button>
        
        <Button
          variant="default"
          fullWidth
          onClick={onClose}
        >
          Done
        </Button>
      </div>
      {/* Contact Support */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Need help? Contact our support team at{' '}
          <a href="tel:+1-555-0123" className="text-primary hover:underline">
            +1 (555) 012-3456
          </a>
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;