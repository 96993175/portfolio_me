import React from 'react';
import { ArrowLeft, Trophy, Award, Sparkles } from 'lucide-react';
import Achievements from './Achievements';

interface AchievementsPageProps {
  onBackToPortfolio: () => void;
  onNavigate: (page: 'portfolio' | 'certificates' | 'achievements' | 'projects') => void;
}

export default function AchievementsPage({ onBackToPortfolio, onNavigate }: AchievementsPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20 relative overflow-hidden">
      
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Bar Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-semibold backdrop-blur-md shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-yellow-400" />
            <span>Back to Full Portfolio</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('certificates')}
              className="px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              View Certificates (30) →
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              View Projects →
            </button>
          </div>
        </div>
      </div>

      {/* Main Achievements Showcase */}
      <div className="relative">
        <Achievements />
      </div>

    </div>
  );
}
