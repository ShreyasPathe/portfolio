import { lazy, Suspense } from 'react';
import { Loader, Hud } from './components/fx/Hud';
import { SmoothScroll, ScrollProgress, Backdrop, CommandPalette } from './components/fx/Enhancers';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Scene = lazy(() => import('./components/fx/Scene'));

function App() {
  return (
    <div className="relative min-h-screen bg-ink text-fg font-sans">
      <Loader />
      <SmoothScroll />
      <Suspense fallback={null}><Scene /></Suspense>
      <Hud />
      <ScrollProgress />
      <Backdrop />
      <CommandPalette />
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