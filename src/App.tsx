import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Particles from './components/Particles';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    gsap.to('body', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    const smoothScroll = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      window.scrollBy({
        top: delta,
        behavior: 'smooth',
      });
    };

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative bg-slate-900">
      <Particles />

      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>

      <footer className="relative z-10 py-8 text-center border-t border-cyan-500/30 bg-slate-950">
        <p className="text-cyan-400">
          © 2024 Future Portfolio. Crafted with passion and cutting-edge tech.
        </p>
      </footer>
    </div>
  );
}

export default App;
