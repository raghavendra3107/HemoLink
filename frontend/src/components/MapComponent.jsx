import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const createColoredIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

/**
 * Component to auto-adjust map bounds when markers change
 */
const MapUpdater = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lon]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [markers, map]);

  return null;
};

/**
 * Reusable Map Component
 * @param {Array} markers - Array of objects: { id, lat, lon, title, description }
 * @param {Array} center - Default center [lat, lon]
 * @param {Number} zoom - Default zoom level
 */
const MapComponent = ({ markers = [], center = [20.5937, 78.9629], zoom = 5 }) => {
  return (
    <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-200 relative">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full min-h-[400px] z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater markers={markers} />
        
        {markers.map((marker, i) => {
            if (!marker.lat || !marker.lon) return null;
            
            const iconToUse = marker.color ? createColoredIcon(marker.color) : defaultIcon;
            
            return (
              <Marker key={marker.id || i} position={[marker.lat, marker.lon]} icon={iconToUse}>
                <Popup>
                  <div className="text-sm">
                    {marker.type && (
                      <span className="text-xs font-bold text-gray-500 uppercase block mb-1">
                        {marker.type}
                      </span>
                    )}
                    <strong className="block text-gray-900 mb-1">{marker.title}</strong>
                    <span className="text-gray-600 block mb-1">{marker.description}</span>
                  </div>
                </Popup>
              </Marker>
            );
        })}
      </MapContainer>

      {/* Legend Overlay */}
      <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow border border-gray-200 text-xs text-gray-700 pointer-events-none">
        <div className="font-semibold text-gray-800 mb-1">Legend</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#3b82f6] border border-white shadow-sm"></div>Donor</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#ef4444] border border-white shadow-sm"></div>Hospital</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#8b5cf6] border border-white shadow-sm"></div>Blood Lab</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#10b981] border border-white shadow-sm"></div>Camp</div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
