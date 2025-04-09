import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BallPitComponent from './BallPitComponent';

const BallPitModal = ({ isOpen, onClose, categoryName, categoryLink }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // Navigate to the category page after a delay
      const timer = setTimeout(() => {
        onClose();
        navigate(categoryLink);
      }, 3000); // 3 second delay before redirecting
      
      return () => {
        clearTimeout(timer);
      };
    } else {
      // Restore scrolling when modal is closed
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose, navigate, categoryLink]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Modal Background - pure black */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Modal Content */}
      <div 
        className="relative z-10 w-full h-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {/* Category Title - displayed as dark text, like "Balls." in the image */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h1 className="text-7xl md:text-9xl font-bold text-[#333] opacity-30">
            {categoryName}.
          </h1>
        </div>
        
        {/* BallPit Component */}
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] w-full bg-black">
          <BallPitComponent categoryName={categoryName} />
        </div>
        
        {/* Loading indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
          <div className="text-white text-lg">
            Loading {categoryName}...
          </div>
        </div>
      </div>
    </div>
  );
};

export default BallPitModal; 