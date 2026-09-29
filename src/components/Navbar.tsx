import React from 'react';
import { Home, Award, Trophy, Code } from 'lucide-react';

export type NavPage = 'portfolio' | 'certificates' | 'achievements' | 'projects';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const navItems: { id: NavPage; label: string; count?: number; icon: React.ElementType }[] = [
    { id: 'portfolio', label: 'Portfolio', icon: Home },
    { id: 'certificates', label: 'Certificates', count: 30, icon: Award },
    { id: 'achievements', label: 'Achievements', count: 14, icon: Trophy },
    { id: 'projects', label: 'Projects', count: 8, icon: Code },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-[99999] max-w-[95vw] pointer-events-auto select-none"
      style={{
        transform: 'translate3d(-50%, 0, 0)',
        WebkitTransform: 'translate3d(-50%, 0, 0)',
      }}
    >
      <div 
        className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-slate-950/85 backdrop-blur-2xl border border-white/20 shadow-2xl transition-all duration-300"
        style={{
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.8), 0 0 25px rgba(6, 182, 212, 0.2)',
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap ${
                isActive
                  ? 'text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 shadow-md shadow-cyan-500/40 scale-105'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span 
                  className={`px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold leading-none ${
                    isActive 
                      ? 'bg-black/40 text-white border border-white/30' 
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
