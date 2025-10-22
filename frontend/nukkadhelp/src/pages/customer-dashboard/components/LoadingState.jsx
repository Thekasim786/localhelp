import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = ({ viewMode = 'grid' }) => {
  const SkeletonCard = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card animate-pulse">
      {viewMode === 'grid' ? (
        <>
          <div className="h-48 bg-muted"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="flex space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <div key={i} className="w-4 h-4 bg-muted rounded"></div>
              ))}
            </div>
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
            <div className="flex space-x-2 pt-2">
              <div className="h-8 bg-muted rounded flex-1"></div>
              <div className="h-8 bg-muted rounded flex-1"></div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-muted rounded-lg"></div>
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-muted rounded w-1/3"></div>
              <div className="h-3 bg-muted rounded w-1/4"></div>
              <div className="flex space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-muted rounded"></div>
                ))}
              </div>
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded w-20"></div>
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="flex space-x-2">
                <div className="h-8 bg-muted rounded w-20"></div>
                <div className="h-8 bg-muted rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Loading Header */}
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-3">
          <div className="animate-spin">
            <Icon name="Loader2" size={24} className="text-primary" />
          </div>
          <span className="text-lg font-medium text-foreground">
            Finding service providers...
          </span>
        </div>
      </div>
      {/* Loading Cards */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" :"space-y-4"
      }>
        {[...Array(8)]?.map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default LoadingState;