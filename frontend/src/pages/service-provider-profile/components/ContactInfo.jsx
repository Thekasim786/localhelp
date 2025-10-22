import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInfo = ({ provider, onBookService }) => {
  const handleCall = () => {
    window.open(`tel:${provider?.phone}`, '_self');
  };

  const handleMessage = () => {
    window.open(`sms:${provider?.phone}`, '_self');
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Contact Information</h2>
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Phone" size={20} className="text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">{provider?.phone}</p>
            <p className="text-sm text-muted-foreground">Available 8 AM - 8 PM</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Icon name="Mail" size={20} className="text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">{provider?.email}</p>
            <p className="text-sm text-muted-foreground">Response within 2 hours</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Icon name="MapPin" size={20} className="text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">Service Area</p>
            <p className="text-sm text-muted-foreground">{provider?.serviceArea}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Icon name="Clock" size={20} className="text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">Working Hours</p>
            <p className="text-sm text-muted-foreground">{provider?.workingHours}</p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          variant="default"
          fullWidth
          onClick={onBookService}
          iconName="Calendar"
          iconPosition="left"
          iconSize={16}
        >
          Book Service
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={handleCall}
          iconName="Phone"
          iconPosition="left"
          iconSize={16}
        >
          Call Now
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={handleMessage}
          iconName="MessageCircle"
          iconPosition="left"
          iconSize={16}
        >
          Message
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;