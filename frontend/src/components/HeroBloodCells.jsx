import React, { useMemo } from 'react';

const HeroBloodCells = () => {
  const cells = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => {
      const scale = 0.3 + Math.random() * 0.9;
      const opacity = 0.5 + Math.random() * 0.5;
      
      const left = Math.random() * 110 - 5; // -5% to 105%
      const top = Math.random() * 110 - 5;  // -5% to 105%
      
      const duration = 15 + Math.random() * 20;
      const delay = Math.random() * -40;
      
      const moveX = (Math.random() - 0.5) * 150; // pixels
      const moveY = (Math.random() - 0.5) * 150;
      
      // Rotations
      const rxStart = Math.random() * 360;
      const ryStart = Math.random() * 360;
      const rzStart = Math.random() * 360;

      const rxEnd = rxStart + (Math.random() - 0.5) * 180;
      const ryEnd = ryStart + (Math.random() - 0.5) * 180;
      const rzEnd = rzStart + (Math.random() - 0.5) * 180;

      return {
        id: i,
        scale, opacity,
        duration, delay,
        left, top,
        moveX, moveY,
        rxStart, ryStart, rzStart,
        rxEnd, ryEnd, rzEnd
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <style>
        {`
          .hero-rbc-thick {
            position: absolute;
            width: 120px;
            height: 120px;
            margin-left: -60px;
            margin-top: -60px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #ff4b33 0%, #c41c0f 45%, #8f0800 80%, #5e0000 100%);
            box-shadow: 
              inset 10px 10px 20px rgba(255, 120, 100, 0.4),
              inset -10px -10px 30px rgba(60, 0, 0, 0.8),
              5px 5px 15px rgba(0, 0, 0, 0.5);
          }
          .hero-rbc-thick::after {
            content: '';
            position: absolute;
            top: 25%; left: 25%; right: 25%; bottom: 25%;
            border-radius: 50%;
            background: radial-gradient(
              circle at 60% 60%, 
              rgba(100, 0, 0, 0.8) 0%, 
              rgba(180, 20, 15, 0.3) 60%, 
              transparent 100%
            );
            box-shadow: 
              inset 4px 4px 8px rgba(0, 0, 0, 0.8),
              inset -4px -4px 10px rgba(255, 60, 40, 0.2);
          }

          ${cells.map(c => `
            @keyframes float-hero-${c.id} {
              0%, 100% {
                transform: 
                  translate3d(0px, 0px, 0)
                  scale(${c.scale})
                  rotateX(${c.rxStart}deg) rotateY(${c.ryStart}deg) rotateZ(${c.rzStart}deg);
              }
              50% {
                transform: 
                  translate3d(${c.moveX}px, ${c.moveY}px, 0)
                  scale(${c.scale}) 
                  rotateX(${c.rxEnd}deg) rotateY(${c.ryEnd}deg) rotateZ(${c.rzEnd}deg);
              }
            }

            .hero-cell-${c.id} {
              left: ${c.left}%;
              top: ${c.top}%;
              opacity: ${c.opacity};
              animation: float-hero-${c.id} ${c.duration}s ease-in-out infinite;
              animation-delay: ${c.delay}s;
              will-change: transform;
            }
          `).join('')}
        `}
      </style>

      {cells.map(c => (
        <div key={c.id} className={`hero-rbc-thick hero-cell-${c.id}`}></div>
      ))}
    </div>
  );
};

export default HeroBloodCells;
