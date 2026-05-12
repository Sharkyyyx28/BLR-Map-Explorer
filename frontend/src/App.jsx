import { useState, useEffect } from 'react'
import MapView from './components/MapView'
import SearchBar from './components/SearchBar'
import Sidebar from './components/Sidebar'
import InfoPanel from './components/InfoPanel'
import './App.css'

function App() {
  const [areas, setAreas] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState(null);
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
      setAllAreas(data);
    } catch (err) {
      console.error("Failed to fetch areas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (results) => {
    setAreas(results);
    if (results.length === 1) {
      setSelectedArea(results[0]);
    } else {
      setSelectedArea(null);
    }
  };

  const handleReset = () => {
    setAreas(allAreas);
    setSelectedArea(null);
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-slate-200 py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              BLR <span className="text-indigo-600">Map Explorer</span>
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Explore Bangalore's pincodes and areas
            </p>
          </div>
          <div className="flex-1 max-w-xl">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar Container */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <Sidebar 
            areas={allAreas} 
            onAreaSelect={handleAreaSelect} 
            selectedArea={selectedArea}
          />
        </aside>

        {/* Map Container */}
        <section className="flex-1 relative bg-slate-100">
          <MapView 
            areas={areas} 
            loading={loading} 
            selectedArea={selectedArea}
            onAreaSelect={handleAreaSelect}
          />
          
          {/* Info Panel Overlay */}
          <InfoPanel 
            area={selectedArea} 
            onClose={() => setSelectedArea(null)} 
          />

          {/* Reset Button (Floating) */}
          {areas.length !== allAreas.length && (
            <button 
              onClick={handleReset}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-full shadow-2xl hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset Search View</span>
            </button>
          )}

          <div className="absolute top-5 right-5 z-[1000] lg:hidden">
          </div>
        </section>
      </main>
    </div>
  )
}

export default App;
