import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onClearFilters, hasActiveFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Search" size={48} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No Service Providers Found
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {hasActiveFilters 
          ? "We couldn't find any service providers matching your current filters. Try adjusting your search criteria or clearing filters to see more results." :"No service providers are currently available in your area. Please check back later or try expanding your search radius."
        }
      </p>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
          iconSize={16}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

export default EmptyState;