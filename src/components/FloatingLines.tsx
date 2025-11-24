import React, { useEffect, useRef } from 'react';

const FloatingLines: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lines: Line[] = [];
    
    const config = {
      lineCount: 0, 
      minSpeed: 0.3,
      maxSpeed: 0.8,
      minLength: 150,
      maxLength: 400,
      color: "6, 182, 212", // Cyan RGB
      interactionRadius: 200, 
    };

    const setDimensions = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        config.lineCount = Math.floor(canvas.width / 15); // Higher density
        initLines();
      }
    };

    class Line {
      x: number;
      y: number;
      length: number;
      speed: number;
      width: number;
      baseOpacity: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.length = Math.random() * (config.maxLength - config.minLength) + config.minLength;
        this.speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
        this.width = Math.random() * 1 + 0.5;
        this.baseOpacity = Math.random() * 0.05 + 0.02; // Very subtle base
        this.opacity = this.baseOpacity;
      }

      update() {
        this.y -= this.speed;
        
        // Proximity Check for Hover Lighting
        const dx = Math.abs(mouse.current.x - this.x);
        
        // Only interact if within horizontal range
        if (dx < config.interactionRadius) {
            // Intensity based on distance
            const intensity = 1 - (dx / config.interactionRadius);
            // Target opacity becomes much higher (0.8) when hovered
            const targetOpacity = this.baseOpacity + (intensity * 0.8); 
            // Smooth lerp
            this.opacity += (targetOpacity - this.opacity) * 0.1;
        } else {
            // Decay
            this.opacity += (this.baseOpacity - this.opacity) * 0.05;
        }

        // Wrap around
        if (this.y + this.length < 0) {
          this.y = canvas!.height + this.length;
          this.x = Math.random() * canvas!.width;
          this.opacity = this.baseOpacity; 
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.length);
        // Gradient: Fade In -> Bright -> Fade Out
        gradient.addColorStop(0, `rgba(${config.color}, 0)`);
        gradient.addColorStop(0.5, `rgba(${config.color}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${config.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.length);
      }
    }

    const initLines = () => {
      lines = [];
      for(let i=0; i<config.lineCount; i++) {
        lines.push(new Line());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 'lighter' blend mode makes overlapping lines and hover effects glow
      ctx.globalCompositeOperation = 'lighter';

      lines.forEach(line => {
        line.update();
        line.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
        mouse.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', setDimensions);
    // Attach strictly to canvas for local coordinates
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    setDimensions();
    animate();

    return () => {
      window.removeEventListener('resize', setDimensions);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto"
    />
  );
};

export default FloatingLines;