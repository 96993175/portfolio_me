import { useState, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Jarvis',
    description: 'Personal Ai assistant ',
    tech: ['Python', 'Groq', 'CohereAPI'],
    color: '#00d4ff',
    thumbnail: '🤖',
    liveUrl: 'https://jarvis-dashboard.com',
    githubUrl: 'https://github.com/Dhairyashil-ui/Jarvis',
  },
  {
    title: 'KrushiMitra',
    description: 'Farmers Personal AI assistant',
    tech: ['React', 'Mongodb', 'Flask'],
    color: '#10b981',
    thumbnail: '🌾',
    liveUrl: 'https://krushimitra1.netlify.app/',
    githubUrl: 'https://github.com/Dhairyashil-ui/KrushiMitra',
  },
  {
    title: 'Graphify',
    description: 'Ai Powered Graphs generating system',
    tech: ['React', 'GSAP', 'vite'],
    color: '#06b6d4',
    thumbnail: '📈',

    liveUrl: 'https://fusion-urvg.vercel.app/',
    githubUrl: 'https://github.com/agrimate123-ctrl/FUSION',
  },
  {
    title: 'Agrimater',
    description: 'Ai powered farm to retail supply chain',
    tech: ['Next.js 16', 'TypeScript', 'React 19'],
    color: '#22c55e',
    thumbnail: '🚜',
    liveUrl: 'https://agrimater.com/',
    githubUrl: 'https://github.com/Dhairyashil-ui/Agrimater6',
  },
  {
    title: 'QuickWash',
    description: 'The connector between Customer and Service Provider',
    tech: ['Mongodb', 'React.js', 'lottis'],
    color: '#3b82f6',
    thumbnail: '💧',
    liveUrl: 'https://itisonlocalhost.com',
    githubUrl: 'https://github.com/itisonlocalhost',
  },
  {
    title: 'surveyapp',
    description: 'Empowering Data Insights with Advanced AI',
    tech: ['React.js', 'MySql', 'Web3'],
    color: '#8b5cf6',
    thumbnail: '📊',
    liveUrl: 'https://ai-agrimater-survey-app.vercel.app/',
    githubUrl: 'https://github.com/Dhairyashil-ui/ai_database',
  },
  {
    title: 'NutriTrack',
    description: 'Your personal AI-powered nutrition companion for better food.',
    tech: ['React.js', 'TypeScript', 'Vite 5.4'],
    color: '#f59e0b',
    thumbnail: '🥗',
    liveUrl: 'https://nutritrack-ai-nutrit-kjrj.bolt.host/',
    githubUrl: 'https://github.com/Dhairyashil-ui/Vivek_project',
  },
  {
    title: 'Simon Game',
    description: 'Simon Game - Watch the pattern and repeat it back!',
    tech: ['React', 'TypeScript', 'Web Audio API'],
    color: '#ec4899',
    thumbnail: '🎮',
    liveUrl: 'https://simon-game-developme-8sbz.bolt.host/',
    githubUrl: 'https://github.com/agrimate123-ctrl/simon_game',
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
  
  // Convert to radians
  const angleRad = (cardAngle * Math.PI) / 180;
  
  // Calculate 3D position
  const x = radius * Math.sin(angleRad);
  const z = radius * Math.cos(angleRad);
  const y = Math.sin(index * 0.5) * -6; // Slight vertical offset
  
  // Determine position category for scaling
  const normalizedAngle = ((cardAngle + 360) % 360);
  let scale = 0.35;
  let translateZ = -80;
  let opacity = 0.4;
  
  // Calculate which card should be in front based on current rotation
  const halfAngleStep = angleStep / 2;
  
  // Front card (0° ± half of angle step) - Only ONE card in front at a time
  if (normalizedAngle < halfAngleStep || normalizedAngle > (360 - halfAngleStep)) {
    scale = 0.9;
    translateZ = 120;
    opacity = 1.0;
  }
  // Near-front cards
  else if ((normalizedAngle >= halfAngleStep && normalizedAngle < angleStep * 1.5) || 
           (normalizedAngle > (360 - angleStep * 1.5) && normalizedAngle <= (360 - halfAngleStep))) {
    scale = 0.65;
    translateZ = 25;
    opacity = 0.85;
  }
  // Side cards
  else if ((normalizedAngle >= angleStep * 1.5 && normalizedAngle < 135) || 
           (normalizedAngle > 225 && normalizedAngle <= (360 - angleStep * 1.5))) {
    scale = 0.5;
    translateZ = -40;
    opacity = 0.6;
  }
  // Back cards
  else {
    scale = 0.35;
    translateZ = -80;
    opacity = 0.4;
  }
  
  const isFrontCard = normalizedAngle < halfAngleStep || normalizedAngle > (360 - halfAngleStep);
  const wasFrontCard = useRef(isFrontCard);
  const [animationKey, setAnimationKey] = useState(0);
  
  // Detect when card becomes front card for entry animation
  useEffect(() => {
    if (isFrontCard && !wasFrontCard.current) {
      setAnimationKey(prev => prev + 1);
    }
    wasFrontCard.current = isFrontCard;
  }, [isFrontCard]);
  
  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFrontCard || !buttonRef.current) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x, y });
  };
  
  // Apply hover effect for front card
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
      {/* Ground reflection */}
      <div
        className="absolute inset-0 rounded-xl blur-2xl"
        style={{
          background: `radial-gradient(ellipse at center, ${project.color}40, transparent)`,
          transform: 'translateY(110px) scaleY(0.2)',
          opacity: opacity * 0.4 * hoverGlow,
        }}
      />
      
      {/* Card container */}
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
        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-60"
          style={{
            background: `linear-gradient(135deg, ${project.color}40, transparent 60%, ${project.color}20)`,
            animation: isFrontCard ? 'gradientShift 3s ease infinite' : 'none',
          }}
        />
        
        {/* Neon border glow */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${project.color}35, transparent)`,
            opacity: isFrontCard ? 0.7 : 0.3,
          }}
        />
        
        {/* Shimmer effect on hover */}
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
        
        {/* Content */}
        <div className="relative h-full p-4 flex flex-col justify-between">
          {/* Top section */}
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
          
          {/* Tech tags */}
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
          
          {/* View Project button - always visible on front card */}
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

// Particle component for orbiting effect
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

export default function Projects() {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const angleStep = 360 / projects.length;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  
  // Generate particles
  const particles = useMemo(() => Array.from({ length: 50 }, (_, i) => i), []);
  
  // Scroll-triggered entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Carousel animation
      gsap.from(carouselRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Controls animation
      gsap.from(controlsRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  
  // Auto-rotate every 4 seconds
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
    <section ref={sectionRef} id="projects" className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-hidden pt-16">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${currentProject.color}15 1px, transparent 1px),
              linear-gradient(to bottom, ${currentProject.color}15 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
          }}
        />
      </div>
      
      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${currentProject.color}30, transparent)`,
            animationDuration: '4s',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{ 
            background: `radial-gradient(circle, ${currentProject.color}20, transparent)`,
            animationDuration: '6s',
            animationDelay: '2s',
          }}
        />
      </div>
      
      {/* Top Section: 20% - Titles only */}
      <div ref={titleRef} className="h-[20vh] flex items-center justify-between px-8 md:px-16 lg:px-24 pt-8 relative z-10">
        {/* Left side - Title */}
        <div className="flex-1">
          <h2
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4fc3ff] via-[#6ba4ff] to-[#7d4dff] mb-2 relative leading-tight"
            style={{ 
              textShadow: '0 0 60px rgba(79, 195, 255, 0.6), 0 0 100px rgba(125, 77, 255, 0.4)',
              filter: 'drop-shadow(0 0 40px rgba(79, 195, 255, 0.5))',
              letterSpacing: '-0.04em',
              animation: 'glowPulse 3s ease-in-out infinite',
            }}
          >
            Featured
            <br />
            <span className="bg-gradient-to-r from-[#7d4dff] via-[#a855f7] to-[#ec4899] text-transparent bg-clip-text">
              Projects
            </span>
            <div 
              className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl -z-10 animate-pulse"
              style={{ animationDuration: '2s' }}
            />
          </h2>
          <div className="flex items-center gap-3 mt-4">
            <div 
              className="h-1 rounded-full transition-all duration-700"
              style={{
                width: '120px',
                background: `linear-gradient(90deg, ${currentProject.color}, transparent)`,
                boxShadow: `0 0 20px ${currentProject.color}80`,
              }}
            />
            <p className="text-cyan-200/80 text-sm md:text-base font-light tracking-wide">
              Explore cutting-edge creations
            </p>
          </div>
        </div>
        
        {/* Right side - Project counter and stats */}
        <div className="hidden lg:flex flex-col items-end gap-3">
          <div className="text-right">
            <div className="text-5xl font-black" style={{ 
              color: currentProject.color,
              textShadow: `0 0 30px ${currentProject.color}80`,
              filter: `drop-shadow(0 0 20px ${currentProject.color})`,
            }}>
              {String(getCurrentIndex() + 1).padStart(2, '0')}
            </div>
            <div className="text-cyan-400/50 text-sm font-bold tracking-wider">
              / {String(projects.length).padStart(2, '0')} PROJECTS
            </div>
          </div>
          <div 
            className="px-4 py-2 rounded-lg border backdrop-blur-md"
            style={{
              background: `${currentProject.color}10`,
              borderColor: `${currentProject.color}40`,
              boxShadow: `0 0 20px ${currentProject.color}20`,
            }}
          >
            <div className="text-xs text-cyan-300/70 mb-1">CURRENT</div>
            <div 
              className="text-sm font-bold"
              style={{ color: currentProject.color }}
            >
              {currentProject.title}
            </div>
          </div>
        </div>
      </div>
      
      {/* Middle Section: 55% - 3D Carousel */}
      <div ref={carouselRef} className="h-[55vh] relative" style={{ perspective: '1200px' }}>
        {/* Orbiting particles behind cards */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ transformStyle: 'preserve-3d', zIndex: 1 }}>
          {particles.map((i) => (
            <Particle key={i} index={i} activeColor={currentProject.color} />
          ))}
        </div>
        
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', zIndex: 10 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              currentAngle={currentAngle}
              totalCards={projects.length}
              isHovering={hoveredCard === index}
              onCardHover={(hovered) => {
                if (hovered && index === getCurrentIndex()) {
                  setHoveredCard(index);
                } else if (!hovered) {
                  setHoveredCard(null);
                }
              }}
              onCardClick={() => {
                const currentIndex = getCurrentIndex();
                if (index === currentIndex) {
                  setSelectedProject(index);
                } else {
                  // Rotate to clicked card
                  const targetAngle = index * angleStep;
                  setCurrentAngle(targetAngle);
                }
              }}
            />
          ))}
        </div>
        
        {/* Detect hover on front card */}
        <div
          className="absolute left-1/2 top-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
          onMouseEnter={() => setHoveredCard(getCurrentIndex())}
          onMouseLeave={() => setHoveredCard(null)}
          style={{ pointerEvents: 'auto', background: 'transparent', zIndex: 5 }}
        />
      </div>
      
      {/* Bottom Section: 25% - Ground plane, arrows, dots */}
      <div ref={controlsRef} className="h-[25vh] relative flex flex-col items-center justify-start pt-8">
        {/* Ground plane */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            width: '80%',
            height: '150px',
            background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.8), transparent)',
            boxShadow: `0 0 100px rgba(79, 195, 255, 0.3)`,
          }}
        />
        
        {/* Navigation arrows */}
        <div className="relative z-10 flex items-center gap-8 mb-8">
          <button
            onClick={prevProject}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-cyan-400/50 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:border-cyan-400 group relative overflow-hidden"
            style={{ 
              backdropFilter: 'blur(16px)',
              boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 40px ${currentProject.color}30`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-3xl text-[#3af1ff] font-bold group-hover:text-white transition-all relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(58,241,255,0.8)]">‹</span>
          </button>
          
          {/* Progress dots */}
          <div className="flex gap-3">
            {projects.map((proj, index) => (
              <button
                key={index}
                onClick={() => setCurrentAngle(index * angleStep)}
                className="group relative"
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    getCurrentIndex() === index
                      ? 'scale-150'
                      : 'scale-100 hover:scale-125'
                  }`}
                  style={{
                    background: getCurrentIndex() === index ? proj.color : 'rgba(255, 255, 255, 0.3)',
                    boxShadow:
                      getCurrentIndex() === index
                        ? `0 0 20px ${proj.color}, 0 0 40px ${proj.color}80`
                        : 'none',
                  }}
                />
              </button>
            ))}
          </div>
          
          <button
            onClick={nextProject}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-2 border-cyan-400/50 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:border-cyan-400 group relative overflow-hidden"
            style={{ 
              backdropFilter: 'blur(16px)',
              boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5), 0 0 40px ${currentProject.color}30`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/0 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-3xl text-[#3af1ff] font-bold group-hover:text-white transition-all relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(58,241,255,0.8)]">›</span>
          </button>
        </div>
        
        {/* Current project info */}
        <div className="text-center relative">
          <p 
            className="text-lg font-bold tracking-widest mb-2"
            style={{
              color: currentProject.color,
              textShadow: `0 0 20px ${currentProject.color}80`,
            }}
          >
            {currentProject.title}
          </p>
          <div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-0.5 rounded-full"
            style={{
              background: currentProject.color,
              boxShadow: `0 0 10px ${currentProject.color}`,
            }}
          />
        </div>
      </div>
      
      {/* Project Details Modal */}
      {selectedProject !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-backdropFadeIn"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProject(null);
          }}
          style={{ cursor: 'pointer' }}
        >
          <div
            className="relative max-w-md w-full p-6 rounded-2xl overflow-hidden shadow-2xl animate-modalScaleIn"
            style={{
              background: `linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))`,
              border: `2px solid ${projects[selectedProject].color}`,
              boxShadow: `
                0 0 60px ${projects[selectedProject].color}60,
                0 0 100px ${projects[selectedProject].color}40,
                inset 0 0 40px ${projects[selectedProject].color}20
              `,
              cursor: 'default',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${projects[selectedProject].color}30, transparent 60%, ${projects[selectedProject].color}20)`,
                animation: 'gradientShift 3s ease infinite',
              }}
            />
            
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(null);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800/80 border border-red-400/40 flex items-center justify-center hover:bg-red-500/20 hover:border-red-400/70 transition-all backdrop-blur-sm group z-10 cursor-pointer"
              style={{ pointerEvents: 'auto' }}
            >
              <span className="text-red-400 group-hover:text-red-300 text-xl font-bold">×</span>
            </button>

            <div className="relative z-10">
              {/* Project icon and title */}
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">{projects[selectedProject].thumbnail}</div>
                <h3 
                  className="text-2xl font-bold text-white mb-2"
                  style={{
                    textShadow: `0 0 20px ${projects[selectedProject].color}`,
                  }}
                >
                  {projects[selectedProject].title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {projects[selectedProject].description}
                </p>
              </div>

              {/* Tech stack */}
              <div className="mb-6">
                <h4 className="text-cyan-400/70 text-xs font-bold mb-3 tracking-wider uppercase">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject].tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{
                        background: `${projects[selectedProject].color}20`,
                        border: `1px solid ${projects[selectedProject].color}60`,
                        color: projects[selectedProject].color,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.open(projects[selectedProject].liveUrl, '_blank')}
                  className="flex-1 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${projects[selectedProject].color}, ${projects[selectedProject].color}CC)`,
                    color: 'white',
                    boxShadow: `0 4px 20px ${projects[selectedProject].color}60`,
                  }}
                >
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Live Demo</span>
                </button>
                <button
                  onClick={() => window.open(projects[selectedProject].githubUrl, '_blank')}
                  className="flex-1 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 border-2 group"
                  style={{
                    background: 'rgba(30, 41, 59, 0.8)',
                    borderColor: `${projects[selectedProject].color}60`,
                    color: projects[selectedProject].color,
                  }}
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
