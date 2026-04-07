import React from 'react';
import { motion } from 'framer-motion';
import { ABOUT_TEXT } from '../constants';
import ProfileCard from './ProfileCard';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-24 bg-cyber-dark overflow-hidden border-t border-white/5"
    >
      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Header matched with Experience section */}
          <div className="flex items-center gap-4 mb-20">
            <span className="font-mono text-cyber-primary text-sm tracking-[0.2em] uppercase">
              01.
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase tracking-wider">
              About Me
            </h2>
            <div className="h-px bg-white/10 flex-grow ml-4 max-w-xs" />
          </div>

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-center">
            {/* Styled Text Content */}
            <div className="relative order-2 lg:order-1">
              <div className="relative">
                <p className="text-slate-300 leading-relaxed text-lg md:text-xl font-normal tracking-wide text-justify">
                  {ABOUT_TEXT}
                </p>
              </div>
              
              {/* Background Glow */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyber-primary/5 blur-[120px] rounded-full opacity-30" />
            </div>

            {/* Profile Image/Card Container */}
            <div className="flex justify-center items-center order-1 lg:order-2">
              <div className="relative group">
                {/* Outer Glow */}
                <div className="absolute -inset-4 bg-cyber-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <ProfileCard />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
