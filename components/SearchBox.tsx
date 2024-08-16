"use client"
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchBoxProps {
  onSearch: (city: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="w-full py-3 px-4 pr-12 rounded-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          type="submit" 
          className="absolute right-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
};