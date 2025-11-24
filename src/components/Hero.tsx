
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin } from 'lucide-react';
import LightRays from './LightRays';
import Magnet from './Magnet';
import { SOCIAL_LINKS } from '../constants';
import { Link } from 'react-scroll';

const Hero: React.FC = () => {
  const [lightsOn, setLightsOn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLightsOn(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-cyber-dark"
    >
      {/* Background Light Rays */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${lightsOn ? 'opacity-100' : 'opacity-0'}`}>
        <LightRays />
      </div>

      {/* AMBIENT DARKNESS OVERLAY - Fades out when initialized */}
      <div 
        className={`absolute inset-0 bg-black z-40 transition-opacity duration-[2000ms] pointer-events-none ${lightsOn ? 'opacity-0' : 'opacity-100'}`} 
      />

      {/* CONTENT */}
      <div className="relative z-50 text-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={lightsOn ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }} 
        >
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="font-mono text-cyber-primary mb-4 tracking-widest text-sm uppercase"
          >
            Hello World
          </motion.p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4 mix-blend-overlay">
             <span className="inline-block text-slate-400 mr-3 md:mr-5 font-light">I am</span>
             <span className="inline-block animate-flicker" style={{ animationDelay: '1.8s' }}>Shreyas Pathe</span>
          </h1>

          <div className={`h-px w-full max-w-md bg-gradient-to-r from-transparent via-cyber-primary/50 to-transparent mx-auto my-8 transition-transform duration-1000 ${lightsOn ? 'scale-x-100' : 'scale-x-0'}`} />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <h2 className="text-xl md:text-2xl text-slate-300 font-light">
              IT Engineer <span className="text-cyber-text mx-2">/</span> Full Stack Developer (MERN Stack)
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-lg mt-4 leading-relaxed">
              Building secure, scalable, and majestic digital experiences.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5 }}
            className="mt-12 flex flex-wrap justify-center items-center gap-6"
          >
             <Link to="projects" smooth={true} duration={800} offset={-50}>
              <Magnet>
                <button className="group relative px-8 py-3 bg-transparent border border-cyber-primary/30 text-cyber-primary font-mono text-sm hover:bg-cyber-primary/10 transition-all duration-300 cursor-pointer">
                  <span className="absolute inset-0 w-0 bg-cyber-primary/10 transition-all duration-[250ms] ease-out group-hover:w-full"></span>
                  <span className="relative">VIEW_WORK</span>
                </button>
              </Magnet>
            </Link>

            <div className="flex gap-4">
                <Magnet>
                  <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="block p-3 border border-white/10 rounded hover:border-cyber-primary/50 hover:text-cyber-primary text-slate-400 transition-all">
                      <Github className="w-5 h-5" />
                  </a>
                </Magnet>
                <Magnet>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="block p-3 border border-white/10 rounded hover:border-cyber-primary/50 hover:text-cyber-primary text-slate-400 transition-all">
                      <Linkedin className="w-5 h-5" />
                  </a>
                </Magnet>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* BOTTOM SCROLL */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={lightsOn ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyber-primary/30 animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

export default Hero;
