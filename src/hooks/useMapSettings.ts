import { useState, useEffect } from 'react';
import { MapSettings } from '../types/maps';

const STORAGE_KEY = 'map_settings';

const defaultSettings: MapSettings = {
  selectedStyle: 'osm',
  mapboxToken: ''
};

export function useMapSettings() {
  const [settings, setSettings] = useState<MapSettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  return { settings, setSettings };
}