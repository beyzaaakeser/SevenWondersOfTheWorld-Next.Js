'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({
                        latitude,
                        longitude,
                        zoom = 7,
                        width = '100%',
                        height = '450px',
                        title = 'Location Map',
                        className = '',
                        markerText = '',
                    }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && !mapInstanceRef.current) {
            const mapInstance = L.map(mapRef.current).setView([latitude, longitude], zoom);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
            }).addTo(mapInstance);

            const customIcon = L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
            });

            L.marker([latitude, longitude], { icon: customIcon })
                .addTo(mapInstance)
                .bindPopup(markerText)
                .openPopup();

            mapInstance.zoomControl.setPosition('topright');
            L.control.scale({ imperial: false }).addTo(mapInstance);

            mapInstanceRef.current = mapInstance;
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [latitude, longitude, zoom, markerText]);

    return (
        <div className={`map-wrapper ${className}`}>
            <div
                ref={mapRef}
                style={{
                    width,
                    height,
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
            />
            <div className="map-coordinates text-sm text-gray-600 mt-2">
                Coordinates: {latitude}°, {longitude}°
            </div>
        </div>
    );
};

export default LeafletMap;
