import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-brand-50 to-white px-6 text-center">
      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center justify-center p-3 bg-brand-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 4.168 6.253v13C4.168 19.977 5.754 19.5 7.5 19.5s3.332.477 4.168 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.168 1.253v13C20.668 19.977 19.082 19.5 16.5 19.5c-1.747 0-3.332.477-4.168 1.253" />
          </svg>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
          Rewire Your Brain with <span className="text-brand-600">Daily Knowledge</span>
        </h1>
        
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Transform the way you read. Upload a book or choose a title, and we'll extract 5 key concepts daily, explain them, and connect you with the latest research.
        </p>
        
        <button
          onClick={onGetStarted}
          className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-200 bg-brand-600 rounded-full hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Start Your Journey
          <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>

        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-brand-500 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Daily Concepts</h3>
            <p className="text-slate-500 text-sm">Bite-sized wisdom extracted from your favorite books, delivered daily.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
             <div className="text-brand-500 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Deep Explanations</h3>
            <p className="text-slate-500 text-sm">Go beyond the text with AI-powered breakdowns of complex topics.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
             <div className="text-brand-500 mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Latest Research</h3>
            <p className="text-slate-500 text-sm">Stay updated with real-time news and scientific studies related to the topic.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;