import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Linkedin } from 'lucide-react';
import Lottie from 'lottie-react';

gsap.registerPlugin(ScrollTrigger);

const robotAnimation = {
  v: '5.5.7',
  fr: 30,
  ip: 0,
  op: 60,
  w: 150,
  h: 150,
  nm: 'Robot',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'Robot',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], e: [10] },
            { t: 30, s: [10], e: [0] },
            { t: 60, s: [0] },
          ],
        },
        p: { a: 0, k: [75, 75, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: 'gr',
          it: [
            {
              ty: 'rc',
              d: 1,
              s: { a: 0, k: [60, 60] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 10 },
            },
            {
              ty: 'fl',
              c: { a: 0, k: [0, 1, 1, 1] },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
  ],
};

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

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
          'rgba(6, 182, 212, ',
          'rgba(139, 92, 246, ',
          'rgba(59, 130, 246, ',
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
        
        context.shadowBlur = 8;
        context.shadowColor = this.color + (this.opacity * 0.5) + ')';
        context.fill();
        context.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

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

      gsap.from(leftCardRef.current, {
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

      gsap.from(rightCardRef.current, {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x, y });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        alert('Message sent! (Demo only)');
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-12 px-4 overflow-hidden flex items-center"
      style={{
        background: 'linear-gradient(180deg, #0b1228 0%, #111a3a 50%, #1d2542 100%)',
      }}
    >
      {/* Canvas particle background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Soft background neon lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6 md:mb-8 text-center"
          style={{ textShadow: '0 0 60px rgba(6, 182, 212, 0.3)' }}
        >
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div ref={leftCardRef} className="space-y-4 md:space-y-6">
            <div className="relative p-[2px] rounded-2xl overflow-hidden group">
              {/* Animated gradient border */}
              <div 
                className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.6), rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6), rgba(6, 182, 212, 0.6))',
                  backgroundSize: '300% 300%',
                  animation: 'gradientMove 4s ease infinite',
                  opacity: 0.7,
                }}
              />
              
              <div
                className="relative p-8 rounded-2xl backdrop-blur-xl transition-all duration-500 ease-out"
                style={{
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.03)',
                }}
              >
              <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-3 md:mb-4">Let's Create Something Amazing</h3>
              <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed">
                Ready to bring your ideas to life? I'm always open to discussing new projects,
                creative ideas, or opportunities to be part of your visions.
              </p>

              <div className="space-y-2 md:space-y-3">
                {[
                  { icon: Mail, label: 'dhairyashilshinde6715@gmail.com', href: 'mailto:dhairyashilshinde6715@gmail.com' },
                  { icon: Phone, label: '+91 9699317520', href: 'tel:+919699317520' },
                  { icon: MapPin, label: 'I2IT College, Hinjawadi Phase 1, Pune' },
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-center gap-3 p-3 rounded-lg backdrop-blur-lg bg-slate-800/60 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 group shadow-sm hover:shadow-md"
                    >
                      <Icon
                        className="text-cyan-400 group-hover:scale-110 transition-transform"
                        size={20}
                      />
                      <span className="text-sm md:text-base text-gray-300">{contact.label}</span>
                    </a>
                  );
                })}
              </div>

              {/* LinkedIn Link */}
              <div className="mt-6">
                <a
                  href="https://www.linkedin.com/in/dhairyashil-shinde-6a50b4314/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 p-4 rounded-xl backdrop-blur-lg bg-gradient-to-r from-blue-600/20 to-blue-500/20 border-2 border-blue-500/40 hover:border-blue-400/70 transition-all duration-300 group shadow-lg hover:shadow-blue-500/30 hover:scale-105"
                >
                  <Linkedin
                    className="text-blue-400 group-hover:scale-110 transition-transform"
                    size={24}
                  />
                  <span className="text-base md:text-lg font-semibold text-blue-300 group-hover:text-blue-200">
                    Connect on LinkedIn
                  </span>
                </a>
              </div>
            </div>
            </div>

            <div className="flex justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32">
                <Lottie animationData={robotAnimation} loop />
              </div>
            </div>
          </div>

          <div ref={rightCardRef} className="relative p-[2px] rounded-2xl overflow-hidden group">
            {/* Animated gradient border */}
            <div 
              className="absolute inset-0 rounded-2xl transition-opacity duration-500"
              style={{
                background: 'linear-gradient(45deg, rgba(6, 182, 212, 0.6), rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6), rgba(6, 182, 212, 0.6))',
                backgroundSize: '300% 300%',
                animation: 'gradientMove 4s ease infinite',
                opacity: 0.7,
              }}
            />
            
            <div
              className="relative p-8 rounded-2xl backdrop-blur-xl transition-all duration-500 ease-out"
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.03)',
              }}
            >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div>
                <label className="block text-cyan-400 text-sm md:text-base font-semibold mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 md:py-2.5 text-sm md:text-base rounded-lg md:rounded-xl bg-slate-900/60 border-2 border-cyan-500/30 text-gray-200 placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                  style={{
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.1)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-cyan-400 text-sm md:text-base font-semibold mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 md:py-2.5 text-sm md:text-base rounded-lg md:rounded-xl bg-slate-900/60 border-2 border-cyan-500/30 text-gray-200 placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-all duration-300"
                  style={{
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.1)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-cyan-400 text-sm md:text-base font-semibold mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 md:py-2.5 text-sm md:text-base rounded-lg md:rounded-xl bg-slate-900/60 border-2 border-cyan-500/30 text-gray-200 placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-all duration-300 resize-none"
                  style={{
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.1)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  placeholder="Tell me about your project..."
                />
              </div>

              <div onMouseMove={handleMouseMove} className="relative">
                <button
                  ref={buttonRef}
                  type="submit"
                  className="relative w-full px-4 py-3 md:py-3.5 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold text-base md:text-lg rounded-lg md:rounded-xl overflow-hidden group transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
                    transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                    Send Message
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,255,255,0.8), transparent 70%)',
                    }}
                  />
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
