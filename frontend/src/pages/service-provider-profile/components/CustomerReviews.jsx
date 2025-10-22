import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ reviews, overallRating, ratingBreakdown }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={`${
          index < rating 
            ? 'text-warning fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Customer Reviews</h2>
      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="text-center md:text-left">
          <div className="text-4xl font-bold text-foreground mb-2">{overallRating}</div>
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
            {renderStars(Math.floor(overallRating))}
          </div>
          <p className="text-muted-foreground">Based on {reviews?.length} reviews</p>
        </div>
        
        <div className="space-y-2">
          {ratingBreakdown?.map((item) => (
            <div key={item?.stars} className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground w-8">{item?.stars}★</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full"
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-8">{item?.count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Individual Reviews */}
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={review?.avatar}
                  alt={review?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{review?.customerName}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(review?.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review?.date)}
                      </span>
                    </div>
                  </div>
                  
                  {review?.serviceType && (
                    <div className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground">
                      {review?.serviceType}
                    </div>
                  )}
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {review?.comment}
                </p>
                
                {review?.images && review?.images?.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {review?.images?.map((image, index) => (
                      <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={image?.src}
                          alt={image?.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More Button */}
      {reviews?.length > 3 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less' : `Show All ${reviews?.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;