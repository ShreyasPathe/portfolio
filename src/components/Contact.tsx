
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';
import SubtleGrid from './SubtleGrid';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Interactive Subtle Grid Background */}
      <SubtleGrid />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <span className="font-mono text-cyber-primary text-sm bg-cyber-dark/60 backdrop-blur-sm px-2 py-1 rounded border border-cyber-primary/20">06. What's Next?</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">Get In Touch</h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto leading-relaxed mb-12 bg-cyber-dark/40 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-xl">
              I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6">
                 <a 
                    href={SOCIAL_LINKS.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="group flex items-center justify-center gap-3 px-8 py-4 bg-cyber-card/60 backdrop-blur-md border border-white/10 rounded-lg hover:border-cyber-primary/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:-translate-y-1"
                 >
                    <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-cyber-primary transition-colors" />
                    <span className="text-slate-300 group-hover:text-white font-mono text-sm">Connect on LinkedIn</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                 </a>
                 
                 <a 
                    href={SOCIAL_LINKS.email}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-center gap-3 px-8 py-4 bg-cyber-card/60 backdrop-blur-md border border-white/10 rounded-lg hover:border-cyber-primary/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] hover:-translate-y-1"
                 >
                    <Mail className="w-5 h-5 text-slate-400 group-hover:text-cyber-primary transition-colors" />
                    <span className="text-slate-300 group-hover:text-white font-mono text-sm">Send Email</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                 </a>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
