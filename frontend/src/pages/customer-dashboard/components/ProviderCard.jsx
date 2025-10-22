import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProviderCard = ({ provider, viewMode = 'grid', onBookNow }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/service-provider-profile', { state: { providerId: provider?.id } });
  };

  const handleBookNow = () => {
    onBookNow(provider);
  };

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={16} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-muted-foreground" />
      );
    }

    return stars;
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success';
      case 'busy':
        return 'text-warning';
      case 'unavailable':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available':
        return 'Available Now';
      case 'busy':
        return 'Busy';
      case 'unavailable':
        return 'Unavailable';
      default:
        return 'Unknown';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-card hover:shadow-modal transition-micro">
        <div className="flex items-start space-x-4">
          {/* Provider Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src={provider?.image}
                alt={provider?.imageAlt}
                className="w-20 h-20 rounded-lg object-cover"
              />
              {provider?.isVerified && (
                <div className="absolute -top-2 -right-2 bg-success text-success-foreground rounded-full p-1">
                  <Icon name="CheckCircle" size={16} />
                </div>
              )}
            </div>
          </div>

          {/* Provider Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {provider?.name}
                </h3>
                <p className="text-sm text-muted-foreground">{provider?.category}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    {renderRating(provider?.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      ({provider?.reviewCount})
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span>{provider?.distance}km away</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{provider?.experience} years exp.</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {provider?.description}
                </p>
              </div>

              <div className="flex flex-col items-end space-y-2 ml-4">
                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">
                    ${provider?.hourlyRate}/hr
                  </div>
                  <div className={`text-sm font-medium ${getAvailabilityColor(provider?.availability)}`}>
                    {getAvailabilityText(provider?.availability)}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewProfile}
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleBookNow}
                    disabled={provider?.availability === 'unavailable'}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (default)
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-micro">
      {/* Provider Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={provider?.image}
          alt={provider?.imageAlt}
          className="w-full h-full object-cover"
        />
        {provider?.isVerified && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground rounded-full p-1">
            <Icon name="CheckCircle" size={16} />
          </div>
        )}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
          provider?.availability === 'available' ?'bg-success text-success-foreground' 
            : provider?.availability === 'busy' ?'bg-warning text-warning-foreground' :'bg-destructive text-destructive-foreground'
        }`}>
          {getAvailabilityText(provider?.availability)}
        </div>
      </div>
      {/* Provider Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {provider?.name}
            </h3>
            <p className="text-sm text-muted-foreground">{provider?.category}</p>
          </div>
          <div className="text-right ml-2">
            <div className="text-lg font-semibold text-foreground">
              ${provider?.hourlyRate}/hr
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-2">
          {renderRating(provider?.rating)}
          <span className="text-sm text-muted-foreground ml-1">
            ({provider?.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={14} />
            <span>{provider?.distance}km away</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{provider?.experience} years</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {provider?.description}
        </p>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={handleViewProfile}
          >
            View Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={handleBookNow}
            disabled={provider?.availability === 'unavailable'}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;