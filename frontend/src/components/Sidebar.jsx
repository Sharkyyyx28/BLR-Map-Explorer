import React, { useState } from 'react';

function Sidebar({ areas, onAreaSelect, selectedArea }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAreas = areas.filter(area => 
        area.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.pincode.includes(searchTerm)
    );

    return (
        <div className="flex flex-col h-full bg-[#0D1117] overflow-hidden">
            <div className="p-4 border-b border-[#1C2A3A]">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="FILTER LOCATIONS..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-[#080C14] border border-[#1C2A3A] rounded text-xs text-[#E2E8F0] tracking-widest uppercase focus:ring-1 focus:ring-[#3B82F6] focus:border-[#3B82F6] outline-none transition-all placeholder:text-[#4A6080]"
                    />
                    <svg className="absolute left-3 top-2.5 w-4 h-4 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {filteredAreas.length === 0 ? (
                    <div className="p-8 text-center text-[#4A6080] text-xs font-mono uppercase tracking-widest">
                        NO RESULTS
                    </div>
                ) : (
                    <div className="divide-y divide-[#1C2A3A]">
                        {filteredAreas.map((area, idx) => (
                            <button
                                key={`${area.pincode}-${idx}`}
                                onClick={() => onAreaSelect(area)}
                                className={`w-full text-left p-4 hover:bg-[#131B27] transition-colors group ${
                                    selectedArea?.pincode === area.pincode && selectedArea?.area === area.area
                                        ? 'bg-[#131B27] border-l-[3px] border-[#3B82F6]'
                                        : 'border-l-[3px] border-transparent'
                                }`}
                            >
                                <h4 className={`font-semibold text-sm transition-colors ${
                                    selectedArea?.pincode === area.pincode && selectedArea?.area === area.area
                                        ? 'text-[#3B82F6]'
                                        : 'text-[#E2E8F0]'
                                }`}>
                                    {area.area}
                                </h4>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-[10px] font-mono font-medium text-[#3B82F6] bg-[#0F1E2E] px-2 py-0.5 rounded-sm">
                                        {area.pincode}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#4A6080] font-bold">
                                        {area.corporation.split(' ')[1]}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            <div className="p-4 bg-[#080C14] border-t border-[#1C2A3A]">
                <p className="text-[10px] text-[#4A6080] font-mono uppercase tracking-widest font-bold">
                    IDX: {filteredAreas.length} / {areas.length}
                </p>
            </div>
        </div>
    );
}

export default Sidebar;
