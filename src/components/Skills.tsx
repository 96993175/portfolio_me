import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Carousel3D from './Carousel3D';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        opacity: 0,
        scale: 0.8,
        y: 40,
        duration: 1.2,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0b1228 0%, #111a3a 50%, #1d2542 100%)',
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h2
          ref={titleRef}
          className="skills-title text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 md:mb-12 text-center px-4 absolute top-8 md:top-12 left-0 right-0 z-20"
          style={{ 
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '0 0 60px rgba(6, 182, 212, 0.3)',
          }}
        >
          Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Expertise</span>
        </h2>

        <div className="w-full h-full flex items-center justify-center" style={{ transform: 'translateY(8vh)' }}>
          <Carousel3D />
        </div>
      </div>
    </section>
  );
}
