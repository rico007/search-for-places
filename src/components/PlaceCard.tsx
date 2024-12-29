import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Place } from '../types/places';
import { renderPriceLevel } from '../utils/formatters';

interface PlaceCardProps {
  place: Place;
  isSelected: boolean;
  onClick: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? 'bg-blue-50' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex gap-4">
        {place.photos?.[0] ? (
          <img
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photo_reference=${place.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
            alt={place.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{place.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{place.formatted_address}</p>
          <div className="flex items-center gap-2 mt-2">
            {place.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm">{place.rating.toFixed(1)}</span>
                {place.user_ratings_total && (
                  <span className="text-xs text-gray-500">
                    ({place.user_ratings_total})
                  </span>
                )}
              </div>
            )}
            {place.price_level && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-sm">{renderPriceLevel(place.price_level)}</span>
              </>
            )}
          </div>
          {place.opening_hours && (
            <p className="text-sm mt-1">
              {place.opening_hours.open_now ? (
                <span className="text-green-600">Open now</span>
              ) : (
                <span className="text-red-600">Closed</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};