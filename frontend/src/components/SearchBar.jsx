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
            
            const response = await fetch(`http://localhost:8000/api/lookup?${param}`);
            const data = await response.json();
            
            if (response.ok) {
                const results = Array.isArray(data) ? data : [data];
                onSearch(results);
            } else {
                onSearch([]); 
                setError(data.detail || "No matching locations found. Try another search.");
            }
        } catch (error) {
            console.error("Search failed:", error);
            setError("Unable to connect to the server. Please try again later.");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="relative w-full">
            <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg className={`w-5 h-5 transition-colors ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (error) setError(null);
                    }}
                    placeholder="Search Pincode or Area..."
                    className={`block w-full p-4 pl-12 pr-32 text-sm text-slate-900 border rounded-2xl bg-white/80 backdrop-blur-md outline-none transition-all shadow-lg ${
                        error 
                        ? 'border-red-200 focus:ring-4 focus:ring-red-500/10 focus:border-red-400' 
                        : 'border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500'
                    }`}
                />
                <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-2 bottom-2 px-6 py-2 text-xs font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 transition-all shadow-md active:scale-95 disabled:opacity-50"
                >
                    {isSearching ? (
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Finding...</span>
                        </div>
                    ) : 'Search'}
                </button>
            </form>
            
            {error && (
                <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-50 border border-red-100 rounded-xl animate-in slide-in-from-top-1 duration-200 z-50">
                    <p className="text-xs text-red-600 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}

export default SearchBar;