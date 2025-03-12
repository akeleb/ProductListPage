'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string, category: string) => void;
  categories: string[];
}

export default function SearchBar({ onSearch, categories }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(query, selectedCategory);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [query, selectedCategory, onSearch]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            id="product-search"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
        </div>
        
        <div className="relative min-w-[180px]">
          <button
            id="dropdown-button"
            className="flex items-center justify-between w-full p-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 focus:ring-blue-500 focus:border-blue-500"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="dropdown-menu"
          >
            {selectedCategory || 'All Categories'} 
            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>
          
          {isExpanded && (
            <div
              id="dropdown-menu"
              className="absolute z-10 w-full mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-lg"
            >
              <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdown-button">
                <li>
                  <button
                    type="button"
                    className={`inline-flex w-full px-4 py-2 hover:bg-gray-100 ${
                      selectedCategory === '' ? 'bg-gray-100 font-semibold' : ''
                    }`}
                    onClick={() => {
                      setSelectedCategory('');
                      setIsExpanded(false);
                    }}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      className={`inline-flex w-full px-4 py-2 hover:bg-gray-100 ${
                        selectedCategory === category ? 'bg-gray-100 font-semibold' : ''
                      }`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsExpanded(false);
                      }}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {(query || selectedCategory) && (
        <div className="mt-3 flex items-center text-sm text-gray-600">
          <span>Filters active:</span>
          {query && (
            <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
              &quot;{query}&quot;
              <button 
                className="ml-1 text-blue-800 hover:text-blue-900 focus:outline-none" 
                onClick={() => setQuery('')}
                aria-label="Clear search query"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
              {selectedCategory}
              <button 
                className="ml-1 text-blue-800 hover:text-blue-900 focus:outline-none" 
                onClick={() => setSelectedCategory('')}
                aria-label="Clear category filter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
} 