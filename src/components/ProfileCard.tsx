
import React from 'react';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const ProfileCard: React.FC = () => {
  return (
    <div className="relative group w-full max-w-[350px] mx-auto">
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:border-cyber-primary/50">
        
        {/* Image Container */}
        <div className="relative h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-cyber-dark/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
          <img 
            src="/images/profile-image.jpg" 
            alt="Shreyas Pathe" 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter-none filter grayscale"
          />
          
          {/* Cyber Overlay Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 z-20" />
        </div>

        {/* Sliding Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-30 translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-slate-950/95 to-slate-900/40 backdrop-blur-sm">
          
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyber-primary transition-colors">Shreyas Pathe</h3>
            <div className="flex items-center gap-2 text-sm font-mono text-cyber-primary">
              <Terminal className="w-3 h-3" />
              <span>Full Stack Developer</span>
            </div>
          </div>

          {/* Hidden Info (Reveals on Hover) */}
          <div className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <p className="text-slate-400 text-sm leading-relaxed">
              Crafting scalable web architectures and secure digital ecosystems.
            </p>
            
            <div className="flex items-center gap-4 pt-2">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-cyber-primary hover:text-slate-950 text-white transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-cyber-primary hover:text-slate-950 text-white transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={SOCIAL_LINKS.email} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-cyber-primary hover:text-slate-950 text-white transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Top Right Accent */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyber-primary/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cyber-primary/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>
    </div>
  );
};

export default ProfileCard;
