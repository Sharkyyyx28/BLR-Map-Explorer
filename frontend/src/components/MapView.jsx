import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView() {
    const center = [12.9716, 77.5946]; 

    return (
        <div style={{ height: '600px', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            <MapContainer 
                center={center} 
                zoom={11} 
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
    );
}

export default MapView;