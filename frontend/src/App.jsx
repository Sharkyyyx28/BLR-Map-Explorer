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
  
  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/areas`);
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
    <div className="h-screen bg-[#080C14] text-[#E2E8F0] flex flex-col overflow-hidden font-sans">
      <header className="bg-[#0D1117] border-b border-[#1C2A3A] py-4 px-6 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="text-[#4A6080]">BLR</span> <span className="text-[#E2E8F0]">Map Explorer</span>
            </h1>
            <p className="text-[10px] text-[#4A6080] font-bold uppercase tracking-[0.2em] mt-0.5">
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
        <aside className="hidden lg:block w-80 flex-shrink-0 bg-[#0D1117] border-r border-[#1C2A3A]">
          <Sidebar 
            areas={allAreas} 
            onAreaSelect={handleAreaSelect} 
            selectedArea={selectedArea}
          />
        </aside>

        {/* Map Container */}
        <section className="flex-1 relative bg-[#080C14]">
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
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] px-6 py-2 border border-[#3B82F6] text-[#3B82F6] text-[10px] font-bold tracking-[0.2em] uppercase rounded bg-[#080C14]/80 backdrop-blur-sm hover:bg-[#3B82F6] hover:text-[#0A0A0A] transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Reset Search View</span>
            </button>
          )}
        </section>
      </main>
    </div>
  )
}

export default App;
