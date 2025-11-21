import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Award, Star, Medal, Target, Zap, Crown, Gift, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievementsData = [
  {
    title: 'TechSpark Winner',
    description: 'First place in TechSpark Project Competition 2025',
    icon: Trophy,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 02_34_04 AM.png',
    color: '#fbbf24',
    date: '2025',
    category: 'Competition',
  },

  {
    title: 'ECC 2025 Winner',
    description: 'Winner of ECC 2025-26',
    icon: Award,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_20_03 AM.png',
    color: '#06b6d4',
    date: '2025',
    category: 'Cometition',
  },
  {
    title: 'ECC 2024 Winner',
    description: 'Winner of ECC 2024-25',
    icon: Trophy,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_23_38 AM.png',
    color: '#03f761ff',
    date: '2024',
    category: 'Competition',
  },

  {
    title: 'Fusion 2025 Runner Up',
    description: 'Place in Top 25 Finalists out of 120+ teams in Fusion 2025 ',
    icon: Trophy,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_28_56 AM.png',
    color: '#a855f7',
    date: '2025',
    category: 'Competition',
  },
  {
    title: 'SIH Internal Hackethon Winner',
    description: 'We won SIH Internal Hackethon 2025',
    icon: Medal,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_40_28 AM.png',
    color: '#ec4899',
    date: '2025',
    category: 'Competition',
  },
  {
    title: 'BuildWithIndia Runner Up',
    description: 'Won first round of hackethon with innovative solution',
    icon: Zap,
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_45_04 AM.png',
    color: '#f59e0b',
    date: '2024',
    category: 'Competition',
  },
  {
    title: 'VNIT Ai Hackethon Runner Up',
    description: 'Won First 2 rounds of Hackethon 2024',
    image: '/hackethon_img/ChatGPT Image Nov 21, 2025, 03_50_14 AM.png',
    icon: Target,
    color: '#10b981',
    date: '2024',
    category: 'Competition',
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
      className="relative w-full min-h-screen py-12 px-4 overflow-hidden flex items-center"
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
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-8">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-4"
            style={{ 
              textShadow: '0 0 60px rgba(251, 191, 36, 0.6), 0 0 100px rgba(251, 146, 60, 0.4)',
              filter: 'drop-shadow(0 0 40px rgba(251, 191, 36, 0.5))',
            }}
          >
            Achievements & Awards
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-2">
            Recognition and milestones achieved through dedication, innovation, and continuous learning
          </p>
          <p className="text-gray-500 text-xs">
            {currentIndex + 1} of {achievementsData.length}
          </p>
        </div>

        {/* Navigation Container */}
        <div className="relative min-h-[400px] md:min-h-[500px] flex items-center">
          {/* Previous Button */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-48 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50"
              style={{
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)',
              }}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Achievement Content */}
          <div ref={contentRef} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Side - Achievement Details */}
            <div className="flex flex-col justify-center space-y-4 md:space-y-6 lg:-ml-20">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2">
                <div
                  className="px-4 py-2 rounded-full text-xs md:text-sm font-bold backdrop-blur-lg"
                  style={{
                    background: `linear-gradient(135deg, ${currentAchievement.color}, ${currentAchievement.color}80)`,
                    boxShadow: `0 0 30px ${currentAchievement.color}60`,
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
                      boxShadow: `0 0 20px ${currentAchievement.color}`,
                    }}
                  />
                  <span className="text-sm md:text-base font-semibold" style={{ color: currentAchievement.color }}>
                    {currentAchievement.date}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 
                className="text-2xl md:text-4xl font-bold text-white leading-tight"
                style={{
                  textShadow: `0 0 30px ${currentAchievement.color}40`,
                }}
              >
                {currentAchievement.title}
              </h3>

              {/* Description */}
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {currentAchievement.description}
              </p>

              {/* Additional Details */}
              <div 
                className="p-4 md:p-5 rounded-xl md:rounded-2xl backdrop-blur-lg border-2"
                style={{
                  background: `linear-gradient(135deg, ${currentAchievement.color}10, ${currentAchievement.color}05)`,
                  borderColor: `${currentAchievement.color}40`,
                  boxShadow: `0 0 30px ${currentAchievement.color}20`,
                }}
              >
                <h4 className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Achievement Highlights</h4>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2 text-sm md:text-base text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: currentAchievement.color }} />
                    <span>Recognized for excellence and innovation</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm md:text-base text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: currentAchievement.color }} />
                    <span>Demonstrated outstanding skills and dedication</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm md:text-base text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: currentAchievement.color }} />
                    <span>Contributing to professional growth and impact</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Award Visual */}
            <div className="flex items-center justify-center">
              <div className="relative scale-100 md:scale-110 -ml-16 md:-ml-24">
                {/* Decorative glow effects */}
                <div 
                  className="absolute inset-0 opacity-20 animate-pulse"
                  style={{
                    background: `radial-gradient(circle, ${currentAchievement.color}, transparent 70%)`,
                    filter: 'blur(40px)',
                    animationDuration: '3s',
                  }}
                />

                {/* Main icon container - NO circle background */}
                <div className="relative w-[28rem] h-[28rem] md:w-[32rem] md:h-[32rem] flex items-center justify-center group">
                  {/* Icon or Image */}
                  {(() => {
                    if (currentAchievement.image) {
                      return (
                        <img
                          src={currentAchievement.image}
                          alt={currentAchievement.title}
                          className="w-96 h-96 md:w-[28rem] md:h-[28rem] object-contain relative z-10 drop-shadow-2xl"
                          style={{
                            filter: `drop-shadow(0 0 40px ${currentAchievement.color}) drop-shadow(0 0 60px ${currentAchievement.color}80)`,
                          }}
                        />
                      );
                    }
                    const Icon = currentAchievement.icon;
                    return (
                      <Icon 
                        className="w-80 h-80 md:w-96 md:h-96 relative z-10 drop-shadow-2xl"
                        style={{ 
                          color: currentAchievement.color,
                          filter: `drop-shadow(0 0 40px ${currentAchievement.color}) drop-shadow(0 0 60px ${currentAchievement.color}80)`,
                        }}
                      />
                    );
                  })()}
                </div>

                {/* Floating particles */}
                <div className="absolute top-10 right-10 w-4 h-4 rounded-full" style={{ background: currentAchievement.color, animation: 'float1 4s ease-in-out infinite', opacity: 0.7 }} />
                <div className="absolute bottom-10 left-10 w-3 h-3 rounded-full" style={{ background: currentAchievement.color, animation: 'float2 5s ease-in-out infinite', opacity: 0.7 }} />
                <div className="absolute top-1/2 right-5 w-2 h-2 rounded-full" style={{ background: currentAchievement.color, animation: 'float3 4.5s ease-in-out infinite', opacity: 0.7 }} />
              </div>
            </div>
          </div>

          {/* Next Button */}
          {currentIndex < achievementsData.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-20 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
              style={{
                boxShadow: '0 0 30px rgba(251, 146, 60, 0.5)',
              }}
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
