import React from 'react';
import { Check, Loader2, X } from 'lucide-react';

interface ApiKeyInputProps {
  apiKey: string;
  isValidating: boolean;
  isValid: boolean | null;
  onChange: (value: string) => void;
  onValidate: () => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  apiKey,
  isValidating,
  isValid,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Google Maps API Key
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={apiKey}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your Google Maps API key"
        />
        {isValidating && (
          <div className="px-3 py-2">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        )}
      </div>
      {isValid !== null && !isValidating && (
        <div className={`flex items-center gap-2 mt-2 ${isValid ? 'text-green-600' : 'text-red-600'}`}>
          {isValid ? (
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
  );
};