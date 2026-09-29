import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import Navbar, { NavPage } from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Particles from './components/Particles';
import CertificatesPage from './components/CertificatesPage';
import AchievementsPage from './components/AchievementsPage';
import ProjectsPage from './components/ProjectsPage';

gsap.registerPlugin(ScrollTrigger);

function getInitialPage(): NavPage {
  if (typeof window === 'undefined') return 'portfolio';
  
  const path = window.location.pathname.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
  const target = path || hash;

  if (target === 'certificates' || target === 'certificate') return 'certificates';
  if (target === 'achievements' || target === 'achievement') return 'achievements';
  if (target === 'projects' || target === 'project') return 'projects';
  return 'portfolio';
}

function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>(getInitialPage());
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Sync with browser back/forward buttons & URL hash
  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPage(getInitialPage());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
    const path = page === 'portfolio' ? '/' : `/${page}`;
    
    // Update URL history state without full browser reload
    try {
      window.history.pushState({ page }, '', path);
    } catch {
      window.location.hash = page === 'portfolio' ? '' : `#${page}`;
    }

    // Scroll smoothly to top on page switch
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh GSAP ScrollTrigger after route change
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  useEffect(() => {
    // Enhanced smooth scroll with momentum
    let isThrottled = false;
    
    const handleWheel = (e: WheelEvent) => {
      if (isThrottled) return;
      
      isThrottled = true;
      setIsScrolling(true);
      
      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Reset scrolling state after scroll ends
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      
      // Throttle wheel events
      setTimeout(() => {
        isThrottled = false;
      }, 50);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <>
      {/* Top Navigation Bar with Certificates, Achievements, Projects options - fixed to viewport */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Fixed Back Button at Top-Left Corner when viewing a specific section */}
      {currentPage !== 'portfolio' && (
        <button
          onClick={() => handleNavigate('portfolio')}
          className="fixed top-3 sm:top-5 left-3 sm:left-6 z-[99999] inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-white/20 text-gray-200 hover:text-white backdrop-blur-2xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm font-semibold group cursor-pointer"
          style={{
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.8), 0 0 20px rgba(6, 182, 212, 0.25)',
          }}
          title="Back to Full Portfolio"
          aria-label="Back to Full Portfolio"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden xs:inline sm:inline">Back to Portfolio</span>
          <span className="xs:hidden sm:hidden">Back</span>
        </button>
      )}

      <div className="relative bg-slate-950 min-h-screen" style={{ scrollBehavior: 'smooth' }}>
        <Particles />

        {/* Main Content Area */}
        <main className="relative z-10">
          {currentPage === 'certificates' && (
            <CertificatesPage 
              onBackToPortfolio={() => handleNavigate('portfolio')} 
              onNavigate={handleNavigate} 
            />
          )}

          {currentPage === 'achievements' && (
            <AchievementsPage 
              onBackToPortfolio={() => handleNavigate('portfolio')} 
              onNavigate={handleNavigate} 
            />
          )}

          {currentPage === 'projects' && (
            <ProjectsPage 
              onBackToPortfolio={() => handleNavigate('portfolio')} 
              onNavigate={handleNavigate} 
            />
          )}

          {currentPage === 'portfolio' && (
            <div>
              <Hero />
              <About />
              <Skills />
              <Education onNavigate={handleNavigate} />
              <Experience />
              <Projects />
              <Achievements />
              <Contact />
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
