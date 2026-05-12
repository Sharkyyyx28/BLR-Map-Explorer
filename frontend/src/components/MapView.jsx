import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const CORPORATION_COLORS = {
    'Bengaluru Central': '#ef4444', 
    'Bengaluru South': '#3b82f6',   
    'Bengaluru East': '#10b981',    
    'Bengaluru West': '#f59e0b',    
    'Bengaluru North': '#8b5cf6'   
};

const createCustomIcon = (color) => {
    return new L.DivIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });
};

const MapLegend = () => {
    return (
        <div className="absolute bottom-5 right-5 z-[1000] bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-200 text-[11px] text-slate-700">
            <h4 className="font-bold mb-2 text-xs text-slate-900 uppercase tracking-wider">Corporations</h4>
            {Object.entries(CORPORATION_COLORS).map(([corp, color]) => (
                <div key={corp} className="flex items-center mb-1 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></div>
                    <span>{corp}</span>
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
    
    // Determine center and zoom based on state
    const mapCenter = selectedArea ? [selectedArea.lat, selectedArea.lng] : 
                      areas.length === 1 ? [areas[0].lat, areas[0].lng] : 
                      defaultCenter;
    
    const mapZoom = selectedArea ? 15 : 
                    areas.length === 1 ? 14 : 11;

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-slate-50 text-slate-400 gap-4">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <span className="font-medium">Loading Map Data...</span>
            </div>
        );
    }

    const selectedIcon = new L.DivIcon({
        className: 'selected-marker-icon',
        html: `
            <div class="relative">
                <div class="absolute -inset-4 bg-indigo-500/30 rounded-full animate-ping"></div>
                <div class="relative bg-indigo-600 w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                </div>
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });

    return (
        <div className="relative h-full w-full">
            <MapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <ChangeView center={mapCenter} zoom={mapZoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {areas.map((area, idx) => {
                    const isSelected = selectedArea?.pincode === area.pincode && selectedArea?.area === area.area;
                    
                    return (
                        <Marker 
                            key={`${area.pincode}-${idx}`} 
                            position={[area.lat, area.lng]}
                            icon={isSelected ? selectedIcon : createCustomIcon(CORPORATION_COLORS[area.corporation] || '#64748b')}
                            eventHandlers={{
                                click: () => onAreaSelect(area),
                            }}
                        >
                            <Popup className="custom-popup">
                                <div className="p-1">
                                    <h3 className="font-bold text-slate-900 leading-tight mb-1">{area.area}</h3>
                                    <div className="text-xs text-slate-500 space-y-0.5">
                                        <p><strong>Pincode:</strong> {area.pincode}</p>
                                        <p><strong>Corp:</strong> {area.corporation}</p>
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