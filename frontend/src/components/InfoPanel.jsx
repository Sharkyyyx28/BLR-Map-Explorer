import React from 'react';

function InfoPanel({ area, onClose }) {
    if (!area) return null;

    return (
        <div className="absolute top-6 left-6 z-[1000] w-72 bg-[#0D1117]/95 backdrop-blur-md border border-[#1C2A3A] rounded-md shadow-2xl overflow-hidden animate-in">
            <div className="h-1 bg-[#3B82F6]"></div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-5">
                    <div>
                        <h2 className="text-lg font-semibold text-[#E2E8F0] tracking-wide leading-tight">
                            {area.area}
                        </h2>
                        <div className="mt-1 flex items-center gap-1.5">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_5px_#3B82F6]"></div>
                             <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#4A6080]">
                                BLR GEO
                             </span>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-[#131B27] text-[#4A6080] hover:text-[#3B82F6] transition-colors rounded"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="bg-[#080C14] p-3 rounded border border-[#1C2A3A]">
                        <p className="text-[9px] text-[#4A6080] font-bold uppercase tracking-[0.2em] mb-1">Pincode</p>
                        <p className="text-sm font-mono text-[#3B82F6]">{area.pincode}</p>
                    </div>

                    <div className="bg-[#080C14] p-3 rounded border border-[#1C2A3A]">
                        <p className="text-[9px] text-[#4A6080] font-bold uppercase tracking-[0.2em] mb-1">Zone / Corporation</p>
                        <p className="text-xs text-[#E2E8F0] uppercase tracking-wider">{area.corporation}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <button 
                        className="w-full py-2.5 border border-[#1C2A3A] bg-[#080C14] hover:border-[#3B82F6] text-[10px] font-bold uppercase tracking-[0.2em] text-[#E2E8F0] hover:text-[#3B82F6] transition-all active:scale-95 flex items-center justify-center gap-2 rounded shadow-inner shadow-[#1C2A3A]/20"
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${area.lat},${area.lng}`, '_blank')}
                    >
                        <span>External Maps</span>
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
