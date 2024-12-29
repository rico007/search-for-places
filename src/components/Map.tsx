import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Place } from '../types/places';
import { PlacePopup } from './PlacePopup';
import { createCustomIcon, createSelectedIcon } from '../utils/mapIcons';
import { MAP_STYLES, MapSettings } from '../types/maps';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  places: Place[];
  center?: [number, number];
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
  mapSettings: MapSettings;
}

const MapUpdater: React.FC<{ center?: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);

  return null;
};

export const Map: React.FC<MapProps> = ({
  places,
  center,
  selectedPlace,
  onPlaceSelect,
  mapSettings
}) => {
  const defaultCenter: [number, number] = [48.8566, 2.3522]; // Paris
  const selectedMapStyle = MAP_STYLES.find(style => style.id === mapSettings.selectedStyle) || MAP_STYLES[0];

  return (
    <MapContainer
      center={center || defaultCenter}
      zoom={13}
      className="h-full w-full z-0"
      zoomControl={false}
      maxZoom={18}
      minZoom={3}
      preferCanvas={true}
    >
      <TileLayer
        attribution={selectedMapStyle.attribution}
        url={selectedMapStyle.url.replace('{accessToken}', mapSettings.mapboxToken)}
        maxZoom={18}
        tileSize={512}
        zoomOffset={-1}
        keepBuffer={8}
        updateWhenZooming={false}
        updateWhenIdle={true}
        minZoom={1}
        maxNativeZoom={18}
      />
      <MapUpdater center={center} />
      
      {places.map((place) => (
        <Marker
          key={place.place_id}
          position={[place.geometry.location.lat, place.geometry.location.lng]}
          icon={place.place_id === selectedPlace?.place_id ? 
            createSelectedIcon(mapSettings.selectedStyle) : 
            createCustomIcon(mapSettings.selectedStyle)}
          eventHandlers={{
            click: () => onPlaceSelect(place)
          }}
        >
          <Popup>
            <PlacePopup place={place} />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};