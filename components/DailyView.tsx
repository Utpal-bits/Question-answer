import React, { useEffect, useState } from 'react';
import { BookContext, Concept } from '../types';
import { generateDailyConcepts } from '../services/gemini';
import ConceptCard from './ConceptCard';

interface DailyViewProps {
  book: BookContext;
  onReset: () => void;
}

const DailyView: React.FC<DailyViewProps> = ({ book, onReset }) => {
  const [day, setDay] = useState(1);
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDay(day);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day]);

  const loadDay = async (currentDay: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateDailyConcepts(book, currentDay);
      setConcepts(data);
    } catch (err) {
      setError("We couldn't generate your lesson for today. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextDay = () => {
    setDay(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 4.168 6.253v13C4.168 19.977 5.754 19.5 7.5 19.5s3.332.477 4.168 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.168 1.253v13C20.668 19.977 19.082 19.5 16.5 19.5c-1.747 0-3.332.477-4.168 1.253" /></svg>
             </div>
             <div>
               <h1 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Currently Reading</h1>
               <p className="text-lg font-bold text-slate-800 leading-none">{book.title}</p>
             </div>
          </div>
          <button 
            onClick={onReset}
            className="text-sm text-slate-500 hover:text-red-500 transition-colors font-medium"
          >
            Change Book
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Day {day}</h2>
            <p className="text-slate-600 mt-2">Here are your 5 concepts for today. Expand them to explore latest research.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-24 bg-white rounded-xl shadow-sm border border-slate-200"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-xl border border-red-100 shadow-sm">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-slate-900">Generation Failed</h3>
            <p className="mt-1 text-sm text-slate-500">{error}</p>
            <button 
              onClick={() => loadDay(day)}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {concepts.map((concept) => (
              <ConceptCard key={concept.id} concept={concept} bookTitle={book.title} />
            ))}

            <div className="mt-12 text-center pb-12">
               <button
                onClick={handleNextDay}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all hover:scale-105"
              >
                Complete Day {day} & Unlock Day {day + 1}
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DailyView;