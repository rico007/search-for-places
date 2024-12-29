export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Photo {
  height: number;
  width: number;
  html_attributions: string[];
  photo_reference: string;
}

export interface OpeningHours {
  open_now: boolean;
}

export interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: Geometry;
  business_status?: string;
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  opening_hours?: OpeningHours;
  photos?: Photo[];
  price_level?: number;
  rating?: number;
  types?: string[];
  user_ratings_total?: number;
}

export interface PlacesResponse {
  results: Place[];
  status: string;
}