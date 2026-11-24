import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';


export default function App() {
  return (
    <div className="relative min-h-screen text-fg">
      <div aria-hidden className="site-backdrop pointer-events-none fixed inset-0 -z-10" />
      <Navbar />
      <CommandPalette />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
