import React from 'react';
import SimpleBallPit from './SimpleBallPit';

const BallPitComponent = ({ categoryName }) => {
  return (
    <div className="w-full h-full bg-black">
      <SimpleBallPit categoryName={categoryName} />
    </div>
  );
};

export default BallPitComponent; 