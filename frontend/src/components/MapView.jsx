import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CORPORATION_COLORS = {
    'Bengaluru Central': '#ef4444', 
    'Bengaluru South': '#3b82f6',   
    'Bengaluru East': '#10b981',    
    'Bengaluru West': '#f59e0b',    
    'Bengaluru North': '#8b5cf6'   
};

const createCustomIcon = (color, isSelected) => {
    const pulseHtml = isSelected ? `<div class="absolute -inset-2 rounded-full animate-marker-pulse" style="animation-duration: 2s;"></div>` : '';
    
    return new L.DivIcon({
        className: 'custom-div-icon',
        html: `
            <div class="relative w-full h-full flex items-center justify-center">
                ${pulseHtml}
                <div style="
                    background-color: ${isSelected ? '#fdfffeff' : color}; 
                    width: ${isSelected ? '20px' : '12px'}; 
                    height: ${isSelected ? '20px' : '12px'}; 
                    border-radius: 50%; 
                    box-shadow: 0 0 10px ${isSelected ? '#f7f7f7ff' : color};
                    position: relative;
                    z-index: 10;
                    border: ${isSelected ? '2px solid #080C14' : 'none'};
                "></div>
            </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });
};

const MapLegend = () => {
    return (
        <div className="absolute bottom-6 right-6 z-[1000] bg-[#0D1117]/80 backdrop-blur-md p-4 rounded-lg border border-[#1C2A3A] shadow-xl">
            <h4 className="font-bold mb-3 text-[10px] text-[#4A6080] uppercase tracking-[0.2em]">Corporations</h4>
            {Object.entries(CORPORATION_COLORS).map(([corp, color]) => (
                <div key={corp} className="flex items-center mb-2 gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}></div>
                    <span className="text-xs text-[#E2E8F0] tracking-wide">{corp}</span>
                </div>
            ))}
        </div>
    );
};

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function MapView({ areas, loading, selectedArea, onAreaSelect }) {
    const defaultCenter = [12.9716, 77.5946]; 
    
    const mapCenter = selectedArea ? [selectedArea.lat, selectedArea.lng] : 
                      areas.length === 1 ? [areas[0].lat, areas[0].lng] : 
                      defaultCenter;
    
    const mapZoom = selectedArea ? 15 : 
                    areas.length === 1 ? 14 : 11;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-[#080C14] text-[#4A6080] gap-4">
                <div className="w-10 h-10 border-2 border-[#1C2A3A] border-t-[#3B82F6] rounded-full animate-spin shadow-[0_0_15px_#3B82F6]"></div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">INITIALIZING MAP</span>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full">
            <MapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%', background: '#080C14' }}
                zoomControl={false}
            >
                <ChangeView center={mapCenter} zoom={mapZoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                {areas.map((area, idx) => {
                    const isSelected = selectedArea?.pincode === area.pincode && selectedArea?.area === area.area;
                    
                    return (
                        <Marker 
                            key={`${area.pincode}-${idx}`} 
                            position={[area.lat, area.lng]}
                            icon={createCustomIcon(CORPORATION_COLORS[area.corporation] || '#4A6080', isSelected)}
                            eventHandlers={{
                                click: () => onAreaSelect(area),
                            }}
                        >
                            <Popup className="custom-popup">
                                <div className="p-2">
                                    <h3 className="font-semibold text-sm text-[#E2E8F0] tracking-wide mb-2">{area.area}</h3>
                                    <div className="text-[10px] text-[#4A6080] space-y-1.5 font-mono">
                                        <p><strong className="text-[#3B82F6] font-sans text-[9px] uppercase tracking-widest mr-1">PIN:</strong> {area.pincode}</p>
                                        <p><strong className="text-[#3B82F6] font-sans text-[9px] uppercase tracking-widest mr-1">ZONE:</strong> {area.corporation}</p>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                <MapLegend />
            </MapContainer>
        </div>
    );
}

export default MapView;