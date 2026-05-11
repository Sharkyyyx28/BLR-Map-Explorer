import { useState, useEffect } from 'react'
import MapView from './components/MapView'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/areas');
      const data = await res.json();
      setAreas(data);
    } catch (err) {
      console.error("Failed to fetch areas:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">
          BLR <span className="text-indigo-600">Map Explorer</span>
        </h1>
        <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
          Search for pincodes or areas across Bengaluru's administrative corporations.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <SearchBar onSearch={(results) => setAreas(results)} />
        
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            {areas.length} {areas.length === 1 ? 'Location' : 'Locations'} Found
          </h2>
          {areas.length < 25 && (
            <button 
              onClick={fetchAll}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Reset Map
            </button>
          )}
        </div>

        <section className="bg-white rounded-3xl shadow-2xl shadow-indigo-500/10 p-2 border border-slate-200 overflow-hidden">
          <MapView areas={areas} loading={loading} />
        </section>
      </main>
    </div>
  )
}

export default App
