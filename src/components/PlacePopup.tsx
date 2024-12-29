import React from 'react';
import { Place } from '../types/places';
import { Star } from 'lucide-react';

interface PlacePopupProps {
  place: Place;
}

export const PlacePopup: React.FC<PlacePopupProps> = ({ place }) => {
  const renderPriceLevel = (level?: number) => {
    if (!level) return null;
    return '💰'.repeat(level);
  };

  const renderRating = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span>{rating.toFixed(1)}</span>
        {place.user_ratings_total && (
          <span className="text-sm text-gray-500">
            ({place.user_ratings_total})
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-w-[300px] max-w-md">
      <h3 className="font-bold text-lg mb-2">{place.name}</h3>
      
      {place.photos && place.photos[0] && (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
          alt={place.name}
          className="w-full h-48 object-cover rounded-lg mb-2"
        />
      )}
      
      <div className="flex items-center gap-2 mb-2">
        {renderRating(place.rating)}
        <span className="mx-2">•</span>
        {renderPriceLevel(place.price_level)}
      </div>
      
      <p className="text-sm text-gray-600 mb-2">{place.formatted_address}</p>
      
      {place.opening_hours && (
        <p className="text-sm">
          {place.opening_hours.open_now ? (
            <span className="text-green-600">Open now</span>
          ) : (
            <span className="text-red-600">Closed</span>
          )}
        </p>
      )}
      
      {place.types && (
        <div className="flex flex-wrap gap-1 mt-2">
          {place.types.map((type) => (
            <span
              key={type}
              className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600"
            >
              {type.replace(/_/g, ' ')}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};