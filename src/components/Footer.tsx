
import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyber-dark py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-slate-500 text-sm">Designed & Built by Shreyas Pathe</span>
        
        <div className="flex items-center gap-6">
             <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyber-primary transition-colors">
                <Github className="w-5 h-5" />
             </a>
             <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyber-primary transition-colors">
                <Linkedin className="w-5 h-5" />
             </a>
             <div className="w-px h-4 bg-slate-800 mx-2" />
             <span className="font-mono text-slate-600 text-sm">© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
