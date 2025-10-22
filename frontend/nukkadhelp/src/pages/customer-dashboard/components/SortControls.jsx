import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, sortOrder, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'rating', label: 'Rating' },
    { value: 'distance', label: 'Distance' },
    { value: 'price', label: 'Price' },
    { value: 'availability', label: 'Availability' },
    { value: 'experience', label: 'Experience' }
  ];

  const handleSortByChange = (value) => {
    onSortChange(value, sortOrder);
  };

  const handleSortOrderToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newOrder);
  };

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 shadow-card">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="ArrowUpDown" size={18} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Sort by:</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={handleSortByChange}
            placeholder="Select sort option"
            className="w-40"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleSortOrderToggle}
            iconName={sortOrder === 'asc' ? "ArrowUp" : "ArrowDown"}
            iconSize={16}
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">View:</span>
        <div className="flex items-center border border-border rounded-md">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            iconName="Grid3X3"
            iconSize={16}
            className="rounded-r-none border-r"
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('list')}
            iconName="List"
            iconSize={16}
            className="rounded-l-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SortControls;