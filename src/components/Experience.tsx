
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Calendar, Star } from 'lucide-react';
import { EXPERIENCE_DATA } from '../constants';
import SpotlightCard from './SpotlightCard';

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section 
      id="experience" 
      className="relative py-24 bg-cyber-dark overflow-hidden border-t border-white/5"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-cyber-primary text-sm">02.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight tracking-wider">Experience</h2>
          <div className="h-px bg-white/10 flex-grow ml-4 max-w-xs" />
        </div>

        <div className="mt-10 flex flex-col md:flex-row min-h-[450px] gap-8 md:gap-12">
          
          {/* TABS SELECTOR */}
          <div className="relative flex md:flex-col overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 scrollbar-hide md:min-w-[220px] max-w-full">
            {EXPERIENCE_DATA.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                  h-12 px-5 md:px-6 flex items-center whitespace-nowrap md:w-full text-left
                  font-mono text-xs md:text-sm tracking-wider transition-all duration-300 border-b-2 md:border-b-0 md:border-l-2
                  ${activeTab === index 
                    ? 'text-cyber-primary bg-cyber-primary/5 border-cyber-primary font-bold' 
                    : 'text-slate-500 border-white/10 hover:text-cyber-primary hover:bg-white/5'
                  }
                `}
              >
                {exp.company}
              </button>
            ))}
            
            {/* Sliding Indicator (Desktop) */}
            <motion.div 
               animate={{ y: activeTab * 48 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="absolute left-0 top-0 w-[2px] h-12 bg-cyber-primary hidden md:block"
            />
            
            {/* Sliding Indicator (Mobile) */}
            {/* Note: In mobile, the indicator is handled by the border-b on the button above for simplicity and better scroll behavior */}
          </div>

          {/* CONTENT AREA */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full"
              >
                <SpotlightCard className="bg-white/[0.03] backdrop-blur-md border border-white/5 p-6 md:p-10 rounded-2xl shadow-2xl">
                  
                  {/* Role Detail Header */}
                  <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-5">
                          {EXPERIENCE_DATA[activeTab].image && (
                            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center shadow-xl border border-white/10 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                <img 
                                  src={EXPERIENCE_DATA[activeTab].image} 
                                  alt={EXPERIENCE_DATA[activeTab].company} 
                                  className="w-full h-full object-cover"
                                />
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
                              {EXPERIENCE_DATA[activeTab].title} 
                              <span className="text-cyber-primary">@</span> 
                              <span className="text-cyber-primary">{EXPERIENCE_DATA[activeTab].company}</span>
                            </h3>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                                    <Calendar size={14} className="text-cyber-primary" />
                                    {EXPERIENCE_DATA[activeTab].period}
                                </span>
                                {EXPERIENCE_DATA[activeTab].location && (
                                    <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                                        <MapPin size={14} className="text-cyber-primary" />
                                        {EXPERIENCE_DATA[activeTab].location}
                                    </span>
                                )}
                            </div>
                          </div>
                      </div>
                      
                      {EXPERIENCE_DATA[activeTab].type && (
                         <div className="px-3 py-1 rounded-full border border-cyber-primary/20 bg-cyber-primary/5 text-cyber-primary font-mono text-[10px] uppercase tracking-widest w-fit font-bold">
                            {EXPERIENCE_DATA[activeTab].type}
                         </div>
                      )}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-4">
                    {EXPERIENCE_DATA[activeTab].description.map((point, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-4 text-slate-300 text-sm md:text-base leading-relaxed group"
                      >
                        <span className="mt-1.5 flex-shrink-0">
                          <Star size={10} className="text-cyber-primary group-hover:scale-125 transition-transform duration-300" />
                        </span>
                        <span className="group-hover:text-white transition-colors duration-300">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Skills/Tags if available - (Optional addition for future expansion) */}
                  <div className="mt-10 flex items-center gap-2">
                     <div className="h-px bg-white/5 flex-grow" />
                     <Briefcase size={16} className="text-cyber-primary/40" />
                     <div className="h-px bg-white/5 flex-grow" />
                  </div>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Decorative BG Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-cyber-primary/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-cyber-primary/5 blur-[100px] rounded-full" />
    </section>
  );
};

export default Experience;
