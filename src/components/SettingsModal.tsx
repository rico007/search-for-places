import React, { useState } from 'react';
import { Check, Loader2, X } from 'lucide-react';
import { validateApiKey } from '../utils/apiKeyValidation';
import { validateMapboxToken } from '../utils/mapboxValidation';
import { MAP_STYLES, MapSettings } from '../types/maps';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: { apiKey: string; mapSettings: MapSettings }) => void;
  currentApiKey: string;
  currentMapSettings: MapSettings;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentApiKey,
  currentMapSettings,
}) => {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [mapboxToken, setMapboxToken] = useState(currentMapSettings.mapboxToken);
  const [selectedStyle, setSelectedStyle] = useState(currentMapSettings.selectedStyle);
  const [isValidatingApi, setIsValidatingApi] = useState(false);
  const [isValidatingMapbox, setIsValidatingMapbox] = useState(false);
  const [isApiValid, setIsApiValid] = useState<boolean | null>(null);
  const [isMapboxValid, setIsMapboxValid] = useState<boolean | null>(null);

  const handleApiKeyValidation = async () => {
    setIsValidatingApi(true);
    setIsApiValid(null);
    const valid = await validateApiKey(apiKey);
    setIsApiValid(valid);
    setIsValidatingApi(false);
  };

  const handleMapboxValidation = async () => {
    setIsValidatingMapbox(true);
    setIsMapboxValid(null);
    const valid = await validateMapboxToken(mapboxToken);
    setIsMapboxValid(valid);
    setIsValidatingMapbox(false);
  };

  const handleSave = () => {
    onSave({
      apiKey,
      mapSettings: {
        selectedStyle,
        mapboxToken
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  const needsMapboxToken = selectedStyle !== 'osm';

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
          <div className="space-y-6">
            {/* Google Maps API Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Maps API Key
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setIsApiValid(null);
                  }}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your Google Maps API key"
                />
                <button
                  onClick={handleApiKeyValidation}
                  disabled={!apiKey || isValidatingApi}
                  className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
                >
                  {isValidatingApi ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Validate'
                  )}
                </button>
              </div>
              {isApiValid !== null && (
                <div className={`flex items-center gap-2 mt-2 ${isApiValid ? 'text-green-600' : 'text-red-600'}`}>
                  {isApiValid ? (
                    <>
                      <Check size={16} />
                      <span>API key is valid</span>
                    </>
                  ) : (
                    <>
                      <X size={16} />
                      <span>Invalid API key</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Map Style Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Map Style
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {MAP_STYLES.map(style => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Mapbox Token (only shown when needed) */}
            {needsMapboxToken && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mapbox Access Token
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mapboxToken}
                    onChange={(e) => {
                      setMapboxToken(e.target.value);
                      setIsMapboxValid(null);
                    }}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your Mapbox access token"
                  />
                  <button
                    onClick={handleMapboxValidation}
                    disabled={!mapboxToken || isValidatingMapbox}
                    className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
                  >
                    {isValidatingMapbox ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Validate'
                    )}
                  </button>
                </div>
                {isMapboxValid !== null && (
                  <div className={`flex items-center gap-2 mt-2 ${isMapboxValid ? 'text-green-600' : 'text-red-600'}`}>
                    {isMapboxValid ? (
                      <>
                        <Check size={16} />
                        <span>Token is valid</span>
                      </>
                    ) : (
                      <>
                        <X size={16} />
                        <span>Invalid token</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!isApiValid || (needsMapboxToken && !isMapboxValid)}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};