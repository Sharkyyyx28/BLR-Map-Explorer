import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        try {
            const isPincode = /^\d+$/.test(query.trim());
            const param = isPincode ? `pincode=${query}` : `area=${query}`;
            
            const response = await fetch(`http://localhost:8000/api/lookup?${param}`);
            const data = await response.json();
            
            if (response.ok) {
                const results = Array.isArray(data) ? data : [data];
                onSearch(results);
            } else {
                onSearch([]); 
                alert(data.detail || "No results found");
            }
        } catch (error) {
            console.error("Search failed:", error);
            alert("Failed to connect to backend");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto mb-10">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by Pincode or Area Name..."
                    className="block w-full p-4 pl-12 text-base text-slate-900 border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-md focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all shadow-xl shadow-indigo-500/5"
                />
                <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2.5 bottom-2.5 px-6 py-2 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                    {isSearching ? 'Searching...' : 'Search'}
                </button>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">
                Try searching <span className="font-mono bg-slate-100 px-1 rounded">560034</span> or <span className="font-mono bg-slate-100 px-1 rounded">Indiranagar</span>
            </p>
        </form>
    );
}

export default SearchBar;