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
      <div className="relative max-w-5xl mx-auto px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-cyber-primary text-sm tracking-[0.2em] uppercase">
              01.
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white font-sans">
              About Me
            </h2>
            <div className="h-px bg-white/10 flex-grow ml-4" />
          </div>

          <div className="grid md:grid-cols-[3fr_2fr] gap-16 items-stretch">
            {/* Text Content */}
            <div className="flex flex-col justify-center h-full">
              <p className="font-sans text-slate-200 leading-relaxed text-lg md:text-xl font-normal tracking-wide">
                {ABOUT_TEXT}
              </p>
            </div>

            {/* Interactive Profile Card */}
            <div className="flex justify-center md:justify-end items-center h-full">
              <ProfileCard />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
