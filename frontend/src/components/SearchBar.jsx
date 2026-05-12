import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setError(null);
        
        try {
            const isPincode = /^\d+$/.test(query.trim());
            const param = isPincode ? `pincode=${query}` : `area=${query}`;
            
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${API_URL}/api/lookup?${param}`);
            const data = await response.json();
            
            if (response.ok) {
                const results = Array.isArray(data) ? data : [data];
                onSearch(results);
            } else {
                onSearch([]); 
                setError(data.detail || "NO LOCATION FOUND");
            }
        } catch (error) {
            console.error("Search failed:", error);
            setError("SERVER ERROR");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="relative w-full">
            <form onSubmit={handleSearch} className="relative flex gap-2">
                <div className="relative flex-1 group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            if (error) setError(null);
                        }}
                        placeholder="SEARCH PINCODE OR AREA..."
                        className={`block w-full py-2.5 px-4 bg-[#080C14] border rounded-md text-xs text-[#E2E8F0] tracking-widest uppercase outline-none transition-all placeholder:text-[#4A6080] ${
                            error 
                            ? 'border-red-900 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                            : 'border-[#1C2A3A] focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]'
                        }`}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSearching}
                    className="px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase text-white bg-[#3B82F6] rounded-md hover:bg-[#2563EB] transition-all disabled:opacity-50 active:scale-95 whitespace-nowrap"
                >
                    {isSearching ? 'SEARCHING...' : 'SEARCH'}
                </button>
            </form>
            
            {error && (
                <div className="absolute top-full left-0 mt-1.5 z-50">
                    <p className="text-[9px] text-red-400 font-mono font-bold uppercase tracking-widest bg-[#0D1117] border border-red-900/50 px-3 py-1.5 rounded-sm">
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}

export default SearchBar;