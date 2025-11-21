import { useRef } from 'react';
import './Carousel3D.css';

interface SkillCard {
  id: number;
  title: string;
  icon: string;
  level: string;
  color: string;
}

const Carousel3D = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Skill cards data
  const skills: SkillCard[] = [
    { id: 1, title: 'AI', icon: '🤖', level: 'Advanced', color: '#61DAFB' },
    { id: 2, title: 'React', icon: '⚛️', level: 'Intermediate', color: '#3178C6' },
    { id: 3, title: 'Node.js', icon: '🟢', level: 'Intermediate', color: '#339933' },
    { id: 4, title: 'Python', icon: '🐍', level: 'Advanced', color: '#3776AB' },
    { id: 5, title: 'Design', icon: '🎨', level: 'Intermediate', color: '#FF6B6B' },
    { id: 6, title: 'Cloud', icon: '☁️', level: 'Intermediate', color: '#FF9900' },
  ];

  return (
    <div className="carousel-container">
      <div className="carousel-scene" ref={carouselRef}>
        {/* 3D Glass Reflective Floor */}
        <div className="glass-floor">
          <div className="glass-floor-surface">
            <div className="glass-floor-reflection"></div>
            <div className="glass-floor-glow-streak"></div>
          </div>
          <div className="glass-floor-edge-fade"></div>
        </div>

        {/* Central 3D Portrait */}
        <div className="central-portrait" ref={portraitRef}>
          {/* Multi-layer neon glow */}
          <div className="portrait-glow-outer"></div>
          <div className="portrait-glow-inner"></div>
          
          {/* Portrait container */}
          <div className="portrait-frame">
            <img 
              src="/54544545.jpg" 
              alt="Dhairyashil" 
              className="portrait-image"
            />
            {/* Gradient overlay */}
            <div className="portrait-overlay"></div>
            {/* Holographic shine on hover */}
            <div className="portrait-shine"></div>
          </div>
        </div>

        {/* Orbiting skill cards */}
        <div className="orbit-container" ref={orbitRef}>
          {skills.map((skill, index) => {
            const delay = index * (10 / skills.length);
            const angle = (index / skills.length) * 360;
            
            return (
              <div
                key={skill.id}
                className="orbit-path"
                style={{
                  animationDelay: `-${delay}s`,
                }}
                data-angle={angle}
              >
                <div className="skill-card" style={{ '--card-color': skill.color } as React.CSSProperties}>
                  <div className="skill-card-inner">
                    <div className="skill-icon">{skill.icon}</div>
                    <h3 className="skill-title">{skill.title}</h3>
                    <p className="skill-level">{skill.level}</p>
                    <div className="card-glow"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel3D;
