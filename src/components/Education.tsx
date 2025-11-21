import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  FileCheck, 
  Star,
  TrendingUp,
  Code,
  Trophy,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    year: '2024 - present',
    degree: 'Bachelor of Engineering',
    institution: 'Savitribai Phule Pune University',
    field: 'Computer Engineering',
    description: 'Focused on software development, data structures, algorithms, and web technologies. Completed major projects in full-stack development and machine learning.',
    icon: GraduationCap,
    achievements: [
      'Dean\'s List - 3 semesters',
      'Best Project Award 2023',
      'Academic Excellence Scholarship'
    ],
    highlights: ['Machine Learning', 'Web Development', 'Data Structures'],
    color: '#a855f7',
  },
  {
    year: '2022 - 2024',
    degree: 'Higher Secondary Certificate',
    institution: 'Bharat Vidyalya Makni',
    field: 'Science Stream',
    description: 'Completed with distinction in Mathematics, Physics, and Computer Science. Developed strong analytical and problem-solving foundations.',
    icon: BookOpen,
    grade: 'Percentage: 79%',
    achievements: [
      'Top 5% in District',
      'Science Olympiad Winner',
      'Perfect Score in Computer Science'
    ],
    highlights: ['Mathematics', 'Physics', 'Computer Science'],
    color: '#06b6d4',
  },
];

const courses = [
  {
    title: 'HarvardX: CS50s Introduction to Computer Science',
    provider: 'Edx',
    icon: FileCheck,
    skills: ['Python', 'Ai', 'HTML', 'CSS'],
    color: '#00ffff',
    completion: '100%',
    certified: true,
  },
  {
    title: 'HarvardX: CS50s introduction to programming with python',
    provider: 'Edx',
    icon: Award,
    skills: ['functions', 'loops', 'conditionals', 'file I/O'],
    color: '#a855f7',
    completion: '100%',
    certified: true,
  },
  {
    title: 'AI Engineer Agentic Track',
    provider: 'Udemy',
    icon: FileCheck,
    skills: ['Ai', 'Ai Agents', 'Data Science', 'Development'],
    color: '#06b6d4',
    completion: '100%',
    certified: true,
  },
  {
    title: 'AI for Everyone',
    provider: 'Edx',
    icon: Award,
    skills: ['Generative AI', 'Machine Learning', 'NLP', 'Ai for cloud'],
    color: '#ec4899',
    completion: '100%',
    certified: true,
  },
  {
    title: 'AI Applications and Prompt Engineering',
    provider: 'Edx',
    icon: Trophy,
    skills: ['Prompting', 'AI basics', 'AI applications', 'Development'],
    color: '#f59e0b',
    completion: '100%',
    certified: true,
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const educationTitleRef = useRef<HTMLHeadingElement>(null);
  const coursesTitleRef = useRef<HTMLHeadingElement>(null);
  const certificatesTitleRef = useRef<HTMLHeadingElement>(null);
  const certificatesGridRef = useRef<HTMLDivElement>(null);
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [currentCertificatePage, setCurrentCertificatePage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const certificatesPerPage = 8;

  const certificates = [
    { name: 'Hack2skill Certificate 1', image: '/certificates/Hack2skill-Certificate (4).png' },
    { name: 'Hack2skill Certificate 2', image: '/certificates/Hack2skill-Certificate (3).png' },
    { name: 'Dhairyashil Shinde Certificate', image: '/certificates/Dhairyashil Shinde (3).png' },
    { name: 'Achievement Certificate', image: '/certificates/Dhairyashil Deepak Shinde-Certificate.png' },
    { name: 'Professional Certification', image: '/certificates/4d7b641d-0da6-44ce-a5b5-ba8a4dd00180 (1).jpg' },
    { name: 'Course Completion', image: '/certificates/20_20250930_112806_0019.png' },
    { name: 'Technical Certificate', image: '/certificates/1PFZZ90WE9 (2).png' },
    { name: 'Excellence Award', image: '/certificates/135 (1).png' },
    { name: 'Additional Certificate', image: '/certificates/image.png' },
    { name: 'Development Achievement', image: '/certificates/Screenshot 2025-11-21 013055.png' },
    { name: 'Programming Certificate', image: '/certificates/Screenshot 2025-11-21 013248.png' },
    { name: 'Technical Excellence', image: '/certificates/Screenshot 2025-11-21 013436.png' },
    { name: 'Advanced Training', image: '/certificates/Screenshot 2025-11-21 013608.png' },
    { name: 'Skill Development', image: '/certificates/Screenshot 2025-11-21 013703.png' },
  ];

  const totalPages = Math.ceil(certificates.length / certificatesPerPage);
  const displayedCertificates = certificates.slice(
    currentCertificatePage * certificatesPerPage,
    (currentCertificatePage + 1) * certificatesPerPage
  );

  const handlePreviousPage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Animate out
    gsap.to(certificatesGridRef.current, {
      opacity: 0,
      x: 100,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentCertificatePage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
        
        // Animate in from left
        gsap.fromTo(certificatesGridRef.current,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => setIsTransitioning(false)
          }
        );
      }
    });
  };

  const handleNextPage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Animate out
    gsap.to(certificatesGridRef.current, {
      opacity: 0,
      x: -100,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentCertificatePage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
        
        // Animate in from right
        gsap.fromTo(certificatesGridRef.current,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => setIsTransitioning(false)
          }
        );
      }
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate education title
      gsap.from(educationTitleRef.current, {
        scrollTrigger: {
          trigger: educationTitleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate stats
      const stats = document.querySelectorAll('.stat-item');
      gsap.from(stats, {
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 80%',
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Animate courses title
      gsap.from(coursesTitleRef.current, {
        scrollTrigger: {
          trigger: coursesTitleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate certificates title
      gsap.from(certificatesTitleRef.current, {
        scrollTrigger: {
          trigger: certificatesTitleRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'back.out(1.7)',
      });

      // Animate timeline
      const timeline = document.querySelector('.education-timeline');
      if (timeline) {
        gsap.from(timeline, {
          scrollTrigger: {
            trigger: timeline,
            start: 'top 80%',
          },
          scaleY: 0,
          transformOrigin: 'top',
          duration: 1.5,
          ease: 'power3.out',
        });
      }

      // Animate education cards
      const educationCards = document.querySelectorAll('.education-card');
      educationCards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          duration: 1,
          ease: 'power3.out',
        });
      });

      // Animate course cards
      const courseCards = document.querySelectorAll('.course-card');
      gsap.from(courseCards, {
        scrollTrigger: {
          trigger: '.courses-grid',
          start: 'top 75%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });

      // Animate certificate cards
      const certificateCards = document.querySelectorAll('.certificate-card');
      gsap.from(certificateCards, {
        scrollTrigger: {
          trigger: '.certificates-grid',
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.8,
        rotateY: 90,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-12 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1d2542 0%, #111a3a 50%, #0b1228 100%)',
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
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Education Section */}
        <div className="mb-16">
          <div className="text-center mb-8 relative">
            {/* Top decorative line */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500 to-purple-500" />
              <div className="mx-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{ animationDuration: '2s' }} />
                <GraduationCap className="w-6 h-6 text-purple-400" style={{ filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.8))' }} />
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-cyan-500 to-cyan-500" />
            </div>

            {/* Main heading with enhanced effects */}
            <div className="relative inline-block">
              <h2
                ref={educationTitleRef}
                className="relative text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
                style={{ 
                  background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 25%, #06b6d4 50%, #a855f7 75%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '0.02em',
                }}
              >
                EDUCATION JOURNEY
              </h2>

              {/* Underline accent */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-pink-500" 
                  style={{ 
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
                    animation: 'expandContract 2s ease-in-out infinite',
                  }} 
                />
                <div className="w-3 h-3 rotate-45 bg-gradient-to-br from-purple-500 to-pink-500" 
                  style={{ 
                    boxShadow: '0 0 15px rgba(236, 72, 153, 0.8)',
                    animation: 'pulse 2s ease-in-out infinite',
                  }} 
                />
                <div className="h-1 w-20 rounded-full bg-gradient-to-l from-transparent via-cyan-500 to-blue-500" 
                  style={{ 
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
                    animation: 'expandContract 2s ease-in-out infinite',
                    animationDelay: '1s',
                  }} 
                />
              </div>
            </div>

            {/* Subtitle with enhanced styling */}
            <div className="mt-6 relative">
              <p className="text-white text-base md:text-lg max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
                style={{
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                Building a strong foundation through quality education and continuous learning
              </p>
            </div>

            {/* Bottom decorative elements */}
            <div className="mt-6 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  style={{
                    animation: 'twinkle 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                    boxShadow: '0 0 10px rgba(168, 85, 247, 0.6)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Education Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationData.map((edu, index) => {
              const Icon = edu.icon;
              
              return (
                <div
                  key={index}
                  className="education-card animated group relative"
                >
                  <div
                    className="h-full p-5 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-2 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                    style={{
                      borderColor: `${edu.color}40`,
                      boxShadow: `0 0 30px ${edu.color}20, 0 10px 30px rgba(0,0,0,0.3)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${edu.color}80`;
                      e.currentTarget.style.boxShadow = `0 0 50px ${edu.color}50, 0 0 100px ${edu.color}30, 0 20px 50px rgba(0,0,0,0.5)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${edu.color}40`;
                      e.currentTarget.style.boxShadow = `0 0 30px ${edu.color}20, 0 10px 30px rgba(0,0,0,0.3)`;
                    }}
                  >
                    {/* Decorative corner accent */}
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20 group-hover:opacity-30 transition-opacity"
                      style={{
                        background: `radial-gradient(circle at top right, ${edu.color}, transparent 70%)`,
                      }}
                    />

                    {/* Icon Badge */}
                    <div className="relative mb-4">
                      <div 
                        className="inline-flex w-14 h-14 rounded-xl items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${edu.color}40, ${edu.color}20)`,
                          border: `2px solid ${edu.color}60`,
                          boxShadow: `0 0 20px ${edu.color}50, inset 0 0 15px ${edu.color}20`,
                        }}
                      >
                        <Icon className="text-white w-7 h-7" />
                      </div>
                      {/* Floating year badge */}
                      <div 
                        className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                        style={{
                          background: `linear-gradient(135deg, ${edu.color}, ${edu.color}80)`,
                          boxShadow: `0 0 15px ${edu.color}60`,
                          color: 'white',
                        }}
                      >
                        {edu.year}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-opacity-90 transition-colors">
                        {edu.degree}
                      </h3>
                      
                      <p className="text-base font-bold mb-1.5" style={{ color: edu.color }}>
                        {edu.field}
                      </p>
                      
                      <p className="text-pink-400/90 font-medium mb-3 flex items-center gap-2 text-sm">
                        <GraduationCap className="w-4 h-4" />
                        {edu.institution}
                      </p>
                      
                      <div 
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3"
                        style={{
                          background: `${edu.color}15`,
                          border: `1px solid ${edu.color}40`,
                        }}
                      >
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-bold text-base">{edu.grade}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed mb-4 text-xs">
                        {edu.description}
                      </p>

                      {/* Highlights */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                          <Star className="w-3 h-3" style={{ color: edu.color }} />
                          Key Highlights
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {edu.highlights.map((highlight, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                              style={{
                                background: `${edu.color}20`,
                                border: `1px solid ${edu.color}60`,
                                color: edu.color,
                              }}
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Courses & Certifications Section */}
        <div>
          <div className="text-center mb-8 relative">
            {/* Top decorative line */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-cyan-500 to-cyan-500" />
              <div className="mx-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style={{ animationDuration: '2s' }} />
                <Award className="w-6 h-6 text-cyan-400" style={{ filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))' }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-blue-500 to-blue-500" />
            </div>

            {/* Main heading with enhanced effects */}
            <div className="relative inline-block">
              <h2
                ref={coursesTitleRef}
                className="relative text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
                style={{ 
                  background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 25%, #a855f7 50%, #06b6d4 75%, #3b82f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '0.02em',
                }}
              >
                COURSES & CERTIFICATIONS
              </h2>

              {/* Underline accent */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-cyan-500 to-blue-500" 
                  style={{ 
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.8)',
                    animation: 'expandContract 2s ease-in-out infinite',
                  }} 
                />
                <div className="w-3 h-3 rotate-45 bg-gradient-to-br from-cyan-500 to-blue-500" 
                  style={{ 
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.8)',
                    animation: 'pulse 2s ease-in-out infinite',
                  }} 
                />
                <div className="h-1 w-20 rounded-full bg-gradient-to-l from-transparent via-purple-500 to-blue-500" 
                  style={{ 
                    boxShadow: '0 0 20px rgba(168, 85, 247, 0.8)',
                    animation: 'expandContract 2s ease-in-out infinite',
                    animationDelay: '1s',
                  }} 
                />
              </div>
            </div>

            {/* Subtitle with enhanced styling */}
            <div className="mt-6 relative">
              <p className="text-white text-base md:text-lg max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
                style={{
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                Continuously expanding skills through professional certifications and specialized training
              </p>
            </div>

            {/* Bottom decorative elements */}
            <div className="mt-6 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{
                    animation: 'twinkle 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.6)',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="courses-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course, index) => {
              const Icon = course.icon;
              const isHovered = hoveredCourse === index;
              
              return (
                <div
                  key={index}
                  className="course-card animated group relative"
                  onMouseEnter={() => setHoveredCourse(index)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <div
                    className="h-full p-4 rounded-xl backdrop-blur-lg bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                    style={{
                      borderColor: isHovered ? `${course.color}80` : `${course.color}40`,
                      boxShadow: isHovered 
                        ? `0 0 40px ${course.color}50, 0 0 80px ${course.color}30, 0 20px 40px rgba(0,0,0,0.4)` 
                        : `0 0 20px ${course.color}20`,
                    }}
                  >
                    {/* Certified Badge */}
                    {course.certified && (
                      <div 
                        className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform"
                        style={{
                          background: `linear-gradient(135deg, ${course.color}, ${course.color}80)`,
                          boxShadow: `0 0 20px ${course.color}60`,
                        }}
                      >
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    )}

                    {/* Decorative gradient overlay */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${course.color}60, transparent 70%)`,
                      }}
                    />

                    <div className="relative h-full flex flex-col">
                      {/* Icon and Title */}
                      <div className="flex items-start gap-3 mb-3">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${course.color}30, ${course.color}10)`,
                            border: `2px solid ${course.color}60`,
                            boxShadow: `0 0 15px ${course.color}30`,
                          }}
                        >
                          <Icon style={{ color: course.color }} className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 
                            className="text-base font-bold text-white mb-1 group-hover:text-opacity-90 transition-colors line-clamp-2"
                          >
                            {course.title}
                          </h3>
                          <p className="text-gray-400 text-xs flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            {course.provider}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-xs text-gray-400">Completion</span>
                          <span className="text-xs font-bold" style={{ color: course.color }}>
                            {course.completion}
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: course.completion,
                              background: `linear-gradient(90deg, ${course.color}, ${course.color}80)`,
                              boxShadow: `0 0 10px ${course.color}60`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mt-auto">
                        <h4 className="text-xs font-semibold text-gray-400 mb-1.5">Skills Acquired</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {course.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105"
                              style={{
                                background: `${course.color}15`,
                                border: `1px solid ${course.color}50`,
                                color: course.color,
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certificates Gallery Section */}
        <div className="mt-20">
          <div className="text-center mb-8 relative">
            {/* Top decorative line */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-500 to-yellow-500" />
              <div className="mx-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" style={{ animationDuration: '2s' }} />
                <Trophy className="w-6 h-6 text-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              </div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent via-orange-500 to-orange-500" />
            </div>

            {/* Main heading with enhanced effects */}
            <div className="relative inline-block">
              <h2
                ref={certificatesTitleRef}
                className="relative text-5xl md:text-6xl lg:text-7xl font-black tracking-tight"
                style={{ 
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #ef4444 50%, #fbbf24 75%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '0.02em',
                }}
              >
                CERTIFICATES GALLERY
              </h2>

              {/* Underline accent */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-1 w-20 rounded-full bg-gradient-to-r from-transparent via-yellow-500 to-orange-500" 
                  style={{ 
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
                    animation: 'expandContract 2s ease-in-out infinite',
                  }} 
                />
                <div className="w-3 h-3 rotate-45 bg-gradient-to-br from-yellow-500 to-orange-500" 
                  style={{ 
                    boxShadow: '0 0 15px rgba(245, 158, 11, 0.8)',
                    animation: 'pulse 2s ease-in-out infinite',
                  }} 
                />
                <div className="h-1 w-20 rounded-full bg-gradient-to-l from-transparent via-red-500 to-orange-500" 
                  style={{ 
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
                    animation: 'expandContract 2s ease-in-out infinite',
                    animationDelay: '1s',
                  }} 
                />
              </div>
            </div>

            {/* Subtitle with enhanced styling */}
            <div className="mt-6 relative">
              <p className="text-gray-500 text-sm">
                Page {currentCertificatePage + 1} of {totalPages} • {certificates.length} Total Certificates
              </p>
            </div>

            {/* Bottom decorative elements */}
            <div className="mt-6 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                  style={{
                    animation: 'twinkle 1.5s ease-in-out infinite',
                    animationDelay: `${i * 0.2}s`,
                    boxShadow: '0 0 10px rgba(251, 191, 36, 0.6)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Navigation and Grid Container */}
          <div className="relative">
            {/* Previous Button */}
            {totalPages > 1 && currentCertificatePage > 0 && (
              <button
                onClick={handlePreviousPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-16 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50"
                style={{
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.5)',
                }}
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}

            {/* Certificates Grid */}
            <div ref={certificatesGridRef} className="certificates-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedCertificates.map((certificate, index) => {
                const actualIndex = currentCertificatePage * certificatesPerPage + index;
                return (
                  <div
                    key={actualIndex}
                    className="certificate-card animated group relative cursor-pointer"
                    onClick={() => setSelectedCertificate(certificate.image)}
                  >
                    <div
                      className="relative h-48 rounded-xl overflow-hidden backdrop-blur-lg bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-yellow-500/30 transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:border-yellow-400/60"
                      style={{
                        boxShadow: '0 0 30px rgba(251, 191, 36, 0.2)',
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 50px rgba(251, 191, 36, 0.5), 0 0 100px rgba(251, 191, 36, 0.3), 0 20px 50px rgba(0,0,0,0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(251, 191, 36, 0.2)';
                      }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                        style={{
                          transform: 'translateX(-100%) rotate(45deg)',
                          transition: 'transform 0.8s',
                        }}
                      />
                      
                      {/* Certificate Image */}
                      <div className="relative h-full w-full p-2">
                        <img
                          src={certificate.image}
                          alt={certificate.name}
                          className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                          style={{
                            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
                          }}
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-2 rounded-lg bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-3 w-full">
                            <p className="text-white font-bold text-xs text-center">
                              {certificate.name}
                            </p>
                            <p className="text-yellow-400 text-xs text-center mt-1">
                              Click to view
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Corner decoration */}
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 border-t-2 border-r-2 border-yellow-400/50 rounded-tr-lg group-hover:border-yellow-400 transition-colors" />
                      <div className="absolute bottom-1.5 left-1.5 w-6 h-6 border-b-2 border-l-2 border-yellow-400/50 rounded-bl-lg group-hover:border-yellow-400 transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Button */}
            {totalPages > 1 && currentCertificatePage < totalPages - 1 && (
              <button
                onClick={handleNextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-16 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
                style={{
                  boxShadow: '0 0 30px rgba(251, 146, 60, 0.5)',
                }}
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}
          </div>

          {/* Page Indicators */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentCertificatePage(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentCertificatePage
                      ? 'w-8 h-3 bg-gradient-to-r from-yellow-400 to-orange-400'
                      : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                  }`}
                  style={{
                    boxShadow: idx === currentCertificatePage ? '0 0 20px rgba(251, 191, 36, 0.6)' : 'none',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={() => setSelectedCertificate(null)}
          style={{
            animation: 'fadeIn 0.4s ease-out',
          }}
        >
          {/* Background blur circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          </div>

          <div 
            className="relative max-w-7xl w-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: 'zoomIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute -top-16 right-0 w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold hover:scale-110 hover:rotate-90 transition-all duration-300 z-20 group"
              style={{
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)',
              }}
            >
              <span className="group-hover:hidden">×</span>
              <svg className="hidden group-hover:block w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Certificate container */}
            <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 p-4 md:p-8 rounded-2xl border-2 border-yellow-400/50 backdrop-blur-xl overflow-hidden"
              style={{
                boxShadow: '0 0 80px rgba(251, 191, 36, 0.4), 0 0 120px rgba(251, 146, 60, 0.3), inset 0 0 60px rgba(251, 191, 36, 0.1)',
              }}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-yellow-400 rounded-tl-2xl animate-pulse" style={{ animationDuration: '2s' }} />
              <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-yellow-400 rounded-tr-2xl animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
              <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-yellow-400 rounded-bl-2xl animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-yellow-400 rounded-br-2xl animate-pulse" style={{ animationDuration: '2s', animationDelay: '1.5s' }} />

              {/* Shine effect */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                  animation: 'shine 3s ease-in-out infinite',
                }}
              />

              {/* Image */}
              <div className="relative max-h-[85vh] overflow-auto custom-scrollbar">
                <img
                  src={selectedCertificate}
                  alt="Certificate"
                  className="w-full h-auto rounded-lg shadow-2xl"
                  style={{
                    boxShadow: '0 0 60px rgba(251, 191, 36, 0.3), inset 0 0 40px rgba(0, 0, 0, 0.2)',
                    animation: 'imageFloat 3s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Floating particles */}
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-70" style={{ animation: 'float1 4s ease-in-out infinite' }} />
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full opacity-70" style={{ animation: 'float2 5s ease-in-out infinite' }} />
              <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-yellow-400 rounded-full opacity-70" style={{ animation: 'float3 4.5s ease-in-out infinite' }} />
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-orange-400 rounded-full opacity-70" style={{ animation: 'float1 5.5s ease-in-out infinite' }} />
            </div>

            {/* Action hint */}
            <div className="text-center mt-6 animate-bounce">
              <p className="text-gray-400 text-sm">Click anywhere outside to close</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoomIn {
          from { 
            transform: scale(0.5) rotateY(90deg); 
            opacity: 0; 
          }
          to { 
            transform: scale(1) rotateY(0deg); 
            opacity: 1; 
          }
        }
        @keyframes shine {
          0%, 100% { background-position: -200% 0; }
          50% { background-position: 200% 0; }
        }
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.7; }
          50% { transform: translate(20px, -30px); opacity: 1; }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.7; }
          50% { transform: translate(-30px, -20px); opacity: 1; }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.7; }
          50% { transform: translate(25px, 25px); opacity: 1; }
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes expandContract {
          0%, 100% { width: 80px; opacity: 0.8; }
          50% { width: 100px; opacity: 1; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #fbbf24, #f59e0b);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #f59e0b, #d97706);
        }
      `}</style>
    </section>
  );
}
