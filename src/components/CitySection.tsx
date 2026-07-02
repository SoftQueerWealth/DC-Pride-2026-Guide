import type { FestivalDayGroup } from '../lib/groupFestivalEvents';
import type { PrideEvent } from '../types/event';
import { DaySection } from './DaySection';

interface CitySectionProps {
  cityLabel: string;
  dayGroups: FestivalDayGroup[];
  isEventVisible: (e: PrideEvent) => boolean;
  isGoing?: (e: PrideEvent) => boolean;
  onToggleGoing?: (e: PrideEvent) => void;
}

export function CitySection({
  cityLabel,
  dayGroups,
  isEventVisible,
  isGoing,
  onToggleGoing,
}: CitySectionProps) {
  const visibleCount = dayGroups.reduce(
    (sum, group) => sum + group.events.filter(isEventVisible).length,
    0,
  );
  const hidden = visibleCount === 0;

  return (
    <section className={`city-section${hidden ? ' hidden' : ''}`}>
      <div className="city-header">
        <h2 className="city-title">{cityLabel}</h2>
      </div>
      {dayGroups.map((dayGroup) => (
        <DaySection
          key={dayGroup.key}
          day={dayGroup.day}
          dayLabel={dayGroup.dayLabel}
          dayDate={dayGroup.dayDate}
          events={dayGroup.events}
          isEventVisible={isEventVisible}
          isGoing={isGoing}
          onToggleGoing={onToggleGoing}
        />
      ))}
    </section>
  );
}
