import React from 'react';

export const ShortArrow = ({
  size = '9',
  className = '',
  colorClass = '',
  color = undefined,
}) => (
  <svg width={size} viewBox="0 0 8 4.9" className={className}>
    <path
      d="M0.93137 0C0.218647 0 -0.138286 0.861714 0.365685 1.36569L3.43431 4.43431C3.74673 4.74673 4.25327 4.74673 4.56569 4.43431L7.63432 1.36568C8.13829 0.861712 7.78135 0 7.06863 0L0.93137 0Z"
      fill={color}
      className={colorClass}
    />
  </svg>
);
