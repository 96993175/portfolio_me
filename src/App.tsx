import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Particles from './components/Particles';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Enhanced smooth scroll with momentum
    let isThrottled = false;
    
    const handleWheel = (e: WheelEvent) => {
      if (isThrottled) return;
      
      isThrottled = true;
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Reset scrolling state after scroll ends
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      
      // Throttle wheel events
      setTimeout(() => {
        isThrottled = false;
      }, 50);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <div className="relative bg-slate-900" style={{ 
      scrollBehavior: 'smooth',
      transition: 'scroll 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <Particles />

      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </div>
    </div>
  );
}

export default App;
