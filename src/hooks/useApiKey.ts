import { useState, useEffect } from 'react';

const API_KEY_STORAGE_KEY = 'google_maps_api_key';

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem(API_KEY_STORAGE_KEY) || '';
  });

  useEffect(() => {
    if (apiKey) {
      localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    }
  }, [apiKey]);

  return { apiKey, setApiKey };
}