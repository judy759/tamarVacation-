// modules/form/Ripple.js
import React from 'react';

const Ripple = ({ onAnimationEnd, ...props }) => {
  return <div {...props} onAnimationEnd={onAnimationEnd} />;
};

export default Ripple;
