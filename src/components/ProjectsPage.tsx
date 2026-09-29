import React from 'react';
import Projects from './Projects';

interface ProjectsPageProps {
  onBackToPortfolio?: () => void;
  onNavigate?: (page: 'portfolio' | 'certificates' | 'achievements' | 'projects') => void;
}

export default function ProjectsPage({ }: ProjectsPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-16 sm:pt-20 pb-16 relative overflow-hidden">
      
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[160px]" />
      </div>

      {/* Main Projects Showcase */}
      <div className="relative z-10">
        <Projects />
      </div>

    </div>
  );
}
