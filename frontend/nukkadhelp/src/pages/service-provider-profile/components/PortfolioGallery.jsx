import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioGallery = ({ portfolio }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  
  const displayedImages = showAllImages ? portfolio : portfolio?.slice(0, 6);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  if (!portfolio || portfolio?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Portfolio</h2>
        <span className="text-sm text-muted-foreground">{portfolio?.length} photos</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayedImages?.map((image, index) => (
          <div
            key={index}
            className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-micro"
            onClick={() => openImageModal(image)}
          >
            <Image
              src={image?.src}
              alt={image?.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      {portfolio?.length > 6 && (
        <div className="text-center mt-4">
          <Button
            variant="outline"
            onClick={() => setShowAllImages(!showAllImages)}
          >
            {showAllImages ? 'Show Less' : `View All ${portfolio?.length} Photos`}
          </Button>
        </div>
      )}
      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-micro z-10"
            >
              <Icon name="X" size={24} />
            </button>
            
            <div className="bg-card rounded-lg overflow-hidden">
              <Image
                src={selectedImage?.src}
                alt={selectedImage?.alt}
                className="max-w-full max-h-[80vh] object-contain"
              />
              
              {selectedImage?.caption && (
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">{selectedImage?.caption}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGallery;