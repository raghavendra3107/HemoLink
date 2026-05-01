import React, { useMemo } from 'react';

export default function LoginBackground() {
  // Generate random blood cells
  const bloodCells = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => {
      const size = Math.random() * 50 + 30; // 30px to 80px
      return {
        id: i,
        size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * -30,
        tx: (Math.random() - 0.5) * 400,
        ty: (Math.random() - 0.5) * 400,
        blur: Math.random() > 0.6 ? Math.random() * 3 + 1 : 0, // Depth of field effect
      };
    });
  }, []);

  // Generate glowing particles
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * -20,
      tx: (Math.random() - 0.5) * 200,
      ty: (Math.random() - 0.5) * 200,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none bg-[#0a0000]">
      {/* Deep red background glows */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-[#400000] to-transparent opacity-60 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#5a0000] to-[#1a0000] opacity-80 blur-[120px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[50vw] rounded-full bg-[#3a0000] opacity-30 blur-[150px]"></div>
      
      {/* Network / grid layer to simulate veins/tissue */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #ff0000 1px, transparent 2px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Blood Cells */}
      {bloodCells.map(cell => (
        <div
          key={`cell-${cell.id}`}
          className="absolute rounded-full"
          style={{
            width: cell.size,
            height: cell.size,
            left: cell.left,
            top: cell.top,
            backgroundColor: '#d61a1a',
            backgroundImage: 'radial-gradient(circle at 30% 30%, #ff6b6b, transparent 60%)',
            boxShadow: 'inset 0 0 15px 5px #7a0000, inset 0 0 30px 10px #4a0000, 0 10px 20px rgba(0,0,0,0.6), 0 0 15px rgba(255,0,0,0.3)',
            filter: `blur(${cell.blur}px)`,
            animation: `floatCell${cell.id} ${cell.duration}s ease-in-out infinite alternate`,
            animationDelay: `${cell.delay}s`,
          }}
        >
          {/* Dimple inside the cell to make it look like a real red blood cell */}
          <div className="absolute inset-[25%] rounded-full" 
               style={{
                 backgroundColor: 'rgba(100, 0, 0, 0.4)',
                 boxShadow: 'inset 0 0 15px rgba(0,0,0,0.7)',
                 filter: 'blur(1px)'
               }}>
          </div>
        </div>
      ))}

      {/* Glowing Particles / Nodes */}
      {particles.map(p => (
        <div
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-red-500"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            boxShadow: '0 0 10px 2px #ff0000, 0 0 20px 5px #ff4d4d',
            animation: `floatParticle${p.id} ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Embedded CSS for animations */}
      <style>{`
        ${bloodCells.map(c => `
          @keyframes floatCell${c.id} {
            0% { transform: translate(0, 0) rotate(0deg) scale(1); }
            100% { transform: translate(${c.tx}px, ${c.ty}px) rotate(${c.tx}deg) scale(1.1); }
          }
        `).join('\n')}
        
        ${particles.map(p => `
          @keyframes floatParticle${p.id} {
            0% { transform: translate(0, 0); opacity: 0.3; }
            100% { transform: translate(${p.tx}px, ${p.ty}px); opacity: 1; }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
}
