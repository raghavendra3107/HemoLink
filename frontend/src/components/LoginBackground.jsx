import React from 'react';

export default function LoginBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none bg-slate-50">
      {/* Rich Crimson and Pink moving gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-red-600 to-rose-400 opacity-20 blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-red-700 to-pink-500 opacity-20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-gradient-to-c from-red-500/10 to-transparent blur-[120px] pointer-events-none"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Elegant SVG Waves at the bottom */}
      <svg className="absolute bottom-0 w-full h-[30vh] text-red-100/40" preserveAspectRatio="none" viewBox="0 0 1440 320">
        <path fill="currentColor" fillOpacity="1" d="M0,192L48,208C96,224,192,256,288,256C384,256,480,224,576,213.3C672,203,768,213,864,229.3C960,245,1056,267,1152,250.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <svg className="absolute bottom-0 w-full h-[25vh] text-red-200/30" preserveAspectRatio="none" viewBox="0 0 1440 320" style={{ transform: 'scaleX(-1)' }}>
        <path fill="currentColor" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,117.3C672,107,768,149,864,181.3C960,213,1056,235,1152,240C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>

      <style>{`
        .animate-pulse-slow {
          animation: slowPulse 8s ease-in-out infinite alternate;
        }
        @keyframes slowPulse {
          0% { opacity: 0.15; transform: scale(1) translate(0, 0); }
          100% { opacity: 0.3; transform: scale(1.1) translate(-20px, 20px); }
        }
      `}</style>
    </div>
  );
}
