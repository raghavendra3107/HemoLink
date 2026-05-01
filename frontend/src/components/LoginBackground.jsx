import React from 'react';

export default function LoginBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      {/* Static blood cells background image */}
      <img 
        src="/assets/blood_cells_bg.png" 
        alt="Blood Cells Background" 
        className="w-full h-full object-cover opacity-90"
      />
      {/* Dark overlay to ensure the login card remains highly readable */}
      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  );
}
