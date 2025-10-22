import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerInformation = ({ 
  customerInfo, 
  onCustomerInfoChange, 
  onNext, 
  onBack,
  errors = {}
}) => {
  const handleInputChange = (field, value) => {
    onCustomerInfoChange({
      ...customerInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Contact Information</h3>
        <p className="text-muted-foreground">Please provide your contact details</p>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter first name"
            value={customerInfo?.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter last name"
            value={customerInfo?.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={customerInfo?.email || ''}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={customerInfo?.phone || ''}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        <Input
          label="Service Address"
          type="text"
          placeholder="Enter service location address"
          value={customerInfo?.address || ''}
          onChange={(e) => handleInputChange('address', e?.target?.value)}
          error={errors?.address}
          description="Service must be within 10km radius"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="City"
            value={customerInfo?.city || ''}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />
          <Input
            label="State"
            type="text"
            placeholder="State"
            value={customerInfo?.state || ''}
            onChange={(e) => handleInputChange('state', e?.target?.value)}
            error={errors?.state}
            required
          />
          <Input
            label="ZIP Code"
            type="text"
            placeholder="ZIP"
            value={customerInfo?.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            error={errors?.zipCode}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Special Instructions <span className="text-muted-foreground">(Optional)</span>
          </label>
          <textarea
            placeholder="Any specific requirements or instructions for the service provider..."
            value={customerInfo?.instructions || ''}
            onChange={(e) => handleInputChange('instructions', e?.target?.value)}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-foreground bg-input"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} iconName="ArrowLeft" iconPosition="left">
          Back
        </Button>
        <Button
          variant="default"
          onClick={onNext}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Review Booking
        </Button>
      </div>
    </div>
  );
};

export default CustomerInformation;