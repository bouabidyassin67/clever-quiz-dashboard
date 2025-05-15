
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface MusicContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  youtubeUrl: string;
  setYoutubeUrl: (url: string) => void;
  embedUrl: string;
  setEmbedUrl: (url: string) => void;
  history: string[];
  setHistory: (history: string[]) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  
  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('music-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse music history", e);
      }
    }
  }, []);
  
  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('music-history', JSON.stringify(history));
  }, [history]);

  return (
    <MusicContext.Provider
      value={{
        isOpen,
        setIsOpen,
        isPlaying,
        setIsPlaying,
        youtubeUrl,
        setYoutubeUrl,
        embedUrl,
        setEmbedUrl,
        history,
        setHistory,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
