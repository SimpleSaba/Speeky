import React from 'react';

const Speeky = ({ width = 200, height = 60, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4facfe', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00f2fe', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g fontFamily="Segoe UI, sans-serif" fontWeight="bold">
        <text x="30" y="40" fontSize="36" fill="url(#grad)">
          Speeky
        </text>
        <circle cx="170" cy="20" r="5" fill="#00f2fe" />
        <circle cx="185" cy="20" r="5" fill="#4facfe" />
      </g>
    </svg>
  );
};

export default Speeky;
