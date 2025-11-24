import React, { useEffect, useRef } from 'react';

const LightRays: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let rays: Ray[] = [];
    
    // Global interactive state
    // Start with a default slanted angle
    let globalAngle = -Math.PI / 6; 
    let targetAngle = -Math.PI / 6;

    class Ray {
      x: number;
      width: number;
      speed: number;
      opacity: number;
      baseOpacity: number;
      heightMod: number;

      constructor(cw: number) {
        this.x = Math.random() * cw;
        this.width = Math.random() * 80 + 20;
        this.speed = Math.random() * 0.4 + 0.1; // Slightly faster for more life
        this.baseOpacity = Math.random() * 0.15 + 0.05;
        this.opacity = this.baseOpacity;
        this.heightMod = Math.random() * 0.4 + 0.8; // Varying ray lengths/intensities
      }

      update(cw: number) {
        this.x += this.speed;
        
        // Wrap around logic
        // We add a large buffer to ensure rays don't pop out of existence when tilted
        const buffer = 600; 
        if (this.x > cw + buffer) {
          this.x = -buffer;
        }
        if (this.x < -buffer) {
          this.x = cw + buffer;
        }
      }

      draw(ctx: CanvasRenderingContext2D, ch: number, angle: number) {
        ctx.save();
        ctx.beginPath();
        
        // Calculate the horizontal shift based on the angle
        // angle 0 = straight down
        // negative angle = bottom shifts right (source top-left)
        const slant = Math.tan(angle) * ch;
        
        // Create gradient
        // We adjust the gradient coordinates to follow the slant
        const grad = ctx.createLinearGradient(this.x, 0, this.x - slant, ch * this.heightMod);
        
        grad.addColorStop(0, `rgba(6, 182, 212, 0)`);
        // Pulse opacity slightly for "alive" feel
        grad.addColorStop(0.4, `rgba(6, 182, 212, ${this.opacity})`);
        grad.addColorStop(1, `rgba(6, 182, 212, 0)`);
        
        ctx.fillStyle = grad;
        
        // Draw the slanted ray
        ctx.moveTo(this.x, 0);
        ctx.lineTo(this.x + this.width, 0);
        ctx.lineTo(this.x + this.width - slant, ch);
        ctx.lineTo(this.x - slant, ch);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Initialize mouse at center
      mouseRef.current = { x: canvas.width / 2, y: canvas.height / 2 };
      
      rays = [];
      // Create rays
      const rayCount = Math.floor(canvas.width / 40); // Responsive count
      for(let i=0; i<rayCount; i++) {
        rays.push(new Ray(canvas.width));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
        
        // Map mouse X position to an angle
        // Left side of screen -> Rays point to right (Source Left) -> Angle approx -45deg
        // Right side of screen -> Rays point to left (Source Right) -> Angle approx +45deg
        const width = window.innerWidth;
        const percentage = e.clientX / width;
        
        // Range from -0.6 (approx -35deg) to 0.6 (approx +35deg)
        // We invert the mapping so it feels like the "Source" is above the cursor
        // If cursor is Left (0), Source is Left, Rays go Top-Left to Bottom-Right (Negative Angle logic in tangent)
        // Wait, Math.tan(-angle) shifts bottom to right.
        // So Cursor Left -> Target Negative Angle.
        
        targetAngle = -0.6 + (percentage * 1.2); 
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smoothly interpolate global angle towards target angle (Lerp)
      // This creates the "lag" or "weight" feel of the light
      globalAngle += (targetAngle - globalAngle) * 0.04;

      // Use 'screen' blending for nice light additive effect
      ctx.globalCompositeOperation = 'screen';
      
      rays.forEach(ray => {
        ray.update(canvas.width);
        ray.draw(ctx, canvas.height, globalAngle);
      });
      
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }} 
    />
  );
};

export default LightRays;