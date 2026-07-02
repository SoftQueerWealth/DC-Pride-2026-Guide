import { cityFilterOptions } from '../constants/cities';

interface CityFilterProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CityFilter({ value, onChange, className }: CityFilterProps) {
  return (
    <div className={`city-filter${className ? ` ${className}` : ''}`}>
      <label htmlFor="city-filter-select" className="city-filter-label">
        City
      </label>
      <select
        id="city-filter-select"
        className="city-filter-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Cities</option>
        {cityFilterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
