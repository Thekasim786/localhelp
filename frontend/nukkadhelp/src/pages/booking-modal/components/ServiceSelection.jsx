import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ServiceSelection = ({ services, selectedService, onServiceSelect, onNext }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Select Service</h3>
        <p className="text-muted-foreground">Choose the service you need</p>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {services?.map((service) => (
          <div
            key={service?.id}
            onClick={() => onServiceSelect(service)}
            className={`p-4 border rounded-lg cursor-pointer transition-micro hover:shadow-card ${
              selectedService?.id === service?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{service?.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{service?.description}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm font-medium text-primary">${service?.price}</span>
                  <span className="text-sm text-muted-foreground">{service?.duration}</span>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedService?.id === service?.id
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {selectedService?.id === service?.id && (
                  <Icon name="Check" size={12} color="white" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={onNext}
          disabled={!selectedService}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelection;