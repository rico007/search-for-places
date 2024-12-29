import L from 'leaflet';

const getIconColors = (mapStyle: string): { default: string; selected: string } => {
  switch (mapStyle) {
    case 'mapbox-dark':
      return {
        default: 'yellow',
        selected: 'orange'
      };
    case 'mapbox-satellite':
      return {
        default: 'green',
        selected: 'red'
      };
    default:
      return {
        default: 'blue',
        selected: 'red'
      };
  }
};

export const createCustomIcon = (mapStyle: string) => {
  const colors = getIconColors(mapStyle);
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${colors.default}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

export const createSelectedIcon = (mapStyle: string) => {
  const colors = getIconColors(mapStyle);
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${colors.selected}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};