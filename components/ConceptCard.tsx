import React, { useState } from 'react';
import { Concept, ResearchData } from '../types';
import { fetchResearchAndNews } from '../services/gemini';

interface ConceptCardProps {
  concept: Concept;
  bookTitle: string;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, bookTitle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [researchData, setResearchData] = useState<ResearchData | null>(null);
  const [isLoadingResearch, setIsLoadingResearch] = useState(false);

  const handleExpand = async () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (nextState && !researchData) {
      setIsLoadingResearch(true);
      try {
        const data = await fetchResearchAndNews(concept.title, bookTitle);
        setResearchData(data);
      } finally {
        setIsLoadingResearch(false);
      }
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-brand-500 shadow-md' : 'hover:shadow-md'}`}>
      <div 
        className="p-5 cursor-pointer flex justify-between items-start" 
        onClick={handleExpand}
      >
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">{concept.title}</h3>
          <p className="text-slate-600 line-clamp-2">{concept.description}</p>
        </div>
        <div className={`mt-1 flex-shrink-0 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

      {isExpanded && (
        <div className="px-5 pb-6 border-t border-slate-100 bg-slate-50/50">
          <div className="mt-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Deep Dive</h4>
            <p className="text-slate-700 leading-relaxed">{concept.explanation}</p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60">
            <h4 className="text-sm font-bold text-brand-700 uppercase tracking-wide mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              Latest Research & News
            </h4>
            
            {isLoadingResearch ? (
              <div className="flex items-center space-x-2 text-slate-500 py-4">
                <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Analyzing global data streams...</span>
              </div>
            ) : researchData ? (
              <div className="space-y-3">
                <div className="prose prose-sm max-w-none text-slate-600">
                  <p>{researchData.summary}</p>
                </div>
                {researchData.sources.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-slate-500 mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {researchData.sources.map((source, idx) => (
                        <a 
                          key={idx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-slate-200 text-brand-600 hover:bg-brand-50 transition-colors truncate max-w-[200px]"
                          title={source.title}
                        >
                          {source.title || new URL(source.uri).hostname}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-red-500">Failed to load research data.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptCard;