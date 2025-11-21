import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';

interface FuturisticCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onViewProject?: () => void;
}

export default function FuturisticCard({
  title,
  description,
  icon,
  color,
  onViewProject,
}: FuturisticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 20,
  });

  // Auto-rotate when not hovering
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        // This will be handled by framer-motion's animate prop
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(percentX);
    mouseY.set(percentY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative flex items-center justify-center min-h-[500px]" style={{ perspective: '2000px' }}>
      {/* Ambient glow */}
      <motion.div
        className="absolute w-[600px] h-[400px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: `radial-gradient(circle, ${color}40, transparent 70%)`,
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.5 : 0.3,
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Floating shadow */}
      <motion.div
        className="absolute bottom-[-40px] w-[500px] h-[40px] rounded-full bg-black/40 blur-2xl"
        animate={{
          scaleX: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Main 3D Card */}
      <motion.div
        ref={cardRef}
        className="relative w-full max-w-[600px] h-[320px] sm:h-[350px] md:h-[320px] cursor-pointer mx-4"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
        animate={{
          rotateY: isHovered ? [0, 0] : [0, 360],
        }}
        transition={{
          rotateY: {
            duration: isHovered ? 0 : 20,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Outer neon glow border */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${color}60, ${color}40, ${color}60)`,
            filter: 'blur(8px)',
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0.5,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Glass card container */}
        <motion.div
          className="absolute inset-[2px] rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${color}40`,
            boxShadow: `0 0 60px ${color}30, inset 0 0 60px rgba(255, 255, 255, 0.03)`,
          }}
          animate={{
            borderColor: isHovered ? `${color}80` : `${color}40`,
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Reflective glass highlight */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)',
            }}
            animate={{
              opacity: isHovered ? 0.3 : 0.2,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Animated shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-0"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${color}20 50%, transparent 100%)`,
            }}
            animate={{
              x: isHovered ? ['-100%', '200%'] : '-100%',
              opacity: isHovered ? [0, 0.5, 0] : 0,
            }}
            transition={{
              duration: 1.5,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 1,
            }}
          />

          {/* Content Container */}
          <div className="relative h-full p-6 sm:p-8 md:p-10 flex flex-col justify-between">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Project Label */}
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}40`,
                  }}
                  animate={{
                    borderColor: isHovered ? `${color}60` : `${color}40`,
                  }}
                >
                  <Sparkles className="w-3 h-3" style={{ color }} />
                  <span className="text-xs font-semibold tracking-wider uppercase" style={{ color }}>
                    Featured Project
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight"
                  style={{
                    textShadow: `0 0 30px ${color}60`,
                  }}
                  animate={{
                    textShadow: isHovered
                      ? `0 0 40px ${color}80, 0 0 60px ${color}40`
                      : `0 0 30px ${color}60`,
                  }}
                >
                  {title}
                </motion.h3>

                {/* Description */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md">
                  {description}
                </p>
              </div>

              {/* Icon */}
              <motion.div
                className="text-4xl sm:text-5xl md:text-6xl ml-4 sm:ml-6"
                style={{
                  filter: `drop-shadow(0 0 20px ${color}80)`,
                }}
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  rotate: isHovered ? [0, 10, -10, 0] : 0,
                  filter: isHovered
                    ? `drop-shadow(0 0 30px ${color})`
                    : `drop-shadow(0 0 20px ${color}80)`,
                }}
                transition={{
                  rotate: { duration: 0.5 },
                  scale: { duration: 0.3 },
                }}
              >
                {icon}
              </motion.div>
            </div>

            {/* Bottom Section - Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <motion.button
                className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${color}80, ${color}60)`,
                  boxShadow: `0 0 30px ${color}40`,
                }}
                animate={{
                  boxShadow: isHovered
                    ? `0 0 50px ${color}60, 0 0 80px ${color}30`
                    : `0 0 30px ${color}40`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 60px ${color}80, 0 0 100px ${color}50`,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={onViewProject}
                transition={{ duration: 0.2 }}
              >
                {/* Button glow effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />

                <span className="relative flex items-center gap-2">
                  View Project
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              {/* Tech indicator dots */}
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: color,
                      boxShadow: `0 0 10px ${color}`,
                    }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Corner accents */}
        {[
          { top: '8px', left: '8px', rotate: '0deg' },
          { top: '8px', right: '8px', rotate: '90deg' },
          { bottom: '8px', left: '8px', rotate: '-90deg' },
          { bottom: '8px', right: '8px', rotate: '180deg' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6"
            style={{
              ...pos,
              border: `2px solid ${color}`,
              borderRight: 'none',
              borderBottom: 'none',
              transform: `rotate(${pos.rotate})`,
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0.5,
              filter: isHovered
                ? `drop-shadow(0 0 12px ${color})`
                : `drop-shadow(0 0 8px ${color})`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
