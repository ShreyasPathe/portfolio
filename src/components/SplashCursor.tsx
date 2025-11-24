import React, { useEffect, useRef } from 'react';

interface SplashCursorProps {
  color?: string;
}

class Pointer {
  x: number;
  y: number;
  radius: number;
  life: number;
  vx: number;
  vy: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 20 + 10;
    this.life = 1; // 100% life
    this.vx = (Math.random() - 0.5) * 4; // Random scatter velocity
    this.vy = (Math.random() - 0.5) * 4;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.radius += 0.5; // Expand
    this.life -= 0.02; // Fade out
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color}, ${this.life * 0.15})`; // Low opacity for blending
    ctx.fill();
  }
}

const SplashCursor: React.FC<SplashCursorProps> = ({ color = "6, 182, 212" }) => { // Default Cyan
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointers = useRef<Pointer[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    let height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

    const resize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Get relative coordinates
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add multiple particles per move for "fluid" density
      for (let i = 0; i < 3; i++) {
        pointers.current.push(new Pointer(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Use screen blending for "light" effect
      ctx.globalCompositeOperation = 'lighter';

      // Update and draw pointers
      for (let i = 0; i < pointers.current.length; i++) {
        const p = pointers.current[i];
        p.update();
        p.draw(ctx, color);
        
        if (p.life <= 0) {
          pointers.current.splice(i, 1);
          i--;
        }
      }
      
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    // Attach listener to the specific canvas container or window if needed. 
    // Here we attach to window but check bounds in handler or just attach to canvas if it covers area.
    // Since it's a background for a section, we attach to the canvas for interaction within that section.
    canvas.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [color]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto mix-blend-screen z-0 opacity-80"
    />
  );
};

export default SplashCursor;