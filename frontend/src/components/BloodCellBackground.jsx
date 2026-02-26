import React, { useMemo } from 'react';

const BloodCellBackground = () => {
  // We perfectly match the reference image: huge, incredibly thick, glossy round cells
  // Very sparse population (only ~20 cells) to create that macroscopic cinematic focus.
  // Greatly increased number of cells to make it look busier, but scaling them down
  const cells = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => {
      const depth = Math.random(); // 0 (front) to 1 (back)
      let zIndex = 0;
      let opacity = 1;
      let scale = 1;
      let brightness = 1;
      
      if (depth < 0.3) {
        // Deep background (small)
        scale = 0.15 + Math.random() * 0.15;
        zIndex = 1;
        opacity = 0.5 + Math.random() * 0.3;
        brightness = 0.5 + Math.random() * 0.3;
      } else if (depth < 0.6) {
        // Mid-background 
        scale = 0.35 + Math.random() * 0.25;
        zIndex = 2;
        opacity = 0.8 + Math.random() * 0.2;
        brightness = 0.8 + Math.random() * 0.2;
      } else if (depth < 0.85) {
        // Main focus plane
        scale = 0.6 + Math.random() * 0.3;
        zIndex = 3;
        opacity = 1;
        brightness = 1;
      } else {
        // Extreme foreground
        scale = 1.0 + Math.random() * 0.4;
        zIndex = 4;
        opacity = 0.9;
        brightness = 0.9 + Math.random() * 0.2;
      }

      const xStart = Math.random() * 120 - 10; // -10vw to 110vw
      const yStart = 110 + Math.random() * 40; // Starts far below viewport
      
      const xEnd = xStart + (Math.random() - 0.5) * 40; 
      const yEnd = -40 - Math.random() * 40; // Ends far above viewport

      // They drift very slowly and majestically
      const baseDuration = 40;
      const depthMultiplier = 0.5 + Math.random() * 1.5;
      const duration = baseDuration * depthMultiplier;
      const delay = Math.random() * -80; // Start instantly at random positions
      
      // Gentle wobble: restricted rotation so we NEVER see paper-thin 2D edges
      const rotSpeedX = (Math.random() - 0.5) * 40; 
      const rotSpeedY = (Math.random() - 0.5) * 40;
      const rotSpeedZ = (Math.random() - 0.5) * 180;
      
      const rxStart = (Math.random() - 0.5) * 50;
      const ryStart = (Math.random() - 0.5) * 50;
      const rzStart = Math.random() * 360;

      const rxEnd = rxStart + rotSpeedX;
      const ryEnd = ryStart + rotSpeedY;
      const rzEnd = rzStart + rotSpeedZ;

      const swayLimit = (Math.random() - 0.5) * 20; 

      return {
        id: i,
        scale, opacity, zIndex, brightness,
        duration, delay,
        xStart, yStart, xEnd, yEnd,
        rxStart, ryStart, rzStart,
        rxEnd, ryEnd, rzEnd,
        swayLimit
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#3a0604] perspective-[1000px]">
      
      {/* 
        Matches the vibrant yet dark blood-colored atmospheric gradient of the image
      */}
      <div 
        className="absolute inset-0 opacity-100" 
        style={{
          background: `radial-gradient(circle at 50% 50%, #7d0a06 0%, #3a0604 50%, #170000 100%)`
        }}
      ></div>
      
      <style>
        {`
          .blood-stream {
            position: absolute;
            width: 100%;
            height: 100%;
          }

          /* --- Massive, Hyper-Thick Red Blood Cell --- */
          .rbc-thick {
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            
            /* Very strong gradient mimicking studio lighting: 
            /* Less dark on the backside/shadow side */
            background: radial-gradient(circle at 30% 30%, #ff4b33 0%, #c41c0f 45%, #8f0800 80%, #5e0000 100%);
            
            /* Emulate thickness with softer inset shadows. */
            box-shadow: 
              inset 20px 20px 40px rgba(255, 120, 100, 0.6), /* Glowing top-left bounce light */
              inset -20px -20px 50px rgba(60, 0, 0, 0.7),    /* Less intense core shadow on backside */
              10px 15px 30px rgba(0, 0, 0, 0.6);             /* Ambient drop shadow behind it */
          }
          
          /* The smooth, perfectly blended crater dimple */
          .rbc-thick::after {
            content: '';
            position: absolute;
            /* Size configures how wide the thick rim is */
            top: 25%; left: 25%; right: 25%; bottom: 25%;
            border-radius: 50%;
            
            /* The crater fades cleanly into the outer rim (lighter shadow) */
            background: radial-gradient(
              circle at 60% 60%, 
              rgba(100, 0, 0, 0.7) 0%, 
              rgba(180, 20, 15, 0.2) 60%, 
              transparent 100%
            );
            
            /* Shadows perfectly carving the smooth bowl shape */
            box-shadow: 
              inset 8px 8px 15px rgba(0, 0, 0, 0.7),
              inset -8px -8px 20px rgba(255, 60, 40, 0.25);
          }

          /* Dynamically Inject Flow and Wobble Keys */
          ${cells.map(c => `
            @keyframes drift-thick-${c.id} {
              0% {
                transform: 
                  translate3d(${c.xStart}vw, ${c.yStart}vh, 0) 
                  scale(${c.scale})
                  rotateX(${c.rxStart}deg) rotateY(${c.ryStart}deg) rotateZ(${c.rzStart}deg);
              }
              50% {
                transform: 
                  translate3d(${(c.xStart + c.xEnd)*0.5 + c.swayLimit}vw, ${(c.yStart + c.yEnd)*0.5}vh, 0)
                  scale(${c.scale}) 
                  rotateX(${(c.rxStart + c.rxEnd)*0.5}deg) rotateY(${(c.ryStart + c.ryEnd)*0.5}deg) rotateZ(${(c.rzStart + c.rzEnd)*0.5}deg);
              }
              100% {
                transform: 
                  translate3d(${c.xEnd}vw, ${c.yEnd}vh, 0)
                  scale(${c.scale}) 
                  rotateX(${c.rxEnd}deg) rotateY(${c.ryEnd}deg) rotateZ(${c.rzEnd}deg);
              }
            }

            .cell-thick-${c.id} {
              /* Remove inline width/height to let the transform scale handle exact optical scaling perfectly */
              opacity: ${c.opacity};
              filter: brightness(${c.brightness});
              z-index: ${c.zIndex};
              animation: drift-thick-${c.id} ${c.duration}s ease-in-out infinite;
              animation-delay: ${c.delay}s;
              will-change: transform;
            }
          `).join('')}
        `}
      </style>

      {/* Render the Clean Thick Cell Stream */}
      <div className="blood-stream">
        {cells.map(c => (
          <div 
            key={c.id} 
            className={`rbc-thick cell-thick-${c.id}`}
          ></div>
        ))}
      </div>
      
    </div>
  );
};

export default BloodCellBackground;
