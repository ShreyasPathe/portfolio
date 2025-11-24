
import React, { useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { EXPERIENCE_DATA } from '../constants';
import SpotlightCard from './SpotlightCard';

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Animation Variants for Staggered Data Stream
  const cardContentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slow stagger for "reading" effect
        delayChildren: 0.3
      }
    }
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, x: -10, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-20 bg-cyber-dark overflow-hidden group border-t border-white/5"
    >
      {/* Section-Specific Cursor Glow */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.07), transparent 40%)`
        }}
      />

      {/* Main Container matching other sections max-w-6xl */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        
        {/* Header aligned with other sections */}
        <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-cyber-primary text-sm">02.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Where I've Worked</h2>
            <div className="h-px bg-white/10 flex-grow ml-4" />
        </div>

        {/* Content Container - kept tight/narrow as requested */}
        <div className="max-w-3xl mx-auto relative">
          {/* Main Track Line - Animated Gradient */}
          <div className="absolute left-[20px] md:left-[24px] top-4 bottom-0 w-px bg-gradient-to-b from-cyber-primary/50 via-slate-800 to-slate-900 z-0" />

          <div className="space-y-2">
            {EXPERIENCE_DATA.map((exp, index) => (
              <div key={index} className="relative pl-16 pt-2">
                
                {/* 1. Tech Node (Circle) - Slow Travel Up with Pulse */}
                <motion.div 
                   initial={{ y: 100, opacity: 0, scale: 0.5 }}
                   whileInView={{ y: 0, opacity: 1, scale: 1 }}
                   viewport={{ once: true, margin: "-100px" }}
                   transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Advanced easing
                   className="absolute left-[12px] md:left-[16px] top-[34px] w-4 h-4 z-20 flex items-center justify-center"
                >
                    <div className="w-full h-full rounded-full bg-cyber-dark border-2 border-cyber-primary shadow-[0_0_15px_rgba(6,182,212,0.8)] relative">
                        <div className="absolute inset-0 rounded-full bg-cyber-primary opacity-20 animate-ping" />
                    </div>
                </motion.div>

                {/* 2. Connector Beam - Shoots out horizontally */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2, duration: 0.4, ease: "circOut" }}
                    style={{ originX: 0 }}
                    className="absolute left-[28px] top-[41px] h-0.5 w-8 bg-cyber-primary/50 z-10 hidden md:block"
                />

                {/* 3. Content Card - Boots up */}
                <motion.div
                  initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
                >
                  <SpotlightCard className="bg-cyber-dark/90 backdrop-blur-md border border-white/5 w-full h-fit hover:border-cyber-primary/30 transition-all duration-500 group/card">
                    <motion.div 
                        className="p-5"
                        variants={cardContentVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-2">
                            <motion.div variants={textItemVariants}>
                                <h3 className="text-2xl font-bold text-white tracking-tight group-hover/card:text-cyber-primary transition-colors duration-300">
                                    {exp.title}
                                </h3>
                                <p className="text-cyber-primary font-mono text-base mt-1 tracking-wide">@{exp.company}</p>
                            </motion.div>
                            
                            <motion.div variants={textItemVariants} className="font-mono text-xs text-slate-300 bg-cyber-primary/10 px-4 py-1.5 rounded-full border border-cyber-primary/20 whitespace-nowrap w-fit self-start">
                                {exp.period}
                            </motion.div>
                        </div>
                        
                        <motion.ul className="space-y-2">
                            {exp.description.map((item, i) => (
                                <motion.li key={i} variants={textItemVariants} className="text-slate-300 text-base leading-relaxed flex items-start gap-3">
                                    <span className="text-cyber-primary mt-1.5 text-[10px] flex-shrink-0">▹</span>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                  </SpotlightCard>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
