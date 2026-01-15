import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowLineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const fullText = `I'm Dhairyashil, an AI Full-Stack Developer who builds complete products using AI. From frontend and backend to ML models, I use AI to create fast, futuristic, and intelligent solutions. Right now, I'm building Agrimater and exploring how AI can power the next generation of apps.`;

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.15 + 0.05;
        
        const colors = [
          'rgba(6, 182, 212, ', // cyan
          'rgba(139, 92, 246, ', // purple
          'rgba(59, 130, 246, ', // blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvasWidth) this.x = 0;
        if (this.x < 0) this.x = canvasWidth;
        if (this.y > canvasHeight) this.y = 0;
        if (this.y < 0) this.y = canvasHeight;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color + this.opacity + ')';
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        
        // Add subtle glow
        context.shadowBlur = 8;
        context.shadowColor = this.color + (this.opacity * 0.5) + ')';
        context.fill();
        context.shadowBlur = 0;
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Draw connections between nearby particles
      particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach(particleB => {
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.05 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade-in with scale animation
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

      // Glow line animation
      gsap.from(glowLineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        scaleX: 0,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5,
      });

      // Image slides in from left
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
        opacity: 0,
        x: -100,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      });

      // Text card slides in from right
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
        opacity: 0,
        x: 100,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Stats cards stagger fade-up animation
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
          opacity: 0,
          y: 60,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          delay: 0.7,
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setHasStartedTyping(true),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!hasStartedTyping) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 8);

    return () => clearInterval(interval);
  }, [hasStartedTyping]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full pt-24 pb-32 px-6 overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #0b1228 0%, #111a3a 50%, #1d2542 100%)',
        minHeight: '120vh',
      }}
    >
      {/* Grid background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      {/* Canvas particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.5 }}
      />

      {/* Soft background neon lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Bold Modern Heading with Glowing Underline */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4 tracking-tight"
            style={{ 
              textShadow: '0 0 60px rgba(6, 182, 212, 0.6), 0 0 100px rgba(125, 77, 255, 0.4)',
              filter: 'drop-shadow(0 0 40px rgba(79, 195, 255, 0.5))',
            }}
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Me</span>
          </h2>
          
          {/* Thin Glowing Underline */}
          <div className="flex justify-center">
            <div 
              ref={glowLineRef}
              className="w-24 h-1 rounded-full origin-center"
              style={{
                background: 'linear-gradient(90deg, rgba(6, 182, 212, 0), rgba(6, 182, 212, 1), rgba(139, 92, 246, 1), rgba(6, 182, 212, 0))',
                boxShadow: '0 0 30px rgba(6, 182, 212, 1), 0 0 60px rgba(6, 182, 212, 0.6)',
              }}
            />
          </div>
        </div>

        {/* Centered Layout: Photo Left, Text Right */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Photo Section - Left */}
          <div ref={imageRef} className="flex justify-center">
            <div className="relative group">
              {/* Enhanced radial neon glow background - multiple layers for depth */}
              <div 
                className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  transform: 'scale(1.4)',
                  background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, rgba(139, 92, 246, 0.3) 40%, rgba(59, 130, 246, 0.2) 70%, transparent 100%)',
                  filter: 'blur(60px)',
                }}
              />
              <div 
                className="absolute inset-0 rounded-full transition-all duration-1000 ease-out group-hover:scale-110"
                style={{ 
                  transform: 'scale(1.2)',
                  background: 'radial-gradient(circle, rgba(6, 182, 212, 0.5) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 100%)',
                  filter: 'blur(40px)',
                }}
              />
              
              {/* Soft neon glow behind photo */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-500/30 rounded-3xl blur-2xl transition-all duration-1000 ease-out group-hover:blur-3xl group-hover:from-cyan-400/50 group-hover:via-blue-500/40 group-hover:to-purple-500/50"
                style={{ transform: 'scale(1.1)' }}
              />
              
              {/* Photo container with glassmorphism */}
              <div
                className="relative w-80 h-80 rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-700 ease-out group-hover:scale-[1.03]"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  boxShadow: '0 20px 60px rgba(6, 182, 212, 0.2), inset 0 0 40px rgba(6, 182, 212, 0.05)',
                  transition: 'box-shadow 0.7s ease-out, border-color 0.7s ease-out, transform 0.7s ease-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 80px rgba(6, 182, 212, 0.5), 0 0 60px rgba(139, 92, 246, 0.4), inset 0 0 60px rgba(6, 182, 212, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(6, 182, 212, 0.2), inset 0 0 40px rgba(6, 182, 212, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                }}
              >
                <img 
                  src="/54544545.jpg" 
                  alt="Dhairyashil" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-500/20 opacity-60 transition-opacity duration-700 group-hover:opacity-80" />
                
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-slate-900/80 to-transparent" />
              </div>
            </div>
          </div>

          {/* Text Section - Right */}
          <div ref={textRef} className="space-y-6">
            {/* Glassmorphic text container with animated gradient border */}
            <div className="relative p-[2px] rounded-2xl overflow-hidden group">
              {/* Animated gradient border */}
              <div 
                className="absolute inset-0 rounded-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.6), rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6), rgba(6, 182, 212, 0.6))',
                  backgroundSize: '300% 300%',
                  animation: 'gradientMove 4s ease infinite',
                  opacity: 0.7,
                }}
              />
              
              {/* Glass card content */}
              <div
                className="relative p-8 rounded-2xl backdrop-blur-xl transition-all duration-500 ease-out"
                style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.03)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(6, 182, 212, 0.4), 0 0 80px rgba(139, 92, 246, 0.3), inset 0 0 40px rgba(6, 182, 212, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.03)';
                }}
              >
                <p className="text-lg md:text-xl text-gray-200 leading-[2] font-light">
                  {displayedText}
                  <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 animate-pulse" 
                    style={{ boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave transition at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ lineHeight: 0 }}>
        <svg
          className="relative block w-full h-auto"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C300,100 900,100 1200,0 L1200,120 L0,120 Z"
            style={{
              fill: '#0b1228',
            }}
          />
        </svg>
      </div>
    </section>
  );
}
