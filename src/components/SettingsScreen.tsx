import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { validateApiKey } from '../utils/apiKeyValidation';
import { validateMapboxToken } from '../utils/mapboxValidation';
import { MAP_STYLES, MapSettings } from '../types/maps';
import { ApiKeyInput } from './settings/ApiKeyInput';
import { MapboxInput } from './settings/MapboxInput';
import { StyleSelect } from './settings/StyleSelect';

interface SettingsScreenProps {
  currentApiKey: string;
  currentMapSettings: MapSettings;
  onSave: (settings: { apiKey: string; mapSettings: MapSettings }) => void;
  onCancel: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  currentApiKey,
  currentMapSettings,
  onSave,
  onCancel,
}) => {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [mapboxToken, setMapboxToken] = useState(currentMapSettings.mapboxToken);
  const [selectedStyle, setSelectedStyle] = useState(currentMapSettings.selectedStyle);
  const [isValidatingApi, setIsValidatingApi] = useState(false);
  const [isValidatingMapbox, setIsValidatingMapbox] = useState(false);
  const [isApiValid, setIsApiValid] = useState<boolean | null>(null);
  const [isMapboxValid, setIsMapboxValid] = useState<boolean | null>(null);

  const selectedMapStyle = MAP_STYLES.find(style => style.id === selectedStyle);
  const needsMapboxToken = selectedMapStyle?.requiresToken;

  const handleApiKeyValidation = async () => {
    if (!apiKey) return;
    setIsValidatingApi(true);
    setIsApiValid(null);
    const valid = await validateApiKey(apiKey);
    setIsApiValid(valid);
    setIsValidatingApi(false);
  };

  const handleMapboxValidation = async () => {
    if (!mapboxToken) return;
    setIsValidatingMapbox(true);
    setIsMapboxValid(null);
    const valid = await validateMapboxToken(mapboxToken);
    setIsMapboxValid(valid);
    setIsValidatingMapbox(false);
  };

  // Run validations when component mounts or when values change
  useEffect(() => {
    handleApiKeyValidation();
  }, [apiKey]);

  useEffect(() => {
    if (needsMapboxToken) {
      handleMapboxValidation();
    }
  }, [mapboxToken, needsMapboxToken]);

  const handleSave = () => {
    onSave({
      apiKey,
      mapSettings: {
        selectedStyle,
        mapboxToken: needsMapboxToken ? mapboxToken : ''
      }
    });
  };

  const canSave = isApiValid && (!needsMapboxToken || isMapboxValid);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onCancel}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!canSave}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 space-y-6">
            <ApiKeyInput
              apiKey={apiKey}
              isValidating={isValidatingApi}
              isValid={isApiValid}
              onChange={setApiKey}
            />

            <StyleSelect
              value={selectedStyle}
              onChange={setSelectedStyle}
            />

            {needsMapboxToken && (
              <MapboxInput
                token={mapboxToken}
                isValidating={isValidatingMapbox}
                isValid={isMapboxValid}
                onChange={setMapboxToken}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};