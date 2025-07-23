import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GlobalSearchContextType {
  search: string;
  setSearch: (q: string) => void;
  handleSearch: () => void;
}

const GlobalSearchContext = createContext<GlobalSearchContextType | undefined>(
  undefined,
);

export const GlobalSearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <GlobalSearchContext.Provider value={{ search, setSearch, handleSearch }}>
      {children}
    </GlobalSearchContext.Provider>
  );
};

export function useGlobalSearch() {
  const ctx = useContext(GlobalSearchContext);
  if (!ctx)
    throw new Error(
      'useGlobalSearch must be used within a GlobalSearchProvider',
    );
  return ctx;
}
