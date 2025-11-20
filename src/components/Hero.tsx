import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const welcomeBoxRef = useRef<HTMLDivElement>(null);
  const splineBoxRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.5,
      });

      // Subheading animation
      gsap.from(subheadingRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8,
      });

      // CTA buttons animation
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        scale: 0.8,
        duration: 1,
        ease: 'power2.out',
        delay: 1.1,
      });

      // Soft pulse animation for buttons after initial load
      gsap.to(ctaRef.current, {
        scale: 1.05,
        duration: 0.8,
        ease: 'power1.inOut',
        delay: 2.2,
        yoyo: true,
        repeat: 1,
      });

      // 3D model animation
      gsap.from(splineBoxRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out(1.7)',
        delay: 0.3,
      });

      // Floating elements animation
      if (floatingElementsRef.current) {
        const elements = floatingElementsRef.current.children;
        gsap.from(elements, {
          opacity: 0,
          scale: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 1.3,
        });

        // Continuous floating animation
        gsap.to(elements, {
          y: -20,
          duration: 2,
          stagger: 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // Parallax effect for the 3D model/robot - moves down and stays aligned with About section
      gsap.fromTo(splineBoxRef.current, 
        {
          y: 0,
          scale: 1,
        },
        {
          y: 650,
          scale: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-gradient-to-br from-slate-50 via-white to-blue-50"
      style={{ height: '100vh', minHeight: '600px', maxHeight: '900px', overflow: 'visible' }}
    >
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-transparent z-0" 
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
          }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 z-10"
          ref={splineBoxRef}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
            overflow: 'visible',
          }}
        >
          <iframe 
            src='https://my.spline.design/nexbotrobotcharacterconcept-rSexyX5xmkfywiA9bMbIDM3v/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            style={{ 
              pointerEvents: 'auto',
              background: 'transparent',
            }}
          />
        </div>
      </div>

      {/* Triangular fill matching next section */}
      <div 
        className="absolute bottom-0 right-0 w-full z-20"
        style={{
          height: '8vh',
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          transform: 'translateY(1px)',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        }}
      />

      {/* Floating decorative elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-blue-400/30 rounded-lg rotate-45" />
        <div className="absolute top-40 right-20 w-12 h-12 border-2 border-purple-400/30 rounded-full" />
        <div className="absolute bottom-32 left-20 w-8 h-8 bg-cyan-400/20 rounded-lg" />
        <div className="absolute top-60 left-1/4 w-6 h-6 bg-blue-400/30 rounded-full" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4" style={{ pointerEvents: 'none' }}>
        <div 
          ref={welcomeBoxRef}
          className="absolute left-0 top-0 bottom-0 w-1/2 flex flex-col items-center justify-center px-8 transition-all duration-500"
          style={{
            opacity: Math.max(0, 1 - scrollY / 300),
            transform: `translateX(-${Math.min(100, (scrollY / 300) * 100)}%)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)',
          }}
        >
          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 mb-6 text-center leading-tight"
            style={{
              textShadow: '0 4px 20px rgba(6, 182, 212, 0.3)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Building Digital
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text">
              Experiences
            </span>
          </h1>

          <p
            ref={subheadingRef}
            className="text-xl md:text-2xl text-gray-700 mb-8 text-center max-w-lg font-medium leading-relaxed"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            Full Stack Developer crafting beautiful, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 font-bold"> innovative</span>, and 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold"> user-centric</span> solutions
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex gap-4 mb-6" style={{ pointerEvents: 'auto' }}>
            <button 
              onClick={scrollToAbout}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-full border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* Triangular fill for white section */}
        <div 
          className="absolute bottom-0 left-0 w-1/2 transition-all duration-500 z-20"
          style={{
            height: '8vh',
            clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
            opacity: Math.max(0, 1 - scrollY / 300),
            transform: `translateX(-${Math.min(100, (scrollY / 300) * 100)}%) translateY(1px)`,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          }}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="w-6 h-10 border-2 border-blue-500 rounded-full flex justify-center shadow-lg shadow-blue-500/50">
          <div className="w-1.5 h-3 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
