import React, { useState, useMemo } from 'react';
import { 
  Award, 
  ArrowLeft, 
  Search, 
  Download, 
  FileText, 
  ExternalLink, 
  X, 
  Filter, 
  CheckCircle, 
  Sparkles,
  Trophy
} from 'lucide-react';
import { certificatesData, CertificateItem } from '../data/certificatesData';

interface CertificatesPageProps {
  onBackToPortfolio: () => void;
  onNavigate: (page: 'portfolio' | 'certificates' | 'achievements' | 'projects') => void;
}

export default function CertificatesPage({ onBackToPortfolio, onNavigate }: CertificatesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  const categories = ['All', 'Hackathon', 'Course', 'Competition'];

  const filteredCertificates = useMemo(() => {
    return certificatesData.filter((cert) => {
      const matchesSearch = 
        cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cert.issuer && cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (cert.year && cert.year.includes(searchQuery));
      
      const matchesCategory = 
        selectedCategory === 'All' || cert.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Bar Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-semibold backdrop-blur-md shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to Full Portfolio</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('achievements')}
              className="px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              View Achievements →
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            >
              View Projects →
            </button>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-lg shadow-cyan-500/10">
            <Award className="w-4 h-4" />
            <span>Verified Credentials & Honors</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 mb-4 tracking-tight">
            CERTIFICATES GALLERY
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Verified credentials from national hackathons, university championships, ISRO, Google, Adobe, and specialized engineering courses.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span className="font-semibold text-amber-400">{certificatesData.length} Total Certificates</span>
            <span>•</span>
            <span className="text-cyan-400">100% Verified</span>
            <span>•</span>
            <span className="text-purple-400">PDFs Available for Download</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mb-10 bg-slate-900/70 border border-white/10 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 scale-105'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat === 'All' ? `All (${certificatesData.length})` : cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, issuer, year..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/60 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Certificates Grid */}
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-white/10">
            <Award className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400 text-lg">No certificates found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCertificates.map((cert, index) => (
              <div
                key={index}
                onClick={() => setSelectedCertificate(cert)}
                className="group relative bg-slate-900/80 hover:bg-slate-900 border border-white/10 hover:border-amber-400/50 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer flex flex-col"
              >
                {/* Certificate Preview Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950/80">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  
                  {/* Badges on Top */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {cert.category && (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-950/80 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                        {cert.category}
                      </span>
                    )}
                    {cert.pdf && (
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-400/30 backdrop-blur-md flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        PDF
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors line-clamp-2 mb-1.5">
                      {cert.name}
                    </h3>
                    {cert.issuer && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                        <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{cert.issuer}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-medium">{cert.year || '2026'}</span>
                    <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                      View details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Fullscreen Certificate Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-slate-900 border border-amber-400/40 rounded-2xl overflow-hidden shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  {selectedCertificate.name}
                </h3>
                {selectedCertificate.issuer && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Issued by <span className="text-cyan-400 font-semibold">{selectedCertificate.issuer}</span> • {selectedCertificate.year || '2026'}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="max-h-[70vh] overflow-auto rounded-xl bg-black/50 p-2 flex items-center justify-center">
              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.name}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Modal Footer */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Verified Student Credential • Dhairyashil Shinde
              </span>

              <div className="flex items-center gap-2">
                {selectedCertificate.pdf && (
                  <a
                    href={selectedCertificate.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Original PDF</span>
                  </a>
                )}
                <a
                  href={selectedCertificate.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Full Size</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
