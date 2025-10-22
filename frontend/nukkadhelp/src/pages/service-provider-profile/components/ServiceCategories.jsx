import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceCategories = ({ services }) => {
  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Services & Pricing</h2>
      <div className="grid gap-4">
        {services?.map((service) => (
          <div key={service?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-micro">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={service?.icon} size={20} className="text-primary" />
                  <h3 className="font-medium text-foreground">{service?.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{service?.description}</p>
                
                {service?.features && service?.features?.length > 0 && (
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {service?.features?.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Icon name="Check" size={14} className="text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold text-foreground">${service?.price}</div>
                <div className="text-sm text-muted-foreground">{service?.unit}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategories;