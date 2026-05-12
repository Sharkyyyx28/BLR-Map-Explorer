import React, { useState } from 'react';

function Sidebar({ areas, onAreaSelect, selectedArea }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAreas = areas.filter(area => 
        area.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.pincode.includes(searchTerm)
    );

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Filter areas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                    <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {filteredAreas.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                        No areas found
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {filteredAreas.map((area, idx) => (
                            <button
                                key={`${area.pincode}-${idx}`}
                                onClick={() => onAreaSelect(area)}
                                className={`w-full text-left p-4 hover:bg-indigo-50 transition-colors group ${
                                    selectedArea?.pincode === area.pincode && selectedArea?.area === area.area
                                        ? 'bg-indigo-50 border-l-4 border-indigo-600'
                                        : 'border-l-4 border-transparent'
                                }`}
                            >
                                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                    {area.area}
                                </h4>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                        {area.pincode}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                                        {area.corporation.split(' ')[1]}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    Showing {filteredAreas.length} of {areas.length} locations
                </p>
            </div>
        </div>
    );
}

export default Sidebar;
