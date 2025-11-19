import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { X, ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Quantum Dashboard',
    description: 'A futuristic data visualization platform with real-time 3D analytics',
    tech: ['React', 'Three.js', 'WebGL'],
    color: '#00ffff',
  },
  {
    title: 'Neural Network Visualizer',
    description: 'Interactive 3D visualization of machine learning algorithms',
    tech: ['TypeScript', 'GSAP', 'Canvas'],
    color: '#a855f7',
  },
  {
    title: 'Holographic Portfolio',
    description: 'Award-winning immersive portfolio experience',
    tech: ['React', 'R3F', 'Shaders'],
    color: '#06b6d4',
  },
  {
    title: 'Cyber Commerce',
    description: 'Next-gen e-commerce platform with AR product previews',
    tech: ['Next.js', 'WebXR', 'Three.js'],
    color: '#ec4899',
  },
];

function ProjectCard3D({
  project,
  index,
  total,
  currentIndex,
}: {
  project: typeof projects[0];
  index: number;
  total: number;
  currentIndex: number;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current) {
      const offset = index - currentIndex;
      const targetX = offset * 3;
      const targetZ = Math.abs(offset) * -2;
      const targetScale = offset === 0 ? 1.2 : 0.8;

      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.1;
      meshRef.current.position.z += (targetZ - meshRef.current.position.z) * 0.1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );

      meshRef.current.rotation.y = Math.sin(Date.now() * 0.001 + index) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      <RoundedBox args={[2, 2.5, 0.1]} radius={0.1}>
        <meshStandardMaterial
          color={project.color}
          metalness={0.9}
          roughness={0.1}
          emissive={project.color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </RoundedBox>
      <Text
        position={[0, 0.8, 0.1]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {project.title}
      </Text>
    </group>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

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

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-12 text-center"
          style={{ textShadow: '0 0 40px rgba(0, 255, 255, 0.3)' }}
        >
          Featured Projects
        </h2>

        <div className="h-[500px] relative">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

            {projects.map((project, index) => (
              <ProjectCard3D
                key={index}
                project={project}
                index={index}
                total={projects.length}
                currentIndex={currentIndex}
              />
            ))}
          </Canvas>

          <button
            onClick={prevProject}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 flex items-center justify-center hover:bg-cyan-500/40 transition-all"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
          >
            <span className="text-2xl text-cyan-400">‹</span>
          </button>

          <button
            onClick={nextProject}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/50 flex items-center justify-center hover:bg-cyan-500/40 transition-all"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
          >
            <span className="text-2xl text-cyan-400">›</span>
          </button>
        </div>

        <div className="mt-12">
          <div
            className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/30 max-w-2xl mx-auto text-center"
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.2)',
            }}
          >
            <h3 className="text-3xl font-bold text-cyan-400 mb-4">
              {projects[currentIndex].title}
            </h3>
            <p className="text-lg text-cyan-100 mb-6">{projects[currentIndex].description}</p>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {projects[currentIndex].tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelectedProject(currentIndex)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform"
              style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {selectedProject !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="relative max-w-3xl w-full p-8 rounded-2xl backdrop-blur-lg bg-slate-900/90 border border-cyan-500/50 animate-[scale-in_0.3s_ease-out]"
            style={{
              boxShadow: '0 0 60px rgba(0, 255, 255, 0.4)',
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center hover:bg-red-500/40 transition-all"
            >
              <X className="text-red-400" />
            </button>

            <h3 className="text-4xl font-bold text-cyan-400 mb-4">
              {projects[selectedProject].title}
            </h3>
            <p className="text-lg text-cyan-100 mb-6">
              {projects[selectedProject].description}
            </p>

            <div className="mb-6">
              <h4 className="text-xl font-semibold text-cyan-300 mb-3">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {projects[selectedProject].tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <ExternalLink size={20} />
                Live Demo
              </button>
              <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2">
                <Github size={20} />
                View Code
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
