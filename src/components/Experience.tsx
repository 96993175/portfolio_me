import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Award, Rocket, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    year: '2023 - Present',
    title: 'Senior Creative Developer',
    company: 'Future Labs Inc.',
    description: 'Leading development of cutting-edge 3D web experiences and immersive digital products.',
    icon: Rocket,
  },
  {
    year: '2021 - 2023',
    title: '3D Web Developer',
    company: 'Digital Innovations',
    description: 'Developed interactive WebGL experiences and led frontend architecture initiatives.',
    icon: Code,
  },
  {
    year: '2020 - 2021',
    title: 'Frontend Developer',
    company: 'Tech Solutions',
    description: 'Built responsive web applications and implemented modern UI/UX designs.',
    icon: Briefcase,
  },
  {
    year: '2019',
    title: 'Award: Best Web Experience',
    company: 'WebGL Conference',
    description: 'Received recognition for innovative use of 3D technologies in web development.',
    icon: Award,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          duration: 1,
          ease: 'power3.out',
        });

        const node = item.querySelector('.timeline-node');
        gsap.from(node, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          scale: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.3,
        });
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .05) 25%, rgba(0, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .05) 75%, rgba(0, 255, 255, .05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .05) 25%, rgba(0, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .05) 75%, rgba(0, 255, 255, .05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <h2
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-20 text-center"
          style={{ textShadow: '0 0 40px rgba(0, 255, 255, 0.3)' }}
        >
          Experience
        </h2>

        <div ref={timelineRef} className="relative">
          <div
            className="timeline-line absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform -translate-x-1/2"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
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
                    className="p-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300"
                    style={{
                      boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon
                        className="text-cyan-400"
                        size={24}
                        style={{
                          filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))',
                        }}
                      />
                      <span className="text-cyan-400 font-semibold">{exp.year}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-cyan-300 font-semibold mb-3">{exp.company}</p>
                    <p className="text-cyan-100/80">{exp.description}</p>
                  </div>
                </div>

                <div
                  className="timeline-node absolute left-1/2 top-0 transform -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400"
                  style={{
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)',
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
  );
}
