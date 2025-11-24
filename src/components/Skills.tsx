import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS_DATA } from '../constants';
import { Cpu, Database, Globe, Shield } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const Icons = [Cpu, Globe, Database, Shield];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 bg-cyber-dark border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-cyber-primary text-sm">04.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Technical Arsenal</h2>
            <div className="h-px bg-white/10 flex-grow ml-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            {SKILLS_DATA.map((category, index) => {
                const Icon = Icons[index % Icons.length];
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <SpotlightCard className="h-full bg-cyber-card/50 backdrop-blur-sm">
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded bg-cyber-dark border border-white/10 text-cyber-primary">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <div 
                                            key={skill}
                                            className="px-3 py-1.5 bg-cyber-dark/50 border border-white/5 rounded text-sm text-slate-400 hover:text-white hover:border-cyber-primary/50 transition-all cursor-default select-none"
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default Skills;