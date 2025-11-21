import { useRef, useEffect, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Award, Rocket, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: '2024 - Present',
    title: 'Student',
    company: 'Computer Engineering At I2IT Pune',
    description: 'Computer Engineering student at I2IT Pune, focused on building innovative tech.',
    icon: Rocket,
  },
  {
    year: '2024 - Present',
    title: 'Founder',
    company: 'Agrimater',
    description: 'Building an AI-powered farm-to-retail supply chain delivering ultra-fresh produce efficiently within 24 hours.',
    icon: Code,
  },

];

const projects = [
  {
    title: 'Quantum Dashboard',
    description: 'A futuristic data visualization platform with real-time 3D analytics',
    tech: ['React', 'Three.js', 'WebGL'],
    color: '#00ffff',
    thumbnail: '🌐',
    liveUrl: 'https://your-quantum-dashboard.com',
    githubUrl: 'https://github.com/yourusername/quantum-dashboard',
  },
  {
    title: 'Neural Network Visualizer',
    description: 'Interactive 3D visualization of machine learning algorithms',
    tech: ['TypeScript', 'GSAP', 'Canvas'],
    color: '#a855f7',
    thumbnail: '🧠',
    liveUrl: 'https://your-neural-viz.com',
    githubUrl: 'https://github.com/yourusername/neural-visualizer',
  },
  {
    title: 'Holographic Portfolio',
    description: 'Award-winning immersive portfolio experience',
    tech: ['React', 'R3F', 'Shaders'],
    color: '#06b6d4',
    thumbnail: '✨',
    liveUrl: 'https://your-portfolio.com',
    githubUrl: 'https://github.com/yourusername/holographic-portfolio',
  },
  {
    title: 'Cyber Commerce',
    description: 'Next-gen e-commerce platform with AR product previews',
    tech: ['Next.js', 'WebXR', 'Three.js'],
    color: '#ec4899',
    thumbnail: '🛍️',
    liveUrl: 'https://your-cyber-commerce.com',
    githubUrl: 'https://github.com/yourusername/cyber-commerce',
  },
  {
    title: 'Blockchain Explorer',
    description: 'Real-time cryptocurrency and blockchain data visualization',
    tech: ['Vue.js', 'D3.js', 'Web3'],
    color: '#f59e0b',
    thumbnail: '⛓️',
    liveUrl: 'https://your-blockchain-explorer.com',
    githubUrl: 'https://github.com/yourusername/blockchain-explorer',
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  currentAngle: number;
  totalCards: number;
  isHovering: boolean;
  onCardClick: () => void;
  onCardHover: (hovered: boolean) => void;
}

function ProjectCard({ project, index, currentAngle, totalCards, isHovering, onCardClick, onCardHover }: ProjectCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  const radius = 220;
  const angleStep = 360 / totalCards;
  const cardAngle = (index * angleStep - currentAngle + 360) % 360;
  
  const angleRad = (cardAngle * Math.PI) / 180;
  const x = radius * Math.sin(angleRad);
  const z = radius * Math.cos(angleRad);
  const y = Math.sin(index * 0.5) * -6;
  
  const normalizedAngle = ((cardAngle + 360) % 360);
  let scale = 0.35;
  let translateZ = -80;
  let opacity = 0.4;
  
  if (normalizedAngle < 30 || normalizedAngle > 330) {
    scale = 0.9;
    translateZ = 120;
    opacity = 1.0;
  } else if ((normalizedAngle >= 30 && normalizedAngle < 90) || (normalizedAngle > 270 && normalizedAngle <= 330)) {
    scale = 0.65;
    translateZ = 25;
    opacity = 0.85;
  } else if ((normalizedAngle >= 90 && normalizedAngle < 150) || (normalizedAngle > 210 && normalizedAngle <= 270)) {
    scale = 0.5;
    translateZ = -40;
    opacity = 0.6;
  }
  
  const isFrontCard = normalizedAngle < 30 || normalizedAngle > 330;
  const wasFrontCard = useRef(isFrontCard);
  const [animationKey, setAnimationKey] = useState(0);
  
  useEffect(() => {
    if (isFrontCard && !wasFrontCard.current) {
      setAnimationKey(prev => prev + 1);
    }
    wasFrontCard.current = isFrontCard;
  }, [isFrontCard]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFrontCard || !buttonRef.current) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };
  
  const hoverLift = isFrontCard && isHovering ? -12 : 0;
  const hoverGlow = isFrontCard && isHovering ? 1.4 : 1;
  
  return (
    <div
      className="absolute transition-all duration-700 ease-out cursor-pointer"
      style={{
        left: '50%',
        top: '50%',
        transform: `
          translate(-50%, -50%)
          translate3d(${x}px, ${y + hoverLift}px, ${z}px)
          translateZ(${translateZ}px)
          scale(${scale})
          rotateY(${-cardAngle}deg)
        `,
        opacity: opacity,
        zIndex: Math.round(100 + z + (isFrontCard ? 100 : 0)),
        pointerEvents: isFrontCard ? 'auto' : 'none',
      }}
      onClick={onCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onCardHover(true)}
      onMouseLeave={() => {
        onCardHover(false);
        setMousePos({ x: 0, y: 0 });
        setIsButtonHovered(false);
      }}
    >
      <div
        className="absolute inset-0 rounded-xl blur-2xl"
        style={{
          background: `radial-gradient(ellipse at center, ${project.color}40, transparent)`,
          transform: 'translateY(110px) scaleY(0.2)',
          opacity: opacity * 0.4 * hoverGlow,
        }}
      />
      
      <div
        className="relative w-52 h-64 rounded-xl overflow-hidden backdrop-blur-sm"
        style={{
          background: `linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))`,
          border: `2px solid ${project.color}`,
          boxShadow: `
            0 0 ${25 * hoverGlow}px ${project.color}90,
            0 0 ${50 * hoverGlow}px ${project.color}50,
            0 0 ${80 * hoverGlow}px ${project.color}30,
            inset 0 0 ${20 * hoverGlow}px ${project.color}25,
            0 10px 30px rgba(0, 0, 0, 0.5)
          `,
        }}
      >
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-60"
          style={{
            background: `linear-gradient(135deg, ${project.color}40, transparent 60%, ${project.color}20)`,
            animation: isFrontCard ? 'gradientShift 3s ease infinite' : 'none',
          }}
        />
        
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${project.color}35, transparent)`,
            opacity: isFrontCard ? 0.7 : 0.3,
          }}
        />
        
        {isFrontCard && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(110deg, transparent 40%, ${project.color}40 50%, transparent 60%)`,
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite',
            }}
          />
        )}
        
        <div className="relative h-full p-4 flex flex-col justify-between">
          <div key={`content-${animationKey}`} className={isFrontCard ? 'animate-slideUp' : ''}>
            <div 
              className={`text-4xl mb-2 text-center transition-all duration-500 ${isFrontCard ? 'animate-fadeInScale' : ''}`}
              style={{ animationDelay: '0.1s' }}
            >
              {project.thumbnail}
            </div>
            <h3
              className={`text-lg font-bold text-white mb-1.5 text-center transition-all duration-500 ${isFrontCard ? 'animate-slideUp' : ''}`}
              style={{
                textShadow: `0 0 8px ${project.color}`,
                opacity: isFrontCard ? 1 : 0.7,
                animationDelay: '0.15s',
              }}
            >
              {project.title}
            </h3>
            <p
              className={`text-[10px] text-gray-300 text-center leading-relaxed transition-all duration-500 ${isFrontCard ? 'animate-slideUp' : ''}`}
              style={{ 
                opacity: isFrontCard ? 1 : 0.5,
                animationDelay: '0.2s',
              }}
            >
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-1 justify-center mb-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all duration-300 ${isFrontCard ? 'animate-chipIn' : ''}`}
                style={{
                  background: `${project.color}20`,
                  border: `1px solid ${project.color}60`,
                  color: project.color,
                  opacity: isFrontCard ? 1 : 0.6,
                  animationDelay: `${0.25 + i * 0.05}s`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          
          {isFrontCard && (
            <button
              ref={buttonRef}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setIsClicked(true);
                setTimeout(() => {
                  onCardClick();
                  setIsClicked(false);
                }, 300);
              }}
              className="w-full py-2.5 rounded-lg font-bold transition-all duration-300 text-sm relative overflow-hidden shadow-lg cursor-pointer"
              style={{
                pointerEvents: 'auto',
                zIndex: 1000,
              }}
              onMouseEnter={(e) => {
                setIsButtonHovered(true);
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                setMousePos({ x, y });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                setMousePos({ x, y });
              }}
              onMouseLeave={() => {
                setIsButtonHovered(false);
                setMousePos({ x: 0, y: 0 });
              }}
            >
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: isButtonHovered
                    ? `linear-gradient(135deg, ${project.color}, ${project.color}DD)`
                    : `linear-gradient(135deg, ${project.color}CC, ${project.color}99)`,
                  border: `1.5px solid ${project.color}`,
                  boxShadow: isButtonHovered
                    ? `0 0 35px ${project.color}, 0 0 70px ${project.color}90, 0 0 100px ${project.color}50, 0 4px 20px rgba(0,0,0,0.4)`
                    : `0 0 15px ${project.color}90, 0 2px 10px rgba(0,0,0,0.3)`,
                  transform: isClicked
                    ? 'scale(0.95)'
                    : isButtonHovered 
                    ? `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px) scale(1.08)` 
                    : 'scale(1)',
                  transition: isClicked ? 'all 0.15s ease' : 'all 0.3s ease',
                }}
              />
              {isClicked && (
                <div
                  className="absolute inset-0 rounded-lg animate-ripple"
                  style={{
                    background: `radial-gradient(circle, ${project.color}60, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />
              )}
              <span className="relative z-10 font-extrabold tracking-wide text-white">VIEW PROJECT</span>
              {isButtonHovered && (
                <div 
                  className="absolute inset-0 bg-white/25 rounded-lg animate-pulse"
                  style={{ animationDuration: '0.8s' }}
                />
              )}
            </button>
          )}
          {!isFrontCard && (
            <div className="h-8"></div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ParticleProps {
  index: number;
  activeColor: string;
}

function Particle({ index: _index, activeColor }: ParticleProps) {
  const [position, setPosition] = useState({
    x: Math.random() * 100 - 50,
    y: Math.random() * 80 - 40,
    z: Math.random() * 400 - 200,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: prev.x + (Math.random() - 0.5) * 0.5,
        y: prev.y + (Math.random() - 0.5) * 0.3,
        z: prev.z + (Math.random() - 0.5) * 2,
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const size = Math.random() * 3 + 2;
  const opacity = Math.max(0.2, Math.min(0.6, (200 - Math.abs(position.z)) / 400));

  return (
    <div
      className="absolute rounded-full pointer-events-none transition-all duration-100 ease-linear"
      style={{
        left: '50%',
        top: '50%',
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate3d(${position.x}%, ${position.y}%, ${position.z}px)`,
        background: `radial-gradient(circle, ${activeColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, transparent)`,
        boxShadow: `0 0 ${size * 2}px ${activeColor}${Math.round(opacity * 180).toString(16).padStart(2, '0')}`,
        opacity: opacity,
        zIndex: position.z < 0 ? 1 : 99,
      }}
    />
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Projects state
  const [currentAngle, setCurrentAngle] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const angleStep = 360 / projects.length;
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const particles = useMemo(() => Array.from({ length: 50 }, (_, i) => i), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Experience animations
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item) => {
        // Removed slide-in animation
      });

      const line = document.querySelector('.timeline-line');
      gsap.from(line, {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        scaleY: 0,
        transformOrigin: 'top',
      });
      
      // Projects animations
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(carouselRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(controlsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  
  // Auto-rotate projects every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAngle(prev => (prev + angleStep) % 360);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [angleStep]);
  
  const nextProject = () => {
    setCurrentAngle(prev => (prev + angleStep) % 360);
  };
  
  const prevProject = () => {
    setCurrentAngle(prev => (prev - angleStep + 360) % 360);
  };
  
  const getCurrentIndex = () => {
    return Math.round(currentAngle / angleStep) % projects.length;
  };
  
  const currentProject = projects[getCurrentIndex()];

  return (
    <>
      {/* Experience Section */}
      <section
        ref={sectionRef}
        className="relative min-h-screen w-full py-20 px-4 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0b1228 0%, #111a3a 50%, #1d2542 100%)',
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

        {/* Soft background neon lights */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <h2
            className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-20 text-center"
            style={{ 
              textShadow: '0 0 60px rgba(6, 182, 212, 0.6), 0 0 100px rgba(125, 77, 255, 0.4)',
              filter: 'drop-shadow(0 0 40px rgba(79, 195, 255, 0.5))',
            }}
          >
            Experience
          </h2>

          <div ref={timelineRef} className="relative">
            <div
              className="timeline-line absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 transform -translate-x-1/2"
              style={{
                boxShadow: '0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(6, 182, 212, 0.3)',
              }}
            />

            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`timeline-item relative mb-20 flex ${
                    isLeft ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${
                      isLeft ? 'md:pr-12 text-right' : 'md:pl-12 text-left'
                    }`}
                  >
                    <div
                      className="p-6 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 shadow-lg hover:shadow-xl group"
                      style={{
                        boxShadow: '0 0 30px rgba(6, 182, 212, 0.15)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 40px rgba(6, 182, 212, 0.4), 0 0 80px rgba(6, 182, 212, 0.2)';
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.15)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Icon
                          className="text-cyan-400 group-hover:scale-125 transition-transform duration-300"
                          size={24}
                        />
                        <span className="text-cyan-400 font-semibold">{exp.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{exp.title}</h3>
                      <p className="text-purple-400 font-semibold mb-3 group-hover:text-purple-300 transition-colors">{exp.company}</p>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{exp.description}</p>
                    </div>
                  </div>

                  <div
                    className="timeline-node absolute left-1/2 top-0 transform -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400"
                    style={{
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5)',
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
