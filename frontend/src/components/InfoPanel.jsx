import React from 'react';

function InfoPanel({ area, onClose }) {
    if (!area) return null;

    return (
        <div className="absolute top-5 left-5 z-[1000] w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="relative h-2 bg-indigo-600"></div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 leading-tight">
                            {area.area}
                        </h2>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                            Bangalore
                        </span>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg text-slate-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Pincode</p>
                            <p className="text-sm font-mono font-bold text-slate-700">{area.pincode}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg text-slate-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Corporation</p>
                            <p className="text-sm font-bold text-slate-700">{area.corporation}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                    <button 
                        className="w-full py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${area.lat},${area.lng}`, '_blank')}
                    >
                        <span>View on Google Maps</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default InfoPanel;
