import axios from 'axios';
import { PlacesResponse } from '../types/places';
import { formatErrorMessage } from '../utils/errorHandling';

export const searchPlaces = async (query: string, apiKey: string): Promise<PlacesResponse> => {
  try {
    const response = await axios.get<PlacesResponse>('/api/places/search', {
      params: { 
        query,
        key: apiKey
      }
    });
    return response.data;
  } catch (error) {
    const errorMessage = formatErrorMessage(error);
    console.error('Error fetching places:', errorMessage);
    throw new Error(errorMessage);
  }
};