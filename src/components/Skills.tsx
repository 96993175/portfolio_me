import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Code, Palette, Boxes, Zap, Database, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { icon: Code, label: 'React', color: '#61DAFB' },
  { icon: Boxes, label: 'Three.js', color: '#000000' },
  { icon: Zap, label: 'GSAP', color: '#88CE02' },
  { icon: Palette, label: 'Design', color: '#FF6B6B' },
  { icon: Database, label: 'Backend', color: '#4CAF50' },
  { icon: Globe, label: 'WebGL', color: '#FF9800' },
];

function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;

      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.8, 32, 32]}>
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0.2}
      />
    </Sphere>
  );
}

function SkillOrbit({ skill, index, total }: { skill: typeof skills[0]; index: number; total: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      const angle = (index / total) * Math.PI * 2 + state.clock.elapsedTime * 0.5;
      const radius = 3;

      groupRef.current.position.x = Math.cos(angle) * radius;
      groupRef.current.position.z = Math.sin(angle) * radius;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;

      groupRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere
        args={[0.3, 16, 16]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 1 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
      <Html distanceFactor={8}>
        <div
          className="px-3 py-1 bg-black/80 backdrop-blur-sm rounded-full border border-cyan-500/50 whitespace-nowrap"
          style={{
            transform: 'translate(-50%, 20px)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <span className="text-cyan-400 text-sm font-semibold">{skill.label}</span>
        </div>
      </Html>
    </group>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full pt-24 pb-12 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-12 text-center"
          style={{ textShadow: '0 0 40px rgba(168, 85, 247, 0.4)' }}
        >
          Skills & Expertise
        </h2>

        <div className="h-[600px] relative">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

            <CoreOrb />

            {skills.map((skill, index) => (
              <SkillOrbit key={index} skill={skill} index={index} total={skills.length} />
            ))}
          </Canvas>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-xl backdrop-blur-lg bg-white/5 border border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 text-center"
                style={{
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)',
                }}
              >
                <Icon
                  size={32}
                  className="mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))',
                  }}
                />
                <div className="text-sm font-semibold text-cyan-300">{skill.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
