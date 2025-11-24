
import React, { useEffect, useRef } from 'react';

const SubtleGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let points: Point[] = [];

    const gridSize = 40; 

    class Point {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      breathingOffset: number;
      breathingSpeed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 1.5;
        this.opacity = Math.random() * 0.2 + 0.1;
        this.breathingOffset = Math.random() * Math.PI * 2;
        this.breathingSpeed = Math.random() * 0.002 + 0.001;
      }

      update() {
        // Breathing effect
        const breath = Math.sin(Date.now() * this.breathingSpeed + this.breathingOffset);
        // Map sine -1..1 to opacity range 0.1..0.3
        const baseOpacity = 0.1 + (breath + 1) * 0.1;

        // Mouse interaction
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            // Smoothly blend to higher opacity near mouse
            this.opacity = baseOpacity + (1 - distance / 100) * 0.6;
        } else {
            this.opacity = baseOpacity;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`;
        ctx.fill();
      }
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      } else {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
      
      points = [];
      for(let x = 0; x <= width; x += gridSize) {
        for(let y = 0; y <= height; y += gridSize) {
             points.push(new Point(x, y));
        }
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      drawGrid();
      
      points.forEach(p => {
          p.update();
          p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };
    
    const handleMouseLeave = () => {
        mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    resize();
    animate();

    return () => {
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" style={{background: '#020617'}} />;
};

export default SubtleGrid;
