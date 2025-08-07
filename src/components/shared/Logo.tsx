import React from 'react';

const Logo = () => {
  return (
    <a href="/" className="bg-gray-200 flex items-center justify-center p-3 rounded-xl">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-gray-800"
      >
        <path 
          d="M6 26L10 10L14 26M8 20H12" 
          stroke="currentColor" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* T Shape - Enhanced */}
        <path 
          d="M18 10H28M23 10V26" 
          stroke="currentColor" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <circle 
          cx="15.5" 
          cy="16" 
          r="1.8" 
          fill="currentColor"
          opacity="0.8"
        />
      </svg>
    </a>
  );
};

export default Logo;