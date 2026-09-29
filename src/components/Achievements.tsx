import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Star, Medal, Target, Zap, Crown, Gift, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievementsData = [
  // 1. All Winners First
  {
    title: 'Winner - Urban AI Challenge',
    description: '1st Place in Urban AI Innovation Challenge 2026 for AI-powered urban intelligence.',
    icon: Crown,
    image: '/hackethon_img/urban_ai_trophy_2026.png',
    color: '#06b6d4',
    date: '2026',
    category: 'Winner',
  },
  {
    title: 'Winner - Nexora Hackathon',
    description: '1st Place Champion in National Level Nexora Hackathon 2026.',
    icon: Trophy,
    image: '/hackethon_img/nexora_trophy_2026.png',
    color: '#f59e0b',
    date: '2026',
    category: 'Winner',
  },
  {
    title: 'Winner - TechSpark 2025',
    description: '1st Place in TechSpark State Project Competition 2025.',
    icon: Trophy,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 02_34_04 AM.png',
    color: '#fbbf24',
    date: '2025',
    category: 'Winner',
  },
  {
    title: 'Winner - ECC 2025',
    description: 'Winner of Engineering Case Challenge (ECC) 2025-26.',
    icon: Award,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_20_03 AM.png',
    color: '#06b6d4',
    date: '2025',
    category: 'Winner',
  },
  {
    title: 'Winner - ECC 2024',
    description: 'Winner of Engineering Case Challenge (ECC) 2024-25.',
    icon: Trophy,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_23_38 AM.png',
    color: '#10b981',
    date: '2024',
    category: 'Winner',
  },
  {
    title: 'Winner - SIH 2026 Internal',
    description: '1st Place in Smart India Hackathon (SIH) 2026 Internal Hackathon.',
    icon: Medal,
    image: '/hackethon_img/sih_2026_trophy.png',
    color: '#f43f5e',
    date: '2026',
    category: 'Winner',
  },
  {
    title: 'Winner - SIH 2025 Internal',
    description: '1st Place in Smart India Hackathon (SIH) 2025 Internal Hackathon.',
    icon: Medal,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_40_28 AM.png',
    color: '#ec4899',
    date: '2025',
    category: 'Winner',
  },

  // 2. Ranked Finalists (4th, Top 10, Top 25, Top 35)
  {
    title: '4th Place - Deep Hack',
    description: 'Secured 4th position in Deep Hack organized by Sinhgad Institute.',
    icon: Trophy,
    image: '/hackethon_img/deep_hack_trophy_2026.png',
    color: '#3b82f6',
    date: '2026',
    category: 'Finalist',
  },
  {
    title: '4th Place - DY Patil HackCode',
    description: 'Secured 4th position in HackCode Hackathon at DY Patil College.',
    icon: Award,
    image: '/hackethon_img/dypatil_hackcode_2026.png',
    color: '#8b5cf6',
    date: '2026',
    category: 'Finalist',
  },
  {
    title: 'Top 10 - Quantum Arena',
    description: 'Top 10 Finalist in Quantum Arena 1.0 at Navsahyadri Group of Institutions.',
    icon: Target,
    image: '/hackethon_img/quantum_arena_trophy_2026.png',
    color: '#00f0ff',
    date: '2026',
    category: 'Finalist',
  },
  {
    title: 'Top 25 - Fusion 2025',
    description: 'Top 25 Finalist out of 120+ teams in Fusion National Hackathon 2025.',
    icon: Trophy,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_28_56 AM.png',
    color: '#a855f7',
    date: '2025',
    category: 'Finalist',
  },
  {
    title: "Top 35 - ALGOVERSE'26",
    description: "Secured Top 35 spot in ALGOVERSE'26 Algorand Web3 Blockchain Hackathon.",
    icon: Zap,
    image: '/hackethon_img/algoverse_trophy_2026.png',
    color: '#d946ef',
    date: '2026',
    category: 'Finalist',
  },

  // 3. Runners Up at the end
  {
    title: 'Runner Up - BuildWithIndia',
    description: 'Runner Up in BuildWithIndia national AI hackathon challenge.',
    icon: Zap,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_45_04 AM.png',
    color: '#f59e0b',
    date: '2024',
    category: 'Runner Up',
  },
  {
    title: 'Runner Up - VNIT AI Hackathon',
    description: 'Runner Up in VNIT National Level AI Hackathon.',
    icon: Target,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_50_14 AM.png',
    color: '#10b981',
    date: '2024',
    category: 'Runner Up',
  }
];

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentAchievement = achievementsData[currentIndex];

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    gsap.to(contentRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.95,
      rotationY: 10,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : achievementsData.length - 1));
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: -100, scale: 0.95, rotationY: -10 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            ease: 'power3.out',
            onComplete: () => setIsTransitioning(false)
          }
        );
      }
    });
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    gsap.to(contentRef.current, {
      opacity: 0,
      x: -100,
      scale: 0.95,
      rotationY: -10,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        setCurrentIndex((prev) => (prev < achievementsData.length - 1 ? prev + 1 : 0));
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: 100, scale: 0.95, rotationY: 10 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotationY: 0,
            duration: 0.5,
            ease: 'power3.out',
            onComplete: () => setIsTransitioning(false)
          }
        );
      }
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: 'back.out(1.7)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-16 px-4 overflow-hidden flex items-center"
      style={{
        background: 'linear-gradient(180deg, #0b1228 0%, #1d2542 50%, #111a3a 100%)',
      }}
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Animated background lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 px-2 sm:px-6">
        {/* Title */}
        <div className="text-center mb-8">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-3 tracking-tight"
            style={{ 
              textShadow: '0 0 60px rgba(251, 191, 36, 0.6), 0 0 100px rgba(251, 146, 60, 0.4)',
              filter: 'drop-shadow(0 0 30px rgba(251, 191, 36, 0.5))',
            }}
          >
            Achievements & Awards
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-2">
            National hackathons, engineering competitions, and technical honors
          </p>
          <p className="text-gray-500 text-xs font-semibold">
            {currentIndex + 1} of {achievementsData.length}
          </p>
        </div>

        {/* Navigation & Achievement Container */}
        <div className="relative min-h-[420px] md:min-h-[480px] flex items-center">
          
          {/* Previous Button */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-0 sm:-left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-yellow-500/50"
              style={{
                boxShadow: '0 0 25px rgba(251, 191, 36, 0.4)',
              }}
              aria-label="Previous Achievement"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Achievement Content */}
          <div ref={contentRef} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-10 sm:px-14">
            
            {/* Left Side - Achievement Details */}
            <div className="flex flex-col justify-center space-y-4 text-left overflow-hidden">
              
              {/* Category Badge & Date */}
              <div className="inline-flex items-center gap-2">
                <div
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-lg"
                  style={{
                    background: `linear-gradient(135deg, ${currentAchievement.color}, ${currentAchievement.color}80)`,
                    boxShadow: `0 0 20px ${currentAchievement.color}50`,
                    color: 'white',
                  }}
                >
                  {currentAchievement.category}
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{
                      background: currentAchievement.color,
                      boxShadow: `0 0 15px ${currentAchievement.color}`,
                    }}
                  />
                  <span className="text-sm font-semibold" style={{ color: currentAchievement.color }}>
                    {currentAchievement.date}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight break-words"
                style={{
                  textShadow: `0 0 30px ${currentAchievement.color}40`,
                }}
              >
                {currentAchievement.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                {currentAchievement.description}
              </p>

              {/* Additional Details */}
              <div 
                className="p-4 rounded-xl backdrop-blur-lg border"
                style={{
                  background: `linear-gradient(135deg, ${currentAchievement.color}10, ${currentAchievement.color}05)`,
                  borderColor: `${currentAchievement.color}30`,
                  boxShadow: `0 0 25px ${currentAchievement.color}15`,
                }}
              >
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Achievement Highlights</h4>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: currentAchievement.color }} />
                    <span>Recognized for technical excellence and innovation</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: currentAchievement.color }} />
                    <span>Demonstrated high-performance problem solving</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Award Visual */}
            <div className="flex items-center justify-center relative">
              <div className="relative flex items-center justify-center">
                {/* Decorative glow effects */}
                <div 
                  className="absolute inset-0 opacity-25 animate-pulse"
                  style={{
                    background: `radial-gradient(circle, ${currentAchievement.color}, transparent 70%)`,
                    filter: 'blur(40px)',
                    animationDuration: '3s',
                  }}
                />

                {/* Main icon container */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center group">
                  {(() => {
                    if (currentAchievement.image) {
                      return (
                        <img
                          src={currentAchievement.image}
                          alt={currentAchievement.title}
                          className="max-w-full max-h-full object-contain relative z-10 drop-shadow-2xl"
                          style={{
                            filter: `drop-shadow(0 0 35px ${currentAchievement.color}) drop-shadow(0 0 50px ${currentAchievement.color}70)`,
                          }}
                        />
                      );
                    }
                    const Icon = currentAchievement.icon;
                    return (
                      <Icon 
                        className="w-64 h-64 md:w-80 md:h-80 relative z-10 drop-shadow-2xl"
                        style={{ 
                          color: currentAchievement.color,
                          filter: `drop-shadow(0 0 35px ${currentAchievement.color})`,
                        }}
                      />
                    );
                  })()}
                </div>

                {/* Floating particles */}
                <div className="absolute top-6 right-6 w-3 h-3 rounded-full pointer-events-none" style={{ background: currentAchievement.color, animation: 'float1 4s ease-in-out infinite', opacity: 0.7 }} />
                <div className="absolute bottom-6 left-6 w-2.5 h-2.5 rounded-full pointer-events-none" style={{ background: currentAchievement.color, animation: 'float2 5s ease-in-out infinite', opacity: 0.7 }} />
              </div>
            </div>
          </div>

          {/* Next Button */}
          {currentIndex < achievementsData.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 sm:-right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-xl hover:shadow-orange-500/50"
              style={{
                boxShadow: '0 0 25px rgba(251, 146, 60, 0.4)',
              }}
              aria-label="Next Achievement"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {achievementsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  gsap.to(contentRef.current, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.2,
                    onComplete: () => {
                      setCurrentIndex(idx);
                      gsap.fromTo(contentRef.current,
                        { opacity: 0, scale: 0.95 },
                        { opacity: 1, scale: 1, duration: 0.3, onComplete: () => setIsTransitioning(false) }
                      );
                    }
                  });
                }
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'w-8 h-2'
                  : 'w-2 h-2 hover:scale-125'
              }`}
              style={{
                background: idx === currentIndex 
                  ? `linear-gradient(90deg, ${achievementsData[idx].color}, ${achievementsData[idx].color}80)`
                  : '#4b5563',
                boxShadow: idx === currentIndex ? `0 0 20px ${achievementsData[idx].color}60` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -30px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, -20px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, 25px); }
        }
      `}</style>
    </section>
  );
}
