import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading for effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full bg-slate-950 flex flex-col items-center justify-center z-50">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-t-4 border-cyber-primary rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-4 border-cyber-primaryDim rounded-full animate-spin-slow"></div>
          <div className="absolute inset-4 border-l-4 border-white rounded-full animate-pulse"></div>
        </div>
        <h2 className="mt-8 text-xl font-mono text-cyber-primary animate-pulse">INITIALIZING SYSTEM...</h2>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-sans selection:bg-cyber-primary/30 selection:text-white relative">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;