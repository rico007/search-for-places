import React, { useState } from 'react';
import { Map } from './components/Map';
import { SearchBox } from './components/SearchBox';
import { Sidebar } from './components/Sidebar';
import { SettingsScreen } from './components/SettingsScreen';
import { searchPlaces } from './services/placesApi';
import { Place } from './types/places';
import { formatErrorMessage } from './utils/errorHandling';
import { useApiKey } from './hooks/useApiKey';
import { useMapSettings } from './hooks/useMapSettings';
import { MapSettings } from './types/maps';

export default function App() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [center, setCenter] = useState<[number, number]>();
  const [error, setError] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const { apiKey, setApiKey } = useApiKey();
  const { settings: mapSettings, setSettings: setMapSettings } = useMapSettings();

  const handleSearch = async (query: string) => {
    if (!apiKey) {
      setError('Please set your Google Maps API key in settings');
      return;
    }

    try {
      setError(null);
      const response = await searchPlaces(query, apiKey);
      setPlaces(response.results);
      
      if (response.results.length > 0) {
        const firstPlace = response.results[0].geometry.location;
        setCenter([firstPlace.lat, firstPlace.lng]);
      }
    } catch (error) {
      const errorMessage = formatErrorMessage(error);
      setError(errorMessage);
      console.error('Search error:', errorMessage);
    }
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setCenter([place.geometry.location.lat, place.geometry.location.lng]);
  };

  const handleSettingsSave = (settings: { apiKey: string; mapSettings: MapSettings }) => {
    setApiKey(settings.apiKey);
    setMapSettings(settings.mapSettings);
    setShowSettings(false);
  };

  if (showSettings) {
    return (
      <SettingsScreen
        currentApiKey={apiKey}
        currentMapSettings={mapSettings}
        onSave={handleSettingsSave}
        onCancel={() => setShowSettings(false)}
      />
    );
  }

  return (
    <div className="relative h-screen w-full">
      {/* Map layer */}
      <div className="absolute inset-0">
        <Map 
          places={places}
          center={center}
          selectedPlace={selectedPlace}
          onPlaceSelect={handlePlaceSelect}
          mapSettings={mapSettings}
        />
      </div>

      {/* UI Overlay layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="container mx-auto px-4 pt-4">
          {/* Search and settings area */}
          <div className="pointer-events-auto max-w-md bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
            <SearchBox 
              onSearch={handleSearch}
              onOpenSettings={() => setShowSettings(true)}
            />
            {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                {error}
              </div>
            )}
          </div>

          {/* Results sidebar */}
          {places.length > 0 && (
            <div className="pointer-events-auto mt-4 max-w-md bg-white/80 backdrop-blur-sm rounded-lg shadow-lg max-h-[calc(100vh-8rem)] overflow-y-auto">
              <Sidebar 
                places={places}
                selectedPlace={selectedPlace}
                onPlaceSelect={handlePlaceSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}