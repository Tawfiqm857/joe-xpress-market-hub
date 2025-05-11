
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${query}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative w-full max-w-md transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="What are you looking for?"
        className="w-full py-3 px-5 pr-12 rounded-full border-2 border-transparent focus:border-accent shadow-lg focus:outline-none transition-all duration-300"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent text-white py-1.5 px-4 rounded-full hover:bg-accent/90 transition-colors"
      >
        <Search className="w-4 h-4 md:hidden" />
        <span className="hidden md:block">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
