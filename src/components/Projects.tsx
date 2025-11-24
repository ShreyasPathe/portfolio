import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';
import SpotlightCard from './SpotlightCard';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 bg-cyber-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-cyber-primary text-sm">03.</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Selected Projects</h2>
            <div className="h-px bg-white/10 flex-grow ml-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS_DATA.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
                {/* Wrapped in Anchor Tag for full card clickability */}
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block h-full cursor-pointer"
                >
                    <SpotlightCard className="h-full group bg-cyber-card/50 backdrop-blur-sm">
                        <div className="h-48 bg-slate-800 relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyber-dark/20 group-hover:bg-transparent transition-colors z-10" />
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        
                        <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                            <div className="flex justify-between items-center mb-4">
                                <Folder className="w-8 h-8 text-cyber-primary opacity-80" />
                                <div className="flex gap-4">
                                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-primary transition-colors">{project.title}</h3>
                            <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                                {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-white/5">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-mono text-slate-500">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </SpotlightCard>
                </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;