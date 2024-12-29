import React, { useState } from 'react';
import { Search, Settings } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onOpenSettings: () => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  onOpenSettings,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="flex gap-2">
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for places..."
            className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Search size={20} />
          </button>
        </div>
      </form>
      <button
        onClick={onOpenSettings}
        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
        title="Settings"
      >
        <Settings size={20} />
      </button>
    </div>
  );
};