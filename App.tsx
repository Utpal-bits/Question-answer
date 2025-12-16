import React, { useState } from 'react';
import { AppState, BookContext } from './types';
import Hero from './components/Hero';
import BookSetup from './components/BookSetup';
import DailyView from './components/DailyView';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HERO);
  const [book, setBook] = useState<BookContext | null>(null);

  const handleGetStarted = () => {
    setAppState(AppState.SETUP);
  };

  const handleBookComplete = (bookContext: BookContext) => {
    setBook(bookContext);
    setAppState(AppState.DASHBOARD);
  };

  const handleBackToHero = () => {
    setAppState(AppState.HERO);
  };

  const handleReset = () => {
    setBook(null);
    setAppState(AppState.SETUP);
  };

  switch (appState) {
    case AppState.HERO:
      return <Hero onGetStarted={handleGetStarted} />;
    case AppState.SETUP:
      return <BookSetup onComplete={handleBookComplete} onBack={handleBackToHero} />;
    case AppState.DASHBOARD:
      return book ? <DailyView book={book} onReset={handleReset} /> : <Hero onGetStarted={handleGetStarted} />;
    default:
      return <Hero onGetStarted={handleGetStarted} />;
  }
};

export default App;