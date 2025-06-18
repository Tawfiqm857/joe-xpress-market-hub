
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';

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
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Decorative background glow */}
      <div className={`absolute inset-0 bg-gradient-to-r from-orange-400/20 to-blue-400/20 rounded-3xl blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}></div>
      
      <form 
        onSubmit={handleSearch} 
        className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}
      >
        {/* Main search container with glass effect */}
        <div className="relative bg-white/95 backdrop-blur-md rounded-3xl border-2 border-white/30 shadow-2xl overflow-hidden">
          {/* Animated gradient border */}
          <div className={`absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`} style={{ padding: '2px', zIndex: -1 }}>
            <div className="bg-white/95 backdrop-blur-md rounded-3xl h-full w-full"></div>
          </div>
          
          {/* Input field */}
          <div className="relative flex items-center">
            <div className="absolute left-6 flex items-center pointer-events-none">
              <Search className={`w-6 h-6 transition-all duration-300 ${isFocused ? 'text-orange-500 scale-110' : 'text-gray-400'}`} />
              {isFocused && (
                <Sparkles className="w-4 h-4 text-orange-400 ml-2 animate-pulse" />
              )}
            </div>
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search for anything... cars, phones, houses, jobs"
              className="w-full py-6 pl-16 pr-20 text-lg font-medium bg-transparent focus:outline-none placeholder:text-gray-400 text-gray-800 transition-all duration-300"
            />
            
            {/* Search button with enhanced styling */}
            <button
              type="submit"
              className="absolute right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <Search className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
        
        {/* Quick search suggestions */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 opacity-80">
          {['Electronics', 'Cars', 'Fashion', 'Real Estate'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setQuery(tag);
                navigate(`/products?search=${tag}`);
              }}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
