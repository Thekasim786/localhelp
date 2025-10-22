import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProviderHeader = ({ provider }) => {
  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Provider Image */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden">
            <Image
              src={provider?.image}
              alt={provider?.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Provider Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">
                  {provider?.name}
                </h1>
                {provider?.isVerified && (
                  <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-full">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>
              
              <p className="text-muted-foreground mb-3">{provider?.title}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-warning fill-current" />
                  <span className="font-medium text-foreground">{provider?.rating}</span>
                  <span className="text-muted-foreground">({provider?.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  <span>{provider?.experience} years experience</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Icon name="MapPin" size={16} />
                  <span>{provider?.distance} away</span>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="flex-shrink-0">
              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                provider?.isAvailable 
                  ? 'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  provider?.isAvailable ? 'bg-success' : 'bg-error'
                }`} />
                {provider?.isAvailable ? 'Available Today' : 'Busy'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderHeader;