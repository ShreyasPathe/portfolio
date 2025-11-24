import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../constants';
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled 
          ? 'bg-cyber-dark/60 backdrop-blur-xl py-4 shadow-lg shadow-black/20' 
          : 'bg-transparent py-8'
      }`}
      style={{
        willChange: scrolled ? 'auto' : 'transform',
        transform: 'translate3d(0, 0, 0)', // GPU acceleration
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between">
          {/* Logo Section - Enhanced Animations */}
          <Link 
            to="hero" 
            smooth={true} 
            duration={500} 
            className="cursor-pointer group flex items-center gap-1"
          >
            <motion.span 
              className="font-mono text-2xl md:text-3xl font-bold text-white tracking-tighter transition-all duration-500 ease-out group-hover:text-cyber-primary group-hover:drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Shreyas_Pathe
            </motion.span>
            <motion.span 
              className="font-mono text-2xl md:text-3xl text-cyber-primary font-bold"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              _
            </motion.span>
          </Link>
          
          {/* Desktop Nav with Enhanced Gooey/Sliding Pill Effect */}
          <div className="hidden md:block">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-lg shadow-black/10"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              {NAV_ITEMS.map((item, index) => (
                <Link
                  key={item.label}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer relative px-6 py-2.5 text-lg font-medium text-slate-400 transition-colors duration-300 ease-out z-10"
                >
                  {/* Enhanced Sliding Background Pill */}
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="gooey-pill"
                      className="absolute inset-0 bg-gradient-to-r from-cyber-primary/20 to-cyber-primary/10 rounded-full border border-cyber-primary/20"
                      transition={{ 
                        type: "spring", 
                        bounce: 0.2, 
                        duration: 0.6,
                        stiffness: 300,
                        damping: 30
                      }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <motion.span 
                    className={`relative z-10 transition-all duration-300 ease-out ${
                      hoveredIndex === index ? 'text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]' : ''
                    }`}
                    animate={hoveredIndex === index ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ))}
            </motion.div>
          </div>
          
          {/* Mobile Menu Toggle - Enhanced */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:text-cyber-primary transition-colors duration-300 focus:outline-none"
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-8 h-8" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-8 h-8" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: {
                height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: {
                height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 }
              }
            }}
            className="md:hidden bg-cyber-dark/95 backdrop-blur-xl border-b border-white/10 overflow-hidden absolute w-full top-full left-0"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            <motion.div 
              className="px-6 py-8 space-y-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {NAV_ITEMS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    open: {
                      opacity: 1,
                      x: 0,
                      transition: { type: "spring", stiffness: 300, damping: 24 }
                    },
                    closed: {
                      opacity: 0,
                      x: -20,
                      transition: { duration: 0.2 }
                    }
                  }}
                >
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-xl font-medium text-slate-300 hover:text-cyber-primary hover:pl-6 transition-all duration-400 ease-out border-l-2 border-transparent hover:border-cyber-primary hover:bg-cyber-primary/5 rounded-r-lg"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
