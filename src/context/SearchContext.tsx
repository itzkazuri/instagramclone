'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  isSearchPanelOpen: boolean;
  toggleSearchPanel: () => void;
  closeSearchPanel: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);

  const toggleSearchPanel = () => {
    setIsSearchPanelOpen(prev => !prev);
  };

  const closeSearchPanel = () => {
    setIsSearchPanelOpen(false);
  };

  return (
    <SearchContext.Provider value={{ isSearchPanelOpen, toggleSearchPanel, closeSearchPanel }}>
      {children}
    </SearchContext.Provider>
  );
}
