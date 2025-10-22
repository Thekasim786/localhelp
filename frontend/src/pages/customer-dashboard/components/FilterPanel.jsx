import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ filters, onFiltersChange, resultsCount, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const serviceCategories = [
    { value: '', label: 'All Categories' },
    { value: 'electrician', label: 'Electrician' },
    { value: 'plumber', label: 'Plumber' },
    { value: 'cleaner', label: 'House Cleaner' },
    { value: 'maid', label: 'Maid Service' },
    { value: 'carpenter', label: 'Carpenter' },
    { value: 'painter', label: 'Painter' },
    { value: 'gardener', label: 'Gardener' }
  ];

  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '4', label: '4+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '2', label: '2+ Stars' }
  ];

  const distanceOptions = [
    { value: '10', label: 'Within 10km' },
    { value: '5', label: 'Within 5km' },
    { value: '2', label: 'Within 2km' },
    { value: '1', label: 'Within 1km' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'Any Price' },
    { value: '0-50', label: '$0 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          <span className="text-sm text-muted-foreground">
            ({resultsCount} providers found)
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={16}
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
          />
        </div>
      </div>
      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Service Category Filter */}
            <div>
              <Select
                label="Service Category"
                options={serviceCategories}
                value={filters?.category}
                onChange={(value) => handleFilterChange('category', value)}
                placeholder="Select category"
              />
            </div>

            {/* Rating Filter */}
            <div>
              <Select
                label="Minimum Rating"
                options={ratingOptions}
                value={filters?.rating}
                onChange={(value) => handleFilterChange('rating', value)}
                placeholder="Any rating"
              />
            </div>

            {/* Distance Filter */}
            <div>
              <Select
                label="Distance"
                options={distanceOptions}
                value={filters?.distance}
                onChange={(value) => handleFilterChange('distance', value)}
                placeholder="Select distance"
              />
            </div>

            {/* Price Range Filter */}
            <div>
              <Select
                label="Price Range"
                options={priceRangeOptions}
                value={filters?.priceRange}
                onChange={(value) => handleFilterChange('priceRange', value)}
                placeholder="Any price"
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="pt-2">
            <Input
              type="search"
              label="Search Providers"
              placeholder="Search by name, skills, or location..."
              value={filters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;