import React from 'react';
import { motion } from 'framer-motion';
import { LEADERSHIP_DATA } from '../constants';
import SpotlightCard from './SpotlightCard';

const Leadership: React.FC = () => {
  return (
    <section id="leadership" className="relative py-24 bg-cyber-dark border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-cyber-primary text-sm">06.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Activities & Leadership</h2>
            <div className="h-px bg-white/10 flex-grow ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEADERSHIP_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
                <SpotlightCard className="h-full p-8 group bg-cyber-card/50 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <item.icon className="w-24 h-24 text-cyber-primary" />
                    </div>

                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="p-2 bg-cyber-primary/10 rounded-lg">
                            <item.icon className="w-6 h-6 text-cyber-primary" />
                        </div>
                        <span className="font-mono text-[10px] tracking-widest text-cyber-primary/60 border border-cyber-primary/20 px-2 py-1 rounded bg-cyber-primary/5">
                            {item.highlight.toUpperCase()}
                        </span>
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyber-primary transition-colors">{item.role}</h3>
                        <h4 className="text-slate-500 font-medium mb-4 text-sm">{item.organization}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;