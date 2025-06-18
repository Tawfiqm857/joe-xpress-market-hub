
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
      className={`relative w-full max-w-xl transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search products, categories, or sellers..."
        className="w-full py-4 px-6 pr-14 rounded-2xl border-2 border-gray-200 focus:border-accent shadow-lg focus:outline-none transition-all duration-300 text-base placeholder:text-gray-400 bg-white/95 backdrop-blur-sm"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-accent text-white p-2.5 rounded-xl hover:bg-accent/90 transition-all duration-300 hover:scale-105 shadow-md"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;
