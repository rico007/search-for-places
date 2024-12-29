export interface MapStyle {
  id: string;
  name: string;
  url: string;
  attribution: string;
  requiresToken?: boolean;
}

export interface MapSettings {
  selectedStyle: string;
  mapboxToken: string;
}

export const MAP_STYLES: MapStyle[] = [
  {
    id: 'osm',
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  },
  {
    id: 'mapbox-streets',
    name: 'Mapbox Streets',
    url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',
    attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    requiresToken: true
  },
  {
    id: 'mapbox-satellite',
    name: 'Mapbox Satellite',
    url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}',
    attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    requiresToken: true
  },
  {
    id: 'mapbox-dark',
    name: 'Mapbox Dark',
    url: 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}',
    attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    requiresToken: true
  }
];