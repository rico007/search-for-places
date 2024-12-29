import React from 'react';
import { Place } from '../types/places';
import { PlaceCard } from './PlaceCard';

interface SidebarProps {
  places: Place[];
  selectedPlace: Place | null;
  onPlaceSelect: (place: Place) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  places,
  selectedPlace,
  onPlaceSelect,
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {places.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {places.map((place) => (
            <PlaceCard
              key={place.place_id}
              place={place}
              isSelected={selectedPlace?.place_id === place.place_id}
              onClick={() => onPlaceSelect(place)}
            />
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500">
          Search for places to see results
        </div>
      )}
    </div>
  );
};