import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../constants';

const ROTATION_RANGE = 25;
const HALF_ROTATION_RANGE = 25 / 2;

const TiltCard = ({ cert }: { cert: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (cert.credentialUrl) {
      window.open(cert.credentialUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-full w-full rounded-xl bg-cyber-card border border-white/10 group cursor-pointer"
    >
      {/* Hover Border Glow */}
      <div 
        className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyber-primary/50 transition-colors duration-300 pointer-events-none" 
        style={{ transform: "translateZ(20px)" }} 
      />

      {/* Glare Effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/10 to-transparent" 
        style={{ transform: "translateZ(1px)" }}
      />

      <div className="relative h-full p-8 flex flex-col items-center text-center pointer-events-none" style={{ transform: "translateZ(50px)" }}>
        
        {/* Floating Logo Container */}
        <div 
          className={`relative w-20 h-20 mb-6 rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 ${
            cert.logoBgColor === 'white' 
              ? 'bg-white' 
              : cert.logoBgColor === 'slate' 
              ? 'bg-slate-800' 
              : cert.logoBgColor === 'dark'
              ? 'bg-slate-950'
              : 'bg-slate-950'
          }`}
        >
          <div className="absolute inset-0 rounded-full border border-cyber-primary opacity-20 group-hover:scale-110 transition-transform duration-500" />
          <img 
            src={cert.image} 
            alt={cert.issuer}
            className={`w-12 h-12 object-contain z-10 ${
              cert.logoBgColor === 'white' ? 'mix-blend-darken' : ''
            }`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Content */}
        <div className="flex-grow flex flex-col justify-center">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-primary transition-colors duration-300 leading-snug">
            {cert.name}
          </h3>
          <p className="font-mono text-sm text-slate-400 group-hover:text-white/80 transition-colors">
            Issued by {cert.issuer}
          </p>
        </div>

        {/* Button Indicator */}
        <div className="mt-6 px-6 py-2 bg-white/5 group-hover:bg-cyber-primary group-hover:text-slate-950 text-cyber-primary text-xs font-mono rounded-full border border-white/10 group-hover:border-cyber-primary transition-all duration-300 flex items-center gap-2">
          VERIFY <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
};

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="relative py-24 bg-cyber-dark border-t border-white/5 overflow-hidden" style={{ perspective: '1000px' }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-cyber-primary text-sm">05.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Certifications</h2>
          <div className="h-px bg-white/10 flex-grow ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATIONS_DATA.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-80"
            >
              <TiltCard cert={cert} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
