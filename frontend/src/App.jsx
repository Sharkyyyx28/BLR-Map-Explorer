import MapView from './components/MapView'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Bangalore Pincode <span className="text-indigo-600">Map Explorer</span>
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Interactive visualization of Bengaluru area pincodes and administrative corporations.
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <section className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-2 border border-slate-100 overflow-hidden">
          <MapView />
        </section>
      </main>
    </div>
  )
}

export default App
