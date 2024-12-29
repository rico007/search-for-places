import React from 'react';
import { MAP_STYLES } from '../../types/maps';

interface StyleSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const StyleSelect: React.FC<StyleSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Map Style
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {MAP_STYLES.map(style => (
          <option key={style.id} value={style.id}>
            {style.name}
          </option>
        ))}
      </select>
    </div>
  );
};