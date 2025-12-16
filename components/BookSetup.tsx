import React, { useState, useRef } from 'react';
import { BookContext } from '../types';

interface BookSetupProps {
  onComplete: (book: BookContext) => void;
  onBack: () => void;
}

const BookSetup: React.FC<BookSetupProps> = ({ onComplete, onBack }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [activeTab, setActiveTab] = useState<'title' | 'upload'>('title');
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setFileContent(text);
        // Try to guess title from filename
        setTitle(file.name.replace(/\.[^/.]+$/, "")); 
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'title' && !title) return;
    if (activeTab === 'upload' && !fileContent) return;

    onComplete({
      title,
      author,
      contentSnippet: fileContent || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="bg-brand-600 p-6 flex items-center">
          <button onClick={onBack} className="text-brand-100 hover:text-white mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h2 className="text-2xl font-bold text-white">What are you reading?</h2>
        </div>

        <div className="p-6">
          <div className="flex border-b border-slate-200 mb-6">
            <button
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === 'title' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('title')}
            >
              Search by Title
            </button>
            <button
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${activeTab === 'upload' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('upload')}
            >
              Upload Text File
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {activeTab === 'title' && (
              <>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Book Title</label>
                  <input
                    id="title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    placeholder="e.g. Atomic Habits"
                  />
                </div>
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-slate-700 mb-1">Author (Optional)</label>
                  <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                    placeholder="e.g. James Clear"
                  />
                </div>
              </>
            )}

            {activeTab === 'upload' && (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-brand-400 transition-colors cursor-pointer bg-slate-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-2 text-sm text-slate-600">
                    {fileName ? fileName : "Click to upload a text file (.txt, .md)"}
                  </p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".txt,.md,.json" 
                    onChange={handleFileChange}
                  />
                </div>
                {fileContent && (
                   <div>
                    <label htmlFor="title-override" className="block text-sm font-medium text-slate-700 mb-1">Book Name</label>
                    <input
                      id="title-override"
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={!title && !fileContent}
              className="w-full bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Start Learning
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookSetup;