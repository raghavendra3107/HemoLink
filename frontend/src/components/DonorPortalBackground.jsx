import React from 'react';

export default function DonorPortalBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none bg-gradient-to-br from-gray-50 via-white to-red-50/50">
      {/* High-end clean mesh gradient backdrop */}
      <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-rose-100 rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-drifting" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-[-10%] left-[-20%] w-[60vw] h-[60vw] bg-red-100 rounded-full mix-blend-multiply filter blur-[130px] opacity-60 animate-drifting-reverse"></div>
      
      {/* Subtle abstract geometric shapes */}
      <div className="absolute top-[20%] left-[10%] w-64 h-64 border border-red-100 rounded-full opacity-40 mix-blend-multiply border-dashed animate-[spin_60s_linear_infinite]"></div>
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 border border-rose-100 rounded-full opacity-40 mix-blend-overlay border-dashed animate-[spin_90s_linear_infinite_reverse]"></div>
      
      {/* Isometric/geometric subtle tech patterns (representing lab/health data) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e11d48_1.5px,transparent_1.5px)] [background-size:30px_30px]"></div>

      <style>{`
        @keyframes drifting {
          0% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(40px) translateX(-30px) scale(1.05); }
          100% { transform: translateY(0) translateX(0) scale(1); }
        }
        @keyframes drifting-reverse {
          0% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(-30px) translateX(40px) scale(0.95); }
          100% { transform: translateY(0) translateX(0) scale(1); }
        }
        .animate-drifting {
          animation: drifting 15s ease-in-out infinite;
        }
        .animate-drifting-reverse {
          animation: drifting-reverse 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
