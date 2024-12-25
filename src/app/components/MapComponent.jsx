'use client'
import React, { useState, useEffect } from 'react';

const DEFAULT_ZOOM = 3;
const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '450px';

const MapComponent = ({
                          latitude,
                          longitude,
                          zoom = DEFAULT_ZOOM,
                          width = DEFAULT_WIDTH,
                          height = DEFAULT_HEIGHT,
                          title = 'Location Map',
                          className = '',
                      }) => {
    const [mapUrl, setMapUrl] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            // Koordinatları kontrol et
            if (!isValidCoordinates(latitude, longitude)) {
                throw new Error('Invalid coordinates');
            }

            const newMapUrl = `https://openstreetmap.org/export/embed.html` +
                `?bbox=${longitude-zoom},${latitude-zoom},${longitude+zoom},${latitude+zoom}` +
                `&layer=mapnik` +
                `&marker=${latitude},${longitude}` +
                `&lang=en`;  // Dil parametresi
            setMapUrl(newMapUrl);
            setIsError(false);
        } catch (error) {
            console.error('Error loading map:', error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, [latitude, longitude, zoom]);

    // Koordinat doğrulama fonksiyonu
    const isValidCoordinates = (lat, lng) => {
        return (
            lat !== undefined &&
            lng !== undefined &&
            !isNaN(lat) &&
            !isNaN(lng) &&
            lat >= -90 &&
            lat <= 90 &&
            lng >= -180 &&
            lng <= 180
        );
    };

    if (isLoading) {
        return (
            <div className={`map-container ${className}`} style={{ width, height }}>
                <div className="loading-state">Loading map...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={`map-error ${className}`} style={{ width, height }}>
                <div className="error-message">
                    Failed to load map. Please check the coordinates.
                </div>
            </div>
        );
    }

    return (
        <div className={`map-wrapper ${className}`}>
            <div className="map-container" style={{ width, height }}>
                <iframe
                    width="100%"
                    height="100%"
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapUrl}
                    title={`${title} - OpenStreetMap`}
                    onError={() => setIsError(true)}
                />
            </div>

        </div>
    );
};

export default MapComponent;