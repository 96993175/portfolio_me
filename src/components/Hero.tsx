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
      // Main heading animation with hardware acceleration
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 50,
          force3D: true,
          duration: 1.5,
          ease: 'power4.out',
          delay: 0.5,
        });
      }

      // Subheading animation with hardware acceleration
      if (subheadingRef.current) {
        gsap.from(subheadingRef.current, {
          opacity: 0,
          y: 30,
          force3D: true,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.8,
        });
      }

      // CTA buttons animation with hardware acceleration
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.8,
          force3D: true,
          duration: 1,
          ease: 'power2.out',
          delay: 1.1,
        });

        // Soft pulse animation for buttons after initial load
        gsap.to(ctaRef.current, {
          scale: 1.05,
          force3D: true,
          duration: 0.8,
          ease: 'power1.inOut',
          delay: 2.2,
          yoyo: true,
          repeat: 1,
        });
      }

      // 3D model animation with hardware acceleration (desktop only)
      if (splineBoxRef.current) {
        gsap.from(splineBoxRef.current, {
          scale: 0,
          opacity: 0,
          force3D: true,
          duration: 1.5,
          ease: 'back.out(1.7)',
          delay: 0.3,
        });

        // Parallax effect for the 3D model/robot with hardware acceleration
        gsap.fromTo(splineBoxRef.current, 
          {
            y: 0,
            scale: 1,
            force3D: true,
          },
          {
            y: 650,
            scale: 0.5,
            force3D: true,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );
      }

      // Floating elements animation with hardware acceleration
      if (floatingElementsRef.current) {
        const elements = floatingElementsRef.current.children;
        gsap.from(elements, {
          opacity: 0,
          scale: 0,
          force3D: true,
          duration: 1,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 1.3,
        });

        // Continuous floating animation with GPU acceleration
        gsap.to(elements, {
          y: -20,
          force3D: true,
          duration: 2,
          stagger: 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full bg-gradient-to-br from-slate-50 via-white to-blue-50"
      style={{ height: '100vh', minHeight: '600px', maxHeight: '900px', overflow: 'visible' }}
    >
      {/* Animated background gradient orbs - Subtle for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-blue-400/15 md:bg-blue-400/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-purple-400/15 md:bg-purple-400/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 md:w-64 md:h-64 bg-cyan-400/15 md:bg-cyan-400/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Desktop Spline Robot - Hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
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
        <div className="animated absolute top-20 left-10 w-16 h-16 border-2 border-blue-400/30 rounded-lg rotate-45" />
        <div className="animated absolute top-40 right-20 w-12 h-12 border-2 border-purple-400/30 rounded-full" />
        <div className="animated absolute bottom-32 left-20 w-8 h-8 bg-cyan-400/20 rounded-lg" />
        <div className="animated absolute top-60 left-1/4 w-6 h-6 bg-blue-400/30 rounded-full" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4" style={{ pointerEvents: 'none' }}>
        {/* Mobile Version - Centered Content */}
        <div 
          className="animated md:hidden absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center transition-all duration-500"
          style={{ pointerEvents: 'none' }}
        >
          <div className="mb-2">
            <h1
              ref={headingRef}
              className="animated text-4xl xs:text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 mb-4 leading-tight tracking-tight"
              style={{
                textShadow: '0 4px 20px rgba(6, 182, 212, 0.3)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              Building Intelligent
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text">
                AI Products
              </span>
            </h1>
          </div>

          <div className="mb-3">
            <p
              ref={subheadingRef}
              className="animated text-lg sm:text-xl text-gray-700 font-semibold leading-relaxed max-w-2xl px-2"
              style={{
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
              }}
            >
              AI Engineer & Product Builder
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl px-4">
              Focused on real-world, scalable solutions
            </p>
          </div>

          <div className="mb-8 max-w-2xl">
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed px-6">
              I design and build end-to-end AI systems from idea to deployment with a strong focus on usability, performance, and business impact.
            </p>
          </div>

          {/* Mobile CTA Buttons */}
          <div ref={ctaRef} className="animated flex flex-col xs:flex-row gap-3 sm:gap-4 w-full max-w-md mb-6" style={{ pointerEvents: 'auto' }}>
            <button 
              onClick={scrollToProjects}
              className="animated group relative px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50 active:scale-95"
              style={{
                minHeight: '48px',
              }}
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button 
              onClick={() => {
                if (window.innerWidth < 768) {
                  window.location.href = 'tel:+919699317520';
                } else {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="animated px-6 py-3.5 sm:px-8 sm:py-4 bg-white/90 backdrop-blur-md text-gray-800 font-bold rounded-full border-2 border-blue-300 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                minHeight: '48px',
              }}
            >
              Let's Talk
            </button>
          </div>
        </div>

        {/* Desktop Version - Original Split Layout */}
        <div 
          ref={welcomeBoxRef}
          className="animated hidden md:absolute md:left-0 md:top-0 md:bottom-0 md:w-1/2 md:flex md:flex-col md:items-center md:justify-center md:px-8 md:transition-all md:duration-500"
          style={{
            opacity: Math.max(0, 1 - scrollY / 300),
            transform: `translateX(-${Math.min(100, (scrollY / 300) * 100)}%)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)',
            pointerEvents: 'none',
          }}
        >
          <h1
            className="animated text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 mb-6 text-center leading-tight"
            style={{
              textShadow: '0 4px 20px rgba(6, 182, 212, 0.3)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            Building
            <br />
            AI
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text">
              Experiences
            </span>
          </h1>

          <p
            className="animated text-xl md:text-2xl text-gray-700 mb-8 text-center max-w-lg font-medium leading-relaxed"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            AI Full Stack Developer, Crafting intelligent solutions with clarity. 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 font-bold"> innovative</span>, and 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold"> user-centric</span> solutions
          </p>

          {/* Desktop CTA Buttons */}
          <div className="animated flex gap-4 mb-6" style={{ pointerEvents: 'auto' }}>
            <button 
              onClick={scrollToProjects}
              className="animated group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/50"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="animated px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-full border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Let’s Connect
            </button>
          </div>
        </div>

        {/* Triangular fill for white section */}
        <div 
          className="animated absolute bottom-0 left-0 w-1/2 transition-all duration-500 z-20"
          style={{
            height: '8vh',
            clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
            opacity: Math.max(0, 1 - scrollY / 300),
            transform: `translateX(-${Math.min(100, (scrollY / 300) * 100)}%) translateY(1px)`,
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          }}
        />
      </div>

      {/* Scroll indicator - Enhanced for mobile */}
      <div className="animated absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-blue-500 rounded-full flex justify-center shadow-lg shadow-blue-500/50">
          <div className="w-1 h-2 md:w-1.5 md:h-3 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full mt-1.5 md:mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
