import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function HologramCard() {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <RoundedBox args={[2, 2.5, 0.2]} radius={0.1}>
        <meshStandardMaterial
          color="#00ffff"
          metalness={0.9}
          roughness={0.1}
          emissive="#00ffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </RoundedBox>
    </Float>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState('');

  const fullText = `I'm a passionate creative developer specializing in immersive 3D web experiences.
  With expertise in modern web technologies and a keen eye for design, I craft digital experiences
  that push the boundaries of what's possible on the web. My work combines technical precision with
  artistic vision to create memorable, interactive journeys that captivate and inspire.`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-4 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-20 text-center"
          style={{ textShadow: '0 0 40px rgba(0, 255, 255, 0.3)' }}
        >
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="h-96 relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
              <HologramCard />
            </Canvas>

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
                style={{
                  boxShadow: '0 0 60px rgba(0, 255, 255, 0.6), inset 0 0 40px rgba(0, 255, 255, 0.3)',
                }}
              >
                <User size={80} className="text-white" />
              </div>
            </div>
          </div>

          <div ref={textRef} className="space-y-6">
            <div
              className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/30"
              style={{
                boxShadow: '0 0 40px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.1)',
              }}
            >
              <p className="text-lg text-cyan-100 leading-relaxed">
                {displayedText}
                <span className="inline-block w-2 h-6 bg-cyan-400 ml-1 animate-pulse" />
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Years Experience', value: '5+' },
                { label: 'Projects Completed', value: '50+' },
                { label: 'Happy Clients', value: '30+' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-cyan-500/20 text-center hover:border-cyan-400/50 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
                  }}
                >
                  <div className="text-3xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                  <div className="text-xs text-cyan-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
